<template>
  <div class="orderContent" style="background-color: #eee;">
    <div class="content_header">
      <!--搜索-->
      <div class="top_header">
        <div class="search">
          <img src="../assets/images/icon_search.png">
          <input type="text" v-model="searchData.search_key" placeholder="输入订单号或买家手机号"/>
        </div>
      </div>
      <!--tab切换-->
      <div class="tab">
        <div class="order_loan" @click="switchTab(2)">
          <div id="tab_loan" :class="{tab_selected : currentSelected == 2}">全款订单</div>
          <img :src="currentSelected == 2 ? '../static/images/order_tab_select.png' : '../static/images/order_tab_no_select.png'"/>
        </div>
        <div class="order_money" @click="switchTab(3)">
          <div id="tab_money" :class="{tab_selected : currentSelected == 3}">赊购订单</div>
          <img  :src="currentSelected == 3 ? '../static/images/order_tab_select.png' : '../static/images/order_tab_no_select.png'"/>
        </div>
      </div>
      <!--筛选-->
      <div class="select">
        <div class="state" @click="isState = true">
          <span v-text="orderStateIndex.toString() == '-1' ? '状态' : orderStatusList[orderStateIndex]" class="screen_text"></span>
          <img src="../assets/images/icon_down.png">
        </div>
        <div class="begin_time" @click="isStartTime = true">
          <span v-text="startTime" class="screen_text"></span>
          <img src="../assets/images/icon_down.png">
        </div>
        <div class="end_time" @click="isEndTime = true">
          <span v-text="endTime" class="screen_text"></span>
          <img src="../assets/images/icon_down.png">
        </div>
      </div>
    </div>
    <!--筛选状态-->
    <div v-if="isState">
    <van-popup v-model.trim="isState" position="bottom" >
      <van-picker
        show-toolbar
        :columns="orderStatusTypeList"
        @confirm="stateConfirm"
        @cancel="isState = false"
        @change="stateChange"
      ></van-picker>
    </van-popup>
    </div>
    <!--选择开始时间-->
    <van-popup v-model.trim="isStartTime" position="bottom">
      <van-datetime-picker type="datetime" v-model="currentDate" :formatter="formatter"  @confirm="startTimeConfirm" @cancel="isStartTime = false" />
    </van-popup>
    <!--选择结束时间-->
    <van-popup v-model.trim="isEndTime" position="bottom">
      <van-datetime-picker type="datetime" v-model="currentDate" :formatter="formatter" @confirm="endTimeConfirm" @cancel="isEndTime = false" />
    </van-popup>
    <!--订单列表-->
    <div style="height: 4.5rem;"></div>
    <van-list v-model="loading" :finished="finished" @load="getOrders" >
      <div v-for="(info,index) in orderList" class="item" style="background-color: white" @click="checkOrderInfo(info.order_id)">
        <div class="item-title">
          <span class="order_no">订单编号：{{ info.order_no }}</span>
          <span class="oreder_state">{{ orderStatusList[info.order_status] }}</span>
        </div>
        <ul class="order_info">
          <li id="order_name">姓名：{{ info.consignee }}</li>
          <li id="order_account">收货手机号：{{ info.consignee_mbl }}</li>
          <li id="order_time">下单时间：{{ info.order_add_time }}</li>
          <li id="order_money">实收金额：￥{{ info.order_fat_pay_amount }}</li>
        </ul>
      </div>
    </van-list>

    <p class="bar_tite" v-text="barTite"></p>
    <div style="height: 2rem;"></div>
  </div>
