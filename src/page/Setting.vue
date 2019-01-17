<template>
  <div class="shop_create_content">
    <div class="page_bg"></div>
    <top-header title-txt="设置" frouter="/main/mine"></top-header>
    <form class="content">
      <div class="input_content">
        <ul class="input_box">
          <router-link :to="{path:'/mineLoginPwd'}">
            <li class="input_div">
              <label>登录密码</label>
              <i class="icon_arrow"></i>
            </li>
          </router-link>
          <li class="input_div" @click="payPwd">
            <label>交易密码</label>
            <i class="icon_arrow"></i>
          </li>
          <li class="bar"></li>
          <li class="input_div">
            <label>邀请码</label>
            <input type="text" readonly="readonly"  v-model.trim="partnerInfo.invite_code">
          </li>
          <li class="input_div">
            <label>邀请人员</label>
            <input type="text" v-model.trim="partnerInfo.invite_name" readonly="readonly">
          </li>
          <li class="input_div">
            <label>系统版本</label>
            <input type="text" value="v1.0.1" readonly="readonly">
          </li>
          <li class="bar"></li>
          <li class="input_div add_active" @click="signOut()">
            <label>退出当前账号</label>
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>
<script>
  import * as API from '../service/API';
  import TopHeader from '../components/TopHeader';
  import { showDialog } from '../utils/RouterControl';
  import Toast from '../widget/Toast';

  export default {
    data() {
      return {
        partnerInfo:{},
        hasPayPwd:'',   // 是否有交易密码  1: 有 ,0: 没有
        bankCardNum: true,  //是否有默认银行卡  true: 有, false: 没有
        isActivation:'', // 默认银行卡是否激活  0为激活，1为停用
      };
    },
    methods:{
      getPartnerInfo(){
        this.$get(API.PARTNER_INFO).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return ;
          }
          this.partnerInfo = response.data;
        });
      },
      getHasPayPwd(){
        this.$post(API.PARTNER_HAS_TRADE_PASSWD).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return ;
          }
          this.hasPayPwd = response.has_trade_pwd;
        });
        this.$get(API.SET_UP_TRADER_PASSWD).then((res) => {
          if(res.code != 200){
            new Toast(res.msg).show();
            return
          }else {
            if(typeof res.default_bank != 'object' || res.default_bank == null){  //判断是否有银行卡
              this.bankCardNum = false;
            }else{
              this.bankCardNum = true;
              this.isActivation = res.default_bank.partnerAccountStatus;   // 默认银行卡是否激活  0为激活，1为停用
            }
          }
        })
      },
      payPwd(){
        if(this.bankCardNum){ // 有银行卡
          if(this.isActivation == 0){  // 银行卡已激活
            if(this.hasPayPwd == 0){
              this.$router.push({name:'payPwdSet',params:{payPwdTitle:'设置交易密码'}});
            }else if(this.hasPayPwd == 1){
              this.$router.push('/payPassword');
            }
          }else {
            new Toast("您还没有激活默认银行卡！").show();
            return;
          }
        }else {
          new Toast("您还没有默认银行卡！").show();
          return;
        }
      },
      signOut(){
        showDialog(this);
      },
    },
    activated(){
      this.getPartnerInfo();
      this.getHasPayPwd();
    },
    components: {TopHeader}
  };
</script>
<style lang="scss" scoped>
  @import "../style/createStore.scss";
  .content{
    padding-top: 1.62rem;
  }
  .add_active{
    text-align: center;
  }
  .add_active label {
    color: #4cc3ad;
    font-size: .48rem;
  }
  .input_div input[readonly='readonly']{
    color: #666666;
  }
</style>

