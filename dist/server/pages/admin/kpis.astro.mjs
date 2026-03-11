/* empty css                                      */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_Dh-RJMVH.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CsHHIwUj.mjs';
import { $ as $$Breadcrumbs } from '../../chunks/Breadcrumbs_BYcnf3X3.mjs';
import { l as loadAdminData, g as getQuarterlyKPIs } from '../../chunks/data-loader_CbTPm3y6.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useMemo, useState } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar } from 'recharts';
import { E as ErrorBoundary } from '../../chunks/ErrorBoundary_D9-bXlGr.mjs';
export { renderers } from '../../renderers.mjs';

const LABEL_MAP$1 = {
  meetings: "Meetings",
  newProspects: "New Prospects",
  conversions: "Conversions"
};
function CustomTooltip$1({ active, payload, label }) {
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
        LABEL_MAP$1[entry.dataKey] || entry.dataKey,
        ":"
      ] }),
      /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-800", children: entry.value })
    ] }, entry.dataKey))
  ] });
}
function KPITrendChart({ kpis, locationFilter }) {
  const chartData = useMemo(() => {
    if (!locationFilter || locationFilter === "All Locations") return kpis;
    return kpis.map((k) => {
      const loc = k.locationBreakdown?.find((l) => l.location === locationFilter);
      if (!loc) return { ...k, meetings: 0, newProspects: 0, conversions: 0 };
      return { ...k, meetings: loc.meetings, newProspects: 0, conversions: 0 };
    });
  }, [kpis, locationFilter]);
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-slate-800 mb-6", children: [
      "KPI Trends",
      locationFilter && locationFilter !== "All Locations" ? ` — ${locationFilter}` : ""
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-72", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(LineChart, { data: chartData, margin: { top: 5, right: 16, bottom: 5, left: 0 }, children: [
      /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0" }),
      /* @__PURE__ */ jsx(
        XAxis,
        {
          dataKey: "quarter",
          tick: { fontSize: 12, fill: "#94a3b8" },
          axisLine: false,
          tickLine: false
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
      /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip$1, {}) }),
      /* @__PURE__ */ jsx(
        Legend,
        {
          formatter: (value) => LABEL_MAP$1[value] || value,
          iconType: "circle",
          wrapperStyle: { fontSize: 12 }
        }
      ),
      /* @__PURE__ */ jsx(
        Line,
        {
          type: "monotone",
          dataKey: "meetings",
          stroke: "#1e3a5f",
          strokeWidth: 2,
          dot: { r: 4, fill: "#1e3a5f" },
          activeDot: { r: 6 }
        }
      ),
      /* @__PURE__ */ jsx(
        Line,
        {
          type: "monotone",
          dataKey: "newProspects",
          stroke: "#c5a55a",
          strokeWidth: 2,
          dot: { r: 4, fill: "#c5a55a" },
          activeDot: { r: 6 }
        }
      ),
      /* @__PURE__ */ jsx(
        Line,
        {
          type: "monotone",
          dataKey: "conversions",
          stroke: "#059669",
          strokeWidth: 2,
          dot: { r: 4, fill: "#059669" },
          activeDot: { r: 6 }
        }
      )
    ] }) }) })
  ] }) });
}

