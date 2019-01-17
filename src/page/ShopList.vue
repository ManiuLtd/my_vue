<template>
  <div class="content" style="overflow: hidden;background-color: #eeeeee;">
    <div class="page_bg"></div>
    <div class="content_herder">
      <!--搜索-->
      <div class="top_header">
        <img src="../assets/images/back_left_blank.png" @click="back">
        <div class="search" @click="searchchoose = true">
          <img src="../assets/images/icon_search.png">
          <input type="text" v-model.trim="searchValue" placeholder="输入商品名称" readonly="readonly"/>
        </div>
      </div>
      <!--筛选-->
      <div :class="{'select_fixed': slide,'select':true}">
        <!--状态-->
        <div class="state" @click="selectChoose">
          <span v-text="state" :class="{'screen_text':true,'choose_screen':currentSelected == 1||state!='状态'}"
                :title="state"></span>
          <img v-if="state=='状态'&&currentSelected != 1" src="../assets/images/icon_down_nochoose.png">
          <img v-if="currentSelected == 1" src="../assets/images/icon_down_choose.png">
          <img v-if="state!='状态'&&currentSelected != 1" src="../assets/images/icon_clear_choose.png" @click="setup(1)"
               @click.stop>
        </div>
        <!--品牌-->
        <div class="begin_time" @click="brandChoose">
          <span v-text="brand" :class="{'screen_text':true,'choose_screen':currentSelected == 2||brand!='品牌'}"
                :title="brand"></span>
          <img v-if="brand=='品牌'&&currentSelected != 2" src="../assets/images/icon_down_nochoose.png">
          <img v-if="currentSelected == 2" src="../assets/images/icon_down_choose.png">
          <img v-if="brand!='品牌'&&currentSelected != 2" src="../assets/images/icon_clear_choose.png" @click="setup(2)"
               @click.stop>
        </div>
        <!--上下架-->
        <div class="end_time" @click="shelvesChoose">
          <span v-text="shelves" :class="{'screen_text':true,'choose_screen':currentSelected == 3||shelves!='上下架'}"
                :title="shelves"></span>
          <img v-if="shelves=='上下架'&&currentSelected != 3" src="../assets/images/icon_down_nochoose.png">
          <img v-if="currentSelected == 3" src="../assets/images/icon_down_choose.png">
          <img v-if="shelves!='上下架'&&currentSelected != 3" src="../assets/images/icon_clear_choose.png"
               @click="setup(3)" @click.stop>
        </div>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" @load="getGoodList">
        <!--商品列表-->
        <div class="item" v-for="(item,index) in list" @click="checkDetails(item.g_id)"
             style="background-color: white;margin-top: 0.19rem;">
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
                <p class="product_spec"><i class="shop_icon shop_icon_time"></i>添加时间：<span
                  v-text="item.g_add_time"></span></p>
                <p class="product_spec" v-if="item.g_status == 2"><i class="shop_icon shop_icon_status"></i>商品状态：未上架</p>
                <p class="product_spec" v-if="item.g_status == 5"><i class="shop_icon shop_icon_status"></i>商品状态：已上架</p>
                <p class="product_spec" v-if="item.g_status == 6"><i class="shop_icon shop_icon_status"></i>商品状态：已下架</p>
                <p class="product_spec" style="color:#e36348;" v-if="item.is_join_activity == 2">满减活动：未参加</p>
                <p class="product_spec" style="color:#e36348;" v-if="item.is_join_activity == 1">满减活动：已参加</p>
                <p class="product_spec" style="margin-top: .3rem;color:#e36348;"><span style="font-size: .55rem">￥{{item.g_price}}</span>
                </p>
              </div>
              <div class="product_btn clear" @click.stop>
                <span v-show="item.g_status == 2 || item.g_status == 3 || item.g_status == 5 || item.g_status == 6"
                      @click="goodsEdit(item.g_id)">编辑</span>
                <span v-show="item.g_status == 2 || item.g_status == 5 || item.g_status == 6"
                      @click="updataStatus(item)">
                   <a v-if="item.g_status == 5">下架</a>
                   <a v-if="item.g_status == 2 || item.g_status == 6">上架</a>
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
    </van-pull-refresh>
    <!--审核状态弹出框-->
    <!--搜索框选择-->
    <pop-menu :is-show="searchchoose" @setIsShow="setIsShowSearchChoose">
      <div slot="list">
        <div class="top_header" @click.stop>
          <div class="search">
            <img src="../assets/images/icon_search.png">
            <input type="text" v-model.trim="copySearchValue" placeholder="输入商品名称"/>
            <img v-if="copySearchValue && copySearchValue.length > 0" class="search_clear"
                 src="../assets/images/icon_search_clear.png" alt="" @click="clearSearch">
          </div>
          <p v-if="copySearchValue == ''|| copySearchValue.length == 0" @click="sOperate(1)">取消</p>
          <p v-if="copySearchValue&&copySearchValue.length > 0" @click="sOperate(2)">搜索</p>
        </div>
      </div>
    </pop-menu>
    <!--筛选状态-->
    <pop-menu style="margin-top: 1.12rem" :is-show="currentSelected == 1" @setIsShow="setIsShowPopMenu">
      <div slot="list">
        <div class="state-item" v-for="item in showStateData" @click="stateConfirm(item)">
          <span class="item-content">{{item.label}}</span>
        </div>
      </div>
    </pop-menu>
    <!--品牌弹出框-->
    <pop-menu style="margin-top: 1.12rem" :is-show="currentSelected == 2" @setIsShow="setIsShowBrandPopMenu">
      <div slot="list">
        <div class="brandStateItem" v-for="(item,index) in brandData" @click="brandConfirm(item)">
          <span class="brand-item-content">{{item.gbName}}</span>
        </div>
      </div>
    </pop-menu>
    <!--上下架弹出框-->
    <pop-menu style="margin-top: 1.12rem" :is-show="currentSelected == 3" @setIsShow="setIsShowShelvesPopMenu">
      <div slot="list">
        <div class="state-item" v-for="item in ShelvesData" @click="shelvesConfirm(item)">
          <span class="item-content">{{item.label}}</span>
        </div>
      </div>
    </pop-menu>
    <div :class="add_btn_style">
      <img class="add_product" @click="addGoods()" src="../assets/images/icon_product_add.png"/>
    </div>
  </div>
