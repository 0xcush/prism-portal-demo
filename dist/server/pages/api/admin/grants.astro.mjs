import { l as loadAdminData } from '../../../chunks/data-loader_CbTPm3y6.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ url }) => {
  try {
    const data = await loadAdminData();
    if (!data) {
      return new Response(JSON.stringify({ error: "data unavailable" }), {
        status: 503,
        headers: { "Content-Type": "application/json" }
      });
    }
    let { grants } = data;
    const stage = url.searchParams.get("stage");
    if (stage) {
      grants = grants.filter((g) => g.stage === stage);
    }
    const limit = parseInt(url.searchParams.get("limit") || "500", 10);
    grants = grants.slice(0, limit);
    return new Response(
      JSON.stringify({ items: grants, total: grants.length }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (err) {
    console.error("[api/admin/grants] Error:", err);
    return new Response(JSON.stringify({ error: "internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
