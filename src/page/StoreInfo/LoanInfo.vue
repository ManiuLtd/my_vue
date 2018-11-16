<template>
  <div class="basic">
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
      <span @click="submit" class="preserve_btn">保存</span>
    </form>
  </div>
</template>

<script>

  import TopHeader from '../../components/TopHeader'
  import Toast from '../../widget/Toast';
  import RadioButton from '../../components/common/RadioButton.vue'
  import * as API from '../../service/API'
  import Loading from '../../widget/loading/loading'


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
        }
      }
    },
    created: function(){
      let loading = new Loading();
      loading.show();
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
        loading.close();
      }).then((error)=>{
        loading.close();
      });
    },
    methods: {
      submit: function () {
        let loading = new Loading();
        loading.show();
        this.$post(API.PARTNER_DEBT_INFO,this.formData).then((response)=>{
          if(response.code != 200){
              new Toast(response.msg).show();
              return;
          }else if(response.code == 200){
              this.data = response.data
              new Toast(response.msg).show();
          }
          loading.close();
        }).then((error)=>{
          loading.close();
        });
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
