<template>
  <div class="content" style="overflow: hidden;">
    <div class="content_herder">
      <!--搜索-->
      <div class="top_header">
        <img src="../assets/images/back_left_blank.png" @click="back">
        <div class="search">
          <img src="../assets/images/icon_search.png">
          <input type="text" v-model="searchValue" placeholder="输入商品名称"/>
        </div>
      </div>
      <!--筛选-->
      <div class="select">
        <div class="state" @click="showState">
          <span v-text="state" class="screen_text" :title="state"></span>
          <img src="../assets/images/icon_down.png">
        </div>
        <div class="begin_time" @click="showBrand">
          <span v-text="brand" class="screen_text" :title="brand"></span>
          <img src="../assets/images/icon_down.png">
        </div>
        <div class="end_time" @click="showShelves">
          <span v-text="shelves" class="screen_text" :title="shelves"></span>
          <img src="../assets/images/icon_down.png">
        </div>
      </div>
    </div>
    <div style="height: 3.1rem"></div>
    <van-list v-model="loading" :finished="finished" @load="getGoodList" >
      <!--商品列表-->
      <div class="item" v-for="(item,index) in list" @click="checkDetails(item.g_id)" style="background-color: white;margin-top: 0.19rem;">
        <div class="item-title">
          <span class="order_no">商品编号：<span v-text="item.g_code"></span></span>
          <span class="oreder_state" v-if="item.g_status == 1">待审核</span>
          <span class="oreder_state" v-if="item.g_status == 2">审核通过</span>
          <span class="oreder_state" v-if="item.g_status == 3">打回</span>
          <span class="oreder_state" v-if="item.g_status == 4">待审核</span>
          <span class="oreder_state" v-if="item.g_status == 5">审核通过</span>
          <span class="oreder_state" v-if="item.g_status == 6">审核通过</span>
          <span class="oreder_state" v-if="item.g_status == 7">审核拒绝</span>
        </div>
        <ul class="order_info">
          <li id="order_name">
            <img :src="fileHost + item.g_imgs" alt="">
            <div class="product_price">
              <p class="product_title" v-text="item.g_name"></p>
              <p class="product_spec"><i class="shop_icon"></i>商品品类：<span v-text="item.gc_name"></span></p>
              <p class="product_spec"><i class="shop_icon shop_icon_time"></i>添加时间：<span v-text="item.g_add_time"></span></p>
              <p class="product_spec" v-if="item.g_status == 2 || item.g_status == 5"><i class="shop_icon shop_icon_status"></i>该商品未上架</p>
              <p class="product_spec" v-if="item.g_status == 6"><i class="shop_icon shop_icon_status"></i>该商品已上架</p>
              <p  class="product_spec" style="color:#e36348;" v-if="item.is_join_activity == 2">该商品未参与满减活动</p>
              <p  class="product_spec" style="color:#e36348;" v-if="item.is_join_activity == 1">该商品已参与满减活动</p>
            </div>
            <div class="product_btn clear" @click.stop>
               <span v-show="item.g_status == 2 || item.g_status == 3 || item.g_status == 5 || item.g_status == 6" @click="goodsEdit(item.g_id)">编辑</span>
               <span v-show="item.g_status == 2 || item.g_status == 5 || item.g_status == 6" @click="updataStatus(item)">
                 <a v-if="item.g_status == 2 || item.g_status == 5">下架</a>
                 <a v-if="item.g_status == 6">上架</a>
               </span>
            </div>
          </li>
        </ul>
      </div>
      <!--<div class="item" v-for="(item,index) in list" >-->
        <!--<span>{{index}}</span> <span v-text="item.g_name"></span>-->
      <!--</div>-->
    </van-list>

    <div class="bar_tite" v-text="barTite"></div>
    <!--审核状态弹出框-->
    <van-popup v-model.trim="isShowState" position="bottom">
      <van-picker
        show-toolbar
        value-key="label"
        :columns="showStateData"
        @confirm="stateConfirm"
        @cancel="isShowState = false"
      />
    </van-popup>
    <!--品牌弹出框-->
    <van-popup v-model.trim="isShowBrand" position="bottom">
      <van-picker
        show-toolbar
        value-key="gbName"
        :columns="brandData"
        @confirm="brandConfirm"
        @cancel="isShowBrand = false"
      />
    </van-popup>
    <!--上下架弹出框-->
    <van-popup v-model.trim="isShowShelves" position="bottom">
      <van-picker
        show-toolbar
        value-key="label"
        :columns="ShelvesData"
        @confirm="shelvesConfirm"
        @cancel="isShowShelves = false"
      />
    </van-popup>
    <div class="product_add_box">
      <!--<router-link to="/addGoods">-->
        <img class="add_product" @click="addGoods()" src="../assets/images/icon_product_add.png"/>
      <!--</router-link>-->
    </div>
  </div>
