import { g as getMockApprovals } from '../../../chunks/approvals_ChLQUZnw.mjs';
export { renderers } from '../../../renderers.mjs';

let approvals = getMockApprovals();
const GET = async ({ url }) => {
  try {
    const statusFilter = url.searchParams.get("status");
    const priorityFilter = url.searchParams.get("priority");
    let result = [...approvals];
    if (statusFilter) {
      result = result.filter((a) => a.status === statusFilter);
    }
    if (priorityFilter) {
      result = result.filter((a) => a.priority === priorityFilter);
    }
    return new Response(
      JSON.stringify({ items: result, total: result.length }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (err) {
    console.error("[api/admin/approvals] GET error:", err);
    return new Response(JSON.stringify({ error: "internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    if (!body.id || !body.action) {
      return new Response(
        JSON.stringify({ error: "id and action are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const idx = approvals.findIndex((a) => a.id === body.id);
    if (idx === -1) {
      return new Response(JSON.stringify({ error: "approval not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const newStatus = body.action === "approve" ? "approved" : "rejected";
    approvals[idx] = {
      ...approvals[idx],
      status: newStatus,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return new Response(JSON.stringify(approvals[idx]), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("[api/admin/approvals] POST error:", err);
    return new Response(JSON.stringify({ error: "internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
