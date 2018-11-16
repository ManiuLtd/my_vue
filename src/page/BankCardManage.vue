<template>
    <div>
      <top-header title-txt="银行卡管理"></top-header>
      <div class="backcard">
        <div class="name">
          <img class="logo" src="../assets/images/bank_logo.png"/>
          <span class="type">{{userInfo.aOpenBankName}}(储蓄卡)</span>
        </div>
        <span class="num">{{userInfo.aCardNo.substr(0,4)+'*******'+userInfo.aCardNo.substring(15)}}</span>
        <span class="account">账户名：{{'*'+userInfo.aTrueName.substr(1,2)}}</span>
      </div>
      <div class="tips">
        <span>温馨提示：</span>
        <span>1、银行卡必须为实名认证本人的银行卡;</span>
        <span>2、手机号必须为银行预留手机号；</span>
        <span>3、只能添加储蓄卡;</span>
        <span>4、若修改银行卡请联系您的客户经理。</span>
      </div>
    </div>
</template>

<script>

  import LocalStorageUtils from '../utils/LocalStorageUtils';
  import TopHeader from '../components/TopHeader'

    export default {
      data(){
        return {
          userInfo:{}
        }
      },
      methods:{
        setData(){
          let localStorageUtils = new LocalStorageUtils();
          this.userInfo = JSON.parse(localStorageUtils.getStore('userInfo'));
        }
      },
      mounted(){
        this.setData();
      },
      components:{
        TopHeader
      }
    }
</script>

<style lang="scss" scoped>
  .backcard{
    margin-left: 0.52rem;
    margin-top: 2.5rem;
    background: url("../assets/images/icon_bank_bg.png") no-repeat;
    background-size: cover;
    width: 9.7rem;
    height: 3.8rem;
    .name{
      display: flex;
      padding-top: 0.3rem;
      align-items: center;
      .logo{
        padding-left: 0.62rem;
        width: 0.88rem;
        height: 0.88rem;
      }
      .type{
        padding-left: 0.18rem;
        color: white;
        font-size: 0.4rem;
      }
    }
    .num{
      padding-left: 0.62rem;
      padding-top: 0.44rem;
      color: white;
      font-size: 0.52rem;
      display: block;
    }
    .account{
      padding-left: 0.65rem;
      padding-top: 0.26rem;
      display: block;
      font-size: 0.36rem;
      color: white;
    }
  }
  .tips{
    margin-top: 1rem;
    margin-left: 2.16rem;
    span{
      color: #989898;
      font-size: 0.36rem;
      display: block;
      padding-top: 0.2rem;
    }
  }
</style>
