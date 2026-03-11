/* empty css                                      */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_C-UfuYaI.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_QPEmlEUL.mjs';
import { $ as $$Breadcrumbs } from '../../chunks/Breadcrumbs_BtEFtbP1.mjs';
import { a as formatCurrencyFull, f as formatDate, l as loadAdminData, b as formatCurrency } from '../../chunks/data-loader_Bff0kFPl.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { D as DataTable } from '../../chunks/DataTable_DmZydwVI.mjs';
import { S as StatusBadge } from '../../chunks/StatusBadge_D7ZsDAHk.mjs';
import { E as ErrorBoundary } from '../../chunks/ErrorBoundary_D9-bXlGr.mjs';
import { S as SlidePanel } from '../../chunks/SlidePanel_C5CbSYg-.mjs';
export { renderers } from '../../renderers.mjs';

function AdminGrantDetail({ grant, open, onClose }) {
  if (!grant) return null;
  return /* @__PURE__ */ jsxs(SlidePanel, { open, onClose, title: grant.grantName, subtitle: `${grant.charity} (#${grant.charityNumber})`, children: [
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Overview" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Amount" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-slate-800", children: formatCurrencyFull(grant.amount) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Stage" }),
          /* @__PURE__ */ jsx(StatusBadge, { status: grant.stage })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Priority" }),
          /* @__PURE__ */ jsx(StatusBadge, { status: grant.priority })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Issue Area" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: grant.issueArea })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Days in Stage" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-700", children: grant.daysInStage })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Due Diligence" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "DD Status" }),
          /* @__PURE__ */ jsx(StatusBadge, { status: grant.ddStatus })
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "flex rounded-full h-2 overflow-hidden bg-slate-100", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: `transition-all ${grant.ddStatus === "Complete" ? "bg-emerald-500 w-full" : grant.ddStatus === "In Progress" ? "bg-blue-500 w-3/5" : grant.ddStatus === "Pending" ? "bg-amber-500 w-1/4" : grant.ddStatus === "Failed" ? "bg-red-500 w-full" : "bg-slate-200 w-0"}`
          }
        ) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Charity" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Charity Name" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: grant.charity })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Charity Number" }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm font-mono text-slate-700", children: [
            "#",
            grant.charityNumber
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Request Details" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Client Account" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700 text-right max-w-[200px]", children: grant.clientAccount })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Requested By" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: grant.requestedBy })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Date Requested" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: formatDate(grant.dateRequested) })
        ] })
      ] })
    ] })
  ] });
}

const columns = [
  {
    key: "grantName",
    header: "Grant Name",
    render: (row) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-900", children: row.grantName }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-400", children: [
        row.charity,
        " ",
        /* @__PURE__ */ jsxs("span", { className: "text-slate-300", children: [
          "#",
          row.charityNumber
        ] })
      ] })
    ] })
  },
  {
    key: "stage",
    header: "Stage",
    render: (row) => /* @__PURE__ */ jsx(StatusBadge, { status: row.stage })
  },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-700", children: formatCurrencyFull(row.amount) }),
    sortValue: (row) => row.amount
  },
  {
    key: "priority",
    header: "Priority",
    align: "center",
    render: (row) => /* @__PURE__ */ jsx(StatusBadge, { status: row.priority })
  },
  {
    key: "ddStatus",
    header: "DD Status",
    align: "center",
    render: (row) => /* @__PURE__ */ jsx(StatusBadge, { status: row.ddStatus })
  },
  {
    key: "clientAccount",
    header: "Client Account",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500 max-w-[140px] truncate block", children: row.clientAccount })
  },
  {
    key: "requestedBy",
    header: "Requested By",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-600", children: row.requestedBy })
  },
  {
    key: "dateRequested",
    header: "Date Requested",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: formatDate(row.dateRequested) })
  },
  {
    key: "daysInStage",
    header: "Days in Stage",
    align: "center",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: row.daysInStage }),
    sortValue: (row) => row.daysInStage
  }
];
const filters = [
  {
    key: "stage",
    label: "Stage",
    options: [
      { value: "Requested", label: "Requested" },
      { value: "First Contact", label: "First Contact" },
      { value: "Awaiting Bank Statement", label: "Awaiting Bank Statement" },
      { value: "In Review", label: "In Review" },
      { value: "Approved", label: "Approved" },
      { value: "Paid", label: "Paid" },
      { value: "Declined", label: "Declined" }
    ]
  },
  {
    key: "ddStatus",
    label: "DD Status",
    options: [
      { value: "Not Started", label: "Not Started" },
      { value: "Pending", label: "Pending" },
      { value: "In Progress", label: "In Progress" },
      { value: "Complete", label: "Complete" },
      { value: "Failed", label: "Failed" }
    ]
  },
  {
    key: "priority",
    label: "Priority",
    options: [
      { value: "High", label: "High" },
      { value: "Medium", label: "Medium" },
      { value: "Low", label: "Low" }
    ]
  }
];
function AdminGrantsTable({ adminGrants }) {
  const [selected, setSelected] = useState(null);
  return /* @__PURE__ */ jsxs(ErrorBoundary, { children: [
    /* @__PURE__ */ jsx(
      DataTable,
      {
        data: adminGrants,
        columns,
        searchKeys: ["grantName", "charity", "clientAccount"],
        searchPlaceholder: "Search grants...",
        filters,
        onRowClick: (row) => setSelected(row),
        emptyTitle: "No grants found",
        emptyDescription: "Try adjusting your search or filter criteria.",
        exportFilename: "grants-export"
      }
    ),
    /* @__PURE__ */ jsx(
      AdminGrantDetail,
      {
        grant: selected,
        open: !!selected,
        onClose: () => setSelected(null)
      }
    )
  ] });
}

const $$Grants = createComponent(async ($$result, $$props, $$slots) => {
  const BASE = "/";
  const { grants } = await loadAdminData();
  const totalValue = grants.reduce((s, g) => s + g.amount, 0);
  const paidValue = grants.filter((g) => g.stage === "Paid").reduce((s, g) => s + g.amount, 0);
  const ddComplete = grants.filter((g) => g.ddStatus === "Complete").length;
  const ddRate = grants.length > 0 ? Math.round(ddComplete / grants.length * 100) : 0;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Grants - Prism Admin", "activePage": "grants" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: "Admin", href: `${BASE}admin` }, { label: "Grants" }] })} ${maybeRenderHead()}<div class="mb-6 animate-fade-up"> <h2 class="text-2xl font-bold text-slate-900">Grant Pipeline</h2> <p class="text-sm text-slate-500 mt-1">Grant requests, due diligence, and disbursements</p> </div>  <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6"> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Grants</p> <p class="text-xl font-bold text-slate-900 mt-1">${grants.length}</p> <p class="text-xs text-slate-400 mt-0.5">${formatCurrency(totalValue)} total value</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-1"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Paid Out</p> <p class="text-xl font-bold text-emerald-600 mt-1">${formatCurrency(paidValue)}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-2"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">In Pipeline</p> <p class="text-xl font-bold text-navy-600 mt-1">${grants.filter((g) => !["Paid", "Declined"].includes(g.stage)).length}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-3"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">DD Completion</p> <p class="text-xl font-bold text-slate-900 mt-1">${ddRate}%</p> </div> </div>  <div class="animate-fade-up-4"> ${renderComponent($$result2, "AdminGrantsTable", AdminGrantsTable, { "client:load": true, "adminGrants": JSON.parse(JSON.stringify(grants)), "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/admin/AdminGrantsTable", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/admin/grants.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/admin/grants.astro";
const $$url = "/admin/grants";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Grants,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
