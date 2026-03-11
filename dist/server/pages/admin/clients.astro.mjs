/* empty css                                      */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Dh-RJMVH.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CsHHIwUj.mjs';
import { $ as $$Breadcrumbs } from '../../chunks/Breadcrumbs_BYcnf3X3.mjs';
import { f as formatDate, a as formatCurrencyFull, l as loadAdminData, b as formatCurrency } from '../../chunks/data-loader_CbTPm3y6.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { D as DataTable } from '../../chunks/DataTable_DmZydwVI.mjs';
import { S as StatusBadge } from '../../chunks/StatusBadge_D7ZsDAHk.mjs';
import { E as ErrorBoundary } from '../../chunks/ErrorBoundary_D9-bXlGr.mjs';
import { S as SlidePanel } from '../../chunks/SlidePanel_C5CbSYg-.mjs';
export { renderers } from '../../renderers.mjs';

function ClientDetail({ client, open, onClose }) {
  if (!client) return null;
  const totalNonZero = client.totalValue > 0;
  const cashPct = totalNonZero ? client.cashBalance / client.totalValue * 100 : 0;
  const investPct = totalNonZero ? client.investmentBalance / client.totalValue * 100 : 0;
  const offshorePct = totalNonZero ? client.offshoreBalance / client.totalValue * 100 : 0;
  return /* @__PURE__ */ jsxs(SlidePanel, { open, onClose, title: client.name, subtitle: client.accountNumber, children: [
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Account Details" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Account Number" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-mono text-slate-700", children: client.accountNumber })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Entity" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: client.entity })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Type" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: client.accountType })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Status" }),
          /* @__PURE__ */ jsx(StatusBadge, { status: client.status })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Relationship Manager" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: client.relationshipManager })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Onboarded" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: formatDate(client.onboardedDate) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxs("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: [
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" }),
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 6h.008v.008H6V6z" })
            ] }),
            "Impact Category"
          ] }) }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: client.impactCategory || "N/A" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxs("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: [
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" }),
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" })
            ] }),
            "Location"
          ] }) }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: client.location || "N/A" })
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
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", children: client.ukGifts ?? "N/A" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: "Overseas Gifts" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", children: client.overseasGifts ?? "N/A" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: "Asset Types" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", children: client.assetTypes?.join(", ") || "N/A" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: "Investment Account" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", children: client.hasInvestmentAccount ? "Yes" : "No" })
        ] }),
        client.hasInvestmentAccount && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: "Provider" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", children: client.investmentProvider || "N/A" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: "Account Manager" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", children: client.accountManager || "N/A" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: "Gift Eligible" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", children: client.giftEligible != null ? client.giftEligible ? "Yes" : "No" : "N/A" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: "Donor Count" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", children: client.donorCount ?? "N/A" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Balance Breakdown" }),
      totalNonZero ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex rounded-full h-3 overflow-hidden mb-4", children: [
          cashPct > 0 && /* @__PURE__ */ jsx("div", { className: "bg-blue-400", style: { width: `${cashPct}%` }, title: `Cash: ${cashPct.toFixed(1)}%` }),
          investPct > 0 && /* @__PURE__ */ jsx("div", { className: "bg-navy-500", style: { width: `${investPct}%` }, title: `Investments: ${investPct.toFixed(1)}%` }),
          offshorePct > 0 && /* @__PURE__ */ jsx("div", { className: "bg-gold-500", style: { width: `${offshorePct}%` }, title: `Offshore: ${offshorePct.toFixed(1)}%` })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-full bg-blue-400" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Cash" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-700", children: formatCurrencyFull(client.cashBalance) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-full bg-navy-500" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Investments" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-700", children: formatCurrencyFull(client.investmentBalance) })
          ] }),
          client.offshoreBalance > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-full bg-gold-500" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Offshore" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-700", children: formatCurrencyFull(client.offshoreBalance) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-slate-100", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-700", children: "Total Value" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-slate-900", children: formatCurrencyFull(client.totalValue) })
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: "No balances yet" })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Performance" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "YTD Return" }),
        client.ytdReturn > 0 ? /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-emerald-600", children: [
          "+",
          client.ytdReturn,
          "%"
        ] }) : client.ytdReturn < 0 ? /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-red-600", children: [
          client.ytdReturn,
          "%"
        ] }) : /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-400", children: "-" })
      ] })
    ] })
  ] });
}

