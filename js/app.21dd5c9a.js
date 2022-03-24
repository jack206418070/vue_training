(function(){"use strict";var e={3628:function(e,t,n){var o=n(9242),a=n(5708),r=n(3990),i=n(579),s=n(2389),c=n(3396);const l=(0,c._)("div",{class:"loadingio-spinner-pulse-glqepjl9sp"},[(0,c._)("div",{class:"ldio-wiw3itsk6ko"},[(0,c._)("div"),(0,c._)("div"),(0,c._)("div")])],-1);function u(e,t,n,o,a,r){const i=(0,c.up)("NewsModal"),s=(0,c.up)("AlertMessages"),u=(0,c.up)("LoadingView"),d=(0,c.up)("router-view");return(0,c.wg)(),(0,c.iD)(c.HY,null,[(0,c.Wm)(i),(0,c.Wm)(s),(0,c.Wm)(u,{active:a.isLoading},{default:(0,c.w5)((()=>[l])),_:1},8,["active"]),(0,c.Wm)(d)],64)}var d=n(7139);const p={class:"alert-container",style:{"z-index":"1500"}},f={class:"alert-header d-flex align-items-center"},m=["onClick"],h={key:0,class:"alert-body"};function b(e,t,n,o,a,r){return(0,c.wg)(),(0,c.iD)("div",p,[((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)(a.messages,((e,t)=>((0,c.wg)(),(0,c.iD)("div",{key:t,class:"alert show"},[(0,c._)("div",f,[(0,c._)("span",{class:(0,d.C_)(`bg--${e.style}`)},null,2),(0,c._)("p",null,(0,d.zw)(e.title),1),(0,c._)("button",{type:"button",onClick:e=>r.clearToast(t)},"X",8,m)]),e.content?((0,c.wg)(),(0,c.iD)("div",h,(0,d.zw)(e.content),1)):(0,c.kq)("",!0)])))),128))])}var g=n(1373);const v=(0,g.Z)();var w=v,y={data(){return{messages:[]}},methods:{toastShow(){setTimeout((()=>{this.messages.shift()}),4e3)},clearToast(e){this.messages.splice(e,1)}},mounted(){w.on("alert-message",(e=>{const{style:t="success",title:n,content:o}=e;this.messages.push({style:t,title:n,content:o}),this.toastShow()}))}},_=n(89);const k=(0,_.Z)(y,[["render",b]]);var C=k;const P={key:0},O=(0,c._)("div",{class:"newsModal"},null,-1),x={class:"newsModal-content"},M=(0,c._)("p",null,"放心初好康優惠卷",-1),j=(0,c._)("div",{class:"bg-img"},null,-1),S={class:"coupon-text"},E={class:"coupon"};function T(e,t,n,o,a,r){return a.show.bool?((0,c.wg)(),(0,c.iD)("div",P,[O,(0,c._)("div",x,[(0,c._)("h3",null,[M,(0,c._)("span",{onClick:t[0]||(t[0]=(...e)=>r.closeModal&&r.closeModal(...e))},"Ｘ")]),j,(0,c._)("div",S,[(0,c._)("p",E,(0,d.zw)(a.coupon),1),(0,c._)("button",{class:"user-btn",type:"button",onClick:t[1]||(t[1]=(...e)=>r.copyCoupon&&r.copyCoupon(...e))},"複製優惠碼")])])])):(0,c.kq)("",!0)}var A={data(){return{coupon:"welcome0958",show:{bool:!1,active:!1}}},methods:{copyCoupon(){localStorage.setItem("couponText",this.coupon),this.$swal("複製成功!","將在購物車自動填入","success")},closeModal(){this.show=!1}},watch:{$route(e){"/"===e.fullPath&&!1===this.show.active&&(this.show.bool=!0,this.show.active=!0)}},mounted(){localStorage.setItem("couponText","")}};const L=(0,_.Z)(A,[["render",T]]);var $=L,D={data(){return{isLoading:!1}},components:{AlertMessages:C,NewsModal:$},mounted(){this.$emitter.on("isLoading",(e=>{this.isLoading=e}))}};const N=(0,_.Z)(D,[["render",u]]);var F=N,q=n(678);const z=[{path:"/",name:"index",component:()=>n.e(635).then(n.bind(n,3635)),children:[{path:"",name:"home",component:()=>Promise.all([n.e(659),n.e(970)]).then(n.bind(n,6970)),meta:{title:"放心初蔬果網-首頁"}},{path:"/about",name:"about",component:()=>n.e(881).then(n.bind(n,8881)),meta:{title:"放心初蔬果網-關於"}},{path:"/order",name:"order",component:()=>n.e(109).then(n.bind(n,109)),meta:{title:"放心初蔬果網-訂單查詢"}},{path:"/blog",name:"blog",component:()=>n.e(508).then(n.bind(n,3508)),meta:{title:"放心初蔬果網-部落格"}},{path:"/blog/:id",component:()=>n.e(153).then(n.bind(n,6153)),meta:{title:"放心初蔬果網-部落格"},props:e=>({id:e.params.id})},{path:"/cart",name:"cart",component:()=>n.e(230).then(n.bind(n,4230)),children:[{path:"",name:"品項確認頁面",component:()=>n.e(599).then(n.bind(n,599)),meta:{title:"放心初結帳-確認商品"}},{path:"payment2",name:"資料輸入頁面",component:()=>n.e(337).then(n.bind(n,9337)),meta:{title:"放心初結帳-資料填寫"},props:e=>({show:e.params.show})},{path:"payment3",name:"完成結帳頁面",component:()=>n.e(986).then(n.bind(n,8986)),meta:{title:"放心初結帳-結帳完成"},props:e=>({show_complete:e.params.show_complete,id:e.params.id})}]},{path:"/product",name:"購物頁面",component:()=>n.e(980).then(n.bind(n,5980)),children:[{path:"",name:"全部商品",component:()=>Promise.all([n.e(727),n.e(659),n.e(935)]).then(n.bind(n,6935)),meta:{title:"放心初蔬果網-雙北隔日送"}},{path:":id",component:()=>Promise.all([n.e(659),n.e(971)]).then(n.bind(n,3971)),meta:{title:"放心初蔬果網-雙北隔日送"},props:e=>({id:e.params.id})}]},{path:"/login",name:"登入頁面",component:()=>n.e(875).then(n.bind(n,8875)),meta:{title:"放心初蔬果網-登入"}},{path:"/:pathMatch(.*)*",redirect:{name:"home"}}]},{path:"/admin",name:"後台主頁",component:()=>n.e(530).then(n.bind(n,8530)),children:[{path:"",name:"首頁預設產品頁",component:()=>Promise.all([n.e(727),n.e(461),n.e(350)]).then(n.bind(n,7350))},{path:"product",name:"產品列表",component:()=>Promise.all([n.e(727),n.e(461),n.e(350)]).then(n.bind(n,7350))},{path:"order",name:"訂購清單",component:()=>Promise.all([n.e(727),n.e(461),n.e(688)]).then(n.bind(n,8688))},{path:"coupon",name:"優惠卷頁面",component:()=>Promise.all([n.e(727),n.e(461),n.e(68)]).then(n.bind(n,7068))},{path:"article",name:"文章頁面",component:()=>Promise.all([n.e(727),n.e(461),n.e(524)]).then(n.bind(n,1524))}]}],H=(0,q.p7)({history:(0,q.r5)(),routes:z,linkActiveClass:"active",scrollBehavior(e,t,n){if(-1!==e.fullPath.indexOf("/"))return{top:0}}});var V=H,W=n(9907),Z=n.n(W),B=n(6265),I=n.n(B),K=n(6423),U=n(3752),Y=n.n(U);function Q(e,t="更新"){if(e.data.success)w.emit("alert-message",{style:"success",title:`${t}成功`});else{const n="string"===typeof e.data.message?[e.data.message]:e.data.message;w.emit("alert-message",{style:"danger",title:`${t}失敗`,content:n.join("、")})}}n(1129);function X(e){const t=parseInt(e,10);return`${t.toFixed(0).replace(/./g,((e,t,n)=>t&&"."!==e&&(n.length-t)%3===0?`, ${e}`.replace(/\s/g,""):e))}`}function G(e){const t=new Date(1e3*e);return t.toLocaleDateString()}var J=n(6553),R=n.n(J);(0,a.aH)("required",r.C1),(0,a.aH)("email",r.Do),(0,a.aH)("min",r.VV),(0,a.jQ)({generateMessage:(0,i.NC)({zh_TW:s}),validateOnInput:!0}),(0,i.i_)("zh_TW");const ee=(0,o.ri)(F);ee.use(V),ee.use(K.Z,I()),ee.use(Z()),ee.use(R()),ee.config.globalProperties.$httpMessageState=Q,ee.config.globalProperties.$filters={date:G,thColon:X},ee.config.globalProperties.$emitter=(0,g.Z)(),ee.component("LoadingView",Y()),ee.component("FormView",a.l0),ee.component("FieldView",a.gN),ee.component("ErrorMessage",a.Bc),ee.mount("#app"),V.beforeEach(((e,t,n)=>{e.meta.title&&(document.title=e.meta.title),n()}))}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var r=t[o]={id:o,loaded:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}n.m=e,function(){n.amdO={}}(),function(){var e=[];n.O=function(t,o,a,r){if(!o){var i=1/0;for(u=0;u<e.length;u++){o=e[u][0],a=e[u][1],r=e[u][2];for(var s=!0,c=0;c<o.length;c++)(!1&r||i>=r)&&Object.keys(n.O).every((function(e){return n.O[e](o[c])}))?o.splice(c--,1):(s=!1,r<i&&(i=r));if(s){e.splice(u--,1);var l=a();void 0!==l&&(t=l)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[o,a,r]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,o){return n.f[o](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{68:"568f40e3",109:"b5d10aaa",153:"f1f8c631",230:"9e85b113",337:"923e457f",350:"e4004be8",461:"d8d3ae31",508:"5ee97f01",524:"2c50faa3",530:"6366000e",599:"deb3c7d5",635:"f650f8b8",659:"7d53eea3",688:"d107c421",727:"32de3b41",875:"41c26f81",881:"3784bba5",935:"f49b385c",970:"ee7c1b3d",971:"d3b02783",980:"e991321c",986:"eb35418d"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{68:"b83afc1d",109:"c29c8f73",153:"98a2fda2",230:"bdbfb9fc",337:"b4718670",350:"1137500f",461:"22239c69",508:"9a7a739c",524:"c30e3bbf",530:"e78fec65",599:"51520876",635:"dc421a0f",659:"fc65482f",688:"8df8fc77",727:"ce0fcd18",875:"58f1f4c3",881:"be7c97b0",935:"84f5475a",970:"bb4b1bf3",971:"19517157",980:"a1f219c9"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.hmd=function(e){return e=Object.create(e),e.children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e}}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="vue-week6:";n.l=function(o,a,r,i){if(e[o])e[o].push(a);else{var s,c;if(void 0!==r)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var d=l[u];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==t+r){s=d;break}}s||(c=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+r),s.src=o),e[o]=[a];var p=function(t,n){s.onerror=s.onload=null,clearTimeout(f);var a=e[o];if(delete e[o],s.parentNode&&s.parentNode.removeChild(s),a&&a.forEach((function(e){return e(n)})),t)return t(n)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=p.bind(null,s.onerror),s.onload=p.bind(null,s.onload),c&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p="/vue_training/"}(),function(){var e=function(e,t,n,o){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css";var r=function(r){if(a.onerror=a.onload=null,"load"===r.type)n();else{var i=r&&("load"===r.type?"missing":r.type),s=r&&r.target&&r.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=i,c.request=s,a.parentNode.removeChild(a),o(c)}};return a.onerror=a.onload=r,a.href=t,document.head.appendChild(a),a},t=function(e,t){for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var a=n[o],r=a.getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(r===e||r===t))return a}var i=document.getElementsByTagName("style");for(o=0;o<i.length;o++){a=i[o],r=a.getAttribute("data-href");if(r===e||r===t)return a}},o=function(o){return new Promise((function(a,r){var i=n.miniCssF(o),s=n.p+i;if(t(i,s))return a();e(o,s,a,r)}))},a={143:0};n.f.miniCss=function(e,t){var n={68:1,109:1,153:1,230:1,337:1,350:1,461:1,508:1,524:1,530:1,599:1,635:1,659:1,688:1,727:1,875:1,881:1,935:1,970:1,971:1,980:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=o(e).then((function(){a[e]=0}),(function(t){throw delete a[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,o){var a=n.o(e,t)?e[t]:void 0;if(0!==a)if(a)o.push(a[2]);else if(/^(461|659|727)$/.test(t))e[t]=0;else{var r=new Promise((function(n,o){a=e[t]=[n,o]}));o.push(a[2]=r);var i=n.p+n.u(t),s=new Error,c=function(o){if(n.o(e,t)&&(a=e[t],0!==a&&(e[t]=void 0),a)){var r=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.src;s.message="Loading chunk "+t+" failed.\n("+r+": "+i+")",s.name="ChunkLoadError",s.type=r,s.request=i,a[1](s)}};n.l(i,c,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,o){var a,r,i=o[0],s=o[1],c=o[2],l=0;if(i.some((function(t){return 0!==e[t]}))){for(a in s)n.o(s,a)&&(n.m[a]=s[a]);if(c)var u=c(n)}for(t&&t(o);l<i.length;l++)r=i[l],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(u)},o=self["webpackChunkvue_week6"]=self["webpackChunkvue_week6"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(3628)}));o=n.O(o)})();
//# sourceMappingURL=app.21dd5c9a.js.map