/* empty css                                   */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../chunks/astro/server_C-UfuYaI.mjs';
import 'piccolore';
import { l as loadDonorClient, $ as $$DashboardLayout, f as formatCurrency$1 } from '../chunks/donor-data-loader_BiAwFb3g.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { b as formatCurrencyPrecise, a as formatCurrency } from '../chunks/format_Cc7EDVuw.mjs';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { E as ErrorBoundary } from '../chunks/ErrorBoundary_D9-bXlGr.mjs';
export { renderers } from '../renderers.mjs';

function HoldingsTable({ holdings }) {
  const sorted = [...holdings].sort((a, b) => b.weight - a.weight);
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800", children: "Holdings" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-400 mt-0.5", children: [
        sorted.length,
        " positions in portfolio"
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-slate-50/50", children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider sticky left-0 bg-slate-50/50 z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-slate-100", children: "Fund Name" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider", children: "Units" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider", children: "Price" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider", children: "Value" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider", children: "Weight" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider", children: "Change" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-100", children: sorted.map((holding, index) => /* @__PURE__ */ jsxs(
        "tr",
        {
          className: "hover:bg-slate-50/50 transition-colors",
          children: [
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-3.5 sticky left-0 bg-white z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-slate-100", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-700 font-medium", children: holding.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: holding.ticker })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-3.5 text-sm text-slate-600 text-right whitespace-nowrap font-mono", children: holding.units.toLocaleString("en-GB") }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-3.5 text-sm text-slate-600 text-right whitespace-nowrap", children: formatCurrencyPrecise(holding.price) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-3.5 text-sm font-medium text-slate-800 text-right whitespace-nowrap", children: formatCurrency(holding.value) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-3.5 text-right whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "h-full bg-[#1e3a5f] rounded-full",
                  style: { width: `${holding.weight}%` }
                }
              ) }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm text-slate-600 w-12 text-right", children: [
                holding.weight.toFixed(1),
                "%"
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-3.5 text-sm text-right whitespace-nowrap", children: /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-0.5 font-medium ${holding.change >= 0 ? "text-emerald-600" : "text-red-600"}`, children: [
              /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: holding.change >= 0 ? /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 15l7-7 7 7" }) : /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }),
              Math.abs(holding.change).toFixed(1),
              "%"
            ] }) })
          ]
        },
        index
      )) })
    ] }) })
  ] });
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0];
    return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg border border-slate-200 px-4 py-3", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-800", children: data.name }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-500", children: [
        data.value,
        "% of portfolio"
      ] })
    ] });
  }
  return null;
}
function AssetChart({ data, totalInvested }) {
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800", children: "Asset Allocation" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-400 mt-0.5", children: [
        "Portfolio value: ",
        formatCurrency(totalInvested)
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
        /* @__PURE__ */ jsx(
          Pie,
          {
            data,
            cx: "50%",
            cy: "50%",
            innerRadius: 55,
            outerRadius: 85,
            paddingAngle: 2,
            dataKey: "value",
            stroke: "none",
            children: data.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: entry.color }, `cell-${index}`))
          }
        ),
        /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip, {}) })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 space-y-3 w-full", children: data.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "w-3 h-3 rounded-full flex-shrink-0",
              style: { backgroundColor: item.color }
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-600", children: item.name })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-slate-800", children: [
          item.value,
          "%"
        ] })
      ] }, index)) })
    ] })
  ] }) });
}

const $$Astro = createAstro();
const $$Investments = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Investments;
  const clientId = Astro2.url.searchParams.get("client") || "ashford";
  const client = await loadDonorClient(clientId);
  if (!client) {
    return Astro2.redirect("/");
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": `${client.name} - Investments`, "clientId": client.id, "clientName": client.name, "activePage": "investments", "relationshipManager": client.relationshipManager }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div> <h2 class="text-2xl font-semibold text-slate-800">Investments</h2> <p class="text-sm text-slate-400 mt-1">Portfolio overview and investment manager contact</p> </div> <!-- Banner --> <div class="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-100"> <svg class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <div> <p class="text-sm text-amber-800 font-medium">Investment portfolio management is handled by your investment manager</p> <p class="text-xs text-amber-600 mt-0.5">Contact your relationship manager for details on investment strategy, rebalancing, or performance queries.</p> </div> </div> <!-- Summary Card --> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6"> <h3 class="text-lg font-semibold text-slate-800 mb-4">Investment Summary</h3> <div class="grid grid-cols-1 sm:grid-cols-3 gap-6"> <div> <p class="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Invested</p> <p class="text-2xl font-bold text-slate-800">${formatCurrency$1(client.balances.investments)}</p> </div> <div> <p class="text-xs text-slate-400 uppercase tracking-wider mb-1">YTD Return</p> <p class="text-2xl font-bold text-emerald-600">+${client.ytdReturn}%</p> </div> <div> <p class="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Fund Value</p> <p class="text-2xl font-bold text-slate-800">${formatCurrency$1(client.balances.total)}</p> </div> </div> </div> <!-- Asset Allocation Chart --> ${renderComponent($$result2, "AssetChart", AssetChart, { "client:load": true, "data": client.assetDistribution, "totalInvested": client.balances.investments, "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/AssetChart", "client:component-export": "default" })} <!-- Holdings Table --> ${renderComponent($$result2, "HoldingsTable", HoldingsTable, { "client:load": true, "holdings": client.holdings, "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/HoldingsTable", "client:component-export": "default" })} <!-- RM Contact for Investments --> <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6"> <h3 class="text-base font-semibold text-slate-800 mb-3">Investment Queries</h3> <p class="text-sm text-slate-500 mb-4">For questions about your portfolio, asset allocation, or investment performance, contact your relationship manager.</p> <div class="flex items-center gap-4"> <div class="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0"> <span class="text-sm font-bold text-navy-600">${client.relationshipManager.split(" ").map((n) => n[0]).join("")}</span> </div> <div> <p class="text-sm font-semibold text-slate-800">${client.relationshipManager}</p> <p class="text-xs text-slate-400">james.whitfield@prismthegiftfund.co.uk &middot; +44 20 7946 0321</p> </div> <a href="#" class="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-600 text-sm text-white font-medium hover:bg-navy-700 transition-colors shadow-sm"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path> </svg>
Schedule a Call
</a> </div> </div> </div> ` })}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/investments.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/investments.astro";
const $$url = "/investments";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Investments,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
