<template>
  <div class="content">
    <img id="logo" src="../assets/images/icon_logo_green.png"/>
    <div class="tips">
      <span>很抱歉</span>
      <span>您的认证被拒绝</span>
    </div>
    <p class="sign_out" @click="signOut()">
      <span>退出登录</span>
    </p>
  </div>
</template>
<script>
    import { loginRedirect } from '../utils/RouterControl';
    import { showDialog } from '../utils/RouterControl'

    export default {
      mounted(){
        loginRedirect(this);
      },
      methods:{
        signOut(){
          showDialog(this);
        },
      }
    }
</script>
<style lang="scss" scoped>
  @import "../style/common.scss";
  .content{
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .content #logo{
    width: 4.16rem;
    height: 1.17rem;
    margin-top: 3.9rem;
    margin-left: 1.14rem;
  }
  .content span{
    display: block;
  }
  .tips {
    margin-top: 1rem;
    margin-left: 1.26rem;
  }
  .tips span{
    font-size: 0.7rem;
    color: #1a1b39;
    padding-top: .36rem;
  }
  .info {
    color: #999999;
    font-size: 0.4rem;
    margin-left: 1.26rem;
    margin-top: 0.48rem;
  }
  .info span{
    display: inline-block;
  }
  .sign_out{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .36rem 0;
    color: $main_grren;
    font-size: 0.48rem;
    border:1px solid $main_grren;
    border-radius: .3rem;
    margin: 2.9rem 1.26rem 0;
  }
</style>
