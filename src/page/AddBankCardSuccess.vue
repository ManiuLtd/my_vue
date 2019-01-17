<template>
    <div class="bankCardSuccess_content">
      <img src="../assets/images/icon_add_bank_card_success.png" alt="">
      <p class="bankCardSuccess_title">恭喜您，银行卡添加成功！</p>
      <span class="bankCardSuccess_btn" @click="success">完成</span>
    </div>
</template>
<script>

  export default {
    data() {
        return {};
    },
    methods:{
      success(){
        this.$router.push('/bankCardManage');
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../style/common.scss";
  .bankCardSuccess_content{
    text-align: center;
    padding-top: 4.5rem;
  }
  .bankCardSuccess_content img{
    width: 1.29rem;
    height: 1.27rem;
  }
  .bankCardSuccess_title{
    padding: .6rem 0;
    font-size: .5rem;
    font-weight: bold;
    color: $font_100;
  }
  .bankCardSuccess_btn{
    display: inline-block;
    width: 4.55rem;
    padding: .4rem 0;
    text-align: center;
    color: white;
    font-size: .48rem;
    background-color: $main_grren;
    border-radius: .3rem;
    margin-top: 4rem;
  }
</style>
