!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=2)}([function(e,n,t){"use strict";t.d(n,"e",(function(){return r})),t.d(n,"b",(function(){return o})),t.d(n,"c",(function(){return a})),t.d(n,"a",(function(){return i})),t.d(n,"d",(function(){return u}));const r="server:ready",o="worker:new",a="worker:postMessage",i="worker:addEventListener",u="server:message"},function(e,n,t){"use strict";e.exports.sendMessage=function(e){"undefined"!=typeof LCC&&void 0!==LCC.onlineSupport&&LCC.onlineSupport.sendMessage("containerUserMessage",{payload:e})},e.exports.addErrorHandler=function(e){"undefined"!=typeof LCC&&void 0!==LCC.onlineSupport&&LCC.onlineSupport.addErrorHandler(e)},e.exports.removeErrorHandler=function(e){"undefined"!=typeof LCC&&void 0!==LCC.onlineSupport&&LCC.onlineSupport.removeErrorHandler(e)},e.exports.addMessageHandler=function(e){"undefined"!=typeof LCC&&void 0!==LCC.onlineSupport&&LCC.onlineSupport.addMessageHandler(e)},e.exports.removeMessageHandler=function(e){"undefined"!=typeof LCC&&void 0!==LCC.onlineSupport&&LCC.onlineSupport.removeMessageHandler(e)},e.exports.getRESTAPISessionKey=function(){return"undefined"!=typeof LCC&&void 0!==LCC.onlineSupport?LCC.onlineSupport.getRESTAPISessionKey():""},e.exports.callApex=function(e,n,t,r){"undefined"!=typeof Visualforce&&void 0!==Visualforce.remoting&&void 0!==Visualforce.remoting.Manager&&Visualforce.remoting.Manager.invokeAction(e,n,t,r)}},function(e,n,t){"use strict";t.r(n);var r=t(1),o=t.n(r),a=t(0);function i(){o.a.sendMessage({name:a.e,value:Date.now().toString()})}const u={};function s(e){switch(e.name){case a.b:{const{instanceId:n,url:t,options:r}=e.value,o=new Worker(t,r);u[n]=o;break}case a.c:{const{instanceId:n,message:t}=e.value,r=u[n];r&&r.postMessage(t);break}case a.a:{const{instanceId:n}=e.value,t=u[n];t&&t.addEventListener("message",e=>{!function(e,n){o.a.sendMessage({name:a.d,value:{instanceId:e,type:n.type,data:n.data}})}(n,e)});break}}}document.addEventListener("DOMContentLoaded",()=>{let e=setInterval(i,500);o.a.addMessageHandler(n=>{e&&(clearInterval(e),e=void 0),s(n)}),i()})}]);
//# sourceMappingURL=server.js.map