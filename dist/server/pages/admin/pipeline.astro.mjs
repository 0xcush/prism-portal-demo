/* empty css                                      */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_C-UfuYaI.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_QPEmlEUL.mjs';
import { $ as $$Breadcrumbs } from '../../chunks/Breadcrumbs_BtEFtbP1.mjs';
import { a as formatCurrencyFull, f as formatDate, l as loadAdminData, b as formatCurrency$1 } from '../../chunks/data-loader_Bff0kFPl.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts';
import { E as ErrorBoundary } from '../../chunks/ErrorBoundary_D9-bXlGr.mjs';
import { useState } from 'react';
import { D as DataTable } from '../../chunks/DataTable_DmZydwVI.mjs';
import { S as StatusBadge } from '../../chunks/StatusBadge_D7ZsDAHk.mjs';
import { S as SlidePanel } from '../../chunks/SlidePanel_C5CbSYg-.mjs';
export { renderers } from '../../renderers.mjs';

const STAGE_COLORS = {
  "Lead": "#64748b",
  "Initial Contact": "#2563eb",
  "Questions Sent": "#4f46e5",
  "Fee Proposal": "#7c3aed",
  "Contract": "#d97706",
  "Onboarding": "#ea580c",
  "Active Client": "#059669",
  "Handed to RM": "#16a34a",
  "Requested": "#64748b",
  "First Contact": "#2563eb",
  "Awaiting Bank Statement": "#d97706",
  "In Review": "#4f46e5",
  "Approved": "#2563eb",
  "Paid": "#059669",
  "Declined": "#dc2626"
};
const DEFAULT_COLOR = "#64748b";
function formatCurrency(amount) {
  if (amount >= 1e6) return `£${(amount / 1e6).toFixed(1)}M`;
  if (amount >= 1e3) return `£${(amount / 1e3).toFixed(0)}K`;
  return `£${amount.toLocaleString()}`;
}
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg border border-slate-200 px-4 py-3", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-800", children: data.stage }),
    /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-500", children: [
      data.count,
      " prospect",
      data.count !== 1 ? "s" : "",
      " · ",
      formatCurrency(data.value)
    ] })
  ] });
}
function StageBarChart({ data, title = "Pipeline by Stage" }) {
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800 mb-6", children: title }),
    /* @__PURE__ */ jsx("div", { className: "h-64", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
      BarChart,
      {
        data,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        barCategoryGap: "20%",
        children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0", vertical: false }),
          /* @__PURE__ */ jsx(
            XAxis,
            {
              dataKey: "stage",
              tick: { fontSize: 11, fill: "#64748b" },
              axisLine: false,
              tickLine: false,
              interval: 0,
              angle: -30,
              textAnchor: "end",
              height: 60
            }
          ),
          /* @__PURE__ */ jsx(
            YAxis,
            {
              tick: { fontSize: 12, fill: "#94a3b8" },
              axisLine: false,
              tickLine: false,
              allowDecimals: false
            }
          ),
          /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip, {}), cursor: { fill: "rgba(0,0,0,0.02)" } }),
          /* @__PURE__ */ jsx(Bar, { dataKey: "count", radius: [4, 4, 0, 0], barSize: 32, children: data.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: STAGE_COLORS[entry.stage] || DEFAULT_COLOR }, `cell-${index}`)) })
        ]
      }
    ) }) })
  ] }) });
}

