/* empty css                                   */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_C-UfuYaI.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_QPEmlEUL.mjs';
import { $ as $$Breadcrumbs } from '../chunks/Breadcrumbs_BtEFtbP1.mjs';
import { e as getQuarter, l as loadAdminData, b as formatCurrency$3 } from '../chunks/data-loader_Bff0kFPl.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useMemo, useState } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell, PieChart, Pie, Legend } from 'recharts';
import { E as ErrorBoundary } from '../chunks/ErrorBoundary_D9-bXlGr.mjs';
export { renderers } from '../renderers.mjs';

const STAGE_ORDER = [
  "Lead",
  "Initial Contact",
  "Questions Sent",
  "Fee Proposal",
  "Contract",
  "Onboarding",
  "Active Client",
  "Handed to RM"
];
const STAGE_COLORS = {
  "Lead": "#64748b",
  "Initial Contact": "#2563eb",
  "Questions Sent": "#4f46e5",
  "Fee Proposal": "#7c3aed",
  "Contract": "#d97706",
  "Onboarding": "#ea580c",
  "Active Client": "#059669",
  "Handed to RM": "#16a34a"
};
function formatCurrency$2(amount) {
  if (amount >= 1e6) return `£${(amount / 1e6).toFixed(1)}M`;
  if (amount >= 1e3) return `£${(amount / 1e3).toFixed(0)}K`;
  return `£${amount.toLocaleString()}`;
}
function CustomTooltip$1({ active, payload }) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg border border-slate-200 px-4 py-3", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-800", children: data.stage }),
    /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-500", children: [
      data.count,
      " prospect",
      data.count !== 1 ? "s" : "",
      " · ",
      formatCurrency$2(data.value)
    ] })
  ] });
}
function PipelineFunnelChart({ prospects }) {
  const { chartData, totalValue } = useMemo(() => {
    const byStage = {};
    for (const p of prospects) {
      if (!byStage[p.stage]) byStage[p.stage] = { count: 0, value: 0 };
      byStage[p.stage].count += 1;
      byStage[p.stage].value += p.dafSize;
    }
    const data = STAGE_ORDER.map((stage) => ({
      stage,
      count: byStage[stage]?.count || 0,
      value: byStage[stage]?.value || 0
    }));
    const total = prospects.reduce((sum, p) => sum + p.dafSize, 0);
    return { chartData: data, totalValue: total };
  }, [prospects]);
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800", children: "Pipeline Funnel" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-400 mt-0.5", children: [
        "Total pipeline: ",
        formatCurrency$2(totalValue)
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "h-72", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
      BarChart,
      {
        data: chartData,
        layout: "vertical",
        margin: { top: 0, right: 16, bottom: 0, left: 0 },
        barCategoryGap: "16%",
        children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0", horizontal: false }),
          /* @__PURE__ */ jsx(
            XAxis,
            {
              type: "number",
              tick: { fontSize: 12, fill: "#94a3b8" },
              axisLine: false,
              tickLine: false,
              allowDecimals: false
            }
          ),
          /* @__PURE__ */ jsx(
            YAxis,
            {
              type: "category",
              dataKey: "stage",
              width: 110,
              tick: { fontSize: 12, fill: "#64748b" },
              axisLine: false,
              tickLine: false
            }
          ),
          /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip$1, {}), cursor: { fill: "rgba(0,0,0,0.02)" } }),
          /* @__PURE__ */ jsx(Bar, { dataKey: "count", radius: [0, 4, 4, 0], barSize: 22, children: chartData.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: STAGE_COLORS[entry.stage] || "#64748b" }, `cell-${index}`)) })
        ]
      }
    ) }) })
  ] }) });
}

