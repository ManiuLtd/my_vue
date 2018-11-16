<template>
  <div class="basic">
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
      <span v-on:click="submit()" class="preserve_btn">保存</span>
    </form>
  </div>
</template>

<script>

  import TopHeader from '../../components/TopHeader'
  import RadioButton from '../../components/common/RadioButton.vue'
  import Toast from '../../widget/Toast';
  import * as API from '../../service/API'
  import Loading from '../../widget/loading/loading'

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
          other_asset_information:""
        }
      }
    },
    created: function(){
      let loading = new Loading();
      loading.show();
      this.$get(API.PARTNER_ASSET_INFO).then((response)=>{
        if(response.code != 200){
          new Toast(response.msg).show();
          return;
        }else if(response.code == 200){
          this.data = response.data;
          this.formData = this.data;
        }
        loading.close();
      }).then((error)=>{
        loading.close();
      })
    },
    methods: {
      submit: function () {
        let loading = new Loading();
        loading.show();
        this.$post(API.PARTNER_ASSET_INFO,this.formData).then((response)=>{
          if(response.code == 500){
            new Toast(response.msg).show();
            return;
          }else if(response.code == 200){
            this.data = response.data
            new Toast(response.msg).show();
          }
          loading.close();
        }).then((error)=>{
          loading.close();
        })
      }
    },
    mounted() {
      var screenHeigt = window.screen.availHeight;
      var topHeight = document.getElementsByClassName('common_header')[0].offsetHeight;
      document.getElementsByClassName('basic')[0].style.minHeight = screenHeigt - topHeight + 'px';
      document.getElementsByClassName('basic')[0].style.backgroundColor = '#eee';
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
</style>
