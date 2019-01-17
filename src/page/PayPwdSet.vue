<template>
  <div class="payPwdContent">
    <div class="page_bg"></div>
    <top-header :title-txt="payPwdTitle"></top-header>
    <ul class="payInfo">
      <li>
        <p>银行卡</p>
        <p>{{bankName}}(尾号<span v-text="encryptBankCard"></span>)</p>
      </li>
      <li>
        <p>手机号</p>
        <p v-text="encryptPhone"></p>
      </li>
      <li>
        <p>验证码<input type="number" v-model.trim="check_code" class="veri_input" placeholder="输入验证码" :oninput="oninputContent"></p>
        <p><Countdown v-on:callBackRightClick="getCode" ref="ctdown"></Countdown></p>
      </li>
    </ul>
    <span :class="bottom_btn_style" @click="submit">验证</span>
  </div>
</template>
<script>
  import * as API from '../service/API';
  import TopHeader from '../components/TopHeader';
  import Countdown from '../components/Countdown';
  import * as constant from '../utils/constant';
  import Toast from '../widget/Toast';
  import SuccessLoading from '../widget/sucess_loading/SuccessLoading'

  export default {
    data() {
      return {
        phone:'',
        bankCode:'',
        bankName:'',
        check_code: "",
        encryptPhone:'',  // 加密手机号
        encryptBankCard:'', // 加密银行卡号
        payPwdTitle:'设置交易密码',
        oninputContent:constant.INPUTTYPE_NUMBER,
        bottom_btn_style:'btn_fixed'
      };
    },
    mounted(){
      this.getinfo();
      this.payPwdTitle = this.$route.params.payPwdTitle ? this.$route.params.payPwdTitle : '设置交易密码';
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
      getCode() {
        if (this.phone == '') {
          new Toast('请输入手机号码').show();
        } else if (!constant.REGULAR_PHONE.test(this.phone)) {
          new Toast('手机格式不正确').show();
        } else {
          this.$post(API.SEND_CHECKCODE, {phone: this.phone, type: 3}).then((response) => {
            if (response.code == 200) {
              new Toast(response.msg).show();
              this.$refs.ctdown.startCountDown();
              console.log(response);
              return;
            }else{
              new Toast(response.msg).show();
              return;
            }
          });
        }
      },
      getinfo(){
        this.$get(API.SET_UP_TRADER_PASSWD).then((res) => {
          if(res.code != 200){
            new Toast(res.msg).show();
            return
          }else {
            if(typeof res.default_bank != 'object' || res.default_bank == null){
              new Toast("没有默认银行卡！").show();
              return;
            }
            this.phone = res.default_bank.partnerUserPhone;
            this.bankCode = res.default_bank.partnerBankCode;
            this.bankName = res.default_bank.partnerBankName;
            this.encryptPhone = this.phone.substr(0,3)+'****'+this.phone.substring(7);
            this.encryptBankCard = this.bankCode.substr(this.bankCode.length-4);
          }
        })
      },
      submit(){
        this.$store.state.trade_passwd = {
          'phone' : this.phone,
          'check_code' : this.check_code,
        }
        if(!this.phone){
          new Toast('请输入手机号码').show();
          return;
        }else if(!constant.REGULAR_PHONE.test(this.phone)){
          new Toast("手机号格式有误").show();
          return;
        }else if(!this.check_code){
          new Toast('请输入短信验证码').show();
          return;
        }else {
          this.$post(API.SET_UP_TRADER_PASSWD,{verifiy_code: this.check_code}).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg).show();
              return;
            }else{
              this.$router.push({name:'payPwdSetInput',params:{payPwdTitle:this.payPwdTitle}});
            }
          });
        }
      },
    },
    components:{TopHeader,Countdown}
  }
</script>
<style lang="scss" scoped>
  @import "../style/common.scss";
  .payPwdContent{
  .payInfo{
    padding: 2.11rem .55rem 0;
  li{
    padding: .52rem .36rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .3rem;
    background-color: #dfdfdd;
    border-radius: .15rem;
    font-size: .48rem;
    color: $font_100;
  .veri_input{
    margin-left: .3rem;
    width: 4.4rem;
    background-color: transparent;
    font-size: .48rem;
  }
  input::-webkit-input-placeholder {
    color: #999999;
    font-size: .48rem;
  }
  }
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
  }
</style>
