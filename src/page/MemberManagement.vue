<template>
  <div class="content">
    <div :class="{'page_bg':true,'invite_bg':chooseBar == 1,'invite_vip_bg':chooseBar == 2}"></div>
    <transparent-header title-txt="会员管理">
      <img slot="rightContent" src="../assets/images/icon_white_search.png" style="height: 1.61rem;width: 1.61rem" @click="searchchoose = true"/>
    </transparent-header>
    <div class="top_bg">
      <div class="top_bg_num">
        <p class="invite_num" v-text="registerNum"></p>
        <p class="invite_title">邀请注册量</p>
      </div>
      <div class="top_bg_num">
        <p class="invite_num" v-text="vipNum"></p>
        <p class="invite_title">邀请VIP量</p>
      </div>
    </div>
    <div class="tabs clear">
      <div class="tabs_type" @click="chooseTab(1)">
        <p :class="{'choose_bar':chooseBar == 1}">邀请注册</p>
        <img src="../assets/images/icon_invite_bar.jpg" alt="" v-if="chooseBar==1">
      </div>
      <div class="tabs_type" @click="chooseTab(2)">
        <p :class="{'choose_bar':chooseBar == 2}">邀请VIP会员</p>
        <img src="../assets/images/icon_invite_bar.jpg" alt="" v-if="chooseBar==2">
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!--邀请注册量数据-->
      <ul class="invite_list" v-if="chooseBar == 1 && dataList.length > 0">
        <li v-for="(item,index) in dataList">
          <img src="../assets/images/icon_invite_ordinary.png" alt="">
          <div class="invite_info">
            <p class="invite_list_tel" v-text="item.u_name.substr(0,3)+'****'+item.u_name.substring(7)"></p>
            <p class="invite_list_time">注册时间：<span v-text="item.u_reg_time"></span></p>
          </div>
        </li>
      </ul>
      <!--邀请VIP量数据-->
      <ul class="vip_list" v-if="chooseBar == 2 && dataList.length > 0">
        <li v-for="(item,index) in dataList">
          <img src="../assets/images/icon_invite_vip.png" alt="">
          <div class="invite_vip">
            <p class="vip_tel" v-text="item.u_name.substr(0,3)+'****'+item.u_name.substring(7)"></p>
            <p class="vip_info">注册时间：<span v-text="item.u_reg_time"></span></p>
            <p class="vip_info">首购时间：<span v-text="item.t_fact_time"></span></p>
            <p class="vip_info">VIP有效期限：<span v-text="item.u_vip_end_time"></span></p>
          </div>
        </li>
      </ul>
      <p v-text="listTip" :class="{bill_tip:true,bill_tip_list_none:list_none_style}"></p>
    </van-pull-refresh>
    <!--搜索框选择-->
    <pop-menu :is-show="searchchoose" @setIsShow="setIsShowSearchChoose">
      <div slot="list">
        <div class="top_header" @click.stop>
          <div class="search">
            <img src="../assets/images/icon_search.png">
            <input type="text" v-model.trim="copySearchValue" placeholder="输入会员账号"/>
            <img v-if="copySearchValue && copySearchValue.length > 0" class="search_clear" src="../assets/images/icon_search_clear.png" @click="clearSearch">
          </div>
          <p v-if="copySearchValue == ''|| copySearchValue.length == 0" @click="sOperate(1)">取消</p>
          <p v-if="copySearchValue&&copySearchValue.length > 0" @click="sOperate(2)">搜索</p>
        </div>
      </div>
    </pop-menu>
  </div>
</template>

