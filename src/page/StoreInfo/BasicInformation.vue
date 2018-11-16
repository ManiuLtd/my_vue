<template>
  <div class="basic">
    <top-header title-txt="基本信息" father-right="编辑" @callBackRightClick="editBasic"></top-header>
    <form class="content" onsubmit="return false">
      <div class="input_content">
        <ul class="input_box">
          <li class="input_div">
            <label>姓名</label>
            <input readonly="readonly" v-model.trim="aTrueName" type="text">
          </li>
          <li class="input_div">
            <label>身份证号</label>
            <input readonly="readonly" v-model.trim="aIdentNo" type="text">
          </li>
          <li class="input_div">
            <label>性别</label>
            <input readonly="readonly" v-model.trim="sex"  type="text" placeholder="" value="" >
          </li>
          <li class="input_div">
            <label>出生年月</label>
            <input readonly="readonly"  v-model.trim="birthday" type="text">
          </li>
          <li class="input_div">
            <label>年龄</label>
            <input readonly="readonly" v-model.trim="age" type="text">
          </li>
          <li class="input_div" style="border: none;">
            <label>婚姻状况</label>
            <input readonly="readonly" v-model.trim="marital_status" type="text">
          </li>
          <li class="input_div">
            <label>居住地址</label>
            <input readonly="readonly" v-model.trim="address" type="text">
          </li>
          <li class="input_div">
            <label>详细地址</label>
            <input readonly="readonly" v-model.trim="live_address"  type="text">
          </li>
          <li class="input_div">
            <label>住宅电话</label>
            <input readonly="readonly" v-model.trim="home_phone" type="text">
          </li>
          <li class="input_div">
            <label>电子邮箱</label>
            <input readonly="readonly" v-model.trim="email" type="text">
          </li>
          <li class="input_div">
            <label>教育程度</label>
            <input readonly="readonly" v-model.trim="degree" type="text">
          </li>
          <li class="input_div">
            <label>共同居住人</label>
            <input readonly="readonly" v-model.trim="together_live_person"  type="text">
          </li>
        </ul>
      </div>
      <p class="must_title"></p>
    </form>
  </div>
</template>

<script>

  import TopHeader from '../../components/TopHeader'
  import RadioButton from '../../components/common/RadioButton.vue'
  import * as API from '../../service/API'
  import idCard from '../../utils/idCard'
  import eventBus from  '../../utils/eventBus'
  import Loading from '../../widget/loading/loading'


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
      }
    },
    methods: {
      editBasic(){
        this.$router.push('/basicInformationEdit');
      },
      submit: function () {
        let loading = new Loading();
        loading.show();
        this.$post(API.PARTNER_BASE_INFO,this.formData).then((response)=>{
          if(response.code != 200){
              new Toast(response.msg).show();
              return;
          }else if(response.code == 200){
              this.data = response.data
          }
          loading.close();
        }).then((error)=>{
          loading.close();
        })
      },
      getData(){
        let loading = new Loading();
        loading.show();
        this.$get(API.PARTNER_BASE_INFO).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else if(response.code == 200){
            this.aTrueName = response.data.aTrueName;
            this.aIdentNo = response.data.aIdentNo;
            this.age = idCard.getAgeByIdCard(response.data.aIdentNo);
            this.sex = idCard.getSexByIdCard(response.data.aIdentNo);
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
          }
          loading.close();
        }).then((error)=>{
          loading.close();
        })
      }
    },
    mounted() {
      var screenHeigt = window.screen.availHeight;
      var topHeight = document.getElementsByClassName('common_header')[0].offsetHeight;
      document.getElementsByClassName('basic')[0].style.minHeight = screenHeigt - topHeight + 'px';
      document.getElementsByClassName('basic')[0].style.backgroundColor = '#eee';
      this.getData();
    },
    components: {TopHeader,RadioButton}
  }
</script>

<style lang="scss" scoped>
  @import "../../style/common.scss";
  @import "../../style/public.scss";
  @import "../../style/storeInfo.scss";
  .radio_input{
    display: flex;
    justify-content: space-between;
  }
  .active{
    display: inline-block;
    position: absolute;
    right: .5rem;
    font-size: .48rem;
    color: $font_100;
  }
</style>
