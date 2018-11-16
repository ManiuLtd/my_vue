<template>
  <div class="success">
    <p class="title"><img src="../assets/images/logo.png" alt="">注册成功</p>
    <p class="num">账号：<span v-text="a_name"></span></p>
    <p>恭喜您注册成功，请登录填写商户资料完成审核</p>
    <router-link to="/login">
      <div class="btn">
          <img src="../assets/images/register_success.png" alt="">
          <p>立即登录</p>
      </div>
    </router-link>

  </div>
</template>
<script>
    import eventBus from  '../utils/eventBus'
    export default {
        data() {
            return {
              a_name:''
            };
        },
        created(){
          eventBus.$on('info',this.getName);
        },
        methods:{
          getName(name){
            this.a_name = name;
          },
        }
    }
</script>
<style scoped>
  .success{
    margin-top: 4.77rem;
    padding:0 1rem;
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
  .success p:nth-child(3){
    font-size: .4rem;
    color: #999999;
    margin-top: .8rem;
  }
  .btn{
    position: relative;
    padding: 0 .6rem;
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
    line-height: 1.15rem;
  }
  .btn img{
    width: 100%;
  }
</style>
