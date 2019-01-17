<template>
  <div class="shop_create_content">
    <div class="page_bg"></div>
    <top-header title-txt="编辑活动"></top-header>
    <form class="content" onsubmit="return false">
      <div class="input_content">
        <ul class="input_box">
          <div v-for="(coupon,key) in formData">
            <li class="input_div">
              <label><span class="must">*</span>开始时间</label>
              <input readonly="readonly" type="text" name="start_time[]" placeholder="选择开始时间" @click="showTimePanel(key,1)" v-model.trim="coupon.pcStartTime">
            </li>
            <li class="input_div">
              <label><span class="must">*</span>结束时间</label>
              <input readonly="readonly" type="text" name="end_time[]" placeholder="选择结束时间" @click="showTimePanel(key,2)" v-model.trim="coupon.pcEndTime">
            </li>
            <li class="input_div">
              <label><span class="must">*</span>购满金额(元)</label>
              <input type="number" name="buy_up[]" placeholder="输入购满金额" v-model.trim="coupon.pcBuyUp" style="width: 53%;">
            </li>
            <li class="input_div">
              <label><span class="must">*</span>满减优惠金额(元)</label>
              <input type="number" name="buy_up_subtraction[]" placeholder="输入优惠金额" v-model.trim="coupon.pcBuyUpSubtraction"  style="width: 53%;">
            </li>
            <li class="input_div">
              <label><span class="must">*</span>状态</label>
              <p class="active">
                <radio-button radio_name="active" radio_val="1" @radioChange="getActivityState" :is-checked="coupon.isAble == 1" radio_title="启用" style="margin-right: 1rem;"></radio-button>
                <radio-button radio_name="active" radio_val="2" @radioChange="getActivityState" :is-checked="coupon.isAble == 2" radio_title="停用"></radio-button>
              </p>
            </li>
            <!--选择时间-->
            <van-popup v-model.trim="isShowTime" position="bottom">
              <van-datetime-picker type="datetime" v-model="currentDate" @confirm="timeConfirm" @cancel="isShowTime = false" />
            </van-popup>
          </div>
          <li class="bar"></li>
        </ul>
      </div>
      <p class="must_title"><span class="must">*</span>为必填项</p>
      <span @click="preserve" :class="bottom_btn_style">保存</span>

    </form>
  </div>
</template>
<script>
  import TopHeader from '../components/TopHeader';
  import RadioButton from '../components/common/RadioButton.vue';
  import * as API from '../service/API';
  import axios from 'axios';
  import moment from 'moment';
  import { Dialog } from 'vant'
  import DateUtils from '../utils/DateUtils';
  import Toast from '../widget/Toast';
  import SuccessLoading from '../widget/sucess_loading/SuccessLoading'

  export default {
    data(){
      return {
        activeName: '0',
        data:{},
        currentDate: new Date(),
        isShowTime: false, // 结束时间
        currentIndex: 0, // 结束时间
        currentType: 1, // 1=开始时间 2=结束时间
        activityState: '',  //状态：1.启用 2.停用
        formData:[],
        clientHeight:document.documentElement.clientHeight,
        bottom_btn_style:'btn_fixed'
      }
    },
    mounted() {
      this.resizeWindow();
      this.getActiveData();
      this.getContactList();
    },
    destroyed(){
      window.onresize = null;
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
      //  显示当前的活动信息
      getActiveData(){
        this.formData.push(JSON.parse(sessionStorage.getItem('SHOP_ACTIVE_INFO')));
        this.activityState = this.formData[0].isAble;
      },
      // 获取所有的活动信息
      getContactList(){
        this.$get(API.EDIT_SHOP_COUPON_INFO).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else if(response.code == 200){
            this.data = response.data.coupons;
          }
        })
      },
      getActivityState(val){   //  营业状态
        this.activityState = val;
      },
      showTimePanel(index,type){
        this.isShowTime = true;
        this.currentIndex = index;
        this.currentType = type;
      },
      //开始时间确认
      timeConfirm(val){
        this.isShowTime = false;
        var startTime = this.formData[this.currentIndex].pcStartTime;
        var endTime = this.formData[this.currentIndex].pcEndTime;
        if(this.currentType == 1){
          startTime = val;
        }else{
          endTime = val;
        }
        if(endTime && startTime){
          if(moment(startTime).isBefore(endTime)){
            if(this.currentType == 1){
              this.formData[this.currentIndex].pcStartTime = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
            }else{
              this.formData[this.currentIndex].pcEndTime = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
            }
          }else{
            new Toast('开始时间必须于小结束时间').show();
          }
        }else{
          if(this.currentType == 1){
            this.formData[this.currentIndex].pcStartTime = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
          }else{
            this.formData[this.currentIndex].pcEndTime = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
          }
        }
      },
      preserve(){
        let data = {};
        let index = 0;
        data.ids = '';
        data.start_time = '';
        data.end_time = '';
        data.buy_up = 0;
        data.buy_up_subtraction = 0;
        data.is_able = this.activityState;

        for (var key in this.formData[index]){
          if(key == 'pcId'){
            data.ids = this.formData[index][key];
          }else if(key == 'pcStartTime'){
            if(!this.formData[index][key]){
              new Toast("请选择开始时间！").show();
              return;
            }else {
              data.start_time = this.formData[index][key];
            }
          }else if(key == 'pcEndTime'){
            if(!this.formData[index][key]){
              new Toast("请选择结束时间！").show();
              return;
            }else {
              data.end_time = this.formData[index][key];
            }
          }else if(key == 'pcBuyUp'){
            if(this.formData[index][key] <= 0){
              new Toast("购满金额须大于0！").show();
              return;
            }else if(this.formData[index][key] == ''){
              new Toast("请输入购满金额！").show();
              return;
            }else {
              data.buy_up = this.formData[index][key];
            }
          }else if(key == 'pcBuyUpSubtraction'){
            if(this.formData[index][key] <= 0){
              new Toast("优惠金额须大于0！").show();
              return;
            }else if(this.formData[index][key] == ''){
              new Toast("请输入优惠金额！").show();
              return;
            }else {
              data.buy_up_subtraction = this.formData[index][key];
            }
          }
        }

        this.$post(API.EDIT_SHOP_COUPON_INFO,data).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else if(response.code == 200){
            this.data = response.data;
            new SuccessLoading(response.msg).show();
            this.$router.go(-1);
          }
        })
      }
    },
    components: {TopHeader,RadioButton}
  };
</script>
<style lang="scss" scoped>
  @import "../style/createStore.scss";
  /****title_bar*****/
  .title_bar {
    height: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    font-size: .4rem;
    padding: 0 .5rem;
  }
  .title_bar p:nth-child(1){
    color: #999999;
  }
  .title_bar p:nth-child(2){
    color: #4cc3ad;
  }
  .add_active{
    text-align: center;
  }

  .add_active img {
    width: .56rem;
    height: .56rem;
    margin-right: .15rem;
  }

  .add_active label {
    color: #4cc3ad;
    vertical-align: bottom;
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
    margin-top: 2.56rem;
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: #5FCCC6;
  }
</style>
