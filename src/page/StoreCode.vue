<template>
  <div class="qr_content">
    <div class="top_header">
      <div class="left" v-on:click="goBank">
        <img src="../assets/images/back_left_blank_white.png"/>
      </div>
      <div class="title">商家二维码</div>
    </div>
    <div class="qr_img">
      <p class="qr_bar" v-text="partner_name"></p>
      <img src="../assets/images/qr_code.jpg" alt="">
      <p class="qr_title">扫描二维码，关注商家店铺</p>
    </div>
    <p class="qr_save">保存二维码图片到相册 <img src="../assets/images/icon_qr_white_arrow.png" alt=""></p>
  </div>
</template>
<script>
  import Loading from '../widget/loading/loading'
  import * as API from '../service/API'
  export default {
    data() {
      return {
        partner_name:'',
      };
    },
    methods:{
      goBank(){
        this.$router.go(-1);
      },
      getStoreName(){
        let loading = new Loading();
        loading.show();
        this.$get(API.SHOP_BASE_INFO).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }
          this.partner_name = response.data.partner.partnerName;
          loading.close();
        }).then((error)=>{
          loading.close();
        });
      },
    },
    mounted () {
      var screenHeigt = window.screen.availHeight;
      document.getElementsByClassName('qr_content')[0].style.height=screenHeigt+'px';
      this.getStoreName();
    },
  }
</script>
<style lang="scss" scoped>
  @import "../style/common";
  @import "../style/public";
  .qr_content{
    position: relative;
    display: flex;
    padding: 0 .45rem;
    background: url("../assets/images/qr_code_ban.jpg") no-repeat center;
    background-size: cover;
    justify-content: center;
    align-items: center;
  }
  /*   top_header头部开始   */
  .top_header{
    position: absolute;
    top: 0;
    background-color: transparent;
    border: 0;
  }
  .top_header .title{
    color: white;
  }
  /*   top_header头部结束*/
  .qr_img{
    position: relative;
    background: white;
    border-radius: 5px;
    overflow: hidden;
  }
  .qr_img .qr_bar{
    width: 100%;
    line-height: 1.2rem;
    font-size: .42rem;
    color: white;
    background-color: #F8D24E;
    text-align: center;
  }
  .qr_img img{
    width: 5.68rem;
    height: 5.68rem;
    margin: 1rem 1.7rem 1.7rem;
  }
  .qr_img .qr_title{
    width: 100%;
    position: absolute;
    bottom: .55rem;
    font-size: .36rem;
    text-align: center;
    color: $font_100;
  }
  .qr_save{
    position: absolute;
    font-size: .42rem;
    color: white;
    bottom: 1.05rem;
    padding-right: .35rem;
  }
  .qr_save img{
    position: absolute;
    width: .2rem;
    height: .3rem;
    top:50%;
    margin-top: -.15rem;
    right: 0;
  }
</style>