</template>
<script>
  import * as API from '../service/API';
  import Toast from "../widget/Toast";
  import Loading from '../widget/loading/loading'
  import { Dialog } from 'vant'
  import SuccessLoading from '../widget/sucess_loading/SuccessLoading'

  export default {
    data() {
      return {
        currentSelected:1 , //1 赊购，2全款
        goodsData:[],      //商品列表內容
        partnerInfo:{},      //商品列表內容
        state:'状态',
        brand:'品牌',
        shelves:'上下架',
        isShowState : false,  //底部状态弹出框
        isShowBrand: false,   // 品牌弹出框
        isShowShelves: false, // 上下架弹出框
        showStateData:[],     //选择状态
        brandData:[],     //选择品牌
        ShelvesData:[],     //选择上下架
        fileHost:'',
        searchValue: '',
        timerOuter:null, //延迟执行对象，防止重复查询
        list: [],
        pageInfo:{
          total:0,
          currPage:1,
          nextPage:0,
          pageCount:0
        },
        searchData:{
          g_name:'',
          g_check_status:'',
          g_status:'',
          gb_id:'',
        }, //列表查询参数
        loading: false,
        runload:false,
        finished: false,
        barTite:'没有更多啦~',    //  底部字段显示
        editIsShow:'',    // 编辑显示
        shelvesIsShow:'',  // 上下架显示
      };
    },
    computed: {
      searchChang:function () {
        this.searchData.g_name = this.searchValue;
        return this.searchData.g_check_status + this.searchData.g_name + this.searchData.gb_id + this.searchData.g_status;
      }
    },
    watch: {
      searchChang: function () {
        clearTimeout(this.timerOuter);
        if(this.searchValue.length >= 2 || this.searchValue.length == ''){
          this.searchData.g_name = this.searchValue;
          let that = this;
          this.timerOuter = setTimeout(function(){
            that.pageInfo = {
              total:0,
              currPage:1,
              nextPage:0,
              pageCount:0
            }
            that.list = [];
            that.getGoodList();
          },200)
        }

      }
    },
    mounted () {
      let screenHeigt = window.screen.availHeight;
      document.getElementsByClassName('content')[0].style.minHeight=screenHeigt+'px';
      document.getElementsByClassName('content')[0].style.backgroundColor='#eee';
      if(this.list.length == 0){
        this.getGoodList();
      }
      //this.getGoodList();
      this.getFileHost();
    },
    // beforeRouteLeave(to, from, next) {
    //   to.meta.keepAlive = false;
    //   next();
    // },
    methods: {
      addGoods(){
        if(this.partnerInfo.isNormal != 2){
          new Toast("非营业状态不能添加商品").show();
        }else{
          this.$router.push("/addGoods");
        }
      },
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 500);
      },
      getFileHost(){
        this.fileHost = process.env.ALY_IMG_URL;
      },
      switchTab(tab){
        this.currentSelected = tab;
      },
      checkDetails(id){
        this.$router.push({path: `/goodDetails/${id}`});
      },
      getGoodList(){
        //let loading = new Loading();

        if(this.runload){
          return ;
        }

        this.runload = true;

        let data = {};
        data.jdata = {};
        for (var index in this.searchData){
          if(this.searchData[index]){
            data.jdata[index] = this.searchData[index];
          }
        }

        if(this.pageInfo.currPage != this.pageInfo.pageCount){
          data.p = this.pageInfo.nextPage;
        }
        data.jdata = JSON.stringify(data.jdata);
        this.$post(API.GOODS_LIST,data).then((response)=>{
          this.runload = false;
          if(response.code != 200){
            new Toast(response.data.msg).show();
            return;
          }

          //this.goodsData = response.goods_list;
          if(response.goods_list.length > 0){
            this.list = this.list.concat(response.goods_list);
          }

          if(this.showStateData.length == 0){
            this.showStateData = response.check_status;
          }

          if(this.ShelvesData.length == 0){
            this.ShelvesData = response.status;
          }

          if(this.brandData.length == 0){
            this.brandData = response.brand_info;
            this.brandData.unshift({'gbId' : '-1','gbName':'全部'});
          }

          this.pageInfo = response.pageInfo;
          this.partnerInfo = response.partner;
          this.loading = false;
          if(Object.keys(data).length==0 && this.list && this.list.length==0){
            this.$router.replace('/addProduct');
          }
          if(this.pageInfo.currPage ==this.pageInfo.pageCount){
            this.finished = true;
          }
          if(response.goods_list.length > 0){
            this.barTite = '没有更多啦~' ;
          }else {
            this.barTite = '您还没有订单哦~' ;
          }
          //loading.close();
        }).then((error)=>{
          this.runload = false;
          //loading.close();
        });

      },
      back(){
        this.$router.go(-1);
      },
//      显示状态
      showState(){
        let loading = new Loading();
        loading.show();
        this.isShowState = true;
      },
//      状态确定
      stateConfirm(value){
        this.state = value.label;
        this.searchData.g_check_status = value.key;
        this.isShowState = false;
      },

//      显示品牌
      showBrand(){
        let loading = new Loading();
        loading.show();
        this.isShowBrand = true;
      },
