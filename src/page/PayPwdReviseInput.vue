<template>
    <div>
      <div class="page_bg"></div>
      <top-header title-txt="身份验证"></top-header>
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
        payPwdTitle:'请输入原交易密码',
        oldPassword:'',// 原交易密码
        password:'',  //交易密码
        repassword:'' //再次输入交易密码
      }
  },
  methods:{
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if(this.value.length==6){
        if(this.oldPassword == ''){  //输入原交易密码
          this.oldPassword = this.value;
          this.value = '';
          this.payPwdTitle = '请输入新交易密码';
        }else{
          if(this.password == ''){  // 输入新交易密码
            if(this.testStr(this.value)){
              new Toast('新密码不能是连续数字').show();
              this.value = '';
              this.payPwdTitle = '请输入新交易密码';
              this.tip = '不能是连续数字，请重新输入';
            }else{
              if(this.oldPassword == this.value){
                new Toast('新密码不能与当前密码一样').show();
                this.value = '';
                this.payPwdTitle = '请输入新交易密码';
                this.tip = '新密码与当前密码相同，请重新输入';
              }else {
                this.password = this.value;
                this.value = '';
                this.payPwdTitle = '请再次确认新交易密码';
                this.tip = '请再次输入，以确保密码';
              }
            }

          }else {
            if(this.password == this.value){
              this.repassword = this.value;
              let data = {
                'password': this.password,
                're_password': this.repassword,
                'old_password': this.oldPassword
              };
              this.$post(API.MODIFY_TRADER_PASSWD,data).then((response)=>{
                if(response.code != 200){
                  this.password = '';
                  this.repassword = '';
                  this.oldPassword = '';
                  this.value = '';
                  this.payPwdTitle = '请输入原交易密码';
                  this.tip = '密码为 6 位数字';
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
              this.payPwdTitle = '请输入新交易密码';
              this.tip = '两次密码不一致,请重新输入新交易密码';
            }
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
    testStr(s){
      let num = 1;
      let isRepeat = true;
      let str = s.toString();
      let len = str.length;
      for (let i = 0; i < len; i++) {
        let front = Number(s.substr(i, 1));
        let after = Number(s.substr(i+1, 1));
        if (front + 1 == after) {
          num++;
        }
       }
      return /^(\d)\1+$/.test('' + s) || num == len;
    }
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
  /deep/ .van-password-input__info{
    color: $main_grren;
  }
}

</style>
