/* empty css                                      */
import { e as createComponent, h as createAstro } from '../../chunks/astro/server_C-UfuYaI.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Callback = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Callback;
  const token = Astro2.url.searchParams.get("token");
  if (!token) {
    return Astro2.redirect("/login");
  }
  function decodePayload(jwt) {
    try {
      const parts = jwt.split(".");
      if (parts.length !== 3) return null;
      return JSON.parse(Buffer.from(parts[1], "base64url").toString());
    } catch {
      return null;
    }
  }
  const payload = decodePayload(token);
  if (!payload) {
    return Astro2.redirect("/login");
  }
  const isProduction = true;
  Astro2.cookies.set("prism_token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60
    // 1 hour
  });
  const portal = String(payload.portal || "donor");
  const routes = {
    admin: "/admin",
    donor: "/dashboard",
    grantee: "/grantee"
  };
  return Astro2.redirect(routes[portal] || "/dashboard");
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/auth/callback.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/auth/callback.astro";
const $$url = "/auth/callback";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Callback,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
