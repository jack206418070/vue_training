"use strict";(self["webpackChunkvue_week6"]=self["webpackChunkvue_week6"]||[]).push([[109],{109:function(e,t,s){s.r(t),s.d(t,{default:function(){return N}});var r=s(3396),i=s(7139),a=s(9242);const d={class:"order_search"},c=(0,r._)("div",{class:"container"},[(0,r._)("h3",null,"客戶訂單查詢")],-1),n=[c],l={class:"container py-10"},o={class:"row jy-content-center"},h={class:"col-md-10 col-lg-4"},_=(0,r._)("h3",{class:"text-title py-5 text-center f-size-m"},"訂單查詢",-1),p={class:"form-control mb-10"},m=(0,r._)("label",{class:"mb-2",for:"order_id"},"訂單編號",-1),u={class:"p-relative"},g=(0,r._)("p",null,"查詢",-1),v=[g],w={key:0,class:"row jy-content-center"},k={class:"col-md-10 col-lg-6"},b={class:"order-info"},O={class:"text-medium mb-2"},f=(0,r._)("span",{class:"title"},"訂單編號",-1),$=(0,r.Uk)(": "),x={class:"content"},y={class:"text-medium mb-2"},z=(0,r._)("span",{class:"title"},"訂購人",-1),U=(0,r.Uk)(": "),L={class:"content"},j={class:"text-medium mb-2"},C=(0,r._)("span",{class:"title"},"訂單日期",-1),D=(0,r.Uk)(": "),H={class:"content"},q={class:"text-medium mb-2"},T=(0,r._)("span",{class:"title"},"付款狀態",-1),I=(0,r.Uk)(": "),K={class:"text-medium mb-2"},V=(0,r._)("span",{class:"title"},"訂購品項",-1),X=(0,r.Uk)(": "),Y={class:"content"},Z={class:"text-medium mb-2"},A=(0,r._)("span",{class:"title"},"總金額",-1),B=(0,r.Uk)(": "),E={class:"content"};function F(e,t,c,g,F,G){return(0,r.wg)(),(0,r.iD)("div",d,[(0,r._)("div",{class:"order-banner",style:(0,i.j5)({backgroundImage:`url( ${s(3072)})`})},n,4),(0,r._)("div",l,[(0,r._)("div",o,[(0,r._)("div",h,[_,(0,r._)("div",p,[m,(0,r._)("div",u,[(0,r.wy)((0,r._)("input",{type:"text",id:"order_id","onUpdate:modelValue":t[0]||(t[0]=e=>F.order_id=e),placeholder:"請輸入訂單編號"},null,512),[[a.nr,F.order_id,void 0,{trim:!0}]]),(0,r._)("div",{class:"search",onClick:t[1]||(t[1]=(...e)=>G.searchHandler&&G.searchHandler(...e))},v)])])])]),void 0!==F.searchOrder.id?((0,r.wg)(),(0,r.iD)("div",w,[(0,r._)("div",k,[(0,r._)("div",b,[(0,r._)("h5",O,[f,$,(0,r._)("span",x,(0,i.zw)(F.searchOrder.id),1)]),(0,r._)("p",y,[z,U,(0,r._)("span",L,(0,i.zw)(F.searchOrder.user.name),1)]),(0,r._)("p",j,[C,D,(0,r._)("span",H,(0,i.zw)(e.$filters.date(F.searchOrder.create_at)),1)]),(0,r._)("p",q,[T,I,(0,r._)("span",{class:(0,i.C_)(["content is_paid",{is_paid_none:!1===F.searchOrder.is_paid}])},(0,i.zw)(F.searchOrder.is_paid?"已付款":"未付款"),3)]),(0,r._)("p",K,[V,X,(0,r._)("ul",Y,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(F.searchOrder.products,(e=>((0,r.wg)(),(0,r.iD)("li",{key:e.id},(0,i.zw)(e.product.title)+" "+(0,i.zw)(e.product.unit)+" X "+(0,i.zw)(e.qty),1)))),128))])]),(0,r._)("p",Z,[A,B,(0,r._)("span",E,"$"+(0,i.zw)(e.$filters.thColon(F.searchOrder.total)),1)])])])])):(0,r.kq)("",!0)])])}var G={data(){return{orders:[],current_page:1,order_id:"",searchOrder:{}}},methods:{getOrders(e=1){this.$emitter.emit("isLoading",!0),this.$http.get(`https://vue3-course-api.hexschool.io/v2/api/ginjack/orders?page=${e}`).then((e=>{this.orders=[...this.orders,...e.data.orders];const t=e.data.pagination;this.current_page<t.total_pages?(this.getOrders(this.current_page+1),this.current_page+=1):this.$emitter.emit("isLoading",!1)})).catch((e=>{this.$emitter.emit("isLoading",!1),console.dir(e)}))},searchHandler(){this.$emitter.emit("isLoading",!0),this.searchOrder=this.orders.filter((e=>e.id===this.order_id)),0===this.searchOrder.length?setTimeout((()=>{this.$swal({icon:"error",title:"失敗",text:"找不到此訂單"}),this.$emitter.emit("isLoading",!1)}),1500):setTimeout((()=>{this.searchOrder={...this.searchOrder[0]},this.order_id="",this.$emitter.emit("isLoading",!1)}),1500)}},mounted(){this.getOrders()}},J=s(89);const M=(0,J.Z)(G,[["render",F]]);var N=M},3072:function(e,t,s){e.exports=s.p+"img/about_bg.b59d4ee4.jpeg"}}]);
//# sourceMappingURL=109.b5d10aaa.js.map