<template>
  <div class="cooper_content">
    <top-header title-txt="合作银行"></top-header>
    <ul class="cooper_bank_list clear">
      <li v-for="(bank,index) in bankList">
        <img :src="fileHost+bank.url" alt="">
        <span v-text="bank.name"></span>
      </li>
    </ul>
  </div>
</template>
<script>
  import * as API from '../service/API';
  import Toast from '../widget/Toast';
  import TopHeader from '../components/TopHeader';
  import eventBus from  '../utils/eventBus';

  export default {
    data() {
      return {
        fileHost: API.BASEURL+'/',
        bankList:[],
      };
    },
    mounted(){
      this.getbank();
    },
    methods:{
      getbank(){
        this.$get(API.BANK_MANAGE).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg);
            return;
          }else{
            this.bankList = response.data.withdraw_cash_banks;
          }
        });
      },
    },
    components:{TopHeader}
  }
</script>
<style lang="scss" scoped>
  @import "../style/common.scss";
  .cooper_content{
    .common_header{
      border: none;
    }
    .cooper_bank_list{
      padding: 2.21rem 5% .6rem 8%;
      li{
        width: 50%;
        display: flex;
        align-items: center;
        float:left;
        padding: .3rem 0;
        img{
          width: 0.88rem;
          height: 0.88rem;
          margin-right: .2rem;
        }
        span{
          font-size: .45rem;
          color: $font_100;
        }
      }
    }
  }

</style>
