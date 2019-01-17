<template>
    <div>
      <top-header title-txt="选择品牌" father-right="确定" @callBackRightClick="saveBrand"></top-header>
      <ul style="padding-top: 1.61rem;" class="clear">
        <li v-for="(brand,index) in brandList" v-text="brand.gbName" @click="chooseBrand(brand)" :class={choose_title:selectBrandIds.includes(brand.gbId)}></li>
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
            brandList:[],
            selected:[],
            selectBrandIds:[],
            selectBrandNames:[]
          };
      },
      methods:{
        getBrand(){
          let cate_id = this.$route.params.id;
          if(!cate_id){    //分类页面已做拦截，这儿继续做保护拦截
            new Toast("请先选择商品分类").show();
            return;
          }
          this.$get(API.GOODS_BRANDS + `?cate_id=${cate_id}`).then((response)=>{
            if(response.code!=200){
              new Toast(response.msg).show();
              return;
            }
            this.brandList = response.options;
          });
        },
        saveBrand(){
          eventBus.$emit('getBrand',{brandIds:this.selectBrandIds,brandNames:this.selectBrandNames});
          this.$router.go(-1);
        },
        chooseBrand(brand){
          // 选择单个逻辑, 选择多个，注销掉这两句话
          this.selectBrandIds.splice(0,this.selectBrandIds.length);
          this.selectBrandNames.splice(0,this.selectBrandNames.length);
          // 选多个逻辑
          if(this.selectBrandIds.includes(brand.gbId)){
            this.selectBrandIds.splice(this.selectBrandIds.indexOf(brand.gbId),1)
            this.selectBrandNames.splice(this.selectBrandNames.indexOf(brand.gbName),1);
          }else{
            this.selectBrandIds.push(brand.gbId);
            this.selectBrandNames.push(brand.gbName);
          }
        },
      },
      activated(){
        this.getBrand();
      },
      components:{TopHeader}
    }
</script>
<style lang="scss" scoped>
  @import "../style/common.scss";
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
    color: $font_100;
    text-align: center;
  }
  li.choose_title{
    background-color: #E5F2EF;
  }
</style>
