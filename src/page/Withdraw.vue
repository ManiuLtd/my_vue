<template>
  <div class="content">
    <div class="page_bg"></div>
    <top-header title-txt="提现"></top-header>
    <div class="bank-info">
      <span id="bank-type-title">到账银行卡</span>
      <div class="bank-type" @click="isChooseBank">
        <img :src='fileHost+defBankUrl' class="bank_img"/>
        <p class="bank_type_info">
          <span id="bank_name" v-text="defBankName"></span>
          <span id="bank_num">尾号(<span v-text="defBankCode"></span>)</span>
        </p>
        <img src="../assets/images/icon_arrow_gray_right.png" alt="" class="card_arrow">
      </div>
      <span id="money_box_title">提现金额</span>
      <div class="money_box">
        <span id="money_symbol">￥</span>
        <input placeholder="请输入提现金额(不少于10元)" v-model="extractCash" v-on:input="setWithdrawMoney"/>
      </div>
      <p class="error_tips" v-text="errorTips"></p>
      <div class="tips">
        <span>当前可提现金额</span>
        <span v-text="payAmount"></span>
        <span>元</span>
      </div>
    </div>
    <div class="withdraw_select">
      <div class="withdraw_title">
        <span class="withdraw_type">提现方式</span>
        <div class="withdraw_rule" @click="isShowRule = true">
          <span>提现规则</span>
          <img id="icon_arrow" src="../assets/images/icon_rule_arrow.png"/>
        </div>
      </div>
      <div class="type_select">
        <div class="type_item">
          <bank-radio-button :is-checked="radioChecked==1" radio_title="T+1工作日到账" @radioChange="bankRadioChange(1)"></bank-radio-button>
          <div class="time_arrival">
            <span>预计</span>
            <span v-text="t1Time"></span>
            <span>到账</span>
          </div>
        </div>
        <div class="type_item">
          <bank-radio-button :is-checked="radioChecked==3" radio_title="T+3工作日到账" @radioChange="bankRadioChange(3)"></bank-radio-button>
          <div class="time_arrival">
            <span>预计</span>
            <span v-text="t3Time"></span>
            <span>到账</span>
          </div>
        </div>
        <div class="type_item">
          <bank-radio-button :is-checked="radioChecked==7" radio_title="T+7工作日到账" @radioChange="bankRadioChange(7)"></bank-radio-button>
          <div class="time_arrival">
            <span>预计</span>
            <span v-text="t7Time"></span>
            <span>到账</span>
          </div>
        </div>
      </div>
    </div>
    <span :class="bottom_btn_style" @click="showPay">提现</span>
    <choos-bank :is-show="isShowChooseBank" @setInviteChooseBank="setIsShowChooseBank" @chooseBank="getchooseBankIndex" :banks="banks" :defaultIndex="defBankIndex"></choos-bank>
    <withdrawal-rules :is-show="isShowRule" @rulesClose="isClose"></withdrawal-rules>
    <pay-pwd :is-show-pay="isShowPay" :show-money="extractCash" :poundage="poundage" @payPwdClose="closePay" @forgetPwd="forgetPwd" :cash-type="radioChecked"></pay-pwd>
  </div>
</template>

