<template>
  <div class="shop_home">
    <top-header frouter="/main"></top-header>
    <div class="banner_contenr">
      <div class="shop_home_title">
        {{storeInfo.partner_name}}
        <span class="img_warp">
           <img :src="storeInfo.partner_icon?fileHost+storeInfo.partner_icon:'../assets/images/icon_head_img.png'" alt="">
        </span>
      </div>
      <div class="business_status" v-if="storeStatus == 1">营业状态: 停业中</div>
      <div class="business_status" v-if="storeStatus == 2">营业状态: 营业中</div>
      <div class="business_status" v-if="storeStatus == 3">营业状态: 歇业中</div>
      <div class="active" v-if="storeInfo.partner_coupons">
        <span class="active_btn">满减活动</span>
        <p :class="{'active_info':true,'active_info_show':isActivtShow}">
          <span v-for="(item,index) in activeList" v-text="item"></span>
        </p>
        <i v-if="activeList.length > 2" :class="{'active_arrow_show':isActivtShow}" @click="activeShow"></i>
      </div>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in partnerImgs" :key="index">
          <img :src="image" alt="" style="width: 100%;height: 4.71rem;">
        </van-swipe-item>
      </van-swipe>
      <ul class="shop_home_module">
        <li>
          <router-link to="/shopMsgEdit">
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
        <li>
          <router-link to="/shopActiveList">
            <img src="../assets/images/icon_reduce_active.png" alt="">
            <p>满减活动</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="info">
      <p class="info_title">
        商家信息
      </p>
      <ul>
        <li>
          <p class="info_title_msg"><img src="../assets/images/icon_position.png" alt=""><span>店铺地址</span></p>
          <p class="info_title_num" v-text="storeInfo.partner_detail_address"></p>
        </li>
        <li>
          <p class="info_title_msg"><img src="../assets/images/icon_phone.png" alt=""><span>客服电话</span></p>
          <p class="info_title_num" v-text="storeInfo.partner_phone"></p>
        </li>
        <li>
          <p class="info_title_msg"><img src="../assets/images/icon_delivery.png" alt=""><span>配送方式</span></p>
          <p class="info_title_num" v-if="storeInfo.is_support_distribut=='1'">商家配送</p>
          <p class="info_title_num" v-if="storeInfo.is_support_distribut=='2'">买家自提</p>
        </li>
        <li v-if="storeInfo.is_support_distribut=='1'">
          <p class="info_title_msg"><img src="../assets/images/icon_money.png" alt=""><span>起送金额(元)</span></p>
          <p class="info_title_num">{{storeInfo.send_out_money}}</p>
        </li>
        <li v-if="storeInfo.is_support_distribut=='1'">
          <p class="info_title_msg"><img src="../assets/images/icon_time.png" alt=""><span>配送时间</span></p>
          <p class="info_title_num">{{storeInfo.begin_distribut_time}} — {{storeInfo.end_distribut_time}}</p>
        </li>
        <li v-if="storeInfo.is_support_distribut=='1'">
          <p class="info_title_msg"><img src="../assets/images/icon_range.png" alt=""><span>配送范围(直线距离)</span></p>
          <p class="info_title_num">{{storeInfo.distribut_distance}}公里以内</p>
        </li>
        <li v-if="storeInfo.is_support_distribut=='1'&& storeInfo.free_freight=='1'">
          <p class="info_title_msg"><img src="../assets/images/icon_minimum_freight.png" alt=""><span>最低运费</span></p>
          <p class="info_title_num">{{storeInfo.lowest_freight_distance}}公里以内，运费收取￥{{storeInfo.lowest_freight_money}}</p>
        </li>
        <li v-if="storeInfo.is_support_distribut=='1'&& storeInfo.free_freight=='1'">
          <p class="info_title_msg"><img src="../assets/images/icon_additional_freight.png" alt=""><span>附加运费</span></p>
          <p class="info_title_num">超出{{storeInfo.lowest_freight_distance}}公里，每增加{{storeInfo.addition_freight_distance}}公里，运费增加￥{{storeInfo.addition_freight_money}}</p>
        </li>
        <li v-if="storeInfo.partner_intro">
          <p class="info_title_msg"><img src="../assets/images/icon_business_brief.png" alt=""><span>商家简介</span></p>
          <p class="info_title_num" v-text="storeInfo.partner_intro"></p>
        </li>
        <li v-if="storeInfo.partner_notice">
          <p class="info_title_msg"><img src="../assets/images/icon_announcement.png" alt=""><span>商家公告</span></p>
          <p class="info_title_num" v-text="storeInfo.partner_notice"></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as API from '../service/API';
  import TopHeader from '../components/TopHeader'

  export default {
    data() {
      return {
        storeInfo:{},
        fileHost: process.env.ALY_IMG_URL,
        partnerImgs:[],
        storeStatus:'',   //  商户营业状态（1：强制营业(后台) 2：正常营业 3：暂停营业）
        activeList:[],    // 满减活动显示
        isActivtShow: false,
      }
    },
    beforeRouteLeave(to,from,next){
      if(to.path == '/shopMsgEdit' || to.path == '/shopDb'){
        this.$store.dispatch('setIsRefresh',true);
      }
      next();
    },
   
    methods:{
      getStoreInfo(){
        this.$get(API.PARTNER_INFO).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return ;
          }
          this.storeInfo = response.data;
          this.activeList = this.storeInfo.partner_coupons == null||undefined||'' ? '' : this.storeInfo.partner_coupons.split(" ");
          if(response.data.partner_imgs){
            this.partnerImgs = [];
            for (let index in response.data.partner_imgs){
              this.partnerImgs.push(this.fileHost + response.data.partner_imgs[index].pd_url);
            }
          }
          console.log(this.partnerImgs)
        });
      },
      getstatus(){
        this.$get(API.BUSINESS_STATUS).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return ;
          }else {
            this.storeStatus = response.business_status;
          }
        })
      },
      activeShow(){
        if(this.isActivtShow){
          this.isActivtShow = false;
        }else{
          this.isActivtShow = true;
        }
      },
    },
    activated (){
      this.getStoreInfo();
      this.getstatus();
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
    margin: 1.65rem 0 .55rem;
    font-weight: 600;
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
  /*   营业状态  */
  .business_status{
    text-align: center;
    font-size: .36rem;
    color: #f77357;
    background-color: #fff4db;
    border-radius: .15rem;
    line-height: .8rem;
    margin-bottom: .6rem;
  }
  /*   活动提示  */
  .active{
    display: flex;
    align-items: flex-start;
    margin-bottom: .25rem;
  }
  .active span{
    display: inline-block;
    font-size: .36rem;
    color: #999999;
  }
  .active .active_btn{
    width: auto;
    white-space:nowrap;
    padding: .07rem .2rem;
    font-size: .3rem;
    color: #ffffff;
    background: url('../assets/images/icon_storeManage_active_bg.png') no-repeat center;
    background-size: cover;
    border-radius: .3rem;
    margin-right: .27rem;
  }
  .active .active_info{
    font-size: 0;
    width: 75%;
    height: .5rem;
    overflow: hidden;
    padding-top: .07rem;
  }
  .active .active_info_show{
    height: auto!important;
  }
  .active .active_info span{
    padding-right: .35rem;
    padding-bottom: .26rem;
  }
  .active i{
    display: inline-block;
    width: .4rem;
    height: .4rem;
    margin-top: .07rem;
    background: url("../assets/images/icon_active_arrow.png") no-repeat center;
    background-size: contain;
    transition: all .5s ease 0s;
  }
  .active .active_arrow_show{
    transform: rotate(90deg);
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
    font-weight: 600;
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
  }
  .info_title_msg span{
    vertical-align: middle;
  }
  .info_title_num{
    font-size: .42rem;
    color: $font_100;
    padding-top: .25rem;
  }
  .banner_contenr /deep/ .van-swipe{
    border-radius: 6px;
    overflow: hidden;
  }
  .van-swipe /deep/ .van-swipe__indicator{
    background-color: $font_50;
  }
  .van-swipe /deep/ .van-swipe__indicator--active{
    width: 8px;
    height: 8px;
    margin-top: -1px;
    background-color: $font_100;
  }
</style>
