<template>
  <div class="forget_box">
    <top-header title-txt="忘记密码"></top-header>
    <form action="" class="forgetPsd" style="margin-top: 1.61rem">
      <div class="top_tip">请输入您注册时使用的手机号</div>
      <div class="inpt phone">
        <input type="text" readonly="readonly" v-model="phone">
        <!--<edit-text input-hint="请输入手机号" input-type="number" v-on:sendInputContent="getPhone"></edit-text>-->
      </div>
      <div class="inpt pwd">
        <password-text input-hint="请输入新密码（6-16位）" class="input_password" v-on:sendInputContent="getPassWord"></password-text>
      </div>
      <div class="inpt repwd">
        <password-text input-hint="再次确认新密码" class="input_password" v-on:sendInputContent="getRePassWord"></password-text>
      </div>
      <div class="inpt veri">
        <input type="text" v-model.trim="check_code" class="veri_input" placeholder="短信验证码">
        <Countdown v-on:callBackRightClick="getCode" ref="ctdown"></Countdown>
      </div>
      <span @click="submit" class="preserve_btn">保存</span>
    </form>
  </div>
</template>

<script>
  import * as API from '../service/API'
  import LocalStorageUtils from '../utils/LocalStorageUtils';
  import TopHeader from '../components/TopHeader';
  import Countdown from '../components/Countdown'
  import EditText from '../components/common/EditText'
  import PasswordText from '../components/common/PasswordText'
  import Loading from '../widget/loading/loading'
  import Toast from "../widget/Toast";

  export default {
    data() {
      return {
        phone: "",
        pwd: "",
        re_pwd: "",
        check_code: "",
        btntxt: "获取验证码",
        reg: /^[0-9A-Za-z]{6,}$/
      }
    },
    methods: {
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
        let reg = 11 && /^1(([3|5|7|8][\d]{9})|(47|45)[\d]{8})$/;
        if (this.phone == '') {
          new Toast('请输入手机号码').show();
        } else if (!reg.test(this.phone)) {
          new Toast('手机格式不正确').show();
        } else {
            let loading = new Loading();
            loading.show();
            this.$post(API.SEND_CHECKCODE, {phone: this.phone, type: 2}).then((response) => {
              if (response.code == 200) {
                new Toast(response.msg).show();
                this.$refs.ctdown.startCountDown();
                return;
              }else{
                new Toast(response.msg).show();
                return;
              }
              loading.close();
            }).then((error) => {
              loading.close();
            });
        }
      },
      submit: function () {
        if(!this.phone){
          new Toast('请输入手机号码').show();
          return;
        }
        if (this.passwordValidate() && this.passwordCheckValidate()) {
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
      },
      setData(){
        let localStorageUtils = new LocalStorageUtils();
        this.userInfo = JSON.parse(localStorageUtils.getStore('userInfo'));
        this.phone = this.userInfo.aPhone;
       /* this.PhoneTitle = this.userInfo.aPhone.substr(0,3) + '****' + this.userInfo.aPhone.substring(7);*/
      },
    },
    mounted() {
      let screenHeigt = window.screen.availHeight;
      let topHeight = document.getElementsByClassName('common_header')[0].offsetHeight;
      document.getElementsByClassName('forget_box')[0].style.height = screenHeigt - topHeight + 'px';
      document.getElementsByClassName('forget_box')[0].style.backgroundColor = '#eee';
      this.setData();
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

  .forget_box .veri{
    height: 1.7rem;
  }

  .inpt input {
    width: 100%;
  }

  .forgetPsd .inpt .veri_input {
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
</style>
