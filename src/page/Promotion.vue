<template>
  <div class="content">
    <div class="bg"></div>
    <transparent-header title-txt="邀请用户">
      <span slot="rightContent" class="header-right" @click="isShowInviteFriend = !isShowInviteFriend">邀请好友</span>
    </transparent-header>
    <div class="code_title">
      邀请APP新用户赚取现金
    </div>
    <div class="code_info">
      <vue-qr :logoSrc="imageUrl" :margin="0" :text="codeValue" :logoScale="20" :size="200"></vue-qr>
      <span class="code_tips">扫描二维码，注册为会员</span>
    </div>
    <div class="save_img">
      <span class="save_info">保存二维码图片到相册</span>
      <img class="save_arrow" src="../assets/images/icon_arrow_right.png"/>
    </div>
    <div class="options">
      <router-link to="/memberManagement">
        <div class="item">
            <img class="item_img" src="../assets/images/icon_member.png" style="width: 0.65rem;height: 0.61rem"/>
            <span class="item_info">会员管理</span>
        </div>
      </router-link>
      <router-link to="/cashBenefit">
        <div class="item">
          <img class="item_img" src="../assets/images/icon_cash_benefit.png" style="width: 0.64rem;height: 0.66rem"/>
          <span class="item_info">现金福利</span>
        </div>
      </router-link>
      <div class="item" @click="isShowInviteVIP = !isShowInviteVIP">
        <img class="item_img" src="../assets/images/icon_vip.png" style="width: 0.72rem;height: 0.59rem"/>
        <span class="item_info">邀请会员进店</span>
      </div>
    </div>
    <invite-friend :is-show="isShowInviteFriend" @setInviteFriendIsShow="setIsShowInviteFriend"></invite-friend>
    <invite-v-i-p :is-show="isShowInviteVIP" @setInviteVIPIsShow="setIsShowInviteVIP"></invite-v-i-p>
  </div>
</template>
<script>
  import VueQr from 'vue-qr';
  import * as API from '../service/API';
  import TransparentHeader from '../components/TransparentHeader';
  import InviteFriend from './InviteFriend';
  import InviteVIP from './InviteVIP'

  export default {
    data() {
      return {
        isShowInviteFriend:false,
        isShowInviteVIP:false,
        codeValue:'',
        imageUrl: "../../static/images/store_logo.png"
      };
    },
    mounted(){
      this.qrcode();
    },
    methods: {
      setIsShowInviteFriend(isShow){
        this.isShowInviteFriend = isShow;
      },
      setIsShowInviteVIP(isShow){
        this.isShowInviteVIP = isShow;
      },
      qrcode(){
        this.$get(API.CERTIFICATION).then((response)=>{
          if(response.code == 200){
            if((typeof response.data) == 'object'){
              if(response.data.inviteCode != null && response.data.inviteCode.length != 0){
                let text = API.BASEURL + '/user/user_reg.html?invitation_code='+response.data.inviteCode;
                this.codeValue = text;
              }
            }
          }
        })
      }
    },
    components:{
      TransparentHeader,InviteFriend,InviteVIP,VueQr
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    padding-top:2.63rem;
    .bg{
      position: fixed;
      background: url("../assets/images/invite_bg.jpg") no-repeat center;
      background-size: cover;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    .header-right{
      color: white;
      font-size: 0.4rem;
      padding-right: 0.36rem;
    }
    .code_title{
      border-top-left-radius: 0.15rem;
      border-top-right-radius: 0.15rem;
      margin: 0 0.47rem 0 0.47rem;
      background-color: #f3ca3b;
      color: white;
      font-size: 0.42rem;
      line-height: 1.21rem;
      text-align: center;
    }
    .code_info{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 0.47rem 0 0.47rem;
      background-color: white;
      border-bottom-left-radius: 0.15rem;
      border-bottom-right-radius: 0.15rem;
      div:first-child{
        margin-top: 1.59rem;
        width: 4.96rem;
        height: 4.96rem;
        /deep/ img:first-child{
          width: 100%;
          height: 100%;
        }
      }
      .code_tips{
        margin-top: 0.49rem;
        margin-bottom: 1.49rem;
        font-size: 0.36rem;
        color: #999999;
      }
    }
    .save_img{
      margin-top: 0.52rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .save_info{
        color: #1a1b39;
        font-size: 0.42rem;
      }
      .save_arrow{
        padding-top: 0.05rem;
        padding-left: 0.1rem;
        width: 0.2rem;
        height: 0.3rem;
      }
    }
    .options{
      margin: 1.4rem 1.45rem 0rem 1.5rem;
      display: flex;
      justify-content: space-between;
      .item{
        display: flex;
        flex-direction: column;
        align-items: center;
        .item_info{
          padding-top: 0.22rem;
          color: white;
          font-size: 0.32rem;
        }
      }
    }
  }

</style>
