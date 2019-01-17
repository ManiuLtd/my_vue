<template>
    <div class="basic">
      <div class="page_bg"></div>
      <top-header></top-header>
      <div style="height: 1.61rem;"></div>
      <div class="top_bg"></div>
      <div class="items">
        <div class="info">
          <img class="logo" src="../assets/images/icon_name.png"/>
          <span class="detail">姓名：{{userInfo.truename}}</span>
        </div>
        <div class="info">
          <img class="logo" src="../assets/images/icon_id_num.png"/>
          <span class="detail">身份证号：{{userInfo.identno}}</span>
        </div>
      </div>
      <span class="tips">提示：若修改认证类型，请联系您的客户经理。</span>
    </div>
</template>

<script>

  import TopHeader from '../components/TopHeader'
  import * as API from '../service/API';
  import Toast from '../widget/Toast';

    export default {
      data(){
        return {
          userInfo:{}
        }
      },
      methods:{
        getStoreInfo(){
          this.$get(API.PARTNER_INFO).then((response)=>{
              if(response.code == 200){
              this.userInfo = response.data;
            }else{
              new Toast(response.msg);

            }
          });
        },
      },
      activated(){
        this.getStoreInfo();
      },
      mounted() {},
      components:{
        TopHeader
      }
    }
</script>

<style lang="scss" scoped>
  .top_bg{
    width: 100%;
    height: 6.55rem;
    background: url("../assets/images/icon_certification.jpg") no-repeat;
    background-size: cover;
  }
  .items{
    margin-top: 0.2rem;
    background-color: white;
    .info{
      height: 1.76rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      .logo{
        padding-left: 0.96rem;
        width: 0.7rem;
        height: 0.7rem;
      }
      .detail{
        padding-left: 0.28rem;
        color: #1a1b39;
        font-size: 0.48rem;
      }
    }
  }
  .tips{
    color: #989898;
    font-size: 0.36rem;
    display: inline-block;
    margin-top: 0.3rem;
    margin-left: 0.98rem;
  }
</style>
