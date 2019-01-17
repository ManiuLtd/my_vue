<template>
  <div class="tradePwd_box">
    <div class="page_bg"></div>
    <top-header title-txt="修改交易密码"></top-header>
    <div class="input_content" style="padding-top: 1.91rem">
      <ul class="input_box">
        <li class="input_div">
          <label>注册手机号</label>
          <input type="text" v-model="encryptPhone" readonly="readonly">
        </li>
        <li class="input_div">
          <label>姓名</label>
          <input type="text" readonly="readonly" v-model="userInfo.truename">
        </li>
        <li class="bar"></li>
        <li class="input_div">
          <label>身份证号</label>
          <input type="text" readonly="readonly" v-model="userInfo.identno">
        </li>
        <li class="input_div">
          <label>新密码</label>
          <input type="text" placeholder="输入6位数字新密码" v-model="pwd">
        </li>
        <li class="input_div">
          <label>确认密码</label>
          <input type="text" placeholder="再次输入密码" v-model="re_pwd">
        </li>
        <li class="input_div veri clear">
          <input type="number" v-model.trim="check_code" class="veri_input" placeholder="短信验证码" :oninput="oninputContent">
          <Countdown v-on:callBackRightClick="getCode" ref="ctdown"></Countdown>
        </li>
      </ul>
    </div>
    <span @click="submit" class="tradePwd_box_btn">保存</span>
  </div>
</template>

<script>
  import * as API from '../service/API'
  import LocalStorageUtils from '../utils/LocalStorageUtils';
  import * as constant from '../utils/constant';
  import TopHeader from '../components/TopHeader';
  import Countdown from '../components/Countdown'
  import Toast from "../widget/Toast";
  import Loading from '../widget/global_loading/loading';

  export default {
    data() {
      return {
        phone: "",
        encryptPhone:"",  //加密手机号
        userInfo:[],
        pwd: "",
        re_pwd: "",
        check_code: "",
        btntxt: "获取验证码",
        oninputContent:constant.INPUTTYPE_NUMBER,
        clientHeight:document.documentElement.clientHeight,  //可见区域的高
        reg: /^[0-9A-Za-z]{6,}$/,
      }
    },
    methods: {
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
            this.$post(API.PARTNER_MODIFY_PASSWD, {
              code: this.check_code,
              password: this.pwd,
              re_password: this.re_pwd
            }).then((response) => {
              if (response.code != 200) {
                new Toast(response.msg).show();
                return;
              }
              new Toast(response.msg).show();
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
        this.userInfo = this.$store.state.userInfo.userInfo;
      },
    },
    mounted() {
      this.setData();
    },
    components: {
      TopHeader,Countdown
    }
  }
</script>

<style lang="scss" scoped>
  .tradePwd_box{
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
  }
  .tradePwd_box .veri input{
    left: .5rem;
    text-align: left;
  }
  .tradePwd_box .veri input::-webkit-input-placeholder{
    text-align: left;
  }
  .veri /deep/ .verification_code_box{
    float: right;
  }
  .tradePwd_box .tradePwd_box_btn{
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: #5FCCC6;
    position: absolute;
    bottom: 0;
  }
</style>
