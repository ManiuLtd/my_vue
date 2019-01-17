<template>
  <div>
    <top-header title-txt="订单详情"></top-header>
    <div class="order_details">
      <div class="state" v-if="order.order_status == 0">待确认</div>
      <div class="state" v-if="order.order_status == 1">待审核</div>
      <div class="state" v-if="order.order_status == 2">待支付</div>
      <div class="state" v-if="order.order_status == 3">已支付</div>
      <div class="state" v-if="order.order_status == 4">发货中</div>
      <div class="state" v-if="order.order_status == 5">已发货</div>
      <div class="state" v-if="order.order_status == 6">退款处理中</div>
      <div class="state" v-if="order.order_status == 7">已退款</div>
      <div class="state" v-if="order.order_status == 8">已收货</div>
      <div class="state" v-if="order.order_status == 9">已取消</div>
      <div class="state" v-if="order.order_status == 10">已完成</div>
      <div class="state" v-if="order.order_status == 11">待还款</div>
      <div class="state" v-if="order.order_status == 12">还款确认中</div>
      <div class="state" v-if="order.order_status == 13">支付处理中</div>
      <!--   收货地址  -->
      <div class="consignee">
        <div class="consignee_title">
          <p>收货人：{{order.consignee}} &nbsp;&nbsp;{{order.consignee_mbl}}</p>
        </div>
        <div class="userInfo userANum">
          <img src="../assets/images/icon_user_Anum.png" alt="" style="width: .34rem;height: .42rem;">
          <p>用户账号：{{order.u_code}}</p>
        </div>
        <div class="userInfo userAddress">
          <img src="../assets/images/icon_receiving_address.png" alt="" style="width: .34rem;height: .42rem;">
          <p>收货地址：{{order.order_address}}</p>
        </div>
        <div class="userInfo userMark">
          <img src="../assets/images/icon_order_remarks.png" alt="">
          <p>用户备注：{{order.order_remark}}</p>
        </div>
      </div>
      <!--  商品详情  -->
      <div class="content margin-top-20" >
        <div class="product" v-for="item in goodsList">
          <img :src="fileHost + item.g_imgs" alt="商品图片">
          <div class="product_price">
            <p class="product_title">{{item.g_name}}</p>
            <p class="product_spec">{{item.gn_spec_num.replace('/',' ')}}/件</p>
            <p class="product_spec product_num">x{{item.order_goods_nums}}</p>
            <p class="product_spec product_money">￥{{item.goods_unit_price}}</p>
          </div>
        </div>
        <ul class="total">
          <li>
            <p class="total_name"><img src="../assets/images/icon_total.png" alt="">商品合计</p>
            <p class="total_money">￥{{order.goods_total}}</p>
          </li>
          <li>
            <p class="total_name"><img src="../assets/images/icon_distribution_fee.png" alt="">配送费</p>
            <p class="total_money">￥{{order.order_delivery_fee}}</p>
          </li>
          <li>
            <p class="total_name"><img src="../assets/images/icon_price_reduction.png" alt="">满减优惠</p>
            <p class="total_money">-￥{{order.buy_up_amount}}</p>
          </li>
          <li>
            <p class="total_name"><img src="../assets/images/icon_discount.png" alt="">优惠金额</p>
            <p class="total_money" style="color: #db6045;">-￥{{order.reduction_amount}}</p>
          </li>
          <li>
            <p class="total_name" style="color: #0f1620;"><img src="../assets/images/icon_sum.png" alt="">实际付款金额</p>
            <p class="total_money" style="color: #db6045;">￥{{order.order_fat_pay_amount}}</p>
          </li>
        </ul>
      </div>
      <!--  订单信息  -->
      <div class="order_msg margin-top-20">
        <ul class="total">
          <li>
            <p class="total_name">订单编号</p>
            <p class="total_money">{{order.order_no}}</p>
          </li>
          <li>
            <p class="total_name">下单时间</p>
            <p class="total_money">{{order.order_add_time}}</p>
          </li>
          <li>
            <p class="total_name">配送方式</p>
            <p class="total_money">{{order.order_delivery_type == 1 ? '商家送货' : '买家自提'}}</p>
          </li>
          <li>
            <p class="total_name">支付方式</p>
            <p class="total_money">{{order_pay_type}}</p>
          </li>
        </ul>
      </div>
      <!--  备注  -->
      <div class="remarks margin-top-20 clear" v-show="oRemartsIsShow">
        商家备注 <span type="text" v-text="oRemarts"></span>
      </div>
      <!--  操作 -->
      <div class="btn cl">
        <span v-if="((order.order_pay_type == 1 || order.order_pay_type ==2) && (order.order_status == 3 || order.order_status ==4))" @click="sendOrder(order.order_id)" >确认发货</span>
        <span @click="isShowDialog = true" v-if="(((order.order_pay_type == 1 || order.order_pay_type ==2) && (order.order_status == 2)) || ((order.order_pay_type ==3) && (order.order_status == 0)))" style="margin-right: .7rem;border-color:#4CC3AD;">修改金额</span>
        <!--<router-link to="/orderTrack">-->
        <span style="font-size: 0.36rem;color: #1a1b39" @click="orderTrackInfo(order.order_id)">订单跟踪</span>
        <!--</router-link>-->
        <span @click="orderRemarks(order.order_id)" >备注</span>
      </div>
    </div>
    <!--修改金额弹出框-->
    <div class="pop-box" v-show="isShowDialog" >
      <div class="gray-bg"></div>
      <div class="pop-content">
        <div class="close_box" @click="isShowDialog = false">
          <img class="close" src="../assets/images/icon_offer_dialog_close.png"/>
        </div>
        <div class="total_money">
          <span class="total_money_tips">商品合计</span>
          <span class="total_money_content">￥{{order.order_amount}}</span>
        </div>
        <div class="final_pay_money">
          <span class="final_pay_tips">实际付款金额</span>
          <span class="final_pay_content">￥{{orderPayMoney}}</span>
        </div>
        <div class="offer_money">
          <span class="offer_money_tips">优惠金额</span>
          <input class="input_money" type="number" placeholder="输入要减免的金额" v-model.trim="offerMoney" v-on:input="changeMoney()"/>
        </div>
        <div class="option_box" @click="fixOrderMoney">
          <span class="complete">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import TopHeader from '../components/TopHeader'
  import * as API from '../service/API';
  import Toast from '../widget/Toast';
  import eventBus from  '../utils/eventBus'
  import { Dialog } from 'vant'

  export default {
    data() {
      return {
        fileHost:process.env.ALY_IMG_URL,
        goodsList:[],
        order:{},
        order_pay_type:'',
        isShowDialog:false,
        offerMoney:0,   // 优惠金额
        orderPayMoney:0,  // 实际支付金额
        oRemartsIsShow:true,   //商家备注是否显示
        oRemarts:'',  //商家备注内容
      };
    },
    created() {
      eventBus.$on('getRemarks',this.getORemarks)
    },
    methods:{
      inArray(item,datas){
        var has = false;
        for(var key in datas){
          if(datas[key] == item){
            has = true;
          }
        }
        return has;
      },
      getOrderInfo(){
        let orderId = this.$route.params.id;
        let requestUrl = API.BASEURL + `/order/detail/${orderId}.html`;
        this.$get(requestUrl).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return ;
          }
          this.goodsList = response.goodsList;
          this.order = response.order;

          this.orderPayMoney = this.order.order_amount;
          //this.order.order_fat_pay_amount -=  this.order.reduction_amount;
          if(response.logList.length > 0){
            this.oRemarts = response.logList[(response.logList.length - 1)].logAdminName ? response.logList[(response.logList.length - 1)].logRemark:'';
          }
          //支付方式【1线下全款，2线上全款，3赊购】
          if(1 == this.order.order_pay_type){
            this.order_pay_type = '线下全款';
          }else if(2 == this.order.order_pay_type){
            this.order_pay_type = '线上全款';
          }else if(3 == this.order.order_pay_type){
            this.order_pay_type = '赊购';
          }
        });
      },
      verifyBenefitAmount(){
        if(this.offerMoney < 0){
          new Toast("减免金额不能为负数").show();
          return false;
        }
        if(parseFloat(this.offerMoney) > this.order.order_amount){
          new Toast("减免金额不能大于订单金额").show();
          return false;
        }
        return true;
      },
      fixOrderMoney(){
        if(!this.verifyBenefitAmount()) return false;
        let data = {};
        let orderId = this.$route.params.id;
        data.oId = orderId;
        data.derate_amt = this.offerMoney;
        let requestUrl = API.BASEURL + `/order/modify/${orderId}.html?oId=${orderId}&derate_amt=${this.offerMoney}`;
        this.$post(requestUrl,data).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }
          this.order.reduction_amount = data.derate_amt;
          this.order.order_fat_pay_amount = this.orderPayMoney;
          new Toast("改价成功").show();
          this.isShowDialog = false;
        });
      },
      orderTrackInfo(id){
        this.$router.push({path: `/orderTrack/${id}`});
      },
      orderRemarks(id){
        this.$router.push({path: `/orderDetailsRemarks/${id}`});
      },
      sendOrder(id){
        Dialog.confirm({
          title: '确认发货吗？'
        }).then(() => {
          var request_url = API.BASEURL+"/order/deliver_goods/"+id+".html";
          this.$post(request_url).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg).show();
              return;
            }
            new Toast(response.msg).show();
            this.order.order_status = 5;
          })
        }).catch(() => {
          // on cancel
        });
      },
      changeMoney(){
        if(!this.verifyBenefitAmount()) return false;
        this.orderPayMoney = this.order.order_amount - Number(this.offerMoney);
      },
      getORemarks(content){
        this.oRemartsIsShow = content.IsShow;
        this.oRemarts = content.oRemarks;
      }
    },
    activated (){
      this.getOrderInfo();
    },
    components:{
      TopHeader
    }
  }
