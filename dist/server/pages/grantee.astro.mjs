/* empty css                                   */
import { e as createComponent, g as addAttribute, k as renderComponent, l as renderHead, r as renderTemplate, n as renderSlot, h as createAstro, m as maybeRenderHead } from '../chunks/astro/server_C-UfuYaI.mjs';
import 'piccolore';
import { $ as $$ClientRouter } from '../chunks/ClientRouter_CPlGSO4U.mjs';
/* empty css                                 */
import { f as formatCurrency, h as getCharities } from '../chunks/grantees_BI5daSsQ.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, clientName, clientId } = Astro2.props;
  return renderTemplate`<html lang="en" class="antialiased" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="Prism The Gift Fund - Client Portal"><link rel="icon" type="image/svg+xml"${addAttribute(`${"/"}favicon.svg`, "href")}><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"><title>${title}</title>${renderComponent($$result, "ViewTransitions", $$ClientRouter, { "data-astro-cid-sckkx6r4": true })}${renderHead()}</head> <body class="bg-slate-50 min-h-screen" data-astro-cid-sckkx6r4> <nav class="bg-navy-600 shadow-lg" data-astro-cid-sckkx6r4> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-sckkx6r4> <div class="flex justify-between items-center h-16" data-astro-cid-sckkx6r4> <div class="flex items-center space-x-8" data-astro-cid-sckkx6r4> <a${addAttribute("/", "href")} class="flex items-center space-x-3" data-astro-cid-sckkx6r4> <span class="font-serif text-2xl font-bold text-white tracking-wide" data-astro-cid-sckkx6r4>PRISM</span> <span class="text-gold-400 text-xs font-medium tracking-widest uppercase hidden sm:inline" data-astro-cid-sckkx6r4>The Gift Fund</span> </a> ${clientName && renderTemplate`<div class="hidden md:flex items-center space-x-2" data-astro-cid-sckkx6r4> <div class="w-px h-6 bg-navy-400" data-astro-cid-sckkx6r4></div> <span class="text-navy-200 text-sm font-medium ml-2" data-astro-cid-sckkx6r4>${clientName}</span> </div>`} </div> <div class="flex items-center space-x-4" data-astro-cid-sckkx6r4> ${clientId && renderTemplate`<a${addAttribute("/", "href")} class="text-navy-200 hover:text-white text-sm font-medium transition-colors" data-astro-cid-sckkx6r4>
Switch Account
</a>`} <button class="flex items-center space-x-2 text-navy-200 hover:text-white text-sm font-medium transition-colors" data-astro-cid-sckkx6r4> <svg class="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-sckkx6r4> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-astro-cid-sckkx6r4></path> </svg> <span data-astro-cid-sckkx6r4>Logout</span> </button> </div> </div> </div> </nav> <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </main> <footer class="border-t border-slate-200 mt-16" data-astro-cid-sckkx6r4> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-astro-cid-sckkx6r4> <div class="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0" data-astro-cid-sckkx6r4> <p class="text-slate-400 text-xs" data-astro-cid-sckkx6r4>
&copy; 2026 Prism The Gift Fund. Registered Charity No. 1099682. All rights reserved.
</p> <div class="flex items-center space-x-4 text-xs text-slate-400" data-astro-cid-sckkx6r4> <span data-astro-cid-sckkx6r4>Powered by Synaptic</span> <span class="text-slate-300" data-astro-cid-sckkx6r4>|</span> <a href="#" class="hover:text-navy-600 transition-colors" data-astro-cid-sckkx6r4>Privacy Policy</a> <a href="#" class="hover:text-navy-600 transition-colors" data-astro-cid-sckkx6r4>Terms of Use</a> </div> </div> </div> </footer> </body></html>`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/layouts/Layout.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const charities = getCharities();
  const base = "/";
  const sectorMap = {
    nspcc: "Children's Welfare",
    tate: "Arts & Culture",
    bhf: "Health & Medical",
    wwf: "Environment",
    shelter: "Housing & Homelessness"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Select Charity - Prism Grantee Portal" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl mx-auto py-12"> <div class="text-center mb-12 animate-fade-up"> <h1 class="text-3xl font-bold text-slate-900 mb-2">Select Your Charity</h1> <p class="text-slate-500 text-base">Choose a charity to view grant status and documents</p> </div> <div class="grid gap-6 md:grid-cols-2"> ${charities.map((charity, idx) => renderTemplate`<a${addAttribute(`${base}grantee/dashboard?charity=${charity.id}`, "href")}${addAttribute([
    "group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 block p-6",
    idx === 0 ? "animate-fade-up" : idx === 1 ? "animate-fade-up-1" : idx === 2 ? "animate-fade-up-2" : idx === 3 ? "animate-fade-up-3" : "animate-fade-up-4"
  ], "class:list")}> <div class="mb-4"> <h2 class="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors"> ${charity.charityName} </h2> <p class="text-xs text-slate-400 mt-0.5">Charity No. ${charity.charityNumber}</p> </div> <div class="mb-4"> <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700"> ${sectorMap[charity.id] || "General"} </span> </div> <div class="flex items-center justify-between pt-4 border-t border-slate-100"> <div> <p class="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Active Grants</p> <p class="text-sm font-semibold text-slate-800">${charity.activeGrants}</p> </div> <div class="text-right"> <p class="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Total Received</p> <p class="text-sm font-semibold text-slate-800">${formatCurrency(charity.totalReceived)}</p> </div> </div> <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between"> <span class="text-sm font-medium text-emerald-600 group-hover:text-emerald-700 transition-colors">
View Dashboard &rarr;
</span> </div> </a>`)} </div> </div> ` })}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/grantee/index.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/grantee/index.astro";
const $$url = "/grantee";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
