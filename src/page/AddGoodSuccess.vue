<template>
  <div>
    <top-header title-txt="添加结果"></top-header>
    <div class="content">
      <div class="state">
        <img src="../assets/images/icon_add_success.png"/>
        <span>恭喜您，商品添加成功</span>
      </div>
      <router-link to="/main" replace>
        <span class="middle_btn" style="margin-top: 3.4rem">返回首页</span>
      </router-link>
      <router-link to="/shopList" replace>
        <span class="middle_btn add_goods_btn" style="margin-top: 0.32rem">查看商品列表</span>
      </router-link>
    </div>
  </div>
</template>

<script>

  import TopHeader from '../components/TopHeader'

  export default {

    components:{
      TopHeader
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    margin-top: 1.61rem;
  }
  .content .state{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .content .state img{
    margin-top: 2.14rem;
    width: 2.35rem;
    height: 2.35rem;
  }
  .content .state span{
    margin-top: 0.48rem;
    color: rgba(26,27,57,1);
    font-size: 0.42rem;
  }
</style>
