<template>
    <div>
      <div class="page_bg"></div>
      <top-header :title-txt="paypwdtitle"></top-header>
      <div class="isback" @click="isBack"></div>
      <div class="payPwdInput">
        <p class="payPwdInput_title" v-text="payPwdTitle"></p>
        <!-- 密码输入框 -->
        <van-password-input
          :value="value"
          :info="tip"
          @focus="showKeyboard = true"
        />

        <!-- 数字键盘 -->
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"
        />
      </div>
    </div>
</template>
<script>
  import * as API from '../service/API';
  import TopHeader from '../components/TopHeader'
  import { showDialog } from '../utils/RouterControl'
  import Toast from '../widget/Toast';
  import SuccessLoading from '../widget/sucess_loading/SuccessLoading'
  import { Dialog } from 'vant';

export default {
  data() {
      return {
        value: '',
        tip:'密码为 6 位数字',   //提示
        showKeyboard: true,
        payPwdTitle:'请输入交易密码',
        password:'',  //交易密码
        repassword:'', //再次输入交易密码
        paypwdtitle:'设置交易密码',
      }
  },
  mounted(){
    this.payPwdTitle = this.$route.params.payPwdTitle;
  },
  methods:{
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if(this.value.length==6){
        if(this.password == ''){  //首次输入交易密码
          this.password = this.value;
          this.value = '';
          this.payPwdTitle = '请再次输入交易密码';
        }else{   // 再次输入交易密码
          if(this.password == this.value){
            this.repassword = this.value;
            let data = {
              'password': this.password,
              'phone': this.$store.state.trade_passwd.phone,
              're_password': this.repassword
            };
            this.$post(API.SET_UP_TRADER_PASSWD,data).then((response)=>{
              if(response.code != 200){
                new Toast(response.msg).show();
                return;
              }else{
                new SuccessLoading('交易密码设置成功').show();
                this.$router.replace('/setting');
              }
            });
          }else {
            new Toast('两次密码不一致,请重新输入').show();
            this.password = '';
            this.repassword = '';
            this.value = '';
            this.payPwdTitle = '请输入交易密码';
          }
        }
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    isBack(){
      Dialog.confirm({
        title:'确定退出交易密码设置吗？',
        confirmButtonText:'是',
        cancelButtonText:'否'
      }).then(() => {
        this.$router.replace('/setting');
      }).catch(() => {

      });
    },
  },
  components:{TopHeader}
}
</script>
<style lang="scss" scoped>
  @import "../style/common.scss";
  .isback{
    width: 1.61rem;
    height: 1.61rem;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999999;
    background-color: transparent;
  }
  .payPwdInput{
    padding-top: 3.51rem;
    .payPwdInput_title{
      padding-bottom: .78rem;
      font-size: .6rem;
      text-align: center;
      color: $font_100;
    }
  }
</style>
