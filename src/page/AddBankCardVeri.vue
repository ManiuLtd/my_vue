<template>
    <div>
      <div class="page_bg"></div>
      <top-header title-txt="手机短信验证"></top-header>
      <div class="content">
        <p class="tip" v-if="bankPhone!=''">验证码已发送至<span v-text="bankPhone.substr(0,4)+'****'+bankPhone.substring(7)"></span>，请查收</p>
        <div class="inpt veri">
          <input type="number" class="veri_input" v-model.trim="check_code" placeholder="短信验证码" :oninput="oninputContent">
          <Countdown v-on:callBackRightClick="getCode" ref="ctdown"></Countdown>
        </div>
      </div>
      <span :class="bottom_btn_style" @click="submit">验证信息</span>
    </div>
</template>
<script>
  import * as API from '../service/API';
  import TopHeader from '../components/TopHeader';
  import * as constant from '../utils/constant';
  import Countdown from '../components/Countdown'
  import Toast from '../widget/Toast';

  export default {
    data() {
        return {
          bankPhone:'',
          check_code:'',
          bottom_btn_style:'btn_fixed',
        };
    },
    mounted(){
      this.bankPhone = this.$route.params.phone;
      this.$refs.ctdown.startCountDown();
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
      getCode(){
        let data = {};
        data.trx_id = this.$store.state.bind_card_info.trx_id;
        this.$post(API.BANK_SEND_SMS,data).then((response)=>{
          if(response.code == 200){//发送成功
            new Toast(response.msg).show();
            this.$refs.ctdown.startCountDown();
            return;
          }else{
            new Toast(response.msg).show();
            return;
          }
        })
      },
      submit(){
        let data = this.$store.state.bind_card_info;
        data.verifiy_code = this.check_code;

        this.$post(API.BANK_BIND_CONFIRM,data).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else{
            this.$router.push('/addBankCardSuccess');
          }
        })
      }
    },
    components:{
      TopHeader,Countdown
    }
  }
</script>
<style lang="scss" scoped>
  @import "../style/common.scss";
  @import "../style/public.scss";
  .content{
    padding-top: 1.61rem;
  }
  .tip{
    padding: .68rem 0;
    font-size: .36rem;
    color: $font_100;
    text-align: center;
    background-color: white;
    margin-bottom: .18rem;
  }
  .veri{
    background-color: white;
    font-size: 0;
    padding: .63rem .5rem;
  }
  .veri /deep/ .verification_code_box{
    float: right;
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
    background-color: $main_grren;
  }
  .btn_margin{
    margin-top: -1.25rem;
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: $main_grren;
  }
</style>
