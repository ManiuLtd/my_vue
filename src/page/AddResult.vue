<template>
    <div class="box">
      <!--  顶部header begin  -->
      <top-header title-txt="添加商品"></top-header>
      <div class="content">
        <img src="../assets/images/icon_product_add.png"/>
        <span>您还没有商品，快添加吧~</span>
      </div>
    </div>
</template>
<script>
    import Vue from "vue"
    import TopHeader from '../components/TopHeader'

    export default {
        data() {
            return {};
        },
        methods:{

        },
        components:{TopHeader}
    }
</script>
<style>
  .content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .content img{
    margin-top: 5rem;
    width: 1.83rem;
    height: 1.79rem;
  }
  .content span{
    margin-top: 0.47rem;
    color: #757575;
    font-size: 0.48rem;
  }
</style>