function ProspectDetail({ prospect, open, onClose }) {
  if (!prospect) return null;
  return /* @__PURE__ */ jsxs(SlidePanel, { open, onClose, title: prospect.name, subtitle: prospect.referringFirm ? `via ${prospect.referringFirm}` : void 0, children: [
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Overview" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Stage" }),
          /* @__PURE__ */ jsx(StatusBadge, { status: prospect.stage })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "DAF Size" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-slate-800", children: formatCurrencyFull(prospect.dafSize) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Fund Type" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: prospect.fundType === "DAF" ? "Donor Advised Fund" : "Collective Fund" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "UK/US" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: prospect.ukUs })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Probability" }),
          /* @__PURE__ */ jsx(StatusBadge, { status: prospect.conversionProbability })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Follow-up Status" }),
          /* @__PURE__ */ jsx(StatusBadge, { status: prospect.followUpStatus })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Source Activity" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700 text-right max-w-[200px]", children: prospect.sourceActivity })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Referred By" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: prospect.referredBy })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Relationship Manager" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: prospect.relationshipManager })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "BD Point of Contact" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: prospect.bdPointOfContact })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxs("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: [
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" }),
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 6h.008v.008H6V6z" })
            ] }),
            "Impact Category"
          ] }) }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: prospect.impactCategory || "N/A" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxs("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: [
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" }),
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" })
            ] }),
            "Location"
          ] }) }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: prospect.location || "N/A" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Days in Pipeline" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-700", children: prospect.daysInPipeline })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Activity & Account Details" }),
      /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-5", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-x-6 gap-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: "UK Gifts" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", children: prospect.ukGifts ?? "N/A" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: "Overseas Gifts" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", children: prospect.overseasGifts ?? "N/A" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: "Asset Types" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", children: prospect.assetTypes?.join(", ") || "N/A" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: "Investment Account" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", children: prospect.hasInvestmentAccount ? "Yes" : "No" })
        ] }),
        prospect.hasInvestmentAccount && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: "Provider" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", children: prospect.investmentProvider || "N/A" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: "Account Manager" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", children: prospect.accountManager || "N/A" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: "Gift Eligible" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", children: prospect.giftEligible != null ? prospect.giftEligible ? "Yes" : "No" : "N/A" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: "Donor Count" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", children: prospect.donorCount ?? "N/A" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Timeline" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Date Entered Pipeline" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: formatDate(prospect.dateEnteredPipeline) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Last Contact" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: formatDate(prospect.lastContact) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Next Follow-up" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-700", children: formatDate(prospect.nextFollowUp) })
        ] })
      ] })
    ] }),
    prospect.notes && /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Notes" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-3", children: prospect.notes })
    ] })
  ] });
}

