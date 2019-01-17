<template>
  <div class="time_choose">
    <top-header title-txt="选择时间" father-right="确定" @callBackRightClick="confirm"></top-header>
    <!--选择开始时间-->
    <div style="height: 1.61rem;"></div>
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
  import Toast from '../widget/Toast';
  import moment from 'moment';
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
      //    日期大小对比
      toDate(str){
        let sd=str.split(" ");
        let data = sd[0].split('-');
        return new Date(data[0],data[1],data[2]);
      },
      //    时间大小对比
      CompareDate(t1,t2){
        let date = new Date();
        let a = t1.split(":");
        let b = t2.split(":");
        return date.setHours(a[0],a[1]) > date.setHours(b[0],b[1]);
      },
      confirm(){
        let sTime = this.screenTime.startTime;
        let eTime = this.screenTime.endTime;
        if(moment(sTime).isBefore(eTime)){
          eventBus.$emit('runTime',this.screenTime);
          this.$router.go(-1);
        }else{
          new Toast("选择结束时间必须大于开始时间！").show();
        }
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
