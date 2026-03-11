/* empty css                                   */
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_Dh-RJMVH.mjs';
import 'piccolore';
import { l as loadDonorClient, $ as $$DashboardLayout } from '../chunks/donor-data-loader_IbvCAMWK.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Resources = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Resources;
  const clientId = Astro2.url.searchParams.get("client") || "ashford";
  const client = await loadDonorClient(clientId);
  if (!client) {
    return Astro2.redirect("/");
  }
  const events = [
    {
      title: "Prism Philanthropy Forum 2026",
      date: "24 April 2026",
      dateStart: "20260424T093000Z",
      dateEnd: "20260424T170000Z",
      location: "The Savoy, London",
      description: "Annual gathering of Prism donors exploring trends in UK and international philanthropy. Keynote by Dame Julia Cleverdon."
    },
    {
      title: "Impact Investing Masterclass",
      date: "15 May 2026",
      dateStart: "20260515T100000Z",
      dateEnd: "20260515T130000Z",
      location: "Virtual Event",
      description: "A deep-dive session on aligning your investment portfolio with your charitable objectives, led by our investment partners."
    },
    {
      title: "Summer Garden Reception",
      date: "12 June 2026",
      dateStart: "20260612T180000Z",
      dateEnd: "20260612T213000Z",
      location: "Kensington Palace Orangery, London",
      description: "An evening of networking with fellow donors and grantees. Hear first-hand impact stories from charities you have supported."
    },
    {
      title: "Grant Strategy Workshop",
      date: "10 September 2026",
      dateStart: "20260910T100000Z",
      dateEnd: "20260910T160000Z",
      location: "Prism Offices, Mayfair",
      description: "Work with your relationship manager and our research team to refine your giving strategy for the year ahead."
    }
  ];
  function buildCalendarUrl(event) {
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.title,
      dates: `${event.dateStart}/${event.dateEnd}`,
      details: event.description,
      location: event.location
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }
  const networks = [
    { name: "Philanthropy Impact", url: "#", description: "Professional body for philanthropy advisors in the UK" },
    { name: "Association of Charitable Foundations", url: "#", description: "Membership body for foundations and grant-making charities" },
    { name: "European Philanthropy Association", url: "#", description: "Cross-border philanthropy insights and peer connections" },
    { name: "Charities Aid Foundation", url: "#", description: "Research, policy, and giving tools for UK philanthropists" },
    { name: "The Giving Pledge Network", url: "#", description: "Community of philanthropists committed to giving the majority of their wealth" }
  ];
  const curatedResources = [
    { title: "UK Charitable Giving Report 2026", type: "Report", description: "Annual analysis of giving trends, tax efficiency, and sector performance." },
    { title: "Gift Aid & Tax Planning Guide", type: "Guide", description: "Maximise tax relief on your charitable contributions through Prism." },
    { title: "Environmental Giving Landscape", type: "Briefing", description: "Selected by your RM based on your fund's focus on environmental causes." },
    { title: "Due Diligence: How Prism Verifies Charities", type: "Explainer", description: "Our process for ensuring every grant reaches a verified, compliant charity." }
  ];
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": `${client.name} - Resources`, "clientId": client.id, "clientName": client.name, "activePage": "resources", "relationshipManager": client.relationshipManager }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-8"> <div class="animate-fade-up"> <h2 class="text-2xl font-semibold text-slate-800">Resources & Events</h2> <p class="text-sm text-slate-400 mt-1">Upcoming events, philanthropic networks, and curated resources from your relationship manager</p> </div> <!-- Upcoming Prism Events --> <div class="animate-fade-up-1"> <h3 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"> <svg class="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path> </svg>
Upcoming Prism Events
</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> ${events.map((event) => renderTemplate`<div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:border-gold-300 transition-colors"> <div class="flex items-start justify-between mb-2"> <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-navy-50 text-navy-600">${event.date}</span> </div> <h4 class="text-base font-semibold text-slate-800 mb-1">${event.title}</h4> <p class="text-sm text-slate-500 mb-3">${event.description}</p> <div class="flex items-center justify-between"> <div class="flex items-center gap-1.5 text-xs text-slate-400"> <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path> </svg> ${event.location} </div> <a${addAttribute(buildCalendarUrl(event), "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs font-medium text-navy-600 hover:text-navy-700 transition-colors"> <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path> </svg>
Add to Calendar
</a> </div> </div>`)} </div> </div> <!-- Philanthropic Networks --> <div class="animate-fade-up-2"> <h3 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"> <svg class="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path> </svg>
Philanthropic Networks
</h3> <div class="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100"> ${networks.map((network) => renderTemplate`<a${addAttribute(network.url, "href")} class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group first:rounded-t-xl last:rounded-b-xl"> <div> <p class="text-sm font-medium text-slate-800 group-hover:text-navy-600 transition-colors">${network.name}</p> <p class="text-xs text-slate-400 mt-0.5">${network.description}</p> </div> <svg class="w-4 h-4 text-slate-300 group-hover:text-gold-500 transition-colors flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path> </svg> </a>`)} </div> </div> <!-- Your Curated Resources --> <div class="animate-fade-up-3"> <h3 class="text-lg font-semibold text-slate-800 mb-1 flex items-center gap-2"> <svg class="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"></path> </svg>
Your Curated Resources
</h3> <p class="text-xs text-slate-400 mb-4">Selected by ${client.relationshipManager} based on your fund's interests</p> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> ${curatedResources.map((resource) => renderTemplate`<div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:border-gold-300 transition-colors cursor-pointer"> <div class="flex items-start gap-3"> <div class="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center flex-shrink-0"> <svg class="w-5 h-5 text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path> </svg> </div> <div> <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gold-50 text-gold-700 mb-1.5">${resource.type}</span> <h4 class="text-sm font-semibold text-slate-800">${resource.title}</h4> <p class="text-xs text-slate-400 mt-1">${resource.description}</p> </div> </div> </div>`)} </div> </div> </div> ` })}`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/resources.astro", void 0);
const $$file = "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/pages/resources.astro";
const $$url = "/resources";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Resources,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