const columns = [
  {
    key: "name",
    header: "Name",
    render: (row) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-900", children: row.name }),
      row.referringFirm && /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-400", children: [
        "via ",
        row.referringFirm
      ] })
    ] })
  },
  {
    key: "stage",
    header: "Stage",
    render: (row) => /* @__PURE__ */ jsx(StatusBadge, { status: row.stage })
  },
  {
    key: "dafSize",
    header: "DAF Size",
    align: "right",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-700", children: formatCurrencyFull(row.dafSize) }),
    sortValue: (row) => row.dafSize
  },
  {
    key: "fundType",
    header: "Fund Type",
    align: "center",
    render: (row) => /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${row.fundType === "DAF" ? "bg-navy-50 text-navy-700" : "bg-gold-50 text-gold-700"}`, children: row.fundType })
  },
  {
    key: "conversionProbability",
    header: "Probability",
    align: "center",
    render: (row) => /* @__PURE__ */ jsx(StatusBadge, { status: row.conversionProbability })
  },
  {
    key: "sourceActivity",
    header: "Source",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-600 max-w-[140px] truncate block", children: row.sourceActivity })
  },
  {
    key: "followUpStatus",
    header: "Follow-up",
    align: "center",
    render: (row) => /* @__PURE__ */ jsx(StatusBadge, { status: row.followUpStatus })
  },
  {
    key: "lastContact",
    header: "Last Contact",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: formatDate(row.lastContact) }),
    sortValue: (row) => new Date(row.lastContact).getTime()
  },
  {
    key: "daysInPipeline",
    header: "Days",
    align: "center",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: row.daysInPipeline }),
    sortValue: (row) => row.daysInPipeline
  },
  {
    key: "relationshipManager",
    header: "RM",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: row.relationshipManager.split(" ")[0] })
  },
  {
    key: "bdPointOfContact",
    header: "BD Contact",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: row.bdPointOfContact })
  }
];
const filters = [
  {
    key: "stage",
    label: "Stage",
    options: [
      { value: "Lead", label: "Lead" },
      { value: "Initial Contact", label: "Initial Contact" },
      { value: "Questions Sent", label: "Questions Sent" },
      { value: "Fee Proposal", label: "Fee Proposal" },
      { value: "Contract", label: "Contract" },
      { value: "Onboarding", label: "Onboarding" },
      { value: "Active Client", label: "Active Client" },
      { value: "Handed to RM", label: "Handed to RM" }
    ]
  },
  {
    key: "conversionProbability",
    label: "Probability",
    options: [
      { value: "High", label: "High" },
      { value: "Medium", label: "Medium" },
      { value: "Low", label: "Low" }
    ]
  },
  {
    key: "followUpStatus",
    label: "Follow-up",
    options: [
      { value: "On Track", label: "On Track" },
      { value: "Due", label: "Due" },
      { value: "Overdue", label: "Overdue" }
    ]
  },
  {
    key: "fundType",
    label: "Fund Type",
    options: [
      { value: "DAF", label: "DAF" },
      { value: "CF", label: "Collective Fund" }
    ]
  }
];
function PipelineTable({ prospects }) {
  const [selected, setSelected] = useState(null);
  return /* @__PURE__ */ jsxs(ErrorBoundary, { children: [
    /* @__PURE__ */ jsx(
      DataTable,
      {
        data: prospects,
        columns,
        searchKeys: ["name", "referringFirm", "notes"],
        searchPlaceholder: "Search prospects...",
        filters,
        onRowClick: (row) => setSelected(row),
        emptyTitle: "No prospects found",
        emptyDescription: "Try adjusting your search or filter criteria.",
        exportFilename: "pipeline-export"
      }
    ),
    /* @__PURE__ */ jsx(
      ProspectDetail,
      {
        prospect: selected,
        open: !!selected,
        onClose: () => setSelected(null)
      }
    )
  ] });
}

const $$Pipeline = createComponent(async ($$result, $$props, $$slots) => {
  const BASE = "/";
  const { prospects } = await loadAdminData();
  const stageOrder = ["Lead", "Initial Contact", "Questions Sent", "Fee Proposal", "Contract", "Onboarding", "Active Client", "Handed to RM"];
  const prospectsByStage = {};
  for (const p of prospects) {
    if (!prospectsByStage[p.stage]) prospectsByStage[p.stage] = [];
    prospectsByStage[p.stage].push(p);
  }
  const stageChartData = stageOrder.map((stage) => {
    const items = prospectsByStage[stage] || [];
    return {
      stage,
      count: items.length,
      value: items.reduce((s, p) => s + p.dafSize, 0)
    };
  });
  const totalValue = prospects.reduce((s, p) => s + p.dafSize, 0);
  const overdueCount = prospects.filter((p) => p.followUpStatus === "Overdue").length;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Pipeline - Prism Admin", "activePage": "pipeline" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: "Admin", href: `${BASE}admin` }, { label: "Pipeline" }] })}  ${maybeRenderHead()}<div class="mb-6 animate-fade-up"> <h2 class="text-2xl font-bold text-slate-900">Pipeline</h2> <p class="text-sm text-slate-500 mt-1">Prospect management and conversion tracking</p> </div>  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Prospects</p> <p class="text-xl font-bold text-slate-900 mt-1">${prospects.length}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-1"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Value</p> <p class="text-xl font-bold text-slate-900 mt-1">${formatCurrency$1(totalValue)}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-2"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Overdue Follow-ups</p> <p class="text-xl font-bold text-red-600 mt-1">${overdueCount}</p> </div> </div>  <div class="mb-6 animate-fade-up-3"> ${renderComponent($$result2, "StageBarChart", StageBarChart, { "client:visible": true, "data": stageChartData, "title": "Prospects by Pipeline Stage", "client:component-hydration": "visible", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/admin/StageBarChart", "client:component-export": "default" })} </div>  <div class="animate-fade-up-3"> ${renderComponent($$result2, "PipelineTable", PipelineTable, { "client:load": true, "prospects": JSON.parse(JSON.stringify(prospects)), "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/admin/PipelineTable", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/admin/pipeline.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/admin/pipeline.astro";
const $$url = "/admin/pipeline";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pipeline,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
