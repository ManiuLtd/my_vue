<template>
  <div class="basic">
    <div class="page_bg"></div>
    <top-header title-txt="基本信息"></top-header>
    <form class="content" onsubmit="return false" style="padding-bottom: 1.5rem">
      <div class="input_content" >
        <ul class="input_box">
          <li class="input_div">
            <label>姓名</label>
            <input type="text" readonly v-model.trim="aTrueName" placeholder="输入姓名" value="">
          </li>
          <li class="input_div">
            <label>身份证号</label>
            <input type="text" readonly v-model.trim="aIdentNo" placeholder="输入身份证号" value="">
          </li>
          <li class="input_div">
            <label>性别</label>
            <input readonly="readonly" v-model.trim="sex"  type="text" placeholder="" value="" >
          </li>
          <li class="input_div">
            <label>出生年月</label>
            <input type="text" placeholder="请选择" v-model.trim="birthday" readonly="readonly" value="" class="icon_input">
          </li>
          <li class="input_div">
            <label>年龄</label>
            <input type="text" readonly v-model.trim="age" placeholder="输入年龄" value="">
          </li>
          <li class="input_div" style="border: none;">
            <label>婚姻状况</label>
            <p class="active">
              <radio-button radio_name="active" @radioChange="radioChange(10);" :is-checked="isChecked.a"  radio_title="未婚" style="margin-right: 1rem;"></radio-button>
              <radio-button radio_name="active" @radioChange="radioChange(20);" :is-checked="isChecked.b" radio_title="已婚"></radio-button>
            </p>
          </li>
          <li class="input_div">
            <label style="visibility: hidden;">婚姻状况</label>
            <p class="active">
              <radio-button radio_name="active" :is-checked="isChecked.c" @radioChange="radioChange(30);" radio_title="丧偶" style="margin-right: 1rem;"></radio-button>
              <radio-button radio_name="active" :is-checked="isChecked.d" @radioChange="radioChange(40);" radio_title="离异"></radio-button>
            </p>
          </li>
          <li class="input_div">
              <label>居住地址</label>
              <input type="text" v-model.trim="address" placeholder="请选择" readonly="readonly" value="">
          </li>
          <li class="input_div">
            <label>详细地址</label>
            <input type="text" v-model.trim="formData.live_address" readonly placeholder="输入详细地址" value="">
          </li>
          <li class="input_div">
            <label>住宅电话</label>
            <input type="number" v-model.trim="formData.home_phone" placeholder="输入电话" value="" :oninput="oninputContent">
          </li>
          <li class="input_div">
            <label>电子邮箱</label>
            <input type="text" v-model.trim="formData.email" placeholder="输入邮箱" value="">
          </li>
          <li class="input_div" >
            <label>教育程度</label>
            <input type="text" v-model.trim="degree" @click="showEdu" placeholder="请选择" readonly="readonly" value="" class="icon_input">
            <i class="icon_arrow"></i>
          </li>
          <li class="input_div">
            <label>共同居住人</label>
            <input type="text" v-model.trim="formData.together_live_person" placeholder="输入共同居住人" value="">
          </li>
        </ul>
      </div>
      <p class="must_title"></p>
    </form s>
    <span @click="submit" :class="bottom_btn_style">保存</span>
    <van-popup v-model.trim="isShowEdu" position="bottom">
      <van-picker
              show-toolbar
              :columns="columns"
              @confirm="onConfirm"
              @cancel="isShowEdu = false"
              @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
  import TopHeader from '../../components/TopHeader'
  import RadioButton from '../../components/common/RadioButton.vue'
  import * as API from '../../service/API'
  import Toast from '../../widget/Toast';
  import idCard from '../../utils/idCard'
  import SuccessLoading from '../../widget/sucess_loading/SuccessLoading'
  import * as constant from '../../utils/constant';

  export default {
    name: "BasicInfomation",
    data(){
      return {
          aTrueName: '',
          aIdentNo: '',
          sex: '',
          age: '',
          birthday: '',
          address: '',
          degree: '',
          oninputContent:constant.INPUTTYPE_NUMBER,
          columns:[],
          columnsObj:{},
          isChecked: {a:false,b:false,c:false,d:false},
          isShowEdu: false,
          formData: {
              marital_status: '',
              provinces: '',
              city: '',
              area: '',
              live_address: '',
              home_phone: '',
              email: '',
              degree: '',
              together_live_person: '',
          },
        clientHeight:document.documentElement.clientHeight,
        bottom_btn_style:'btn_fixed'
      }
    },
    methods: {
      resizeWindow(){
        window.onresize = ()=>{
          if(this.clientHeight>document.documentElement.clientHeight) {
            this.bottom_btn_style = "btn_margin";
          }else{
            this.bottom_btn_style = "btn_fixed";
          }
        }
      },
      showEdu(){
          this.isShowEdu = true;
      },
      onChange(picker, value, index) {},
      onConfirm(value, index){
          for (var i in this.columnsObj){
              if(this.columnsObj[i] == value){
                  this.formData.degree = i;
                  break;
              }
          }
          this.degree = value;
          this.isShowEdu = false;
      },
      submit: function () {
        this.$post(API.PARTNER_BASE_INFO,this.formData).then((response)=>{
          if(response.code != 200){
              new Toast(response.msg).show();
              return;
          }else if(response.code == 200){
              this.data = response.data;
              new SuccessLoading(response.msg).show();
              this.$router.replace('/basicInformation');
          }
        });
      },
      radioChange(value){
          let v = parseInt(value);
          this.formData.marital_status = v;
          switch (v) {
            case 10:
              this.isChecked.a = true;
              break;
            case 20:
              this.isChecked.b = true;
              break;
            case 30:
              this.isChecked.c = true;
              break;
            case 40:
              this.isChecked.d = true;
              break;
            default:
              break;
          }
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
                  this.sex = idCard.getSexByIdCard(response.data.aIdentNo);
                  this.birthday = idCard.getBirthdayByIdCard(response.data.aIdentNo);
                  this.degree = response.data.degree;

                  this.radioChange(response.data.aMaritalStatus);
                  this.columnsObj = response.data.edu;
                  this.columns = Object.keys(response.data.edu).map(function(el){
                      return response.data.edu[el];});
                  this.formData.provinces = response.data.aProvince;
                  this.formData.city = response.data.aCity;
                  this.formData.area = response.data.aCounty;
                  this.formData.live_address = response.data.aDetailAddress;
                  this.address = response.data.address;
                  this.formData.home_phone = response.data.aHomePhone;
                  this.formData.email = response.data.aiEmail;
                  this.formData.degree = response.data.aDegree;
                  this.formData.together_live_person = response.data.togetherLivePerson;
                  console.log(this.formData);
              }
          });
      }
    },
    mounted() {
      this.resizeWindow();
      this.getData();
    },
    destroyed(){
      window.onresize = null;
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

  /*提交按钮*/
  .btn_fixed{
    position: fixed;
    bottom: 0;
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: #5FCCC6;
  }

  .btn_margin{
    margin-top: -1.25rem;
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: #5FCCC6;
  }
</style>
