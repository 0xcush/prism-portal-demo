import { v as verifyMagicLink } from '../../../chunks/api-client_qQbTtKgi.mjs';
export { renderers } from '../../../renderers.mjs';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60
  // 1 hour (matches JWT expiry)
};
function portalRedirect(portal) {
  switch (portal) {
    case "admin":
      return "/admin";
    case "grantee":
      return "/grantee";
    default:
      return "/dashboard";
  }
}
function extractPortalFromJwt(token) {
  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString());
    return payload.portal || "donor";
  } catch {
    return "donor";
  }
}
const GET = async ({ url, cookies, redirect }) => {
  const token = url.searchParams.get("token");
  const refreshToken = url.searchParams.get("refresh_token");
  const magicToken = url.searchParams.get("magic_token");
  if (token) {
    cookies.set("prism_token", token, COOKIE_OPTIONS);
    if (refreshToken) {
      cookies.set("prism_refresh", refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * 60 * 24 * 7
        // 7 days
      });
    }
    const portal = extractPortalFromJwt(token);
    return redirect(portalRedirect(portal));
  }
  if (magicToken) {
    try {
      const result = await verifyMagicLink(magicToken);
      cookies.set("prism_token", result.accessToken, COOKIE_OPTIONS);
      if (result.refreshToken) {
        cookies.set("prism_refresh", result.refreshToken, {
          ...COOKIE_OPTIONS,
          maxAge: 60 * 60 * 24 * 7
        });
      }
      const portal = extractPortalFromJwt(result.accessToken);
      return redirect(portalRedirect(portal));
    } catch (err) {
      console.error("[auth/callback] Magic link verification failed:", err);
      return redirect("/login?error=invalid_link");
    }
  }
  return redirect("/login?error=missing_token");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
