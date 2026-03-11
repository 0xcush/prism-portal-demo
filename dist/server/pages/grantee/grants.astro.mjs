/* empty css                                      */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_Dh-RJMVH.mjs';
import 'piccolore';
import { $ as $$GranteeLayout } from '../../chunks/GranteeLayout_jVyNfUO1.mjs';
import { $ as $$Breadcrumbs } from '../../chunks/Breadcrumbs_BYcnf3X3.mjs';
import { G as GrantProgressStepper } from '../../chunks/GrantProgressStepper_BpWFs0SJ.mjs';
import { S as StatusBadge } from '../../chunks/StatusBadge_D7ZsDAHk.mjs';
import { g as getGrantees, a as getGranteeById, b as getGrantsForCharity, d as getPaymentsForCharity, f as formatCurrency, e as formatDate } from '../../chunks/grantees_Cj0JnEzQ.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Grants = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Grants;
  const base = "/";
  const charityId = Astro2.url.searchParams.get("charity") || getGrantees()[0]?.id || "";
  const charity = getGranteeById(charityId);
  const grants = getGrantsForCharity(charityId);
  const payments = getPaymentsForCharity(charityId);
  const activeGrants = grants.filter((g) => !["Paid", "Declined"].includes(g.stage));
  const completedGrants = grants.filter((g) => g.stage === "Paid");
  grants.filter((g) => g.stage === "Declined");
  const totalAwarded = grants.filter((g) => ["Approved", "Paid"].includes(g.stage)).reduce((s, g) => s + g.amount, 0);
  const receivedByGrant = /* @__PURE__ */ new Map();
  for (const p of payments) {
    if (p.status === "Received" || p.status === "Sent") {
      receivedByGrant.set(p.grantId, (receivedByGrant.get(p.grantId) || 0) + p.amount);
    }
  }
  return renderTemplate`${charity ? renderTemplate`${renderComponent($$result, "GranteeLayout", $$GranteeLayout, { "title": "Grants - Prism", "activePage": "grants", "charityName": charity.charityName }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: "Grantee", href: `${base}grantee` }, { label: charity.charityName, href: `${base}grantee/dashboard?charity=${charityId}` }, { label: "Grants" }] })}${maybeRenderHead()}<div class="mb-8 animate-fade-up"><h2 class="text-2xl font-bold text-slate-900">Grants</h2><p class="text-sm text-slate-500 mt-1">All grants for ${charity.charityName}</p></div><div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"><div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 animate-fade-up"><span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Grants</span><p class="text-2xl font-bold text-slate-900 mt-2">${grants.length}</p></div><div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 animate-fade-up-1"><span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Active</span><p class="text-2xl font-bold text-emerald-700 mt-2">${activeGrants.length}</p></div><div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 animate-fade-up-2"><span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Completed</span><p class="text-2xl font-bold text-slate-900 mt-2">${completedGrants.length}</p></div><div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 animate-fade-up-3"><span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Awarded</span><p class="text-2xl font-bold text-emerald-700 mt-2">${formatCurrency(totalAwarded)}</p></div></div>${activeGrants.length > 0 && renderTemplate`<div class="mb-8 animate-fade-up-4"><h3 class="text-base font-semibold text-slate-900 mb-4">Active Grants</h3>${renderComponent($$result2, "GrantProgressStepper", GrantProgressStepper, { "grants": activeGrants, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/grantee/GrantProgressStepper", "client:component-export": "default" })}</div>`}<div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-fade-up-4"><div class="px-6 py-4 border-b border-slate-100"><h3 class="text-base font-semibold text-slate-900">All Grants</h3></div><div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="bg-slate-50 text-left text-xs text-slate-500 uppercase tracking-wider"><th class="px-4 py-3 font-medium">Grant Name</th><th class="px-4 py-3 font-medium text-right">Amount</th><th class="px-4 py-3 font-medium text-right">Received</th><th class="px-4 py-3 font-medium">Stage</th><th class="px-4 py-3 font-medium">Requested</th><th class="px-4 py-3 font-medium">Approved</th><th class="px-4 py-3 font-medium">Donor</th><th class="px-4 py-3 font-medium">Issue Area</th></tr></thead><tbody class="divide-y divide-slate-200">${grants.map((g) => {
    const received = receivedByGrant.get(g.id) || 0;
    const pct = g.amount > 0 ? Math.round(received / g.amount * 100) : 0;
    return renderTemplate`<tr class="hover:bg-slate-50 transition-colors"><td class="px-4 py-3"><p class="font-medium text-slate-900">${g.grantName}</p>${g.notes && renderTemplate`<p class="text-xs text-slate-400 mt-0.5 max-w-xs truncate">${g.notes}</p>`}</td><td class="px-4 py-3 text-right font-medium text-slate-700">${formatCurrency(g.amount)}</td><td class="px-4 py-3 text-right">${received > 0 ? renderTemplate`<div><span class="font-medium text-emerald-700">${formatCurrency(received)}</span><span class="text-xs text-slate-400 ml-1">(${pct}%)</span></div>` : renderTemplate`<span class="text-slate-400">—</span>`}</td><td class="px-4 py-3">${renderComponent($$result2, "StatusBadge", StatusBadge, { "status": g.stage })}</td><td class="px-4 py-3 text-slate-600">${formatDate(g.dateRequested)}</td><td class="px-4 py-3 text-slate-600">${g.dateApproved ? formatDate(g.dateApproved) : "—"}</td><td class="px-4 py-3 text-slate-600">${g.donorName}</td><td class="px-4 py-3 text-xs text-slate-600">${g.issueArea}</td></tr>`;
  })}</tbody></table></div></div>${completedGrants.length > 0 && renderTemplate`<div class="mt-8 animate-fade-up"><h3 class="text-base font-semibold text-slate-900 mb-4">Completed Grants</h3><div class="grid gap-4 md:grid-cols-2">${completedGrants.map((g) => {
    const received = receivedByGrant.get(g.id) || 0;
    return renderTemplate`<div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5"><div class="flex items-start justify-between mb-3"><div><h4 class="text-sm font-semibold text-slate-900">${g.grantName}</h4><p class="text-xs text-slate-500 mt-0.5">${g.issueArea}</p></div>${renderComponent($$result2, "StatusBadge", StatusBadge, { "status": "Paid" })}</div><div class="flex items-center justify-between pt-3 border-t border-slate-100"><div><p class="text-xs text-slate-400 uppercase">Awarded</p><p class="text-sm font-bold text-slate-900">${formatCurrency(g.amount)}</p></div><div class="text-right"><p class="text-xs text-slate-400 uppercase">Received</p><p class="text-sm font-bold text-emerald-700">${formatCurrency(received)}</p></div><div class="text-right"><p class="text-xs text-slate-400 uppercase">Paid</p><p class="text-sm text-slate-600">${g.datePaid ? formatDate(g.datePaid) : "—"}</p></div></div></div>`;
  })}</div></div>`}` })}` : renderTemplate`${renderComponent($$result, "GranteeLayout", $$GranteeLayout, { "title": "Grants - Prism", "activePage": "grants" }, { "default": ($$result2) => renderTemplate`<div class="text-center py-16 animate-fade-up"><div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"></path></svg></div><h2 class="text-xl font-semibold text-slate-800 mb-2">Charity not found</h2><p class="text-slate-500 mb-6">The charity you're looking for doesn't exist or has been removed.</p><a${addAttribute(`${base}grantee`, "href")} class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors">
Back to Charity Selector
</a></div>` })}`}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/grantee/grants.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/grantee/grants.astro";
const $$url = "/grantee/grants";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Grants,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
