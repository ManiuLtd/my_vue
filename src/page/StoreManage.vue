<template>
  <div class="shop_home">
    <top-header></top-header>
    <div class="banner_contenr">
      <div class="shop_home_title">
        {{storeInfo.partner_name}}
        <span class="img_warp">
           <img :src="storeInfo.partner_icon?fileHost+storeInfo.partner_icon:'../assets/images/icon_head_img.png'" alt="">
        </span>
      </div>
      <p class="active" v-if="storeInfo.partner_coupons"><span class="active_btn">满减活动</span>
        <span style="margin-right: .4rem" v-text="storeInfo.partner_coupons"></span>
      </p>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in partnerImgs" :key="index">
          <img :src="image" alt="" style="width: 9.8rem;height: 4.71rem;">
        </van-swipe-item>
      </van-swipe>
      <ul class="shop_home_module">
        <li>
          <router-link to="/shopMsg">
            <img src="../assets/images/icon_basic_info.png" alt="">
            <p>基本信息</p>
          </router-link>
        </li>
        <li>
          <router-link to="/shopDb">
            <img src="../assets/images/icon_distribution_info.png" alt="">
            <p>配送信息</p>
          </router-link>
        </li>
        <li @click="shopActive">
          <!--<router-link to="/shopActiveList">-->
            <img src="../assets/images/icon_reduce_active.png" alt="">
            <p>满减活动</p>
          <!--</router-link>-->
        </li>
      </ul>
    </div>
    <div class="info">
      <p class="info_title">
        商家信息
      </p>
      <ul>
        <li>
          <p class="info_title_msg"><img src="../assets/images/icon_position.png" alt="">店铺地址</p>
          <p class="info_title_num" v-text="storeInfo.partner_detail_address"></p>
        </li>
        <li>
          <p class="info_title_msg"><img src="../assets/images/icon_phone.png" alt="">电话</p>
          <p class="info_title_num" v-text="storeInfo.partner_phone">18856565623</p>
        </li>
        <li>
          <p class="info_title_msg"><img src="../assets/images/icon_money.png" alt="">起送金额(元)</p>
          <p class="info_title_num">{{storeInfo.send_out_money}}</p>
        </li>
        <li>
          <p class="info_title_msg"><img src="../assets/images/icon_time.png" alt="">配送时间</p>
          <p class="info_title_num">{{storeInfo.begin_distribut_time}} — {{storeInfo.end_distribut_time}}</p>
        </li>
        <li>
          <p class="info_title_msg"><img src="../assets/images/icon_range.png" alt="">配送范围(直线距离)</p>
          <p class="info_title_num">{{storeInfo.distribut_distance}}公里以内</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as API from '../service/API';
  import Loading from '../widget/loading/loading'
  import TopHeader from '../components/TopHeader'

  export default {
    data() {
      return {
        storeInfo:{},
        fileHost: process.env.ALY_IMG_URL,
        partnerImgs:[
        ]
      }
    },
    methods:{
      getStoreInfo(){
        let loading = new Loading();
        loading.show();
        this.$get(API.PARTNER_INFO).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return ;
          }
          this.storeInfo = response.data;
          if(response.data.partner_imgs){
            for (var index in response.data.partner_imgs){
              this.partnerImgs.push(this.fileHost + response.data.partner_imgs[index].pd_url);
            }
          }
          loading.close();
        }).then((error)=>{
          loading.close();
        });
      },
      shopActive(){
        let loading = new Loading();
        loading.show();
        this.$get(API.SHOP_COUPON_INFO).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else if(response.code == 200){
            if(response.data.coupons && response.data.coupons.length > 0){
              this.$router.replace('./shopActiveList');
            }else{
              this.$router.replace('./shopActiveNothing');
            }
          }
          loading.close();
        }).then((error)=>{
          loading.close();
        });
      },
    },
    mounted(){
      this.getStoreInfo()
    },
    components:{
      TopHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  /*  去掉头部的border */
  .common_header{
    border: none!important;
  }
  .shop_home{
    background-color: #EEEEEE;
    font-size: .6rem;
    color: $font_100;
  }
  .banner_contenr{
    padding: 0 .5rem .8rem;
    background-color: white;
    margin-bottom: .3rem;
  }
  .shop_home_title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.6rem 0 .55rem;
  }
  .shop_home_title .img_warp{
    display: inline-block;
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
    overflow: hidden;
  }
  .shop_home_title .img_warp img{
    width: 1.3rem;
    height: 1.3rem;
  }
  /*   活动提示  */
  .active{
    margin-bottom: .6rem;
  }
  .active span{
    display: inline-block;
    font-size: .36rem;
    color: #999999;
  }
  .active .active_btn{
    padding: .07rem .2rem;
    font-size: .3rem;
    color: #ffffff;
    background-color: #f1502f;
    border-radius: 3px;
    margin-right: .27rem;
  }
  /*  模块选择  */
  .shop_home_module{
    display: flex;
    justify-content: space-around;
    padding-top: .8rem;
    font-size: 0;
  }
  .shop_home_module li{
    text-align: center;
  }
  .shop_home_module img{
    width: 1.4rem;
    height: 1.4rem;
  }
  .shop_home_module p{
    padding-top: .3rem;
    font-size: .4rem;
    color: $font_100;
  }
  .shop_home_module span{
    font-size: .3rem;
    color: #d5d8dd;
  }
  /*  商家信息部分 */
  .info{
    background-color: white;
    padding: .6rem .48rem;
  }
  .info_title{
    font-size: .5rem;
    color: $font_100;
    padding-left: .39rem;
  }
  .info ul{
    width: 100%;
  }
  .info ul li{
    font-size: .3rem;
    color: #999999;
    border-top: 1px solid #dfdfdd;
    padding: .48rem .39rem;
  }
  .info ul li:nth-child(1){
    border: none;
  }
  .info ul li img{
    width: .4rem;
    height: .4rem;
    margin-right: .16rem;
    vertical-align: bottom;
  }
  .info_title_num{
    font-size: .42rem;
    color: $font_100;
    padding-top: .25rem;
  }
</style>
