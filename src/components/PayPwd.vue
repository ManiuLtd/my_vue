<template>
  <transition name="fade">
    <div class="pay_content" v-if="isShowPay">
      <div class="pay_pwd">
        <div class="pay_head" @click="payPwdClose"><i></i>请输入交易密码</div>
        <p class="pay_title">提现</p>
        <p class="pay_showMoney">￥{{showMoney}}</p>
        <p class="pay_info">额外扣除￥{{poundage}}手续费</p>
        <van-password-input
          :value="payPwd"
          @focus="showKeyboard = true"
        />
        <p class="forget_pwd" @click="forgetPwd">忘记密码 ?</p>
      </div>
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
    </div>
  </transition>
</template>

<script>
  import * as API from '../service/API';
  import Toast from "../widget/Toast";
  import Loading from '../widget/global_loading/loading';
  import SuccessLoading from "../widget/sucess_loading/SuccessLoading";

  export default {
    props:{
      isShowPay:{default:false,type:Boolean},
      showMoney:{default:''},
      poundage:{default:''},
      bankCard:{default:''},
      cashType:{default:''}
    },
    data() {
      return {
        payPwd: '',
        showKeyboard: true //键盘抬起事件
      };
    },
    methods:{
      forgetPwd(){
        this.$emit('forgetPwd');
      },
      payPwdClose(){
        this.$emit('payPwdClose');
      },
      onInput(key) {
        this.payPwd = (this.payPwd + key).slice(0, 6);
        if(this.payPwd.length == 6){
          let data = {};
          data.password = this.payPwd;
          data.pay_amount = this.showMoney;
          data.bank_no = this.bankCard;
          data.cash_type = this.cashType;
          this.$post(API.PARTNER_VERIFY_PASSWD,data).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg).show();
              return;
            }else {
              this.$router.replace("/withdrawalsTip");
            }
          });
          this.isShowPay = false;
        }
      },
      onDelete() {
        this.payPwd = this.payPwd.slice(0, this.payPwd.length - 1);
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../style/common";
  .pay_content{
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 99999;
    justify-content: center;
    align-items: flex-start;
    color: $font_100;
  }
  .pay_pwd{
    width: 9.61rem;
    border-radius: .3rem;
    background-color: white;
    text-align: center;
    margin-top: 25%;
  }
  .pay_head{
    position: relative;
    border-bottom: 1px solid #dfdfdd;
    padding: .44rem .53rem;
    font-size: .48rem;
    text-align: center;
  }
  .pay_head i{
    position: absolute;
    width: .38rem;
    height: .38rem;
    top: 50%;
    margin-top: -.19rem;
    left: .53rem;
    display: inline-block;
    background: url("../assets/images/payPwd_close_icon.png") no-repeat center;
    background-size: cover;
  }
  .pay_title{
    font-size: .4rem;
    padding-top: .35rem;
  }
  .pay_showMoney{
    font-size: 1rem;
    font-weight: bold;
    padding: .15rem 0;
  }
  .pay_info{
    font-size: .36rem;
    color: #999999;
    padding-bottom: .9rem;
  }
  .pay_content /deep/ [class*=van-hairline]::after{
    border: 1px solid #dfdfdd;
  }
  .forget_pwd{
    padding: .26rem 0 .6rem;
    color: $main_grren;
    font-size: .4rem;
    text-align: right;
    margin-right: 15px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.8s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