const COLORS = [
  "#1e3a5f",
  "#c5a55a",
  "#059669",
  "#2563eb",
  "#7c3aed",
  "#d97706",
  "#dc2626",
  "#0d9488",
  "#4f46e5",
  "#64748b"
];
function formatCurrency$1(amount) {
  if (amount >= 1e6) return `£${(amount / 1e6).toFixed(1)}M`;
  if (amount >= 1e3) return `£${(amount / 1e3).toFixed(0)}K`;
  return `£${amount.toLocaleString()}`;
}
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg border border-slate-200 px-4 py-3", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-800", children: data.area }),
    /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-500", children: [
      formatCurrency$1(data.amount),
      " (",
      data.percentage,
      "%)"
    ] })
  ] });
}
function GrantDistributionChart({ grants }) {
  const chartData = useMemo(() => {
    const byArea = {};
    for (const g of grants) {
      byArea[g.issueArea] = (byArea[g.issueArea] || 0) + g.amount;
    }
    const total = Object.values(byArea).reduce((s, v) => s + v, 0);
    return Object.entries(byArea).map(([area, amount]) => ({
      area,
      amount,
      percentage: total > 0 ? Math.round(amount / total * 100) : 0
    })).sort((a, b) => b.amount - a.amount);
  }, [grants]);
  const totalAmount = chartData.reduce((s, d) => s + d.amount, 0);
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800", children: "Grant Distribution" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-400 mt-0.5", children: [
        "Total: ",
        formatCurrency$1(totalAmount),
        " across ",
        chartData.length,
        " areas"
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "h-64", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
      /* @__PURE__ */ jsx(
        Pie,
        {
          data: chartData,
          cx: "50%",
          cy: "50%",
          innerRadius: 60,
          outerRadius: 90,
          paddingAngle: 2,
          dataKey: "amount",
          nameKey: "area",
          stroke: "none",
          children: chartData.map((_, index) => /* @__PURE__ */ jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))
        }
      ),
      /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip, {}) }),
      /* @__PURE__ */ jsx(
        Legend,
        {
          formatter: (value) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-600", children: value }),
          iconType: "circle",
          iconSize: 8,
          wrapperStyle: { fontSize: 12 }
        }
      )
    ] }) }) })
  ] }) });
}

const CURRENT_DATE = /* @__PURE__ */ new Date("2026-03-11");
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
const ADMIN_ACTIVITIES = [
  { type: "grant", title: "Grant GR-2026-0458 approved", description: "Emergency Relief Fund — £100,000 to British Red Cross", timestamp: "2026-03-10T14:30:00", aiGenerated: true },
  { type: "compliance", title: "DD check completed", description: "NSPCC — all documents verified, charity registration confirmed", timestamp: "2026-03-10T11:15:00", aiGenerated: true },
  { type: "prospect", title: "New prospect entered pipeline", description: "Beatrice Dunmore — £500K DAF via website enquiry", timestamp: "2026-03-10T09:45:00", aiGenerated: false },
  { type: "client", title: "Onboarding milestone", description: "Sir Geoffrey Hartwell — KYC documentation received", timestamp: "2026-03-09T16:00:00", aiGenerated: false },
  { type: "grant", title: "Grant payment sent", description: "£250,000 to NSPCC — Annual Support Grant (PRISM-2025-0722-NSPCC-1)", timestamp: "2026-03-09T10:30:00", aiGenerated: false },
  { type: "meeting", title: "L&L completed", description: "Philanthropy Tax Planning — Evelyn Partners, 14 attendees, 3 prospects", timestamp: "2026-03-08T17:00:00", aiGenerated: false },
  { type: "compliance", title: "Document expiry alert", description: "BHF Contact ID Verification expired — renewal requested", timestamp: "2026-03-08T09:00:00", aiGenerated: true },
  { type: "prospect", title: "Stage progression", description: "Robert Windham KC moved to Fee Proposal — verbal acceptance", timestamp: "2026-03-07T15:30:00", aiGenerated: false }
];
const iconConfig = {
  grant: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" }) })
  },
  compliance: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) })
  },
  prospect: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" }) })
  },
  client: {
    bg: "bg-navy-50",
    text: "text-navy-600",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" }) })
  },
  meeting: {
    bg: "bg-gold-50",
    text: "text-gold-600",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" }) })
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
function AdminActivityFeed({ basePath = "/" }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm", children: [
    /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-slate-100", children: /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800", children: "Recent Activity" }) }),
    /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-50", children: ADMIN_ACTIVITIES.map((activity, idx) => {
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
    /* @__PURE__ */ jsx("div", { className: "px-6 py-3 border-t border-slate-100", children: /* @__PURE__ */ jsx(
      "a",
      {
        href: `${basePath}admin/activities`,
        className: "text-sm font-medium text-navy-600 hover:text-navy-700 transition-colors",
        children: "View all activities →"
      }
    ) })
  ] });
}

