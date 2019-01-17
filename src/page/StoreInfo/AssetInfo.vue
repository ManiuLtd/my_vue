<template>
  <div class="basic">
    <div class="page_bg"></div>
    <top-header title-txt="资产信息"></top-header>
    <form class="content" onsubmit="return false">
      <div class="input_content">
        <ul class="input_box">
          <li class="input_div">
            <label>应收款</label>
            <input type="text" placeholder="输入应收款" v-model.trim="formData.receivables">
          </li>
          <li class="input_div">
            <label>存货</label>
            <input type="text" placeholder="输入种类及数量" v-model.trim="formData.stock">
          </li>
          <li class="input_div textarea_warp">
            <label>车辆信息</label>
            <textarea placeholder="请输入车辆的品牌、型号、购买时间、购买价格等信息(选填)" v-model.trim="formData.vehicle_information" style="min-height: 1.5rem;"></textarea>
          </li>
          <li class="input_div textarea_warp">
            <label>住宅信息</label>
            <textarea placeholder="请输入住宅类型，如商品房、自建房、宅基地、租赁或居住年限等信息(选填)" v-model.trim="formData.house_information"></textarea>
          </li>
          <li class="input_div textarea_warp">
            <label>门店信息</label>
            <textarea placeholder="请输入住宅类型，如商品房、自建房、宅基地、租赁或居住年限等信息(选填)" v-model.trim="formData.store_information"></textarea>
          </li>
          <li class="input_div">
            <label>其他资产信息</label>
            <input type="text" placeholder="输入其他资产信息" v-model.trim="formData.other_asset_information" style="width:50%;">
          </li>
        </ul>
      </div>
      <p class="must_title"></p>
      <span v-on:click="submit()" :class="bottom_btn_style" >保存</span>
    </form>
  </div>
</template>

<script>
  import TopHeader from '../../components/TopHeader'
  import RadioButton from '../../components/common/RadioButton.vue'
  import Toast from '../../widget/Toast';
  import * as API from '../../service/API'
  import SuccessLoading from '../../widget/sucess_loading/SuccessLoading'

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
        clientHeight:document.documentElement.clientHeight,
        bottom_btn_style:'btn_fixed'
      }
    },
    created: function(){
      this.$get(API.PARTNER_ASSET_INFO).then((response)=>{
        if(response.code != 200){
          new Toast(response.msg).show();
          return;
        }else if(response.code == 200){
          this.data = response.data;
          this.formData = this.data;
        }
      })
    },
    methods: {
      resizeWindow(){
        window.onresize = ()=>{
          if(this.clientHeight>document.documentElement.clientHeight) {
            this.bottom_btn_style = "btn_margin";
          }else{
            this.bottom_btn_style = "btn_fixed";
          }
        }
      },
      submit: function () {
        this.$post(API.PARTNER_ASSET_INFO,this.formData).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else if(response.code == 200){
            this.data = response.data;
            new SuccessLoading(response.msg).show();
            this.$router.replace('/storeInfo');
          }
        })
      }
    },
    mounted() {
      this.resizeWindow();
    },
    destroyed(){
      window.onresize = null;
    },
    components: {TopHeader,RadioButton}
  }
</script>

<style lang="scss" scoped>
  @import "../../style/common.scss";
  @import "../../style/public.scss";
  @import "../../style/storeInfo.scss";
  textarea::-webkit-input-placeholder {
    color: #cdcdd1;
    font-size: .48rem;
  }
  .basic .content .textarea_warp{
    display: flex;
    justify-content: space-between;
  }
  .content .textarea_warp textarea{
    text-align: right;
    min-height: 2.2rem;
    width: 70%;
  }
  .textarea_warp textarea::-webkit-input-placeholder{
    text-align: left;
  }

  /*提交按钮*/
  .btn_fixed{
    position: fixed;
    bottom: 0;
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: #5FCCC6;
  }

  .btn_margin{
    margin-top: -1.25rem;
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: #5FCCC6;
  }

</style>
