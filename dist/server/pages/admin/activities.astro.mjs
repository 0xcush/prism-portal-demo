/* empty css                                      */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Dh-RJMVH.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CsHHIwUj.mjs';
import { $ as $$Breadcrumbs } from '../../chunks/Breadcrumbs_BYcnf3X3.mjs';
import { f as formatDate, a as formatCurrencyFull$1, l as loadAdminData } from '../../chunks/data-loader_CbTPm3y6.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useMemo, useState } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts';
import { E as ErrorBoundary } from '../../chunks/ErrorBoundary_D9-bXlGr.mjs';
import { D as DataTable } from '../../chunks/DataTable_DmZydwVI.mjs';
import { S as StatusBadge } from '../../chunks/StatusBadge_D7ZsDAHk.mjs';
import { S as SlidePanel } from '../../chunks/SlidePanel_C5CbSYg-.mjs';
export { renderers } from '../../renderers.mjs';

const CHANNEL_COLORS = {
  "Lunch & Learn": "#7c3aed",
  "Office Visit": "#2563eb",
  "Conference": "#1e3a5f",
  "Webinar": "#059669",
  "Email Campaign": "#d97706",
  "Networking Event": "#c5a55a"
};
const DEFAULT_COLOR = "#64748b";
function formatCurrencyFull(amount) {
  return `£${amount.toLocaleString("en-GB")}`;
}
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg border border-slate-200 px-4 py-3", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-800", children: data.type }),
    /* @__PURE__ */ jsxs("div", { className: "mt-1 space-y-0.5 text-sm text-slate-500", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Total spend: ",
        formatCurrencyFull(data.totalCost)
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Prospects: ",
        data.totalProspects
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Cost/prospect: ",
        formatCurrencyFull(data.costPerProspect)
      ] })
    ] })
  ] });
}
function ROIByChannelChart({ activities }) {
  const chartData = useMemo(() => {
    const byType = {};
    for (const a of activities) {
      if (a.status !== "Completed") continue;
      if (!byType[a.type]) byType[a.type] = { cost: 0, prospects: 0 };
      byType[a.type].cost += a.cost;
      byType[a.type].prospects += a.prospectsGenerated;
    }
    return Object.entries(byType).filter(([_, v]) => v.prospects > 0).map(([type, v]) => ({
      type,
      totalCost: v.cost,
      totalProspects: v.prospects,
      costPerProspect: Math.round(v.cost / v.prospects)
    })).sort((a, b) => a.costPerProspect - b.costPerProspect);
  }, [activities]);
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800", children: "ROI by Channel" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400 mt-0.5", children: "Cost per prospect by activity type (lower is better)" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "h-64", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
      BarChart,
      {
        data: chartData,
        layout: "vertical",
        margin: { top: 0, right: 16, bottom: 0, left: 0 },
        barCategoryGap: "20%",
        children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0", horizontal: false }),
          /* @__PURE__ */ jsx(
            XAxis,
            {
              type: "number",
              tick: { fontSize: 12, fill: "#94a3b8" },
              axisLine: false,
              tickLine: false,
              tickFormatter: (v) => `£${v}`
            }
          ),
          /* @__PURE__ */ jsx(
            YAxis,
            {
              type: "category",
              dataKey: "type",
              width: 120,
              tick: { fontSize: 12, fill: "#64748b" },
              axisLine: false,
              tickLine: false
            }
          ),
          /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip, {}), cursor: { fill: "rgba(0,0,0,0.02)" } }),
          /* @__PURE__ */ jsx(Bar, { dataKey: "costPerProspect", radius: [0, 4, 4, 0], barSize: 22, children: chartData.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: CHANNEL_COLORS[entry.type] || DEFAULT_COLOR }, `cell-${index}`)) })
        ]
      }
    ) }) })
  ] }) });
}

