if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const u=e=>n(e,l),c={module:{uri:l},exports:o,require:u};s[l]=Promise.all(i.map((e=>c[e]||u(e)))).then((e=>(r(...e),o)))}}define(["./workbox-faf47ec1"],(function(e){"use strict";e.setCacheNameDetails({prefix:"sketch"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"css/101.6eed2075.css",revision:null},{url:"css/586.972fa547.css",revision:null},{url:"css/app.7eb2ee11.css",revision:null},{url:"css/chunk-vendors.915d56aa.css",revision:null},{url:"favicon.png",revision:"221dade141357255b8fa5d4660898b50"},{url:"index.html",revision:"1ff2a2957e0639535352531562f81919"},{url:"js/101.d29f9b52.js",revision:null},{url:"js/29.3090399c.js",revision:null},{url:"js/586.8a724e64.js",revision:null},{url:"js/app.747a79b3.js",revision:null},{url:"js/chunk-vendors.97fdff2a.js",revision:null}],{}),e.registerRoute(/.*/,new e.CacheFirst({cacheName:"cache-all",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:2592e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
//# sourceMappingURL=service-worker.js.map
