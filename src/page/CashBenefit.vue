<template>
    <div class="content">
      <div class="page_bg"></div>
      <div class="title_bar">
        <div class="left">
          <img class="close" src="../assets/images/icon_cash_benefit_close.png" @click="goBack">
          <img class="search" src="../assets/images/icon_cash_benefit_search.png" @click="searchchoose = true">
        </div>
        <span class="title">现金福利</span>
        <span class="right">奖励规则</span>
      </div>
      <div class="cashBenefit_content">
        <div class="cashBenefit_bg clear">
          <div class="sum account_sum">
            <p class="sum_title">累计到账金额(元)</p>
            <p class="sum_num" v-text="account_sum"></p>
          </div>
          <div class="sum pending_entry">
            <p class="sum_title">待入账金额(元)</p>
            <p class="sum_num" v-text="pending_entry"></p>
          </div>
          <p class="sum_tip">现金已放入您的钱包余额，可在钱包查看</p>
        </div>
        <div class="clear tabs">
          <div class="tab_type" @click="chooseTab(1)">
            <img src="../assets/images/icon_cashback.png" alt="" v-if="chooseBar!=1">
            <img src="../assets/images/icon_cashback_choose.png" alt="" v-if="chooseBar==1">
            <p :class="{'tab_type_title':true,'tab_choose_title':chooseBar==1}">消费返现</p>
          </div>
          <div class="tab_type" @click="chooseTab(2)">
            <img src="../assets/images/icon_vip_cashback.png" alt="" v-if="chooseBar!=2">
            <img src="../assets/images/icon_vip_cashback_choose.png" alt="" v-if="chooseBar==2">
            <p :class="{'tab_type_title':true,'tab_choose_title':chooseBar==2}">VIP充值返现</p>
          </div>
        </div>
        <ul class="cashback_list">
          <li v-for="(item,index) in dataList">
            <p>
              <span class="cashback_list_tel" v-text="item.u_name"></span>
              <span :class="{'cashback_list_sum':true,'cashback_list_sum_color':item.t_status==3 && chooseBar==1,'vip_cashback_list_sum_color':item.t_status==3 && chooseBar==2}">+{{item.t_amount}}</span>
            </p>
            <p class="cashback_list_details">
              <span>订单完成时间：{{item.t_fact_time}}</span>
              <span v-if="item.t_status==3">已入账</span>
              <span v-if="item.t_status==1">待入账</span>
            </p>
          </li>
        </ul>
        <p v-if="dataList.length <= 0" class="dataList_none_tip">暂无数据！</p>
      </div>
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
  import Toast from "../widget/Toast";
  import Loading from '../widget/global_loading/loading';
  import SuccessLoading from "../widget/sucess_loading/SuccessLoading";
  import PopMenu from '../components/PopMenu'

    export default {
      data(){
        return{
          chooseBar:1,
          dataList:[],
          account_sum:'0.00',     // 累计到账金额
          pending_entry:'0.00',  //待入账金额
          searchchoose: false,  //搜索框
          searchValue:'',  // 会员账号搜索
          copySearchValue: '',
          page:1,
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
          let data = {
            p : this.page,
          };
          data.jdata = JSON.stringify({u_type : this.chooseBar,u_name : this.searchValue});
          this.$post(API.PARTNER_CASH_BENEFITS,data).then((res)=>{
            if(res.code != 200) {
              new Toast(res.msg).show();
              return;
            }
            this.account_sum = res.statistics[0].entered_account;
            this.pending_entry = res.statistics[0].pending_account;
            this.dataList = res.list
          });
        },
        goBack(){
          this.$router.go(-1);
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
          this.getData()
        },
      },
      components: {PopMenu}
    }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  .content{
    .content{
      z-index: 99999;
    }
    .title_bar{
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: fixed;
      width: 100%;
      height: 1.61rem;
      left: 0;
      top: 0;
      z-index:99999;
      background-color:white;
      .left{
        .close{
          width: 1.61rem;
          height: 1.61rem;
        }
        .search{
          margin-left: -0.8rem;
          width: 1.61rem;
          height: 1.61rem;
        }
      }
      .title{
        color: #1a1b39;
        font-size: 0.5rem;
      }
      .right{
        padding-right: 0.5rem;
        color: #1a1b39;
        font-size: 0.36rem;
      }
    }
    .cashBenefit_content{
      padding-top:1.61rem;
      .cashBenefit_bg{
        position: relative;
        height: 4.38rem;
        background: url("../assets/images/cashBenefit_bg.jpg") no-repeat center;
        background-size: contain;
        .sum{
          display:flex;
          flex: 1;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          float: left;
          width: 50%;
          height: 3.56rem;
          color: white;
          .sum_title{
            font-size: .4rem;
          }
          .sum_num{
            font-size: .7rem;
            font-weight: bold;
            padding-top: .1rem;
          }
        }
        .sum_tip{
          position: absolute;
          bottom: 0;
          top: 3.56rem;
          left: 0;
          right: 0;
          padding-left: .6rem;
          line-height: .79rem;
          font-size: .32rem;
          color: $main_grren;
          background-color: rgba(76, 195, 173, 0.51);
        }
      }
      .tabs{
        background-color: white;
        padding: .26rem 0 .5rem;
        border-bottom: 1px solid #e5e5e5;
        .tab_type{
          display:flex;
          flex: 1;
          align-items: center;
          flex-direction: column;
          width: 50%;
          height: 1rem;
          float: left;
          text-align: center;
          font-size:0;
          border-right:1px solid #eeeeed;
          box-sizing: border-box;
          img{
            width: .65rem;
            height: .65rem;
          }
          .tab_type_title{
            font-size: .3rem;
            padding-top: .1rem;
            color: $font_100;
          }
          .tab_choose_title{
            color: $main_grren;
          }
        }
        .tab_type:last-child{
          border: none;
        }
      }
      .cashback_list{
        background-color:white;
        li{
          display: flex;
          flex-direction: column;
          padding: .64rem .6rem;
          color:$font_100;
          border-bottom: 1px solid #f1f1f1;
          p{
            display: flex;
            justify-content: space-between;
            .cashback_list_tel{
              font-size: .45rem;
              background-color: w;
            }
            .cashback_list_sum{
              font-size: .45rem;
              font-weight: bold;
            }
            .cashback_list_sum_color{
              color: #f9c949;
            }
            .vip_cashback_list_sum_color{
              color: #f87e49;
            }
          }
          .cashback_list_details{
            font-size: .36rem;
            color: #999999;
            padding-top: .25rem;
          }
        }
      }
      .dataList_none_tip{
        color: #999999;
        font-size: .42rem;
        text-align: center;
        padding-top: 1rem;
      }
    }
  }

  /**搜索框*/
  .list {
    .top_header {
      display:flex;
      align-items: center;
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
        color: $main_grren;
        margin-right: .3rem;
        margin-left: auto;
      }
    }
  }
</style>
