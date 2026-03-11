/**
 * Auth callback — receives tokens from backend, sets httpOnly cookie, redirects.
 *
 * Two flows:
 *   1. Entra SSO: backend redirects here with ?token=JWT&refresh_token=...
 *   2. Magic Link: email links here with ?magic_token=... — we exchange it for a JWT
 */
import type { APIRoute } from 'astro';
import { verifyMagicLink } from '../../../lib/api-client';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: import.meta.env.PROD,
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60, // 1 hour (matches JWT expiry)
};

function portalRedirect(portal: string): string {
  switch (portal) {
    case 'admin': return '/admin';
    case 'grantee': return '/grantee';
    default: return '/dashboard';
  }
}

function extractPortalFromJwt(token: string): string {
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString());
    return payload.portal || 'donor';
  } catch {
    return 'donor';
  }
}

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const token = url.searchParams.get('token');
  const refreshToken = url.searchParams.get('refresh_token');
  const magicToken = url.searchParams.get('magic_token');

  // Flow 1: Direct JWT (from Entra SSO redirect)
  if (token) {
    cookies.set('prism_token', token, COOKIE_OPTIONS);
    if (refreshToken) {
      cookies.set('prism_refresh', refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }
    const portal = extractPortalFromJwt(token);
    return redirect(portalRedirect(portal));
  }

  // Flow 2: Magic link token exchange
  if (magicToken) {
    try {
      const result = await verifyMagicLink(magicToken);
      cookies.set('prism_token', result.accessToken, COOKIE_OPTIONS);
      if (result.refreshToken) {
        cookies.set('prism_refresh', result.refreshToken, {
          ...COOKIE_OPTIONS,
          maxAge: 60 * 60 * 24 * 7,
        });
      }
      const portal = extractPortalFromJwt(result.accessToken);
      return redirect(portalRedirect(portal));
    } catch (err) {
      console.error('[auth/callback] Magic link verification failed:', err);
      return redirect('/login?error=invalid_link');
    }
  }

  // No token provided
  return redirect('/login?error=missing_token');
};
