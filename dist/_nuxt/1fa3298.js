(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{403:function(t,e,n){var content=n(420);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(56).default)("809700bc",content,!0,{sourceMap:!1})},419:function(t,e,n){"use strict";n(403)},420:function(t,e,n){var r=n(55)((function(i){return i[1]}));r.push([t.i,"/*purgecss start ignore*/\n.search{\n  list-style:none!important\n}\n.thumb{\n  border-radius:30px;\n  width:150px\n}\n\n/*purgecss end ignore*/",""]),r.locals={},t.exports=r},437:function(t,e,n){"use strict";n.r(e);var r=n(8),c=(n(24),n(115),n(58),{methods:{filter:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={data:{facets:{tags:["audi"],vehicle_type:[]},query_args:{post_type:"posts",posts_per_page:10,paged:1}}},e.next=3,t.$axios.$post("/wp-json/facetwp/v1/fetch",n);case 3:r=e.sent,console.log(r);case 5:case"end":return e.stop()}}),e)})))()}},computed:{facets:function(){return this.$store.state.facets},search:function(){return this.$store.state.search},pages:function(){return this.$store.state.pages.urls}}}),o=(n(419),n(57)),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"pages"}},[n("ul",t._l(t.facets,(function(e){return n("li",[t._v("\n      "+t._s(e.slug)+"\n    ")])})),0),t._v(" "),n("ul",{staticClass:"flex flex-wrap p-8 search"},t._l(t.search,(function(e){return n("li",{staticClass:"w-1/3 m-4 p-4"},[n("NuxtLink",{attrs:{to:e.link}},[n("img",{staticClass:"thumb",attrs:{src:e.media}})]),t._v(" "),n("h3",{staticClass:"text-xl"},[t._v(t._s(e.title))]),t._v(" "),n("p",{staticClass:"text-md font-bold"},[t._v(t._s(e.blurb))])],1)})),0)])}),[],!1,null,null,null);e.default=component.exports}}]);