const LABEL_MAP = {
  meetings: "Meetings",
  lunchAndLearns: "Lunch & Learns",
  events: "Events"
};
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s, e) => s + e.value, 0);
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg border border-slate-200 p-3 text-sm", children: [
    /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-700 mb-1", children: label }),
    payload.map((entry) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "w-2.5 h-2.5 rounded-full",
          style: { backgroundColor: entry.fill }
        }
      ),
      /* @__PURE__ */ jsxs("span", { className: "text-slate-500", children: [
        LABEL_MAP[entry.dataKey] || entry.dataKey,
        ":"
      ] }),
      /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-800", children: entry.value })
    ] }, entry.dataKey)),
    /* @__PURE__ */ jsxs("div", { className: "mt-1 pt-1 border-t border-slate-100 text-slate-500", children: [
      "Total: ",
      /* @__PURE__ */ jsx("span", { className: "font-medium text-slate-800", children: total })
    ] })
  ] });
}
function ConversionFunnelChart({ kpis }) {
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800 mb-6", children: "Activity Breakdown by Quarter" }),
    /* @__PURE__ */ jsx("div", { className: "h-72", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: kpis, margin: { top: 5, right: 16, bottom: 5, left: 0 }, children: [
      /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0", vertical: false }),
      /* @__PURE__ */ jsx(
        XAxis,
        {
          dataKey: "quarter",
          tick: { fontSize: 12, fill: "#94a3b8" },
          axisLine: false,
          tickLine: false
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
      /* @__PURE__ */ jsx(
        Legend,
        {
          formatter: (value) => LABEL_MAP[value] || value,
          iconType: "circle",
          wrapperStyle: { fontSize: 12 }
        }
      ),
      /* @__PURE__ */ jsx(Bar, { dataKey: "meetings", stackId: "a", fill: "#1e3a5f", radius: [0, 0, 0, 0] }),
      /* @__PURE__ */ jsx(Bar, { dataKey: "lunchAndLearns", stackId: "a", fill: "#c5a55a", radius: [0, 0, 0, 0] }),
      /* @__PURE__ */ jsx(Bar, { dataKey: "events", stackId: "a", fill: "#059669", radius: [4, 4, 0, 0] })
    ] }) }) })
  ] }) });
}

const LOCATIONS = ["All Locations", "London", "Edinburgh", "Birmingham", "Manchester", "Leeds", "Glasgow"];
function LocationKPISection({ kpis }) {
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const tableData = useMemo(() => {
    return kpis.map((k) => {
      if (selectedLocation === "All Locations" || !k.locationBreakdown) {
        return {
          quarter: k.quarter,
          meetings: k.meetings,
          lunchAndLearns: k.lunchAndLearns,
          events: k.events,
          referrals: k.locationBreakdown ? k.locationBreakdown.reduce((s, l) => s + l.referrals, 0) : 0
        };
      }
      const loc = k.locationBreakdown.find((l) => l.location === selectedLocation);
      return {
        quarter: k.quarter,
        meetings: loc?.meetings ?? 0,
        lunchAndLearns: loc?.lunchAndLearns ?? 0,
        events: loc?.events ?? 0,
        referrals: loc?.referrals ?? 0
      };
    });
  }, [kpis, selectedLocation]);
  const totals = useMemo(() => ({
    meetings: tableData.reduce((s, r) => s + r.meetings, 0),
    lunchAndLearns: tableData.reduce((s, r) => s + r.lunchAndLearns, 0),
    events: tableData.reduce((s, r) => s + r.events, 0),
    referrals: tableData.reduce((s, r) => s + r.referrals, 0)
  }), [tableData]);
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-slate-900", children: "Activity by Location" }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-1 bg-slate-100 rounded-lg p-1", children: LOCATIONS.map((loc) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setSelectedLocation(loc),
          className: `px-2.5 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap ${selectedLocation === loc ? "bg-white shadow-sm text-navy-700" : "text-slate-600 hover:text-slate-900"}`,
          children: loc
        },
        loc
      )) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs text-slate-500 uppercase tracking-wider", children: [
        /* @__PURE__ */ jsx("th", { className: "pb-3 pr-4 font-medium", children: "Quarter" }),
        /* @__PURE__ */ jsx("th", { className: "pb-3 pr-4 text-center font-medium", children: "Meetings" }),
        /* @__PURE__ */ jsx("th", { className: "pb-3 pr-4 text-center font-medium", children: "L&Ls" }),
        /* @__PURE__ */ jsx("th", { className: "pb-3 pr-4 text-center font-medium", children: "Events" }),
        /* @__PURE__ */ jsx("th", { className: "pb-3 text-center font-medium", children: "Referrals" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-slate-100", children: [
        tableData.map((row) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-slate-50", children: [
          /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 font-medium text-slate-900", children: row.quarter }),
          /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-center text-slate-700", children: row.meetings }),
          /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-center text-slate-700", children: row.lunchAndLearns }),
          /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-center text-slate-700", children: row.events }),
          /* @__PURE__ */ jsx("td", { className: "py-3 text-center text-slate-700", children: row.referrals })
        ] }, row.quarter)),
        /* @__PURE__ */ jsxs("tr", { className: "bg-slate-50 font-semibold", children: [
          /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-slate-900", children: "Total" }),
          /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-center text-slate-900", children: totals.meetings }),
          /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-center text-slate-900", children: totals.lunchAndLearns }),
          /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-center text-slate-900", children: totals.events }),
          /* @__PURE__ */ jsx("td", { className: "py-3 text-center text-slate-900", children: totals.referrals })
        ] })
      ] })
    ] }) })
  ] }) });
}

