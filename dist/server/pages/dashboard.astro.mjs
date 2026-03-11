/* empty css                                   */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../chunks/astro/server_Dh-RJMVH.mjs';
import 'piccolore';
import { l as loadDonorClient, $ as $$DashboardLayout } from '../chunks/donor-data-loader_IbvCAMWK.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect, useMemo } from 'react';
import { a as formatCurrency } from '../chunks/format_Cc7EDVuw.mjs';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Area } from 'recharts';
import { P as PendingGrants } from '../chunks/PendingGrants_BRLiunwn.mjs';
export { renderers } from '../renderers.mjs';

function useCountUp(target, duration = 600) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const startTime = performance.now();
    let frame;
    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(target * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return current;
}
function Card({ label, value, icon, accent, badge }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `relative rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md ${accent ? "bg-navy-600 border-navy-500 text-white" : "bg-white border-slate-200 text-slate-800"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `flex items-center justify-center w-10 h-10 rounded-lg ${accent ? "bg-navy-500" : "bg-slate-50"}`,
              children: icon
            }
          ),
          badge
        ] }),
        /* @__PURE__ */ jsx(
          "p",
          {
            className: `text-xs font-medium uppercase tracking-wider mb-1 ${accent ? "text-navy-200" : "text-slate-400"}`,
            children: label
          }
        ),
        /* @__PURE__ */ jsx("p", { className: `text-2xl font-semibold ${accent ? "text-white" : "text-slate-800"}`, children: value })
      ]
    }
  );
}
function BalanceCards({ balances, ytdReturn, accountType }) {
  const showOffshore = accountType === "Collective Fund" && balances.offshore != null;
  const gridCols = showOffshore ? "md:grid-cols-4" : "md:grid-cols-3";
  const animatedCash = useCountUp(balances.cash);
  const animatedInvestments = useCountUp(balances.investments);
  const animatedOffshore = useCountUp(balances.offshore ?? 0);
  const animatedTotal = useCountUp(balances.total);
  return /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-4`, children: [
    /* @__PURE__ */ jsx(
      Card,
      {
        label: "Cash Balance",
        value: formatCurrency(animatedCash),
        icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-slate-400", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) })
      }
    ),
    /* @__PURE__ */ jsx(
      Card,
      {
        label: "Investment Portfolio",
        value: formatCurrency(animatedInvestments),
        icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-slate-400", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" }) })
      }
    ),
    showOffshore && /* @__PURE__ */ jsx(
      Card,
      {
        label: "Offshore Balance",
        value: formatCurrency(animatedOffshore),
        icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-slate-400", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) })
      }
    ),
    /* @__PURE__ */ jsx(
      Card,
      {
        label: "Total Fund Value",
        value: formatCurrency(animatedTotal),
        accent: true,
        icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gold-400", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) }),
        badge: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-300", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 mr-0.5", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 10l7-7m0 0l7 7m-7-7v18" }) }),
          "+",
          ytdReturn,
          "% YTD"
        ] })
      }
    )
  ] });
}

