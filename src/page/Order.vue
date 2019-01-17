<template>
  <div class="orderContent">
    <div class="page_bg"></div>
    <div class="content_header">
      <!--搜索-->
      <div class="top_header">
        <div class="search">
          <img src="../assets/images/icon_search.png">
          <input type="text" v-model="searchData.search_key" placeholder="输入订单号或买家手机号"/>
        </div>
      </div>
      <div class="order-title">订单列表</div>
      <!--筛选-->
      <div class="select">
        <div class="state" @click="stateChoose">
          <span v-text="orderStateIndex == '' ? '状态' : orderStateIndex.toString() == '-1' ? '全部' : orderStatusList[orderStateIndex]" :class="{'screen_text':true,'choose_screen':isShowState||orderStateIndex.toString() != ''}"></span>
          <img v-if="!isShowState&&orderStateIndex.toString() == ''" src="../assets/images/icon_down_nochoose.png">
          <img v-if="isShowState" src="../assets/images/icon_down_choose.png">
          <img v-if="!isShowState&&orderStateIndex.toString() != ''" src="../assets/images/icon_clear_choose.png" @click="setup(1)" @click.stop>
        </div>
        <div class="begin_time" @click="startTimeChoose">
          <span v-text="startTime" :class="{'screen_text':true,'choose_screen':isStartTime||startTime!='开始时间'}"></span>
          <img v-if="!isStartTime&&startTime=='开始时间'" src="../assets/images/icon_down_nochoose.png">
          <img v-if="isStartTime" src="../assets/images/icon_down_choose.png">
          <img v-if="!isStartTime&&startTime!='开始时间'" src="../assets/images/icon_clear_choose.png" @click="setup(2)" @click.stop>
        </div>
        <div class="end_time" @click="endTimeChoose">
          <span v-text="endTime" :class="{'screen_text':true,'choose_screen':isEndTime||endTime!='结束时间'}"></span>
          <img v-if="!isEndTime&&endTime=='结束时间'" src="../assets/images/icon_down_nochoose.png">
          <img v-if="isEndTime" src="../assets/images/icon_down_choose.png">
          <img v-if="!isEndTime&&endTime!='结束时间'" src="../assets/images/icon_clear_choose.png" @click="setup(3)" @click.stop>
        </div>
      </div>
    </div>
    <!--筛选状态-->
    <pop-menu style="margin-top: 4.1rem" :is-show="isShowState" @setIsShow="setIsShowPopMenu">
      <div slot="list">
        <div class="state-item" v-for="item in orderStatusTypeList"  @click="stateConfirm(item)">
          <span class="item-content">{{item.text}}</span>
        </div>
      </div>
    </pop-menu>
    <!--选择开始时间-->
    <pop-menu style="margin-top: 4.1rem" :is-show="isStartTime" @setIsShow="setIsShowStartPopMenu">
      <div slot="list">
        <van-datetime-picker type="datetime" :max-date="eMaxDate" v-model="startCurrentDate" @confirm="startTimeConfirm" @cancel="isStartTime = false" />
      </div>
    </pop-menu>
    <!--选择结束时间-->
    <pop-menu style="margin-top: 4.1rem" :is-show="isEndTime" @setIsShow="setIsShowEndPopMenu">
      <div slot="list">
        <van-datetime-picker type="datetime" :max-date="maxDate" :min-date="minDate" v-model="endCurrentDate" @confirm="endTimeConfirm" @cancel="isEndTime = false" />
      </div>
    </pop-menu>
    <!--订单列表-->
    <div style="height: 4.21rem;"></div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" @load="getOrders" >
        <div v-for="info in orderList" class="item" style="background-color: white;padding: .45rem 0;margin-bottom: .2rem;" @click="checkOrderInfo(info.order_id)">
          <div class="item-info">
            <div class="send-type">
              <img class="send-type-img" :src=" info.order_delivery_type == 1 ? '../../static/images/icon_distribution.png' : '../../static/images/icon_self.png'"/>
            </div>
            <div class="item-content">
              <div class="item-overview">
                <span class="order-receiver">收货人：{{ info.consignee }} {{ info.consignee_mbl }}</span>
                <span class="order-state">{{orderStatusList[info.order_status]}}</span>
              </div>
              <span class="order-num">订单编号：{{ info.order_no }}</span>
              <span class="order-time">下单时间：{{ info.order_add_time }}</span>
              <span class="send-type-content">配送方式：{{ info.order_delivery_type == 1 ? '商家配送' : '用户自提'}}</span>
            </div>
          </div>
          <div class="item-money">
            <span class="money-tips">实付金额：</span>
            <span class="order-money">￥{{ info.order_fat_pay_amount }}</span>
          </div>
        </div>
      </van-list>
      <p class="bar_tite" v-text="barTite"></p>
      <div style="height: 2rem;"></div>
    </van-pull-refresh>
  </div>
