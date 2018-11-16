<template>
    <div class="login_pwd_content">
      <top-header title-txt="设置登录密码"></top-header>
      <ul class="content_box">
        <li><input type="text" readonly="readonly" v-model="PhoneTitle"></li>
        <li>
          <password-text input-hint="输入当前使用密码" class="input_password" v-on:sendInputContent="getPassWord"></password-text>
        </li>
        <li>
          <password-text input-hint="请输入新密码（6-16位）" class="input_password" v-on:sendInputContent="getPassWord"></password-text>
        </li>
        <li>
          <password-text input-hint="再次确认新密码" class="input_password" v-on:sendInputContent="getRePassWord"></password-text>
        </li>
      </ul>
      <router-link to="/forgetPwd">
        <p class="text_right">忘记密码？</p>
      </router-link>
      <span class="preserve_btn" @click="saveSpec">保存</span>
    </div>
</template>
<script>
    import Vue from "vue"
    import * as API from '../service/API';
    import LocalStorageUtils from '../utils/LocalStorageUtils';
    import TopHeader from '../components/TopHeader'
    import EditText from '../components/common/EditText'
    import PasswordText from '../components/common/PasswordText'
    import Countdown from '../components/Countdown'
    import Toast from '../widget/Toast';
    import Loading from '../widget/loading/loading'

    export default {
      data() {
          return {
            userInfo:'',
            PhoneTitle:'',
            phone:'',
            oldPwd:'',
            pwd: "",
            re_pwd: "",
            check_code: "",
            reg: /^[0-9A-Za-z]{6,}$/
          };
      },
      mounted() {
        let screenHeigt = window.screen.availHeight;
        let topHeight = document.getElementsByClassName('common_header')[0].offsetHeight;
        document.getElementsByClassName('login_pwd_content')[0].style.minHeight = screenHeigt - topHeight + 'px';
        document.getElementsByClassName('login_pwd_content')[0].style.backgroundColor = '#eee';
        this.setData();
      },
      methods:{
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
          let localStorageUtils = new LocalStorageUtils();
          this.userInfo = JSON.parse(localStorageUtils.getStore('userInfo'));
          this.phone = this.userInfo.aPhone;
          this.PhoneTitle = this.userInfo.aPhone.substr(0,3) + '****' + this.userInfo.aPhone.substring(7);
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
//            let loading = new Loading();
//            loading.show();
//            this.$post(API.SEND_CHECKCODE, {phone: this.phone, type: 2}).then((response) => {
//              if (response.code == 500) {
//                new Toast(response.msg).show();
//                return;
//              }
//              loading.close();
//            }).then((error) => {
//              loading.close();
//            });
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
          if(!this.a_pwd){
            new Toast("请输入确认密码").show();
            return;
          }
          if(this.pwd != this.a_pwd){
            new Toast("两次密码不一致").show();
            return;
          }
        },
      },
      components:{
        TopHeader,EditText,PasswordText,Countdown
      }
    }
</script>
<style scoped>
  .content_box{
    margin-top: 1.61rem;
    background-color: white;
  }
  .content_box li{
    font-size: 0;
    padding: .65rem .5rem;
    border-bottom: 1px solid #F1F1F1;
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
</style>
