<template>
    <div class="data_statis">
      <top-header title-txt="数据统计"></top-header>
      <!--tab 选择-->
      <div class="tips">默认显示最近一个月数据信息</div>
      <div class="select_tab">
        <div class="tab_order" v-on:click="setSelect(0)">
          <span :class="{ 'span_unselect': allTab }">全部订单</span>
          <img src="../assets/images/icon_select_line.png" v-show="allTab"/>
        </div>
        <div class="tab_order" v-on:click="setSelect(3)">
          <span :class="{ 'span_unselect': loanTab }">赊购订单</span>
          <img src="../assets/images/icon_select_line.png" v-show="loanTab"/>
        </div>
        <div class="tab_order" v-on:click="setSelect(2)">
          <span :class="{ 'span_unselect': moneyTab }">全款订单</span>
          <img src="../assets/images/icon_select_line.png" v-show="moneyTab"/>
        </div>
      </div>
      <!--订单统计-->
      <div class="count">
        <div class="title">
          <div class="title_left">
            <img src="../assets/images/icon_data_line.png"/>
            <span class="title_left_txt">订单统计</span>
          </div>
          <router-link to="/dataStatisticsSelectTime/1">
            <img class="time" src="../assets/images/icon_time_select.png"/>
          </router-link>
        </div>
        <div class="data_info">
          <div class="data_details">
            <span class="num" v-text="merchantOrderData.user_num"></span>
            <span class="data_tips">下单用户量</span>
          </div>
          <div class="data_details">
            <span class="num" v-text="merchantOrderData.order_num"></span>
            <span class="data_tips">订单数量</span>
          </div>
        </div>
        <div class="data_info">
          <div class="data_details">
            <span class="num" v-text="merchantOrderData.good_num"></span>
            <span class="data_tips">下单商品数量</span>
          </div>
          <div class="data_details">
            <span class="num" v-text="merchantOrderData.total_amount"></span>
            <span class="data_tips">下单金额(元)</span>
          </div>
        </div>
      </div>
      <!--交易统计-->
      <div class="count" style="margin-top: 0.3rem">
        <div class="title">
          <div class="title_left">
            <img src="../assets/images/icon_data_line.png"/>
            <span class="title_left_txt">交易统计</span>
          </div>
          <router-link to="/dataStatisticsSelectTime/2">
            <img class="time" src="../assets/images/icon_time_select.png"/>
          </router-link>
        </div>
        <div class="data_info">
          <div class="data_details">
            <span class="num" v-text="transactionData.user_num"></span>
            <span class="data_tips">付款用户数量</span>
          </div>
          <div class="data_details">
            <span class="num" v-text="transactionData.order_num"></span>
            <span class="data_tips">付款订单数量</span>
          </div>
        </div>
        <div class="data_info">
          <div class="data_details">
            <span class="num" v-text="transactionData.good_num"></span>
            <span class="data_tips">付款商品数量</span>
          </div>
          <div class="data_details">
            <span class="num" v-text="transactionData.total_amount">0</span>
            <span class="data_tips">订单实付金额(元)</span>
          </div>
        </div>
        <div class="data_info">
          <div class="data_details">
            <span class="num" v-text="transactionData.per_num"></span>
            <span class="data_tips">客单价</span>
          </div>
          <div class="data_details" style="background-color: #eeeeee">
            <span class="num"></span>
            <span class="data_tips"></span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import * as API from '../service/API';
  import TopHeader from '../components/TopHeader';
  import Toast from "../widget/Toast";
  import Loading from '../widget/loading/loading'
  import eventBus from  '../utils/eventBus'

  export default {
      data(){
        return {
          allTab:true,
          loanTab:false,
          moneyTab:false,
          merchantOrderData:{}, //商户的订单统计
          transactionData:{}, //商户的订单交易统计
          order_pay_type:'0', //不传，显示全部(0=全部，2=线上，3=赊购)
          selectDate:{}    //选择的时间
        }
      },
    created(){
      eventBus.$on('runTime',this.getTime);
    },
    methods:{
        // 0 全部， 1 赊购， 2 全款
        setSelect(position){
          // 数据重置
          this.allTab = this.loanTab = this.moneyTab = false;
          if(position === 0){
            this.order_pay_type = '0';
            this.allTab = true;
          }else if(position === 3){
            this.order_pay_type = '3';
            this.loanTab = true;
          }else if(position === 2){
            this.order_pay_type = '2';
            this.moneyTab = true;
          }
          this.getOrderTotle();
          this.getOrderStatistics();
        },
        getOrderTotle(){
          let loading = new Loading();
          loading.show();
          let orderData = {};
          if(this.selectDate){
            if(this.selectDate.timeIndex == 1){
              orderData.start_date = this.selectDate.startTime;
              orderData.end_date = this.selectDate.endTime;
            }
          }
          orderData.order_pay_type = this.order_pay_type;
          this.$post(API.ORDER_TOTAL_NUM,orderData).then((res)=>{
            if(res.code != 200) {
              new Toast(res.msg).show();
              return;
            }
            this.merchantOrderData = res.series;
            loading.close();
          }).then((error)=>{
            loading.close();
          });
        },
        getOrderStatistics(){
          let loading = new Loading();
          loading.show();
          let data = {};
          if(this.selectDate){
            if(this.selectDate.timeIndex == 2){
              data.start_date = this.selectDate.startTime;
              data.end_date = this.selectDate.endTime;
            }

          }
          data.order_pay_type = this.order_pay_type;
          this.$post(API.ORDER_TOTAL_PARTNER_PAY,data).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg).show();
              return;
            }
            this.transactionData = response.series;
            loading.close();
          }).then((error)=>{
            loading.close();
          });
        },
        getTime(content){
          this.selectDate = content;
          this.getOrderTotle();
          this.getOrderStatistics();
        }
      },
      mounted(){
        let screenHeigt = window.screen.availHeight;
        document.getElementsByClassName('data_statis')[0].style.height=screenHeigt+'px';
        document.getElementsByClassName('data_statis')[0].style.backgroundColor='#eee';
        this.getOrderTotle();
        this.getOrderStatistics();
      },
      components:{
        TopHeader
      }
    }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  .data_statis .tips{
    font-size: .3rem;
    background-color: #fdeecc;
    color: #e36348;
    margin-top: 1.61rem;
    line-height: .76rem;
    padding-left: .52rem;
  }
  .select_tab{
    background-color: #ffffff;
    height: 1.3rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eeeeee;
    .tab_order{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 3.6rem;
      span{
        padding-top: 0.4rem;
        color:$font_100;
        font-size: 0.4rem;
      }
      img{
        height: 0.06rem;
        width: 3.6rem;
      }
      .span_unselect{
        color: #4cc3ad;
      }
    }
  }
  .count{
    .title{
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.69rem;
      border-bottom: 1px solid #eeeeee;
      .title_left{
        img{
          padding-top: 0.24rem;
          padding-left: 0.52rem;
          width: 0.1rem;
          height: 0.46rem;
        }
        .title_left_txt{
          color:$font_100;
          font-size: 0.5rem;
        }
      }
      .time{
        padding-top: 0.24rem;
        padding-right: 0.5rem;
        width: 0.54rem;
        height: 0.48rem;
      }
    }
    .data_info{
      background-color: #ffffff;
      width: 100%;
      height: 2.25rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eeeeee;
      .data_details{
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-right: 1px solid #eeeeee;
        .num{
          padding-top: 0.4rem;
          color:$font_100;
          font-size: 0.6rem;
        }
        .data_tips{
          color: #999999;
          font-size: 0.3rem;
          padding-bottom: 0.4rem;
        }
      }
    }
  }
</style>
