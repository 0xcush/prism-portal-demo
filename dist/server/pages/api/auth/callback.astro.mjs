import { c as createSessionCookie } from '../../../chunks/middleware_Be7yoBvJ.mjs';
export { renderers } from '../../../renderers.mjs';

const SESSION_COOKIE = "prism_session";
const SESSION_MAX_AGE = 8 * 60 * 60;
function decodeJwtPayload(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(Buffer.from(parts[1], "base64url").toString("utf-8"));
  } catch {
    return null;
  }
}
function mapRole(claims) {
  const roles = claims.roles || [];
  claims.groups || [];
  const wids = claims.wids || [];
  if (roles.includes("Admin") || roles.includes("admin") || wids.includes("62e90394-69f5-4237-9190-012177145e10")) {
    return { role: "admin", portal: "admin" };
  }
  if (roles.includes("Grantee") || roles.includes("grantee")) {
    return { role: "grantee", portal: "grantee" };
  }
  if (roles.includes("Donor") || roles.includes("donor")) {
    return { role: "donor", portal: "donor" };
  }
  return { role: "admin", portal: "admin" };
}
const GET = async ({ url, cookies, redirect }) => {
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  if (error) {
    console.error("[auth/callback] Azure AD error:", error, url.searchParams.get("error_description"));
    return redirect("/login?error=auth_failed");
  }
  if (!code) {
    return redirect("/login?error=missing_code");
  }
  const tenantId = "common";
  const clientId = undefined                               ;
  const clientSecret = undefined                                   ;
  const baseUrl = (url.origin).replace(/\/$/, "");
  const redirectUri = `${baseUrl}/api/auth/callback`;
  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  let tokenResponse;
  try {
    tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
        scope: "openid profile email"
      })
    });
  } catch (err) {
    console.error("[auth/callback] Token exchange network error:", err);
    return redirect("/login?error=token_error");
  }
  if (!tokenResponse.ok) {
    const body = await tokenResponse.text();
    console.error("[auth/callback] Token exchange failed:", tokenResponse.status, body);
    return redirect("/login?error=token_error");
  }
  const tokens = await tokenResponse.json();
  const idToken = tokens.id_token;
  if (!idToken) {
    console.error("[auth/callback] No id_token in response");
    return redirect("/login?error=token_error");
  }
  const claims = decodeJwtPayload(idToken);
  if (!claims) {
    console.error("[auth/callback] Failed to decode id_token");
    return redirect("/login?error=token_error");
  }
  const { role, portal } = mapRole(claims);
  const sessionValue = createSessionCookie({
    id: String(claims.oid || claims.sub || ""),
    email: String(claims.preferred_username || claims.email || claims.upn || ""),
    name: String(claims.name || ""),
    role,
    portal
  });
  cookies.set(SESSION_COOKIE, sessionValue, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE
  });
  const routes = {
    admin: "/admin",
    donor: "/dashboard",
    grantee: "/grantee"
  };
  return redirect(routes[portal] || "/admin");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