//      品牌选择确定
      brandConfirm(value){
        this.brand = value.gbName;
        this.searchData.gb_id = value.gbId;
        this.isShowBrand = false;
      },

//      显示上下架
      showShelves(){
        let loading = new Loading();
        loading.show();
        this.isShowShelves = true;
      },
//      上下架确定
      shelvesConfirm(value){
        this.shelves = value.label;
        this.searchData.g_status = value.key;
        this.isShowShelves = false;
      },
//      点击编辑
      goodsEdit(id){
        this.$router.push({path:`/goodsEdit/${id}`});
      },
//      点击上下架
      updataStatus(item){
        Dialog.confirm({
          title: '您确定要进行上下架操作吗？'
        }).then(() => {
          let loading = new Loading();
          let data = {};
          console.log(item);
          data.gId = item.g_id;
          loading.show();
          this.$get(API.BASEURL+'/goods/update_status.html',{},data).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg).show();
              return;
            }
            item.g_status = response.new_status;
            new SuccessLoading(response.msg).show();
            loading.close();
          }).then((error)=>{
            loading.close();
          });
        }).catch(() => {

        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../style/common.scss";
  /********header*********/
  .content .content_herder{
    width: 100%;
    position: fixed;
    top: 0;
  }
  .top_header{
    width: 100%;
    overflow: hidden;
    height: 1.9rem;
    font-size: 0;
    background-color: white;
  }
  .top_header img{
    width: 1.61rem;
    height: 1.61rem;
  }
  .top_header .search{
    width: 68%;
    display: inline-block;
    line-height: 0.78rem;
    background-color: #eeeeee;
    border-radius: 0.39rem;
  }
  .top_header .cancel{
    display: inline-block;
    font-size: .48rem;
    color: #4cc3ad;
    float: right;
    margin-right: .5rem;
  }
  .top_header .search img{
    padding-left: 0.5rem;
    width: 0.48rem;
    height: 0.48rem;
  }
  .top_header .search input {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 0.4rem;
    vertical-align: middle;
    margin-left: .2rem;
  }

  /*******select*******/
  .select{
    height: 1.12rem;
    background-color: white;
    display: flex;
  }
  .select span{
    color: #999999;
    font-size: .4rem;
  }
  .select img{
    padding-top: .1rem;
    width: .25rem;
    height: .13rem;
  }
  .select .state{
    margin-left: .54rem;
  }
  .select .begin_time,.end_time{
    margin-left: .92rem;
  }
  /*******筛选span*****/
  .screen_text{
    display: inline-block;
    max-width: 3.5rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    vertical-align: middle;
  }
  /********item*********/
  .item{
    margin-top: 0.19rem;
    background-color: white!important;
  }
  .item .item-title{
    margin: 0 0.5rem;
    padding: 0.37rem 0;
    color: #999999;
    font-size: 0.36rem;
    border-bottom: #eeeeee 1px solid;
    display: flex;
    justify-content: space-between;
  }
  .item .item-title .oreder_state{
    color: #db6045;
  }
  .item .order_info{
    margin: 0.18rem 0.5rem 0.28rem 0.5rem;
    padding-bottom: 0.28rem;
    color: $font_100;
    font-size: 0.4rem;
    border-bottom: 1px solid #eeeeee;
  }
  .item ul li{
    margin-top: 0.3rem;
  }
  .item li img{
    width: 2.1rem;
    height: 2.4rem;
  }
  .product_price{
    max-width: 75%;
    display: inline-block;
    vertical-align: top;
    padding-left: .2rem;
  }
  .product_price .product_title{
    font-size: .48rem;
  }
  .product_price .product_spec{
    font-size: .32rem;
    color: #989898;
    padding-top: .1rem;
  }
  /*  编辑上下架按钮 */
  .product_btn{
    margin-top: .4rem;
  }
  .product_btn span{
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
  }
  .product_btn span a{
    font-size: .36rem;
    color: #898989;
  }
  .product_btn span:first-child{
    margin-left: .3rem;
  }
  .shop_icon{
    display: inline-block;
    width: .4rem;
    height: .4rem;
    background: url("../assets/images/icon_shop_category.png") no-repeat center;
    background-size: cover;
    vertical-align: middle;
    margin-right: .1rem;
  }
  .shop_icon_time{
    background: url("../assets/images/icon_shop_add_time.png") no-repeat center;
    background-size: cover;
  }
  .shop_icon_status{
    background: url("../assets/images/icon_shop_status.png") no-repeat center;
    background-size: cover;
  }
  .product_money{
    font-size: .52rem;
    color: #e36348;
    margin-top: .4rem;
  }
  /*  提示  */
  .bar_tite{
    font-size: .32rem;
    text-align: center;
    color: #989898;
    margin: .2rem 0 .5rem;
  }
  .product_add_box{
    position: fixed;
    right: 0.58rem;
    bottom: 3.28rem;
    .add_product{
      width: 1.83rem;
      height: 1.79rem;
    }
  }
  .van-list{
    background-color: transparent!important;
  }
</style>
