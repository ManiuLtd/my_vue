<template>
    <div class="content">
      <div class="product_bg">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" class="product_img"/>
          </van-swipe-item>
        </van-swipe>
      </div>
      <img src="../assets/images/back_left_blank.png" class="back" @click="back"/>
      <div class="product_info">
        <div class="introduction">
          <div class="title">
            <span class="brand" v-text="goodsData.gb_name"> </span>
            <span class="goods_name" v-text="goodsData.g_name"></span>
          </div>
          <div class="goods_center">
            <div class="goods_info">
              <div class="type">
                <img class="icon_good_type" src="../assets/images/icon_goods_type.png"/>
                <span class="goods_type">商品品类：<span v-text="goodsCatName"></span></span>
              </div>
              <div class="type limit_num">
                <img class="icon_good_type" src="../assets/images/icon_goods_limit_num.png"/>
                <span class="goods_type" >订单限购数量：{{ goodsData.g_order_num > 0?goodsData.g_order_num + "件/笔":"不限购" }}<span v-text=""></span> </span>
              </div>
            </div>
          </div>
          <div class="money" >
            <span class="price" v-text="goodsData.show_price"></span>
          </div>
          <div class="operate" v-show="inArray(goodsData.g_status,showEditStatus) || inArray(goodsData.g_status,showChangeStatus)">
            <span class="btn goods_edit" v-if="inArray(goodsData.g_status,showEditStatus)" @click="goodsEdit(goodsData.g_id)">编辑</span>
            <span class="btn release" v-if="inArray(goodsData.g_status,showChangeStatus)" @click="updataStatus" v-text="(goodsData.g_status == 5)?'下架':'上架'"></span>
          </div>
          <div class="offer_activity">
            <!--<span class="activity_txt">优惠活动</span>-->
            <!--<span class="activity_content">满300减20  满500减50</span>-->
            <span class="activity_content" v-if="goodsData.is_join_activity==1">该商品已参与满减活动</span>
            <span class="activity_content" v-if="goodsData.is_join_activity==2">该商品不参与满减活动</span>
          </div>
          <div class="summary">
            <div class="summary_title">
              <img class="summary_left_bg" src="../assets/images/icon_goods_title_left.png"/>
              <span class="summary_txt">商品简介</span>
            </div>
            <span class="sumamry_content" v-text="goodsData.g_desc"></span>
          </div>
        </div>
        <div class="goods_standard">
          <div class="goods_content" v-for="(item,index) in goodSpecData">
            <div class="standard_title">
              <img class="standard_title_left" src="../assets/images/icon_goods_title_left.png"/>
              <span class="standard_txt">商品规格{{convert(index+1)}}</span>
            </div>
            <transition name="fade">
              <div class="standard_info" v-show="specShow">
                <ul>
                <li>规格类型：
                  <span v-if="item.gn_spec_type==1">重量</span>
                  <span v-if="item.gn_spec_type==2">容量</span>
                </li>
                <li>规格单位：<span v-text="item.old_gn_spec_num.substr((item.old_gn_spec_num.indexOf('/')+1))"></span></li>
                <li>规格值：<span v-text="parseInt(item.gn_spec_num)"></span></li>
                <li>单价(元)：<span v-text="item.gn_price"></span></li>
                <li>剩余库存值(件)：<span v-text="item.gn_stock"></span></li>
                <li>库存值提醒(件)：<span v-text="item.gn_stock_remind"></span></li>
              </ul>
              </div>
            </transition>
            <div class="arrow" @click="IsShowSpec">
              <img :class="{show_img:specShow}" src="../assets/images/icon_my_arrow.png"/>
            </div>
          </div>

        </div>
        <div class="goods_property">
          <div class="property_title">
            <img class="property_title_left" src="../assets/images/icon_goods_title_left.png" />
            <span class="property_txt">商品属性</span>
          </div>
          <div class="property_info">
            <ul>
              <li v-for="v,k in attribute">{{v}} : {{attributeValue[k]}}</li>
            </ul>
          </div>
        </div>
        <div class="review">
          <div class="review_title">
            <img class="review_title_title" src="../assets/images/icon_goods_title_left.png"/>
            <span class="review_txt">审核信息</span>
          </div>
          <div class="review_info">
            <ul>
              <li>操作人:<span v-text="resultsData.check_name"></span></li>
              <li>操作时间:<span v-text="resultsData.check_time"></span></li>
            </ul>
          </div>
        </div>
        <div class="remarks_box">
          <div class="remarks">
            <span class="remarks_tips">审核备注:</span>
            <span class="remarks_info" v-text="resultsData.check_info"></span>
          </div>
      </div>
    </div>
   </div>
