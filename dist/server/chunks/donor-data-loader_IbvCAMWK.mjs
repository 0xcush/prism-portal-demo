import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, h as createAstro, k as renderComponent, l as renderHead, n as renderSlot, o as renderScript } from './astro/server_Dh-RJMVH.mjs';
import 'piccolore';
import 'clsx';
import { N as NotificationDropdown } from './NotificationDropdown_CnfGf5uF.mjs';
import { $ as $$ClientRouter } from './ClientRouter_XvoqtsBK.mjs';
/* empty css                           */
import { l as loadAdminData } from './data-loader_CbTPm3y6.mjs';

const $$Astro$1 = createAstro();
const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Sidebar;
  const { activePage, clientId, clientName, relationshipManager } = Astro2.props;
  const base = "/";
  return renderTemplate`${maybeRenderHead()}<aside id="sidebar" class="fixed inset-y-0 left-0 z-30 w-64 bg-navy-600 transform -translate-x-full lg:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col"> <!-- Logo --> <div class="px-6 py-5 border-b border-navy-500"> <a${addAttribute(base, "href")}> <span class="font-serif text-2xl font-bold text-white tracking-wide">PRISM</span> <span class="text-gold-400 text-xs tracking-widest uppercase block mt-0.5">The Gift Fund</span> </a> </div> <!-- Navigation --> <nav class="flex-1 px-3 py-6"> <div class="space-y-1"> <a${addAttribute(`${base}dashboard?client=${clientId}`, "href")}${addAttribute([
    "flex items-center gap-3 py-2.5 pr-3 rounded-r-lg text-sm font-medium transition-all duration-150",
    activePage === "overview" ? "bg-navy-500/80 text-white border-l-[3px] border-gold-400 pl-[calc(0.75rem-3px)]" : "text-navy-200 hover:bg-navy-500/40 hover:text-white pl-3"
  ], "class:list")}> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"></path> </svg>
Overview
</a> <a${addAttribute(`${base}grants?client=${clientId}`, "href")}${addAttribute([
    "flex items-center gap-3 py-2.5 pr-3 rounded-r-lg text-sm font-medium transition-all duration-150",
    activePage === "grants" ? "bg-navy-500/80 text-white border-l-[3px] border-gold-400 pl-[calc(0.75rem-3px)]" : "text-navy-200 hover:bg-navy-500/40 hover:text-white pl-3"
  ], "class:list")}> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path> </svg>
Grants
</a> <a${addAttribute(`${base}statements?client=${clientId}`, "href")}${addAttribute([
    "flex items-center gap-3 py-2.5 pr-3 rounded-r-lg text-sm font-medium transition-all duration-150",
    activePage === "statements" ? "bg-navy-500/80 text-white border-l-[3px] border-gold-400 pl-[calc(0.75rem-3px)]" : "text-navy-200 hover:bg-navy-500/40 hover:text-white pl-3"
  ], "class:list")}> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path> </svg>
Statements
</a> <a${addAttribute(`${base}resources?client=${clientId}`, "href")}${addAttribute([
    "flex items-center gap-3 py-2.5 pr-3 rounded-r-lg text-sm font-medium transition-all duration-150",
    activePage === "resources" ? "bg-navy-500/80 text-white border-l-[3px] border-gold-400 pl-[calc(0.75rem-3px)]" : "text-navy-200 hover:bg-navy-500/40 hover:text-white pl-3"
  ], "class:list")}> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"></path> </svg>
Resources
</a> <a${addAttribute(`${base}account?client=${clientId}`, "href")}${addAttribute([
    "flex items-center gap-3 py-2.5 pr-3 rounded-r-lg text-sm font-medium transition-all duration-150",
    activePage === "account" ? "bg-navy-500/80 text-white border-l-[3px] border-gold-400 pl-[calc(0.75rem-3px)]" : "text-navy-200 hover:bg-navy-500/40 hover:text-white pl-3"
  ], "class:list")}> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg>
Account
</a> </div> </nav> <!-- RM Card --> <div class="mt-auto px-4 py-4 border-t border-navy-500"> <div class="px-3 py-4 rounded-lg bg-navy-500/50 border border-navy-400/30"> <p class="text-[10px] text-navy-300 uppercase tracking-widest">Your Relationship Manager</p> <div class="flex items-center gap-2.5 mt-2"> <div class="w-8 h-8 rounded-full bg-gold-400/20 flex items-center justify-center flex-shrink-0"> <span class="text-xs font-bold text-gold-400">${relationshipManager.split(" ").map((n) => n[0]).join("")}</span> </div> <div> <p class="text-sm font-medium text-white">${relationshipManager}</p> <p class="text-[10px] text-navy-300">Available Mon-Fri, 9am-5pm</p> </div> </div> <a href="#" class="mt-3 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gold-400/20 text-gold-400 text-xs font-medium hover:bg-gold-400/30 transition-colors"> <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path> </svg>
Schedule a Call
</a> </div> </div> <!-- Footer --> <div class="px-4 pb-4"> <p class="text-[10px] text-navy-400 text-center tracking-wide">Powered by Synaptic</p> </div> </aside>`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/Sidebar.astro", void 0);

