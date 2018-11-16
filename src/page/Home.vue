<template>
  <div class="home">
     <div class="banner_contenr">
       <div class="home_title">青松云商商户版</div>
       <van-swipe :autoplay="3000">
         <van-swipe-item><img src="../assets/images/banner.png" alt="" style="width: 100%;height: 4.71rem;"></van-swipe-item>
       </van-swipe>
       <ul class="home_module">
         <li>
           <router-link :to="{path:'/storeInfo'}">
             <img src="../assets/images/icon_business_info.png" alt="">
             <p>商户资料</p>
           </router-link>
         </li>
         <li>
           <router-link :to="{path: '/storeManage'}">
             <img src="../assets/images/icon_shop_manage.png" alt="">
             <p>店铺管理</p>
           </router-link>
         </li>
         <li>
           <router-link :to="{path: '/shopList'}">
             <img src="../assets/images/icon_goods_manage.png" alt="">
             <p>商品管理</p>
           </router-link>
         </li>
         <li>
           <router-link :to="{path: '/dataStatistics'}">
             <img src="../assets/images/icon_data.png" alt="">
             <p>数据统计</p>
           </router-link>
         </li>
       </ul>
     </div>
     <div class="data">
        <p class="data_title">
          <img src="../assets/images/icon_vertical_bar.png" alt="">
          本月销售数据
        </p>
        <ul>
          <li>
            <p class="data_title_msg">订单实付金额(元)</p>
            <p class="data_title_num">{{series.pay_amount}}</p>
          </li>
          <li>
            <p class="data_title_msg">订单数量</p>
            <p class="data_title_num">{{series.order_num}}</p>
          </li>
          <li>
            <p class="data_title_msg">下单用户数量</p>
            <p class="data_title_num">{{series.user_num}}</p>
          </li>
        </ul>
     </div>
  </div>
</template>

<script>

  import * as API from '../service/API';
  import Toast from '../widget/Toast';
  import Loading from '../widget/loading/loading'

  export default {
    data() {
      return {
        series:{}
      }
    },
    methods:{
      getOrderTotal(){
        let loading = new Loading();
        loading.show();
        this.$post(API.ORDER_TOTAL_NUM).then((response)=>{
          if(response.code!=200){
            new Toast(response.msg).show();
          }
          this.series = response.series;
          loading.close();
        }).then((error)=>{
          loading.close();
        });
      }
    },
    mounted(){
      this.getOrderTotal();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  .home{
    background-color: #EEEEEE;
    font-size: .6rem;
    color: $font_100;
  }
  .banner_contenr{
    padding: 0 .5rem .8rem;
    background-color: white;
    margin-bottom: .3rem;
  }
  .home_title{
    margin: .88rem 0 .7rem;
  }
  /*  模块选择  */
  .home_module{
    display: flex;
    justify-content: space-around;
    padding-top: .8rem;
    font-size: 0;
  }
  .home_module li{
    text-align: center;
  }
  .home_module img{
    width: .83rem;
    height: .83rem;
  }
  .home_module p{
    padding-top: .3rem;
    font-size: .4rem;
    color: $font_100;
  }
  .home_module span{
    font-size: .3rem;
    color: #d5d8dd;
  }
  /*  本月销售数据统计  */
  .data{
    background-color: white;
    padding: .6rem .5rem;
  }
  .data_title{
    font-size: .5rem;
    color: $font_100;
  }
  .data_title img{
    width: .1rem;
  }
  .data ul{
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .data ul li{
    width: 3.71rem;
    height: 2.7rem;
    background: url("../assets/images/data_bg.png") no-repeat center;
    background-size: cover;
    text-align: center;
    font-size: .3rem;
    color: #999999;
  }
  .data_title_msg{
    padding-top: .7rem;
  }
  .data_title_num{
    padding-top: .25rem;
    font-size: .48rem;
    color: $font_100;
  }
</style>
