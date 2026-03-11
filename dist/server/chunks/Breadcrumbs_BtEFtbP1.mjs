import { e as createComponent, m as maybeRenderHead, r as renderTemplate, g as addAttribute, h as createAstro } from './astro/server_C-UfuYaI.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro();
const $$Breadcrumbs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Breadcrumbs;
  const { items } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav aria-label="Breadcrumb" class="mb-6"> <ol class="flex items-center gap-1.5 text-sm"> ${items.map((item, idx) => renderTemplate`<li class="flex items-center gap-1.5"> ${idx > 0 && renderTemplate`<svg class="w-3.5 h-3.5 text-slate-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg>`} ${item.href ? renderTemplate`<a${addAttribute(item.href, "href")} class="text-slate-400 hover:text-navy-600 transition-colors">${item.label}</a>` : renderTemplate`<span class="text-slate-700 font-medium">${item.label}</span>`} </li>`)} </ol> </nav>`;
}, "/Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/src/components/Breadcrumbs.astro", void 0);

export { $$Breadcrumbs as $ };
