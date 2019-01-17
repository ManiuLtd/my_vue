<template>
  <div>
    <top-header title-txt="商品信息"></top-header>
    <p style="margin: 2.21rem .38rem 0" class="product_title">销售品类</p>
    <ul class="clear">
      <li v-for="(item,index) in productData" v-text="item.gc_name">item</li>
    </ul>
    <p class="product_tip">您已审核该资料信息，无需再次修改</p>
  </div>
</template>
<script>
  import TopHeader from '../../components/TopHeader'
  import * as API from '../../service/API';

  export default {
    data() {
      return {
        productData:'',
      };
    },
    mounted(){
      this.getProductData();
    },
    components:{TopHeader},
    methods:{
      getProductData(){
        this.$get(API.CATE_OPTIONS).then((res)=>{
          if(res.code != 200){
            new Toast(response.msg).show();
            return;
          }
          this.productData = res.options;
        });
      }
    },
  }
</script>
<style lang="scss" scoped>
  .product_title{
    font-size: .48rem;
    color: #1a1b39;
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 0 .2rem;
  }
  ul li{
    width: 3.08rem;
    line-height: 1.05rem;
    background-color: #F6F7F7;
    margin: 0.5rem 0.18rem 0;
    font-size: .4rem;
    color: #1a1b39;
    text-align: center;
  }
  .product_tip{
    font-size: .32rem;
    padding: .15rem .38rem 0;
    color: #D4D4D6;
  }
</style>
