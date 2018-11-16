<template>
    <div>
      <div class="header">
        <router-link :to="{path:'/messageCenter'}">
           <p class="msg">
             <img src="../assets/images/icon_my_msg.png" alt="">
           </p>
        </router-link>
          <div class="info">
            <img src="../assets/images/icon_head_portrait.png" alt="">
            <p class="info_name">{{userInfo.aTrueName}}<span style="font-size: .4rem;">{{userPhone}}</span></p>
            <p class="info_time">注册时间：{{cur_user.aAddTime}}</p>
          </div>
       </div>
      <ul class="list">
        <li>
          <router-link :to="{path:'/certification'}">
            <img src="../assets/images/icon_real_name.png" alt="">实名认证
            <i class="icon_arrow"></i>
          </router-link>
        </li>
        <li>
          <router-link :to="{path:'/storeCode'}">
            <img src="../assets/images/icon_qr_code.png" alt="">商家二维码
            <i class="icon_arrow"></i>
          </router-link>
        </li>
        <li>
          <router-link :to="{path: '/inviteCode'}">
            <img src="../assets/images/icon_invitation_code.png" alt="">邀请注册码
            <i class="icon_arrow"></i>
          </router-link>
        </li>
        <li>
          <router-link :to="{path:'/bankCardManage'}">
            <img src="../assets/images/icon_bank_card.png" alt="">银行卡管理
            <i class="icon_arrow"></i>
          </router-link>
        </li>
        <li>
          <router-link :to="{path:'/setting'}">
            <img src="../assets/images/icon_set.png" alt="">设置
            <i class="icon_arrow"></i>
          </router-link>
        </li>
      </ul>
    </div>
</template>
<script>

  import LocalStorageUtils from '../utils/LocalStorageUtils';

  export default {
      data() {
          return {
            cur_user:{},
            userInfo:{}
          }
      },
      computed:{
        userPhone:function () {
          if (typeof this.cur_user.aName != "undefined") {
            return this.cur_user.aName.substr(0,3)+'****'+this.cur_user.aName.substring(7);
          } else {
            return '';
          }
        }
      },
      methods:{
        setData(){
          let localStorageUtils = new LocalStorageUtils();
          this.cur_user = JSON.parse(localStorageUtils.getStore('cur_user'));
          this.userInfo = JSON.parse(localStorageUtils.getStore('userInfo'));
        }
      },
      mounted(){
        this.setData();
      }
    }
</script>
<style lang="scss" scoped>
  @import "../style/common";
  .header{
    height: 6rem;
    background: url("../assets/images/Background_img.jpg") no-repeat center;
    background-size: cover;
    box-sizing: border-box;
  }
  /*   消息提醒开始   */
   .msg{
     padding: .51rem .4rem 0 0;
     text-align: right;
   }
   .msg img{
     width: .7rem;
     height: .55rem;
   }
  /*   消息提醒结束  */
  /*   用户信息开始  */
  .info{
    position: relative;
    padding-top: 1rem;
    margin-left: 1.25rem;
    font-size: 0;
  }
  .info img{
    width: 1.2rem;
    height: 1.2rem;
    margin-right: .2rem;
  }
  .info .info_name{
    display: inline-block;
    font-size: .7rem;
    color: $font_100;
  }
  .info_time{
    position: absolute;
    left: 1.4rem;
    bottom: -.15rem;
    font-size: .3rem;
    color: white;
  }
  /*   用户信息结束  */
  /*   list开始   */
  .list{
    margin-top: .85rem;
  }
  .list li{
    position: relative;
    padding: .55rem 1.29rem;
    font-size: .48rem;
    color: $font_100;
    line-height: .7rem;
  }
  .list li a{
    color: $font_100;
  }
  .list li img{
    width: .7rem;
    height: .7rem;
    margin-right: .5rem;
  }
  .icon_arrow{
    position: absolute;
    right: 1.29rem;
    top: 50%;
    margin-top: -.15rem;
    width: .2rem;
    height: .3rem;
    display: inline-block;
    background: url("../assets/images/icon_my_arrow.png") no-repeat center;
    background-size: cover;
  }
  /*   list结束   */
</style>