function DeltaArrow({ current, previous }) {
  const delta = current - previous;
  if (Math.abs(delta) < 0.1) return /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400", children: "-" });
  const isUp = delta > 0;
  return /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center text-xs font-medium ${isUp ? "text-emerald-600" : "text-red-600"}`, children: [
    /* @__PURE__ */ jsx("svg", { className: `w-3 h-3 mr-0.5 ${isUp ? "" : "rotate-180"}`, fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z", clipRule: "evenodd" }) }),
    Math.abs(delta).toFixed(1),
    "pp"
  ] });
}
function FunnelBar({ label, value, percentage, maxWidth, color }) {
  const width = maxWidth > 0 ? Math.max(value / maxWidth * 100, 8) : 8;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "w-32 text-sm text-slate-600 text-right shrink-0", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1 bg-slate-100 rounded-full h-8 relative overflow-hidden", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500",
          style: { width: `${width}%`, backgroundColor: color },
          children: /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-white drop-shadow-sm", children: value })
        }
      ) }),
      /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-slate-700 w-14 text-right", children: [
        percentage.toFixed(1),
        "%"
      ] })
    ] })
  ] });
}
function ConversionRateSection({ kpis }) {
  const [selectedQuarter, setSelectedQuarter] = useState(kpis.length - 1);
  const currentKPI = kpis[selectedQuarter];
  const rates = currentKPI?.conversionRates;
  const paths = rates?.conversionPaths ?? [];
  const qoqData = useMemo(() => {
    const metrics = [
      { label: "Meetings → L&Ls", key: "meetingsToLunchAndLearns" },
      { label: "Meetings → Referrals", key: "meetingsToReferrals" },
      { label: "L&Ls → Clients", key: "lunchAndLearnsToClients" },
      { label: "Overall → Clients", key: "overallMeetingsToClients" }
    ];
    return metrics.map((m) => ({
      label: m.label,
      values: kpis.map((k, i) => ({
        quarter: k.quarter,
        value: k.conversionRates?.[m.key] ?? 0,
        prev: i > 0 ? kpis[i - 1].conversionRates?.[m.key] ?? 0 : 0
      }))
    }));
  }, [kpis]);
  if (!rates) return null;
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-slate-900", children: "Conversion Rates" }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-1 bg-slate-100 rounded-lg p-1", children: kpis.map((k, i) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setSelectedQuarter(i),
          className: `px-2.5 py-1 rounded-md text-xs font-medium transition-all ${selectedQuarter === i ? "bg-white shadow-sm text-navy-700" : "text-slate-600 hover:text-slate-900"}`,
          children: k.quarter
        },
        k.quarter
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3 mb-8", children: [
      /* @__PURE__ */ jsx(
        FunnelBar,
        {
          label: "Meetings",
          value: currentKPI.meetings,
          percentage: 100,
          maxWidth: currentKPI.meetings,
          color: "#1e3a5f"
        }
      ),
      /* @__PURE__ */ jsx(
        FunnelBar,
        {
          label: "Lunch & Learns",
          value: currentKPI.lunchAndLearns,
          percentage: rates.meetingsToLunchAndLearns,
          maxWidth: currentKPI.meetings,
          color: "#2d5a8e"
        }
      ),
      /* @__PURE__ */ jsx(
        FunnelBar,
        {
          label: "Referrals",
          value: Math.round(currentKPI.meetings * rates.meetingsToReferrals / 100),
          percentage: rates.meetingsToReferrals,
          maxWidth: currentKPI.meetings,
          color: "#c5a55a"
        }
      ),
      /* @__PURE__ */ jsx(
        FunnelBar,
        {
          label: "Clients",
          value: currentKPI.conversions,
          percentage: rates.overallMeetingsToClients,
          maxWidth: currentKPI.meetings,
          color: "#059669"
        }
      )
    ] }),
    paths.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-slate-700 mb-3", children: "Notable Conversion Paths" }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs text-slate-500 uppercase tracking-wider", children: [
          /* @__PURE__ */ jsx("th", { className: "pb-2 pr-4 font-medium", children: "Firm" }),
          /* @__PURE__ */ jsx("th", { className: "pb-2 pr-4 font-medium", children: "Path" }),
          /* @__PURE__ */ jsx("th", { className: "pb-2 font-medium", children: "Duration" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-100", children: paths.map((p, i) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-slate-50", children: [
          /* @__PURE__ */ jsx("td", { className: "py-2.5 pr-4 font-medium text-slate-900", children: p.firm }),
          /* @__PURE__ */ jsx("td", { className: "py-2.5 pr-4", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 flex-wrap", children: p.path.map((step, j) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${step === "Client" ? "bg-emerald-50 text-emerald-700" : step === "Meeting" ? "bg-navy-50 text-navy-700" : step === "Referral" ? "bg-gold-50 text-gold-700" : "bg-blue-50 text-blue-700"}`, children: step }),
            j < p.path.length - 1 && /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.25 4.5l7.5 7.5-7.5 7.5" }) })
          ] }, j)) }) }),
          /* @__PURE__ */ jsx("td", { className: "py-2.5 text-slate-600", children: p.duration })
        ] }, i)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-slate-700 mb-3", children: "Quarter-over-Quarter" }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs text-slate-500 uppercase tracking-wider", children: [
          /* @__PURE__ */ jsx("th", { className: "pb-2 pr-4 font-medium", children: "Metric" }),
          kpis.map((k) => /* @__PURE__ */ jsx("th", { className: "pb-2 pr-4 text-center font-medium", children: k.quarter }, k.quarter))
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-100", children: qoqData.map((row) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-slate-50", children: [
          /* @__PURE__ */ jsx("td", { className: "py-2.5 pr-4 text-slate-700 whitespace-nowrap", children: row.label }),
          row.values.map((v) => /* @__PURE__ */ jsx("td", { className: "py-2.5 pr-4 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-0.5", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-medium text-slate-900", children: [
              v.value.toFixed(1),
              "%"
            ] }),
            v.prev > 0 && /* @__PURE__ */ jsx(DeltaArrow, { current: v.value, previous: v.prev })
          ] }) }, v.quarter))
        ] }, row.label)) })
      ] }) })
    ] })
  ] }) });
}

