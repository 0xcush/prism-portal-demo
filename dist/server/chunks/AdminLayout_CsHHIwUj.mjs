import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, h as createAstro, k as renderComponent, l as renderHead, n as renderSlot, o as renderScript } from './astro/server_Dh-RJMVH.mjs';
import 'piccolore';
import 'clsx';
import { N as NotificationDropdown } from './NotificationDropdown_CnfGf5uF.mjs';
import { $ as $$ClientRouter } from './ClientRouter_XvoqtsBK.mjs';
/* empty css                              */

const $$Astro$1 = createAstro();
const $$AdminSidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$AdminSidebar;
  const { activePage } = Astro2.props;
  const base = "/";
  return renderTemplate`${maybeRenderHead()}<aside id="sidebar" class="fixed inset-y-0 left-0 z-30 w-64 bg-navy-600 transform -translate-x-full lg:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col"> <!-- Logo --> <div class="px-6 py-5 border-b border-navy-500"> <a${addAttribute(`${base}admin`, "href")}> <span class="font-serif text-2xl font-bold text-white tracking-wide">PRISM</span> <span class="text-gold-400 text-xs tracking-widest uppercase block mt-0.5">Administration</span> </a> </div> <!-- Navigation --> <nav class="flex-1 px-3 py-6 overflow-y-auto"> <div class="space-y-1"> <a${addAttribute(`${base}admin`, "href")}${addAttribute([
    "flex items-center gap-3 py-2.5 pr-3 rounded-r-lg text-sm font-medium transition-all duration-150",
    activePage === "dashboard" ? "bg-navy-500/80 text-white border-l-[3px] border-gold-400 pl-[calc(0.75rem-3px)]" : "text-navy-200 hover:bg-navy-500/40 hover:text-white pl-3"
  ], "class:list")}> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"></path> </svg>
Dashboard
</a> <a${addAttribute(`${base}admin/pipeline`, "href")}${addAttribute([
    "flex items-center gap-3 py-2.5 pr-3 rounded-r-lg text-sm font-medium transition-all duration-150",
    activePage === "pipeline" ? "bg-navy-500/80 text-white border-l-[3px] border-gold-400 pl-[calc(0.75rem-3px)]" : "text-navy-200 hover:bg-navy-500/40 hover:text-white pl-3"
  ], "class:list")}> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"></path> </svg>
Pipeline
</a> <a${addAttribute(`${base}admin/clients`, "href")}${addAttribute([
    "flex items-center gap-3 py-2.5 pr-3 rounded-r-lg text-sm font-medium transition-all duration-150",
    activePage === "clients" ? "bg-navy-500/80 text-white border-l-[3px] border-gold-400 pl-[calc(0.75rem-3px)]" : "text-navy-200 hover:bg-navy-500/40 hover:text-white pl-3"
  ], "class:list")}> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path> </svg>
Clients
</a> <a${addAttribute(`${base}admin/grants`, "href")}${addAttribute([
    "flex items-center gap-3 py-2.5 pr-3 rounded-r-lg text-sm font-medium transition-all duration-150",
    activePage === "grants" ? "bg-navy-500/80 text-white border-l-[3px] border-gold-400 pl-[calc(0.75rem-3px)]" : "text-navy-200 hover:bg-navy-500/40 hover:text-white pl-3"
  ], "class:list")}> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path> </svg>
Grants
</a> <a${addAttribute(`${base}admin/firms`, "href")}${addAttribute([
    "flex items-center gap-3 py-2.5 pr-3 rounded-r-lg text-sm font-medium transition-all duration-150",
    activePage === "firms" ? "bg-navy-500/80 text-white border-l-[3px] border-gold-400 pl-[calc(0.75rem-3px)]" : "text-navy-200 hover:bg-navy-500/40 hover:text-white pl-3"
  ], "class:list")}> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"></path> </svg>
Firms
</a> <a${addAttribute(`${base}admin/contacts`, "href")}${addAttribute([
    "flex items-center gap-3 py-2.5 pr-3 rounded-r-lg text-sm font-medium transition-all duration-150",
    activePage === "contacts" ? "bg-navy-500/80 text-white border-l-[3px] border-gold-400 pl-[calc(0.75rem-3px)]" : "text-navy-200 hover:bg-navy-500/40 hover:text-white pl-3"
  ], "class:list")}> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path> </svg>
Contacts
</a> <a${addAttribute(`${base}admin/activities`, "href")}${addAttribute([
    "flex items-center gap-3 py-2.5 pr-3 rounded-r-lg text-sm font-medium transition-all duration-150",
    activePage === "activities" ? "bg-navy-500/80 text-white border-l-[3px] border-gold-400 pl-[calc(0.75rem-3px)]" : "text-navy-200 hover:bg-navy-500/40 hover:text-white pl-3"
  ], "class:list")}> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path> </svg>
Activities
</a> <a${addAttribute(`${base}admin/kpis`, "href")}${addAttribute([
    "flex items-center gap-3 py-2.5 pr-3 rounded-r-lg text-sm font-medium transition-all duration-150",
    activePage === "kpis" ? "bg-navy-500/80 text-white border-l-[3px] border-gold-400 pl-[calc(0.75rem-3px)]" : "text-navy-200 hover:bg-navy-500/40 hover:text-white pl-3"
  ], "class:list")}> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"></path> </svg>
KPIs
</a> <a${addAttribute(`${base}admin/approvals`, "href")}${addAttribute([
    "flex items-center gap-3 py-2.5 pr-3 rounded-r-lg text-sm font-medium transition-all duration-150",
    activePage === "approvals" ? "bg-navy-500/80 text-white border-l-[3px] border-gold-400 pl-[calc(0.75rem-3px)]" : "text-navy-200 hover:bg-navy-500/40 hover:text-white pl-3"
  ], "class:list")}> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>
Approvals
</a> </div> </nav> <!-- User Card --> <div class="mt-auto px-4 py-4 border-t border-navy-500"> <div class="px-3 py-4 rounded-lg bg-navy-500/50 border border-navy-400/30"> <div class="flex items-center gap-2.5"> <div class="w-8 h-8 rounded-full bg-gold-400/20 flex items-center justify-center flex-shrink-0"> <span class="text-xs font-bold text-gold-400">SB</span> </div> <div> <p class="text-sm font-medium text-white">Sophie Merrick</p> <p class="text-[10px] text-navy-300">BD Director</p> </div> </div> </div> </div> <!-- Footer --> <div class="px-4 pb-4"> <p class="text-[10px] text-navy-400 text-center tracking-wide">Powered by Synaptic</p> </div> </aside>`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/AdminSidebar.astro", void 0);

