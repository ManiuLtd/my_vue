<template>
  <div class="basic">
    <div class="page_bg"></div>
    <top-header father-right='<i class="basicInformation_edit"></i>' @callBackRightClick="editBasic"></top-header>
    <div class="basic_input_content">
      <ul class="basic_input_box">
        <li class="basic_info">
          <span class="basic_age" v-text="age_marital_status" v-if="marital_status!=''&& marital_status!=null"></span>
          <span class="basic_age" v-text="age" v-else=""></span>
          <p class="basic_name">
            <span v-text="aTrueName"></span>
            <span v-text="sex"></span>
          </p>
        </li>
        <li style="padding-top: .5rem;">
          <p class="basic_title">
            <img src="../../assets/images/icon_id_card.png" alt="">
            <span>身份证号</span>
          </p>
          <p class="basic_input_info" v-text="aIdentNo"></p>
        </li>
        <li>
          <p class="basic_title">
            <img src="../../assets/images/icon_date_of_birth.png" alt="">
            <span>出生日期</span>
          </p>
          <p class="basic_input_info" v-text="birthday"></p>
        </li>
        <li>
          <p class="basic_title">
            <img src="../../assets/images/icon_address.png" alt="">
            <span>居住地址</span>
          </p>
          <p class="basic_input_info" v-text="detailed_residential_address"></p>
        </li>
        <li v-if="home_phone!=''&&home_phone!=null">
          <p class="basic_title">
            <img src="../../assets/images/icon_telephone.png" alt="">
            <span>住宅电话</span>
          </p>
          <p class="basic_input_info" v-text="home_phone"></p>
        </li>
        <li v-if="email!=''&&email!=null">
          <p class="basic_title">
            <img src="../../assets/images/icon_email.png" alt="">
            <span>电子邮箱</span>
          </p>
          <p class="basic_input_info" v-text="email"></p>
        </li>
        <li v-if="degree!=''&&degree!=null">
          <p class="basic_title">
            <img src="../../assets/images/icon_education_level.png" alt="">
            <span>教育程度</span>
          </p>
          <p class="basic_input_info" v-text="degree"></p>
        </li>
        <li v-if="together_live_person!=''&&together_live_person!=null">
          <p class="basic_title">
            <img src="../../assets/images/icon_cohabitant.png" alt="">
            <span>共同居住人</span>
          </p>
          <p class="basic_input_info" v-text="together_live_person"></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import TopHeader from '../../components/TopHeader'
  import RadioButton from '../../components/common/RadioButton.vue'
  import * as API from '../../service/API'
  import idCard from '../../utils/idCard'

  export default {
    name: "BasicInfomation",
    data(){
      return {
        aTrueName: '',
        aIdentNo: '',
        sex: '',
        age: '',
        birthday: '',
        address_data:'',
        address:'',
        marital_status: '',
        provinces: '',
        city: '',
        area: '',
        live_address: '',
        home_phone: '',
        email: '',
        degree: '',
        together_live_person: '',
        detailed_residential_address:'',  //居住详细地址
        age_marital_status:'',   //年纪+婚姻状况
      }
    },
    methods: {
      editBasic(){
        this.$router.push('/basicInformationEdit');
      },
      submit: function () {
        this.$post(API.PARTNER_BASE_INFO,this.formData).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else if(response.code == 200){
            this.data = response.data
          }
        })
      },
      getData(){
        this.$get(API.PARTNER_BASE_INFO).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else if(response.code == 200){
            this.aTrueName = response.data.aTrueName;
            this.aIdentNo = response.data.aIdentNo;
            this.age = idCard.getAgeByIdCard(response.data.aIdentNo);
            this.sex = "("+idCard.getSexByIdCard(response.data.aIdentNo)+")";
            this.birthday = idCard.getBirthdayByIdCard(response.data.aIdentNo);
            this.marital_status = response.data.maritalStatus;
            this.provinces = response.data.aProvince;
            this.city = response.data.aCity;
            this.area = response.data.aCounty;
            this.address = response.data.address;
            this.live_address = response.data.aDetailAddress;
            this.home_phone = response.data.aHomePhone;
            this.email = response.data.aiEmail;
            this.degree = response.data.degree;
            this.together_live_person = response.data.togetherLivePerson;
            this.detailed_residential_address = this.address.replace(/\s*/g,"") + this.live_address;
            this.age_marital_status = this.age+'_'+this.marital_status;
          }
        })
      }
    },
    mounted() {
      this.getData();
    },
    components: {TopHeader,RadioButton}
  }
</script>

<style lang="scss" scoped>
  @import "../../style/common.scss";
  @import "../../style/public.scss";
  .basic_input_content{
    padding: 1.62rem .5rem 0;
    background-color: white;
  }
  .basic_input_box li{
    padding: .35rem .35rem;
  }
  .basic_input_box li:last-child{
    padding-bottom: .58rem;
  }
  .basic_input_box .basic_info{
    position: relative;
    padding: .51rem 0;
    font-size: 0;
    border-bottom: 1px solid #F1F1F1;
  }
  .basic_input_box .basic_info .basic_age,.basic_name{
    display: inline-block;
  }
  .basic_input_box .basic_info .basic_age{
    width: 2.33rem;
    height: .88rem;
    border-radius: .5rem;
    background-color: #FCB735;
    color: white;
    font-size: .4rem;
    text-align: center;
    line-height: .88rem;
  }
  .basic_input_box .basic_info .basic_name{
    position: absolute;
    left: 2.66rem;
    bottom: .56rem;
  }
  .basic_input_box .basic_info .basic_name span:first-child{
    font-size: .6rem;
    font-weight: 600;
    color: $font_100;
  }
  .basic_input_box .basic_info .basic_name span:last-child{
    color: #999999;
    font-size: .36rem;
    padding-left: .1rem;
  }
  .basic_input_box li .basic_title{
    font-size: 0;
  }
  .basic_input_box li .basic_title img{
    width: .42rem;
    height: .42rem;
  }
  .basic_input_box li .basic_title span{
    color: #999999;
    font-size: .36rem;
    vertical-align: middle;
    padding-left: .15rem;
  }
  .basic_input_box li .basic_input_info{
    font-size: .45rem;
    color: $font_100;
    padding-top: .25rem;
  }
  .basic .common_header /deep/ .basicInformation_edit{
    display: inline-block;
    width: 1.61rem;
    height: 1.61rem;
    background: url("../../assets/images/icon_basicInformation_edit.png") no-repeat center;
    background-size: cover;
  }
  .basic .common_header /deep/ .right{
    padding-right: 0!important;
  }
  .basic .common_header{
    border: none!important;
  }
</style>
