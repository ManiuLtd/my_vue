<template>
    <div class="qr_content">
      <div class="top_header">
        <div class="left" v-on:click="goBank">
          <img src="../assets/images/back_left_blank_white.png"/>
        </div>
        <div class="title">邀请注册码</div>
      </div>
      <div class="qr_img">
        <img src="../assets/images/qr_code.jpg" alt="">
        <p class="qr_title">扫描二维码，注册成为商城会员</p>
      </div>
      <p class="qr_save">保存二维码图片到相册 <img src="../assets/images/icon_qr_white_arrow.png" alt=""></p>
    </div>
</template>
<script>
    export default {
      data() {
          return {};
      },
      methods:{
        goBank(){
          this.$router.go(-1);
        }
      },
      mounted () {
        var screenHeigt = window.screen.availHeight;
        document.getElementsByClassName('qr_content')[0].style.height=screenHeigt+'px';
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
    padding: 1.7rem;
    border-radius: 5px;
  }
  .qr_img img{
    width: 5.68rem;
    height: 5.68rem;
  }
  .qr_img .qr_title{
    width: 5.68rem;
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