<script>
  import * as API from '../service/API';
  import TopHeader from '../components/TopHeader';
  import BankRadioButton from "../components/BankRadioButton";
  import WithdrawalRules from './WithdrawalRules';
  import PayPwd from '../components/PayPwd'
  import Toast from "../widget/Toast";
  import Loading from '../widget/global_loading/loading';
  import SuccessLoading from "../widget/sucess_loading/SuccessLoading";
  import ChoosBank from './ChoosBank'
  export default {
    data(){
      return{
        fileHost: API.BASEURL+'/',
        isShowRule:false,
        isShowPay:false,   //输入支付密码框显示
        payAmount:'0.00',  // 可提现余额
        extractCash:'',  //提现金额
        poundage:'',         //手续费
        errorTips:'', // 错误提醒
        t1Time: '',
        t3Time: '',
        t7Time: '',
        radioChecked:'7',
        clientHeight:document.documentElement.clientHeight,
        bottom_btn_style:'btn_fixed',
        isShowChooseBank:false,   // 显示选择提现银行卡
        banks:[],   // 所有银行卡信息
        defBank:[],  // 默认银行卡信息
        defBankIndex:0,   //  默认银行卡索引值
        chooseBankIndex:'',   // 选择提现银行卡的索引值
        defBankCode:'',    // 默认银行卡号
        defBankName:'',   //默认银行
        defBankUrl:'',   //默认银行图片
      }
    },
    methods:{
      isClose(){
        this.isShowRule = false;
      },
      forgetPwd(){   // 点击忘记密码跳转
        this.$router.push('/tradePwd')
      },
      closePay(){
        this.isShowPay = false;
      },
      resizeWindow(){
        window.onresize = ()=>{
          if(this.clientHeight>document.documentElement.clientHeight) {
            this.bottom_btn_style = "btn_margin";
          }else{
            this.bottom_btn_style = "btn_fixed";
          }
        }
      },
      setWithdrawMoney(){
        if(!this.extractCash || this.extractCash == ''){
          return;
        }
        //第一个字符是小数点
        if(this.extractCash.substr(0, 1) === '.'){
          this.extractCash = "0.";
        }
        this.extractCash = this.extractCash.replace(/^0*(0\.|[1-9])/, '$1');//解决 粘贴不生效
        this.extractCash = this.extractCash.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
        this.extractCash = this.extractCash.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        this.extractCash = this.extractCash.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        this.extractCash = this.extractCash.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
        if (this.extractCash.indexOf(".") < 0 && this.extractCash !== "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          if (this.extractCash.substr(0, 1) === '0' && this.extractCash.length === 2) {
            this.extractCash = this.extractCash.substr(1, this.extractCash.length);
          }
        }
        // 输入内容错误提示
        if(Number(this.extractCash) < 10){
          this.errorTips = '提现金额不能小于10元';
        }else if(Number(this.extractCash) > Number(this.payAmount)){
          this.errorTips = '输入金额大于提现金额';
        }else {
          this.errorTips = '';
        }
      },
      testWithdrawMoney(){
        if(/^([1-9][0-9]{0,5})+(\.[0-9]{1,2})?$/.test(this.extractCash)){
          console.log("金额输入合法");
        }
      },
      bankRadioChange(v){
        this.radioChecked = v;
      },
      showPay(){
        if(this.extractCash == ''){
          new Toast('请输入提现金额').show();
          return;
        }else if(Number(this.extractCash) < 10){
          new Toast('提现金额不能少于10元').show();
          return;
        }else if(Number(this.extractCash) > Number(this.payAmount)){
          new Toast('提现金额不能大于当前可提现金额').show();
          return;
        }else if(this.radioChecked == 3){
          if(Number(this.extractCash) < 1000){
            this.poundage = 5;
          }else if(Number(this.extractCash) >= 1000){
            this.poundage = Number(this.extractCash) * 0.005;
          }
          this.isShowPay = true;
        }else if(this.radioChecked == 7){
          if(Number(this.extractCash) < 1000){
            this.poundage = 2;
          }else if(Number(this.extractCash) >= 1000){
            this.poundage = 0;
          }
          this.isShowPay = true;
        }else{
          this.isShowPay = true;
        }

      },
      getData(){
        this.$get(API.PARTNER_CASH_WITHDRAWAL).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else {
            this.payAmount = response.pay_amount;
            this.banks = response.banks;   // 全部银行卡信息
            this.defBank = this.banks.filter(function(item){   // 默认银行卡信息
              return item.partnerIsDefault == 1;
            });
            this.defBankIndex = this.banks.indexOf(this.defBank[0]);  // 获取默认银行卡的索引值
            this.defBankCode = this.defBank[0].partnerBankCode.substr(this.defBank[0].partnerBankCode.length-4);
            this.defBankName = this.defBank[0].partnerBankName;
            this.defBankUrl = this.defBank[0].url;
            this.t1Time = response.etr_1;
            this.t3Time = response.etr_3;
            this.t7Time = response.etr_7;
          }
        })
      },
      dateAdd(d){   //获取到账时间
        var startDate = new Date();
        startDate = +startDate + 1000*60*60*24*d;
        startDate = new Date(startDate);
        var nextStartDate = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate();
        return nextStartDate;
      },
      isChooseBank(){
        this.isShowChooseBank = true;
      },
      setIsShowChooseBank(isShow){
        this.isShowChooseBank = isShow;
      },
      getchooseBankIndex(i){
        this.chooseBankIndex = i;
        this.defBank = this.banks[i];
        this.defBankCode = this.defBank.partnerBankCode.substr(this.defBank.partnerBankCode.length-4);
        this.defBankName = this.defBank.partnerBankName;
        this.defBankUrl = this.defBank.url;
        this.isShowChooseBank = false;
      }
    },
    mounted(){
      // this.t3Time = this.dateAdd(3);
      // this.t7Time = this.dateAdd(7);
      this.resizeWindow();
      this.getData();
    },
    destroyed(){
      window.onresize = null;
    },
    components:{
      BankRadioButton,TopHeader,WithdrawalRules,PayPwd,ChoosBank
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    background-color: #eeeeee;
    .bank-info{
      padding:1.61rem 0.51rem 0;
      background-color: white;
      font-size:0;
      #bank-type-title{
        display: inline-block;
        color: #999999;
        font-size: 0.4rem;
        padding-top: .5rem;
      }
      .bank-type{
        display: flex;
        align-items: center;
        font-size: 0;
        height: 1.22rem;
        line-height: 1.22rem;
        position: relative;
        padding:.65rem 0 .8rem;
        .bank_img{
          position: absolute;
          width: 1.22rem;
          height: 1.22rem;
          top:50%;
          margin-top: -0.61rem;
          left: .1rem;
        }
        .bank_type_info {
          display: flex;
          align-items: baseline;
          font-size:0;
          #bank_name {
            color: #1a1b39;
            font-size: 0.48rem;
            padding-left: 1.93rem;
          }
          #bank_num {
            color: #999999;
            font-size: 0.36rem;
            padding-left: .17rem;
          }
        }
        .card_arrow{
          width: .18rem;
          height: .28rem;
          margin-left: auto;
        }
      }
      #money_box_title{
        color: #999999;
        font-size: 0.4rem;
      }
      .money_box{
        position: relative;
        border-bottom: 1px solid #dfdfdd;
        padding-bottom:.3rem;
        margin:.1rem 0 .3rem;
        #money_symbol{
          position: absolute;
          color: #1a1b39;
          font-size: 1.16rem;
          left: 0;
          top: -.08rem;
        }
        input{
          width: 75%;
          padding-left: 14%;
          font-size: 1rem;
          color: #1a1b39;
        }
        input::-webkit-input-placeholder{
          font-size: .4rem;
          line-height: normal;
        }
      }
      .error_tips{
        font-size: .32rem;
        color: #db6045;
      }
      .tips{
        padding:.3rem 0 .5rem;
        span:nth-child(1),span:nth-child(3){
          color: #999999;
          font-size: 0.4rem;
        }
        span:nth-child(2){
          color: #4cc3ad;
          font-size: 0.4rem;
        }
      }
    }
    .withdraw_select{
      margin-top: 0.27rem;
      background-color: white;
      .withdraw_title{
        display: flex;
        justify-content: space-between;
        padding-top: 0.38rem;
        padding-bottom: 0.38rem;
        .withdraw_type{
          padding-left: 0.51rem;
          font-size: 0.4rem;
          color: #999999;
        }
        .withdraw_rule{
          padding-right: 0.51rem;
          display: flex;
          align-items: center;
          span{
            padding-right: 0.2rem;
            color: #4CC3AD;
            font-size: 0.4rem;
          }
          #icon_arrow{
            padding-top: 0.02rem;
            display: inline-block;
            width: 0.18rem;
            height: 0.3rem;
          }
        }
      }
      .type_select{
        .type_item{
          border-top: 1px solid #eeeeee;
          padding: 0.45rem 0.51rem 0.45rem 0.51rem;
          font-size: 0.36rem;
          .time_arrival{
            padding-top: 0.25rem;
            span{
              color: #1a1b39;
            }
            span:nth-child(2){
              color: #db6045;
            }
          }
        }
      }
    }
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
