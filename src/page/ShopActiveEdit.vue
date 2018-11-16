<template>
  <div class="shop_create_content">
    <top-header title-txt="修改满减活动信息"></top-header>
    <form class="content" onsubmit="return false">
      <div class="input_content">
        <ul class="input_box">
          <div v-for="(coupon,key) in formData">
            <li class="title_bar">
              <p>活动</p>
              <p @click="cutOff(coupon.pcId)">删除</p>
            </li>
            <li class="input_div">
              <label><span class="must">*</span>开始时间</label>
              <input type="text" name="start_time[]" placeholder="选择开始时间" @click="showTimePanel(key,1)" v-model.trim="coupon.pcStartTime">
            </li>
            <li class="input_div">
              <label><span class="must">*</span>结束时间</label>
              <input type="text" name="end_time[]" placeholder="选择结束时间" @click="showTimePanel(key,2)" v-model.trim="coupon.pcEndTime">
            </li>
            <li class="input_div">
              <label><span class="must">*</span>订单金额(元)</label>
              <input type="text" name="buy_up[]" placeholder="输入订单金额" v-model.trim="coupon.pcBuyUp" style="width: 53%;">
            </li>
            <li class="input_div">
              <label><span class="must">*</span>优惠金额(元)</label>
              <input type="text" name="buy_up_subtraction[]" placeholder="输入优惠金额" v-model.trim="coupon.pcBuyUpSubtraction"  style="width: 53%;">
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
      <span @click="preserve" class="preserve_btn">保存</span>

    </form>
  </div>
</template>
<script>
  import TopHeader from '../components/TopHeader'
  import * as API from '../service/API'
  import axios from 'axios';
  import moment from 'moment';
  import { Dialog } from 'vant'
  import Loading from '../widget/loading/loading'
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
        formData:[]
      }
    },
    methods: {
      //  显示当前的活动信息
      getActiveData(){
        this.formData.push(JSON.parse(sessionStorage.getItem('SHOP_ACTIVE_INFO')));
        console.log(this.formData);
      },
      // 获取所有的活动信息
      getContactList(){
        let loading = new Loading();
        loading.show();
        this.$get(API.SHOP_COUPON_INFO).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else if(response.code == 200){
            this.data = response.data.coupons;
          }
          loading.close();
        }).then((error)=>{
          loading.close();
        });
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
        console.log("start"+startTime);
        console.log("end"+endTime);
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
      cutOff(id){
        var that = this;
        Dialog.confirm({
          title: '确定删除该活动吗？'
        }).then(() => {
           for(let i in that.data){
             if(that.data[i].pcId == id){
               that.data.splice(i,1);
               this.preserve();
               new SuccessLoading("删除成功！").show();
               break;
             }
           }
        }).catch(() => {
          // on cancel
        });
      },
      preserve(){
        let data = {};
        data.ids = [];
        data.start_time = [];
        data.end_time = [];
        data.buy_up = [];
        data.buy_up_subtraction = [];

        for (var index in this.formData){
          for (var key in this.formData[index]){
            if(key == 'pcId'){
              data.ids.push(this.formData[index][key])
            }else if(key == 'pcStartTime'){
              data.start_time.push(this.formData[index][key])
            }else if(key == 'pcEndTime'){
              data.end_time.push(this.formData[index][key])
            }else if(key == 'pcBuyUp'){
              data.buy_up.push(this.formData[index][key])
            }else if(key == 'pcBuyUpSubtraction'){
              data.buy_up_subtraction.push(this.formData[index][key])
            }
          }
        }
        this.$post(API.SHOP_COUPON_INFO,data).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else if(response.code == 200){
            this.data = response.data;
            console.log(this.data);
            new SuccessLoading(response.msg).show();
          }
        }).then((error)=>{
          //loading.close();
        });
      }
    },
    mounted() {
      var screenHeigt = window.screen.availHeight;
      var topHeight = document.getElementsByClassName('common_header')[0].offsetHeight;
      document.getElementsByClassName('shop_create_content')[0].style.minHeight = screenHeigt - topHeight + 'px';
      document.getElementsByClassName('shop_create_content')[0].style.backgroundColor = '#eee';
      this.getActiveData();
      this.getContactList();
    },
    components: {TopHeader}
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
</style>