</template>

<script>
  import * as API from '../service/API';
  import Toast from '../widget/Toast';
  import DateUtils from '../utils/DateUtils';
  import SuccessLoading from "../widget/sucess_loading/SuccessLoading";
  import PopMenu from '../components/PopMenu'

  export default {
    data() {
      return {
        currentSelected: 2, //2 赊购，3全款
        orderList: [],
        orderStatusList: [],   //订单状态列表
        orderStatusTypeList: [],   //根据支付类型显示
        orderStatusData:{
          2:{
            list:[],
            select:''
          },
          3:{
            list:[],
            select:''
          }
        },
        eMaxDate: new Date(),     // 选择开始时间的最大时间
        maxDate: new Date(),    //  结束时间的最大时间
        minDate:'',            // 结束时间最小时间（开始时间）
        orderStateIndex:'', //选中订单的状态
        startTime: '开始时间',
        endTime: '结束时间',
        isState: false,     // 状态
        isStartTime: false, // 开始时间
        isEndTime: false, // 结束时间
        startTimeData: '',   //  开始时间选择
        endTimeData: '',   //  结束时间选择
        barTite:'没有更多啦~',    //  底部字段显示
        startCurrentDate: new Date(),
        endCurrentDate: new Date(),
        loading: false,
        runload:false,
        finished: false,
        pickerObj:null,
        timerOuter:null, //延迟执行对象，防止重复查询
        pageInfo:{
          total:0,
          currPage:1,
          nextPage:0,
          pageCount:0
        },
        searchData:{
          order_pay_type:'2',   //支付类型
          order_status:'',    //订单状态
          o_start:'',   //开始时间
          o_end:'',      //结束时间
          search_key:'',
        },
        clientHeight:document.documentElement.clientHeight,
        isLoading: false,
        isShowState: false
      };
    },
    computed: {
      searchChang:function () {
        return this.searchData.order_pay_type + this.searchData.order_status + this.searchData.o_start + this.searchData.o_end + this.searchData.search_key;
      }
    },
    watch: {
      searchChang: function () {
        clearTimeout(this.timerOuter);
        if(this.searchData.search_key.length >= 2 || this.searchData.search_key.length == ''){
          let that = this;
          this.timerOuter = setTimeout(function(){
            that.pageInfo = {
              total:0,
              currPage:1,
              nextPage:0,
              pageCount:0
            }
            that.finished = false;
            that.orderList = [];
            that.getOrders();
          },500)
        }
      },
    },
    activated(){
      this.getOrders();
    },
    mounted() {},
    methods: {
      setIsShowPopMenu(isShow){
        this.isShowState = isShow;
      },
      setIsShowStartPopMenu(isShow){
        this.isStartTime = isShow;
      },
      setIsShowEndPopMenu(isShow){
        this.isEndTime = isShow;
      },
      //状态确定
      stateConfirm(item) {
        this.orderStateIndex = item.key;
        this.searchData.order_status = item.key;
        this.isShowState = false;
      },
      getOrders() {
        // this.finished 表示加载完毕结束
        if(this.runload){
          return ;
        }
        this.runload = true;
        let data = {};
        data.jdata = {};
        for (let index in this.searchData){
          if(this.searchData[index]){
            data.jdata[index] = this.searchData[index];
          }
        }
        if(data.jdata['order_status'] < 0){
          delete data.jdata['order_status'];
        }
        if(this.pageInfo.currPage != this.pageInfo.pageCount){
          data.p = this.pageInfo.nextPage;
        }
        data.jdata = JSON.stringify(data.jdata);
        this.loading = true;
        this.$post(API.ORDER_LIST,data).then((response) => {
          this.runload = false;
          if (response.code != 200) {
            new Toast(response.msg).show();
            return;
          }
          if(response.orderList.length > 0){
            this.orderList = this.orderList.concat(response.orderList);

          }else {
            this.finished = true;
          }
          if(this.orderStatusList.length == 0){
            this.orderStatusList = response.order_status;
          }
          this.pageInfo = response.pageInfo;
          if(this.orderStatusData[this.currentSelected].list.length == 0){
            this.orderStatusData[this.currentSelected].list.push({key:'-1',text:'全部'})
            for (var index in response.pay_order_status[this.currentSelected]){
              this.orderStatusData[this.currentSelected].list.push({key:index,text:response.pay_order_status[this.currentSelected][index]})
            }
            this.orderStatusTypeList = this.orderStatusData[this.currentSelected].list;
          }else{
            this.orderStatusTypeList = this.orderStatusData[this.currentSelected].list;
          }

          if(this.pageInfo.currPage ==this.pageInfo.pageCount){
            this.finished = true;
          }
          this.loading = false;
          if(this.orderList.length > 0){
            this.barTite = '没有更多啦~';
          }else if(this.searchData.search_key.length > 0){
            this.barTite = '暂无搜索结果~';
          }else{
            this.barTite = '您还没有订单哦~';
          }
        }).then((error)=>{
          this.runload = false;
        });
      },
      checkOrderInfo(id) {
        this.$router.push({path: `/orderDetails/${id}`});
      },
      //状态改变
      stateChange(picker,value, index) {
        this.pickerObj = picker;
      },
      //开始时间确认
      startTimeConfirm(val){
        this.isStartTime = false;
        this.startTimeData = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
        this.startTime = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
        this.searchData.o_start = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
        this.minDate = val;
        //this.getOrders();
      },
      // 点击选择状态
      stateChoose(){
        this.isShowState = !this.isShowState;
        if(this.isShowState){
          this.isStartTime = false;
          this.isEndTime = false;
        }
      },
      // 点击选择开始状态
      startTimeChoose(){
        this.isStartTime = !this.isStartTime;
        if(this.isStartTime){
          this.isShowState = false;
          this.isEndTime = false;
        }
      },
      //点击选择结束时间
      endTimeChoose(){
        if(this.searchData.o_start!=''){
          this.isEndTime = !this.isEndTime;
          if(this.isEndTime){
            this.isStartTime = false;
            this.isShowState = false
          }
        }else {
          new Toast('请先选择开始时间！').show();
          return;
        }
      },
      //结束时间确认
      endTimeConfirm(val){
        this.isEndTime = false;
        this.endTimeData = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
        this.endTime = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
        this.searchData.o_end = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
        this.eMaxDate = val;
        //this.getOrders();
      },
      //清空按钮
      setup(v){
        if(v==1){
          this.searchData.order_status = '-1';
          this.orderStateIndex = '';
        }else if(v==2){
          this.searchData.o_start = '';
          this.startTime = '开始时间';
        }else if(v==3){
          this.searchData.o_end = '';
          this.endTime = '结束时间';
        }
      },
      onRefresh() {
        setTimeout(() => {
          new SuccessLoading('刷新成功').show();
          this.isLoading = false;
        }, 500);
      }
    },
    components:{
      PopMenu
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/common";
  /********header*********/
  .orderContent{
    background-color: #eeeeee;
  }
  .content_header{
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 99999;
  }

  .top_header{
    width: 100%;
    overflow: hidden;
    height: 1.9rem;
    background-color: white;
    border: none!important;
  }

  .top_header .search{
    line-height: 0.78rem;
    margin: 0.54rem 0.5rem 0.54rem 0.5rem;
    background-color: #eeeeee;
    border-radius: 0.39rem;
  }

  .top_header .search img{
    padding-left: 0.5rem;
    padding-bottom: 0rem;
    width: 0.46rem;
    height: 0.46rem;
  }

  .top_header .search input {
    padding-top: 0.1rem;
    width: 80%;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 0.36rem;
    vertical-align: middle;
  }

  .order-title{
    background-color: white;
    font-size: 0.6rem;
    color: #1a1b39;
    display: block;
    font-weight: bold;
    padding-left: 0.45rem;
  }

  /*******select*******/
  .select{
    height: 1.12rem;
    padding-bottom: .34rem;
    background-color: white;
    display: flex;
  }

  .select span{
    color: #999999;
    font-size: .4rem;
  }

  .select img{
    width: .34rem;
    height: .34rem;
    margin-left: .15rem;
    padding-top: .09rem;
  }

  .select .state{
    padding-top: .4rem;
    margin-left: .4rem;
    font-size: 0;
  }

  .select .begin_time,.end_time{
    padding-top: .4rem;
    margin-left: .55rem;
    font-size: 0;
  }

  .select .empty{
    padding-top: .4rem;
    margin-left: auto;
    margin-right: .6rem;
    font-size: .4rem;
    color: $main_grren;
  }
  /********item*********/

  /*******筛选span*****/
  .screen_text{
    display: inline-block;
    max-width: 2.5rem;
    vertical-align: middle;
  }
  .choose_screen{
    color: $main_grren!important;
  }
  /*  提示  */
  .bar_tite{
    font-size: .32rem;
    text-align: center;
    color: #989898;
    margin: .2rem 0 .5rem;
  }

  /*  下拉刷新  */
  .orderContent /deep/ .van-pull-refresh{
    z-index: 999;
  }

  /**状态栏*/
  .state-item{
    line-height: 1rem;
    width:100%;
    .item-content{
      padding-left: 0.52rem;
      font-size: 0.4rem;
      color: #1a1b39;
    }
  }
  /*状态栏点击效果*/
  .state-item:active{
    background: rgba(76,195,173,0.1);
    .item-content{
      color: #4cc3ad;
    }
  }
  /**时间选择点击效果*/
  .orderContent .content .list .van-picker /deep/{
    overflow: visible!important;
  }
  .orderContent .list .van-picker /deep/ .van-picker__toolbar{
    position: absolute!important;
    bottom: -44px!important;
    left: 0!important;
    right: 0!important;
  }
  .van-pull-refresh /deep/ .van-pull-refresh__track{
    min-height: 8rem;
  }

  .item{
    .item-info{
      width: 100%;
      display: flex;
      .send-type{
        display: flex;
        padding-left: 0.45rem;
        width: 12%;
        .send-type-img{
          width: 0.87rem;
          height: 0.87rem;
        }
      }
      .item-content{
        width: 85%;
        border-bottom: 1px solid #dfdfdd;
        .item-overview{
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.45rem;
          .order-receiver{
            font-size: 0.45rem;
            color: #1a1b39;
          }
          .order-state{
            padding-right: 0.45rem;
            color: #4cc3ad;
            font-size: 0.45rem;
          }
        }
        .order-num,.order-time,.send-type-content{
          display: block;
          margin-bottom: 0.3rem;
          color: #999999;
          font-size: 0.36rem;
          /*强制一行显示*/
          white-space:nowrap;
        }
        .send-type-content{
          margin-bottom: 0.45rem;
        }
      }
    }
    .item-money{
      margin: 0.49rem 0.5rem 0rem 0rem;
      display: flex;
      justify-content: flex-end;
      .money-tips,.order-money{
        font-size: 0.36rem;
        color: #1a1b39;
      }
      .order-money{
        font-weight: bold;
      }
    }
  }
</style>
