"use strict";(self["webpackChunkvue_week6"]=self["webpackChunkvue_week6"]||[]).push([[153],{6153:function(t,e,i){i.r(e),i.d(e,{default:function(){return m}});var a=i(3396),s=i(7139);const l={class:"container"},n={class:"article mt-25 mt-sm-15"},o={class:"text-medium mt-10 date_author"},c={class:"ml-10"},r=["innerHTML"];function d(t,e,i,d,g,u){return(0,a.wg)(),(0,a.iD)("div",l,[(0,a._)("div",n,[(0,a._)("div",{class:"bg-img",style:(0,s.j5)({backgroundImage:`url(${g.blog.imageUrl})`})},null,4),(0,a._)("p",o,[(0,a._)("span",null,"文章日期："+(0,s.zw)(t.$filters.date(g.blog.create_at)),1),(0,a._)("span",c,"文章作者："+(0,s.zw)(g.blog.author),1)]),(0,a._)("div",{class:"article-content mb-10",innerHTML:g.blog.content},null,8,r)])])}var g={props:["id"],data(){return{blog:{}}},methods:{getBlog(t){this.$emitter.emit("isLoading",!0),this.$http.get(`https://vue3-course-api.hexschool.io/v2/api/ginjack/article/${t}`).then((t=>{this.$emitter.emit("isLoading",!1),this.blog=t.data.article,console.log(this.blog)})).catch((t=>{console.dir(t)}))}},watch:{id(){this.getBlog(this.id)}},mounted(){this.getBlog(this.id)}},u=i(89);const h=(0,u.Z)(g,[["render",d],["__scopeId","data-v-2aa85d46"]]);var m=h}}]);
//# sourceMappingURL=153.f1f8c631.js.map