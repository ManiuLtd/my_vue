<template>
  <div class="content">
    <img id="logo" src="../assets/images/icon_logo_green.png"/>
    <div class="tips">
      <span>恭喜您</span>
      <span>您的认证已通过</span>
      <span>快去创建店铺吧！</span>
    </div>
    <p class="info">认证时间：<span v-text="reviewTime"></span></p>
    <div class="img_btn" style="margin-top: 2.8rem;">
      <router-link to="/createStore">
        <img src="../assets/images/register_success.png" alt="">
        <span>创建店铺</span>
      </router-link>
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
    data() {
      return {
        reviewTime: ''
      };
    },
    mounted() {
      loginRedirect(this);
      this.reviewTime = this.$store.state.userInfo.userInfo.check_pass_time;
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
  .content #logo {
    width: 4.16rem;
    height: 1.17rem;
    margin-top: 3.9rem;
    margin-left: 1.14rem;
  }
  .content span {
    display: block;
  }
  .tips {
    margin-top: 1rem;
    margin-left: 1.26rem;
  }
  .tips span {
    font-size: 0.7rem;
    color: $font_100;
    padding-top: .36rem;
  }
  .info {
    color: #999999;
    font-size: 0.4rem;
    margin-left: 1.26rem;
    margin-top: 0.48rem;
  }
  .info span {
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
