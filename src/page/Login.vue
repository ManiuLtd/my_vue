<template>
  <div>
    <div class="login">
      <div class="title">
        <p>登录</p>
        <p>欢迎来到青松云商</p>
      </div>
      <div class="inpt phone">
        <edit-text input-hint="请输入手机号" input-type="number" v-on:sendInputContent="getUsername"></edit-text>
      </div>
      <div class="inpt pwd">
        <password-text input-hint="请输入密码" class="input_password" v-on:sendInputContent="getPassWord"></password-text>
      </div>
      <router-link to="/forgetPwd?isLogin=0">
        <p class="text_right">忘记密码？</p>
      </router-link>
    </div>
    <div class="img_btn">
      <img src="../assets/images/register_success.png" />
      <span v-on:click="login()">登录</span>
    </div>
    <router-link to="/register" replace>
      <span class="register">注册</span>
    </router-link>
  </div>
</template>

<script>
  import * as API from '../service/API';
  import * as constant from '../utils/constant';
  import Toast from '../widget/Toast';
  import EditText from '../components/common/EditText'
  import PasswordText from '../components/common/PasswordText'
  import { loginRedirect } from '../utils/RouterControl';

  export default {
    data(){
      return{
        username:'',
        password:'',
      }
    },
    beforeRouteLeave(to,from,next){
      if(to.path == '/register'){
        this.$store.dispatch('setIsRefresh',true);
      }
      next();
    },
    mounted(){
      loginRedirect(this);
    },
    methods:{
      getUsername(value){
        this.username = value;
      },
      getPassWord(value){
        this.password = value;
      },
      login(){
        if(!this.username){
          new Toast("请输入手机号").show();
          return;
        }
        if(!this.password){
          new Toast("请输入密码").show();
          return;
        }
        if(!constant.REGULAR_PHONE.test(this.username)){
          new Toast("手机号格式有误").show();
          return;
        }
        let data = {};
        data._username = this.username;
        data._password = this.password;
        this.$post(API.LOGIN,data).then((response)=>{
          if(response.code != 200){
            new Toast(response.error).show();
            return;
          }
          this.loginSuccess(response);
        })
      },
      loginSuccess(data){
        if(data){
          let userInfo = { aName:data.cur_user.aName }
          this.$store.dispatch('setUserInfo',userInfo);
          loginRedirect(this);
          this.loginSuccessAndroid(data.cur_user.aName);
        }
      },

      loginSuccessAndroid(phoneNum){
        try {  //非 app 登录，无该方法，捕获异常，不要弹错误
          window.erock.erock_loginSuccess(phoneNum);
        }catch (e) {
          console.log('非app内登录，无法调取app方法')
        }
      }
    },
    components:{
      EditText,PasswordText
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/login";
  .input_password{
    margin-right: 0.8rem;
  }
</style>
