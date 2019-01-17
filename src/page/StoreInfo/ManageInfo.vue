<template>
  <div class="basic">
    <div class="page_bg"></div>
    <top-header title-txt="经营信息"></top-header>
    <form class="content" onsubmit="return false">
      <div class="input_content">
        <ul class="input_box">
          <li class="input_div">
            <label>行业类别</label>
            <input type="text" readonly v-model.trim="tradeName" >
          </li>
          <li class="input_div">
              <label>经营地址</label>
              <input type="text" placeholder="输入经营地址" v-model.trim="formData.business_address" >
          </li>
          <li class="input_div">
            <label>详细地址</label>
            <input type="text" placeholder="输入详细地址" v-model.trim="formData.business_detail_address">
          </li>
          <li class="input_div">
            <label>过往平均赊销占比</label>
            <input type="text" placeholder="输入所占比" v-model.trim="formData.past_average_credit_sales" style="width: 50%;">
          </li>
          <li class="input_div">
            <label>年销售额</label>
            <input type="text" placeholder="输入年销售额" v-model.trim="formData.annual_sales">
          </li>
          <li class="input_div">
            <label>毛利率</label>
            <input type="text" placeholder="输入毛利率" v-model.trim="formData.gross_interest_rate">
          </li>
          <li class="input_div">
            <label>净利率</label>
            <input type="text" placeholder="输入净利率" v-model.trim="formData.net_interest_rate">
          </li>
          <li class="input_div">
            <label>其他经营信息</label>
            <input type="text" placeholder="输入经营信息" v-model.trim="formData.other_manage_info" style="width: 50%;">
          </li>
        </ul>
      </div>
      <p class="must_title"></p>
      <span @click="submit" :class="bottom_btn_style">保存</span>
    </form>
  </div>
</template>

<script>
  import TopHeader from '../../components/TopHeader'
  import Toast from '../../widget/Toast';
  import RadioButton from '../../components/common/RadioButton.vue'
  import * as API from '../../service/API'
  import SuccessLoading from '../../widget/sucess_loading/SuccessLoading'

  export default {
    name: "ManageInfo",
      data(){
        return {
            data:{},
            address: '',
            tradeName:'',
            formData:{
                business_address:"",
                business_detail_address:"",
                past_average_credit_sales:"",
                annual_sales:"",
                gross_interest_rate:"",
                net_interest_rate:"",
                other_manage_info:""
            },
          clientHeight:document.documentElement.clientHeight,
          bottom_btn_style:'btn_fixed'
        }
      },
      created: function(){
        this.$get(API.PARTNER_MANAGE_INFO).then((response)=>{
            if(response.code != 200){
                new Toast(response.msg).show();
                return;
            }else if(response.code == 200){
                this.data = response.data;
                this.tradeName = response.tradeName;
                this.formData = response.data
            }
        });
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
            this.$post(API.PARTNER_MANAGE_INFO,this.formData).then((response)=>{
                if(response.code != 200){
                    new Toast(response.msg).show();
                    return;
                }else if(response.code == 200){
                    this.data = response.data;
                    new SuccessLoading(response.msg).show();
                    this.$router.replace('/storeInfo');
                }
            });
        }
      },
      mounted() {
         this.resizeWindow();
      },
    destroyed(){
      window.onresize = null
    },
    components: {TopHeader,RadioButton}
  }
</script>

<style lang="scss" scoped>
  @import "../../style/common.scss";
  @import "../../style/public.scss";
  @import "../../style/storeInfo.scss";

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
