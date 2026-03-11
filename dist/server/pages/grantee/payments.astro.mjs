/* empty css                                      */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_Dh-RJMVH.mjs';
import 'piccolore';
import { $ as $$GranteeLayout } from '../../chunks/GranteeLayout_jVyNfUO1.mjs';
import { $ as $$Breadcrumbs } from '../../chunks/Breadcrumbs_BYcnf3X3.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { D as DataTable } from '../../chunks/DataTable_DmZydwVI.mjs';
import { S as StatusBadge } from '../../chunks/StatusBadge_D7ZsDAHk.mjs';
import { f as formatCurrency, e as formatDate, g as getGrantees, a as getGranteeById, d as getPaymentsForCharity, b as getGrantsForCharity } from '../../chunks/grantees_Cj0JnEzQ.mjs';
import { useMemo } from 'react';
import { E as EmptyState } from '../../chunks/EmptyState_BgS3M8dy.mjs';
export { renderers } from '../../renderers.mjs';

const columns = [
  {
    key: "reference",
    header: "Reference",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "font-mono text-xs font-medium text-slate-800", children: row.reference })
  },
  {
    key: "grantId",
    header: "Grant ID",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: row.grantId })
  },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-800", children: formatCurrency(row.amount) }),
    sortValue: (row) => row.amount
  },
  {
    key: "status",
    header: "Status",
    render: (row) => /* @__PURE__ */ jsx(StatusBadge, { status: row.status })
  },
  {
    key: "scheduledDate",
    header: "Scheduled Date",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: formatDate(row.scheduledDate) }),
    sortValue: (row) => row.scheduledDate
  },
  {
    key: "sentDate",
    header: "Sent Date",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: formatDate(row.sentDate) })
  },
  {
    key: "bankRef",
    header: "Bank Ref",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-slate-500", children: row.bankRef || "—" })
  }
];
const filters = [
  {
    key: "status",
    label: "Status",
    options: [
      { value: "Scheduled", label: "Scheduled" },
      { value: "Processing", label: "Processing" },
      { value: "Sent", label: "Sent" },
      { value: "Received", label: "Received" },
      { value: "Failed", label: "Failed" }
    ]
  }
];
function PaymentsTable({ payments }) {
  return /* @__PURE__ */ jsx(
    DataTable,
    {
      data: payments,
      columns,
      searchKeys: ["reference", "bankRef"],
      searchPlaceholder: "Search by reference or bank ref...",
      filters,
      emptyTitle: "No payments found",
      emptyDescription: "No payments match your search or filters.",
      exportFilename: "prism-payments"
    }
  );
}

function PaymentForecast({ payments }) {
  const upcoming = useMemo(() => {
    return payments.filter((p) => p.status === "Scheduled" || p.status === "Processing").sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate));
  }, [payments]);
  if (upcoming.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm", children: /* @__PURE__ */ jsx(
      EmptyState,
      {
        title: "No upcoming payments",
        description: "All scheduled payments have been processed.",
        icon: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-12 h-12 text-slate-200 mx-auto mb-3",
            "aria-hidden": "true",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 1.5,
                d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              }
            )
          }
        )
      }
    ) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-slate-900 mb-6", children: "Payment Forecast" }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-[7.5rem] top-2 bottom-2 w-px bg-slate-200 hidden sm:block" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: upcoming.map((payment, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 sm:gap-6", children: [
        /* @__PURE__ */ jsx("div", { className: "w-[6.5rem] flex-shrink-0 text-right pt-0.5", children: /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-700", children: formatDate(payment.scheduledDate) }) }),
        /* @__PURE__ */ jsx("div", { className: "relative flex-shrink-0 hidden sm:flex items-center justify-center", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: `w-3 h-3 rounded-full ring-4 ring-white z-10 ${payment.status === "Processing" ? "bg-amber-400" : "bg-blue-400"}`
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 pb-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-slate-900", children: formatCurrency(payment.amount) }),
            /* @__PURE__ */ jsx(StatusBadge, { status: payment.status })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mt-1 font-mono truncate", children: payment.reference })
        ] })
      ] }, payment.id)) })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$Payments = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Payments;
  const charityId = Astro2.url.searchParams.get("charity") || getGrantees()[0]?.id || "";
  const charity = getGranteeById(charityId);
  const payments = getPaymentsForCharity(charityId);
  getGrantsForCharity(charityId);
  const totalReceived = payments.filter((p) => p.status === "Received" || p.status === "Sent").reduce((s, p) => s + p.amount, 0);
  const totalScheduled = payments.filter((p) => p.status === "Scheduled").reduce((s, p) => s + p.amount, 0);
  const base = "/";
  return renderTemplate`${renderComponent($$result, "GranteeLayout", $$GranteeLayout, { "title": "Payments - Prism", "activePage": "payments", "charityName": charity?.charityName }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: "Grantee", href: `${base}grantee` }, { label: charity?.charityName || "Charity", href: `${base}grantee/dashboard?charity=${charityId}` }, { label: "Payments" }] })}  ${maybeRenderHead()}<div class="mb-8 animate-fade-up"> <h2 class="text-2xl font-bold text-slate-900">Payments</h2> <p class="text-sm text-slate-500 mt-1">Payment timeline and history</p> </div>  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 animate-fade-up"> <span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Received</span> <p class="text-2xl font-bold text-emerald-700 mt-2">${formatCurrency(totalReceived)}</p> <p class="text-xs text-slate-500 mt-1">${payments.filter((p) => p.status === "Received" || p.status === "Sent").length} payment${payments.filter((p) => p.status === "Received" || p.status === "Sent").length !== 1 ? "s" : ""}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 animate-fade-up-1"> <span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Scheduled</span> <p class="text-2xl font-bold text-slate-900 mt-2">${formatCurrency(totalScheduled)}</p> <p class="text-xs text-slate-500 mt-1">${payments.filter((p) => p.status === "Scheduled").length} upcoming</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 animate-fade-up-2"> <span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Payments</span> <p class="text-2xl font-bold text-slate-900 mt-2">${payments.length}</p> <p class="text-xs text-slate-500 mt-1">all time</p> </div> </div>  <div class="mb-8 animate-fade-up-3"> ${renderComponent($$result2, "PaymentForecast", PaymentForecast, { "payments": payments, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/grantee/PaymentForecast", "client:component-export": "default" })} </div>  <div class="animate-fade-up-4"> ${renderComponent($$result2, "PaymentsTable", PaymentsTable, { "payments": payments, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/grantee/PaymentsTable", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/grantee/payments.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/grantee/payments.astro";
const $$url = "/grantee/payments";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Payments,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
