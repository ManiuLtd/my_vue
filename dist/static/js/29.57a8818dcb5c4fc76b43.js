webpackJsonp([29],{Nc5b:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("Obkc"),i=s("irLX"),r=s("7m8J"),n=s("RnxI"),o=0,l=0,c={data:function(){return{username:"",idNum:"",address_data:{},brand_data:{},activeName:"0",detailAddress:"",servicePserson:"",personImgNameEtx:[],otherImageNameEtx:[],person_selectImages:[],other_selectImages:[],perosnUploadImages:[],otherUploadImages:[],runData:{failMsg:"",runTime:""},rTime:""}},created:function(){i.a.$on("getBrand",this.getBrandData),i.a.$on("getAddress",this.getAddressData)},mounted:function(){var t=window.screen.availHeight,e=document.getElementsByClassName("common_header")[0].offsetHeight;document.getElementsByClassName("shop_create_content")[0].style.minHeight=t-e+"px",document.getElementsByClassName("shop_create_content")[0].style.backgroundColor="#eee"},methods:{getBrandData:function(t){this.brand_data=t,console.log(this.brand_data)},getAddressData:function(t){this.address_data=t,console.log(this.address_data)},onPersonRead:function(t){var e=t.content;this.person_selectImages.push(e);var s=t.file.name,a=s.substring(s.lastIndexOf(".")+1).toLowerCase();this.personImgNameEtx.push(a)},onOtherRead:function(t){var e=t.content;this.other_selectImages.push(e);var s=t.file.name,a=s.substring(s.lastIndexOf(".")+1).toLowerCase();this.otherImageNameEtx.push(a)},deletePersonImage:function(t){this.personImgNameEtx.splice(t,1),this.person_selectImages.splice(t,1)},deleteOtherImage:function(t){this.otherImageNameEtx.splice(t,1),this.other_selectImages.splice(t,1)},uploadImg:function(){0!=this.verification()&&this.postPersonImage(this.personImgNameEtx[0])},postPersonImage:function(t){var e=this;this.$postImg("http://47.94.152.208:12345/file/upload_.html",{ext:t,content:this.person_selectImages[o]}).then(function(t){e.perosnUploadImages.push(t.result.url),o<e.person_selectImages.length?(o+=1,e.postPersonImage(e.personImgNameEtx[o])):e.other_selectImages&&e.other_selectImages.length>0?e.postOtherImage(e.otherImageNameEtx[0]):e.certification()})},postOtherImage:function(t){var e=this;this.$postImg("http://47.94.152.208:12345/file/upload_.html",{ext:t,content:this.other_selectImages[l]}).then(function(t){e.otherUploadImages.push(t.result.url),l<e.other_selectImages.length?(l+=1,e.postOtherImage(e.otherImageNameEtx[l])):e.certification()})},certification:function(){var t=this,e={};e.truename=this.username,e.ident_no=this.idNum,e.user_type="1",e.provinces=this.address_data.provinces,e.city=this.address_data.city,e.area=this.address_data.area,e.live_address=this.detailAddress,e.partner_intention=this.brand_data.gb_id,e.accept_officer=this.servicePserson;for(var s=[],a=0;a<this.perosnUploadImages.length;a++)s.push(this.perosnUploadImages[a]);e.idUpload=s;for(var o=[],l=0;l<this.otherUploadImages.length;l++)o.push(this.otherUploadImages[l]);this.$post(r.g,e).then(function(e){if(200!=e.code)return new n.a(e.msg).show(),t.runData.failMsg=e.msg,t.runData.runTime=e.runtime,void i.a.$emit("getFailMsg",t.runData);t.rTime=e.runTime,i.a.$emit("getTime",t.rTime),t.$router.replace("/reviewSuccess")})},verification:function(){return this.username?this.idNum?this.person_selectImages&&0==this.person_selectImages.length?(new n.a("请上传证件图片").show(),!1):this.detailAddress?this.servicePserson?!!this.address_data||(new n.a("请选择居住地址").show(),!1):(new n.a("请输入服务人员").show(),!1):(new n.a("请输入详细地址").show(),!1):(new n.a("请输入身份证号").show(),!1):(new n.a("请输入姓名").show(),!1)}},components:{TopHeader:a.a}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"shop_create_content"},[a("top-header",{attrs:{"title-txt":"商户认证"}}),t._v(" "),a("form",{staticClass:"content"},[a("div",{staticClass:"input_content"},[a("ul",{staticClass:"input_box"},[t._m(0),t._v(" "),a("li",{staticClass:"input_div"},[t._m(1),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.username,expression:"username",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"输入姓名"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),a("li",{staticClass:"input_div"},[t._m(2),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.idNum,expression:"idNum",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"输入身份证号码"},domProps:{value:t.idNum},on:{input:function(e){e.target.composing||(t.idNum=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),t._m(3),t._v(" "),a("li",{staticClass:"input_div"},[a("router-link",{attrs:{to:"/address"}},[a("label",[a("span",{staticClass:"must"},[t._v("*")]),t._v("店铺地址")]),t._v(" "),a("input",{staticStyle:{"margin-right":".3rem"},attrs:{type:"text",readonly:"readonly",name:""},domProps:{value:t.address_data.name}}),t._v(" "),a("i",{staticClass:"icon_arrow"})])],1),t._v(" "),a("li",{staticClass:"input_div"},[t._m(4),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.detailAddress,expression:"detailAddress",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"输入详细地址"},domProps:{value:t.detailAddress},on:{input:function(e){e.target.composing||(t.detailAddress=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),a("li",{staticClass:"input_div"},[a("router-link",{attrs:{to:"/brand"}},[a("label",[a("span",{staticClass:"must"},[t._v("*")]),t._v("销售品类")]),t._v(" "),a("input",{staticStyle:{"margin-right":".3rem"},attrs:{type:"text",readonly:"readonly",placeholder:"请选择",name:""},domProps:{value:t.brand_data.brand}}),t._v(" "),a("i",{staticClass:"icon_arrow"})])],1),t._v(" "),a("li",{staticClass:"input_div"},[t._m(5),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.servicePserson,expression:"servicePserson",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"输入服务人员姓名"},domProps:{value:t.servicePserson},on:{input:function(e){e.target.composing||(t.servicePserson=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),a("li",{staticClass:"input_img"},[t._m(6),t._v(" "),a("div",{staticClass:"img_up"},[a("van-uploader",{attrs:{"after-read":t.onPersonRead,accept:"image/*",multiple:""}},[a("van-icon",{attrs:{name:"photograph"}})],1)],1),t._v(" "),a("p",{staticClass:"tips"},[t._v("请上传身份证正反面照、手持身份证照、营业执照4张。上传注意证件照片上的文字清晰可见。")])]),t._v(" "),a("div",{staticClass:"img_select_box"},t._l(t.person_selectImages,function(e,i){return a("div",{staticClass:"img_box"},[a("img",{staticClass:"img_delete",attrs:{src:s("UQDv")},on:{click:function(e){t.deletePersonImage(i)}}}),t._v(" "),a("img",{staticClass:"img_select",attrs:{src:e}})])})),t._v(" "),a("li",{staticClass:"input_img"},[t._m(7),t._v(" "),a("div",{staticClass:"img_up"},[a("van-uploader",{attrs:{"after-read":t.onOtherRead,accept:"image/*",multiple:""}},[a("van-icon",{attrs:{name:"photograph"}})],1)],1),t._v(" "),a("p",{staticClass:"tips"},[t._v("请注意证件照片上的文字清晰可见,限制3张。")])]),t._v(" "),a("div",{staticClass:"img_select_box"},t._l(t.other_selectImages,function(e,i){return a("div",{staticClass:"img_box"},[a("img",{staticClass:"img_delete",attrs:{src:s("UQDv")},on:{click:function(e){t.deleteOtherImage(i)}}}),t._v(" "),a("img",{staticClass:"img_select",attrs:{src:e}})])}))])]),t._v(" "),t._m(8),t._v(" "),a("span",{staticClass:"preserve_btn",on:{click:t.uploadImg}},[t._v("确认认证")])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("li",{staticClass:"title_bar"},[e("p",{staticClass:"title_left"},[e("img",{attrs:{src:s("Ynzr")}}),this._v(" "),e("span",[this._v("实名认证")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[e("span",{staticClass:"must"},[this._v("*")]),this._v("姓名")])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[e("span",{staticClass:"must"},[this._v("*")]),this._v("身份证号")])},function(){var t=this.$createElement,e=this._self._c||t;return e("li",{staticClass:"title_bar"},[e("p",{staticClass:"title_left"},[e("img",{attrs:{src:s("Ynzr")}}),this._v(" "),e("span",[this._v("资料信息")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[e("span",{staticClass:"must"},[this._v("*")]),this._v("详细地址")])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[e("span",{staticClass:"must"},[this._v("*")]),this._v("服务人员")])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[e("span",{staticClass:"must"},[this._v("*")]),this._v("证件资料")])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[e("span",{staticClass:"must"},[this._v("*")]),this._v("其他资料")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"must_title"},[e("span",{staticClass:"must"},[this._v("*")]),this._v("为必填项，请确保照片资料真实有效。")])}]};var d=s("VU/8")(c,m,!1,function(t){s("yS9P")},"data-v-1edd149a",null);e.default=d.exports},Ynzr:function(t,e){t.exports="data:image/png;base64,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"},yS9P:function(t,e){}});
//# sourceMappingURL=29.57a8818dcb5c4fc76b43.js.map