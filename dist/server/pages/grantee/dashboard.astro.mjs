/* empty css                                      */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_C-UfuYaI.mjs';
import 'piccolore';
import { $ as $$GranteeLayout } from '../../chunks/GranteeLayout_D7N2yhW7.mjs';
import { $ as $$Breadcrumbs } from '../../chunks/Breadcrumbs_BtEFtbP1.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { f as formatCurrency, a as formatDate, g as getGrantees, b as getGranteeById, c as getGrantsForCharity, d as getDocumentsForCharity, e as getPaymentsForCharity } from '../../chunks/grantees_BI5daSsQ.mjs';
import { S as SlidePanel } from '../../chunks/SlidePanel_C5CbSYg-.mjs';
import { S as StatusBadge } from '../../chunks/StatusBadge_D7ZsDAHk.mjs';
export { renderers } from '../../renderers.mjs';

function GrantDetail({ grant, open, onClose }) {
  if (!grant) return null;
  return /* @__PURE__ */ jsx(
    SlidePanel,
    {
      open,
      onClose,
      title: grant.grantName,
      subtitle: grant.id,
      children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3", children: "Overview" }),
          /* @__PURE__ */ jsxs("dl", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm text-slate-500", children: "Grant Name" }),
              /* @__PURE__ */ jsx("dd", { className: "text-sm font-medium text-slate-800", children: grant.grantName })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm text-slate-500", children: "Amount" }),
              /* @__PURE__ */ jsx("dd", { className: "text-sm font-medium text-slate-800", children: formatCurrency(grant.amount) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm text-slate-500", children: "Stage" }),
              /* @__PURE__ */ jsx("dd", { children: /* @__PURE__ */ jsx(StatusBadge, { status: grant.stage }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm text-slate-500", children: "Issue Area" }),
              /* @__PURE__ */ jsx("dd", { className: "text-sm font-medium text-slate-800", children: grant.issueArea })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm text-slate-500", children: "Donor" }),
              /* @__PURE__ */ jsx("dd", { className: "text-sm font-medium text-slate-800", children: grant.donorName })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("hr", { className: "border-slate-100" }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3", children: "Timeline" }),
          /* @__PURE__ */ jsxs("dl", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm text-slate-500", children: "Date Requested" }),
              /* @__PURE__ */ jsx("dd", { className: "text-sm font-medium text-slate-800", children: formatDate(grant.dateRequested) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm text-slate-500", children: "Date Approved" }),
              /* @__PURE__ */ jsx("dd", { className: "text-sm font-medium text-slate-800", children: grant.dateApproved ? formatDate(grant.dateApproved) : "—" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-sm text-slate-500", children: "Date Paid" }),
              /* @__PURE__ */ jsx("dd", { className: "text-sm font-medium text-slate-800", children: grant.datePaid ? formatDate(grant.datePaid) : "—" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("hr", { className: "border-slate-100" }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3", children: "Due Diligence" }),
          /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsx(StatusBadge, { status: grant.ddStatus }) }),
          grant.requiredDocuments.length > 0 && /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: grant.requiredDocuments.map((doc, idx) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-50", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: doc.name }),
            /* @__PURE__ */ jsx("span", { className: `text-xs font-medium ${doc.status === "Verified" || doc.status === "Submitted" ? "text-emerald-600" : "text-amber-600"}`, children: doc.status })
          ] }, idx)) })
        ] }),
        grant.notes && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("hr", { className: "border-slate-100" }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3", children: "Notes" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-700 leading-relaxed", children: grant.notes })
          ] })
        ] }),
        grant.paymentRef && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("hr", { className: "border-slate-100" }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3", children: "Payment" }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Reference" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-mono font-medium text-slate-800", children: grant.paymentRef })
            ] })
          ] })
        ] })
      ] })
    }
  );
}

