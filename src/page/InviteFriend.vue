<template>
  <transition name="fade" v-if="isShow">
    <div class="content"  @touchmove.prevent>
      <div class="bg"></div>
      <div class="info">
        <span class="info-title">邀好友赢更多收益</span>
        <span class="info-tips">邀好友成功注册青松云商用户版APP</span>
        <div class="info-option">
          <div class="item" >
            <img class="item_img" src="../assets/images/icon_weixin.png"/>
            <span class="item_info">微信</span>
          </div>
          <div class="item">
            <img class="item_img" src="../assets/images/icon_group.png"/>
            <span class="item_info">朋友圈</span>
          </div>
        </div>
      </div>
      <img class="close" src="../assets/images/icon_invite_close.png" @click="setIsShow"/>
    </div>
  </transition>
</template>

<script>
    export default {
      props:{
        isShow:{type:Boolean,default:false}
      },
      methods:{
        setIsShow(){
          this.$emit('setInviteFriendIsShow',!this.isShow);
        },
      }
    }
</script>

<style lang="scss" scoped>
  .content{
    .bg{
      background-color: rgba(0,0,0,0.5);
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 100000;
    }
    .info{
      position: fixed;
      z-index: 100001;
      height: 7.2rem;
      top: 30%;
      width: 80%;
      margin-left: 10%;
      background-color: white;
      border-radius: 0.5rem;
      .info-title{
        margin-top: 1.4rem;
        text-align: center;
        display: block;
        font-size: 0.48rem;
        color: #1a1b39;
      }
      .info-tips{
        margin-top: 0.7rem;
        text-align: center;
        display: block;
        font-size: 0.36rem;
        color: #666666;
      }
      .info-option{
        margin: 1rem 0.8rem 0 0.8rem;
        display: flex;
        justify-content: space-around;
        .item{
          display: flex;
          flex-direction: column;
          align-items: center;
          .item_img{
            width: 1.4rem;
            height: 1.4rem;
          }
          .item_info{
            margin-top: 0.15rem;
            color: #5d5d5d;
            font-size: 0.36rem;
          }
        }
      }
      .close{

      }
    }
    .close{
      position: fixed;
      z-index: 100002;
      width: 1.01rem;
      height: 1.01rem;
      margin-left: 43%;
      top: 14.64rem;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