const CURRENT_DATE$1 = /* @__PURE__ */ new Date("2026-03-11");
function getFollowUpDateColor$1(dateStr) {
  const date = new Date(dateStr);
  const diffDays = (date.getTime() - CURRENT_DATE$1.getTime()) / (1e3 * 60 * 60 * 24);
  if (diffDays < 0) return "text-red-600";
  if (diffDays <= 7) return "text-amber-600";
  return "text-emerald-600";
}
function ActivityDetail({ activity, open, onClose }) {
  if (!activity) return null;
  const costPerProspect = activity.prospectsGenerated > 0 ? Math.round(activity.cost / activity.prospectsGenerated) : null;
  return /* @__PURE__ */ jsxs(SlidePanel, { open, onClose, title: activity.activity, subtitle: activity.firmName || void 0, children: [
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Overview" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Type" }),
          /* @__PURE__ */ jsx(StatusBadge, { status: activity.type })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Status" }),
          /* @__PURE__ */ jsx(StatusBadge, { status: activity.status })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Date" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: formatDate(activity.date) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Location" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700 text-right max-w-[200px]", children: activity.location })
        ] }),
        activity.firmName && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Firm" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: activity.firmName })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Cost" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-slate-800", children: formatCurrencyFull$1(activity.cost) })
        ] })
      ] })
    ] }),
    activity.status === "Completed" && /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Results" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Attendees" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-700", children: activity.attendeeCount })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Prospects Generated" }),
          /* @__PURE__ */ jsx("span", { className: `text-sm font-semibold ${activity.prospectsGenerated > 0 ? "text-emerald-600" : "text-slate-400"}`, children: activity.prospectsGenerated })
        ] }),
        costPerProspect !== null && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Cost per Prospect" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-700", children: formatCurrencyFull$1(costPerProspect) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs font-medium text-slate-400 uppercase tracking-wider mb-3", children: "Follow-Up" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Assigned To" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-700", children: activity.assignedTo })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Follow-Up Date" }),
          /* @__PURE__ */ jsx("span", { className: `text-sm font-medium ${getFollowUpDateColor$1(activity.followUpDate)}`, children: formatDate(activity.followUpDate) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "Follow-Up Status" }),
          /* @__PURE__ */ jsx(StatusBadge, { status: activity.followUpStatus })
        ] }),
        activity.followUpNotes && /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-3", children: activity.followUpNotes }) })
      ] })
    ] })
  ] });
}

const CURRENT_DATE = /* @__PURE__ */ new Date("2026-03-11");
function getFollowUpDateColor(dateStr) {
  const date = new Date(dateStr);
  const diffDays = (date.getTime() - CURRENT_DATE.getTime()) / (1e3 * 60 * 60 * 24);
  if (diffDays < 0) return "text-red-600";
  if (diffDays <= 7) return "text-amber-600";
  return "text-emerald-600";
}
const columns = [
  {
    key: "activity",
    header: "Activity",
    render: (row) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-900", children: row.activity }),
      row.firmName && /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: row.firmName })
    ] })
  },
  {
    key: "type",
    header: "Type",
    render: (row) => /* @__PURE__ */ jsx(StatusBadge, { status: row.type })
  },
  {
    key: "date",
    header: "Date",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: formatDate(row.date) }),
    sortValue: (row) => new Date(row.date).getTime()
  },
  {
    key: "status",
    header: "Status",
    align: "center",
    render: (row) => /* @__PURE__ */ jsx(StatusBadge, { status: row.status })
  },
  {
    key: "location",
    header: "Location",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: row.location })
  },
  {
    key: "attendeeCount",
    header: "Attendees",
    align: "center",
    render: (row) => row.attendeeCount > 0 ? /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: row.attendeeCount }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400", children: "-" })
  },
  {
    key: "prospectsGenerated",
    header: "Prospects",
    align: "center",
    render: (row) => row.prospectsGenerated > 0 ? /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-emerald-600", children: row.prospectsGenerated }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400", children: "-" }),
    sortValue: (row) => row.prospectsGenerated
  },
  {
    key: "assignedTo",
    header: "Assigned",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-600", children: row.assignedTo })
  },
  {
    key: "followUpDate",
    header: "Follow-Up",
    render: (row) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: `text-xs font-medium ${getFollowUpDateColor(row.followUpDate)}`, children: formatDate(row.followUpDate) }),
      /* @__PURE__ */ jsx(StatusBadge, { status: row.followUpStatus })
    ] }),
    sortValue: (row) => new Date(row.followUpDate).getTime()
  },
  {
    key: "cost",
    header: "Cost",
    align: "right",
    render: (row) => /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-600", children: formatCurrencyFull$1(row.cost) }),
    sortValue: (row) => row.cost
  }
];
const filters = [
  {
    key: "type",
    label: "Type",
    options: [
      { value: "Lunch & Learn", label: "Lunch & Learn" },
      { value: "Office Visit", label: "Office Visit" },
      { value: "Conference", label: "Conference" },
      { value: "Webinar", label: "Webinar" },
      { value: "Email Campaign", label: "Email Campaign" },
      { value: "Networking Event", label: "Networking Event" }
    ]
  },
  {
    key: "status",
    label: "Status",
    options: [
      { value: "Planned", label: "Planned" },
      { value: "Completed", label: "Completed" },
      { value: "Cancelled", label: "Cancelled" }
    ]
  },
  {
    key: "assignedTo",
    label: "Assigned To",
    options: [
      { value: "Kirsty", label: "Kirsty" },
      { value: "Dibo", label: "Dibo" },
      { value: "Unassigned", label: "Unassigned" }
    ]
  },
  {
    key: "followUpStatus",
    label: "Follow-Up",
    options: [
      { value: "Pending", label: "Pending" },
      { value: "Completed", label: "Completed" },
      { value: "Overdue", label: "Overdue" }
    ]
  }
];
function ActivitiesTable({ activities }) {
  const [selected, setSelected] = useState(null);
  return /* @__PURE__ */ jsxs(ErrorBoundary, { children: [
    /* @__PURE__ */ jsx(
      DataTable,
      {
        data: activities,
        columns,
        searchKeys: ["activity", "firmName"],
        searchPlaceholder: "Search activities...",
        filters,
        emptyTitle: "No activities found",
        emptyDescription: "Try adjusting your search or filter criteria.",
        exportFilename: "activities-export",
        onRowClick: (row) => setSelected(row)
      }
    ),
    /* @__PURE__ */ jsx(ActivityDetail, { activity: selected, open: !!selected, onClose: () => setSelected(null) })
  ] });
}

