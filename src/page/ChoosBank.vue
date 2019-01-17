<template>
  <transition name="fade" v-if="isShow">
    <div class="content" @touchmove.prevent>
      <div class="bg"></div>
      <ul class="info">
        <p class="header_bar"><i @click="setIsShow"></i>选择到账银行卡</p>
        <li v-for="(item,index) in banks" :class="{'choose_bank':index == selectIndex}" @click="clickItem(index)">
          <div class="banks_info">
            <img class="logo" :src='fileHost+item.url' />
            <p class="bank_type">{{item.partnerBankName}}(<span v-text="item.partnerBankCode.substring(15)"></span>)<span class="bank_type_title">储蓄卡</span></p>
            <img class="bank_default" src="../assets/images/icon_bank_default.png" alt="" v-if="index == selectIndex">
          </div>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
  import * as API from '../service/API';
  import Toast from '../widget/Toast';
  import Loading from '../components/Loading';

  export default {
    data(){
      return {
        fileHost: API.BASEURL+'/',
        selectIndex:this.defaultIndex
      }
    },
    props:{
      isShow:{type:Boolean,default:false},
      banks:{type:Array,default:[]},
      defaultIndex:0,
    },
    methods:{
      clickItem(index){
        this.selectIndex = index;
        this.$emit('chooseBank',this.selectIndex);
      },
      setIsShow(){
        this.$emit('setInviteChooseBank',!this.isShow);
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  .content {
    .bg {
      background-color: rgba(0, 0, 0, 0.5);
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 100000;
    }
    .info{
      width: 100%;
      position: fixed;
      height: 10.76rem;
      z-index: 100001;
      bottom: 0;
      background-color: white;
      li{
        padding-left: .5rem;
        font-size:0;
        .banks_info{
          display: -webkit-flex;
          display: flex;
          align-items: center;
          padding: .55rem .5rem .55rem 0;
          border-bottom: 1px solid #f0f0ef;
          .logo{
            width: .65rem;
            height: .65rem;
          }
          .bank_type{
            font-size: .48rem;
            color: $font_100;
            padding-left: .3rem;
            display:flex;
            align-items: flex-end;
          .bank_type_title{
            padding-left: .18rem;
            font-size: .36rem;
            color: #999999;
          }
          }
          .bank_default{
            width: .44rem;
            height: .38rem;
            margin-left: auto;
          }
        }
      }
      .choose_bank{
        background-color: #f5f5f5;
      }
      .header_bar{
        position: relative;
        padding: .6rem 0;
        font-size: .48rem;
        color: $font_100;
        text-align: center;
        i{
          position: absolute;
          left: .5rem;
          top: 50%;
          margin-top: -0.2rem;
          width: .4rem;
          height: .4rem;
          display: inline-block;
          background: url('../assets/images/withdrawal_rules_close_icon.png') no-repeat center;
          background-size: contain;
        }
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>

