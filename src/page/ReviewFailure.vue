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
      <span v-text="failTime"></span>
    </p>
    <router-link to="/storeCertification">
      <div class="img_btn" style="margin-top: 3.4rem;">
        <img src="../assets/images/register_success.png" alt="">
        <span>重新认证</span>
      </div>
    </router-link>
  </div>
</template>
<script>
    import eventBus from  '../utils/eventBus';
    import Loading from '../widget/loading/loading';
    import * as API from '../service/API';
    import Toast from '../widget/Toast';
    export default {
      data() {
          return {
            failMsg:'',
            failTime:''
          };
      },
      created(){
        eventBus.$on('info',this.getFail);
      },
      mounted(){
        this.getPartnerInfo();
      },
      methods:{
        getFail(data){
          this.failMsg = data.failMsg;
          this.failTime = data.runTime;
        },
        getPartnerInfo(){
          let loading = new Loading();
          loading.show();
          this.$get(API.PARTNER_INFO).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg).show();
              return;
            }
            this.failMsg = response.data.check_feedback;
            //this.failTime = response.data.check_pass_time;
            loading.close();
          }).then((error)=>{
            loading.close();
          });
        }
      }
    }
</script>
<style scoped>
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
</style>
