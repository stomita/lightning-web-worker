!function(e){var n={};function t(r){if(n[r])return n[r].exports;var s=n[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,t),s.l=!0,s.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var s in e)t.d(r,s,function(n){return e[n]}.bind(null,s));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=3)}([function(e,n,t){"use strict";t.d(n,"f",(function(){return r})),t.d(n,"b",(function(){return s})),t.d(n,"c",(function(){return i})),t.d(n,"a",(function(){return o})),t.d(n,"d",(function(){return a})),t.d(n,"g",(function(){return c})),t.d(n,"e",(function(){return u}));const r="server:ready",s="worker:new",i="worker:postMessage",o="worker:addEventListener",a="worker:removeEventListener",c="worker:terminate",u="server:message"},,,function(e,n,t){"use strict";t.r(n);var r=t(0);class s{static create(e,n){const t=new s(n,e.instanceId,e.url,e.options);for(const n of e.requestQueue){const e=n[0],r=n[1];try{t[e].apply(t,r)}catch(e){console.error(e)}}return t.addEventListener("message",n=>{e.onmessage&&e.onmessage(n)}),t}constructor(e,n,t,s){this.container=e,this.instanceId=n,this.listeners=[],this.container.message({name:r.b,value:{instanceId:n,url:t,options:s}})}postMessage(e){this.container.message({name:r.c,value:{instanceId:this.instanceId,message:e}})}addEventListener(e,n){0===this.listeners.length&&this.container.message({name:r.a,value:{instanceId:this.instanceId}}),this.listeners.push(n)}removeEventListener(e,n){this.listeners=this.listeners.filter(e=>e!==n),0===this.listeners.length&&this.container.message({name:r.d,value:{instanceId:this.instanceId}})}terminate(){this.container.message({name:r.g,value:{instanceId:this.instanceId}})}receiveEvent(e){this.listeners.forEach((function(n){n.call(null,e)}))}}window.LightningWebWorkerClient=s}]);
//# sourceMappingURL=client.js.map