</template>
<script>
  import * as API from '../service/API';
  import Toast from "../widget/Toast";
  import {Dialog} from 'vant'
  import SuccessLoading from '../widget/sucess_loading/SuccessLoading'
  import PopMenu from '../components/PopMenu'

  export default {
    data() {
      return {
        currentSelected: 0, // 0 都不显示， 1 状态， 2 品牌， 3上下架
        goodsData: [],      //商品列表內容
        partnerInfo: {},      //商品列表內容
        searchchoose: false,  //搜索框
        state: '状态',
        brand: '品牌',
        shelves: '上下架',
        showStateData: [],     //选择状态
        brandData: [],     //选择品牌
        ShelvesData: [],     //选择上下架
        fileHost: process.env.ALY_IMG_URL,
        searchValue: '',
        copySearchValue: '',
        timerOuter: null, //延迟执行对象，防止重复查询
        list: [],
        pageInfo: {
          total: 0,
          currPage: 1,
          nextPage: 0,
          pageCount: 0
        },
        searchData: {
          g_name: '',
          g_check_status: '',
          g_status: '',
          gb_id: '',
        }, //列表查询参数
        loading: false,
        runload: false,
        finished: false,
        barTite: '没有更多啦~',    //  底部字段显示
        editIsShow: '',    // 编辑显示
        shelvesIsShow: '',  // 上下架显示
        isLoading: false,
        clientHeight: document.documentElement.clientHeight,
        slide: false,
        add_btn_style:'product_add_box_fixed'
      };
    },
    computed: {
      searchChang: function () {
        this.searchData.g_name = this.searchValue;
        return this.searchData.g_check_status + this.searchData.g_name + this.searchData.gb_id + this.searchData.g_status;
      }
    },
    watch: {
      searchChang: function () {
        clearTimeout(this.timerOuter);
        if (this.searchValue.length >= 2 || this.searchValue.length == '') {
          this.searchData.g_name = this.searchValue;
          let that = this;
          this.timerOuter = setTimeout(function () {
            that.pageInfo = {
              total: 0,
              currPage: 1,
              nextPage: 0,
              pageCount: 0
            }
            this.finished = false;
            that.list = [];
            that.getGoodList();
          }, 200)
        }

      }
    },
    mounted() {
      // 用户信息赋值
      this.$store.dispatch('initUserInfo');
      this.partnerInfo = this.$store.state.userInfo.userInfo;

      if (this.list.length == 0) {
        this.getGoodList();
      }
      window.onresize = () => {
        if (this.clientHeight > document.documentElement.clientHeight) {
          this.add_btn_style = 'product_add_box_margin'
        } else {
          this.add_btn_style = 'product_add_box_fixed'
        }
      };
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeRouteLeave(to, from, next) {
      if (to.path == '/addGoods') {
        to.meta.isRefresh = true;
      }
      next();
    },
    methods: {
      /*******************筛选********************/
      //绑定显示状态
      setIsShowPopMenu(isShow) {
        this.slide = isShow;
        this.currentSelected = isShow ? this.currentSelected = 1 : this.currentSelected = 0;
      },
      selectChoose() {
        if (this.currentSelected == 1) {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          var offsetTop = document.getElementsByClassName('top_header')[0].offsetTop;
          if (scrollTop > offsetTop) {
            this.slide = true;
          } else {
            this.slide = false;
          }
          this.currentSelected = 0;
        } else {
          this.slide = true;
          this.currentSelected = 1;
        }
      },
      //绑定显示品牌
      setIsShowBrandPopMenu(isShow) {
        this.slide = isShow;
        this.currentSelected = isShow ? this.currentSelected = 2 : this.currentSelected = 0;
      },
      brandChoose() {
        if (this.currentSelected == 2) {
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          let offsetTop = document.getElementsByClassName('top_header')[0].offsetTop;
          if (scrollTop > offsetTop) {
            this.slide = true;
          } else {
            this.slide = false;
          }
          this.currentSelected = 0;
        } else {
          this.slide = true;
          this.currentSelected = 2;
        }
      },
      //绑定显示上下架
      setIsShowShelvesPopMenu(isShow) {
        this.slide = isShow;
        this.currentSelected = isShow ? this.currentSelected = 3 : this.currentSelected = 0;
      },
      shelvesChoose() {
        if (this.currentSelected == 3) {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          var offsetTop = document.getElementsByClassName('top_header')[0].offsetTop;
          if (scrollTop > offsetTop) {
            this.slide = true;
          } else {
            this.slide = false;
          }
          this.currentSelected = 0;
        } else {
          this.slide = true;
          this.currentSelected = 3;
        }
      },
      //绑定是否显示搜索框
      setIsShowSearchChoose(isShow) {
        this.searchchoose = isShow;
      },
      /*******************筛选********************/
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let offsetTop = document.getElementsByClassName('top_header')[0].offsetTop;
        if (scrollTop > offsetTop) {
          this.slide = true;
        } else {
          this.slide = false;
        }
      },
      addGoods() {
        if (this.partnerInfo.is_normal != 2) {
          new Toast("非营业状态不能添加商品").show();
        } else {
          this.$router.push("/addGoods");
        }
      },
      checkDetails(id) {
        this.$router.push({path: `/goodDetails/${id}`});
      },
      getGoodList() {
        if (this.runload) {
          return;
        }
        this.runload = true;
        let data = {};
        data.jdata = {};
        for (var index in this.searchData) {
          if (this.searchData[index]) {
            data.jdata[index] = this.searchData[index];
          }
        }

        if (this.pageInfo.currPage != this.pageInfo.pageCount) {
          data.p = this.pageInfo.nextPage;
        }
        data.jdata = JSON.stringify(data.jdata);
        this.$post(API.GOODS_LIST, data).then((response) => {
          this.runload = false;
          if (response.code != 200) {
            new Toast(response.data.msg).show();
            return;
          }
          //this.goodsData = response.goods_list;
          if (response.goods_list.length > 0) {
            this.list = this.list.concat(response.goods_list);
          } else {
            this.finished = true;
          }

          if (this.showStateData.length == 0) {
            this.showStateData = response.check_status;
          }

          if (this.ShelvesData.length == 0) {
            this.ShelvesData = response.status;
          }

          if (this.brandData.length == 0) {
            this.brandData = response.brand_info;
            this.brandData.unshift({'gbId': '-1', 'gbName': '全部'});
          }

          this.pageInfo = response.pageInfo;
          this.loading = false;
          if (Object.keys(data).length == 0 && this.list && this.list.length == 0) {
            this.$router.replace('/addProduct');
          }
          if (this.pageInfo.currPage == this.pageInfo.pageCount) {
            this.finished = true;
          }
          if (response.goods_list.length > 0) {
            this.barTite = '没有更多啦~';
          } else if (this.searchData.g_name.length > 0) {
            this.barTite = '暂无搜索结果~';
          } else if (response.goods_list.length <= 0 ) {
            if(this.searchData.g_name==''&&this.searchData.g_check_status==''&&this.searchData.g_status==''&&this.searchData.gb_id==''){
              this.$router.push('/addProduct');
            }
          } else {
            this.barTite = '您还没有商品哦~';
          }
        }).then((error) => {
          this.runload = false;
        });

      },
      back() {
        this.$router.replace('/main');
      },
      //点击清除搜索框
      clearSearch() {
        this.copySearchValue = '';
      },
      //搜索框点击操作
      sOperate(v) {
        if (v == 1) {
          this.searchValue = '';
          this.copySearchValue = '';
        } else if (v == 2) {
          this.searchValue = this.copySearchValue;
        }
        this.searchchoose = false;
      },
      //状态确定
      stateConfirm(value) {
        this.state = value.label;
        this.searchData.g_check_status = value.key;
        this.handleScroll;
      },
      //品牌选择确定
      brandConfirm(value) {
        this.brand = value.gbName;
        this.searchData.gb_id = value.gbId;
        this.handleScroll;
      },
      //上下架确定
      shelvesConfirm(value) {
        this.shelves = value.label;
        this.searchData.g_status = value.key;
        this.handleScroll;
      },
//      点击编辑
      goodsEdit(id) {
        this.$router.push({path: `/goodsEdit/${id}`});
        this.$store.dispatch('setIsRefresh', true);
      },
//      点击上下架
      updataStatus(item) {
        Dialog.confirm({
          title: '您确定要进行上下架操作吗？'
        }).then(() => {
          let data = {};
          data.gId = item.g_id;
          this.$get(API.BASEURL + '/goods/update_status.html', {}, data).then((response) => {
            if (response.code != 200) {
              new Toast(response.msg).show();
              return;
            }
            item.g_status = response.new_status;
            new SuccessLoading(response.msg).show();
          })
        }).catch(() => {

        });
      },
      onRefresh() {
        setTimeout(() => {
          new SuccessLoading('刷新成功').show();
          this.isLoading = false;
        }, 500);
      },
//      清空按钮
      setup(i) {
        this.searchData.g_name = '';  //搜索框搜索内容
        if (i == 1) {
          this.state = '状态';
          this.searchData.g_check_status = '';
        } else if (i == 2) {
          this.brand = '品牌';
          this.searchData.gb_id = '';
        } else if (i == 3) {
          this.shelves = '上下架';
          this.searchData.g_status = '';
        }
      },
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
    },
    components: {PopMenu}
  }
