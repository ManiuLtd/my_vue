<template>
  <div class="forget_box">
    <div class="page_bg"></div>
    <top-header title-txt="忘记密码"></top-header>
    <form action="" class="forgetPsd" style="padding-top: 1.61rem">
      <!--<div class="top_tip">请输入您注册时使用的手机号</div>-->
      <div class="inpt phone">
        <input type="text" v-if="isLogin" readonly="readonly" v-model="encryptPhone">
        <!--<input type="number" placeholder="请输入您注册时使用的手机号" v-if="!isLogin" v-model="phone">-->
        <edit-text input-hint="请输入您注册时使用的手机号" input-type="number" v-on:sendInputContent="getPhone" v-if="!isLogin" input-content="phone"></edit-text>
      </div>
      <div class="inpt pwd">
        <password-text input-hint="请输入新密码（6-16位）" class="input_password" v-on:sendInputContent="getPassWord"></password-text>
      </div>
      <div class="inpt repwd">
        <password-text input-hint="再次确认新密码" class="input_password" v-on:sendInputContent="getRePassWord"></password-text>
      </div>
      <div class="inpt veri">
        <input type="number" v-model.trim="check_code" class="veri_input" placeholder="短信验证码" :oninput="oninputContent">
        <Countdown v-on:callBackRightClick="getCode" ref="ctdown"></Countdown>
      </div>
      <span @click="submit" :class="bottom_btn_style">保存</span>
    </form>
  </div>
</template>

<script>
  import * as API from '../service/API'
  import * as constant from '../utils/constant';
  import TopHeader from '../components/TopHeader';
  import Countdown from '../components/Countdown'
  import EditText from '../components/common/EditText'
  import PasswordText from '../components/common/PasswordText'
  import Toast from "../widget/Toast";
  import Loading from '../widget/global_loading/loading';

  export default {
    data() {
      return {
        isLogin: false,
        phone: "",
        encryptPhone:"",  //加密手机号
        pwd: "",
        re_pwd: "",
        check_code: "",
        btntxt: "获取验证码",
        oninputContent:constant.INPUTTYPE_NUMBER,
        reg: /^[0-9A-Za-z]{6,}$/,
        clientHeight:document.documentElement.clientHeight,
        bottom_btn_style:'btn_fixed'
      }
    },
    mounted() {
      this.resizeWindow();
      this.setData();
      if(this.$route.query.isLogin == 0){
        this.isLogin = false;
      }else{
        this.isLogin = true;
      }
    },
    destroyed(){
      window.onresize = null;
    },
    methods: {
      resizeWindow(){
        window.onresize = ()=>{
          if(this.clientHeight>document.documentElement.clientHeight) {
            this.bottom_btn_style = "btn_margin";
          }else{
            this.bottom_btn_style = "btn_fixed";
          }
        }
      },
      getPhone(v){
        this.phone = v;
      },
      getPassWord(v){
        this.pwd = v;
      },
      getRePassWord(v){
        this.re_pwd = v;
      },
      passwordValidate: function () {
        var errorText = '';
        if(this.pwd !== ''){
          if (!this.reg.test(this.pwd)) {
            errorText = '密码少于6位';
            new Toast(errorText).show();
            return false;
          }
          return true;
        }else {
          errorText = '请输入新密码！';
          new Toast(errorText).show();
          return false;
        }
      },
      passwordCheckValidate: function () {
        var errorText = '';
        if(this.re_pwd == '') {
          errorText = '请输入确认密码！';
          new Toast(errorText).show();
          return false;
        } else if(this.pwd !== this.re_pwd) {
          errorText = '两次密码不匹配！';
          new Toast(errorText).show();
          return false;
        }
        return true;
      },
      getCode() {
        if (this.phone == '') {
          new Toast('请输入手机号码').show();
        } else if (!constant.REGULAR_PHONE.test(this.phone)) {
          new Toast('手机格式不正确').show();
        } else {
            this.$post(API.SEND_CHECKCODE, {phone: this.phone, type: 2}).then((response) => {
              if (response.code == 200) {
                new Toast(response.msg).show();
                this.$refs.ctdown.startCountDown();
                return;
              }else{
                new Toast(response.msg).show();
                return;
              }
            });
        }
      },
      submit: function () {
        if(!this.phone){
          new Toast('请输入手机号码').show();
          return;
        }
        if(!constant.REGULAR_PHONE.test(this.phone)){
          new Toast("手机号格式有误").show();
          return;
        }
        if (this.passwordValidate() && this.passwordCheckValidate()) {
          if(!this.check_code){
            new Toast('请输入短信验证码！').show();
            return;
          }else{
            let loading = new Loading();
            loading.show();
            this.$post(API.FORGETPWD, {
              a_name: this.phone,
              a_pwd: this.pwd,
              re_pwd: this.re_pwd,
              check_code: this.check_code
            }).then((response) => {
              if (response.code != 200) {
                new Toast(response.msg).show();
                return;
              }
              new Toast(response.msg).show();
              this.$router.replace("/login");
              loading.close();
            }).then((error) => {
              loading.close();
            });
          }
        }
      },
      setData(){
        this.$store.dispatch('initUserInfo');
        this.phone = this.$store.state.userInfo.userInfo.aName;
        this.encryptPhone = this.$store.state.userInfo.phoneNum;
      },
    },
    components: {
      TopHeader,Countdown,EditText,PasswordText
    }
  }
</script>

<style lang="scss" scoped>
  .top_tip {
    line-height: .75rem;
    font-size: .3rem;
    padding-left: .45rem;
  }

  .inpt {
    background: white;
    border-bottom: 1px solid #EFEFEF;
    height: 1.7rem;
    padding-left: .8rem;
  }

  .forget_box{
    background-color: #eeeeee;
  }

  .forget_box .veri{
    height: 1.7rem;
  }

  .inpt input {
    font-size: .48rem;
    width: 100%;
  }

  .forgetPsd .inpt .veri_input {
    font-size: .48rem;
    border: none;
    border-right: 1px solid rgba(26, 27, 57, 0.2);
  }

  .forget_box .inpt .input_password{
    margin-right: 1.6rem;
  }
  .forget_box .content{
    height: 1.7rem;
    margin-right: .8rem;
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
    margin-top: 4.2rem;
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: #5FCCC6;
  }
</style>