</script>
<style lang="scss" scoped>
  @import "../style/common";
  .order_details{
    padding-top: 1.61rem;
    background-color: #eee;
    margin-bottom: 1.4rem;
    padding-bottom: .4rem;
  }
  .order_details div{
    background-color: white;
  }
  /*  状态  */
  .order_details .state{
    padding-left: .9rem;
    background-color: #4CC3AD;
    color: #ffffff;
    font-size: .4rem;
    line-height: 1.62rem;
    font-weight: 600;
  }
  /*  收货人信息  */
  .consignee{
    padding:.5rem;
  }
  .consignee_title{
    font-size: 0;
    padding-bottom: .45rem;
  }
  .consignee_title p{
    display: inline-block;
    font-size: .48rem;
    color: $font_100;
    padding-left: .6rem;
    vertical-align: top;
  }
  .consignee_title p:nth-child(2){
    float: right;
    padding: 0;
  }
  /*  收货人信息 */
  .userInfo{
    font-size: .4rem;
    color: #686868;
    position: relative;
    padding-left: .54rem;
    margin-bottom: .2rem;
  }
  .userInfo img{
    position: absolute;
    top: .05rem;
    left: 0;
    width: 0.34rem;
    height: 0.42rem;
  }
  /*  备注 */
  .remarks{
    padding: .48rem .7rem;
    font-size: .4rem;
    color: #686868;
  }
  .remarks span{
    max-width: 80%;
    display: inline-block;
    float: right;
    font-size: .4rem;
    word-wrap: break-word;
    color: #1a1b39;
  }
  /*  商品详情  */
  .content{
    padding: 0 .7rem .48rem;
    font-size: 0;
    overflow: hidden;
  }
  .content .product{
    height: 1.56rem;
    position: relative;
    margin: .55rem 0;
    padding-top: .55rem;
  }
  .order_details .content .product:nth-child(1){
    padding-top: 0;
  }
  .content .product img{
    width: 1.56rem;
    height: 1.56rem;
    border-radius: 8px;
  }
  .content .product_price{
    max-width: 80%;
    display: inline-block;
    vertical-align: top;
    padding-left: .2rem;
  }
  .product_title{
    font-size: .48rem;
    color: $font_100;
  }
  .product_spec{
    position: absolute;
    bottom: 0;
    font-size: .36rem;
    color: #686868;
  }
  .product_num{
    right: 3rem;
  }
  .product_money{
    right: 0;
    font-size: .4rem;
    font-weight: 600;
    color: $font_100;
  }
  /*  商品合计  */
  .total{
    width: 100%;
    border-top: 1px solid #DFDFDD;
  }
  .total li{
    padding: .5rem 0 .25rem;
    font-size: .4rem;
    color: #686868;
  }
  .total li p{
    display: inline-block;
  }
  .total .total_name img{
    width: .4rem;
    height: .4rem;
    margin-right: .22rem;
  }
  .total .total_money{
    float: right;
    color: $font_100;
  }
  /*  订单详情  */
  .order_msg{
    padding: 0 .7rem .25rem;
  }
  .order_msg .total{
    margin-top: 0;
    border-top: 0;
  }
  /*  按钮  */
  .btn{
    width: 100%;
    position: fixed;
    bottom: 0;
    padding: .3rem 0 .35rem;
    border-top: .1px solid #DFDFDD;
    font-size: 0.36rem;
    padding-right: .5rem;
    box-sizing: border-box;
  }
  .btn span{
    display: inline-block;
    float: right;
    padding: .1rem .4rem;
    border: 1px solid #DFDFDD;
    border-radius: 15px;
    margin: 0 .15rem;
  }
  .pop-box{
    .gray-bg{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #000;
      opacity: 0.5;
      z-index: 99999;
    }
    .pop-content{
      top: 30%;
      left: 5%;
      position: fixed;
      box-shadow: 5px 5px 10px #23222259;
      border-radius: 0.2rem;
      width: 9.69rem;
      height: 6.8rem;
      z-index: 100000;
      background-color: white;
      .close_box{
        position: relative;
        .close{
          right: 0;
          top: -2.12rem;
          position: absolute;
          width: 1.01rem;
          height: 2.12rem;
        }
      }
      .total_money{
        height: 1.45rem;
        font-size: 0.48rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eeeeee;
        .total_money_tips{
          color: #1a1b39;
          padding-left: 0.51rem;
        }
        .total_money_content{
          padding-right: 0.57rem;
          color: #686868;
        }
      }
      .final_pay_money{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.45rem;
        font-size: 0.48rem;
        border-bottom: 1px solid #eeeeee;
        .final_pay_tips{
          color: #1a1b39;
          padding-left: 0.51rem;
        }
        .final_pay_content{
          color: #db6045;
          padding-right: 0.57rem;
        }
      }
      .offer_money{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.45rem;
        font-size: 0.48rem;
        .offer_money_tips{
          color: #1a1b39;
          padding-left: 0.51rem;
        }
        .input_money{
          text-align: right;
          padding-right: 0.57rem;
        }
      }
      .option_box{
        margin-top: 1.2rem;
        background-color: #4cc3ad;
        height: 1.3rem;
        border-bottom-left-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .complete{
          color: white;
          font-size: 0.4rem;
        }
      }
    }
  }

</style>
