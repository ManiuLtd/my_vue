<template>
  <div class="review_processing_content">
    <img src="../assets/images/icon_review_logo.png"/>
    <div class="state">提交成功，认证中...</div>
    <div class="tips">大概需要1-3个工作日的审核时间,请耐心等待</div>
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
  .review_processing_content{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: url("../assets/images/review.jpg") no-repeat;
    background-size: cover;
  }
  .review_processing_content img{
    width: 4.16rem;
    height: 1.17rem;
    margin-top: 4.8rem;
    margin-left: 1.08rem;
  }
  .review_processing_content .state{
    margin-top: 1.27rem;
    color: white;
    font-size: 0.7rem;
    margin-left: 1.3rem;
  }
  .review_processing_content .tips{
    margin-left: 1.3rem;
    color: white;
    margin-top: 0.38rem;
    font-size: 0.4rem;
  }
  .sign_out{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .36rem 0;
    color: white;
    font-size: 0.48rem;
    border:1px solid #ffffff;
    border-radius: .3rem;
    margin: 2.15rem 1.3rem;
  }
</style>
