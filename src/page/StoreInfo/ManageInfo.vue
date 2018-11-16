<template>
  <div class="basic">
    <top-header title-txt="经营信息"></top-header>
    <form class="content" onsubmit="return false">
      <div class="input_content">
        <ul class="input_box">
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
    name: "ManageInfo",
      data(){
        return {
            data:{},
            address: '',
            formData:{
                business_address:"",
                business_detail_address:"",
                past_average_credit_sales:"",
                annual_sales:"",
                gross_interest_rate:"",
                net_interest_rate:"",
                other_manage_info:""
            }
        }
      },
      created: function(){
        let loading = new Loading();
        loading.show();
        this.$get(API.PARTNER_MANAGE_INFO).then((response)=>{
            if(response.code == 500){
                new Toast(response.msg).show();
                return;
            }else if(response.code == 200){
                this.data = response.data;
                this.formData = response.data
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
              this.$post(API.PARTNER_MANAGE_INFO,this.formData).then((response)=>{
                  if(response.code == 500){
                      new Toast(response.msg).show();
                      return;
                  }else if(response.code == 200){

                      this.data = response.data;
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
</style>
