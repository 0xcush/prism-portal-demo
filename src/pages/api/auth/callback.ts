/**
 * OAuth callback — exchanges Azure AD authorization code for tokens,
 * decodes the ID token, creates a signed session cookie, and redirects.
 */
import type { APIRoute } from 'astro';
import { createSessionCookie } from '../../../middleware';

const SESSION_COOKIE = 'prism_session';
const SESSION_MAX_AGE = 8 * 60 * 60; // 8 hours

/** Decode a JWT payload without cryptographic verification. */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    return JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf-8'));
  } catch {
    return null;
  }
}

/** Map Azure AD roles/groups to portal role. */
function mapRole(claims: Record<string, unknown>): { role: string; portal: string } {
  // Check Azure AD app roles (configured in App Registration > App Roles)
  const roles = (claims.roles || []) as string[];
  // Check group membership claims
  const groups = (claims.groups || []) as string[];
  // Check wids (well-known directory role IDs)
  const wids = (claims.wids || []) as string[];

  // Admin: explicit admin role, or Global Admin wid, or specific group
  if (
    roles.includes('Admin') ||
    roles.includes('admin') ||
    wids.includes('62e90394-69f5-4237-9190-012177145e10') // Global Administrator
  ) {
    return { role: 'admin', portal: 'admin' };
  }

  // Grantee
  if (roles.includes('Grantee') || roles.includes('grantee')) {
    return { role: 'grantee', portal: 'grantee' };
  }

  // Donor
  if (roles.includes('Donor') || roles.includes('donor')) {
    return { role: 'donor', portal: 'donor' };
  }

  // Default: admin (for initial setup when no roles configured yet)
  return { role: 'admin', portal: 'admin' };
}

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    console.error('[auth/callback] Azure AD error:', error, url.searchParams.get('error_description'));
    return redirect('/login?error=auth_failed');
  }

  if (!code) {
    return redirect('/login?error=missing_code');
  }

  const tenantId = import.meta.env.AZURE_TENANT_ID || 'common';
  const clientId = import.meta.env.AZURE_CLIENT_ID;
  const clientSecret = import.meta.env.AZURE_CLIENT_SECRET;
  const baseUrl = (import.meta.env.PUBLIC_BASE_URL || url.origin).replace(/\/$/, '');
  const redirectUri = `${baseUrl}/api/auth/callback`;

  // Exchange authorization code for tokens
  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  let tokenResponse: Response;
  try {
    tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        scope: 'openid profile email',
      }),
    });
  } catch (err) {
    console.error('[auth/callback] Token exchange network error:', err);
    return redirect('/login?error=token_error');
  }

  if (!tokenResponse.ok) {
    const body = await tokenResponse.text();
    console.error('[auth/callback] Token exchange failed:', tokenResponse.status, body);
    return redirect('/login?error=token_error');
  }

  const tokens = (await tokenResponse.json()) as {
    id_token?: string;
    access_token?: string;
  };

  const idToken = tokens.id_token;
  if (!idToken) {
    console.error('[auth/callback] No id_token in response');
    return redirect('/login?error=token_error');
  }

  // Decode ID token claims
  const claims = decodeJwtPayload(idToken);
  if (!claims) {
    console.error('[auth/callback] Failed to decode id_token');
    return redirect('/login?error=token_error');
  }

  // Map claims to user info
  const { role, portal } = mapRole(claims);
  const sessionValue = createSessionCookie({
    id: String(claims.oid || claims.sub || ''),
    email: String(claims.preferred_username || claims.email || claims.upn || ''),
    name: String(claims.name || ''),
    role,
    portal,
  });

  // Set session cookie
  cookies.set(SESSION_COOKIE, sessionValue, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });

  // Redirect based on role
  const routes: Record<string, string> = {
    admin: '/admin',
    donor: '/dashboard',
    grantee: '/grantee',
  };
  return redirect(routes[portal] || '/admin');
};