const $$Activities = createComponent(async ($$result, $$props, $$slots) => {
  const BASE = "/";
  const { bdActivities: activities } = await loadAdminData();
  const completed = activities.filter((a) => a.status === "Completed");
  const planned = activities.filter((a) => a.status === "Planned");
  const totalCost = completed.reduce((s, a) => s + a.cost, 0);
  const totalProspects = completed.reduce((s, a) => s + a.prospectsGenerated, 0);
  const thisQuarter = activities.filter((a) => {
    const d = new Date(a.date);
    return d.getFullYear() === 2026 && d.getMonth() < 3;
  });
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Activities - Prism Admin", "activePage": "activities" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: "Admin", href: `${BASE}admin` }, { label: "Activities" }] })} ${maybeRenderHead()}<div class="mb-6 animate-fade-up"> <h2 class="text-2xl font-bold text-slate-900">BD Activities</h2> <p class="text-sm text-slate-500 mt-1">Track events, meetings, and outreach campaigns. Each activity links to prospects generated and follow-up tasks.</p> </div>  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">This Quarter</p> <p class="text-xl font-bold text-slate-900 mt-1">${thisQuarter.length}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-1"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Prospects Generated</p> <p class="text-xl font-bold text-emerald-600 mt-1">${totalProspects}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-2"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Cost</p> <p class="text-xl font-bold text-slate-900 mt-1">${formatCurrencyFull$1(totalCost)}</p> </div> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-up-3"> <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">Upcoming</p> <p class="text-xl font-bold text-blue-600 mt-1">${planned.length}</p> </div> </div>  <div class="mb-6 animate-fade-up-3"> <details class="bg-white rounded-xl border border-slate-200 shadow-sm"> <summary class="px-5 py-3 cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900 select-none flex items-center gap-2"> <svg class="w-4 h-4 text-slate-400 transition-transform details-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path> </svg>
How this works
</summary> <div class="px-5 pb-4 text-sm text-slate-600 space-y-3 border-t border-slate-100 pt-3"> <div> <p class="font-medium text-slate-700 mb-1">BD Activities</p> <p>Each row is a business development event: lunches, office visits, conferences, webinars, email campaigns, and networking events. Activities are logged before they happen (Planned) and updated after (Completed).</p> </div> <div> <p class="font-medium text-slate-700 mb-1">Prospects Generated</p> <p>The number of new prospects that entered the pipeline as a direct result of this activity. This links BD spend to pipeline value.</p> </div> <div> <p class="font-medium text-slate-700 mb-1">Follow-Up Assignments</p> <p>Every activity has a follow-up owner (Kirsty or Dibo) and a due date. Use the "Assigned To" and "Follow-Up" filters to see your pending tasks.</p> </div> <div> <p class="font-medium text-slate-700 mb-1">ROI by Channel</p> <p>The chart below groups completed activities by type and compares total spend vs. prospects generated, showing which channels deliver the best return.</p> </div> </div> </details> </div>  <div class="mb-6 animate-fade-up-4"> ${renderComponent($$result2, "ROIByChannelChart", ROIByChannelChart, { "client:visible": true, "activities": activities, "client:component-hydration": "visible", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/admin/ROIByChannelChart", "client:component-export": "default" })} </div>  <div class="animate-fade-up-4"> ${renderComponent($$result2, "ActivitiesTable", ActivitiesTable, { "client:load": true, "activities": JSON.parse(JSON.stringify(activities)), "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/admin/ActivitiesTable", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/admin/activities.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/admin/activities.astro";
const $$url = "/admin/activities";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Activities,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
