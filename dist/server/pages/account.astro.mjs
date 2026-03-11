/* empty css                                   */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../chunks/astro/server_Dh-RJMVH.mjs';
import 'piccolore';
import { l as loadDonorClient, $ as $$DashboardLayout } from '../chunks/donor-data-loader_IbvCAMWK.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { f as formatDate } from '../chunks/format_Cc7EDVuw.mjs';
export { renderers } from '../renderers.mjs';

function Toggle({ label, defaultChecked }) {
  const [checked, setChecked] = useState(defaultChecked);
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-3", children: [
    /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: label }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": checked,
        onClick: () => setChecked(!checked),
        className: `relative w-10 h-6 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 ${checked ? "bg-navy-600" : "bg-slate-200"}`,
        children: /* @__PURE__ */ jsx(
          "span",
          {
            className: `absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-4" : "translate-x-0"}`
          }
        )
      }
    )
  ] });
}
function AccountSettings({
  clientName,
  accountNumber,
  accountType,
  relationshipManager,
  onboardedDate,
  email
}) {
  const rmEmail = email || `${relationshipManager.toLowerCase().replace(/\s+/g, ".")}@prismtrust.co.uk`;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-slate-100", children: /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800", children: "Profile" }) }),
      /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Account Name" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-700 font-medium", children: clientName })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Account Number" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-700 font-mono", children: accountNumber })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Account Type" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-700", children: accountType })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Status" }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500" }),
            "Active"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 uppercase tracking-wider mb-1", children: "Member Since" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-700", children: formatDate(onboardedDate) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-slate-100", children: /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800", children: "Notifications" }) }),
      /* @__PURE__ */ jsxs("div", { className: "px-6 divide-y divide-slate-100", children: [
        /* @__PURE__ */ jsx(Toggle, { label: "Grant status updates", defaultChecked: true }),
        /* @__PURE__ */ jsx(Toggle, { label: "Statement availability", defaultChecked: true }),
        /* @__PURE__ */ jsx(Toggle, { label: "Investment alerts", defaultChecked: true }),
        /* @__PURE__ */ jsx(Toggle, { label: "Monthly summary email", defaultChecked: false })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-slate-100", children: /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800", children: "Security" }) }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: "Two-Factor Authentication" }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", "aria-hidden": "true", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              }
            ) }),
            "Enabled"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: "Last Login" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-500", children: "10 Mar 2026, 09:15 AM" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-slate-700", children: "Password" }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm text-slate-500", children: [
            /* @__PURE__ */ jsx("span", { className: "tracking-wider", children: "••••••••" }),
            /* @__PURE__ */ jsx("span", { className: "ml-2 text-xs text-slate-400", children: "Last changed 45 days ago" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800 mb-4", children: "Relationship Manager" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-800", children: relationshipManager }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: rmEmail }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: "+44 20 7946 0958" })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-navy-600 text-white text-sm font-medium hover:bg-navy-700 transition-colors focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2", children: "Schedule a Call" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-800 mb-4", children: "Connected Services" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200", children: [
          /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500" }),
          "Charity Commission API"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200", children: [
          /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500" }),
          "HMRC Gift Aid"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-50 text-slate-500 border border-slate-200", children: [
          "Open Banking",
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-normal text-slate-400", children: "Coming Soon" })
        ] })
      ] })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$Account = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Account;
  const clientId = Astro2.url.searchParams.get("client") || "ashford";
  const client = await loadDonorClient(clientId);
  if (!client) {
    return Astro2.redirect("/");
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": `${client.name} - Account`, "clientId": client.id, "clientName": client.name, "activePage": "account", "relationshipManager": client.relationshipManager }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div class="animate-fade-up"> <h2 class="text-2xl font-semibold text-slate-800">Account Settings</h2> <p class="text-sm text-slate-400 mt-1">Manage your profile, notifications, and security preferences</p> </div> <div class="animate-fade-up-1"> ${renderComponent($$result2, "AccountSettings", AccountSettings, { "client:load": true, "clientName": client.name, "accountNumber": client.accountNumber, "accountType": client.accountType, "relationshipManager": client.relationshipManager, "onboardedDate": client.onboardedDate, "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/AccountSettings", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/account.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/account.astro";
const $$url = "/account";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Account,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
