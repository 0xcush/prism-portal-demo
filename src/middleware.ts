/**
 * Astro SSR middleware — auth guard + request context.
 *
 * Session flow:
 *   1. Azure Entra ID SSO sets a signed session cookie (prism_session)
 *   2. Middleware verifies the HMAC signature on every request
 *   3. Populates Astro.locals.user + Astro.locals.token
 *   4. Route guards enforce role-based access (/admin, /donor, /grantee)
 *
 * Dev bypass: when AZURE_CLIENT_ID is not set, auto-authenticates as admin.
 */
import { defineMiddleware } from 'astro:middleware';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { requestContext } from './lib/request-context';

// ── Constants ───────────────────────────────────────────────────────────

const PUBLIC_PATHS = ['/', '/login', '/auth/', '/api/auth/', '/health', '/favicon'];
const SESSION_COOKIE = 'prism_session';
const SESSION_MAX_AGE = 8 * 60 * 60; // 8 hours in seconds

// ── Helpers ─────────────────────────────────────────────────────────────

function isPublic(pathname: string): boolean {
  if (pathname === '/') return true;
  return PUBLIC_PATHS.some((p) => p !== '/' && pathname.startsWith(p));
}

function isStaticAsset(pathname: string): boolean {
  return pathname.startsWith('/_astro/') || /\.\w+$/.test(pathname);
}

function getSessionSecret(): string {
  return import.meta.env.SESSION_SECRET || 'dev-session-secret-not-for-production';
}

/** Sign a payload string with HMAC-SHA256 and return `payload.signature`. */
export function signSession(payload: string): string {
  const sig = createHmac('sha256', getSessionSecret()).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

/** Verify signature and return parsed session data, or null. */
export function verifySession(cookie: string): Record<string, unknown> | null {
  const lastDot = cookie.lastIndexOf('.');
  if (lastDot === -1) return null;

  const payload = cookie.slice(0, lastDot);
  const sig = cookie.slice(lastDot + 1);

  const expected = createHmac('sha256', getSessionSecret()).update(payload).digest('base64url');

  // Constant-time comparison
  try {
    const sigBuf = Buffer.from(sig, 'base64url');
    const expBuf = Buffer.from(expected, 'base64url');
    if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }
  } catch {
    return null;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
    // Check expiry
    if (data.exp && Date.now() / 1000 > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

/** Build a signed session cookie value from user claims. */
export function createSessionCookie(claims: {
  id: string;
  email: string;
  name: string;
  role: string;
  portal: string;
}): string {
  const payload = {
    ...claims,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return signSession(encoded);
}

// Dev bypass user
const DEV_USER = {
  id: 'dev-admin-001',
  email: 'admin@prism.dev',
  name: 'Dev Admin',
  role: 'admin',
  portal: 'admin',
  entities: [] as string[],
};

// ── Middleware ───────────────────────────────────────────────────────────

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Dev bypass: when AZURE_CLIENT_ID is not configured, auto-auth as admin.
  // This keeps the demo/Vercel deployment working without real Azure config.
  if (!import.meta.env.AZURE_CLIENT_ID) {
    context.locals.user = DEV_USER;
    context.locals.token = '';
    return requestContext.run({ token: '' }, () => next());
  }

  // Public routes — no auth required
  if (isPublic(pathname)) {
    return next();
  }

  // Static assets
  if (isStaticAsset(pathname)) {
    return next();
  }

  // Read session cookie
  const sessionCookie = context.cookies.get(SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    return context.redirect('/login');
  }

  const session = verifySession(sessionCookie);
  if (!session) {
    context.cookies.delete(SESSION_COOKIE, { path: '/' });
    return context.redirect('/login');
  }

  // Populate locals
  const user = {
    id: String(session.id || session.sub || ''),
    email: String(session.email || ''),
    name: String(session.name || ''),
    role: String(session.role || ''),
    portal: String(session.portal || ''),
    entities: Array.isArray(session.entities) ? (session.entities as string[]) : [],
  };

  context.locals.user = user;
  context.locals.token = sessionCookie;

  // Route guards: check role matches route prefix
  if (pathname.startsWith('/admin') && user.portal !== 'admin') {
    return context.redirect('/login');
  }
  if (pathname.startsWith('/grantee') && user.portal !== 'grantee') {
    return context.redirect('/login');
  }
  if (pathname.startsWith('/donor') && user.portal !== 'donor' && user.portal !== 'admin') {
    return context.redirect('/login');
  }

  // Run the rest of the request inside the async context
  return requestContext.run({ token: sessionCookie }, () => next());
});
