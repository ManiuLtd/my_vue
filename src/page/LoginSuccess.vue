<template>
  <div class="success">
    <p class="title"><img src="../assets/images/logo.png" alt="">登录成功</p>
    <p class="num">账号：<span v-text="userName"></span></p>
    <p>恭喜您登录成功，请填写商户资料完成审核</p>
    <router-link to="/storeCertification">
      <div class="btn">
          <img src="../assets/images/register_success.png" alt="">
          <p>立即认证</p>
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
          userName:'',
        };
    },
    beforeRouteLeave (to, from, next) {
      if(to.path == '/storeCertification'){
        this.$store.dispatch('setIsRefresh',true);
      }
      next();
    },
    mounted(){
      loginRedirect(this);
      this.userName = this.$store.state.userInfo.phoneNum;
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
  .success{
    padding:4.77rem 1rem 0;
    color: $font_100;
  }
  .title{
    font-size: .7rem;
  }
  .title img{
    width: 1.15rem;
    height: 1.15rem;
    margin-right: .1rem;
  }
  .num{
    font-size: .65rem;
    margin-top: .95rem;
  }
  .success p:nth-child(3){
    font-size: .4rem;
    color: #999999;
    margin-top: .8rem;
  }
  .success p:nth-child(3) span{
    display: block;
    margin-top: .2rem;
  }
  .btn{
    position: relative;
    font-size: .48rem;
    color: #ffffff;
    text-align: center;
    margin-top: 3.28rem;
  }
  .btn p{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    line-height: 1.35rem;
  }
  .btn img{
    width: 100%;
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
    margin: 0 .26rem;
  }
</style>
