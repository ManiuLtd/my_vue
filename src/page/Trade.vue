<template>
  <div>
    <top-header title-txt="选择行业" father-right="确定" @callBackRightClick="saveTrade"></top-header>
    <ul style="padding-top: 1.61rem;" class="clear">
      <li v-for="(trade,index) in tradeList" v-text="trade.pt_name" @click="chooseTrade(trade)" :class={choose_title:selectTradeIds.includes(trade.pt_id)}></li>
    </ul>
  </div>
</template>
<script>
  import * as API from '../service/API';
  import Toast from '../widget/Toast';
  import TopHeader from '../components/TopHeader'
  import eventBus from  '../utils/eventBus'

  export default {
    data() {
      return {
        tradeList:[],
        selected:[],
        selectTradeIds:[],
        selectTradeRate:'',
        selectTradeName:''
      };
    },
    methods:{
      getTrade(){
        this.$get(API.PARTNER_TRADE_INFO).then((response)=>{
          if(response.code!=200){
            new Toast(response.msg).show();
            return;
          }
          this.tradeList = response.data;
        })
      },
      saveTrade(){
        eventBus.$emit('getTrade',{tradeRate:this.selectTradeRate,tradeName:this.selectTradeName});
        this.$router.go(-1);
      },
      chooseTrade(trade){
        this.selectTradeIds.splice(0,this.selectTradeIds.length);
        this.selectTradeIds.push(trade.pt_id);
        this.selectTradeRate = trade.pt_brokerage_rate;
        this.selectTradeName = trade.pt_name;
      },
    },
    mounted(){
      this.getTrade();
    },
    components:{TopHeader}
  }
</script>
<style lang="scss" scoped>
  @import "../style/common.scss";
  ul{
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 0 .2rem;
  }
  ul li{
    width: 3.08rem;
    line-height: 1.05rem;
    background-color: #F6F7F7;
    margin: 0.5rem 0.18rem 0;
    font-size: .4rem;
    color: $font_100;
    text-align: center;
  }
  li.choose_title{
    background-color: #E5F2EF;
  }
</style>