</template>
<script>
  import * as API from '../service/API';
  import Toast from '../widget/Toast';
  import Loading from '../widget/loading/loading'
  import DateUtils from '../utils/DateUtils';
  import eventBus from  '../utils/eventBus'

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
        orderStateIndex:'-1', //选中订单的状态
        startTime: '开始时间',
        endTime: '结束时间',
        isState: false,     // 状态
        isStartTime: false, // 开始时间
        isEndTime: false, // 结束时间
        startTimeData: '',   //  开始时间选择
        endTimeData: '',   //  结束时间选择
        barTite:'没有更多啦~',    //  底部字段显示
        docmHeight: '0',  //默认屏幕高度
        showHeight:  '0',  //实时屏幕高度
        hidshow: true, //显示或者隐藏footer,
        isResize: false, //默认屏幕高度是否已获取
        currentDate: new Date(),
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
          order_pay_type:'2',
          order_status:'',
          o_start:'',
          o_end:'',
          search_key:'',
        }
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
          console.log(this.searchData.search_key.length);
          let that = this;
          this.timerOuter = setTimeout(function(){
            that.pageInfo = {
              total:0,
                currPage:1,
                nextPage:0,
                pageCount:0
            }
            that.orderList = [];
            that.getOrders();
          },500)
        }

      },
      showHeight:function() {
        if(this.docmHeight > this.showHeight){
          this.hidshow=false
        }else{

          this.hidshow=true
        }
      }
    },
    mounted() {
      // window.onresize监听页面高度的变化
      window.onresize = ()=>{
        return(()=>{
          if (!this.isResize) {
            //默认屏幕高度
            this.docmHeight = document.documentElement.clientHeight;
            this.isResize = true
          }
          //实时屏幕高度
          this.showHeight = document.body.clientHeight
        })()
      }
    },
    destroyed(){
      eventBus.$emit('bottomShop',this.hidshow);
    },
    methods: {
      getOrders() {
        if(this.runload){
          return ;
        }

        this.runload = true;

        let data = {};
        data.jdata = {};
        for (var index in this.searchData){
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
        let loading = new Loading();
        loading.show();

        this.$post(API.ORDER_LIST,data).then((response) => {
          this.runload = false;
          if (response.code != 200) {
            new Toast(response.msg).show();
            return;
          }
          if(response.orderList.length > 0){
            this.orderList = this.orderList.concat(response.orderList);
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
            this.barTite = '没有更多啦~' ;
          }else {
            this.barTite = '您还没有订单哦~' ;
          }
          loading.close();
        }).then((error)=>{
          this.runload = false;
          loading.close();
        });
      },
      switchTab(tab) {
        this.currentSelected = tab;
        this.searchData.order_pay_type = tab;
        this.orderStateIndex = -1;
        console.log(this.pickerObj);
        this.pickerObj.setColumnIndex(0);
        this.searchData.order_status = '';
        //this.getOrders();
      },
      checkOrderInfo(id) {
        this.$router.push({path: `/orderDetails/${id}`});
      },
      //状态确定
      stateConfirm(value, index) {
        this.orderStateIndex = value.key;
        this.searchData.order_status = value.key;
        this.isState = false;
        //this.getOrders();
      },
      //状态改变
      stateChange(picker,value, index) {
        this.pickerObj = picker;
        console.log(this.pickerObj);
      },
      //开始时间确认
      startTimeConfirm(val){
        this.isStartTime = false;
        this.startTimeData = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
        this.startTime = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
        this.searchData.o_start = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
        this.getOrders();
      },
      //结束时间确认
      endTimeConfirm(val){
        this.isEndTime = false;
        this.endTimeData = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
        this.endTime = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
        this.searchData.o_end = new DateUtils().formatDate(val,'yyyy-MM-dd HH:mm:ss');
        this.getOrders();
      },
      //    选择数据
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        } else if (type === 'day') {
          return `${value}日`
        } else if (type === 'hour') {
          return `${value}时`
        } else if (type === 'minute') {
          return `${value}分`
        }
        return value;
      },
    },
    mounted() {
      this.getOrders();
    }
  }
</script>
<style lang="scss" scoped>
  @import "../style/common";
  /********header*********/
  .content_header{
    width: 100%;
    position: fixed;
    top: 0;
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
    padding-bottom: 0.1rem;
    width: 0.48rem;
    height: 0.48rem;
  }

  .top_header .search input {
    width: 80%;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 0.4rem;
    vertical-align: middle;
  }

  /**tab**/
  .tab{
    height: 0.98rem;
    background: white;
    border-bottom: 1px solid #eeeeee;
    font-size: 0;
  }

  .tab .order_loan,.order_money{
    height: 0.98rem;
    font-size: 0.4rem;
    display: inline-block;
    width: 50%;
    text-align: center;
  }
  .tab_selected{
    color: #47bb74;
  }

  .tab img{
    padding-top: .34rem;
    width: 1.64rem;
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
    padding-top: .13rem;
    width: .25rem;
    height: .13rem;
    margin-left: .15rem;
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

  /********item*********/
  .item{
    margin-top: 0.19rem;
    background-color: white!important;
  }

  .item .item-title{
    margin: 0 0.5rem;
    padding: 0.37rem 0;
    color: #999999;
    font-size: 0.36rem;
    border-bottom: #eeeeee 1px solid;
    display: flex;
    justify-content: space-between;
  }

  .item .item-title .oreder_state{
    color: #db6045;
  }

  .item .order_info{
    margin: 0.18rem 0.5rem 0.28rem 0.5rem;
    padding-bottom: 0.28rem;
    color: $font_100;
    font-size: 0.4rem;
    border-bottom: 1px solid #eeeeee;
  }

  .item ul li{
    margin-top: 0.3rem;
  }

  .item .order_goods #goods_name{
    color: $font_100;
    font-size: 0.4rem;
    margin-left: 0.5rem;
  }

  .item .order_goods #goods_info{
    width: 100%;
    color: #999999;
    font-size: 0.4rem;
    margin-left: 0.5rem;
    margin-top: 0.22rem;
    padding-bottom: 0.49rem;
  }

  .item .order_goods #goods_info span{
    display: inline-block;
  }

  .item .order_goods #goods_info #goods_type{
    width: 65%;
  }

  .item .order_goods #goods_info #goods_money {
    float: right;
    padding-right: 1rem;
    color: $font_100;
  }

  /*******筛选span*****/
  .screen_text{
    display: inline-block;
    max-width: 2.5rem;
    vertical-align: middle;
  }
  /*  提示  */
  .bar_tite{
    font-size: .32rem;
    text-align: center;
    color: #989898;
    margin: .2rem 0 .5rem;
  }
</style>