</script>
<style lang="scss" scoped>
  @import "../style/common.scss";
  /********header*********/
  .content .content_herder .select_fixed {
    z-index: 99999;
    width: 100%;
    position: fixed;
    top: 0;
  }

  .top_header {
    width: 100%;
    overflow: hidden;
    font-size: 0;
    background-color: white;
  }

  .top_header img {
    width: 1.61rem;
    height: 1.61rem;
  }

  .top_header .search {
    width: 80%;
    display: inline-block;
    line-height: 0.78rem;
    background-color: #eeeeee;
    border-radius: 0.39rem;
    padding-top: .07rem;
  }

  .top_header .cancel {
    display: inline-block;
    font-size: .48rem;
    color: #4cc3ad;
    float: right;
    margin-right: .5rem;
  }

  .top_header .search img {
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
  .select {
    height: 1.12rem;
    background-color: white;
    display: flex;
  }

  .select span {
    color: #999999;
    font-size: .4rem;
  }

  .select img {
    width: .34rem;
    height: .34rem;
    margin-left: .2rem;
  }

  .select .state {
    margin-left: .54rem;
    font-size: 0;
    line-height: 1.12rem;
  }

  .select .begin_time, .end_time {
    margin-left: .92rem;
    font-size: 0;
    line-height: 1.12rem;
  }

  /*******筛选span*****/
  .screen_text {
    display: inline-block;
    max-width: 3.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }

  .choose_screen {
    color: $main_grren !important;
  }

  /********item*********/
  .item {
    margin-top: 0.19rem;
    background-color: white !important;
  }

  .item .item-title {
    margin: 0 0.5rem;
    padding: 0.37rem 0;
    color: #999999;
    font-size: 0.36rem;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    justify-content: space-between;
  }

  .item .item-title .oreder_state {
    color: #db6045;
  }

  .item .order_info {
    margin: 0.18rem 0.5rem 0.19rem 0.5rem;
    padding-bottom: 0.5rem;
    color: $font_100;
    font-size: 0.4rem;
    border-bottom: 1px solid #eeeeee;
  }

  .item ul li {
    margin-top: 0.45rem;
  }

  .item li img {
    width: 2.7rem;
    height: 2.7rem;
    border-radius: 10px;
  }

  .product_price {
    max-width: 69%;
    display: inline-block;
    vertical-align: top;
    padding-left: .2rem;
  }

  .product_price .product_title {
    font-size: .48rem;
    font-weight: 600;
    margin-top: -.15rem;
  }

  .product_price .product_spec {
    font-size: .32rem;
    color: #989898;
    padding-top: .15rem;
  }

  /*  编辑上下架按钮 */
  .product_btn {
    margin-top: .05rem;
  }

  .product_btn span {
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

  .product_btn span a {
    font-size: .36rem;
    color: #898989;
  }

  .product_btn span:first-child {
    margin-left: .3rem;
    color: $main_grren;
    border-color: $main_grren;
  }

  .shop_icon {
    display: inline-block;
    width: .4rem;
    height: .4rem;
    background: url("../assets/images/icon_shop_category.png") no-repeat center;
    background-size: cover;
    vertical-align: middle;
    margin-right: .1rem;
  }

  .shop_icon_time {
    background: url("../assets/images/icon_shop_add_time.png") no-repeat center;
    background-size: cover;
  }

  .shop_icon_status {
    background: url("../assets/images/icon_shop_status.png") no-repeat center;
    background-size: cover;
  }

  .product_money {
    font-size: .52rem;
    color: #e36348;
    margin-top: .4rem;
  }

  /*  提示  */
  .bar_tite {
    font-size: .32rem;
    text-align: center;
    color: #989898;
    margin: .2rem 0 .5rem;
  }

  .product_add_box_fixed{
    position: fixed;
    right: 0.58rem;
    bottom: 3.28rem;
  }

  .product_add_box_margin{
    display: flex;
    justify-content: flex-end;
    margin-right: 0.58rem;
    margin-top: 2.5rem;
  }

  .add_product {
    width: 1.83rem;
    height: 1.79rem;
    display: block;
  }

  .van-list {
    background-color: transparent !important;
  }

  /*  下拉刷新  */
  .content /deep/ .van-pull-refresh {
    z-index: 999;
  }

  .van-pull-refresh /deep/ .van-pull-refresh__track {
    min-height: 13rem;
  }

  .select .empty {
    line-height: 1.12rem;
    margin-left: auto;
    margin-right: .6rem;
    font-size: .4rem;
    color: $main_grren;
  }

  /**搜索框*/
  .list {
    .top_header {
      position: relative;
      .search {
        margin-left: .5rem;
        input {
          width: 76%;
        }
        .search_clear {
          padding-left: 0;
        }
      }
      p {
        position: absolute;
        line-height: 1.61rem;
        font-size: .48rem;
        display: inline-block;
        color: $main_grren;
        right: .4rem;
      }
    }
  }

  /**状态栏*/
  .state-item {
    line-height: 1rem;
    .item-content {
      padding-left: 0.52rem;
      font-size: 0.4rem;
      color: $font_100;
    }
  }

  /*状态栏点击效果*/
  .state-item:active {
    background: rgba(76, 195, 173, 0.1);
    .item-content {
      color: #4cc3ad;
    }
  }

  /**品牌状态栏*/
  .brandStateItem {
    display: inline-block;
    width: 3.08rem;
    line-height: 1.05rem;
    margin: 0.5rem 0.18rem 0;
    font-size: .4rem;
    text-align: center;
    border-radius: 20px;
    .brand-item-content {
      font-size: 0.4rem;
      color: $font_100;
    }
  }

  /**品牌点击效果*/
  .brandStateItem:active {
    background-color: #F6F7F7 !important;
    .brand-item-content {
      color: $main_grren;
    }
  }
</style>