</template>

<script>

  import Vue from 'vue';
  import { Swipe, SwipeItem ,Lazyload} from 'vant';
  import Toast from '../widget/Toast';
  import * as API from '../service/API';
  import Loading from '../widget/loading/loading'


  Vue.use(Swipe).use(SwipeItem).use(Lazyload);

    export default {
      data(){
        return {
          images: [],
          goodsData:{},     //  商品信息
          showEditStatus:[2,3,5,6], //可编辑状态
          showChangeStatus:[2,5,6], //可上下架状态
          topLevelData:{},     //  商品信息
          goodSpecData:[],   //  商品规格
          goodspartner:{},   // 商品简介
          goodsImg:{},      //商品图片
          goodsCatName:'',      //商品图片
          attribute:{}, //商品属性
          attributeValue:{}, //商品属性值
          resultsData:{
            check_name:'', //审核操作人
            check_time:'', //审核时间
            check_info:'', //审核备注
          },
          specShow:true,  // 商品规格显示或隐藏
        }
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
        getDoodsDetails(){
          let loading = new Loading();
          loading.show();
          let goodId = this.$route.params.id;
//          /goods/goods_detail/{gId}.html
          let requestUrl = API.BASEURL + `/goods/goods_detail/${goodId}.html?g_id=${goodId}`;
          this.$get(requestUrl).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg).show();
              return;
            }
            this.goodsData = response.goods_data;
            this.goodsData.show_price = response.show_price;

            if(response.gcInfos.threeInfo.gcName){
              this.goodsCatName = response.gcInfos.threeInfo.gcName;
            }else if(response.gcInfos.secongInfo.gcName){
              this.goodsCatName = response.gcInfos.secongInfo.gcName;
            }else{
              this.goodsCatName = response.gcInfos.firstInfo.gcName;
            }

            this.attribute = response.gc_attribute;
            this.attributeValue = response.g_attribute;
            this.topLevelData = response.gcInfos;
            this.goodSpecData = response.goods_spec;
            this.goodsImg = response.goods_image.d;
            console.log(this.goodSpecData);
            if(response.results[0]){
              this.resultsData = response.results[0];
            }
            this.getGoodsImg();
            loading.close();
          }).then((error)=>{
            loading.close();
          });
        },
        getGoodsImg(){
          this.fileHost = process.env.ALY_IMG_URL;
          for(var i=0;i<this.goodsImg.length;i++){
            if(this.goodsImg[i].pd_url){
              this.images.push(this.fileHost + this.goodsImg[i].pd_url);
            }
          }
        },
        back(){
          this.$router.go(-1);
        },
        goodsEdit(id){
          this.$router.push({path: `/goodsEdit/${id}`});
        },
        updataStatus(){
          let loading = new Loading();
          let data = {};
          data.gId = this.goodsData.g_id;
          loading.show();

          this.$get(API.BASEURL+'/goods/update_status.html',{},data).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg).show();
              return;
            }

            this.goodsData.g_status = response.new_status
            new Toast(response.msg).show();
            console.log(this.goodsData.g_status);
            loading.close();
          }).then((error)=>{
            loading.close();
          });
        },
        convert(str){
            var arr = ["1","2","3","4","5","6","7","8","9","10"];
            var Arr = ["一","二","三","四","五","六","七","八","九","十"];
            for (var i = 0; i < arr.length; i++) {
//              console.log(new RegExp(arr[i], "g"));
              var num = str.toString();
              str = num.replace(new RegExp(arr[i], "g"), Arr[i]);
            }
          return str;
        },
        IsShowSpec(){
          this.specShow = !this.specShow;
        }
      },
      mounted(){
        let screenHeigt = window.screen.availHeight;
        document.getElementsByClassName('content')[0].style.height=screenHeigt+'px';
        document.getElementsByClassName('content')[0].style.backgroundColor='#eee';
        this.getDoodsDetails();
      }
    }
