<template>
  <div class="shop_create_content">
    <top-header title-txt="设置"></top-header>
    <form class="content">
      <div class="input_content">
        <ul class="input_box">
          <router-link :to="{path:'/mineLoginPwd'}">
            <li class="input_div">
              <label>登录密码</label>
              <i class="icon_arrow"></i>
            </li>
          </router-link>
          <li class="input_div">
            <label>系统版本</label>
            <input type="text" value="v1.0" readonly="readonly">
          </li>
          <li class="bar"></li>
          <li class="input_div">
            <label>服务编号</label>
            <input type="text" placeholder="输入服务编号" v-model.trim="partnerInfo.service_code">
          </li>
          <li class="input_div">
            <label>服务人员</label>
            <input type="text" v-model.trim="partnerInfo.service_name" readonly="readonly">
          </li>
          <li class="bar"></li>
          <li class="input_div add_active" @click="showDialog">
            <label>退出当前账号</label>
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>
<script>

  import * as API from '../service/API';
  import TopHeader from '../components/TopHeader'

  import Vue from 'vue';
  import { Dialog } from 'vant';
  Vue.use(Dialog);
  import Loading from '../widget/loading/loading'

  export default {
    data() {
      return {
        partnerInfo:{},
      };
    },
    methods:{
      getPartnerInfo(){
        let loading = new Loading();
        loading.show();
        this.$get(API.PARTNER_INFO).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return ;
          }
          console.log(response.data);
          this.partnerInfo = response.data;
          loading.close();
        }).then((error)=>{
          loading.close();
        });
      },
      showDialog(){
        Dialog.confirm({
          title:'退出当前账号'
        }).then(() => {
          this.signOut();
        }).catch(() => {
          // on cancel
        });
      },
      signOut(){
        let loading = new Loading();
        loading.show();
        this.$post(API.LOGOUT).then((response)=>{
          if(response.code == 200){
            this.$router.push("/login");
          }
          loading.close();
        }).then((error)=>{
          loading.close();
        });
      }
    },
    mounted() {
      var screenHeigt = window.screen.availHeight;
      var topHeight = document.getElementsByClassName('common_header')[0].offsetHeight;
      document.getElementsByClassName('shop_create_content')[0].style.minHeight = screenHeigt - topHeight + 'px';
      document.getElementsByClassName('shop_create_content')[0].style.backgroundColor = '#eee';
      this.getPartnerInfo();
    },
    components: {TopHeader}
  };
</script>
<style lang="scss" scoped>
  @import "../style/createStore.scss";
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

