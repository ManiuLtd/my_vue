<template>
  <div class="content">
    <img src="../assets/images/icon_review_logo.png"/>
    <div class="state">提交成功，认证中...</div>
    <div class="tips">大概需要1-3个工作日的审核时间,请耐心等待</div>
  </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        mounted () {
          var screenHeigt = window.screen.availHeight;
          document.getElementsByClassName('content')[0].style.height=screenHeigt+'px'
        },
    }
</script>
<style scoped>
  .content{
    background: url("../assets/images/review.jpg") no-repeat;
    background-size: cover;
  }
  .content img{
    width: 4.16rem;
    height: 1.17rem;
    margin-top: 4.8rem;
    margin-left: 1.08rem;
  }
  .content .state{
    margin-top: 1.27rem;
    color: white;
    font-size: 0.7rem;
    margin-left: 1.3rem;
  }
  .content .tips{
    margin-left: 1.3rem;
    color: white;
    margin-top: 0.38rem;
    font-size: 0.4rem;
  }
</style>