const PERIODS = ["Q1", "Q2", "Q3", "Q4", "Annual"];
function DashboardTimeFilter({ selected, onSelect }) {
  return /* @__PURE__ */ jsx("div", { className: "flex gap-1 bg-slate-100 rounded-lg p-1", children: PERIODS.map((period) => /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => onSelect(period),
      className: `px-3 py-1.5 rounded-md text-sm font-medium transition-all ${selected === period ? "bg-white shadow-sm text-navy-700" : "text-slate-600 hover:text-slate-900"}`,
      children: period
    },
    period
  )) });
}

function formatCurrency(amount) {
  if (amount >= 1e6) return `£${(amount / 1e6).toFixed(1)}M`;
  if (amount >= 1e3) return `£${(amount / 1e3).toFixed(0)}K`;
  return `£${amount.toLocaleString()}`;
}
function DashboardFilteredMetrics({
  prospects,
  clientAccounts,
  grants,
  firms
}) {
  const [selectedPeriod, setSelectedPeriod] = useState("Q1");
  const stats = useMemo(() => {
    const filterByQuarter = (dateStr) => {
      if (selectedPeriod === "Annual") return true;
      const q = getQuarter(dateStr);
      if (q !== selectedPeriod) return false;
      const year = new Date(dateStr).getFullYear();
      if (selectedPeriod === "Q1") return year === 2026;
      return year === 2025;
    };
    const filteredProspects = prospects.filter((p) => filterByQuarter(p.dateEnteredPipeline));
    const filteredAccounts = selectedPeriod === "Annual" ? clientAccounts : clientAccounts.filter((a) => filterByQuarter(a.onboardedDate));
    const activeAccounts = filteredAccounts.filter((a) => a.status === "Active");
    const filteredGrants = selectedPeriod === "Annual" ? grants : grants.filter((g) => filterByQuarter(g.dateRequested));
    const grantsInProgress = filteredGrants.filter(
      (g) => !["Paid", "Declined"].includes(g.stage)
    );
    return {
      totalPipelineValue: filteredProspects.reduce((sum, p) => sum + p.dafSize, 0),
      prospectCount: filteredProspects.length,
      activeAccounts: activeAccounts.length,
      dafCount: activeAccounts.filter((a) => a.accountType === "DAF").length,
      cfCount: activeAccounts.filter((a) => a.accountType === "Collective Fund").length,
      grantsPipeline: grantsInProgress.reduce((sum, g) => sum + g.amount, 0),
      grantsCount: grantsInProgress.length,
      firmCount: selectedPeriod === "Annual" ? firms.length : firms.filter((f) => f.status === "Active").length,
      activeFirms: firms.filter((f) => f.status === "Active").length,
      nurturingFirms: firms.filter((f) => f.status === "Nurturing").length
    };
  }, [selectedPeriod, prospects, clientAccounts, grants, firms]);
  const periodLabel = selectedPeriod === "Annual" ? "All Time" : `${selectedPeriod} ${selectedPeriod === "Q1" ? "2026" : "2025"}`;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-sm text-slate-500", children: [
        "Showing: ",
        periodLabel
      ] }),
      /* @__PURE__ */ jsx(DashboardTimeFilter, { selected: selectedPeriod, onSelect: setSelectedPeriod })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-slate-500 uppercase tracking-wider", children: "Pipeline Value" }),
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-navy-50 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-navy-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" }) }) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-slate-900", children: formatCurrency(stats.totalPipelineValue) }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500 mt-1", children: [
          stats.prospectCount,
          " prospects"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-slate-500 uppercase tracking-wider", children: "Active Accounts" }),
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-emerald-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" }) }) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-slate-900", children: stats.activeAccounts }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500 mt-1", children: [
          stats.dafCount,
          " DAF · ",
          stats.cfCount,
          " CF"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-slate-500 uppercase tracking-wider", children: "Grants Pipeline" }),
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-purple-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" }) }) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-slate-900", children: formatCurrency(stats.grantsPipeline) }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500 mt-1", children: [
          stats.grantsCount,
          " grants in progress"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-slate-500 uppercase tracking-wider", children: "Intermediary Network" }),
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-gold-50 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-gold-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 1.5, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" }) }) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-slate-900", children: stats.firmCount }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-500 mt-1", children: [
          stats.activeFirms,
          " active · ",
          stats.nurturingFirms,
          " nurturing"
        ] })
      ] })
    ] })
  ] });
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const BASE = "/";
  const { prospects, firms, contacts, clientAccounts, grants, bdActivities } = await loadAdminData();
  const prospectsByStage = {};
  for (const p of prospects) {
    if (!prospectsByStage[p.stage]) prospectsByStage[p.stage] = [];
    prospectsByStage[p.stage].push(p);
  }
  const activeAccountsList = clientAccounts.filter((a) => a.status === "Active");
  ({
    totalPipelineValue: prospects.reduce((sum, p) => sum + p.dafSize, 0),
    activeAccounts: activeAccountsList.length,
    dafCount: activeAccountsList.filter((a) => a.accountType === "DAF").length,
    cfCount: activeAccountsList.filter((a) => a.accountType === "Collective Fund").length,
    grantsPipeline: grants.filter((g) => !["Paid", "Declined"].includes(g.stage)).reduce((sum, g) => sum + g.amount, 0),
    grantsCount: grants.filter((g) => !["Paid", "Declined"].includes(g.stage)).length,
    paidGrants: grants.filter((g) => g.stage === "Paid").reduce((sum, g) => sum + g.amount, 0),
    approvedGrants: grants.filter((g) => g.stage === "Approved").reduce((sum, g) => sum + g.amount, 0),
    firmCount: firms.length,
    activeFirms: firms.filter((f) => f.status === "Active").length,
    nurturingFirms: firms.filter((f) => f.status === "Nurturing").length,
    overdueFollowUps: prospects.filter((p) => p.followUpStatus === "Overdue").length
  });
  const stageOrder = ["Lead", "Initial Contact", "Questions Sent", "Fee Proposal", "Contract", "Onboarding", "Active Client", "Handed to RM"];
  const stageColors = {
    "Lead": "bg-slate-100 text-slate-700",
    "Initial Contact": "bg-blue-100 text-blue-700",
    "Questions Sent": "bg-indigo-100 text-indigo-700",
    "Fee Proposal": "bg-purple-100 text-purple-700",
    "Contract": "bg-amber-100 text-amber-700",
    "Onboarding": "bg-orange-100 text-orange-700",
    "Active Client": "bg-emerald-100 text-emerald-700",
    "Handed to RM": "bg-green-100 text-green-700"
  };
  const pipelineFunnel = stageOrder.map((stage) => {
    const items = prospectsByStage[stage] || [];
    return {
      stage,
      count: items.length,
      value: items.reduce((s, p) => s + p.dafSize, 0)
    };
  });
  const highProb = prospects.filter((p) => p.conversionProbability === "High");
  const medProb = prospects.filter((p) => p.conversionProbability === "Medium");
  const lowProb = prospects.filter((p) => p.conversionProbability === "Low");
  const paidGrants = grants.filter((g) => g.stage === "Paid");
  const approvedGrants = grants.filter((g) => g.stage === "Approved");
  const inReviewGrants = grants.filter((g) => g.stage === "In Review");
  const earlierGrants = grants.filter((g) => !["Paid", "Approved", "In Review", "Declined"].includes(g.stage));
  const overdueProspects = prospects.filter((p) => p.followUpStatus === "Overdue");
  const ddIncomplete = grants.filter((g) => g.ddStatus !== "Complete" && g.ddStatus !== "Failed" && g.stage !== "Declined" && g.stage !== "Paid");
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Admin Dashboard - Prism", "activePage": "dashboard" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: "Admin", href: `${BASE}admin` }, { label: "Dashboard" }] })}  ${maybeRenderHead()}<div class="mb-8 animate-fade-up"> <h2 class="text-2xl font-bold text-slate-900">Dashboard</h2> <p class="text-sm text-slate-500 mt-1">Overview of pipeline, grants, and business development as of 10 Mar 2026</p> </div>  <div class="mb-8 animate-fade-up"> ${renderComponent($$result2, "DashboardFilteredMetrics", DashboardFilteredMetrics, { "client:load": true, "prospects": JSON.parse(JSON.stringify(prospects)), "clientAccounts": JSON.parse(JSON.stringify(clientAccounts)), "grants": JSON.parse(JSON.stringify(grants)), "firms": JSON.parse(JSON.stringify(firms)), "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/admin/DashboardFilteredMetrics", "client:component-export": "default" })} </div>  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"> <div class="animate-fade-up-4"> ${renderComponent($$result2, "PipelineFunnelChart", PipelineFunnelChart, { "client:visible": true, "prospects": prospects, "client:component-hydration": "visible", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/admin/PipelineFunnelChart", "client:component-export": "default" })} </div> <div class="animate-fade-up-4"> ${renderComponent($$result2, "GrantDistributionChart", GrantDistributionChart, { "client:visible": true, "grants": grants, "client:component-hydration": "visible", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/admin/GrantDistributionChart", "client:component-export": "default" })} </div> </div>  <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8 animate-fade-up-4"> <h3 class="text-base font-semibold text-slate-900 mb-4">Pipeline Funnel</h3> <div class="overflow-x-auto"> <table class="w-full text-sm"> <thead> <tr class="text-left text-xs text-slate-500 uppercase tracking-wider"> <th class="pb-3 pr-4">Stage</th> <th class="pb-3 pr-4 text-center">Prospects</th> <th class="pb-3 pr-4 text-right">Value</th> <th class="pb-3 w-1/3">Distribution</th> </tr> </thead> <tbody class="divide-y divide-slate-100"> ${pipelineFunnel.map((item) => {
    const maxValue = Math.max(...pipelineFunnel.map((f) => f.value));
    const barWidth = maxValue > 0 ? item.value / maxValue * 100 : 0;
    return renderTemplate`<tr class="hover:bg-slate-50"> <td class="py-2.5 pr-4"> <span${addAttribute(`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stageColors[item.stage]}`, "class")}> ${item.stage} </span> </td> <td class="py-2.5 pr-4 text-center font-medium text-slate-700">${item.count}</td> <td class="py-2.5 pr-4 text-right font-medium text-slate-700">${formatCurrency$3(item.value)}</td> <td class="py-2.5"> <div class="w-full bg-slate-100 rounded-full h-2.5"> <div class="bg-navy-500 h-2.5 rounded-full transition-all duration-500"${addAttribute(`width: ${barWidth}%`, "style")}></div> </div> </td> </tr>`;
  })} </tbody> </table> </div> </div>  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"> <!-- Conversion Probability --> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-fade-up"> <h3 class="text-base font-semibold text-slate-900 mb-4">Conversion Probability</h3> <div class="space-y-4"> <div class="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-100"> <div class="flex items-center gap-3"> <div class="w-3 h-3 rounded-full bg-emerald-500"></div> <span class="text-sm font-medium text-slate-700">High</span> </div> <div class="text-right"> <span class="text-sm font-bold text-slate-900">${highProb.length} prospects</span> <span class="text-xs text-slate-500 ml-2">${formatCurrency$3(highProb.reduce((s, p) => s + p.dafSize, 0))}</span> </div> </div> <div class="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-100"> <div class="flex items-center gap-3"> <div class="w-3 h-3 rounded-full bg-amber-500"></div> <span class="text-sm font-medium text-slate-700">Medium</span> </div> <div class="text-right"> <span class="text-sm font-bold text-slate-900">${medProb.length} prospects</span> <span class="text-xs text-slate-500 ml-2">${formatCurrency$3(medProb.reduce((s, p) => s + p.dafSize, 0))}</span> </div> </div> <div class="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100"> <div class="flex items-center gap-3"> <div class="w-3 h-3 rounded-full bg-red-500"></div> <span class="text-sm font-medium text-slate-700">Low</span> </div> <div class="text-right"> <span class="text-sm font-bold text-slate-900">${lowProb.length} prospects</span> <span class="text-xs text-slate-500 ml-2">${formatCurrency$3(lowProb.reduce((s, p) => s + p.dafSize, 0))}</span> </div> </div> </div> </div> <!-- Grant Stages --> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-fade-up-1"> <h3 class="text-base font-semibold text-slate-900 mb-4">Grant Stages</h3> <div class="space-y-4"> <div class="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-100"> <div class="flex items-center gap-3"> <div class="w-3 h-3 rounded-full bg-green-500"></div> <span class="text-sm font-medium text-slate-700">Paid</span> </div> <div class="text-right"> <span class="text-sm font-bold text-slate-900">${paidGrants.length} grants</span> <span class="text-xs text-slate-500 ml-2">${formatCurrency$3(paidGrants.reduce((s, g) => s + g.amount, 0))}</span> </div> </div> <div class="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100"> <div class="flex items-center gap-3"> <div class="w-3 h-3 rounded-full bg-blue-500"></div> <span class="text-sm font-medium text-slate-700">Approved</span> </div> <div class="text-right"> <span class="text-sm font-bold text-slate-900">${approvedGrants.length} grants</span> <span class="text-xs text-slate-500 ml-2">${formatCurrency$3(approvedGrants.reduce((s, g) => s + g.amount, 0))}</span> </div> </div> <div class="flex items-center justify-between p-3 rounded-lg bg-indigo-50 border border-indigo-100"> <div class="flex items-center gap-3"> <div class="w-3 h-3 rounded-full bg-indigo-500"></div> <span class="text-sm font-medium text-slate-700">In Review</span> </div> <div class="text-right"> <span class="text-sm font-bold text-slate-900">${inReviewGrants.length} grants</span> <span class="text-xs text-slate-500 ml-2">${formatCurrency$3(inReviewGrants.reduce((s, g) => s + g.amount, 0))}</span> </div> </div> <div class="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200"> <div class="flex items-center gap-3"> <div class="w-3 h-3 rounded-full bg-slate-400"></div> <span class="text-sm font-medium text-slate-700">Earlier Stages</span> </div> <div class="text-right"> <span class="text-sm font-bold text-slate-900">${earlierGrants.length} grants</span> <span class="text-xs text-slate-500 ml-2">${formatCurrency$3(earlierGrants.reduce((s, g) => s + g.amount, 0))}</span> </div> </div> </div> </div> </div>  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"> <!-- Overdue Follow-ups --> ${overdueProspects.length > 0 && renderTemplate`<div class="bg-red-50 rounded-xl border border-red-200 p-5 animate-fade-up-2"> <div class="flex items-center gap-2 mb-3"> <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"></path> </svg> <h4 class="text-sm font-semibold text-red-800">Overdue Follow-ups (${overdueProspects.length})</h4> </div> <ul class="space-y-1.5"> ${overdueProspects.map((p) => renderTemplate`<li class="text-sm text-red-700 flex items-center gap-2"> <span class="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span> <span class="font-medium">${p.name}</span> <span class="text-red-500">&mdash; ${p.stage}</span> </li>`)} </ul> </div>`} <!-- DD Incomplete --> ${ddIncomplete.length > 0 && renderTemplate`<div class="bg-amber-50 rounded-xl border border-amber-200 p-5 animate-fade-up-3"> <div class="flex items-center gap-2 mb-3"> <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <h4 class="text-sm font-semibold text-amber-800">Grants Awaiting DD (${ddIncomplete.length})</h4> </div> <ul class="space-y-1.5"> ${ddIncomplete.map((g) => renderTemplate`<li class="text-sm text-amber-700 flex items-center gap-2"> <span class="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"></span> <span class="font-medium">${g.charity}</span> <span class="text-amber-500">&mdash; ${g.ddStatus}</span> </li>`)} </ul> </div>`} </div>  <div class="mb-8 animate-fade-up"> ${renderComponent($$result2, "AdminActivityFeed", AdminActivityFeed, { "client:visible": true, "basePath": BASE, "client:component-hydration": "visible", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/admin/AdminActivityFeed", "client:component-export": "default" })} </div>  <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-fade-up-4"> <h3 class="text-base font-semibold text-slate-900 mb-4">Quick Actions</h3> <div class="flex flex-wrap gap-3"> <a${addAttribute(`${"/"}admin/pipeline`, "href")} class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-navy-600 text-white text-sm font-medium hover:bg-navy-700 transition-colors"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path> </svg>
Add Prospect
</a> <a${addAttribute(`${"/"}admin/contacts`, "href")} class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"></path> </svg>
Log Interaction
</a> <a${addAttribute(`${"/"}admin/grants`, "href")} class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path> </svg>
New Grant
</a> <a${addAttribute(`${"/"}admin/activities`, "href")} class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path> </svg>
Schedule Meeting
</a> </div> </div> ` })}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/admin/index.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