const formatYAxis = (value) => {
  if (value >= 1e6) return `£${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `£${(value / 1e3).toFixed(0)}K`;
  return `£${value}`;
};
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg border border-slate-200 p-3 text-sm", children: [
    /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-700 mb-1", children: label }),
    payload.map((entry) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "w-2.5 h-2.5 rounded-full",
          style: { backgroundColor: entry.stroke }
        }
      ),
      /* @__PURE__ */ jsxs("span", { className: "text-slate-500", children: [
        entry.dataKey === "fundValue" ? "Fund Value" : "Benchmark",
        ":"
      ] }),
      /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-800", children: formatCurrency(entry.value) })
    ] }, entry.dataKey))
  ] });
}
function FundPerformanceChart({ data, fundName }) {
  const [range, setRange] = useState("12M");
  const filteredData = useMemo(() => {
    if (range === "6M") return data.slice(-6);
    if (range === "3M") return data.slice(-3);
    return data;
  }, [data, range]);
  const returnPct = useMemo(() => {
    if (filteredData.length < 2) return 0;
    const first = filteredData[0].fundValue;
    const last = filteredData[filteredData.length - 1].fundValue;
    return (last - first) / first * 100;
  }, [filteredData]);
  const peakValue = useMemo(
    () => Math.max(...data.map((d) => d.fundValue)),
    [data]
  );
  const ranges = ["12M", "6M", "3M"];
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm", children: [
    /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800", children: "Fund Performance" }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 bg-slate-100 rounded-lg p-0.5", children: ranges.map((r) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setRange(r),
          className: `px-3 py-1 rounded-md text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 ${range === r ? "bg-white text-navy-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`,
          children: r
        },
        r
      )) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(AreaChart, { data: filteredData, children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "fundGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#1e3a5f", stopOpacity: 0.15 }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#1e3a5f", stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0" }),
        /* @__PURE__ */ jsx(
          XAxis,
          {
            dataKey: "month",
            tick: { fontSize: 12, fill: "#94a3b8" },
            axisLine: false,
            tickLine: false
          }
        ),
        /* @__PURE__ */ jsx(
          YAxis,
          {
            tickFormatter: formatYAxis,
            tick: { fontSize: 12, fill: "#94a3b8" },
            axisLine: false,
            tickLine: false
          }
        ),
        /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip, {}) }),
        /* @__PURE__ */ jsx(
          Legend,
          {
            formatter: (value) => value === "fundValue" ? "Fund Value" : "Benchmark",
            iconType: "circle",
            wrapperStyle: { fontSize: 12 }
          }
        ),
        /* @__PURE__ */ jsx(
          Area,
          {
            type: "monotone",
            dataKey: "fundValue",
            stroke: "#1e3a5f",
            strokeWidth: 2,
            fill: "url(#fundGradient)"
          }
        ),
        /* @__PURE__ */ jsx(
          Area,
          {
            type: "monotone",
            dataKey: "benchmark",
            stroke: "#94a3b8",
            strokeDasharray: "5 5",
            strokeWidth: 1.5,
            fill: "none"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-slate-100", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: [
            range,
            " Return"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: `text-lg font-semibold ${returnPct >= 0 ? "text-emerald-600" : "text-red-600"}`, children: [
            returnPct >= 0 ? "+" : "",
            returnPct.toFixed(1),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Peak Value" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-slate-800", children: formatCurrency(peakValue) })
        ] })
      ] })
    ] })
  ] });
}

const CURRENT_DATE = /* @__PURE__ */ new Date("2026-03-10");
function relativeTime(timestamp) {
  const diff = CURRENT_DATE.getTime() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 6e4);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}
const iconConfig = {
  income: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 14l-7 7m0 0l-7-7m7 7V3" }) })
  },
  disbursement: {
    bg: "bg-red-50",
    text: "text-red-600",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 10l7-7m0 0l7 7m-7-7v18" }) })
  },
  compliance: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) })
  },
  statement: {
    bg: "bg-gold-50",
    text: "text-gold-600",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) })
  },
  rebalance: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) })
  }
};
const SparkleIcon = () => /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-gold-500 inline-block ml-1", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
  "path",
  {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
  }
) });
function RecentActivity({ activities, maxItems = 6 }) {
  const visibleItems = activities.slice(0, maxItems);
  const hasMore = activities.length > maxItems;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm", children: [
    /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-slate-100", children: /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800", children: "Recent Activity" }) }),
    /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-50", children: visibleItems.map((activity, idx) => {
      const config = iconConfig[activity.type];
      return /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 px-6 py-4", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full ${config.bg} ${config.text}`,
            children: config.icon
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-slate-800", children: [
            activity.title,
            activity.aiGenerated && /* @__PURE__ */ jsx(SparkleIcon, {})
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 line-clamp-1", children: activity.description })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 text-xs text-slate-400 whitespace-nowrap", children: relativeTime(activity.timestamp) })
      ] }, idx);
    }) }),
    hasMore && /* @__PURE__ */ jsx("div", { className: "px-6 py-3 border-t border-slate-100", children: /* @__PURE__ */ jsx("button", { className: "text-sm text-navy-600 hover:text-navy-700 font-medium", children: "View all activity" }) })
  ] });
}

