<template>
  <div>
    <div class="page_bg"></div>
    <top-header title-txt="设置"></top-header>
    <ul class="input_box">
      <router-link :to="{path:'/payPwdReviseInput'}">
        <li class="input_div">
          <label>修改交易密码</label>
          <i class="icon_arrow"></i>
        </li>
      </router-link>
      <li class="input_div" @click="setPayPwd">
        <label>找回交易密码</label>
        <i class="icon_arrow"></i>
      </li>
    </ul>
  </div>
</template>
<script>
  import * as API from '../service/API';
  import TopHeader from '../components/TopHeader'
  import { showDialog } from '../utils/RouterControl'

  export default {
    data() {
      return {}
    },
    methods:{
      setPayPwd(){
        this.$router.push({name:'payPwdSet',params:{payPwdTitle:'找回交易密码'}});
      }
    },
    components: {TopHeader}
  };
</script>
<style lang="scss" scoped>
  @import "../style/createStore.scss";
  .input_box{
    padding-top: 1.62rem;
  }
</style>

