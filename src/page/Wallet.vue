<template>
    <div class="content">
      <div class="page_bg"></div>
      <top-header father-right="交易明细" @callBackRightClick="titleRightClick"></top-header>
      <div class="wallet_info">
        <img class="icon_wallet" src="../assets/images/wallet_money.png"/>
        <div class="money">
          <div class="money_box">
            <span class="money">￥{{allbalance}}</span>
            <span class="money_tips">全部余额</span>
          </div>
          <div class="money_box">
            <span class="money">￥{{paybalance}}</span>
            <span class="money_tips">可提现金额</span>
          </div>
        </div>
      </div>
      <div class="options">
        <span class="withdraw" @click="withdraw">提现</span>
        <div class="rule">
          <span @click="isShowRule = true">提现规则</span>
          <img src="../assets/images/icon_rule_arrow.png"/>
        </div>
      </div>
      <withdrawal-rules :is-show="isShowRule" @rulesClose="isClose"></withdrawal-rules>
    </div>
</template>

<script>
  import * as API from '../service/API';
  import TopHeader from '../components/TopHeader';
  import WithdrawalRules from './WithdrawalRules';
  import Toast from "../widget/Toast";
  import Loading from '../widget/global_loading/loading';
  import SuccessLoading from "../widget/sucess_loading/SuccessLoading";

  export default {
    data(){
      return {
        isShowRule:false,
        allbalance:'0.00',   // 全部余额
        paybalance:'0.00',   // 可提现金额
      }
    },
    mounted() {
      this.getData();
    },
    methods:{
      titleRightClick(){
        this.$router.push('/billingRecord');
      },
      withdraw(){
        this.$router.push('/withdraw');
      },
      isClose(){
        this.isShowRule = false;
      },
      getData(){
        this.$get(API.PARTNER_WALLET).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else {
            this.allbalance = response.total_amount;
            this.paybalance = response.pay_amount;
          }
        })
      },
    },
    components:{
      TopHeader,WithdrawalRules
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    .wallet_info{
      height: 7.85rem;
      padding-top: 3rem;
      background-color: #ffffff;
      .icon_wallet{
        height: 2.67rem;
        width: 2.67rem;
        display: block;
        margin: 0 auto;
      }
      .money{
        margin-top: 1rem;
        width: 100%;
        display: flex;
        .money_box{
          width: 50%;
          display: flex;
          flex-direction: column;
          .money{
            display: block;
            text-align: center;
            font-size: 0.6rem;
            color: #1a1b39;
            font-weight: bold;
          }
          .money_tips{
            padding-top: 0.4rem;
            display: block;
            text-align: center;
            font-size: 0.4rem;
            color: #999999;
          }
        }
      }
    }
    .options{
      position: relative;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: #eeeeee;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .withdraw{
        margin: 1.6rem auto 0;
        display: block;
        width: 7.84rem;
        height: 1.91rem;
        font-size: 0.48rem;
        color: white;
        text-align: center;
        padding-top: 0.2rem;
        background: url("../assets/images/register_success.png") no-repeat;
        background-size: contain;
      }
      .rule{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          color: #1a1b39;
          font-size: 0.48rem;
        }
        img{
          position: absolute;
          top: 50%;
          margin-top: -0.13rem;
          left: 61%;
          height: 0.3rem;
          width: 0.18rem;
        }
      }
    }
  }
  .common_header /deep/ .right{
    color: rgba(26,27,57,1)!important;
  }
  .content /deep/ .rules_content{
    z-index: 99999;
  }
</style>