function ImpactSummary({ grants }) {
  const paidGrants = grants.filter((g) => g.status === "Paid");
  const totalGranted = paidGrants.reduce((sum, g) => sum + g.amount, 0);
  const charitiesSupported = paidGrants.length;
  const avgGrantSize = charitiesSupported > 0 ? totalGranted / charitiesSupported : 0;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm", children: [
    /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-red-400", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 1.5,
          d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        }
      ) }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800", children: "Impact Summary" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Total Granted" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-slate-800", children: formatCurrency(totalGranted) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Charities Supported" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-slate-800", children: charitiesSupported })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Avg Grant Size" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-slate-800", children: formatCurrency(avgGrantSize) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 mt-4 pt-4 border-t border-slate-100", children: "Based on completed grants" })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const clientId = Astro2.url.searchParams.get("client") || "ashford";
  const client = await loadDonorClient(clientId);
  if (!client) {
    return Astro2.redirect("/");
  }
  const pendingGrants = client.grants.filter(
    (g) => g.status === "In Review" || g.status === "Requested" || g.status === "Approved"
  );
  const paidGrants = client.grants.filter((g) => g.status === "Paid");
  paidGrants.reduce((sum, g) => sum + g.amount, 0);
  const nextStatement = client.statements[0];
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": `${client.name} - Overview`, "clientId": client.id, "clientName": client.name, "activePage": "overview", "relationshipManager": client.relationshipManager }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <!-- Page header --> <div class="animate-fade-up"> <h2 class="text-2xl font-semibold text-slate-800">Welcome back, ${client.name}</h2> <p class="text-sm text-slate-500 mt-0.5 font-medium">${client.accountType === "DAF" ? "Donor Advised Fund" : "Collective Fund"} &middot; ${client.accountNumber}</p> <p class="text-sm text-slate-400 mt-1">Here's your fund overview as of 10 March 2026</p> <!-- Quick metrics strip --> <div class="flex flex-wrap items-center gap-3 mt-4"> <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100"> <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ${paidGrants.length} grants completed
</span> ${pendingGrants.length > 0 && renderTemplate`<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100"> <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse-subtle"></span> ${pendingGrants.length} in progress
</span>`} <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"> <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path> </svg>
Next statement: ${nextStatement?.period || "Q2 2026"} </span> <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-navy-50 text-navy-600 border border-navy-100"> <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path> </svg>
All compliance checks passed
</span> </div> </div> <!-- Contact Your Relationship Manager --> <div class="animate-fade-up bg-white rounded-xl border border-slate-200 shadow-sm p-5"> <div class="flex flex-col sm:flex-row sm:items-center gap-4"> <div class="flex items-center gap-4 flex-1"> <div class="w-12 h-12 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0"> <span class="text-sm font-bold text-navy-600">${client.relationshipManager.split(" ").map((n) => n[0]).join("")}</span> </div> <div> <p class="text-xs text-slate-400 uppercase tracking-wider">Your Relationship Manager</p> <p class="text-base font-semibold text-slate-800">${client.relationshipManager}</p> <p class="text-xs text-slate-400 mt-0.5">james.whitfield@prismthegiftfund.co.uk &middot; +44 20 7946 0321</p> </div> </div> <div class="flex items-center gap-2 sm:flex-shrink-0"> <a href="mailto:james.whitfield@prismthegiftfund.co.uk" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path> </svg>
Email
</a> <a href="#" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-600 text-sm text-white font-medium hover:bg-navy-700 transition-colors shadow-sm"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path> </svg>
Schedule a Call
</a> </div> </div> </div> <!-- Balance Cards --> <div class="animate-fade-up-1"> ${renderComponent($$result2, "BalanceCards", BalanceCards, { "client:load": true, "balances": client.balances, "ytdReturn": client.ytdReturn, "accountType": client.accountType, "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/BalanceCards", "client:component-export": "default" })} </div> <!-- Impact & Performance row --> <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-up-2"> <div class="xl:col-span-2"> ${renderComponent($$result2, "ImpactSummary", ImpactSummary, { "client:load": true, "grants": client.grants, "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/ImpactSummary", "client:component-export": "default" })} </div> ${renderComponent($$result2, "FundPerformanceChart", FundPerformanceChart, { "client:visible": true, "data": client.monthlyPerformance, "fundName": client.name, "client:component-hydration": "visible", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/FundPerformanceChart", "client:component-export": "default" })} </div> <!-- Activity + Pending --> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-up-3"> ${renderComponent($$result2, "RecentActivity", RecentActivity, { "client:load": true, "activities": client.recentActivity, "maxItems": 6, "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/RecentActivity", "client:component-export": "default" })} ${renderComponent($$result2, "PendingGrants", PendingGrants, { "client:load": true, "grants": pendingGrants, "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/PendingGrants", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/dashboard.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
