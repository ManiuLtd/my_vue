webpackJsonp([13],{"9w24":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("7m8J"),i=n("RnxI"),c=n("wwHk"),a=n("csiq"),o=n("KgB8"),r=n("vjrR"),d=n("irLX"),h={data:function(){return{a_name:"",pwd:"",a_pwd:"",service_code:"",check_code:"",checked:!0,icon:{normal:"../../static/images/nocheck_out.png",active:"../../static/images/check_out.png"}}},methods:{getAname:function(t){this.a_name=t},getPassWord:function(t){this.pwd=t},getAPassWord:function(t){this.a_pwd=t},getServiceCode:function(t){this.service_code=t},reg:function(){var t=this;if(this.a_name)if(this.pwd)if(this.a_pwd)if(this.pwd==this.a_pwd)if(this.check_code)if(0!=this.checked){var e={};e.a_name=this.a_name,e.pwd=this.pwd,e.a_pwd=this.a_pwd,e.service_code=this.service_code,e.check_code=this.check_code;var n=new r.a;n.show(),this.$post(s.y,e).then(function(e){200==e.code?(d.a.$emit("info",t.a_name),t.$router.replace("/registerSuccess"),n.close()):new i.a(e.msg).show()}).then(function(t){n.close()})}else new i.a("请勾选注册协议").show();else new i.a("短信验证码不能为空").show();else new i.a("两次密码不一致").show();else new i.a("请输入确认密码").show();else new i.a("请输入密码").show();else new i.a("请输入手机号").show()},getCode:function(){var t=this;if(this.a_name){var e={};e.phone=this.a_name,e.type=1;var n=new r.a;n.show(),this.$post(s.z,e).then(function(e){return 200==e.code?(new i.a(e.msg).show(),void t.$refs.ctdown.startCountDown()):void new i.a(e.msg).show()}).then(function(t){n.close()})}else new i.a("请输入手机号").show()}},components:{EditText:c.a,PasswordText:a.a,Countdown:o.a}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("form",[s("div",{staticClass:"login"},[t._m(0),t._v(" "),s("div",{staticClass:"inpt phone"},[s("edit-text",{attrs:{"input-hint":"请输入11位手机号","input-type":"number"},on:{sendInputContent:t.getAname}})],1),t._v(" "),s("div",{staticClass:"inpt pwd"},[s("password-text",{staticClass:"input_password",attrs:{"input-hint":"请设置密码（6-16位）"},on:{sendInputContent:t.getPassWord}})],1),t._v(" "),s("div",{staticClass:"inpt repwd"},[s("password-text",{staticClass:"input_password",attrs:{"input-hint":"再次确认密码"},on:{sendInputContent:t.getAPassWord}})],1),t._v(" "),s("div",{staticClass:"inpt service"},[s("edit-text",{attrs:{"input-hint":"服务编号（选填项）","input-type":"text"},on:{sendInputContent:t.getServiceCode}})],1),t._v(" "),s("div",{staticClass:"inpt veri"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.check_code,expression:"check_code",modifiers:{trim:!0}}],staticClass:"veri_input",attrs:{type:"text",placeholder:"短信验证码"},domProps:{value:t.check_code},on:{input:function(e){e.target.composing||(t.check_code=e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),s("Countdown",{ref:"ctdown",on:{callBackRightClick:t.getCode}})],1),t._v(" "),s("p",{staticClass:"agreement"},[s("van-checkbox",{scopedSlots:t._u([{key:"icon",fn:function(e){return s("img",{attrs:{id:"img_chk",src:e.checked?t.icon.active:t.icon.normal}})}}]),model:{value:t.checked,callback:function(e){t.checked="string"==typeof e?e.trim():e},expression:"checked"}},[t._v("\n          我已经阅读并同意\n          "),s("a",{staticStyle:{color:"#4cc3ad"},attrs:{href:""}},[t._v("《开店服务协议》")])])],1)]),t._v(" "),s("div",{staticClass:"img_btn"},[s("img",{attrs:{src:n("/1+I"),alt:""}}),t._v(" "),s("span",{on:{click:function(e){t.reg()}}},[t._v("同意协议并注册")])]),t._v(" "),s("router-link",{attrs:{to:"/login"}},[s("span",{staticClass:"register"},[t._v("登录")])])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("p",[this._v("注册")]),this._v(" "),e("p",[this._v("手机号将作为登录账号")])])}]};var p=n("VU/8")(h,u,!1,function(t){n("btHY")},"data-v-5cc5eff6",null);e.default=p.exports},KgB8:function(t,e,n){"use strict";var s=60,i={data:function(){return{content:"获取验证码"}},methods:{getVerification:function(){this.$emit("callBackRightClick")},startCountDown:function(){var t=this;0===s?(s=60,this.content="重新获取"):(s--,this.content=s+"s",setTimeout(function(){t.startCountDown()},1e3))}}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"verification_code_box"},[e("span",{staticClass:"verification_code",domProps:{textContent:this._s(this.content)},on:{click:this.getVerification}})])},staticRenderFns:[]};var a=n("VU/8")(i,c,!1,function(t){n("xd0R")},"data-v-3c5c126f",null);e.a=a.exports},btHY:function(t,e){},xd0R:function(t,e){}});
//# sourceMappingURL=13.715dbeaddc2fe884f778.js.map