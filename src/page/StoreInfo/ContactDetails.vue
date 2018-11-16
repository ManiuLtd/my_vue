<template>
  <div class="basic">
    <top-header father-right="编辑" @callBackRightClick="contactEdit"></top-header>
    <div class="card">
      <span class="c_name" v-text="contData.contactName"></span>
      <span class="c_sex" v-if="contData.sex">(<span v-text="contData.sex"></span>)</span>
    </div>
    <ul class="c_box">
      <li class="c_info">
        <p class="c_title">手机号</p>
        <p class="c_content" v-text="contData.phone"></p>
      </li>
      <li class="c_info">
        <p class="c_title">年龄</p>
        <p class="c_content" v-text="contData.age"></p>
      </li>
      <li class="c_info">
        <p class="c_title">身份证号</p>
        <p class="c_content" v-text="contData.identNo"></p>
      </li>
      <li class="c_info">
        <p class="c_title">居住地址</p>
        <p class="c_content" v-text="contData.liveAddress"></p>
      </li>
      <li class="c_info">
        <p class="c_title">职业</p>
        <p class="c_content" v-text="contData.profession"></p>
      </li>
    </ul>
  </div>
</template>

<script>
  import * as API from '../../service/API';
  import TopHeader from '../../components/TopHeader'
  import RadioButton from '../../components/common/RadioButton.vue'

  export default {
    name: "StoreInfo",
    data(){
      return{
        contData:{},
      }
    },
    mounted(){
      this.getcontData();
    },
    methods:{
      contactEdit(){
        sessionStorage.setItem('TMEP_MEG_INFO', JSON.stringify(this.contData));
        this.$router.push('/editContactInfo');
      },
      getcontData(){
        const msgInfo = JSON.parse(sessionStorage.getItem('TMEP_MEG_INFO'));
        this.contData = msgInfo;
      },
    },
    components: {TopHeader,RadioButton}
  }
</script>

<style lang="scss" scoped>
  @import "../../style/common.scss";
  @import "../../style/public.scss";
  .common_header{
    border: none!important;
  }
  .card{
    width: 100%;
    height: 3.1rem;
    line-height: 3.1rem;
    font-size: .6rem;
    color: $font_100;
    font-weight: 600;
    background: white url("../../assets/images/icon_contact_details.png") no-repeat center;
    background-size: contain;
    margin-top: 1.82rem;
  }
  .c_name{
    padding-left: 1.6rem;
  }
  .c_sex{
    font-size: .4rem;
    color: #999999;
  }
  .c_box{
    margin-top: .3rem;
  }
  .c_info{
    padding: .65rem 1rem;
    border-bottom: 1px solid #F1F1F1;
  }
  .c_title{
    font-size: .36rem;
    color: #999999;
  }
  .c_content{
    font-size: .48rem;
    color: $font_100;
  }
</style>
