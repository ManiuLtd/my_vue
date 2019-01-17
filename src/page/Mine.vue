<template>
  <div>
    <div class="header">
      <router-link to="/messageCenter">
        <p class="msg">
          <img src="/static/images/icon_read_msg.png">
          <span v-text="unreadMsg > 99 ? '99+' : unreadMsg" class="msg_unread_number" v-if="unreadMsg > 0"></span>
        </p>
      </router-link>
      <div class="info">
        <img src="../assets/images/icon_head_portrait.png" alt="">
        <p class="info_name">{{userInfo.truename}}<span style="font-size: .4rem;">{{userPhone}}</span></p>
        <p class="info_time">注册时间：{{userInfo.aAddTime}}</p>
      </div>
    </div>
    <ul class="list">
      <!--我的钱包-->
      <router-link to="/wallet">
        <li>
          <img src="../assets/images/icon_wallet.png" alt="">我的钱包
          <i class="icon_arrow"></i>
        </li>
      </router-link>
      <!--推广赚现金-->
      <router-link to="/promotion">
        <li>
          <img src="../assets/images/icon_promotion.png" alt="">推广赚现金
          <i class="icon_arrow"></i>
        </li>
      </router-link>
      <!--实名认证-->
      <router-link to="/certification">
        <li>
          <img src="../assets/images/icon_real_name.png" alt="">实名认证
          <i class="icon_arrow"></i>
        </li>
      </router-link>
      <!--银行卡管理-->
      <router-link to="/bankCardManage">
        <li>
          <img src="../assets/images/icon_bank_card.png" alt="">银行卡管理
          <i class="icon_arrow"></i>
        </li>
      </router-link>
      <!--设置-->
      <router-link to="/setting">
        <li>
          <img src="../assets/images/icon_set.png" alt="">设置
          <i class="icon_arrow"></i>
        </li>
      </router-link>
      <!--帮助与反馈-->
      <router-link to="/feedback">
        <li>
          <img src="../assets/images/icon_feedback.png" alt="">帮助与反馈
          <i class="icon_arrow"></i>
        </li>
      </router-link>
    </ul>
  </div>
</template>
<script>

  import * as API from '../service/API';
  import Toast from '../widget/Toast';

  export default {
    data() {
      return {
        unreadMsg: 0,
        userPhone: '',
        userInfo: {}
      }
    },
    methods: {
      getMessageRemind() {
        this.$get(API.message_remind).then((response) => {
          if (response.code == 200) {
            this.unreadMsg = response.msg_num;
          } else {
            new Toast(response.msg);

          }
        })
      }
    },
    activated() {
      this.getMessageRemind();
      this.$store.dispatch('initUserInfo');
      this.userPhone = this.$store.state.userInfo.phoneNum;
      this.userInfo = this.$store.state.userInfo.userInfo;
    }
  }
</script>
<style lang="scss" scoped>
  @import "../style/common";

  .header {
    height: 6rem;
    background: url("../assets/images/Background_img.jpg") no-repeat center;
    background-size: cover;
    box-sizing: border-box;
  }

  /*   消息提醒开始   */
  .msg {
    min-height: 1.1rem;
    position: relative;
    padding: .51rem .4rem 0 0;
  }

  .msg img {
    width: .7rem;
    height: .55rem;
    position: absolute;
    right: .8rem;
    bottom: 0;
  }

  .msg_unread_number {
    display: inline-block;
    width: .8rem;
    color: #fff;
    right: .05rem;
    bottom: .28rem;
    font-size: .6em;
    font-weight: 500;
    padding: 0 .25em;
    text-align: center;
    min-width: 1.4em;
    line-height: 1.4;
    position: absolute;
    border-radius: .7em;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #f44;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
  }

  /*   消息提醒结束  */
  /*   用户信息开始  */
  .info {
    position: relative;
    padding-top: 1rem;
    margin-left: 1.25rem;
    font-size: 0;
  }

  .info img {
    width: 1.2rem;
    height: 1.2rem;
    margin-right: .2rem;
  }

  .info .info_name {
    display: inline-block;
    font-size: .7rem;
    color: $font_100;
  }

  .info_time {
    position: absolute;
    left: 1.4rem;
    bottom: -.15rem;
    font-size: .3rem;
    color: white;
  }

  /*   用户信息结束  */
  /*   list开始   */
  .list {
    margin-top: .85rem;
    margin-bottom: 2rem;
  }

  .list li {
    position: relative;
    padding: .55rem 1.29rem;
    font-size: .48rem;
    color: $font_100;
    line-height: .7rem;
  }

  .list li a {
    color: $font_100;
  }

  .list li img {
    width: .7rem;
    height: .7rem;
    margin-right: .5rem;
  }

  .icon_arrow {
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
