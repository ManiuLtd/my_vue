<template>
  <div class="basic">
    <div class="page_bg"></div>
    <top-header title-txt="负债信息"></top-header>
    <form class="content" onsubmit="return false">
      <div class="input_content">
        <ul class="input_box">
          <li class="input_div">
            <label>银行贷款</label>
            <input type="text" placeholder="输入贷款金额" v-model.trim="formData.bank_loan">
          </li>
          <li class="input_div">
            <label>小贷公司借款</label>
            <input type="text" placeholder="输入贷款金额" v-model.trim="formData.company_loan" style="width:50%;">
          </li>
          <li class="input_div">
            <label>私人借款</label>
            <input type="text" placeholder="输入借款金额" v-model.trim="formData.private_loan" value="" >
          </li>
          <li class="input_div">
            <label>其他负债信息</label>
            <input type="text" placeholder="输入其他负债信息" v-model.trim="formData.other_debt_loan" value="" style="width:50%;">
          </li>
        </ul>
      </div>
      <span @click="submit" :class="bottom_btn_style" >保存</span>
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
    name: "LoanInfo",
    data(){
      return {
        data:{},
        formData:{
          bank_loan: "",
          company_loan: "",
          private_loan: "",
          other_debt_loan: ""
        },
        clientHeight:document.documentElement.clientHeight,
        bottom_btn_style:'btn_fixed'
      }
    },
    created: function(){
      this.$get(API.PARTNER_DEBT_INFO).then((response)=>{
        if(response.code != 200){
          new Toast(response.msg).show();
          return;
        }else if(response.code == 200){
          this.data = response.data;
          this.formData.bank_loan = this.data.bank_loan;
          this.formData.company_loan = this.data.company_loan;
          this.formData.private_loan = this.data.private_loan;
          this.formData.other_debt_loan = this.data.other_debt_loan
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
        this.$post(API.PARTNER_DEBT_INFO,this.formData).then((response)=>{
          if(response.code != 200){
              new Toast(response.msg).show();
              return;
          }else if(response.code == 200){
              this.data = response.data
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
      window.onresize = null;
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
    margin-top: 2.56rem;
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: #5FCCC6;
  }

</style>
