<template>
  <div class="billingcontent">
    <div class="page_bg"></div>
    <top-header title-txt="交易明细"></top-header>
    <!-- 交易明细选择 -->
    <div class="type_choose clear">
      <p :class="{'type_val':true,'type_val_selected':typeValSelected == 1}" @click="chooseTab(1)">
        全部
        <img src="../assets/images/billRecord_choose_icon.png" alt="" v-if="typeValSelected == 1">
      </p>
      <p :class="{'type_val':true,'type_val_selected':typeValSelected == 2}" @click="chooseTab(2)">
        收入
        <img src="../assets/images/billRecord_choose_icon.png" alt="" v-if="typeValSelected == 2">
      </p>
      <p :class="{'type_val':true,'type_val_selected':typeValSelected == 3}" @click="chooseTab(3)">
        支出
        <img src="../assets/images/billRecord_choose_icon.png" alt="" v-if="typeValSelected == 3">
      </p>
      <p class="type_time_choose" @click="isChooseTime=!isChooseTime"></p>
    </div>
    <!--交易明细列表-->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" ref="goods_transaction_detail" @load="getData" >
        <ul class="bill_list">
          <li class="bill_info" v-for="(info,index) in billList">
            <p class="bill_info_name">
              <span v-text="info.uName"></span>
              <span v-text="info.aTrueName"></span>
              <span v-if="info.detailType==1">(用户名)</span>
              <span v-if="info.detailType==2||info.aTrueName!=''">(商户名)</span>
            </p>
            <p class="bill_info_number">流水号：<span v-text="info.orderSerialNum"></span></p>
            <p class="bill_info_number">
              <span v-text="info.tTime"></span>
              <span v-if="info.tStatus==1">提现处理中</span>
              <span v-if="info.tStatus==2">提现失败</span>
              <span v-if="info.tStatus==3">提现成功</span>
            </p>
            <div class="bill_details">
              <p class="bill_money">
                <span v-if="info.tType==1||info.tType==6">+</span>
                <span v-if="info.tType==2">-</span>
                <span v-text="info.tAmount"></span>
              </p>
              <p class="bill_details_title" v-if="info.tType==1">交易收入</p>
              <p class="bill_details_title" v-if="info.tType==2">提现支出</p>
              <p class="bill_details_title" v-if="info.tType==6">推广收入</p>
            </div>
          </li>
        </ul>
      </van-list>
      <p v-text="billTip" class="bill_tip"></p>
    </van-pull-refresh>
    <!--时间筛选-->
    <pop-menu style="margin-top: 3.02rem;" :is-show="isChooseTime" @setIsShow="setIsShowPopMenu">
      <div slot="list">
        <p class="startTimeBar choose_time_bar">起始时间<span v-text="startDateTitle"></span></p>
        <van-datetime-picker type="date" :show-toolbar='false' v-model="startDate" @change="startChange" :item-height="35" :max-date="maxDate"/>
        <p class="endTimeBar choose_time_bar">结束时间<span v-text="endDateTitle"></span></p>
        <van-datetime-picker type="date" :show-toolbar='false' v-model="endDate" @change="endChange" :item-height="35" :max-date="maxDate" :min-date="startDate"/>
        <div class="choose_time_btn">
          <i class="time_btn_hadow"></i>
          <p class="empty_btn" @click="empty">清空</p>
          <p class="sure_btn" @click="confirm">确定</p>
        </div>
      </div>
    </pop-menu>
  </div>
</template>

