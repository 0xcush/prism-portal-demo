/* empty css                                      */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro } from '../../chunks/astro/server_C-UfuYaI.mjs';
import 'piccolore';
import { a as loadAllDonorClients, $ as $$DashboardLayout } from '../../chunks/donor-data-loader_BiAwFb3g.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { a as formatCurrency, f as formatDate } from '../../chunks/format_Cc7EDVuw.mjs';
export { renderers } from '../../renderers.mjs';

const statusStyles = {
  Paid: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  Approved: "bg-blue-50 text-blue-700 ring-blue-600/10",
  "In Review": "bg-amber-50 text-amber-700 ring-amber-600/10",
  Requested: "bg-slate-50 text-slate-600 ring-slate-500/10"
};
const issueAreaColors = {
  Healthcare: "bg-red-50 text-red-700",
  Education: "bg-indigo-50 text-indigo-700",
  "Arts & Culture": "bg-purple-50 text-purple-700",
  Environment: "bg-green-50 text-green-700",
  "Social Welfare": "bg-orange-50 text-orange-700"
};
const completedStatuses = ["Requested", "In Review", "Approved", "Paid"];
function getStepState(stepStatus, grantStatus) {
  const stepIdx = completedStatuses.indexOf(stepStatus);
  const grantIdx = completedStatuses.indexOf(grantStatus);
  if (stepIdx < grantIdx) return "completed";
  if (stepIdx === grantIdx) return "current";
  return "future";
}
function GrantDetail({ grant, clientId, baseUrl }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-2 text-sm", "aria-label": "Breadcrumb", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: `${baseUrl}dashboard?client=${clientId}`,
          className: "text-slate-400 hover:text-navy-600 transition-colors",
          children: "Overview"
        }
      ),
      /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-slate-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: `${baseUrl}grants?client=${clientId}`,
          className: "text-slate-400 hover:text-navy-600 transition-colors",
          children: "Grants"
        }
      ),
      /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-slate-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }),
      /* @__PURE__ */ jsx("span", { className: "text-slate-700 font-medium", children: grant.id })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold text-slate-800", children: grant.charity }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-400 mt-0.5", children: [
          "No. ",
          grant.charityNumber,
          " · ",
          grant.id
        ] }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `mt-2 inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${issueAreaColors[grant.issueArea] || "bg-slate-50 text-slate-600"}`,
            children: grant.issueArea
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-slate-800", children: formatCurrency(grant.amount) }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${statusStyles[grant.status]}`,
            children: grant.status
          }
        )
      ] })
    ] }) }),
    grant.verifiedViaCC && /* @__PURE__ */ jsxs("div", { className: "bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
          d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-emerald-800", children: "Verified via Charity Commission API" }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-emerald-600 mt-0.5", children: [
          "Registration number ",
          grant.charityNumber,
          " confirmed active"
        ] })
      ] })
    ] }),
    grant.delayReason && /* @__PURE__ */ jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-amber-800", children: "Review Note" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-amber-600 mt-0.5", children: grant.delayReason })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800 mb-6", children: "Grant Timeline" }),
      /* @__PURE__ */ jsx("div", { className: "relative", children: grant.timeline.map((step, idx) => {
        const state = getStepState(step.status, grant.status);
        const isLast = idx === grant.timeline.length - 1;
        return /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pb-6 last:pb-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
            state === "completed" && /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-white", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M5 13l4 4L19 7" }) }) }),
            state === "current" && /* @__PURE__ */ jsxs("div", { className: "relative w-8 h-8 flex-shrink-0", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-navy-600/20 animate-ping" }),
              /* @__PURE__ */ jsx("div", { className: "relative w-8 h-8 rounded-full bg-navy-600 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-white" }) })
            ] }),
            state === "future" && /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-slate-200 flex-shrink-0" }),
            !isLast && /* @__PURE__ */ jsx(
              "div",
              {
                className: `w-0.5 flex-1 mt-1 ${state === "completed" ? "bg-emerald-300" : state === "current" ? "border-l-2 border-dashed border-slate-300" : "border-l-2 border-dashed border-slate-200"}`,
                style: { minHeight: "1.5rem" }
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pb-2", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-slate-800", children: step.status }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: formatDate(step.date) }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mt-0.5", children: step.actor }),
            step.note && /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 mt-1", children: step.note })
          ] })
        ] }, idx);
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800 mb-4", children: "Charity Information" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Organization Type" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-700", children: grant.charityType })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Registration Number" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-700", children: grant.charityNumber })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Address" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-700", children: grant.charityAddress })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Website" }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: `https://${grant.charityWebsite}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-sm text-navy-600 hover:text-navy-700 underline",
              children: grant.charityWebsite
            }
          )
        ] })
      ] })
    ] }),
    grant.approvalNotes && /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 rounded-lg p-4 border border-slate-100", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-2", children: "Approval Notes" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-700", children: grant.approvalNotes })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const allClients = await loadAllDonorClients();
  let grant;
  let client;
  for (const c of allClients) {
    const g = c.grants.find((g2) => g2.id === id);
    if (g) {
      grant = g;
      client = c;
      break;
    }
  }
  if (!grant || !client) {
    return Astro2.redirect("/");
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": `${grant.charity} - Grant Detail`, "clientId": client.id, "clientName": client.name, "activePage": "grants", "relationshipManager": client.relationshipManager }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "GrantDetail", GrantDetail, { "client:load": true, "grant": grant, "clientId": client.id, "baseUrl": "/", "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/GrantDetail", "client:component-export": "default" })} ` })}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/grants/[id].astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/grants/[id].astro";
const $$url = "/grants/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
