<template>
  <div class="success">
    <p class="title"><img src="../assets/images/logo.png" alt="">注册成功</p>
    <p class="num">账号：<span v-text="a_name"></span></p>
    <p class="success_tip">恭喜您注册成功，请登录填写商户资料完成审核</p>
    <p class="success_tip"><span v-text="num"></span>秒后，自动跳转至登录页...</p>
    <router-link to="/login">
      <div class="btn">
          <img src="../assets/images/register_success.png" alt="">
          <p>立即登录</p>
      </div>
    </router-link>

  </div>
</template>
<script>

    export default {
        data() {
            return {
              a_name: this.$route.params.phone,
              num: 5
            };
        },
      mounted(){
        this.timer();
      },
      methods:{
        timer(){
          setTimeout(() => {
            if(this.num == 1){
              this.$router.replace('/login');
            }else {
              this.num --;
              this.timer()
            }
          },1000);
        },
      }
    }
</script>
<style scoped>
  .success{
    padding:4.77rem 1rem 0;
    color: rgba(26,27,57,1);
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
  .success .success_tip{
    font-size: .4rem;
    padding-top: .8rem;
  }
  .success p:nth-child(4){
    padding-top: 2rem;
    text-align: center;
    color: #999999;
  }
  .btn{
    position: relative;
    font-size: .48rem;
    color: #ffffff;
    text-align: center;
    margin-top: 2.2rem;
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
</style>
