export { renderers } from '../../../renderers.mjs';

const SESSION_COOKIE = "prism_session";
const GET = async ({ cookies, redirect, url }) => {
  cookies.delete(SESSION_COOKIE, { path: "/" });
  cookies.delete("prism_token", { path: "/" });
  cookies.delete("prism_refresh", { path: "/" });
  return redirect("/login");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