const $$Astro = createAstro();
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title, activePage } = Astro2.props;
  return renderTemplate`<html lang="en" class="antialiased" data-astro-cid-2kanml4j> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="Prism The Gift Fund - Administration"><link rel="icon" type="image/svg+xml"${addAttribute(`${"/"}favicon.svg`, "href")}><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"><title>${title}</title>${renderComponent($$result, "ViewTransitions", $$ClientRouter, { "data-astro-cid-2kanml4j": true })}${renderHead()}</head> <body class="bg-slate-50 min-h-screen" data-astro-cid-2kanml4j> <!-- Mobile overlay --> <div id="sidebar-overlay" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 hidden lg:hidden" data-astro-cid-2kanml4j></div> <div class="flex min-h-screen" data-astro-cid-2kanml4j> <!-- Sidebar --> ${renderComponent($$result, "AdminSidebar", $$AdminSidebar, { "activePage": activePage, "data-astro-cid-2kanml4j": true })} <!-- Main content area --> <div class="flex-1 flex flex-col lg:ml-64" data-astro-cid-2kanml4j> <!-- Topbar --> <header class="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200 h-16 flex items-center px-4 sm:px-6" data-astro-cid-2kanml4j> <!-- Mobile hamburger --> <button id="mobile-menu-btn" class="lg:hidden p-2 -ml-2 mr-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Open menu" data-astro-cid-2kanml4j> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-2kanml4j> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-astro-cid-2kanml4j></path> </svg> </button> <h1 class="text-lg font-semibold text-slate-800 truncate" data-astro-cid-2kanml4j>Prism Administration</h1> <div class="ml-auto flex items-center gap-3" data-astro-cid-2kanml4j> <!-- Search --> <div class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm w-56 focus-within:ring-2 focus-within:ring-navy-600 focus-within:border-transparent transition-shadow" data-astro-cid-2kanml4j> <svg class="w-4 h-4 flex-shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-2kanml4j> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-astro-cid-2kanml4j></path> </svg> <input type="text" id="topbar-search" placeholder="Search..." class="flex-1 bg-transparent text-slate-700 placeholder-slate-400 outline-none text-sm" data-astro-cid-2kanml4j> </div> <!-- Notifications --> ${renderComponent($$result, "NotificationDropdown", NotificationDropdown, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/NotificationDropdown", "client:component-export": "default", "data-astro-cid-2kanml4j": true })} <!-- Avatar --> <div class="w-8 h-8 rounded-full bg-navy-600 flex items-center justify-center" data-astro-cid-2kanml4j> <span class="text-xs font-semibold text-white" data-astro-cid-2kanml4j>SB</span> </div> <!-- Logout --> <a${addAttribute(`${"/"}login`, "href")} class="hidden sm:flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors" data-astro-cid-2kanml4j> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-2kanml4j> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-astro-cid-2kanml4j></path> </svg>
Logout
</a> </div> </header> <!-- Page content --> <main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto" data-astro-cid-2kanml4j> ${renderSlot($$result, $$slots["default"])} </main> <!-- Footer --> <footer class="border-t border-slate-100 px-6 py-4" data-astro-cid-2kanml4j> <p class="text-xs text-slate-400 text-center" data-astro-cid-2kanml4j>
&copy; 2026 Prism The Gift Fund. Registered Charity No. 1099682
</p> </footer> </div> </div> ${renderScript($$result, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
