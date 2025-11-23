import 'kleur/colors';
import { l as decodeKey } from './chunks/astro/server_CmjTqM-c.mjs';
import 'clsx';
import 'cookie';
import './chunks/astro-designed-error-pages_fmrWb66V.mjs';
import 'es-module-lexer';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_IYQG7ssd.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///workspace/","cacheDir":"file:///workspace/node_modules/.astro/","outDir":"file:///workspace/dist/","srcDir":"file:///workspace/src/","publicDir":"file:///workspace/public/","buildClientDir":"file:///workspace/dist/client/","buildServerDir":"file:///workspace/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_actions/[...path]","pattern":"^\\/_actions(?:\\/(.*?))?$","segments":[[{"content":"_actions","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"node_modules/astro/dist/actions/runtime/route.js","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"internal","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/consultation.G0Zi7udL.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/consultation.G0Zi7udL.css"}],"routeData":{"route":"/consultation","isIndex":false,"type":"page","pattern":"^\\/consultation$","segments":[[{"content":"consultation","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/consultation.astro","pathname":"/consultation","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/consultation.G0Zi7udL.css"}],"routeData":{"route":"/guide","isIndex":false,"type":"page","pattern":"^\\/guide$","segments":[[{"content":"guide","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/guide.astro","pathname":"/guide","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/join.B5QcLFcv.css"},{"type":"external","src":"/_astro/consultation.G0Zi7udL.css"}],"routeData":{"route":"/join","isIndex":false,"type":"page","pattern":"^\\/join$","segments":[[{"content":"join","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/join.astro","pathname":"/join","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/consultation.G0Zi7udL.css"}],"routeData":{"route":"/math-nigate","isIndex":false,"type":"page","pattern":"^\\/math-nigate$","segments":[[{"content":"math-nigate","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/math-nigate.astro","pathname":"/math-nigate","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/consultation.G0Zi7udL.css"}],"routeData":{"route":"/rikei","isIndex":false,"type":"page","pattern":"^\\/rikei$","segments":[[{"content":"rikei","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rikei.astro","pathname":"/rikei","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/consultation.G0Zi7udL.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}}],"site":"https://astrowind.vercel.app","base":"/","trailingSlash":"never","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/workspace/src/utils/blog.ts",{"propagation":"in-tree","containsHead":false}],["/workspace/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/workspace/src/pages/consultation.astro",{"propagation":"none","containsHead":true}],["/workspace/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/workspace/src/pages/join.astro",{"propagation":"none","containsHead":true}],["/workspace/src/pages/math-nigate.astro",{"propagation":"none","containsHead":true}],["/workspace/src/pages/rikei.astro",{"propagation":"none","containsHead":true}],["/workspace/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/workspace/src/pages/guide.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000astro-internal:actions":"_astro-internal_actions.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:node_modules/astro/dist/actions/runtime/route@_@js":"pages/_actions/_---path_.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/consultation@_@astro":"pages/consultation.astro.mjs","\u0000@astro-page:src/pages/guide@_@astro":"pages/guide.astro.mjs","\u0000@astro-page:src/pages/join@_@astro":"pages/join.astro.mjs","\u0000@astro-page:src/pages/math-nigate@_@astro":"pages/math-nigate.astro.mjs","\u0000@astro-page:src/pages/rikei@_@astro":"pages/rikei.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Fv_DPZcw.mjs","/workspace/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DJxbBLqu.mjs","/workspace/src/assets/images/app-store.png":"chunks/app-store_DSEsdkaI.mjs","/workspace/src/assets/images/default.png":"chunks/default_DiEWxmUd.mjs","/workspace/src/assets/images/google-play.png":"chunks/google-play_BQxJEcrV.mjs","/workspace/src/assets/images/hero-image.png":"chunks/hero-image_DJIsJ4S6.mjs","/workspace/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/workspace/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_Ca_qOYiJ.mjs","~/components/ConsultationForm":"_astro/ConsultationForm.V1VX6Xhk.js","~/components/guide/GuidePage":"_astro/GuidePage.Da_m_SK2.js","~/components/react/MathNigatePage":"_astro/MathNigatePage.CwO-pvzs.js","~/components/react/ScienceMajorPage":"_astro/ScienceMajorPage.ToHbu3bR.js","~/components/react/NewHomepage":"_astro/NewHomepage.BFNuKioi.js","@astrojs/react/client.js":"_astro/client.-Rv19YPA.js","/workspace/src/pages/join.astro?astro&type=script&index=0&lang.ts":"_astro/join.astro_astro_type_script_index_0_lang.BU4CWhC1.js","/workspace/src/components/FaqChatLauncher.astro?astro&type=script&index=0&lang.ts":"_astro/FaqChatLauncher.astro_astro_type_script_index_0_lang.DwzRpnba.js","/workspace/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.DZnDNxNb.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/workspace/src/pages/join.astro?astro&type=script&index=0&lang.ts","const l=\"stsrjk_join_todo_v1\";function n(){const d=JSON.parse(localStorage.getItem(l)||\"{}\");document.querySelectorAll(\"#join-todo .checklist-item\").forEach(e=>{const t=e.dataset.item;t&&d[t]&&e.classList.add(\"checked\"),e.addEventListener(\"click\",function(){this.classList.toggle(\"checked\");const c=this.closest(\".step\");c&&(o(c),r())})});function o(e){const t=e.querySelectorAll(\".checklist-item\"),s=e.querySelectorAll(\".checklist-item.checked\").length/t.length*100,i=e.querySelector(\".progress-fill\");i&&(i.style.width=s+\"%\"),s===100?e.classList.add(\"completed\"):e.classList.remove(\"completed\")}function r(){const e={};document.querySelectorAll(\"#join-todo .checklist-item.checked\").forEach(c=>{const s=c.dataset.item;s&&(e[s]=!0)}),localStorage.setItem(l,JSON.stringify(e))}document.querySelectorAll(\"#join-todo .step\").forEach(e=>{o(e)})}document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",n):n();"],["/workspace/src/components/FaqChatLauncher.astro?astro&type=script&index=0&lang.ts","if(typeof window<\"u\"){const a=document.getElementById(\"faq-chat-toggle\"),e=document.getElementById(\"faq-chat-iframe-wrapper\");if(a&&e){let t=!1;const n=()=>{t?(e.classList.remove(\"opacity-0\",\"translate-y-2\",\"pointer-events-none\"),e.classList.add(\"opacity-100\",\"translate-y-0\",\"pointer-events-auto\"),e.removeAttribute(\"aria-hidden\")):(e.classList.add(\"opacity-0\",\"translate-y-2\",\"pointer-events-none\"),e.classList.remove(\"opacity-100\",\"translate-y-0\",\"pointer-events-auto\"),e.setAttribute(\"aria-hidden\",\"true\"))};n(),a.addEventListener(\"click\",()=>{t=!t,n()})}}"]],"assets":["/_astro/apple-touch-icon.DHIlG7dp.png","/_astro/favicon.CGiRCjPI.ico","/_astro/favicon.vp_fBu0c.svg","/_astro/inter-cyrillic-ext-wght-normal.B2xhLi22.woff2","/_astro/inter-cyrillic-wght-normal.CMZtQduZ.woff2","/_astro/inter-greek-ext-wght-normal.CGAr0uHJ.woff2","/_astro/inter-greek-wght-normal.CaVNZxsx.woff2","/_astro/inter-latin-wght-normal.Dx4kXJAl.woff2","/_astro/inter-latin-ext-wght-normal.DO1Apj_S.woff2","/_astro/inter-vietnamese-wght-normal.CBcvBZtf.woff2","/_astro/app-store.t3tG4Jz3.png","/_astro/default.CZ816Hke.png","/_astro/google-play.ISTMcpLO.png","/_astro/hero-image.DwIC_L_T.png","/_astro/consultation.G0Zi7udL.css","/_astro/join.B5QcLFcv.css","/_headers","/robots.txt","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.DZnDNxNb.js","/_astro/ConsultationForm.V1VX6Xhk.js","/_astro/GuidePage.Da_m_SK2.js","/_astro/MathNigatePage.CwO-pvzs.js","/_astro/NewHomepage.BFNuKioi.js","/_astro/ScienceMajorPage.ToHbu3bR.js","/_astro/circle-alert.B22JAFYk.js","/_astro/circle-check.CEptPmZB.js","/_astro/client.-Rv19YPA.js","/_astro/clock.C2OWfItx.js","/_astro/createLucideIcon.B4r6tY7Y.js","/_astro/heart-handshake.BdebNTtj.js","/_astro/index.Cd_vQiNd.js","/_astro/mail.BtM5S70w.js","/_astro/message-circle.DcYwo68F.js","/decapcms/config.yml","/decapcms/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"5Ann/7l5vrJnG8++bu13FLXaIDbmyAyyjxvDC3ZbA5U="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
