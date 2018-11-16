<template>
  <div>
    <form>
      <div class="login">
        <div class="title">
          <p>注册</p>
          <p>手机号将作为登录账号</p>
        </div>
        <div class="inpt phone">
          <edit-text input-hint="请输入11位手机号" input-type="number" v-on:sendInputContent="getAname"></edit-text>
        </div>
        <div class="inpt pwd">
          <password-text input-hint="请设置密码（6-16位）" class="input_password" v-on:sendInputContent="getPassWord"></password-text>
        </div>
        <div class="inpt repwd">
          <password-text input-hint="再次确认密码" class="input_password" v-on:sendInputContent="getAPassWord"></password-text>
        </div>
        <div class="inpt service">
          <edit-text input-hint="邀请码" input-type="text" v-on:sendInputContent="getServiceCode"></edit-text>
        </div>
        <div class="inpt veri">
          <input type="text" class="veri_input" v-model.trim="check_code" placeholder="短信验证码">
          <Countdown v-on:callBackRightClick="getCode" ref="ctdown"></Countdown>
        </div>
        <!--协议部分-->
        <p class="agreement">
          <van-checkbox v-model.trim="checked">
            <img id="img_chk" slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.normal"/>
            我已经阅读并同意
            <router-link to="/registerAgreement">
              <span style="color: #4cc3ad;font-size: .4rem;">《注册服务协议》</span>
            </router-link>
          </van-checkbox>
        </p>
      </div>
      <div class="img_btn">
          <img src="../assets/images/register_success.png" alt="">
          <span v-on:click="reg()">同意协议并注册</span>
      </div>
      <router-link to="/login">
        <span class="register">登录</span>
      </router-link>
    </form>
  </div>
</template>

<script>
  import * as API from '../service/API';
  import Toast from '../widget/Toast';
  import EditText from '../components/common/EditText'
  import PasswordText from '../components/common/PasswordText'
  import Countdown from '../components/Countdown'
  import Loading from '../widget/loading/loading'
  import eventBus from  '../utils/eventBus'

  export default {
    data(){
      return {
        a_name:'',
        pwd:'',
        a_pwd:'',
        service_code:'',
        check_code:'',
        checked:true,
        icon: {
          normal: '../../static/images/nocheck_out.png',
          active: '../../static/images/check_out.png'
        }
      }
    },
    methods:{
      getAname(v){
        this.a_name = v;
      },
      getPassWord(v){
        this.pwd = v;
      },
      getAPassWord(v){
        this.a_pwd = v;
      },
      getServiceCode(v){
        this.service_code = v;
      },
      reg(){
        if(!this.a_name){
          new Toast("请输入手机号").show();
          return;
        }
        if(!this.pwd){
          new Toast("请输入密码").show();
          return;
        }
        if(!this.a_pwd){
          new Toast("请输入确认密码").show();
          return;
        }

        if(this.pwd != this.a_pwd){
          new Toast("两次密码不一致").show();
          return;
        }

        if(!this.check_code){
          new Toast("短信验证码不能为空").show();
          return;
        }
        if(false == this.checked){
          new Toast("请勾选注册协议").show();
          return;
        }
        let data = {};
        data.a_name = this.a_name;
        data.pwd = this.pwd;
        data.a_pwd = this.a_pwd;
        data.service_code = this.service_code;
        data.check_code = this.check_code;
        let loading = new Loading();
        loading.show();
        this.$post(API.REG_PARTNER,data).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }
          this.$router.replace("/registerSuccess");
          loading.close();
        }).then((error)=>{
          loading.close();
        });
      },
      getCode(){
        if(!this.a_name){
          new Toast("请输入手机号").show();
          return;
        }
        let data = {};
        data.phone = this.a_name;
        data.type = 1;
        let loading = new Loading();
        loading.show();
        this.$post(API.SEND_CHECKCODE,data).then((response)=>{
          if(response.code == 200){//发送成功
            new Toast(response.msg).show();
            this.$refs.ctdown.startCountDown();
            return;
          }else{
            new Toast(response.msg).show();
            return;
          }
          loading.close();
        }).then((error)=>{
          loading.close();
        });
      }
    },
    destroyed(){
      eventBus.$emit('info',this.a_name);
    },
    components:{EditText,PasswordText, Countdown}
  }
</script>

<style lang="scss" scoped>
@import "../style/common";
@import "../style/login";
.title{
  margin-top: 1.1rem;
}
.inpt{
  margin-top: 1rem;
}
.login .veri{
  margin-top: .6rem;
}
.agreement{
  font-size:.4rem;
  color: $font_100;
  margin-top: .4rem;
}
.agreement img{
  padding-top: 0.1rem;
  width: 0.6rem;
  height: 0.6rem;
}
.input_password{
  margin-right: 0.8rem;
}
</style>
