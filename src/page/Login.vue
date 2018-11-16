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
      <router-link to="/forgetPwd">
        <p class="text_right">忘记密码？</p>
      </router-link>
    </div>
    <div class="img_btn">
      <img src="../assets/images/register_success.png" />
      <span v-on:click="login()">登录</span>
    </div>
    <router-link to="/register">
      <span class="register">注册</span>
    </router-link>
  </div>
</template>

<script>
  import * as API from '../service/API';
  import LocalStorageUtils from '../utils/LocalStorageUtils';
  import Toast from '../widget/Toast';
  import EditText from '../components/common/EditText'
  import PasswordText from '../components/common/PasswordText'
  import Loading from '../widget/loading/loading'
  import eventBus from  '../utils/eventBus'

  export default {
    data(){
      return{
        username:'',
        password:'',
      }
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
        let loading = new Loading('正在登录 ...');
        loading.show();
        let data = {};
        data._username = this.username;
        data._password = this.password;
        this.$post(API.LOGIN,data).then((response)=>{
          if(response.code == 500){
            new Toast(response.error).show();
            return;
          }
          loading.close();
          this.loginSuccess(response);
        }).then((error)=>{loading.close();})
      },
      loginSuccess(data){
        let cur_user = data.cur_user;
        let userInfo = data.userInfo;
        let fileHost = data.fileHost;
        let is_ident = data.is_ident; // 是否认证  无认证跳到认证页面
        if(true == is_ident){
          let partner = data.partner;
          if(partner){
            //审核状态【1.未申请 2.待审核 3.打回 4.拒绝 5.通过】，审核通过后启用
            let partnerStatus = partner.partnerStatus;
            if(5 == partnerStatus){
              let partnerName = partner.partnerName;
              if(partnerName){
                let localStorageUtils = new LocalStorageUtils();
                localStorageUtils.setStore('cur_user',cur_user);
                localStorageUtils.setStore('userInfo',userInfo);
                localStorageUtils.setStore('fileHost',fileHost);
                this.$router.replace('/main');
              }else {
                this.$router.replace('./reviewSuccess');
              }
            }else if(2 == partnerStatus){
              this.$router.replace('./reviewProcessing');
            }else if(3 == partnerStatus ){
              this.$router.replace('./reviewFailure');
            }else if(4 == partnerStatus){
              this.$router.replace('./reviewRefuse');
            }
          }else{
            this.$router.replace('./reviewSuccess');
          }
        }else {
          this.$router.replace('/loginSuccess');
        }
      }
    },
    destroyed(){
      eventBus.$emit('info',{name: this.username});
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
