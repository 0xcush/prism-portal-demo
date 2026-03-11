import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_C5J7YvJQ.mjs';
import { manifest } from './manifest_BPA-t625.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/account.astro.mjs');
const _page2 = () => import('./pages/admin/activities.astro.mjs');
const _page3 = () => import('./pages/admin/approvals.astro.mjs');
const _page4 = () => import('./pages/admin/clients.astro.mjs');
const _page5 = () => import('./pages/admin/contacts.astro.mjs');
const _page6 = () => import('./pages/admin/firms.astro.mjs');
const _page7 = () => import('./pages/admin/grants.astro.mjs');
const _page8 = () => import('./pages/admin/kpis.astro.mjs');
const _page9 = () => import('./pages/admin/pipeline.astro.mjs');
const _page10 = () => import('./pages/admin.astro.mjs');
const _page11 = () => import('./pages/api/admin/approvals.astro.mjs');
const _page12 = () => import('./pages/api/admin/grants.astro.mjs');
const _page13 = () => import('./pages/api/admin/prospects.astro.mjs');
const _page14 = () => import('./pages/api/admin/stats.astro.mjs');
const _page15 = () => import('./pages/api/auth/callback.astro.mjs');
const _page16 = () => import('./pages/api/auth/logout.astro.mjs');
const _page17 = () => import('./pages/auth/callback.astro.mjs');
const _page18 = () => import('./pages/dashboard.astro.mjs');
const _page19 = () => import('./pages/grantee/dashboard.astro.mjs');
const _page20 = () => import('./pages/grantee/documents.astro.mjs');
const _page21 = () => import('./pages/grantee/grants.astro.mjs');
const _page22 = () => import('./pages/grantee/payments.astro.mjs');
const _page23 = () => import('./pages/grantee/reports.astro.mjs');
const _page24 = () => import('./pages/grantee.astro.mjs');
const _page25 = () => import('./pages/grants/_id_.astro.mjs');
const _page26 = () => import('./pages/grants.astro.mjs');
const _page27 = () => import('./pages/investments.astro.mjs');
const _page28 = () => import('./pages/login.astro.mjs');
const _page29 = () => import('./pages/resources.astro.mjs');
const _page30 = () => import('./pages/statements.astro.mjs');
const _page31 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/account.astro", _page1],
    ["src/pages/admin/activities.astro", _page2],
    ["src/pages/admin/approvals.astro", _page3],
    ["src/pages/admin/clients.astro", _page4],
    ["src/pages/admin/contacts.astro", _page5],
    ["src/pages/admin/firms.astro", _page6],
    ["src/pages/admin/grants.astro", _page7],
    ["src/pages/admin/kpis.astro", _page8],
    ["src/pages/admin/pipeline.astro", _page9],
    ["src/pages/admin/index.astro", _page10],
    ["src/pages/api/admin/approvals.ts", _page11],
    ["src/pages/api/admin/grants.ts", _page12],
    ["src/pages/api/admin/prospects.ts", _page13],
    ["src/pages/api/admin/stats.ts", _page14],
    ["src/pages/api/auth/callback.ts", _page15],
    ["src/pages/api/auth/logout.ts", _page16],
    ["src/pages/auth/callback.astro", _page17],
    ["src/pages/dashboard.astro", _page18],
    ["src/pages/grantee/dashboard.astro", _page19],
    ["src/pages/grantee/documents.astro", _page20],
    ["src/pages/grantee/grants.astro", _page21],
    ["src/pages/grantee/payments.astro", _page22],
    ["src/pages/grantee/reports.astro", _page23],
    ["src/pages/grantee/index.astro", _page24],
    ["src/pages/grants/[id].astro", _page25],
    ["src/pages/grants.astro", _page26],
    ["src/pages/investments.astro", _page27],
    ["src/pages/login.astro", _page28],
    ["src/pages/resources.astro", _page29],
    ["src/pages/statements.astro", _page30],
    ["src/pages/index.astro", _page31]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/dist/client/",
    "server": "file:///Users/cush.eth/Desktop/claudeing/OdiseaClaude/ventures/companies/synaptic/clients/prism/portal/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
