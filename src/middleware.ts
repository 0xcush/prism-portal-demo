/**
 * Astro SSR middleware — auth guard + request context.
 *
 * Every request except public routes:
 *   1. Read prism_token cookie
 *   2. If missing → redirect to /login
 *   3. Decode JWT payload (no cryptographic verification — backend issued it)
 *   4. Set Astro.locals.user + Astro.locals.token
 *   5. Route guard: /admin/* requires portal=admin, /grantee/* requires portal=grantee
 */
import { defineMiddleware } from 'astro:middleware';
import { requestContext } from './lib/request-context';

const PUBLIC_PATHS = ['/login', '/auth/', '/api/auth/', '/health', '/favicon'];

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const json = Buffer.from(payload, 'base64url').toString('utf-8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function isExpired(payload: Record<string, unknown>): boolean {
  const exp = payload.exp as number | undefined;
  if (!exp) return false;
  return Date.now() / 1000 > exp;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Skip auth entirely when no backend is configured (dev/demo mode).
  // This lets the portal run standalone with mock data for demos and Vercel.
  if (!import.meta.env.API_URL && !import.meta.env.BACKEND_URL) {
    return next();
  }

  // Public routes — no auth required
  if (isPublic(pathname)) {
    return next();
  }

  // Static assets
  if (pathname.startsWith('/_astro/') || pathname.match(/\.\w+$/)) {
    return next();
  }

  const token = context.cookies.get('prism_token')?.value;

  if (!token) {
    return context.redirect('/login');
  }

  const payload = decodeJwtPayload(token);
  if (!payload || isExpired(payload)) {
    context.cookies.delete('prism_token', { path: '/' });
    return context.redirect('/login');
  }

  // Populate locals
  const user = {
    id: String(payload.user_id || payload.sub || ''),
    email: String(payload.email || ''),
    name: String(payload.name || ''),
    role: String(payload.role || ''),
    portal: String(payload.portal || ''),
    entities: Array.isArray(payload.entity_permissions)
      ? (payload.entity_permissions as string[])
      : [],
  };

  context.locals.user = user;
  context.locals.token = token;

  // Route guards
  if (pathname.startsWith('/admin') && user.portal !== 'admin') {
    return context.redirect('/login');
  }
  if (pathname.startsWith('/grantee') && user.portal !== 'grantee') {
    return context.redirect('/login');
  }

  // Run the rest of the request inside the async context so library
  // functions (data-loader, api-client) can read the token without
  // explicit parameter passing.
  return requestContext.run({ token }, () => next());
});
