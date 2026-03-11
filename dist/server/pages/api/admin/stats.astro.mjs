import { l as loadAdminData } from '../../../chunks/data-loader_CbTPm3y6.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async () => {
  try {
    const data = await loadAdminData();
    if (!data) {
      return new Response(JSON.stringify({ error: "data unavailable" }), {
        status: 503,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { prospects, firms, clientAccounts, grants } = data;
    const totalAUM = clientAccounts.reduce((s, a) => s + (a.totalValue || 0), 0);
    const activeAccounts = clientAccounts.filter((a) => a.status === "Active").length;
    const pendingGrants = grants.filter(
      (g) => !["Paid", "Declined"].includes(g.stage)
    ).length;
    const paidGrants = grants.filter((g) => g.stage === "Paid").length;
    const totalGrantValue = grants.filter((g) => g.stage === "Paid").reduce((s, g) => s + (g.amount || 0), 0);
    const stats = {
      totalProspects: prospects.length,
      totalFirms: firms.length,
      totalAccounts: clientAccounts.length,
      activeAccounts,
      totalGrants: grants.length,
      pendingGrants,
      paidGrants,
      totalAUM,
      totalGrantValue
    };
    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("[api/admin/stats] Error:", err);
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
