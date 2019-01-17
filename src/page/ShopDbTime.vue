<template>
  <div class="time_choose">
    <top-header title-txt="选择时间" father-right="确定" @callBackRightClick="confirm"></top-header>
    <!--选择开始时间-->
    <div style="margin-top: 1.61rem;"></div>
    <div class="time_title">
      <p class="time_data" v-text="screenTime.startTime"></p>
      <p>开始时间</p>
    </div>
    <van-datetime-picker type="time" v-model.trim="stateDate" :show-toolbar=showToolbar @change="startChange"/>
    <!--选择结束时间-->
    <div class="time_title">
      <p class="time_data" v-text="screenTime.endTime"></p>
      <p>结束时间</p>
    </div>
    <van-datetime-picker v-model.trim="endDate" type="time" :show-toolbar=showToolbar @change="endChange"/>
  </div>
</template>

<script>
  import TopHeader from '../components/TopHeader'
  import eventBus from  '../utils/eventBus'
  import DateUtils from '../utils/DateUtils';
  import Toast from '../widget/Toast';

  export default {
    data() {
      return {
        showToolbar:false,
        minDate: false,
        stateDate: '8:00',
        endDate: '22:00',
        screenTime:{
          startTime:'8:00',
          endTime:'22:00'
        },
      };
    },
    methods:{
      //     开始时间选择
      startChange(picker,value,index){
        this.screenTime.startTime = this.stateDate;
      },
      //     结束时间选择
      endChange(picker,value,index){
        this.screenTime.endTime = this.endDate;
//        this.screenTime.endTime = new DateUtils().formatDate(this.endDate,"HH:mm:ss");
      },
      //    选择数据
      formatter(type, value) {
        if (type === 'hour') {
          return `${value}时`
        } else if (type === 'minute') {
          return `${value}分`
        }
        return value;
      },
      confirm(){
        if(this.CompareDate(this.screenTime.endTime,this.screenTime.startTime)){
          eventBus.$emit('runDbTime',this.screenTime);
          this.$router.go(-1);
        }else {
          new Toast("选择结束时间必须大于开始时间！").show();
        }
      },
      CompareDate(t1,t2){
        var date = new Date();
        var a = t1.split(":");
        var b = t2.split(":");
        return date.setHours(a[0],a[1]) > date.setHours(b[0],b[1]);
      }
    },
    components:{
      TopHeader
    }
  }
</script>

<style scoped>
  .time_title{
    display: flex;
    justify-content: space-between;
    height: 1rem;
    background-color: #EEEEEE;
    font-size: .4rem;
    color: #999999;
    padding: 0 .5rem;
  }
  .time_title .time_data{
    color: #4cc3ad;
  }
  .time_title p{
    line-height: 1rem;
  }
</style>