const STAGES = ["Requested", "In Review", "Approved", "Paid"];
function stageIndex(stage) {
  if (stage === "Declined") return -1;
  return STAGES.indexOf(stage);
}
function dateForStage(grant, stage) {
  switch (stage) {
    case "Requested":
      return grant.dateRequested;
    case "Approved":
      return grant.dateApproved;
    case "Paid":
      return grant.datePaid;
    default:
      return null;
  }
}
function GrantProgressStepper({ grants }) {
  const [selectedGrant, setSelectedGrant] = useState(null);
  if (grants.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "py-8 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: "No grants to display." }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    grants.map((grant) => {
      const current = stageIndex(grant.stage);
      const isDeclined = grant.stage === "Declined";
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white rounded-xl border border-slate-200 shadow-sm p-5 cursor-pointer hover:border-navy-300 hover:shadow-md transition-all",
          onClick: () => setSelectedGrant(grant),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-5", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-slate-900", children: grant.grantName }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500 mt-0.5", children: [
                  formatCurrency(grant.amount),
                  " · ",
                  grant.donorName
                ] })
              ] }),
              isDeclined && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 ring-1 ring-inset ring-red-500/10", children: "Declined" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-start", children: STAGES.map((stage, idx) => {
              const isComplete = !isDeclined && idx < current;
              const isCurrent = !isDeclined && idx === current;
              const isDeclinedStep = isDeclined && idx === 0;
              const date = dateForStage(grant, stage);
              return /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center relative", children: [
                idx > 0 && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `absolute top-3.5 right-1/2 w-full h-0.5 -z-0 ${isComplete || isCurrent ? "bg-emerald-400" : "bg-slate-200"}`
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "relative z-10", children: isDeclined && isDeclinedStep ? /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full bg-red-100 flex items-center justify-center", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "w-4 h-4 text-red-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    strokeWidth: 2.5,
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M6 18L18 6M6 6l12 12"
                      }
                    )
                  }
                ) }) : isComplete ? /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "w-4 h-4 text-white",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    strokeWidth: 2.5,
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M4.5 12.75l6 6 9-13.5"
                      }
                    )
                  }
                ) }) : isCurrent ? /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full bg-navy-600 flex items-center justify-center ring-4 ring-navy-100", children: /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-white" }) }) : /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-slate-400" }) }) }),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `text-xs mt-2 text-center leading-tight ${isCurrent ? "font-semibold text-navy-700" : isComplete ? "font-medium text-emerald-700" : isDeclined && !isDeclinedStep ? "text-slate-300" : "text-slate-400"}`,
                    children: stage
                  }
                ),
                (isComplete || isCurrent) && date && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400 mt-0.5", children: formatDate(date) })
              ] }, stage);
            }) })
          ]
        },
        grant.id
      );
    }),
    /* @__PURE__ */ jsx(GrantDetail, { grant: selectedGrant, open: !!selectedGrant, onClose: () => setSelectedGrant(null) })
  ] });
}

