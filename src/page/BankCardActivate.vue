<template>
  <div class="content">
    <div class="page_bg"></div>
    <top-header title-txt="激活银行卡"></top-header>
    <div class="input_content">
      <p class="bar">请绑定实名认证本人的银行卡</p>
      <ul class="input_box">
        <li class="input_div">
          <label>持卡人</label>
          <input type="text" placeholder="请输入持卡人姓名" v-model.trim="userName" readonly="readonly">
        </li>
        <li class="input_div">
          <label>身份证号</label>
          <input type="text" placeholder="请输入身份证号" v-model.trim="bankIdCard" readonly="readonly">
        </li>
        <li class="input_div">
          <label>银行卡号</label>
          <input type="text" placeholder="请输入银行卡号" v-model.trim="bankCard" readonly="readonly">
        </li>
        <li class="input_div">
          <label>开户行</label>
          <input type="text" placeholder="开户行" v-model.trim="bank" readonly="readonly">
        </li>
        <li class="input_div">
          <label>手机号</label>
          <input type="text" placeholder="输入预留手机号" v-model.trim="bankPhone">
        </li>
        <li class="input_div">
          <label>设置为默认银行卡</label>
          <van-switch
            v-model="checked"
            :disabled="isDisable"
            size="20px"
            active-color="blcak"
          />
        </li>
      </ul>
    </div>
    <!--协议部分-->
    <div class="protocol">
      <p class="agreement">
        <van-checkbox v-model.trim="protocolChecked">
          <img id="img_chk" slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.normal"/>
        </van-checkbox>
        阅读并同意
        <router-link to="/storeService">
          <span class="protocol_agreement_span">《支付服务协议》</span>
        </router-link>
      </p>
    </div>
    <span :class="bottom_btn_style" @click="active">激活</span>
  </div>
</template>

<script>
  import TopHeader from '../components/TopHeader';
  import * as API from '../service/API';
  import * as constant from '../utils/constant';
  import Toast from '../widget/Toast';

  export default {
    data(){
      return{
        checked: '',
        protocolChecked:true,
        icon: {
          normal: '../../static/images/nocheck_out.png',
          active: '../../static/images/check_out.png'
        },
        clientHeight:document.documentElement.clientHeight,
        bottom_btn_style:'btn_fixed',
        bankInfo:[],
        bankCardNum:'',  // 银行卡数量
        isDefault:'',    //  是否为默认银行卡  1: 是，0: 不是
        isDisable: false,
        userName:'',
        bankIdCard:'',
        bankCard:'',
        bank:'',
        bankPhone:'',
      }
    },
    activated() {
      this.bankInfo = this.$route.params.bankdata;
      this.bankCard = this.bankInfo.partnerBankCode;
      this.bank = this.bankInfo.partnerBankName;
      this.bankPhone = this.bankInfo.partnerUserPhone;
      this.isDefault = this.bankInfo.partnerIsDefault;
      this.bankCardNum = this.$route.params.bankCardNum;
      this.getUserData();
      this.resizeWindow();
      this.isCheck();
    },
    methods:{
      resizeWindow(){
        window.onresize = ()=>{
          if(this.clientHeight>document.documentElement.clientHeight) {
            this.bottom_btn_style = "btn_margin";
          }else{
            this.bottom_btn_style = "btn_fixed";
          }
        }
      },
      active(){
        if(!this.bankPhone){
          new Toast("请输入手机号码").show();
          return;
        } if(!constant.REGULAR_PHONE.test(this.bankPhone)){
          new Toast("手机号格式有误").show();
          return;
        }else {
          let data = {};
          data.ident_no = this.bankIdCard;
          data.true_name = this.userName;
          data.card_no = this.bankCard;
          data.phone = this.bankPhone;
          data.bank_type = this.bankCode;
          data.bank_name = this.bankName;
          data.bank_id = this.bankInfo.bankId;
          data.is_default = this.checked ? 1 : 0;
          this.$post(API.BANK_MANAGE,data).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg).show();
              return;
            }else{
              data.trx_id = response.trx_id;
              this.$store.state.bind_card_info = data;
              this.$router.push({name:'addBankCardVeri',params:{phone:this.bankPhone}});
            }
          });
        }
      },
      getUserData(){
        this.$get(API.PARTNER_INFO).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg);
            return;
          }else{
            this.userName = response.data.truename;
            this.bankIdCard = response.data.identno;
          }
        });
      },
      isCheck(){
        if(this.isDefault == 1){ //  是否为默认银行卡  1: 是，0: 不是
          this.checked = true;
          this.isDisable = true;
        }else {
          if(this.bankCardNum && this.bankCardNum > 1){   // 判断是否为第一次绑卡
            this.checked = false;
            this.isDisable = false;
          }else {
            this.checked = true;
            this.isDisable = true;
          }
        }
      }
    },
    components:{
      TopHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  @import "../style/public.scss";
  .input_content{
    padding-top: 1.61rem;
    .bar{
      font-size: .36rem;
      color: #e36348;
      padding: .25rem .6rem;
      background-color: #fce5b4;
    }
  }
  .add_active img {
    width: .56rem;
    height: .56rem;
    margin-right: .15rem;
  }
  .add_active label {
    color: #4cc3ad;
    vertical-align: bottom;
  }
  .input_div /deep/ .van-switch{
    position: absolute;
    right: .5rem;
  }
  /*协议*/
  .protocol {
    padding-top: 0.3rem;
    padding-bottom: 1.5rem;
    background-color: #eeeeee;
  .agreement {
    padding-top: 0.3rem;
    padding-bottom: 1rem;
    display: flex;
    padding-left: 0.51rem;
    font-size: .4rem;
    color: rgba(26, 27, 57, 1);
  img {
    margin-right: .18rem;
    width: 0.83rem;
    height: 0.82rem;
  }
  }
  }
  /*提交按钮*/
  .btn_fixed{
    position: fixed;
    bottom: 0;
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: $main_grren;
  }
  .btn_margin{
    margin-top: -1.25rem;
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: $main_grren;
  }
  .input_content /deep/ .van-switch--on{
    background-color: $main_grren;
  }
</style>
