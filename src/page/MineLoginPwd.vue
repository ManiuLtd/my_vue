<template>
    <div class="root">
      <div class="page_bg"></div>
      <top-header title-txt="修改登录密码"></top-header>
      <ul class="content_box">
        <li v-text="PhoneTitle"></li>
        <li class="psd_li">
          <password-text input-hint="输入当前使用密码" class="input_password" v-on:sendInputContent="getOldPassWord"></password-text>
        </li>
        <li class="psd_li">
          <password-text input-hint="请输入新密码（6-16位）" class="input_password" v-on:sendInputContent="getPassWord"></password-text>
        </li>
        <li class="psd_li">
          <password-text input-hint="再次确认新密码" class="input_password" v-on:sendInputContent="getRePassWord"></password-text>
        </li>
      </ul>
      <router-link to="/forgetPwd?isLogin=1">
        <p class="text_right">忘记密码？</p>
      </router-link>
      <span :class="bottom_btn_style" @click="saveSpec">保存</span>
    </div>
</template>
<script>
    import * as API from '../service/API';
    import TopHeader from '../components/TopHeader'
    import EditText from '../components/common/EditText'
    import PasswordText from '../components/common/PasswordText'
    import Countdown from '../components/Countdown'
    import Toast from '../widget/Toast';
    import SuccessLoading from '../widget/sucess_loading/SuccessLoading'

    export default {
      data() {
          return {
            PhoneTitle:'',
            phone:'',
            oldPwd:'',
            pwd: "",
            re_pwd: "",
            check_code: "",
            reg: /^[0-9A-Za-z]{6,}$/,
            clientHeight:document.documentElement.clientHeight,
            bottom_btn_style:'btn_fixed'
          };
      },
      mounted() {
        this.resizeWindow();
        this.setData();
      },
      destroyed(){
        window.onresize = null;
      },
      methods:{
        resizeWindow(){
          window.onresize = ()=>{
            if(this.clientHeight>document.documentElement.clientHeight) {
              this.bottom_btn_style = "btn_margin";
            }else{
              this.bottom_btn_style = "btn_fixed";
            }
          }
        },
        getOldPassWord(v){
          this.oldPwd = v;
        },
        getPassWord(v){
          this.pwd = v;
        },
        getRePassWord(v){
          this.re_pwd = v;
        },
        setData(){
          this.$store.dispatch('initUserInfo');
          this.PhoneTitle = this.$store.state.userInfo.phoneNum;
        },
        passwordValidate: function () {
          var errorText = '';
          if (!this.reg.test(this.pwd)) {
            errorText = '密码少于6位';
            new Toast(errorText).show();
            return false;
          }
          return true;
        },
        passwordCheckValidate: function () {
          var errorText = '';
          if (!this.reg.test(this.re_pwd)) {
            errorText = '密码少于6位';
            new Toast(errorText).show();
            return false;
          } else if (this.pwd !== this.re_pwd) {
            errorText = '两次密码不匹配';
            new Toast(errorText).show();
            return false;
          }
          return true;
        },
//        getCode() {
//          let reg = 11 && /^1(([3|5|7|8][\d]{9})|(47|45)[\d]{8})$/;
//          if (this.phone == '') {
//            new Toast('手机号信息有误！').show();
//          } else if (!reg.test(this.phone)) {
//            new Toast('手机格式不正确！').show();
//          } else {
//            this.$post(API.SEND_CHECKCODE, {phone: this.phone, type: 2}).then((response) => {
//              if (response.code == 500) {
//                new Toast(response.msg).show();
//                return;
//              }
//            })
//          }
//        },
        saveSpec(){
          if(!this.oldPwd){
            new Toast("请输入当前使用密码").show();
            return;
          }
          if(!this.pwd){
            new Toast("请输入密码").show();
            return;
          }
          if(!this.re_pwd){
            new Toast("请输入确认密码").show();
            return;
          }
          if(this.pwd != this.re_pwd){
            new Toast("两次密码不一致").show();
            return;
          }
          let data = {au_pwd:this.oldPwd,new_pwd:this.pwd,reNew_pwd:this.re_pwd};
          this.$post(API.SET_LOGIN_PASS,data).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg).show();
              return;
            }else{
              new SuccessLoading(response.msg).show();
              this.$router.replace('/setting');
            }
          })
        },
      },
      components:{
        TopHeader,EditText,PasswordText,Countdown
      }
    }
</script>
<style scoped>
  .root{
    background-color: #eeeeee;
  }
  .content_box{
    padding-top: 1.62rem;
    background-color: white;
  }
  .content_box li{
    font-size: 0.48rem;
    padding: .65rem .5rem;
    border-bottom: 1px solid #F1F1F1;
  }
  .content_box .psd_li{
    padding-right: 1rem;
  }
  .content_box .verification_code_box{
    float: right;
  }
  .text_right{
    text-align: right;
    font-size: .4rem;
    color: #4cc3ad;
    margin-top: .25rem;
    padding-right: .3rem;
  }

  /*提交按钮*/
  .btn_fixed{
    position: fixed;
    bottom: 0;
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: #5FCCC6;
  }

  .btn_margin{
    margin-top: 2.56rem;
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: #5FCCC6;
  }
</style>
