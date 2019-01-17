<template>
  <div class="content">
    <img id="logo" src="../assets/images/icon_logo_green.png"/>
    <div class="tips">
      <span>很抱歉</span>
      <span>您的认证被打回</span>
      <span>请重新认证！</span>
    </div>
    <p class="info">打回原因：
      <span v-text="failMsg"></span>
    </p>
    <router-link to="/storeCertification">
      <div class="img_btn" style="margin-top: 2.8rem;">
        <img src="../assets/images/register_success.png" alt="">
        <span>重新认证</span>
      </div>
    </router-link>
    <p class="sign_out" @click="signOut()">
      <span>退出登录</span>
    </p>
  </div>
</template>
<script>
  import { loginRedirect } from '../utils/RouterControl';
  import { showDialog } from '../utils/RouterControl'

    export default {
      data() {
          return {
            failMsg:'',
          };
      },
      mounted(){
        loginRedirect(this);
        this.failMsg = this.$store.state.userInfo.userInfo.check_feedback;
      },
      methods:{
        signOut(){
          showDialog(this);
        },
      },
      beforeRouteLeave (to, from, next) {
        if(to.path == '/storeCertification'){
          this.$store.dispatch('setIsRefresh',true);
        }
        next();
      },
    }
</script>
<style lang="scss" scoped>
  @import "../style/common.scss";
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
    margin: 0 1.26rem;
  }
</style>