<script>
  import * as API from '../service/API';
  import TransparentHeader from '../components/TransparentHeader';
  import Toast from "../widget/Toast";
  import Loading from '../widget/global_loading/loading';
  import SuccessLoading from "../widget/sucess_loading/SuccessLoading";
  import PopMenu from '../components/PopMenu'

  export default {
    data(){
      return{
        registerNum:'0',
        vipNum:'0',
        chooseBar:1,  //‘1':普通会员 ；'2':vip会员
        dataList:[],
        isLoading: false,
        listTip:'没有更多了',
        list_none_style:false,
        searchchoose: false,  //搜索框
        searchValue:'',  // 会员账号搜索
        copySearchValue: '',
        paging:1, //分页
      }
    },
    mounted(){
      this.getData();
    },
    methods:{
      chooseTab(tab){
        this.chooseBar = tab;
        this.searchValue = '';  // 清空搜索框
        this.copySearchValue = '';
        this.getData();
      },
      getData(){
        let data = {};
        data.p = this.paging;
        data.jdata = JSON.stringify({u_type : this.chooseBar,u_name : this.searchValue});
        this.$post(API.PARTNER_MEMBERS,data).then((res)=>{
          if(res.code != 200) {
            new Toast(res.msg).show();
            return;
          }
          this.dataList = res.list;
          if(this.dataList.length<=0){
            this.listTip = '您还未邀请会员';
            this.list_none_style = true;
          }else {
            this.listTip = '没有更多了';
            this.list_none_style = false;
          }
          this.registerNum = res.statistics[0].m_user_num;
          this.vipNum = res.statistics[0].v_user_num;
        });
      },
      onRefresh() {
        setTimeout(() => {
          new SuccessLoading('刷新成功').show();
          this.isLoading = false;
        }, 500);
      },
      //绑定是否显示搜索框
      setIsShowSearchChoose(isShow) {
        this.searchchoose = isShow;
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
        this.getData();
      },
    },
    components:{TransparentHeader,PopMenu}
  }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  .content{
    .content{
      z-index: 99999;
    /deep/ .list{
      background-color: transparent;
    }
    }
    .invite_bg{
      background-color: #f7f8fa;
    }
    .invite_vip_bg{
      background-color: #f1f1f1;
    }
    .top_bg{
      position: relative;
      width: 100%;
      height: 6rem;
      display: block;
      background: url("../assets/images/icon_member_bg.jpg") no-repeat center;
      background-size: cover;
      .top_bg_num{
        position: absolute;
        width: 50%;
        text-align: center;
        color: white;
        font-size: .36rem;
        bottom: 1.37rem;
        .invite_num{
          font-size: .9rem;
          font-weight: bold;
        }
      }
      .top_bg_num:nth-child(2){
        right: 0;
      }
    }
    .tabs{
      background-color: white;
      .tabs_type{
        width: 50%;
        float: left;
        text-align: center;
        font-size:0;
        p{
          padding: .4rem;
          font-size: .48rem;
          color: #999999;
        }
        .choose_bar{
          color: $font_100;
        }
        img{
          width: 1.45rem;
          height: .09rem;
        }
      }
    }
    .invite_list{
      li{
        position: relative;
        width: 100%;
        height: 2.71rem;
        background: url("../assets/images/icon_invite_list_bg.png") no-repeat center;
        background-size: contain;
        margin-top: .15rem;
        img{
          position: absolute;
          width: .88rem;
          height: .88rem;
          top: 50%;
          margin-top: -.44rem;
          left: 1.08rem;
        }
        .invite_info{
          position: absolute;
          left: 2.47rem;
          height: 1.4rem;
          top: 50%;
          margin-top: -.6rem;
        }
        .invite_list_tel{
          flex: 1;
          font-size: .45rem;
          color: $font_100;
        }
        .invite_list_time{
          flex: 1;
          font-size: .36rem;
          color: #999999;
        }
      }
    }
    .vip_list{
      li{
        width: 100%;
        height: 3.57rem;
        background: url("../assets/images/icon_invite_vip_list.png") no-repeat center;
        background-size: contain;
        margin-top: .25rem;
        box-sizing: border-box;
        padding: .58rem 1.1rem;
        font-size:0;
        img{
          height: .88rem;
          width: .88rem;
          vertical-align: top;
        }
        .invite_vip{
          vertical-align: top;
          display: inline-block;
          padding-left:.5rem;
          font-size: 0;
          .vip_tel{
            font-size: .45rem;
            color: $font_100;
            padding-bottom: .15rem;
          }
          .vip_info{
            font-size: .36rem;
            color: #999999;
            padding-bottom: .1rem;
          }
          p:last-child{
            padding-bottom: 0;
          }
        }
      }
    }
    .bill_tip{
      font-size: .32rem;
      color: #989898;
      text-align: center;
      padding-top: .39rem;
    }
    .bill_tip_list_none{
      font-size: .42rem;
      color: #999999;
      padding-top: 4.5rem;
    }
  }
  .content /deep/ .van-pull-refresh__track{
    min-height: 10rem!important;
  }

  /**搜索框*/
  .list {
    .top_header {
      display:flex;
      align-items: center;
      background-color: transparent;
      border:none;
      .search {
        width: 80%;
        display: flex;
        align-items: center;
        margin-left: .5rem;
        line-height: 0.78rem;
        background-color: #eeeeee;
        border-radius: 0.39rem;
        input {
          width: 78%;
          background-color: transparent;
          font-size: 0.4rem;
          margin-left: .2rem;
        }
        img{
          padding-left: 0.5rem;
          width: 0.48rem;
          height: 0.48rem;
        }
        .search_clear {
          padding-left: 0;
        }
      }
      p {
        line-height: 1.61rem;
        font-size: .48rem;
        color: white;
        margin-right: .3rem;
        margin-left: auto;
      }
    }
  }
</style>