<script>
  import * as API from '../service/API'
  import TopHeader from '../components/TopHeader';
  import PopMenu from '../components/PopMenu';
  import DateUtils from '../utils/DateUtils';
  import moment from 'moment';
  import Toast from "../widget/Toast";
  import Loading from '../widget/global_loading/loading';
  import SuccessLoading from "../widget/sucess_loading/SuccessLoading";

  export default {
    data(){
      return{
        typeValSelected:'1',
        isChooseTime:false,
        billList:[],
        loading: false,
        finished: false,
        isLoading: false,
        billTip:'没有更多交易记录了',
        startDate: new Date(),
        endDate: new Date(),
        maxDate: new Date(),
        jdata:{
          'o_start':'',
          'o_end':''
        },
        startDateTitle: new DateUtils().formatDate(new Date(),"yyyy-MM-dd"),  //开始时间
        endDateTitle: new DateUtils().formatDate(new Date(),"yyyy-MM-dd"),  //开始时间
      }
    },
    mounted() {
      this.getData();
    },
    methods:{
      chooseTab(tab){
        this.typeValSelected = tab;
        this.isChooseTime = false;
        this.getData();
      },
      //     开始时间选择
      startChange(picker,value,index){
        this.startDateTitle = new DateUtils().formatDate(this.startDate,"yyyy-MM-dd");
      },
      //   结束时间选择
      endChange(picker,value,index){
        this.endDateTitle = new DateUtils().formatDate(this.endDate,"yyyy-MM-dd");
      },
      setIsShowPopMenu(isShow){
        this.isChooseTime = isShow;
      },
      //   点击清空按钮
      empty(){
        this.jdata.o_start = '';
        this.jdata.o_end = '';
        this.getData();
        this.isChooseTime = false;
      },
      //  点击确定
      confirm(){
        this.jdata.o_start = this.startDateTitle;
        this.jdata.o_end = this.endDateTitle;
        this.getData();
        this.isChooseTime = false;
      },
      getData(){
        let data = {};
        data.jdata = {};
        data.jdata.o_start = this.jdata.o_start;
        data.jdata.o_end = this.jdata.o_end;
        data.type = this.typeValSelected;
        data.p = '1';
        data.jdata = JSON.stringify(data.jdata);
        this.loading = true;
        this.$post(API.GOODS_TRANSACTION_DETAIL,data).then((response) => {
          if (response.code != 200) {
            new Toast(response.msg).show();
            return;
          }else{
            this.billList = response.data;
            this.finished = true;
            this.loading = false;
          }
        });
      },
      onRefresh() {
        setTimeout(() => {
          new SuccessLoading('刷新成功').show();
          this.isLoading = false;
        }, 500);
      }
    },
    components:{TopHeader,PopMenu}
  }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  .billingcontent{
    overflow: hidden;
  }
  .billingcontent /deep/ .common_header{
    border: none;
  }
  .type_choose{
    position: relative;
    background-color: white;
    margin-top: 1.61rem;
    z-index: 99999;
  }
  .type_val{
    position: relative;
    float: left;
    padding: .44rem .65rem;
    font-size: .4rem;
    color: $font_100;
  }
  .type_val_selected{
    color: $main_grren;
  }
  .type_val img{
    position: absolute;
    width: .94rem;
    bottom: 0;
    left: 50%;
    margin-left: -.47rem;
  }
  .type_time_choose{
    float: right;
    width: 0.54rem;
    height: 0.48rem;
    background: url("../assets/images/icon_time_select.png") no-repeat center;
    background-size: cover;
    position: absolute;
    top:50%;
    margin-top: -.27rem;
    right: .5rem;
    cursor: pointer;
  }
  /*交易明细列表开始*/
  .bill_info{
    position: relative;
    margin-top: .17rem;
    background-color: white;
    padding: .44rem .47rem;
  }
  .bill_info .bill_info_name{
    font-size: .4rem;
    color: $font_100;
  }
  .bill_info .bill_info_number{
    font-size: .3rem;
    color: #999999;
    padding-top: .15rem;
  }
  .bill_info .bill_details{
    position: absolute;
    right: .47rem;
    top: .74rem;
  }
  .bill_details .bill_money{
    font-size: .5rem;
    color: #db6045;
    font-weight: bold;
  }
  .bill_details .bill_details_title{
    font-size: .3rem;
    color: #999999;
    padding-top: .05rem;
    text-align: right;
  }
  .bill_tip{
    font-size: .32rem;
    color: #989898;
    text-align: center;
    padding-top: .39rem;
  }
  /*交易明细列表结束*/
  /*时间选择样式开始*/
  .choose_time_bar{
    padding: .3rem;
    background-color: #eeeeee;
    text-align: center;
    font-size: .4rem;
    color: #999999;
  }
  .choose_time_bar span{
    font-size: .4rem;
    color: $font_100;
    padding-left: .25rem;
  }
  .choose_time_btn{
    position: relative;
    font-size: 0;
  }
  .choose_time_btn p{
    position: relative;
    display: inline-block;
    text-align: center;
    font-size: .48rem;
    padding: .34rem 0;
    z-index: 10;
  }
  .choose_time_btn .empty_btn{
    width: 40%;
    background-color: white;
    color: $font_100;
  }
  .choose_time_btn .sure_btn{
    width: 60%;
    background-color: $main_grren;
    color: white;
  }
  .time_btn_hadow{
    z-index: 1;
    display: block;
    position: absolute;
    width: 100%;
    height: .78rem;
    background: url("../assets/images/shadow.png") no-repeat center;
    background-size: cover;
    top: -.21rem;
  }
  /*时间选择样式结束*/
  .billingcontent /deep/ .van-pull-refresh__track{
    min-height: 13rem!important;
  }
</style>