const $$Astro = createAstro();
const $$DashboardLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DashboardLayout;
  const { title, clientId, clientName, activePage, relationshipManager } = Astro2.props;
  return renderTemplate`<html lang="en" class="antialiased" data-astro-cid-kqx5um5x> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="Prism The Gift Fund - Client Portal"><link rel="icon" type="image/svg+xml"${addAttribute(`${"/"}favicon.svg`, "href")}><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"><title>${title}</title>${renderComponent($$result, "ViewTransitions", $$ClientRouter, { "data-astro-cid-kqx5um5x": true })}${renderHead()}</head> <body class="bg-slate-50 min-h-screen" data-astro-cid-kqx5um5x> <!-- Mobile overlay --> <div id="sidebar-overlay" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 hidden lg:hidden" data-astro-cid-kqx5um5x></div> <div class="flex min-h-screen" data-astro-cid-kqx5um5x> <!-- Sidebar --> ${renderComponent($$result, "Sidebar", $$Sidebar, { "activePage": activePage, "clientId": clientId, "clientName": clientName, "relationshipManager": relationshipManager, "data-astro-cid-kqx5um5x": true })} <!-- Main content area --> <div class="flex-1 flex flex-col lg:ml-64" data-astro-cid-kqx5um5x> <!-- Topbar --> <header class="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200 h-16 flex items-center px-4 sm:px-6" data-astro-cid-kqx5um5x> <!-- Mobile hamburger --> <button id="mobile-menu-btn" class="lg:hidden p-2 -ml-2 mr-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Open menu" data-astro-cid-kqx5um5x> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-kqx5um5x> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-astro-cid-kqx5um5x></path> </svg> </button> <h1 class="text-lg font-semibold text-slate-800 truncate" data-astro-cid-kqx5um5x>${clientName}</h1> <div class="ml-auto flex items-center gap-3" data-astro-cid-kqx5um5x> <!-- Search --> <div class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm w-56 focus-within:ring-2 focus-within:ring-navy-600 focus-within:border-transparent transition-shadow" data-astro-cid-kqx5um5x> <svg class="w-4 h-4 flex-shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-kqx5um5x> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-astro-cid-kqx5um5x></path> </svg> <input type="text" id="topbar-search" placeholder="Search..." class="flex-1 bg-transparent text-slate-700 placeholder-slate-400 outline-none text-sm" data-astro-cid-kqx5um5x> </div> <!-- Notifications --> ${renderComponent($$result, "NotificationDropdown", NotificationDropdown, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/NotificationDropdown", "client:component-export": "default", "data-astro-cid-kqx5um5x": true })} <!-- Avatar --> <div class="w-8 h-8 rounded-full bg-navy-600 flex items-center justify-center" data-astro-cid-kqx5um5x> <span class="text-xs font-semibold text-white" data-astro-cid-kqx5um5x>${clientName.charAt(0)}</span> </div> <!-- Logout --> <a${addAttribute(`${"/"}login`, "href")} class="hidden sm:flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors" data-astro-cid-kqx5um5x> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-kqx5um5x> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-astro-cid-kqx5um5x></path> </svg>
Logout
</a> </div> </header> <!-- Page content --> <main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto" data-astro-cid-kqx5um5x> ${renderSlot($$result, $$slots["default"])} </main> <!-- Footer --> <footer class="border-t border-slate-100 px-6 py-4" data-astro-cid-kqx5um5x> <p class="text-xs text-slate-400 text-center" data-astro-cid-kqx5um5x>
&copy; 2026 Prism The Gift Fund. Registered Charity No. 1099682
</p> </footer> </div> </div> ${renderScript($$result, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/layouts/DashboardLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/layouts/DashboardLayout.astro", void 0);

const clients = {
  ashford: {
    id: "ashford",
    name: "The Ashford Foundation",
    accountNumber: "PTGF-2024-0847",
    relationshipManager: "James Prescott",
    accountType: "DAF",
    status: "Active",
    onboardedDate: "2024-03-15",
    balances: {
      cash: 847230,
      investments: 1423560,
      total: 2270790
    },
    ytdReturn: 3.2,
    assetDistribution: [
      { name: "UK Equities", value: 35, color: "#1e3a5f" },
      { name: "Global Bonds", value: 25, color: "#3b6da1" },
      { name: "Property Fund", value: 15, color: "#c5a55a" },
      { name: "ESG Impact Fund", value: 15, color: "#6ba368" },
      { name: "Cash", value: 10, color: "#94a3b8" }
    ],
    grants: [
      {
        id: "GR-2026-0112",
        charity: "Save the Children UK",
        charityNumber: "213890",
        amount: 75e3,
        dateRequested: "2026-02-28",
        dateApproved: "2026-03-03",
        datePaid: "2026-03-07",
        status: "Paid",
        issueArea: "Social Welfare",
        timeline: [
          { status: "Requested", date: "2026-02-28", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2026-03-02", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2026-03-03", actor: "James Prescott", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2026-03-07", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "1 St John's Lane, London EC1M 4AR",
        charityWebsite: "savethechildren.org.uk",
        charityType: "Registered Charity",
        approvalNotes: "Standard due diligence passed",
        charityContact: "Sarah Mitchell, Partnerships"
      },
      {
        id: "GR-2026-0108",
        charity: "Macmillan Cancer Support",
        charityNumber: "261017",
        amount: 12e4,
        dateRequested: "2026-02-15",
        dateApproved: "2026-02-20",
        datePaid: "2026-02-25",
        status: "Paid",
        issueArea: "Healthcare",
        timeline: [
          { status: "Requested", date: "2026-02-15", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2026-02-17", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2026-02-20", actor: "James Prescott", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2026-02-25", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "89 Albert Embankment, London SE1 7UQ",
        charityWebsite: "macmillan.org.uk",
        charityType: "Registered Charity",
        approvalNotes: "Enhanced review completed for grants over £100,000",
        charityContact: "Dr. Richard Hayes, Philanthropy"
      },
      {
        id: "GR-2026-0119",
        charity: "Royal Opera House Foundation",
        charityNumber: "211775",
        amount: 5e4,
        dateRequested: "2026-03-05",
        dateApproved: "2026-03-08",
        datePaid: null,
        status: "Approved",
        issueArea: "Arts & Culture",
        timeline: [
          { status: "Requested", date: "2026-03-05", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2026-03-07", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2026-03-08", actor: "James Prescott", note: "Grant approved following compliance review" }
        ],
        verifiedViaCC: true,
        charityAddress: "Bow Street, London WC2E 9DD",
        charityWebsite: "roh.org.uk",
        charityType: "Registered Charity",
        approvalNotes: "Standard due diligence passed",
        charityContact: "Emma Whitworth, Development"
      },
      {
        id: "GR-2026-0121",
        charity: "WWF UK",
        charityNumber: "1081247",
        amount: 35e3,
        dateRequested: "2026-03-07",
        dateApproved: null,
        datePaid: null,
        status: "In Review",
        issueArea: "Environment",
        delayReason: "Awaiting bank statement verification",
        timeline: [
          { status: "Requested", date: "2026-03-07", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2026-03-09", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" }
        ],
        verifiedViaCC: true,
        charityAddress: "The Living Planet Centre, Rufford House, Brewery Road, Woking GU21 4LL",
        charityWebsite: "wwf.org.uk",
        charityType: "CIO",
        approvalNotes: "Awaiting bank statement verification from charity",
        charityContact: "Tom Langley, Corporate Partnerships"
      },
      {
        id: "GR-2026-0124",
        charity: "National Trust",
        charityNumber: "205846",
        amount: 25e3,
        dateRequested: "2026-03-09",
        dateApproved: null,
        datePaid: null,
        status: "Requested",
        issueArea: "Environment",
        timeline: [
          { status: "Requested", date: "2026-03-09", actor: "Client Portal", note: "Grant recommendation submitted via portal" }
        ],
        verifiedViaCC: true,
        charityAddress: "Heelis, Kemble Drive, Swindon SN2 2NA",
        charityWebsite: "nationaltrust.org.uk",
        charityType: "Registered Charity",
        approvalNotes: "Pending initial review"
      },
      {
        id: "GR-2026-0098",
        charity: "Great Ormond Street Hospital Children's Charity",
        charityNumber: "1160024",
        amount: 2e5,
        dateRequested: "2026-01-22",
        dateApproved: "2026-01-28",
        datePaid: "2026-02-03",
        status: "Paid",
        issueArea: "Healthcare",
        timeline: [
          { status: "Requested", date: "2026-01-22", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2026-01-24", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2026-01-28", actor: "James Prescott", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2026-02-03", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "Great Ormond Street, London WC1N 3JH",
        charityWebsite: "gosh.org",
        charityType: "Registered Charity",
        approvalNotes: "Enhanced review completed for grants over £100,000"
      },
      {
        id: "GR-2026-0089",
        charity: "The Sutton Trust",
        charityNumber: "1146244",
        amount: 85e3,
        dateRequested: "2026-01-10",
        dateApproved: "2026-01-15",
        datePaid: "2026-01-20",
        status: "Paid",
        issueArea: "Education",
        timeline: [
          { status: "Requested", date: "2026-01-10", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2026-01-12", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2026-01-15", actor: "James Prescott", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2026-01-20", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "9th Floor, Millbank Tower, 21-24 Millbank, London SW1P 4QP",
        charityWebsite: "suttontrust.com",
        charityType: "Registered Charity",
        approvalNotes: "Standard due diligence passed"
      },
      {
        id: "GR-2025-0341",
        charity: "Tate Foundation",
        charityNumber: "1085314",
        amount: 6e4,
        dateRequested: "2025-12-08",
        dateApproved: "2025-12-12",
        datePaid: "2025-12-18",
        status: "Paid",
        issueArea: "Arts & Culture",
        timeline: [
          { status: "Requested", date: "2025-12-08", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2025-12-10", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2025-12-12", actor: "James Prescott", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2025-12-18", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "Tate Modern, Bankside, London SE1 9TG",
        charityWebsite: "tate.org.uk",
        charityType: "Registered Charity",
        approvalNotes: "Expedited approval - existing relationship"
      },
      {
        id: "GR-2025-0330",
        charity: "British Red Cross",
        charityNumber: "220949",
        amount: 45e3,
        dateRequested: "2025-11-20",
        dateApproved: "2025-11-25",
        datePaid: "2025-12-01",
        status: "Paid",
        issueArea: "Social Welfare",
        timeline: [
          { status: "Requested", date: "2025-11-20", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2025-11-22", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2025-11-25", actor: "James Prescott", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2025-12-01", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "44 Moorfields, London EC2Y 9AL",
        charityWebsite: "redcross.org.uk",
        charityType: "Registered Charity",
        approvalNotes: "Standard due diligence passed"
      },
      {
        id: "GR-2025-0318",
        charity: "University of Oxford Development Trust",
        charityNumber: "1143548",
        amount: 15e4,
        dateRequested: "2025-11-05",
        dateApproved: "2025-11-10",
        datePaid: "2025-11-18",
        status: "Paid",
        issueArea: "Education",
        timeline: [
          { status: "Requested", date: "2025-11-05", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2025-11-07", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2025-11-10", actor: "James Prescott", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2025-11-18", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "University Offices, Wellington Square, Oxford OX1 2JD",
        charityWebsite: "development.ox.ac.uk",
        charityType: "Registered Charity",
        approvalNotes: "Enhanced review completed for grants over £100,000"
      }
    ],
    issueAreaBreakdown: [
      { area: "Healthcare", percentage: 32, amount: 726e3 },
      { area: "Education", percentage: 24, amount: 545e3 },
      { area: "Arts & Culture", percentage: 18, amount: 409e3 },
      { area: "Environment", percentage: 15, amount: 341e3 },
      { area: "Social Welfare", percentage: 11, amount: 25e4 }
    ],
    statements: [
      { period: "Q1 2026", type: "Quarterly", date: "2026-04-01", aiGenerated: true },
      { period: "Q4 2025", type: "Quarterly", date: "2026-01-15", aiGenerated: true },
      { period: "Q3 2025", type: "Quarterly", date: "2025-10-15", aiGenerated: true },
      { period: "Q2 2025", type: "Quarterly", date: "2025-07-15", aiGenerated: true },
      { period: "Q1 2025", type: "Quarterly", date: "2025-04-15", aiGenerated: true },
      { period: "Annual Statement 2025", type: "Annual", date: "2026-02-01", aiGenerated: true },
      { period: "Annual Statement 2024", type: "Annual", date: "2025-02-01", aiGenerated: true },
      { period: "Tax Summary 2025", type: "Tax", date: "2026-02-15", aiGenerated: true }
    ],
    transactions: [
      { date: "2026-03-07", description: "Grant Payment - Save the Children UK", reference: "GR-2026-0112", debit: 75e3, credit: null, balance: 847230, category: "Grant Disbursement" },
      { date: "2026-03-05", description: "Investment Income - UK Equities Dividend", reference: "INV-2026-0341", debit: null, credit: 12450, balance: 922230, category: "Investment Income" },
      { date: "2026-03-01", description: "Management Fee - Q1 2026", reference: "FEE-2026-Q1", debit: 2837.5, credit: null, balance: 909780, category: "Fees & Charges" },
      { date: "2026-02-25", description: "Grant Payment - Macmillan Cancer Support", reference: "GR-2026-0108", debit: 12e4, credit: null, balance: 912617.5, category: "Grant Disbursement" },
      { date: "2026-02-20", description: "Investment Income - Global Bonds Coupon", reference: "INV-2026-0298", debit: null, credit: 8920, balance: 10326175e-1, category: "Investment Income" },
      { date: "2026-02-15", description: "Donation Received - Ashford Trust", reference: "DON-2026-0045", debit: null, credit: 25e4, balance: 10236975e-1, category: "Donation" },
      { date: "2026-02-10", description: "Investment Rebalance - ESG Impact Fund", reference: "REB-2026-0012", debit: 5e4, credit: null, balance: 773697.5, category: "Investment Transfer" },
      { date: "2026-02-10", description: "Investment Rebalance - UK Equities", reference: "REB-2026-0013", debit: null, credit: 5e4, balance: 823697.5, category: "Investment Transfer" },
      { date: "2026-02-03", description: "Grant Payment - GOSH Children's Charity", reference: "GR-2026-0098", debit: 2e5, credit: null, balance: 773697.5, category: "Grant Disbursement" },
      { date: "2026-01-28", description: "Investment Income - Property Fund Distribution", reference: "INV-2026-0187", debit: null, credit: 15340, balance: 973697.5, category: "Investment Income" },
      { date: "2026-01-20", description: "Grant Payment - The Sutton Trust", reference: "GR-2026-0089", debit: 85e3, credit: null, balance: 958357.5, category: "Grant Disbursement" },
      { date: "2026-01-15", description: "Platform Fee - January 2026", reference: "FEE-2026-0115", debit: 567.8, credit: null, balance: 10433575e-1, category: "Fees & Charges" },
      { date: "2026-01-10", description: "Investment Income - ESG Fund Distribution", reference: "INV-2026-0092", debit: null, credit: 6780, balance: 10439253e-1, category: "Investment Income" },
      { date: "2025-12-18", description: "Grant Payment - Tate Foundation", reference: "GR-2025-0341", debit: 6e4, credit: null, balance: 10371453e-1, category: "Grant Disbursement" },
      { date: "2025-12-15", description: "Donation Received - Year-End Contribution", reference: "DON-2025-0198", debit: null, credit: 175e3, balance: 10971453e-1, category: "Donation" }
    ],
    holdings: [
      { name: "Vanguard FTSE All-World UCITS ETF", ticker: "VWRL", units: 2415, price: 109.82, value: 265215, change: 5.4, weight: 18.6 },
      { name: "iShares Core MSCI World UCITS ETF", ticker: "SWDA", units: 2780, price: 82.45, value: 229211, change: 4.8, weight: 16.1 },
      { name: "Royal London Ethical Bond Fund", ticker: "RLEBF", units: 168450, price: 1.134, value: 190942, change: 1.2, weight: 13.4 },
      { name: "Rathbone Ethical Bond Fund", ticker: "RATEB", units: 150320, price: 1.2185, value: 183215, change: 0.8, weight: 12.9 },
      { name: "Impax Environmental Markets", ticker: "IEM", units: 32800, price: 5.19, value: 170232, change: 6.7, weight: 12 },
      { name: "Troy Trojan Fund", ticker: "TROYF", units: 62400, price: 2.578, value: 160867, change: 2.1, weight: 11.3 },
      { name: "CCLA COIF Charities Fixed Interest Fund", ticker: "CCFIF", units: 119200, price: 1.1865, value: 141351, change: -0.4, weight: 9.9 },
      { name: "M&G Optimal Income Fund", ticker: "MGOI", units: 57640, price: 1.443, value: 82527, change: 1.6, weight: 5.8 }
    ],
    monthlyPerformance: [
      { month: "Apr 2025", fundValue: 219e4, benchmark: 219e4 },
      { month: "May 2025", fundValue: 2198500, benchmark: 2196200 },
      { month: "Jun 2025", fundValue: 2210300, benchmark: 2205800 },
      { month: "Jul 2025", fundValue: 2225100, benchmark: 2218400 },
      { month: "Aug 2025", fundValue: 2218700, benchmark: 2214600 },
      { month: "Sep 2025", fundValue: 2212400, benchmark: 2210200 },
      { month: "Oct 2025", fundValue: 2228900, benchmark: 2221500 },
      { month: "Nov 2025", fundValue: 2241600, benchmark: 2230800 },
      { month: "Dec 2025", fundValue: 2252200, benchmark: 2238100 },
      { month: "Jan 2026", fundValue: 2258800, benchmark: 2242600 },
      { month: "Feb 2026", fundValue: 2264500, benchmark: 2246900 },
      { month: "Mar 2026", fundValue: 2270790, benchmark: 225e4 }
    ],
    recentActivity: [
      { type: "disbursement", title: "Grant Paid", description: "Save the Children UK - £75,000 processed via BACS", timestamp: "2026-03-07", aiGenerated: false },
      { type: "income", title: "Dividend Received", description: "UK Equities quarterly dividend - £12,450 credited", timestamp: "2026-03-05", aiGenerated: false },
      { type: "compliance", title: "Charity Commission Check", description: "WWF UK (1081247) verification initiated for pending grant GR-2026-0121", timestamp: "2026-03-09", aiGenerated: true },
      { type: "statement", title: "Q1 2026 Statement Ready", description: "Quarterly statement for Jan-Mar 2026 generated and available for download.", timestamp: "2026-03-10", aiGenerated: true },
      { type: "rebalance", title: "Portfolio Rebalanced", description: "ESG Impact Fund allocation increased from 12% to 15%, funded from UK Equities", timestamp: "2026-02-10", aiGenerated: true },
      { type: "disbursement", title: "Grant Paid", description: "Macmillan Cancer Support - £120,000 processed via BACS", timestamp: "2026-02-25", aiGenerated: false },
      { type: "income", title: "Donation Received", description: "Ashford Trust annual contribution - £250,000 credited to cash account", timestamp: "2026-02-15", aiGenerated: false },
      { type: "compliance", title: "Annual Review Complete", description: "FCA compliance check passed. All documentation verified and filed.", timestamp: "2026-01-31", aiGenerated: true },
      { type: "disbursement", title: "Grant Paid", description: "GOSH Children's Charity - £200,000 processed via BACS", timestamp: "2026-02-03", aiGenerated: false },
      { type: "statement", title: "Tax Summary 2025 Ready", description: "Annual tax summary for 2025 generated. Gift Aid reclaims totalling £48,200 identified.", timestamp: "2026-02-15", aiGenerated: true }
    ]
  },
  greenfield: {
    id: "greenfield",
    name: "Greenfield Community Trust",
    accountNumber: "PTGF-2023-0412",
    relationshipManager: "Eleanor Pemberton",
    accountType: "Collective Fund",
    status: "Active",
    onboardedDate: "2023-06-01",
    balances: {
      cash: 234500,
      investments: 498200,
      offshore: 157300,
      total: 89e4
    },
    ytdReturn: 2.8,
    assetDistribution: [
      { name: "UK Gilts", value: 30, color: "#1e3a5f" },
      { name: "Corporate Bonds", value: 20, color: "#3b6da1" },
      { name: "UK Equities", value: 20, color: "#c5a55a" },
      { name: "International Equities", value: 15, color: "#6ba368" },
      { name: "Offshore Fixed Income", value: 10, color: "#8b5cf6" },
      { name: "Cash", value: 5, color: "#94a3b8" }
    ],
    grants: [
      {
        id: "GR-2026-0445",
        charity: "Oxfam GB",
        charityNumber: "202918",
        amount: 3e4,
        dateRequested: "2026-03-01",
        dateApproved: "2026-03-05",
        datePaid: "2026-03-09",
        status: "Paid",
        issueArea: "Social Welfare",
        timeline: [
          { status: "Requested", date: "2026-03-01", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2026-03-03", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2026-03-05", actor: "Eleanor Pemberton", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2026-03-09", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "Oxfam House, John Smith Drive, Cowley, Oxford OX4 2JY",
        charityWebsite: "oxfam.org.uk",
        charityType: "Registered Charity",
        approvalNotes: "Standard due diligence passed"
      },
      {
        id: "GR-2026-0451",
        charity: "Royal National Lifeboat Institution",
        charityNumber: "209603",
        amount: 15e3,
        dateRequested: "2026-03-04",
        dateApproved: "2026-03-07",
        datePaid: null,
        status: "Approved",
        issueArea: "Social Welfare",
        timeline: [
          { status: "Requested", date: "2026-03-04", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2026-03-06", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2026-03-07", actor: "Eleanor Pemberton", note: "Grant approved following compliance review" }
        ],
        verifiedViaCC: true,
        charityAddress: "West Quay Road, Poole, Dorset BH15 1HZ",
        charityWebsite: "rnli.org",
        charityType: "Registered Charity",
        approvalNotes: "Expedited approval - existing relationship"
      },
      {
        id: "GR-2026-0458",
        charity: "The Woodland Trust",
        charityNumber: "294344",
        amount: 2e4,
        dateRequested: "2026-03-08",
        dateApproved: null,
        datePaid: null,
        status: "In Review",
        issueArea: "Environment",
        timeline: [
          { status: "Requested", date: "2026-03-08", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2026-03-10", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" }
        ],
        verifiedViaCC: true,
        charityAddress: "Kempton Way, Grantham, Lincolnshire NG31 6LL",
        charityWebsite: "woodlandtrust.org.uk",
        charityType: "Registered Charity",
        approvalNotes: "Standard review in progress"
      },
      {
        id: "GR-2026-0432",
        charity: "Cancer Research UK",
        charityNumber: "1089464",
        amount: 45e3,
        dateRequested: "2026-02-18",
        dateApproved: "2026-02-22",
        datePaid: "2026-02-28",
        status: "Paid",
        issueArea: "Healthcare",
        timeline: [
          { status: "Requested", date: "2026-02-18", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2026-02-20", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2026-02-22", actor: "Eleanor Pemberton", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2026-02-28", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "2 Redman Place, London E20 1JQ",
        charityWebsite: "cancerresearchuk.org",
        charityType: "Registered Charity",
        approvalNotes: "Standard due diligence passed"
      },
      {
        id: "GR-2026-0420",
        charity: "Shelter",
        charityNumber: "263710",
        amount: 25e3,
        dateRequested: "2026-02-05",
        dateApproved: "2026-02-10",
        datePaid: "2026-02-15",
        status: "Paid",
        issueArea: "Social Welfare",
        timeline: [
          { status: "Requested", date: "2026-02-05", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2026-02-07", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2026-02-10", actor: "Eleanor Pemberton", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2026-02-15", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "88 Old Street, London EC1V 9HU",
        charityWebsite: "shelter.org.uk",
        charityType: "Registered Charity",
        approvalNotes: "Standard due diligence passed"
      },
      {
        id: "GR-2025-0398",
        charity: "Mind",
        charityNumber: "219830",
        amount: 18e3,
        dateRequested: "2025-12-10",
        dateApproved: "2025-12-15",
        datePaid: "2025-12-20",
        status: "Paid",
        issueArea: "Healthcare",
        timeline: [
          { status: "Requested", date: "2025-12-10", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2025-12-12", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2025-12-15", actor: "Eleanor Pemberton", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2025-12-20", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "2 Redman Place, Stratford, London E20 1JQ",
        charityWebsite: "mind.org.uk",
        charityType: "Registered Charity",
        approvalNotes: "Standard due diligence passed"
      },
      {
        id: "GR-2025-0385",
        charity: "The Royal Horticultural Society",
        charityNumber: "222879",
        amount: 12e3,
        dateRequested: "2025-11-22",
        dateApproved: "2025-11-27",
        datePaid: "2025-12-03",
        status: "Paid",
        issueArea: "Environment",
        timeline: [
          { status: "Requested", date: "2025-11-22", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2025-11-24", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2025-11-27", actor: "Eleanor Pemberton", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2025-12-03", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "80 Vincent Square, London SW1P 2PE",
        charityWebsite: "rhs.org.uk",
        charityType: "Charitable Trust",
        approvalNotes: "Standard due diligence passed"
      },
      {
        id: "GR-2025-0370",
        charity: "Barnardo's",
        charityNumber: "216250",
        amount: 22e3,
        dateRequested: "2025-11-08",
        dateApproved: "2025-11-13",
        datePaid: "2025-11-19",
        status: "Paid",
        issueArea: "Social Welfare",
        timeline: [
          { status: "Requested", date: "2025-11-08", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2025-11-10", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2025-11-13", actor: "Eleanor Pemberton", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2025-11-19", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "Tanners Lane, Barkingside, Ilford, Essex IG6 1QG",
        charityWebsite: "barnardos.org.uk",
        charityType: "Registered Charity",
        approvalNotes: "Standard due diligence passed"
      }
    ],
    issueAreaBreakdown: [
      { area: "Social Welfare", percentage: 38, amount: 338200 },
      { area: "Healthcare", percentage: 28, amount: 249200 },
      { area: "Environment", percentage: 20, amount: 178e3 },
      { area: "Education", percentage: 9, amount: 80100 },
      { area: "Arts & Culture", percentage: 5, amount: 44500 }
    ],
    statements: [
      { period: "Q1 2026", type: "Quarterly", date: "2026-04-01", aiGenerated: true },
      { period: "Q4 2025", type: "Quarterly", date: "2026-01-15", aiGenerated: true },
      { period: "Q3 2025", type: "Quarterly", date: "2025-10-15", aiGenerated: true },
      { period: "Q2 2025", type: "Quarterly", date: "2025-07-15", aiGenerated: true },
      { period: "Q1 2025", type: "Quarterly", date: "2025-04-15", aiGenerated: true },
      { period: "Annual Statement 2025", type: "Annual", date: "2026-02-01", aiGenerated: true },
      { period: "Annual Statement 2024", type: "Annual", date: "2025-02-01", aiGenerated: true },
      { period: "Tax Summary 2025", type: "Tax", date: "2026-02-15", aiGenerated: true }
    ],
    transactions: [
      { date: "2026-03-09", description: "Grant Payment - Oxfam GB", reference: "GR-2026-0445", debit: 3e4, credit: null, balance: 234500, category: "Grant Disbursement" },
      { date: "2026-03-01", description: "Management Fee - Q1 2026", reference: "FEE-2026-Q1G", debit: 1112.5, credit: null, balance: 264500, category: "Fees & Charges" },
      { date: "2026-02-28", description: "Grant Payment - Cancer Research UK", reference: "GR-2026-0432", debit: 45e3, credit: null, balance: 265612.5, category: "Grant Disbursement" },
      { date: "2026-02-20", description: "Investment Income - Corporate Bonds", reference: "INV-2026-0267", debit: null, credit: 4230, balance: 310612.5, category: "Investment Income" },
      { date: "2026-02-15", description: "Grant Payment - Shelter", reference: "GR-2026-0420", debit: 25e3, credit: null, balance: 306382.5, category: "Grant Disbursement" },
      { date: "2026-02-10", description: "Investment Income - UK Gilts Coupon", reference: "INV-2026-0245", debit: null, credit: 3890, balance: 331382.5, category: "Investment Income" },
      { date: "2026-02-05", description: "Donation Received - Greenfield Trustees", reference: "DON-2026-0034", debit: null, credit: 75e3, balance: 327492.5, category: "Donation" },
      { date: "2026-01-28", description: "Platform Fee - January 2026", reference: "FEE-2026-0128G", debit: 445.25, credit: null, balance: 252492.5, category: "Fees & Charges" },
      { date: "2026-01-22", description: "Investment Rebalance - Corporate Bonds", reference: "REB-2026-0008", debit: 25e3, credit: null, balance: 252937.75, category: "Investment Transfer" },
      { date: "2026-01-22", description: "Investment Rebalance - UK Equities", reference: "REB-2026-0009", debit: null, credit: 25e3, balance: 277937.75, category: "Investment Transfer" },
      { date: "2026-01-15", description: "Investment Income - International Equities Dividend", reference: "INV-2026-0156", debit: null, credit: 5670, balance: 252937.75, category: "Investment Income" },
      { date: "2025-12-20", description: "Grant Payment - Mind", reference: "GR-2025-0398", debit: 18e3, credit: null, balance: 247267.75, category: "Grant Disbursement" },
      { date: "2025-12-15", description: "Donation Received - Annual Contribution", reference: "DON-2025-0167", debit: null, credit: 5e4, balance: 265267.75, category: "Donation" },
      { date: "2025-12-03", description: "Grant Payment - Royal Horticultural Society", reference: "GR-2025-0385", debit: 12e3, credit: null, balance: 215267.75, category: "Grant Disbursement" },
      { date: "2025-11-25", description: "Management Fee - Q4 2025", reference: "FEE-2025-Q4G", debit: 1112.5, credit: null, balance: 227267.75, category: "Fees & Charges" }
    ],
    holdings: [
      { name: "CCLA COIF Charities Investment Fund", ticker: "CCIF", units: 52400, price: 2.685, value: 140694, change: 2.3, weight: 28.2 },
      { name: "Vanguard LifeStrategy 60% Equity Fund", ticker: "VLS60", units: 43600, price: 2.412, value: 105163, change: 3.1, weight: 21.1 },
      { name: "iShares UK Gilts All Stocks Index Fund", ticker: "IGLT", units: 62150, price: 1.248, value: 77563, change: -0.6, weight: 15.6 },
      { name: "Royal London Short Duration Global Index", ticker: "RLSD", units: 58200, price: 1.054, value: 61343, change: 0.4, weight: 12.3 },
      { name: "Trojan Income Fund", ticker: "TROYI", units: 28600, price: 1.876, value: 53654, change: 1.9, weight: 10.8 },
      { name: "Impax Environmental Markets", ticker: "IEM", units: 11500, price: 5.19, value: 59685, change: 6.7, weight: 12 }
    ],
    monthlyPerformance: [
      { month: "Apr 2025", fundValue: 865e3, benchmark: 865e3 },
      { month: "May 2025", fundValue: 867400, benchmark: 866800 },
      { month: "Jun 2025", fundValue: 870200, benchmark: 869100 },
      { month: "Jul 2025", fundValue: 873800, benchmark: 871500 },
      { month: "Aug 2025", fundValue: 872100, benchmark: 870800 },
      { month: "Sep 2025", fundValue: 874500, benchmark: 872200 },
      { month: "Oct 2025", fundValue: 877900, benchmark: 874e3 },
      { month: "Nov 2025", fundValue: 880600, benchmark: 875300 },
      { month: "Dec 2025", fundValue: 883200, benchmark: 876100 },
      { month: "Jan 2026", fundValue: 885800, benchmark: 876800 },
      { month: "Feb 2026", fundValue: 887900, benchmark: 877500 },
      { month: "Mar 2026", fundValue: 89e4, benchmark: 878e3 }
    ],
    recentActivity: [
      { type: "disbursement", title: "Grant Paid", description: "Oxfam GB - £30,000 processed via BACS", timestamp: "2026-03-09", aiGenerated: false },
      { type: "compliance", title: "Charity Commission Check", description: "The Woodland Trust (294344) verification initiated for pending grant GR-2026-0458", timestamp: "2026-03-10", aiGenerated: true },
      { type: "income", title: "Corporate Bonds Coupon", description: "Corporate Bonds semi-annual coupon - £4,230 credited", timestamp: "2026-02-20", aiGenerated: false },
      { type: "rebalance", title: "Portfolio Rebalanced", description: "UK Equities allocation increased by £25,000, funded from Corporate Bonds", timestamp: "2026-01-22", aiGenerated: true },
      { type: "statement", title: "Q4 2025 Statement Ready", description: "Quarterly statement for Oct-Dec 2025 generated and available for download.", timestamp: "2026-01-15", aiGenerated: true },
      { type: "disbursement", title: "Grant Paid", description: "Cancer Research UK - £45,000 processed via BACS", timestamp: "2026-02-28", aiGenerated: false },
      { type: "income", title: "Donation Received", description: "Greenfield Trustees annual contribution - £75,000 credited to cash account", timestamp: "2026-02-05", aiGenerated: false },
      { type: "compliance", title: "Offshore Holdings Review", description: "Annual offshore fixed income compliance review completed. All holdings verified.", timestamp: "2026-01-31", aiGenerated: true },
      { type: "statement", title: "Annual Statement 2025 Ready", description: "Full annual statement for 2025 generated. Total grants disbursed: £187,000.", timestamp: "2026-02-01", aiGenerated: true },
      { type: "disbursement", title: "Grant Paid", description: "Shelter - £25,000 processed via BACS", timestamp: "2026-02-15", aiGenerated: false }
    ]
  },
  whitmore: {
    id: "whitmore",
    name: "Dr. Jane Whitmore",
    accountNumber: "PTGF-2022-0193",
    relationshipManager: "Victoria Ashworth",
    accountType: "DAF",
    status: "Active",
    onboardedDate: "2022-09-12",
    balances: {
      cash: 1245800,
      investments: 2854200,
      total: 41e5
    },
    ytdReturn: 4.1,
    assetDistribution: [
      { name: "Global Equities", value: 30, color: "#1e3a5f" },
      { name: "UK Equities", value: 20, color: "#3b6da1" },
      { name: "ESG Impact Fund", value: 20, color: "#6ba368" },
      { name: "Emerging Market Bonds", value: 10, color: "#c5a55a" },
      { name: "Private Equity", value: 10, color: "#8b5cf6" },
      { name: "Cash", value: 10, color: "#94a3b8" }
    ],
    grants: [
      {
        id: "GR-2026-0601",
        charity: "Wellcome Trust",
        charityNumber: "210183",
        amount: 25e4,
        dateRequested: "2026-03-02",
        dateApproved: "2026-03-06",
        datePaid: "2026-03-10",
        status: "Paid",
        issueArea: "Healthcare",
        timeline: [
          { status: "Requested", date: "2026-03-02", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2026-03-04", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2026-03-06", actor: "Victoria Ashworth", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2026-03-10", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "215 Euston Road, London NW1 2BE",
        charityWebsite: "wellcome.org",
        charityType: "Charitable Trust",
        approvalNotes: "Enhanced review completed for grants over £100,000"
      },
      {
        id: "GR-2026-0612",
        charity: "Imperial College London",
        charityNumber: "1147157",
        amount: 18e4,
        dateRequested: "2026-03-06",
        dateApproved: "2026-03-09",
        datePaid: null,
        status: "Approved",
        issueArea: "Education",
        timeline: [
          { status: "Requested", date: "2026-03-06", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2026-03-08", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2026-03-09", actor: "Victoria Ashworth", note: "Grant approved following compliance review" }
        ],
        verifiedViaCC: true,
        charityAddress: "South Kensington Campus, London SW7 2AZ",
        charityWebsite: "imperial.ac.uk",
        charityType: "Registered Charity",
        approvalNotes: "Enhanced review completed for grants over £100,000"
      },
      {
        id: "GR-2026-0618",
        charity: "Royal Academy of Engineering",
        charityNumber: "293074",
        amount: 1e5,
        dateRequested: "2026-03-08",
        dateApproved: null,
        datePaid: null,
        status: "In Review",
        issueArea: "Education",
        delayReason: "Pending compliance review for grant amount",
        timeline: [
          { status: "Requested", date: "2026-03-08", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2026-03-10", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" }
        ],
        verifiedViaCC: true,
        charityAddress: "3 Carlton House Terrace, London SW1Y 5DG",
        charityWebsite: "raeng.org.uk",
        charityType: "Registered Charity",
        approvalNotes: "Pending compliance review for grant amount exceeding £50,000 threshold"
      },
      {
        id: "GR-2026-0620",
        charity: "Médecins Sans Frontières UK",
        charityNumber: "1026588",
        amount: 75e3,
        dateRequested: "2026-03-09",
        dateApproved: null,
        datePaid: null,
        status: "Requested",
        issueArea: "Healthcare",
        timeline: [
          { status: "Requested", date: "2026-03-09", actor: "Client Portal", note: "Grant recommendation submitted via portal" }
        ],
        verifiedViaCC: true,
        charityAddress: "Chancery Exchange, 10 Furnival Street, London EC4A 1AB",
        charityWebsite: "msf.org.uk",
        charityType: "Registered Charity",
        approvalNotes: "Pending initial review"
      },
      {
        id: "GR-2026-0588",
        charity: "The Royal Society",
        charityNumber: "207043",
        amount: 2e5,
        dateRequested: "2026-02-20",
        dateApproved: "2026-02-25",
        datePaid: "2026-03-01",
        status: "Paid",
        issueArea: "Education",
        timeline: [
          { status: "Requested", date: "2026-02-20", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2026-02-22", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2026-02-25", actor: "Victoria Ashworth", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2026-03-01", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "6-9 Carlton House Terrace, London SW1Y 5AG",
        charityWebsite: "royalsociety.org",
        charityType: "Registered Charity",
        approvalNotes: "Enhanced review completed for grants over £100,000"
      },
      {
        id: "GR-2026-0575",
        charity: "British Heart Foundation",
        charityNumber: "225971",
        amount: 15e4,
        dateRequested: "2026-02-08",
        dateApproved: "2026-02-13",
        datePaid: "2026-02-18",
        status: "Paid",
        issueArea: "Healthcare",
        timeline: [
          { status: "Requested", date: "2026-02-08", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2026-02-10", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2026-02-13", actor: "Victoria Ashworth", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2026-02-18", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "Greater London House, 180 Hampstead Road, London NW1 7AW",
        charityWebsite: "bhf.org.uk",
        charityType: "Registered Charity",
        approvalNotes: "Enhanced review completed for grants over £100,000"
      },
      {
        id: "GR-2026-0560",
        charity: "Cambridge University Endowment Fund",
        charityNumber: "1137428",
        amount: 3e5,
        dateRequested: "2026-01-25",
        dateApproved: "2026-01-30",
        datePaid: "2026-02-05",
        status: "Paid",
        issueArea: "Education",
        timeline: [
          { status: "Requested", date: "2026-01-25", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2026-01-27", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2026-01-30", actor: "Victoria Ashworth", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2026-02-05", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "The Old Schools, Trinity Lane, Cambridge CB2 1TN",
        charityWebsite: "philanthropy.cam.ac.uk",
        charityType: "Registered Charity",
        approvalNotes: "Enhanced review completed for grants over £100,000"
      },
      {
        id: "GR-2025-0542",
        charity: "The Francis Crick Institute",
        charityNumber: "1140062",
        amount: 175e3,
        dateRequested: "2025-12-15",
        dateApproved: "2025-12-20",
        datePaid: "2025-12-28",
        status: "Paid",
        issueArea: "Healthcare",
        timeline: [
          { status: "Requested", date: "2025-12-15", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2025-12-17", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2025-12-20", actor: "Victoria Ashworth", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2025-12-28", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "1 Midland Road, London NW1 1AT",
        charityWebsite: "crick.ac.uk",
        charityType: "Registered Charity",
        approvalNotes: "Enhanced review completed for grants over £100,000"
      },
      {
        id: "GR-2025-0530",
        charity: "Southbank Centre",
        charityNumber: "298909",
        amount: 8e4,
        dateRequested: "2025-12-01",
        dateApproved: "2025-12-05",
        datePaid: "2025-12-12",
        status: "Paid",
        issueArea: "Arts & Culture",
        timeline: [
          { status: "Requested", date: "2025-12-01", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2025-12-03", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2025-12-05", actor: "Victoria Ashworth", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2025-12-12", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "Belvedere Road, London SE1 8XX",
        charityWebsite: "southbankcentre.co.uk",
        charityType: "Registered Charity",
        approvalNotes: "Expedited approval - existing relationship"
      },
      {
        id: "GR-2025-0518",
        charity: "Greenpeace UK",
        charityNumber: "284934",
        amount: 6e4,
        dateRequested: "2025-11-18",
        dateApproved: "2025-11-22",
        datePaid: "2025-11-29",
        status: "Paid",
        issueArea: "Environment",
        timeline: [
          { status: "Requested", date: "2025-11-18", actor: "Client Portal", note: "Grant recommendation submitted via portal" },
          { status: "In Review", date: "2025-11-20", actor: "Compliance Team", note: "Due diligence and Charity Commission verification initiated" },
          { status: "Approved", date: "2025-11-22", actor: "Victoria Ashworth", note: "Grant approved following compliance review" },
          { status: "Paid", date: "2025-11-29", actor: "Treasury", note: "Payment processed via BACS to charity bank account" }
        ],
        verifiedViaCC: true,
        charityAddress: "Canonbury Villas, London N1 2PN",
        charityWebsite: "greenpeace.org.uk",
        charityType: "CIO",
        approvalNotes: "Standard due diligence passed"
      }
    ],
    issueAreaBreakdown: [
      { area: "Healthcare", percentage: 35, amount: 1435e3 },
      { area: "Education", percentage: 30, amount: 123e4 },
      { area: "Environment", percentage: 15, amount: 615e3 },
      { area: "Arts & Culture", percentage: 12, amount: 492e3 },
      { area: "Social Welfare", percentage: 8, amount: 328e3 }
    ],
    statements: [
      { period: "Q1 2026", type: "Quarterly", date: "2026-04-01", aiGenerated: true },
      { period: "Q4 2025", type: "Quarterly", date: "2026-01-15", aiGenerated: true },
      { period: "Q3 2025", type: "Quarterly", date: "2025-10-15", aiGenerated: true },
      { period: "Q2 2025", type: "Quarterly", date: "2025-07-15", aiGenerated: true },
      { period: "Q1 2025", type: "Quarterly", date: "2025-04-15", aiGenerated: true },
      { period: "Annual Statement 2025", type: "Annual", date: "2026-02-01", aiGenerated: true },
      { period: "Annual Statement 2024", type: "Annual", date: "2025-02-01", aiGenerated: true },
      { period: "Tax Summary 2025", type: "Tax", date: "2026-02-15", aiGenerated: true }
    ],
    transactions: [
      { date: "2026-03-10", description: "Grant Payment - Wellcome Trust", reference: "GR-2026-0601", debit: 25e4, credit: null, balance: 1245800, category: "Grant Disbursement" },
      { date: "2026-03-05", description: "Investment Income - Global Equities Dividend", reference: "INV-2026-0412", debit: null, credit: 34500, balance: 1495800, category: "Investment Income" },
      { date: "2026-03-01", description: "Grant Payment - The Royal Society", reference: "GR-2026-0588", debit: 2e5, credit: null, balance: 1461300, category: "Grant Disbursement" },
      { date: "2026-02-25", description: "Donation Received - Whitmore Family Office", reference: "DON-2026-0078", debit: null, credit: 5e5, balance: 1661300, category: "Donation" },
      { date: "2026-02-18", description: "Grant Payment - British Heart Foundation", reference: "GR-2026-0575", debit: 15e4, credit: null, balance: 1161300, category: "Grant Disbursement" },
      { date: "2026-02-10", description: "Investment Income - ESG Impact Fund", reference: "INV-2026-0356", debit: null, credit: 18900, balance: 1311300, category: "Investment Income" },
      { date: "2026-02-05", description: "Grant Payment - Cambridge University", reference: "GR-2026-0560", debit: 3e5, credit: null, balance: 1292400, category: "Grant Disbursement" },
      { date: "2026-01-28", description: "Investment Income - Private Equity Distribution", reference: "INV-2026-0198", debit: null, credit: 42800, balance: 1592400, category: "Investment Income" },
      { date: "2026-01-20", description: "Management Fee - Q1 2026", reference: "FEE-2026-Q1C", debit: 5125, credit: null, balance: 1549600, category: "Fees & Charges" },
      { date: "2026-01-15", description: "Investment Income - Emerging Market Bonds", reference: "INV-2026-0145", debit: null, credit: 15600, balance: 1554725, category: "Investment Income" },
      { date: "2025-12-28", description: "Grant Payment - The Francis Crick Institute", reference: "GR-2025-0542", debit: 175e3, credit: null, balance: 1539125, category: "Grant Disbursement" },
      { date: "2025-12-20", description: "Donation Received - Whitmore Family Year-End", reference: "DON-2025-0212", debit: null, credit: 75e4, balance: 1714125, category: "Donation" },
      { date: "2025-12-12", description: "Grant Payment - Southbank Centre", reference: "GR-2025-0530", debit: 8e4, credit: null, balance: 964125, category: "Grant Disbursement" },
      { date: "2025-12-05", description: "Investment Rebalance - Global to ESG", reference: "REB-2025-0089", debit: 1e5, credit: null, balance: 1044125, category: "Investment Transfer" },
      { date: "2025-12-05", description: "Investment Rebalance - ESG Impact Fund", reference: "REB-2025-0090", debit: null, credit: 1e5, balance: 1144125, category: "Investment Transfer" }
    ],
    holdings: [
      { name: "Fundsmith Equity Fund", ticker: "FNSM", units: 118500, price: 5.642, value: 668577, change: 7.2, weight: 23.4 },
      { name: "Vanguard FTSE All-World UCITS ETF", ticker: "VWRL", units: 4620, price: 109.82, value: 507368, change: 5.4, weight: 17.8 },
      { name: "Baillie Gifford Positive Change Fund", ticker: "BGPC", units: 145200, price: 2.538, value: 368519, change: 4.1, weight: 12.9 },
      { name: "iShares Core MSCI World UCITS ETF", ticker: "SWDA", units: 4180, price: 82.45, value: 344641, change: 4.8, weight: 12.1 },
      { name: "Rathbone Ethical Bond Fund", ticker: "RATEB", units: 248600, price: 1.2185, value: 302920, change: 0.8, weight: 10.6 },
      { name: "CCLA COIF Charities Ethical Investment Fund", ticker: "CCEIF", units: 86500, price: 3.124, value: 270226, change: 3.5, weight: 9.5 },
      { name: "Troy Trojan Fund", ticker: "TROYF", units: 78400, price: 2.578, value: 202115, change: 2.1, weight: 7.1 },
      { name: "M&G Optimal Income Fund", ticker: "MGOI", units: 131280, price: 1.443, value: 189437, change: 1.6, weight: 6.6 }
    ],
    monthlyPerformance: [
      { month: "Apr 2025", fundValue: 3938e3, benchmark: 3938e3 },
      { month: "May 2025", fundValue: 3962400, benchmark: 3955200 },
      { month: "Jun 2025", fundValue: 3988100, benchmark: 3972800 },
      { month: "Jul 2025", fundValue: 4018500, benchmark: 3995600 },
      { month: "Aug 2025", fundValue: 3998200, benchmark: 3982400 },
      { month: "Sep 2025", fundValue: 4012800, benchmark: 3990100 },
      { month: "Oct 2025", fundValue: 4041600, benchmark: 4008900 },
      { month: "Nov 2025", fundValue: 4058300, benchmark: 4020500 },
      { month: "Dec 2025", fundValue: 4072100, benchmark: 4031200 },
      { month: "Jan 2026", fundValue: 4085400, benchmark: 4039800 },
      { month: "Feb 2026", fundValue: 4092700, benchmark: 4045600 },
      { month: "Mar 2026", fundValue: 41e5, benchmark: 405e4 }
    ],
    recentActivity: [
      { type: "disbursement", title: "Grant Paid", description: "Wellcome Trust - £250,000 processed via BACS", timestamp: "2026-03-10", aiGenerated: false },
      { type: "income", title: "Dividend Received", description: "Global Equities quarterly dividend - £34,500 credited", timestamp: "2026-03-05", aiGenerated: false },
      { type: "compliance", title: "Charity Commission Check", description: "Royal Academy of Engineering (293074) verification initiated for pending grant GR-2026-0618", timestamp: "2026-03-10", aiGenerated: true },
      { type: "disbursement", title: "Grant Paid", description: "The Royal Society - £200,000 processed via BACS", timestamp: "2026-03-01", aiGenerated: false },
      { type: "income", title: "Donation Received", description: "Whitmore Family Office contribution - £500,000 credited to cash account", timestamp: "2026-02-25", aiGenerated: false },
      { type: "rebalance", title: "Portfolio Rebalanced", description: "ESG Impact Fund allocation increased from 15% to 20%, funded from Global Equities", timestamp: "2025-12-05", aiGenerated: true },
      { type: "statement", title: "Annual Statement 2025 Ready", description: "Full annual statement for 2025 generated. Total grants disbursed: £1,570,000.", timestamp: "2026-02-01", aiGenerated: true },
      { type: "compliance", title: "Enhanced Due Diligence Complete", description: "Quarterly enhanced due diligence review completed for high-value DAF. All controls satisfactory.", timestamp: "2026-01-31", aiGenerated: true },
      { type: "income", title: "Private Equity Distribution", description: "Private Equity fund Q4 distribution - £42,800 credited", timestamp: "2026-01-28", aiGenerated: false },
      { type: "statement", title: "Tax Summary 2025 Ready", description: "Annual tax summary for 2025 generated. Gift Aid reclaims totalling £125,600 identified.", timestamp: "2026-02-15", aiGenerated: true }
    ]
  }
};
function getClient(id) {
  return clients[id];
}
function getAllClients() {
  return Object.values(clients);
}
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function seedHash(s) {
  return s.split("").reduce((h, c) => (h << 5) - h + c.charCodeAt(0) | 0, 0);
}
function seededRandom(seed) {
  let state = Math.abs(seed) || 1;
  return () => {
    state = (state * 16807 + 0) % 2147483647;
    return (state - 1) / 2147483646;
  };
}
function synthesizeAssetDistribution(investmentBalance) {
  const hash = seedHash(String(investmentBalance));
  const rng = seededRandom(hash);
  const vary = (base) => base + (rng() - 0.5) * 6;
  const raw = [vary(45), vary(25), vary(20), vary(10)];
  const sum = raw.reduce((a, b) => a + b, 0);
  const pcts = raw.map((v) => Math.round(v / sum * 100));
  const diff = 100 - pcts.reduce((a, b) => a + b, 0);
  pcts[0] += diff;
  return [
    { name: "UK Equities", value: pcts[0], color: "#1e3a5f" },
    { name: "Global Bonds", value: pcts[1], color: "#2563eb" },
    { name: "ESG Impact", value: pcts[2], color: "#059669" },
    { name: "Cash & Equivalents", value: pcts[3], color: "#d4a574" }
  ];
}
const FUND_CATALOG = [
  { name: "Vanguard FTSE UK All Share Index", ticker: "VUKE" },
  { name: "iShares Core UK Gilts", ticker: "IGLT" },
  { name: "Impax Environmental Markets", ticker: "IEM" },
  { name: "Fundsmith Equity Fund", ticker: "FDSM" },
  { name: "Royal London Short Duration Gilt", ticker: "RLSG" },
  { name: "Trojan Ethical Fund", ticker: "TRJE" },
  { name: "Liontrust Sustainable Future", ticker: "LISF" },
  { name: "HSBC FTSE 250 Index", ticker: "HMCX" }
];
function synthesizeHoldings(investmentBalance, seed) {
  const rng = seededRandom(seedHash(seed));
  const count = 6 + Math.floor(rng() * 3);
  const funds = FUND_CATALOG.slice(0, count);
  const rawWeights = funds.map(() => 5 + rng() * 30);
  const totalWeight = rawWeights.reduce((a, b) => a + b, 0);
  const weights = rawWeights.map((w) => w / totalWeight);
  return funds.map((fund, i) => {
    const value = Math.round(investmentBalance * weights[i]);
    const price = 50 + Math.round(rng() * 200 * 100) / 100;
    const units = Math.round(value / price * 100) / 100;
    const change = Math.round((rng() * 6 - 2) * 100) / 100;
    const weight = Math.round(weights[i] * 1e4) / 100;
    return { name: fund.name, ticker: fund.ticker, units, price, value, change, weight };
  });
}
function synthesizeMonthlyPerformance(totalValue, ytdReturn) {
  const months = [
    "Apr 2025",
    "May 2025",
    "Jun 2025",
    "Jul 2025",
    "Aug 2025",
    "Sep 2025",
    "Oct 2025",
    "Nov 2025",
    "Dec 2025",
    "Jan 2026",
    "Feb 2026",
    "Mar 2026"
  ];
  const rng = seededRandom(seedHash(String(totalValue)));
  const monthlyGrowth = ytdReturn / 100 / 12;
  const entries = [];
  let fundValue = totalValue;
  const values = [fundValue];
  for (let i = 0; i < 11; i++) {
    const variation = (rng() - 0.45) * 0.01;
    fundValue = fundValue / (1 + monthlyGrowth + variation);
    values.unshift(Math.round(fundValue));
  }
  for (let i = 0; i < months.length; i++) {
    const benchDelta = 0.97 + rng() * 0.04;
    entries.push({
      month: months[i],
      fundValue: values[i],
      benchmark: Math.round(values[i] * benchDelta)
    });
  }
  return entries;
}
function synthesizeStatements(onboardedDate) {
  const statements = [];
  const start = new Date(onboardedDate);
  const now = /* @__PURE__ */ new Date("2026-03-11");
  const qMonths = [3, 6, 9, 12];
  const year0 = start.getFullYear();
  for (let year = year0; year <= 2026; year++) {
    for (const endMonth of qMonths) {
      const qEnd = new Date(year, endMonth, 0);
      if (qEnd <= start || qEnd > now) continue;
      const q = Math.ceil(endMonth / 3);
      statements.push({
        period: `Q${q} ${year}`,
        type: "Quarterly",
        date: qEnd.toISOString().slice(0, 10),
        aiGenerated: true
      });
    }
  }
  for (let year = year0; year <= 2026; year++) {
    const annualDate = new Date(year, 3, 5);
    if (annualDate <= start || annualDate > now) continue;
    statements.push({
      period: `${year - 1}/${year}`,
      type: "Annual",
      date: annualDate.toISOString().slice(0, 10),
      aiGenerated: true
    });
  }
  for (let year = year0 + 1; year <= 2026; year++) {
    const taxDate = new Date(year, 3, 30);
    if (taxDate <= start || taxDate > now) continue;
    statements.push({
      period: `Tax ${year - 1}/${year}`,
      type: "Tax",
      date: taxDate.toISOString().slice(0, 10),
      aiGenerated: true
    });
  }
  statements.sort((a, b) => b.date.localeCompare(a.date));
  return statements;
}
function synthesizeTransactions(grants, balances) {
  const txns = [];
  const rng = seededRandom(seedHash(String(balances.total)));
  for (const g of grants.filter((gr) => gr.status === "Paid")) {
    txns.push({
      date: g.datePaid || g.dateRequested,
      description: `Grant Disbursement - ${g.charity}`,
      reference: `GD-${g.id.replace(/[^0-9]/g, "").slice(0, 6) || String(seedHash(g.id)).slice(1, 7)}`,
      debit: g.amount,
      credit: null,
      balance: 0,
      // calculated below
      category: "Grant"
    });
  }
  const incomeMonths = [
    "2025-10-15",
    "2025-11-15",
    "2025-12-15",
    "2026-01-15",
    "2026-02-15",
    "2026-03-01"
  ];
  for (const d of incomeMonths) {
    const amt = Math.round(balances.investments * (4e-3 + rng() * 2e-3));
    txns.push({
      date: d,
      description: "Investment Income",
      reference: `II-${d.replace(/-/g, "")}`,
      debit: null,
      credit: amt,
      balance: 0,
      category: "Income"
    });
  }
  for (const feeDate of ["2025-09-30", "2025-12-31", "2026-03-31"]) {
    if (feeDate > "2026-03-11") continue;
    const fee = Math.round(balances.total * 125e-5);
    txns.push({
      date: feeDate,
      description: "Quarterly Management Fee",
      reference: `MF-${feeDate.replace(/-/g, "")}`,
      debit: fee,
      credit: null,
      balance: 0,
      category: "Fee"
    });
  }
  txns.sort((a, b) => b.date.localeCompare(a.date));
  let runBal = balances.cash;
  for (const t of txns) {
    t.balance = runBal;
    if (t.debit) runBal += t.debit;
    if (t.credit) runBal -= t.credit;
  }
  return txns;
}
function synthesizeRecentActivity(grants) {
  const entries = [];
  const sorted = [...grants].sort((a, b) => b.dateRequested.localeCompare(a.dateRequested));
  for (const g of sorted.slice(0, 3)) {
    if (g.status === "Paid") {
      entries.push({
        type: "disbursement",
        title: `Grant paid to ${g.charity}`,
        description: `${g.amount.toLocaleString("en-GB")} disbursed for ${g.issueArea}`,
        timestamp: g.datePaid || g.dateRequested,
        aiGenerated: true
      });
    } else {
      entries.push({
        type: "disbursement",
        title: `Grant ${g.status.toLowerCase()} - ${g.charity}`,
        description: `${g.amount.toLocaleString("en-GB")} ${g.issueArea} grant in ${g.status.toLowerCase()} stage`,
        timestamp: g.dateRequested,
        aiGenerated: true
      });
    }
  }
  entries.push({
    type: "income",
    title: "Quarterly dividend income credited",
    description: "Investment income from UK equities and bond portfolio",
    timestamp: "2026-03-01",
    aiGenerated: true
  });
  entries.push({
    type: "compliance",
    title: "Annual compliance review completed",
    description: "KYC/AML checks refreshed, all documentation current",
    timestamp: "2026-02-15",
    aiGenerated: true
  });
  entries.push({
    type: "rebalance",
    title: "Portfolio rebalanced to target allocation",
    description: "Quarterly rebalance executed within mandate tolerances",
    timestamp: "2026-01-15",
    aiGenerated: true
  });
  entries.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  return entries.slice(0, 6);
}
function computeIssueAreaBreakdown(grants) {
  const map = /* @__PURE__ */ new Map();
  let total = 0;
  for (const g of grants) {
    const area = g.issueArea || "Other";
    map.set(area, (map.get(area) || 0) + g.amount);
    total += g.amount;
  }
  if (total === 0) return [];
  const breakdown = [];
  for (const [area, amount] of map.entries()) {
    breakdown.push({
      area,
      amount,
      percentage: Math.round(amount / total * 1e4) / 100
    });
  }
  breakdown.sort((a, b) => b.amount - a.amount);
  return breakdown;
}

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function extractClientHint(grantName) {
  const parts = grantName.split(/\s*[—–\-]\s*/);
  return (parts.length > 1 ? parts[parts.length - 1] : "").toLowerCase().trim();
}
function grantMatchesAccount(grant, account) {
  if (grant.clientAccount) {
    const accountNames = grant.clientAccount.split(",").map((s) => s.trim().toLowerCase());
    return accountNames.includes(account.name.toLowerCase());
  }
  const hint = extractClientHint(grant.grantName);
  if (!hint) return false;
  const acctLower = account.name.toLowerCase();
  return acctLower.includes(hint) || hint.includes(acctLower.replace(/^the\s+/, ""));
}
const STAGE_TO_STATUS = {
  Paid: "Paid",
  Approved: "Approved",
  "In Review": "In Review",
  Requested: "Requested"
};
function mapStageToStatus(stage) {
  return STAGE_TO_STATUS[stage] ?? "In Review";
}
const STAGE_ORDER = ["Requested", "In Review", "Approved", "Paid"];
function synthesizeTimeline(stage, dateRequested) {
  const status = mapStageToStatus(stage);
  const idx = STAGE_ORDER.indexOf(status);
  const stepCount = idx >= 0 ? idx + 1 : 1;
  const steps = [];
  if (stepCount >= 1) {
    steps.push({
      status: "Requested",
      date: dateRequested,
      actor: "Client Portal",
      note: "Grant recommendation submitted via portal"
    });
  }
  if (stepCount >= 2) {
    steps.push({
      status: "In Review",
      date: dateRequested,
      actor: "Compliance Team",
      note: "Due diligence and Charity Commission verification initiated"
    });
  }
  if (stepCount >= 3) {
    steps.push({
      status: "Approved",
      date: dateRequested,
      actor: "Relationship Manager",
      note: "Grant approved following compliance review"
    });
  }
  if (stepCount >= 4) {
    steps.push({
      status: "Paid",
      date: dateRequested,
      actor: "Treasury",
      note: "Payment processed via BACS to charity bank account"
    });
  }
  return steps;
}
function mapAdminGrantToDonorGrant(grant) {
  const status = mapStageToStatus(grant.stage);
  const statusIdx = STAGE_ORDER.indexOf(status);
  return {
    id: grant.id,
    charity: grant.charity,
    charityNumber: grant.charityNumber,
    amount: grant.amount,
    dateRequested: grant.dateRequested,
    dateApproved: statusIdx >= 2 ? grant.dateRequested : null,
    datePaid: status === "Paid" ? grant.dateRequested : null,
    status,
    issueArea: grant.issueArea,
    timeline: synthesizeTimeline(grant.stage, grant.dateRequested),
    verifiedViaCC: true,
    charityAddress: "",
    charityWebsite: "",
    charityType: "",
    approvalNotes: ""
  };
}
function buildClientData(account, grants) {
  const balances = {
    cash: account.cashBalance,
    investments: account.investmentBalance,
    offshore: account.offshoreBalance || void 0,
    total: account.totalValue
  };
  return {
    id: slugify(account.name),
    name: account.name,
    accountNumber: account.accountNumber,
    relationshipManager: account.relationshipManager,
    accountType: account.accountType,
    status: account.status === "Closed" ? "Suspended" : account.status,
    onboardedDate: account.onboardedDate,
    balances,
    ytdReturn: account.ytdReturn,
    assetDistribution: synthesizeAssetDistribution(account.investmentBalance),
    grants,
    issueAreaBreakdown: computeIssueAreaBreakdown(grants),
    statements: synthesizeStatements(account.onboardedDate),
    transactions: synthesizeTransactions(grants, balances),
    holdings: synthesizeHoldings(account.investmentBalance, account.name),
    monthlyPerformance: synthesizeMonthlyPerformance(account.totalValue, account.ytdReturn),
    recentActivity: synthesizeRecentActivity(grants)
  };
}
async function loadDonorClient(clientSlug) {
  try {
    const data = await loadAdminData();
    const account = data.clientAccounts.find(
      (a) => slugify(a.name) === clientSlug
    );
    if (account) {
      const accountGrants = data.grants.filter((g) => grantMatchesAccount(g, account)).map(mapAdminGrantToDonorGrant);
      return buildClientData(account, accountGrants);
    }
  } catch (err) {
    console.warn("[donor-data-loader] Notion lookup failed, trying mock data", err);
  }
  return getClient(clientSlug) ?? null;
}
async function loadAllDonorClients() {
  try {
    const data = await loadAdminData();
    if (data.clientAccounts.length > 0) {
      const clients = [];
      for (const account of data.clientAccounts) {
        try {
          const nameLower = account.name.toLowerCase();
          const accountGrants = data.grants.filter((g) => {
            if (g.clientAccount) {
              const names = g.clientAccount.split(",").map((s) => s.trim().toLowerCase());
              return names.includes(nameLower) || names.some((n) => n.includes(nameLower.replace(/\s+(fund|trust|foundation)$/i, "")));
            }
            return g.grantName.toLowerCase().includes(nameLower) || g.grantName.toLowerCase().includes(nameLower.replace(/\s+(fund|trust|foundation)$/i, ""));
          }).map(mapAdminGrantToDonorGrant);
          clients.push(buildClientData(account, accountGrants));
        } catch (err) {
          console.warn(`[donor-data-loader] Failed to build client ${account.name}:`, err);
        }
      }
      console.log(`[donor-data-loader] Built ${clients.length} donor clients, total grants: ${clients.reduce((s, c) => s + c.grants.length, 0)}`);
      return clients;
    }
  } catch (err) {
    console.warn("[donor-data-loader] Notion lookup failed, using mock data", err);
  }
  return getAllClients();
}

export { $$DashboardLayout as $, loadAllDonorClients as a, formatCurrency as f, loadDonorClient as l };
