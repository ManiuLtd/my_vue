<template>
  <div>
    <!--  顶部header begin  -->
    <top-header title-txt="商品列表" frouter='/main/home'></top-header>
    <router-link to="/addGoods">
      <div class="content">
        <img src="../assets/images/icon_product_add.png"/>
        <span>您还没有商品，快添加吧~</span>
      </div>
    </router-link>
  </div>
</template>

<script>
 import TopHeader from '../components/TopHeader'
  export default {
      name: "AddProduct",
      data(){
          return{}
      },
      methods:{},
      components:{TopHeader}
  }
</script>

<style lang="scss" scoped>
  .content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .content img{
    margin-top: 65%;
    width: 1.83rem;
    height: 1.79rem;
  }
  .content span{
    margin-top: 0.6rem;
    color: #757575;
    font-size: 0.48rem;
  }
</style>