</script>
<style lang="scss" scoped>
  .content{
    font-size: 0;
    .product_bg{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 10.08rem;
      .product_img{
        width: 100%;
        height: 10.08rem;
        background-size: cover;
        z-index: 0;
      }
    }
    .back{
      width: 1.61rem;
      height: 1.61rem;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 99999;
    }
    .product_info{
      z-index: 100000;
      position: relative;
      top: 9rem;
      left: 0;
      background-color: #eeeeee;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      overflow: hidden;
      .introduction{
          background-color: white;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          .title{
            padding-top: 0.52rem;
            display: flex;
            .brand{
              margin-top: 0.2rem;
              display: inline-block;
              background:url("../assets/images/icon_brand_bg.png") no-repeat;
              background-size: cover;
              width: 1.48rem;
              height: 0.48rem;
              color: white;
              margin-left: 0.51rem;
              text-align: center;
              font-size: 0.3rem;
            }
            .goods_name{
              padding-left: 0.3rem;
              color: #1a1b39;
              font-size: 0.58rem;
            }
          }
          .goods_center{
            margin-top: 0.3rem;
            display: flex;
            justify-content: space-between;
            .goods_info{
              .type{
                display: flex;
                .icon_good_type{
                  padding-top: 0.05rem;
                  padding-left: 0.51rem;
                  width: 0.38rem;
                  height: 0.35rem;
                }
                .goods_type{
                  padding-left: 0.18rem;
                  font-size: 0.32rem;
                  color: #5d5d5d;
                }
              }
              .limit_num{
                margin-top: 0.28rem;
              }
            }
            .goods_edit{
              margin-right: 0.78rem;
              font-size: 0.36rem;
              color: #898989;
              width: 2.07rem;
              height: 0.78rem;
              border-radius: 0.39rem;
              border: 1px solid #dfdfdd;
              display: block;
              line-height: 0.78rem;
              text-align: center;
            }
          }
          .money{
            margin-top: 0.39rem;
            display: flex;
            justify-content: space-between;
            .price{
              margin-left: 0.3rem;
              color: #e36348;
              font-size: 0.7rem;
            }
            .release{
              box-sizing: border-box;
              margin-right: 0.78rem;
              padding: 0 .2rem;
              font-size: 0.36rem;
              color: #4cc3ad;
              min-width: 2.07rem;
              height: 0.78rem;
              border-radius: 0.39rem;
              border: 1px solid #4cc3ad;
              display: block;
              line-height: 0.78rem;
              text-align: center;
            }
          }
          .offer_activity{
            margin-top: 0.42rem;
            display: flex;
            align-items: center;
            height: 1.34rem;
            width: 100%;
            background-color: rgba(76,195,173,0.1);
            .activity_txt{
              color: #f24f2e;
              font-size: 0.3rem;
              border: 1px solid #f24f2e;
              padding: 0.1rem 0.2rem;
              border-radius: 0.1rem;
              margin-left: 0.51rem;
              height: 0.43rem;
            }
            .activity_content{
              padding-left: 0.22rem;
              color: #45BDA5;
              font-size: 0.42rem;
            }
          }
          .summary{
            margin-top: 0.55rem;
            .summary_title{
              display: flex;
              .summary_left_bg{
                padding-top: 0.16rem;
                width: 0.16rem;
                height: 0.42rem;
                margin-left: 0.51rem;
              }
              .summary_txt{
                padding-left: 0.18rem;
                font-size: 0.48rem;
                color: #1a1b39;
              }
            }
            .sumamry_content{
              padding: 0.3rem 0.64rem 0.57rem 0.51rem;
              display: inline-block;
              font-size: 0.42rem;
              line-height: 0.6rem;
              color: #5d5d5d;
            }
          }
        }
      .goods_standard {
        background-color: white;
        margin-top: 0.2rem;
        .goods_content{
          display: flex;
          justify-content: space-between;
          padding-bottom: 0.46rem;
        .standard_title {
          margin-top: 0.64rem;
          display: flex;
          .standard_title_left {
            padding-top: 0.16rem;
            width: 0.16rem;
            height: 0.42rem;
            padding-left: 0.51rem;
          }
          .standard_txt {
            padding-left: 0.18rem;
            color: #1a1b39;
            font-size: 0.48rem;
          }
        }
        .standard_info {
          margin-top: 0.7rem;
          margin-left: -2.5rem;
          ul{
           li {
              line-height: 0.68rem;
              color: #666666;
              font-size: 0.42rem;
            }
          }
        }
        .arrow{
          margin-top: .64rem;
          padding:0.16rem 0.51rem 0 0;
          img{
            width: 0.2rem;
            height: 0.3rem;
          }
          .show_img{
            transition: all .5s ease 0s;
            transform: rotate(90deg);
          }
        }
      }
    }
      .goods_property{
        display: flex;
        background-color: white;
        margin-top: 0.2rem;
        .property_title{
          margin-top: 0.64rem;
          display: flex;
          .property_title_left{
            padding-top: 0.16rem;
            width: 0.16rem;
            height: 0.42rem;
            padding-left: 0.51rem;
          }
          .property_txt{
            padding-left: 0.18rem;
            color: #1a1b39;
            font-size: 0.48rem;
          }
        }
        .property_info{
          ul{
            margin-top: 0.7rem;
            margin-bottom: 0.46rem;
            padding-left: 0.64rem;
            li{
              line-height: 0.68rem;
              color: #666666;
              font-size: 0.42rem;
            }
          }
        }
      }
      .review{
        display: flex;
        background-color: white;
        margin-top: 0.2rem;
        .review_title{
          margin-top: 0.64rem;
          display: flex;
          .review_title_title{
            padding-top: 0.16rem;
            width: 0.16rem;
            height: 0.42rem;
            padding-left: 0.51rem;
          }
          .review_txt{
            padding-left: 0.18rem;
            color: #1a1b39;
            font-size: 0.48rem;
          }
        }
        .review_info{
          margin-top: 0.7rem;
          margin-bottom: 0.46rem;
          padding-left: 0.64rem;
          ul{
            li{
              line-height: 0.68rem;
              color: #666666;
              font-size: 0.42rem;
            }
          }
        }
      }
      .remarks_box{
          background-color: white;
          margin-bottom: 2.3rem;
          .remarks{
            border-top: 1px solid #eeeeee;
            font-size: 0;
            padding-bottom: 0.52rem;
            padding-top: 0.46rem;
            margin: 0 0.51rem 0 0.52rem;
            .remarks_tips{
              line-height: 0.7rem;
              color: #1a1b39;
              font-size: 0.42rem;
            }
            .remarks_info{
              line-height: 0.7rem;
              color: #666666;
              font-size: 0.42rem;
            }
          }
        }
    }
  }
  .operate{
    box-sizing: border-box;
    width: 100%;
    padding: .46rem;
    position: fixed;
    bottom: 0;
    background-color: white;
  .btn{
    float: right;
    width: 2.07rem;
    height: 0.78rem;
    border-radius: 0.39rem;
    border: 1px solid #dfdfdd;
    display: inline-block;
    line-height: 0.78rem;
    text-align: center;
    font-size: .36rem;
    color: #898989;
    margin-left: .3rem;
  }
  }
/* vue 动画属性*/
  .fade-enter{       /*准备插入开始的状态，（从false准备到true的开始状态）*/  /*和离开结束的状态一致*/
    opacity: 0;
    transition: all .3s ease 0s;
  }
  .fade-leave-to{    /*离开结束的状态，彻底为false*/
    opacity: 0;
    transition: all .3s ease 0s;
  }
</style>
