<template>
    <div class="withdrawals_warp">
      <div class="page_bg"></div>
      <top-header title-txt="提现"></top-header>
      <div class="withdrawals_contant">
        <p class="withdrawals_icon"></p>
        <p class="withdrawals_title">提现申请已提交</p>
        <p class="withdrawals_time">预计2018-11-26倒账</p>
        <ul class="withdrawals_info">
          <li><span>提现手续费</span><span>￥5.00</span></li>
          <li><span>实际倒账金额</span><span>￥995.00</span></li>
          <li><span>到账银行卡</span><span>工商银行 尾号5589</span></li>
        </ul>
      </div>
      <div class="withdrawals_btn">完成</div>
    </div>
</template>
<script>
  import TopHeader from '../components/TopHeader'

    export default {
      data() {
          return {};
      },
      components: {TopHeader}
    }
</script>
<style lang="scss" scoped>
@import "../style/common.scss";
  .withdrawals_warp /deep/ .common_header{
    border: none;
  }
  .withdrawals_contant{
    padding: 1.61rem .5rem 0;
    background-color: white;
    overflow: hidden;
  }
  .withdrawals_contant .withdrawals_icon{
    width: 3.53rem;
    height: 2.4rem;
    background: url('../assets/images/withdrawalstip_icon.png') no-repeat center;
    background-size: cover;
    margin: .9rem auto .98rem;
  }
  .withdrawals_contant .withdrawals_title{
    font-size: .48rem;
    color: $font_100;
    text-align: center;
  }
  .withdrawals_time{
    font-size: .4rem;
    color: #999999;
    padding: .6rem 0 .4rem;
    border-bottom: 1px solid #dfdfdd;
    text-align: center;
  }
  .withdrawals_contant .withdrawals_info{
    padding: 0 .5rem .9rem;
  }
  .withdrawals_info li{
    display: flex;
    padding-top: .6rem;
    font-size: .4rem;
    color: #999999;
    justify-content: space-between;
  }
  .withdrawals_btn{
    margin: 1.1rem auto;
    width: 7.84rem;
    height: 1.91rem;
    background: url("../assets/images/register_success.png") no-repeat;
    background-size: cover;
    line-height: 1.18rem;
    text-align: center;
    font-size: .48rem;
    color: white;
  }
</style>
