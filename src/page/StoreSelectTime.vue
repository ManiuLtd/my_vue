<template>
  <div>
    <top-header title-txt="选择时间" father-right="保存" @callBackRightClick="saveTime"></top-header>
    <div class="select_tab">
      <div class="begin_time" @click="chooseTime(0)">
        <span :class="{'span_select' : beginTab}">开始时间</span>
        <img src="../assets/images/icon_select_line.png" v-show="beginTab"/>
      </div>
      <div class="end_time" @click="chooseTime(1)">
        <span :class="{'span_select' : endTab}">结束时间</span>
        <img src="../assets/images/icon_select_line.png" v-show="endTab"/>
      </div>
    </div>
    <!--通过currentDate获取当前时间 {{currentDate}}-->
    <van-datetime-picker class="data_picker" type="time" v-model.trim="currentDate" :show-toolbar=showToolbar />
  </div>
</template>

<script>
  import TopHeader from '../components/TopHeader'
    export default {
    data(){
      return{
        currentDate:'07:00',
        showToolbar:false,
        //   选中开始结束 or 结束时间
        beginTab:true,
        endTab:false
      }
    },
      methods:{
        saveTime(){
          console.log(this.currentDate);
        },
        //     0 开始时间    1 结束时间
        chooseTime(v){
          //   数据重置
          if(v === 0){
             this.beginTab = true;
             this.endTab = false;
          } else if(v === 1){
            this.beginTab = false;
            this.endTab = true;
          }
        }
      },
      components:{
        TopHeader
      }
    }
</script>

<style lang="scss" scoped>
  .select_tab{
    margin-top: 1.61rem;
    display: flex;
    height: 1.25rem;
    .begin_time{
      width: 5.4rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      span{
        padding-top: 0.42rem;
        font-size: 0.4rem;
      }
      img{
        width: 100%;
        height: 0.05rem;
      }
      .span_select{
        color: #4cc3ad;
      }
    }
    .end_time{
      width: 5.4rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      span{
        padding-top: 0.42rem;
        color: #1a1b39;
        font-size: 0.4rem;
      }
      img{
        width: 100%;
        height: 0.05rem;
      }
      .span_select{
        color: #4cc3ad;
      }
    }

  }
  .data_picker{
    margin-top: 1rem;
  }
</style>
