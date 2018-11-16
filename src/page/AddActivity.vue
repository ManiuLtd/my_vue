<template>
    <div class="content">
      <top-header title-txt="添加活动" father-right="确定" @callBackRightClick="submit"></top-header>
      <!--开始时间-->
      <div class="time">
        <span>开始时间</span>
        <div class="time_value">
          <span>选择时间</span>
          <img src="../assets/images/icon_my_arrow.png"/>
        </div>
      </div>
      <!--结束时间-->
      <div class="time">
        <span>结束时间</span>
        <div class="time_value">
          <span>选择时间</span>
          <img src="../assets/images/icon_my_arrow.png"/>
        </div>
      </div>
      <!--订单金额-->
      <div class="money">
        <span>订单金额</span>
        <input type="text" placeholder="输入订单金额"/>
      </div>
      <!--优惠金额-->
      <div class="money">
        <span>优惠金额</span>
        <input type="text" placeholder="输入优惠金额"/>
      </div>
      <div class="date_picker">
        <div class="date_option">
          <span>取消</span>
          <span>确定</span>
        </div>
        <van-datetime-picker class="widget_date" v-model.trim="currentDate" type="date" :show-toolbar=showToolbar />
      </div>
    </div>
</template>

<script>
  import TopHeader from '../components/TopHeader'

  export default {
    data(){
      return{
        currentDate : new Date(),
        showToolbar:false
      }
    },
    methods:{
      submit(){
        console.log("submit");
      }
    },
    components:{
      TopHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  .content{
    padding-top: 1.61rem;
    .time{
      height: 1.74rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      span{
        padding-left: 0.51rem;
        font-size: 0.48rem;
        color: $font_100;
      }
      .time_value{
        display: flex;
        align-items: center;
        span{
          font-size: 0.48rem;
          color: #cdcdd1;
          padding-right: 0.24rem;
        }
        img{
          width: 0.2rem;
          height: 0.3rem;
          padding-right: 0.5rem;
        }
      }
    }
    .money{
      height: 1.74rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        padding-left: 0.51rem;
        color: $font_100;
        font-size: 0.48rem;
      }
      input{
        padding-right: 0.5rem;
        font-size: 0.48rem;
        color: #cdcdd1;
        direction: rtl;
      }
    }
    .date_picker{
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      .date_option{
        display: flex;
        justify-content: space-between;
        height: 0.98rem;
        align-items: center;
        background-color: #eeeeee;
        span{
          padding-left: 0.5rem;
          color: #525663;
          font-size: 0.45rem;
        }
        span:nth-child(2){
          padding-right: 0.5rem;
          color: #4cc3ad;
          font-size: 0.45rem;
        }

      }
      .widget_date{
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
      }
    }
  }
</style>
