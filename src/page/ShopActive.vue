<template>
  <div class="shop_create_content">
    <div class="page_bg"></div>
    <top-header title-txt="添加活动"></top-header>
    <form class="content" onsubmit="return false">
      <div class="input_content">
        <ul class="input_box">
          <li class="input_div">
            <label><span class="must">*</span>开始时间</label>
            <input readonly="readonly" type="text" name="start_time[]" placeholder="选择开始时间" @click="showTimePanel(1)" v-model.trim="pcStartTime">
          </li>
          <li class="input_div">
            <label><span class="must">*</span>结束时间</label>
            <input readonly="readonly" type="text" name="end_time[]" placeholder="选择结束时间" @click="showTimePanel(2)" v-model.trim="pcEndTime">
          </li>
          <li class="input_div">
            <label><span class="must">*</span>购满金额(元)</label>
            <input type="number" name="buy_up[]" placeholder="输入购满金额" v-model.trim="pcBuyUp" style="width: 53%;">
          </li>
          <li class="input_div">
            <label><span class="must">*</span>满减金额(元)</label>
            <input type="number" name="buy_up_subtraction[]" placeholder="输入优惠金额" v-model.trim="pcBuyUpSubtraction"  style="width: 53%;">
          </li>
          <li class="input_div">
            <label><span class="must">*</span>状态</label>
            <p class="active">
              <radio-button radio_name="active" radio_val="1" @radioChange="getActivityState" :is-checked="activityState == 1" radio_title="启用" style="margin-right: 1rem;"></radio-button>
              <radio-button radio_name="active" radio_val="2" @radioChange="getActivityState" :is-checked="activityState == 2" radio_title="停用"></radio-button>
            </p>
          </li>
          <!--选择时间-->
          <van-popup v-model.trim="isShowTime" position="bottom">
            <van-datetime-picker type="datetime" v-model="currentDate" @confirm="timeConfirm" @cancel="isShowTime = false" />
          </van-popup>
          <li class="bar"></li>
        </ul>
      </div>
      <p class="must_title"><span class="must">*</span>为必填项</p>
      <span @click="preserve" :class="bottom_btn_style" >确认添加</span>
    </form>
  </div>
</template>
<script>
  import TopHeader from '../components/TopHeader'
  import RadioButton from '../components/common/RadioButton.vue';
  import * as API from '../service/API'
  import moment from 'moment';
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
        pcId:'0',
        activityState: 1,  //状态：1.启用 2.停用
        pcStartTime:'',
        pcEndTime:'',
        pcBuyUp:'',
        pcBuyUpSubtraction:'',
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
      getActivityState(val){   //  营业状态
        this.activityState = val;
      },
      showTimePanel(type){
        this.isShowTime = true;
        this.currentType = type;
      },
      //开始时间确认
      timeConfirm(val){
        this.isShowTime = false;
        let startTime = this.pcStartTime;
        let endTime = this.pcEndTime;
        if(this.currentType == 1){
          startTime = val;
        }else{
          endTime = val;
        }
        if(endTime && startTime){
          if(moment(startTime).isBefore(endTime)){
            if(this.currentType == 1){
              this.pcStartTime = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
            }else{
              this.pcEndTime = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
            }
          }else{
            new Toast('开始时间必须于小结束时间').show();
          }
        }else{
          if(this.currentType == 1){
            this.pcStartTime = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
          }else{
            this.pcEndTime = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
          }
        }
      },
      preserve: function () {
        if(!this.pcStartTime){
          new Toast("请选择开始时间！").show();
          return;
        }else if(!this.pcStartTime){
          new Toast("请选择结束时间！").show();
          return;
        }else if(this.pcBuyUp <= 0){
          new Toast("购满金额须大于0！").show();
          return;
        }else if(this.pcBuyUp == ''){
          new Toast("请输入购满金额！").show();
          return;
        }else if(this.pcBuyUpSubtraction <= 0){
          new Toast("满减金额须大于0！").show();
          return;
        }else if(this.pcBuyUpSubtraction == ''){
          new Toast("请输入满减金额！").show();
          return;
        }else if(Number(this.pcBuyUp) <= Number(this.pcBuyUpSubtraction)){
          new Toast("满减金额必须小于购满金额！").show();
          return;
        }else {
          let data = {};
          data.ids = this.pcId;
          data.start_time = this.pcStartTime;
          data.end_time = this.pcEndTime;
          data.buy_up = this.pcBuyUp;
          data.buy_up_subtraction = this.pcBuyUpSubtraction;
          data.is_able = this.activityState;
          this.$post(API.EDIT_SHOP_COUPON_INFO,data).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg).show();
              return;
            }else if(response.code == 200){
              this.data = response.data;
              new SuccessLoading(response.msg).show();
              this.$router.replace('shopActiveList');
            }
          });
        }
      },
    },
    filters: {
      plus: function (n) {
          let num = n;
          num ++
          return num;
      }
    },
    mounted() {
      this.resizeWindow();
    },
    destroyed(){
      window.onresize = null;
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
    margin-top: 1.6rem;
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: #5FCCC6;
  }
</style>
