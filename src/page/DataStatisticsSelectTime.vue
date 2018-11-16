<template>
  <div class="time_choose">
    <top-header title-txt="选择时间" father-right="确定" @callBackRightClick="confirm"></top-header>
    <!--选择开始时间-->
    <div style="margin-top: 1.61rem;"></div>
    <div class="time_title">
      <p class="time_data" v-text="screenTime.startTime"></p>
      <p>开始时间</p>
    </div>
    <van-datetime-picker type="datetime" v-model.trim="stateDate" :show-toolbar=showToolbar @change="startChange"/>
    <!--选择结束时间-->
    <div class="time_title">
      <p class="time_data" v-text="screenTime.endTime"></p>
      <p>结束时间</p>
    </div>
    <van-datetime-picker v-model.trim="endDate" type="datetime" :show-toolbar=showToolbar @change="endChange"/>
  </div>
</template>

<script>
  import TopHeader from '../components/TopHeader'
  import eventBus from  '../utils/eventBus'
  import DateUtils from '../utils/DateUtils';

  export default {
    data() {
      return {
        showToolbar:false,
        minDate: false,
        stateDate: new Date(),
        endDate: new Date(),
        screenTime:{
          startTime:new DateUtils().formatDate(new Date(),"yyyy-MM-dd HH:mm:ss"),
          endTime:new DateUtils().formatDate(new Date(),"yyyy-MM-dd HH:mm:ss"),
          timeIndex:this.$route.params.id,
        },
      };
    },
    methods:{
      //     开始时间选择
      startChange(picker,value,index){
        this.screenTime.startTime = new DateUtils().formatDate(this.stateDate,"yyyy-MM-dd HH:mm:ss");
      },
      //     结束时间选择
      endChange(picker,value,index){
        this.screenTime.endTime = new DateUtils().formatDate(this.endDate,"yyyy-MM-dd HH:mm:ss");
      },
      confirm(){
        eventBus.$emit('runTime',this.screenTime);
        this.$router.go(-1);
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