const $$Astro = createAstro();
const $$Dashboard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const base = "/";
  const charityId = Astro2.url.searchParams.get("charity") || getGrantees()[0]?.id || "";
  const charity = getGranteeById(charityId);
  const grants = getGrantsForCharity(charityId);
  const docs = getDocumentsForCharity(charityId);
  const payments = getPaymentsForCharity(charityId);
  const totalPending = grants.filter((g) => !["Paid", "Declined"].includes(g.stage)).reduce((s, g) => s + g.amount, 0);
  const totalPaid = grants.filter((g) => g.stage === "Paid").reduce((s, g) => s + g.amount, 0);
  const pendingDocs = docs.filter((d) => d.status === "Pending" || d.status === "Expired").length;
  const nextPayment = payments.find((p) => p.status === "Scheduled" || p.status === "Processing");
  const receivedPayments = payments.filter((p) => p.status === "Received" || p.status === "Sent");
  const scheduledPayments = payments.filter((p) => p.status === "Scheduled" || p.status === "Processing");
  const grantNameMap = new Map(grants.map((g) => [g.id, g.grantName]));
  const allPaymentDisplays = [
    ...receivedPayments.map((p) => ({ reference: p.reference, amount: p.amount, status: p.status, date: p.sentDate || p.scheduledDate })),
    ...scheduledPayments.map((p) => ({ reference: `${grantNameMap.get(p.grantId) || p.grantId}`, amount: p.amount, status: p.status, date: p.scheduledDate }))
  ];
  allPaymentDisplays.sort((a, b) => b.date.localeCompare(a.date));
  const recentPayments = allPaymentDisplays.slice(0, 5);
  const statusColors = {
    "Requested": "bg-slate-100 text-slate-700",
    "In Review": "bg-blue-100 text-blue-700",
    "Approved": "bg-emerald-100 text-emerald-700",
    "Paid": "bg-green-100 text-green-700",
    "Declined": "bg-red-100 text-red-700"
  };
  const paymentStatusDots = {
    "Scheduled": "bg-slate-400",
    "Processing": "bg-amber-400",
    "Sent": "bg-blue-400",
    "Received": "bg-emerald-400",
    "Failed": "bg-red-400"
  };
  return renderTemplate`${charity ? renderTemplate`${renderComponent($$result, "GranteeLayout", $$GranteeLayout, { "title": `${charity.charityName} - Prism`, "activePage": "dashboard", "charityName": charity.charityName }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: "Grantee", href: `${base}grantee` }, { label: charity.charityName }] })}${maybeRenderHead()}<div class="mb-8 animate-fade-up"><h2 class="text-2xl font-bold text-slate-900">${charity.charityName}</h2><p class="text-sm text-slate-500 mt-1">Charity No. ${charity.charityNumber} &middot; Grant status and payment overview</p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"><!-- Total Pending --><div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 animate-fade-up"><div class="flex items-center justify-between mb-3"><span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Pending</span><div class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center"><svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div></div><p class="text-2xl font-bold text-slate-900">${formatCurrency(totalPending)}</p><p class="text-xs text-slate-500 mt-1">${grants.filter((g) => !["Paid", "Declined"].includes(g.stage)).length} grant${grants.filter((g) => !["Paid", "Declined"].includes(g.stage)).length !== 1 ? "s" : ""} in progress</p></div><!-- Total Paid --><div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 animate-fade-up-1"><div class="flex items-center justify-between mb-3"><span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Paid</span><div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center"><svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div></div><p class="text-2xl font-bold text-slate-900">${formatCurrency(totalPaid)}</p><p class="text-xs text-slate-500 mt-1">${grants.filter((g) => g.stage === "Paid").length} paid grant${grants.filter((g) => g.stage === "Paid").length !== 1 ? "s" : ""}</p></div><!-- Documents Due --><div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 animate-fade-up-2"><div class="flex items-center justify-between mb-3"><span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Documents Due</span><div class="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center"><svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg></div></div><p${addAttribute(["text-2xl font-bold", pendingDocs > 0 ? "text-red-600" : "text-slate-900"], "class:list")}>${pendingDocs}</p><p class="text-xs text-slate-500 mt-1">${pendingDocs > 0 ? "Action required" : "All up to date"}</p></div><!-- Next Payment --><div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 animate-fade-up-3"><div class="flex items-center justify-between mb-3"><span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Next Payment</span><div class="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center"><svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path></svg></div></div><p class="text-2xl font-bold text-slate-900">${nextPayment ? formatCurrency(nextPayment.amount) : "--"}</p><p class="text-xs text-slate-500 mt-1">${nextPayment ? formatDate(nextPayment.scheduledDate) : "None scheduled"}</p></div></div><div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8 animate-fade-up-4"><div class="px-6 py-4 border-b border-slate-100"><h3 class="text-base font-semibold text-slate-900">Active Grants</h3></div><div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="bg-slate-50 text-left text-xs text-slate-500 uppercase tracking-wider"><th class="px-4 py-3 font-medium">Grant Name</th><th class="px-4 py-3 font-medium text-right">Amount</th><th class="px-4 py-3 font-medium">Stage</th><th class="px-4 py-3 font-medium">Date Requested</th><th class="px-4 py-3 font-medium">Donor</th><th class="px-4 py-3 font-medium">Issue Area</th></tr></thead><tbody class="divide-y divide-slate-200">${grants.map((g) => renderTemplate`<tr class="hover:bg-slate-50 transition-colors"><td class="px-4 py-3 font-medium text-slate-900">${g.grantName}</td><td class="px-4 py-3 text-right font-medium text-slate-700">${formatCurrency(g.amount)}</td><td class="px-4 py-3"><span${addAttribute(`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[g.stage]}`, "class")}>${g.stage}</span></td><td class="px-4 py-3 text-slate-600">${formatDate(g.dateRequested)}</td><td class="px-4 py-3 text-slate-600 max-w-[180px] truncate">${g.donorName}</td><td class="px-4 py-3 text-xs text-slate-600">${g.issueArea}</td></tr>`)}</tbody></table></div></div><div class="mb-8 animate-fade-up"><h3 class="text-base font-semibold text-slate-900 mb-4">Grant Progress</h3>${renderComponent($$result2, "GrantProgressStepper", GrantProgressStepper, { "grants": grants, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/grantee/GrantProgressStepper", "client:component-export": "default" })}</div>${recentPayments.length > 0 && renderTemplate`<div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-fade-up"><h3 class="text-base font-semibold text-slate-900 mb-4">Recent Payments</h3><div class="space-y-3">${recentPayments.map((payment) => renderTemplate`<div class="flex items-center justify-between py-2"><div class="flex items-center gap-3 min-w-0"><span${addAttribute(`w-2 h-2 rounded-full flex-shrink-0 ${paymentStatusDots[payment.status] || "bg-slate-400"}`, "class")}></span><div class="min-w-0"><p class="text-sm text-slate-700 truncate">${payment.reference}</p><p class="text-xs text-slate-400">${formatDate(payment.date)}</p></div></div><span class="text-sm font-semibold text-slate-900 ml-4 whitespace-nowrap">${formatCurrency(payment.amount)}</span></div>`)}</div></div>`}` })}` : renderTemplate`${renderComponent($$result, "GranteeLayout", $$GranteeLayout, { "title": "Dashboard - Prism", "activePage": "dashboard" }, { "default": ($$result2) => renderTemplate`<div class="text-center py-16 animate-fade-up"><div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"></path></svg></div><h2 class="text-xl font-semibold text-slate-800 mb-2">Charity not found</h2><p class="text-slate-500 mb-6">The charity you're looking for doesn't exist or has been removed.</p><a${addAttribute(`${base}grantee`, "href")} class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path></svg>
Back to Charity Selector
</a></div>` })}`}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/grantee/dashboard.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/grantee/dashboard.astro";
const $$url = "/grantee/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
