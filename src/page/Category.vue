<template>
  <div class="content">
    <top-header title-txt="选择分类" father-right="保存" @callBackRightClick="submit"></top-header>
    <div class="CategoryBox">
      <div class="left">
        <p v-for="(classA,index) in arrA" v-text="classA.gc_name" @click="getArrB(classA,index)" :class="{selected : index == arrAselect}"></p>
      </div>
      <div class="center">
        <p v-for="(classB,index) in arrB" v-text="classB.gc_name" @click="getArrC(classB,index)" :class="{selectedBC : index == arrBselect}"></p>
      </div>
      <div class="right">
        <p v-for="(classC,index) in arrC" v-text="classC.gc_name" @click="setClickPosition(classC,index)" :class="{selectedBC : index == arrcSelect}"></p>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API from '../service/API';
  import TopHeader from '../components/TopHeader.vue'
  import eventBus from  '../utils/eventBus'

  export default {
    data() {
      return {
        arrA:[],   //一级分类
        arrB:[],   //二级分类
        arrC:[],   //三级分类
        arrAselect: 0, //一级分类选中
        arrBselect: 0, //二级分类选中
        arrcSelect: 0, // 三级分类选中
        category: {firLevelId:'',firLevelName:'',secLevelId:'',secLevelName:'',thiLevelId:'',thiLevelName:''}
      };
    },
    methods: {
      submit(){
        eventBus.$emit('categorySelected',this.category);
        this.$router.go(-1);
      },
      getArrA(){
        this.$get(API.CATE_OPTIONS).then((res)=>{
          this.arrA = res.options;
          if(this.arrA){
            this.getArrB(this.arrA[0],0);
          }
        });
      },
      getArrB(category,position){
        this.arrC = [];
        this.$get(API.CATE_OPTIONS,{'cate_id':category.gc_id}).then((res)=>{
          this.arrB = res.options;
          if(this.arrB&&this.arrB.length>0){
            this.getArrC(this.arrB[0],0);
          }
        });
        // 注意： 请求B的时候， 保存A的点击位置
        this.arrAselect = position;
        this.category.firLevelId = this.arrA[position].gc_id;
        this.category.firLevelName = this.arrA[position].gc_name;

        this.category.secLevelId = '';
        this.category.secLevelName = '';

        this.category.thiLevelId = '';
        this.category.thiLevelName = '';

      },
      getArrC(category,position){
        this.$get(API.CATE_OPTIONS,{'cate_id':category.gc_id}).then((res)=>{
          this.arrC = res.options;
          if(this.arrC&&this.arrC.length>0){
            this.setClickPosition(this.arrC[0],0)
          }
        });
        // 注意： 请求C的时候， 保存B的点击位置
        this.arrBselect = position;
        this.category.secLevelId = this.arrB[position].gc_id;
        this.category.secLevelName = this.arrB[position].gc_name;

        this.category.thiLevelId = '';
        this.category.thiLevelName = '';
      },
      setClickPosition(category,position){
        // 点击C的时候，保存C的点击位置
        this.arrcSelect = position;
        this.category.thiLevelId = this.arrC[position].gc_id;
        this.category.thiLevelName = this.arrC[position].gc_name;
      }
    },
    mounted () {
      let screenHeigt = window.screen.availHeight;
      document.getElementsByClassName('CategoryBox')[0].style.height=screenHeigt+'px';
      document.getElementsByClassName('CategoryBox')[0].style.height=screenHeigt+'px';
      this.getArrA();
    },
    components:{TopHeader}
  }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  @import "../style/public.scss";
  .CategoryBox{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 1.61rem;
    box-sizing: border-box;
  }
  .CategoryBox div{
    box-sizing: border-box;
    width: 33%;
    height: 100%;
    float: left;
    overflow-x: auto;
  }
  .CategoryBox .left{
    text-align: left;
    background-color: #EEEEEE;
  }
  .CategoryBox .left p{
    padding-left: .2rem;
  }
  .CategoryBox .right{
    padding-right: .2rem;
    text-align: right;
  }
  .CategoryBox .right p{
    justify-content: flex-end;
  }
  .CategoryBox .center{
    width: 34%;
  }
  .CategoryBox .center p{
    justify-content: center;
  }
  .CategoryBox div p{
    width: 100%;
    height: 1.2rem;
    font-size: .4rem;
    color: $font_100;
    display: flex;
    align-items: center;
  }
  /*   被选中的样式  */
  .CategoryBox .selected{
    background-color: #DDEAE7;
    color: #4cc3ad;
  }
  .CategoryBox div .selectedBC{
    color: #4cc3ad;
  }
</style>
