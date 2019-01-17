<template>
  <transition name="fade" v-if="isShow">
    <div class="content" @touchmove.prevent>
      <div class="bg"></div>
      <div class="info">
        <img class="img-close" src="../assets/images/icon_close_share_vip.png" @click="setIsShow"/>
        <vue-qr :logoSrc="imageUrl" :margin="0" :text="codeValue" :logoScale="20" :size="200"></vue-qr>
        <span class="img-info">使用青松云商APP，扫码进店</span>
        <p class="info-content" style="margin-top: 0.6rem">
          <span>保存图片</span>
          <img class="save_arrow" src="../assets/images/icon_arrow_right.png"/>
        </p>
        <!--<span class="info-content" style="margin-top: 0.6rem">邀好友购买青松云商用户版APP会员</span>
        <span class="info-content" style="margin-top: 0.1rem">即可获得返现金额。</span>
       <div class="share">
          <div class="item">
            <img class="item_img" src="../assets/images/icon_weixin.png"/>
            <span class="item_info">微信</span>
          </div>
          <div class="item">
            <img class="item_img" src="../assets/images/icon_group.png"/>
            <span class="item_info">朋友圈</span>
          </div>
        </div>-->
      </div>
    </div>
  </transition>
</template>

<script>
  import VueQr from 'vue-qr';
  import * as API from '../service/API';
  export default {
    data() {
      return {
        codeValue:'',
        imageUrl: "../../static/images/store_logo.png"
      };
    },
    props:{
      isShow:{type:Boolean,default:false}
    },
    mounted(){
      this.qrcode();
    },
    methods:{
      setIsShow(){
        this.$emit('setInviteVIPIsShow',!this.isShow);
      },
      qrcode(){
        this.$get(API.CERTIFICATION).then((response)=>{
          if(response.code == 200){
            if((typeof response.data) == 'object'){
              if(response.data.inviteCode != null && response.data.inviteCode.length != 0){
                let text = API.BASEURL + '/index.html#Register?invite_code='+response.data.inviteCode;
                this.codeValue = text;
              }
            }
          }
        })
      },
    },
    components:{VueQr}
  }
</script>

<style lang="scss" scoped>
  .content{
    .bg{
      background-color: rgba(0,0,0,0.5);
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 100000;
    }
    .info{
      position: fixed;
      z-index: 100001;
      height: 10rem;
      width: 84%;
      left: 8%;
      border-radius: 0.25rem;
      background-color: white;
      top: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .img-close{
        margin: 0.3rem;
        display: block;
        width: 1.06rem;
        height: 1.06rem;
        align-self: flex-end;
      }
      div:nth-child(2){
        display: block;
        width: 4.83rem;
        height: 4.83rem;
        /deep/ img:first-child{
          width: 100%;
          height: 100%;
        }
      }
      .img-info{
        margin-top: 0.42rem;
        font-size: 0.36rem;
        color: #999999;
      }
      .info-content{
        display: flex;
        align-items: center;
        color: #666666;
        font-size: 0.4rem;
        .save_arrow{
          padding-left: 0.1rem;
          width: 0.2rem;
          height: 0.3rem;
        }
      }
      .share{
        margin-top: 0.8rem;
        display: flex;
        .item{
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-right: 1rem;
          padding-left: 1rem;
          .item_img{
            width: 1.4rem;
            height: 1.4rem;
          }
          .item_info{
            margin-top: 0.15rem;
            color: #5d5d5d;
            font-size: 0.36rem;
          }
        }
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>