const columns = [
  {
    key: "name",
    header: "Name",
    render: (row) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-900", children: row.name }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 font-mono", children: row.accountNumber })
    ] })
  },
  {
    key: "entity",
    header: "Entity",
    align: "center",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-600", children: row.entity })
  },
  {
    key: "accountType",
    header: "Type",
    align: "center",
    render: (row) => /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${row.accountType === "DAF" ? "bg-navy-50 text-navy-700" : "bg-gold-50 text-gold-700"}`, children: row.accountType === "Collective Fund" ? "CF" : "DAF" })
  },
  {
    key: "status",
    header: "Status",
    align: "center",
    render: (row) => /* @__PURE__ */ jsx(StatusBadge, { status: row.status })
  },
  {
    key: "cashBalance",
    header: "Cash",
    align: "right",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-600", children: row.cashBalance > 0 ? formatCurrencyFull(row.cashBalance) : "-" })
  },
  {
    key: "investmentBalance",
    header: "Investments",
    align: "right",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-600", children: row.investmentBalance > 0 ? formatCurrencyFull(row.investmentBalance) : "-" })
  },
  {
    key: "totalValue",
    header: "Total Value",
    align: "right",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-900", children: row.totalValue > 0 ? formatCurrencyFull(row.totalValue) : "-" }),
    sortValue: (row) => row.totalValue
  },
  {
    key: "ytdReturn",
    header: "YTD Return",
    align: "center",
    render: (row) => {
      if (row.ytdReturn > 0) return /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold text-emerald-600", children: [
        "+",
        row.ytdReturn,
        "%"
      ] });
      if (row.ytdReturn < 0) return /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold text-red-600", children: [
        row.ytdReturn,
        "%"
      ] });
      return /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400", children: "-" });
    },
    sortValue: (row) => row.ytdReturn
  },
  {
    key: "relationshipManager",
    header: "RM",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: row.relationshipManager.split(" ")[0] })
  },
  {
    key: "onboardedDate",
    header: "Onboarded",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: formatDate(row.onboardedDate) })
  }
];
const filters = [
  {
    key: "status",
    label: "Status",
    options: [
      { value: "Active", label: "Active" },
      { value: "Pending", label: "Pending" },
      { value: "Closed", label: "Closed" }
    ]
  },
  {
    key: "accountType",
    label: "Type",
    options: [
      { value: "DAF", label: "DAF" },
      { value: "Collective Fund", label: "Collective Fund" }
    ]
  },
  {
    key: "entity",
    label: "Entity",
    options: [
      { value: "PTGF", label: "PTGF" },
      { value: "TPCT", label: "TPCT" },
      { value: "PAL", label: "PAL" },
      { value: "Foundation", label: "Foundation" }
    ]
  }
];
function ClientsTable({ clientAccounts }) {
  const [selected, setSelected] = useState(null);
  return /* @__PURE__ */ jsxs(ErrorBoundary, { children: [
    /* @__PURE__ */ jsx(
      DataTable,
      {
        data: clientAccounts,
        columns,
        searchKeys: ["name", "accountNumber"],
        searchPlaceholder: "Search accounts...",
        filters,
        onRowClick: (row) => setSelected(row),
        emptyTitle: "No accounts found",
        emptyDescription: "Try adjusting your search or filter criteria.",
        exportFilename: "clients-export"
      }
    ),
    /* @__PURE__ */ jsx(
      ClientDetail,
      {
        client: selected,
        open: !!selected,
        onClose: () => setSelected(null)
      }
    )
  ] });
}

const $$Clients = createComponent(async ($$result, $$props, $$slots) => {
  const BASE = "/";
  const { clientAccounts: accounts } = await loadAdminData();
  const activeAccounts = accounts.filter((a) => a.status === "Active");
  const pendingAccounts = accounts.filter((a) => a.status === "Pending");
  const totalAUM = activeAccounts.reduce((s, a) => s + a.totalValue, 0);
  const avgFundValue = activeAccounts.length > 0 ? totalAUM / activeAccounts.length : 0;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Client Accounts - Prism Admin", "activePage": "clients" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: "Admin", href: `${BASE}admin` }, { label: "Client Accounts" }] })} ${maybeRenderHead()}<div class="mb-6 animate-fade-up"> <h2 class="text-2xl font-bold text-slate-900">Client Accounts</h2> <p class="text-sm text-slate-500 mt-1">Fund administration and account overview</p> </div>  <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6"> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total AUM</p> <p class="text-xl font-bold text-slate-900 mt-1">${formatCurrency(totalAUM)}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-1"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Active Accounts</p> <p class="text-xl font-bold text-emerald-600 mt-1">${activeAccounts.length}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-2"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Pending</p> <p class="text-xl font-bold text-amber-600 mt-1">${pendingAccounts.length}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-3"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Avg Fund Value</p> <p class="text-xl font-bold text-slate-900 mt-1">${formatCurrency(avgFundValue)}</p> </div> </div>  <div class="animate-fade-up-4"> ${renderComponent($$result2, "ClientsTable", ClientsTable, { "client:load": true, "clientAccounts": JSON.parse(JSON.stringify(accounts)), "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/admin/ClientsTable", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/admin/clients.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/admin/clients.astro";
const $$url = "/admin/clients";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Clients,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
