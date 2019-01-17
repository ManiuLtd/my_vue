<template>
    <div class="content">
      <div class="page_bg"></div>
      <top-header title-txt="配置属性"></top-header>
      <div class="info">
        <div class="item" v-for="(item,index) in no_sale">
          <span class="item-tips">{{item.pn_name}}</span>
          <input class="item-edit" :placeholder="`输入${item.pn_name}`" v-model.trim="no_sale[index].pv_value"/>
        </div>
      </div>
      <span :class="bottom_btn_style" @click="addAttr">确定添加</span>
    </div>
</template>

<script>

  import TopHeader from '../components/TopHeader';
  import Toast from '../widget/Toast';
  import * as API from '../service/API';

  export default{
    data(){
      return{
        no_sale:[],
        bottom_btn_style:'btn_fixed'
      }
    },
    methods:{
      addAttr(){
        this.$store.dispatch('saveAttrInfo',this.no_sale);
        this.$router.go(-1);
      },
      //获取商品属性
      getAttributeData() {
        let gId = this.$route.params.gId; //商品Id
        if(!gId){
          let attribute = this.$store.state.goods.attribute;
          if(attribute&&attribute.length>0){
            this.no_sale = attribute;
            return;
          }
        }
        let gcId = this.$route.params.cateId; //分类Id
        let requestUrl = API.ATTRIBUTE_DATA + `?gc_id=${gcId}`;
        if(gId){
          requestUrl = API.ATTRIBUTE_DATA + `?gc_id=${gcId}&g_id=${gId}`;
        }
        this.$get(requestUrl).then((response) => {
          if (response.code != 200) {
            new Toast(response.msg).show();
            return;
          }
          this.no_sale = response.data.no_sale;
        });
      },
      resizeWindow(){
        window.onresize = ()=>{
          if(this.clientHeight>document.documentElement.clientHeight) {
            this.bottom_btn_style = "btn_margin";
          }else{
            this.bottom_btn_style = "btn_fixed";
          }
        }
      },
    },
    mounted(){
      this.getAttributeData();
      this.resizeWindow();
    },
    components:{
      TopHeader
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    .info{
      padding-top: 1.83rem;
      .item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 1.78rem;
        background-color: #ffffff;
        .item-tips{
          padding-left: 0.53rem;
          width: 35%;
          display: block;
          font-size: 0.48rem;
          color: #1a1b39;
        }
        .item-edit{
          padding-right: 0.5rem;
          display: block;
          font-size: 0.48rem;
          text-align: right;
          width: 65%;
        }
      }
    }
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
  }
</style>
