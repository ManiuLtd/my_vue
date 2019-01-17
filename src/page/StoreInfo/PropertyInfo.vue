<template>
  <div class="basic">
    <div class="page_bg"></div>
    <top-header title-txt="资产信息"></top-header>
    <form class="content">
      <div class="input_content">
        <ul class="input_box">
          <li class="input_div">
            <label>应收款</label>
            <input type="text" placeholder="输入应收款" value="">
          </li>
          <li class="input_div">
            <label>存货</label>
            <input type="text" placeholder="输入种类及数量" value="">
          </li>
          <li class="title_bar">
            <p>车辆信息</p>
          </li>
          <li class="input_div">
            <label>品牌</label>
            <input type="text" placeholder="输入车辆品牌" value="" >
          </li>
          <li class="input_div">
            <label>型号</label>
            <input type="text" placeholder="输入型号" value="">
          </li>
          <li class="input_div">
            <label>购买时间</label>
            <input type="text" placeholder="输入购买时间" value="">
          </li>
          <li class="input_div">
            <label>购买价格</label>
            <input type="text" placeholder="输入购买价格" value="">
          </li>
          <li class="title_bar">
            <p>住宅信息</p>
          </li>
          <li class="input_div">
            <label>住宅类型</label>
            <input type="text" placeholder="请选择" readonly="readonly" value="" class="icon_input">
            <i class="icon_arrow"></i>
          </li>
          <li class="input_div">
            <label>租赁</label>
            <input type="text" placeholder="输入租赁" value="">
          </li>
          <li class="input_div">
            <label>居住年限</label>
            <input type="text" placeholder="输入居住年限" value="">
          </li>
          <li class="title_bar">
            <p>门店信息</p>
          </li>
          <li class="input_div">
            <label>门店类型</label>
            <input type="text" placeholder="请选择" readonly="readonly" value="" class="icon_input">
            <i class="icon_arrow"></i>
          </li>
          <li class="input_div">
            <label>租赁</label>
            <input type="text" placeholder="输入租赁" value="">
          </li>
          <li class="input_div">
            <label>居住年限</label>
            <input type="text" placeholder="输入居住年限" value="">
          </li>
          <li class="bar"></li>
          <li class="input_div">
            <label>其他资产信息</label>
            <input type="text" placeholder="输入其他资产信息" value="" style="width:50%;">
          </li>
        </ul>
      </div>
      <p class="must_title"></p>
      <span @click="submit" class="preserve_btn">保存</span>
    </form>
  </div>
</template>

<script>
  import TopHeader from '../../components/TopHeader'
  import RadioButton from '../../components/common/RadioButton.vue'
  import * as API from '../../service/API'

  export default {
    name: "StoreInfo",
    data(){
      return {
        data:{},
        formData:{
            receivables: "",
            stock: "",
            vehicle_information: "",
            house_information: "",
            store_information: "",
            other_asset_information:"",
        },
      }
    },
    created: function(){
      this.$get(API.PARTNER_ASSET_INFO).then((response)=>{
        if(response.code != 200){
            new Toast(response.msg).show();
            return;
        }else if(response.code == 200){
            this.data = response.data;
            this.formData.bank_loan = this.data.bank_loan;
            this.formData.company_loan = this.data.company_loan;
            this.formData.private_loan = this.data.private_loan;
            this.formData.other_debt_loan = this.data.other_debt_loan;
        }
      });
    },
    methods: {
      submit: function () {
        this.$post(API.PARTNER_ASSET_INFO,this.formData).then((response)=>{
          if(response.code != 200){
              new Toast(response.msg).show();
              return;
          }else if(response.code == 200){
              this.data = response.data
          }
        });
      }
    },
    components: {TopHeader,RadioButton}
  }
</script>

<style lang="scss" scoped>
  @import "../../style/common.scss";
  @import "../../style/public.scss";
  @import "../../style/storeInfo.scss";
  .title_bar {
    height: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    font-size: .4rem;
    padding: 0 .5rem;
  }
  .title_bar p:nth-child(1){
    color: #999999;
  }
</style>