const $$Kpis = createComponent(async ($$result, $$props, $$slots) => {
  const BASE = "/";
  const { prospects, firms, bdActivities: activities } = await loadAdminData();
  const kpis = getQuarterlyKPIs();
  const currentYear = kpis.filter((k) => k.quarter.includes("2026"));
  const prevYear = kpis.filter((k) => k.quarter.includes("2025"));
  const totalMeetings = kpis.reduce((s, k) => s + k.meetings, 0);
  const totalLLs = kpis.reduce((s, k) => s + k.lunchAndLearns, 0);
  const totalEvents = kpis.reduce((s, k) => s + k.events, 0);
  const totalNewProspects = kpis.reduce((s, k) => s + k.newProspects, 0);
  const totalConversions = kpis.reduce((s, k) => s + k.conversions, 0);
  const conversionRate = totalNewProspects > 0 ? Math.round(totalConversions / totalNewProspects * 100) : 0;
  const firmTypeStats = {};
  for (const p of prospects) {
    if (p.referringFirm) {
      const firm = firms.find((f) => f.name === p.referringFirm);
      const type = firm?.type || "Direct";
      if (!firmTypeStats[type]) firmTypeStats[type] = { prospects: 0, value: 0 };
      firmTypeStats[type].prospects += 1;
      firmTypeStats[type].value += p.dafSize;
    } else {
      if (!firmTypeStats["Direct / Marketing"]) firmTypeStats["Direct / Marketing"] = { prospects: 0, value: 0 };
      firmTypeStats["Direct / Marketing"].prospects += 1;
      firmTypeStats["Direct / Marketing"].value += p.dafSize;
    }
  }
  const prevMeetings = prevYear.reduce((s, k) => s + k.meetings, 0);
  const prevLLs = prevYear.reduce((s, k) => s + k.lunchAndLearns, 0);
  const prevConversions = prevYear.reduce((s, k) => s + k.conversions, 0);
  const prevProspects = prevYear.reduce((s, k) => s + k.newProspects, 0);
  function formatCurrency(amount) {
    if (amount >= 1e6) return `£${(amount / 1e6).toFixed(1)}M`;
    if (amount >= 1e3) return `£${(amount / 1e3).toFixed(0)}K`;
    return `£${amount.toLocaleString()}`;
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "KPIs - Prism Admin", "activePage": "kpis" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: "Admin", href: `${BASE}admin` }, { label: "KPIs" }] })} ${maybeRenderHead()}<div class="mb-6 animate-fade-up"> <h2 class="text-2xl font-bold text-slate-900">KPI Tracking</h2> <p class="text-sm text-slate-500 mt-1">Performance metrics and conversion analysis</p> </div>  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"> <div class="animate-fade-up"> ${renderComponent($$result2, "KPITrendChart", KPITrendChart, { "client:visible": true, "kpis": kpis, "client:component-hydration": "visible", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/admin/KPITrendChart", "client:component-export": "default" })} </div> <div class="animate-fade-up-1"> ${renderComponent($$result2, "ConversionFunnelChart", ConversionFunnelChart, { "client:visible": true, "kpis": kpis, "client:component-hydration": "visible", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/admin/ConversionFunnelChart", "client:component-export": "default" })} </div> </div>  <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8"> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Meetings</p> <p class="text-xl font-bold text-slate-900 mt-1">${totalMeetings}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-1"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Lunch & Learns</p> <p class="text-xl font-bold text-slate-900 mt-1">${totalLLs}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-2"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Events</p> <p class="text-xl font-bold text-slate-900 mt-1">${totalEvents}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-3"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">New Prospects</p> <p class="text-xl font-bold text-slate-900 mt-1">${totalNewProspects}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-4"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Conversion Rate</p> <p class="text-xl font-bold text-navy-600 mt-1">${conversionRate}%</p> </div> </div>  <div class="mb-8 animate-fade-up"> ${renderComponent($$result2, "LocationKPISection", LocationKPISection, { "client:load": true, "kpis": JSON.parse(JSON.stringify(kpis)), "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/admin/LocationKPISection", "client:component-export": "default" })} </div>  <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8 animate-fade-up"> <h3 class="text-base font-semibold text-slate-900 mb-4">Quarterly Breakdown</h3> <div class="overflow-x-auto"> <table class="w-full text-sm"> <thead> <tr class="text-left text-xs text-slate-500 uppercase tracking-wider"> <th class="pb-3 pr-4 font-medium">Quarter</th> <th class="pb-3 pr-4 text-center font-medium">Meetings</th> <th class="pb-3 pr-4 text-center font-medium">L&Ls</th> <th class="pb-3 pr-4 text-center font-medium">Events</th> <th class="pb-3 pr-4 text-center font-medium">New Prospects</th> <th class="pb-3 pr-4 text-center font-medium">Conversions</th> <th class="pb-3 text-center font-medium">Conv. Rate</th> </tr> </thead> <tbody class="divide-y divide-slate-100"> ${kpis.map((k) => {
    const rate = k.newProspects > 0 ? Math.round(k.conversions / k.newProspects * 100) : 0;
    return renderTemplate`<tr class="hover:bg-slate-50"> <td class="py-3 pr-4 font-medium text-slate-900">${k.quarter}</td> <td class="py-3 pr-4 text-center text-slate-700">${k.meetings}</td> <td class="py-3 pr-4 text-center text-slate-700">${k.lunchAndLearns}</td> <td class="py-3 pr-4 text-center text-slate-700">${k.events}</td> <td class="py-3 pr-4 text-center text-slate-700">${k.newProspects}</td> <td class="py-3 pr-4 text-center font-semibold text-emerald-600">${k.conversions}</td> <td class="py-3 text-center"> <span${addAttribute(`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${rate >= 25 ? "bg-emerald-50 text-emerald-700" : rate >= 15 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"}`, "class")}> ${rate}%
</span> </td> </tr>`;
  })} </tbody> </table> </div> </div>  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"> <!-- Conversion Funnel --> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-fade-up-1"> <h3 class="text-base font-semibold text-slate-900 mb-4">Conversion Funnel (All Time)</h3> <div class="space-y-4"> <div> <div class="flex items-center justify-between mb-1"> <span class="text-sm text-slate-600">Meetings</span> <span class="text-sm font-bold text-slate-900">${totalMeetings}</span> </div> <div class="w-full bg-slate-100 rounded-full h-3"> <div class="bg-navy-500 h-3 rounded-full" style="width: 100%"></div> </div> </div> <div> <div class="flex items-center justify-between mb-1"> <span class="text-sm text-slate-600">Lunch & Learns</span> <span class="text-sm font-bold text-slate-900">${totalLLs}</span> </div> <div class="w-full bg-slate-100 rounded-full h-3"> <div class="bg-navy-400 h-3 rounded-full"${addAttribute(`width: ${Math.round(totalLLs / totalMeetings * 100)}%`, "style")}></div> </div> </div> <div> <div class="flex items-center justify-between mb-1"> <span class="text-sm text-slate-600">New Prospects</span> <span class="text-sm font-bold text-slate-900">${totalNewProspects}</span> </div> <div class="w-full bg-slate-100 rounded-full h-3"> <div class="bg-gold-400 h-3 rounded-full"${addAttribute(`width: ${Math.round(totalNewProspects / totalMeetings * 100)}%`, "style")}></div> </div> </div> <div> <div class="flex items-center justify-between mb-1"> <span class="text-sm text-slate-600">Conversions</span> <span class="text-sm font-bold text-emerald-600">${totalConversions}</span> </div> <div class="w-full bg-slate-100 rounded-full h-3"> <div class="bg-emerald-500 h-3 rounded-full"${addAttribute(`width: ${Math.round(totalConversions / totalMeetings * 100)}%`, "style")}></div> </div> </div> </div> </div> <!-- Year-over-Year --> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-fade-up-2"> <h3 class="text-base font-semibold text-slate-900 mb-4">Year-over-Year (2025 vs 2026 Q1)</h3> <div class="overflow-x-auto"> <table class="w-full text-sm"> <thead> <tr class="text-left text-xs text-slate-500 uppercase tracking-wider"> <th class="pb-3 font-medium">Metric</th> <th class="pb-3 text-center font-medium">2025 (Full)</th> <th class="pb-3 text-center font-medium">2026 Q1</th> <th class="pb-3 text-center font-medium">Pace</th> </tr> </thead> <tbody class="divide-y divide-slate-100"> <tr class="hover:bg-slate-50"> <td class="py-3 text-slate-700">Meetings</td> <td class="py-3 text-center font-medium text-slate-900">${prevMeetings}</td> <td class="py-3 text-center font-medium text-slate-900">${currentYear.reduce((s, k) => s + k.meetings, 0)}</td> <td class="py-3 text-center"> <span class="text-xs font-semibold text-emerald-600">${Math.round(currentYear.reduce((s, k) => s + k.meetings, 0) / (prevMeetings / 4) * 100)}%</span> </td> </tr> <tr class="hover:bg-slate-50"> <td class="py-3 text-slate-700">Lunch & Learns</td> <td class="py-3 text-center font-medium text-slate-900">${prevLLs}</td> <td class="py-3 text-center font-medium text-slate-900">${currentYear.reduce((s, k) => s + k.lunchAndLearns, 0)}</td> <td class="py-3 text-center"> <span class="text-xs font-semibold text-amber-600">${Math.round(currentYear.reduce((s, k) => s + k.lunchAndLearns, 0) / (prevLLs / 4) * 100)}%</span> </td> </tr> <tr class="hover:bg-slate-50"> <td class="py-3 text-slate-700">New Prospects</td> <td class="py-3 text-center font-medium text-slate-900">${prevProspects}</td> <td class="py-3 text-center font-medium text-slate-900">${currentYear.reduce((s, k) => s + k.newProspects, 0)}</td> <td class="py-3 text-center"> <span class="text-xs font-semibold text-emerald-600">${Math.round(currentYear.reduce((s, k) => s + k.newProspects, 0) / (prevProspects / 4) * 100)}%</span> </td> </tr> <tr class="hover:bg-slate-50"> <td class="py-3 text-slate-700">Conversions</td> <td class="py-3 text-center font-medium text-slate-900">${prevConversions}</td> <td class="py-3 text-center font-medium text-slate-900">${currentYear.reduce((s, k) => s + k.conversions, 0)}</td> <td class="py-3 text-center"> <span class="text-xs font-semibold text-amber-600">${Math.round(currentYear.reduce((s, k) => s + k.conversions, 0) / (prevConversions / 4) * 100)}%</span> </td> </tr> </tbody> </table> </div> </div> </div>  <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-fade-up-3"> <h3 class="text-base font-semibold text-slate-900 mb-4">Prospects by Referral Source</h3> <div class="overflow-x-auto"> <table class="w-full text-sm"> <thead> <tr class="text-left text-xs text-slate-500 uppercase tracking-wider"> <th class="pb-3 pr-4 font-medium">Source Type</th> <th class="pb-3 pr-4 text-center font-medium">Prospects</th> <th class="pb-3 pr-4 text-right font-medium">Pipeline Value</th> <th class="pb-3 w-1/3 font-medium">Share</th> </tr> </thead> <tbody class="divide-y divide-slate-100"> ${Object.entries(firmTypeStats).sort((a, b) => b[1].value - a[1].value).map(([type, data]) => {
    const totalVal = Object.values(firmTypeStats).reduce((s, d) => s + d.value, 0);
    const pct = totalVal > 0 ? data.value / totalVal * 100 : 0;
    return renderTemplate`<tr class="hover:bg-slate-50"> <td class="py-3 pr-4 font-medium text-slate-700">${type}</td> <td class="py-3 pr-4 text-center text-slate-700">${data.prospects}</td> <td class="py-3 pr-4 text-right font-medium text-slate-900">${formatCurrency(data.value)}</td> <td class="py-3"> <div class="flex items-center gap-2"> <div class="flex-1 bg-slate-100 rounded-full h-2"> <div class="bg-navy-500 h-2 rounded-full"${addAttribute(`width: ${pct}%`, "style")}></div> </div> <span class="text-xs text-slate-500 w-10 text-right">${Math.round(pct)}%</span> </div> </td> </tr>`;
  })} </tbody> </table> </div> </div>  <div class="mb-8 animate-fade-up"> ${renderComponent($$result2, "ConversionRateSection", ConversionRateSection, { "client:load": true, "kpis": JSON.parse(JSON.stringify(kpis)), "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/admin/ConversionRateSection", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/admin/kpis.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/admin/kpis.astro";
const $$url = "/admin/kpis";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Kpis,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
