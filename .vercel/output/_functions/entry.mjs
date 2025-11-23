import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Clsxdg_c.mjs';
import { manifest } from './manifest_Fv_DPZcw.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page2 = () => import('./pages/404.astro.mjs');
const _page3 = () => import('./pages/consultation.astro.mjs');
const _page4 = () => import('./pages/guide.astro.mjs');
const _page5 = () => import('./pages/join.astro.mjs');
const _page6 = () => import('./pages/math-nigate.astro.mjs');
const _page7 = () => import('./pages/rikei.astro.mjs');
const _page8 = () => import('./pages/rss.xml.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/astro/dist/actions/runtime/route.js", _page1],
    ["src/pages/404.astro", _page2],
    ["src/pages/consultation.astro", _page3],
    ["src/pages/guide.astro", _page4],
    ["src/pages/join.astro", _page5],
    ["src/pages/math-nigate.astro", _page6],
    ["src/pages/rikei.astro", _page7],
    ["src/pages/rss.xml.ts", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_astro-internal_actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "542f1180-5e0f-4eaf-b650-fb76349c292d",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
