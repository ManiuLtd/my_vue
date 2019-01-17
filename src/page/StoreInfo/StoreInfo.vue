<template>
    <div>
      <top-header title-txt="商户资料" frouter="/main"></top-header>
      <div class="top">
        <img class="logo" src="../../assets/images/store_logo.png"/>
        <div class="info">
          <span class="name" v-text="storeInfo.truename"></span>
          <span class="review_time">认证通过时间：{{checkPassTime}}</span>
        </div>
        <span class="type" v-if="storeType" v-text="storeType"></span>
      </div>
      <span class="tips">请及时完善商户详细信息</span>
      <div class="items">
        <router-link to="/basicInformation">
          <div class="items_info">
            <img src="../../assets/images/icon_store_basic_info.png" class="tips_icon"/>
            <div class="tips_info_box">
              <span class="tips_info">基本信息</span>
            </div>
        </div>
        </router-link>
        <router-link to="/contactList">
          <div class="items_info">
            <img src="../../assets/images/icon_contact_info.png" class="tips_icon"/>
            <div class="tips_info_box">
              <span class="tips_info">联系人信息</span>
            </div>
          </div>
        </router-link>
        <router-link to="/manageInfo">
          <div class="items_info">
            <img src="../../assets/images/icon_manage_info.png" class="tips_icon"/>
            <div class="tips_info_box">
              <span class="tips_info">经营信息</span>
            </div>
          </div>
        </router-link>
        <router-link to="/assetInfo">
          <div class="items_info">
            <img src="../../assets/images/icon_property_info.png" class="tips_icon"/>
            <div class="tips_info_box">
              <span class="tips_info">资产信息</span>
            </div>
          </div>
        </router-link>
        <router-link to="/loanInfo">
          <div class="items_info">
            <img src="../../assets/images/icon_loan_info.png" class="tips_icon"/>
            <div class="tips_info_box">
              <span class="tips_info">负债信息</span>
            </div>
          </div>
        </router-link>
        <router-link to="/uploadData">
          <div class="items_info">
            <img src="../../assets/images/icon_upload_ data.png" class="tips_icon"/>
            <div class="tips_info_box">
              <span class="tips_info">上传资料</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
</template>

<script>
  import * as API from '../../service/API';
  import TopHeader from '../../components/TopHeader'

    export default {
    data(){
      return {
        storeInfo:{},
        storeType:""  //类型 1=普通 2=信用 3=自营
      }
    },
    computed:{
      checkPassTime:function (){
        let result = '';
        let check_pass_time = this.storeInfo.check_pass_time;
        if(check_pass_time != null && check_pass_time.length != 0){
          result = check_pass_time.substr(0,10);
        }
        return result;
      }
    },
    methods:{
      getStoreInfo(){
        this.$get(API.PARTNER_INFO).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return ;
          }
          this.storeInfo = response.data;

          let partner_type  = this.storeInfo.partner_type;
          if(1 == partner_type){
            this.storeType = '普通商家';
          }else if(2 == partner_type){
            this.storeType = '信用商家';
          }else if(3 == partner_type){
            this.storeType = '自营商家';
          }else{
            this.storeType = false;
          }
        });
      }
    },
    activated(){
      this.getStoreInfo()
    },
    components: {TopHeader}
  }
</script>

<style lang="scss" scoped>
  .top{
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo{
      padding-left: 0.54rem;
      width: 1.03rem;
      height: 1.04rem;
    }
    .info{
      width: 60%;
      display: flex;
      flex-direction: column;
      .name{
        color: #4cc3ad;
        font-size: 0.3rem;
      }
      .review_time{
        color: #999999;
        font-size: 0.3rem;
      }
    }
    .type{
      display: inline-block;
      color: #ec7547;
      font-size: 0.3rem;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      height: 0.56rem;
      line-height: 0.56rem;
      text-align: center;
      border: 1px solid #ec7547;
      border-radius: 0.28rem;
      margin-right: 0.46rem;
    }
  }
  .tips{
    display: inline-block;
    font-size: 0.6rem;
    color: #1a1b39;
    padding-left: 0.54rem;
    padding-top: 0.72rem;
    font-weight: 600;
  }
  .items{
    margin-top: 0.38rem;
    .items_info{
      height: 1.66rem;
      padding-top: 0.5rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .tips_icon{
        margin-left: 0.56rem;
        width: 0.8rem;
        height: 0.8rem;
        margin-bottom: 0.25rem;
      }
      .tips_info_box{
        border-bottom: 1px solid #eeeeee;
        width: 80%;
        margin-top: .06rem;
        .tips_info{
          color: #1a1b39;
          font-size: 0.48rem;
        }
      }
    }
  }

</style>
