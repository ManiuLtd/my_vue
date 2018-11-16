<template>
    <div class="content">
        <img id="logo" src="../assets/images/icon_logo_green.png"/>
        <div class="tips">
          <span>恭喜您</span>
          <span>您的认证已通过</span>
          <span>快去创建店铺吧！</span>
        </div>
        <p class="info">认证时间：<span v-text="reviewTime"></span></p>
        <div class="img_btn" style="margin-top: 3.4rem">
          <router-link to="/createStore">
            <img src="../assets/images/register_success.png" alt="">
            <span>创建店铺</span>
          </router-link>
        </div>
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
            reviewTime:''
          };
      },
      created(){
        eventBus.$on('info',this.getInfo);
      },
      mounted(){
        this.getPartnerInfo();
      },
      methods:{
        getInfo(content){
          this.reviewTime = content.time;
        },
        getPartnerInfo(){
          let loading = new Loading();
          loading.show();
          this.$get(API.PARTNER_INFO).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg).show();
              return;
            }
            console.log(response);
            //this.failMsg = response.data.check_feedback;
            this.reviewTime = response.data.check_pass_time;
            loading.close();
          }).then((error)=>{
            loading.close();
          });
        }
      }
    }
</script>
<style scoped>
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
    color: $font_100;
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
