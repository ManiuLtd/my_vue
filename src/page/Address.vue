<template>
  <div class="content">
    <top-header title-txt="选择地址" father-right="确定" @callBackRightClick="submit"></top-header>
    <div class="box">
      <div class="left">
        <p v-for="(classA,index) in arrA" v-text="classA.city_name" @click="getArrB(classA.city_key,$event)"></p>
      </div>
      <div class="center">
        <p v-for="(classB,index) in arrB" v-text="classB.city_name" @click="getArrC(classB.city_key,$event)"></p>
      </div>
      <div class="right">
        <p v-for="(classC,index) in arrC" v-text="classC.city_name" @click="getcity(classC.city_key,$event)"></p>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API from '../service/API';
  import TopHeader from '../components/TopHeader.vue'
  import Toast from '../widget/Toast';

  export default {
    data() {
      return {
        arrA:[],   //一级分类
        arrB:[],   //二级分类
        arrC:[],   //三级分类
        address:{
          area: "",
          area_name: "",
          city: "",
          city_name: "",
          name: "",
          province_name: "",
          provinces: "",
          lat:"",
          lng:"",
          selectAddress:""
        },
      };
    },
    methods: {
      submit(){
        if(this.address.area != ''){
          this.address.name = this.address.province_name +" "+ this.address.city_name +" "+ this.address.area_name;
          this.$store.dispatch('saveAddress',this.address);
          this.$router.go(-1);
        }else{
          new Toast("省市县都不能为空！").show();
          return false;
        }
      },
      chooseClass(){
        this.$get(API.WAP_GEOGRAPHY_POSITION).then((res)=>{
          this.arrA = res.data;
        });
      },
      getArrB(cate_id,event){
        this.arrC = [];
        this.address.city_name = '';
        this.address.city = '';
        this.address.area_name = '';
        this.address.area = '';
        this.$get(API.WAP_GEOGRAPHY_POSITION,{'pid':cate_id}).then((res)=>{
          this.arrB = res.data;
        });
        var that = event.currentTarget;
        that.className='choose';
        var sib = this.siblings(that);
        for(var i = 0;i<sib.length;i++){
          sib[i].className='';
        }
        for(var j=0;j<document.getElementsByClassName('choose_title').length;j++){
          document.getElementsByClassName('choose_title')[j].className = '';
        }
        this.address.province_name = that.innerHTML;
        this.address.provinces = cate_id;
      },
      getArrC(cate_id,event){
        this.address.area_name = '';
        this.address.area = '';
        this.$get(API.WAP_GEOGRAPHY_POSITION,{'pid':cate_id}).then((res)=>{
          this.arrC = res.data;
        });
        var that = event.currentTarget;
        that.className='choose_title';
        var sib = this.siblings(that);
        for(var i = 0;i<sib.length;i++){
          sib[i].className='';
        }
        this.address.city_name = that.innerHTML;
        this.address.city = cate_id;
      },
      getcity(cate_id,e){
        var that = e.currentTarget;
        that.className='choose_title';
        var sib = this.siblings(that);
        for(var i = 0;i<sib.length;i++){
          sib[i].className='';
        }
        this.address.area_name = that.innerHTML;
        this.address.area = cate_id;
      },
      siblings(elm) {
        var a = [];
        var p = elm.parentNode.children;
        for(var i =0,pl= p.length;i<pl;i++) {
          if(p[i] !== elm) a.push(p[i]);
        }
        return a;
      }
    },
    mounted () {
      var screenHeigt = window.screen.availHeight;
      document.getElementsByClassName('box')[0].style.height=screenHeigt+'px';
      document.getElementsByClassName('box')[0].style.height=screenHeigt+'px';
      this.chooseClass();
    },
    components:{TopHeader}
  }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  @import "../style/public.scss";
  .box{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 1.61rem;
    box-sizing: border-box;
  }
  .box div{
    box-sizing: border-box;
    width: 33%;
    height: 100%;
    float: left;
    overflow-x: auto;
  }
  .box .left{
    text-align: left;
    background-color: #EEEEEE;
  }
  .box .left p{
    box-sizing: border-box;
    padding-left: .46rem;
  }
  /*   被选中的样式  */
  .box .left .choose{
    background-color: #DDEAE7;
    color: #4cc3ad;
  }
  .box .right{
    padding-right: .46rem;
    text-align: right;
    box-sizing: border-box;
  }
  .box .right p{
    justify-content: flex-end;
  }
  .box .center{
    width: 34%;
  }
  .box .center p{
    justify-content: center;
  }
  .box div p{
    width: 100%;
    height: 1.2rem;
    font-size: .4rem;
    color: $font_100;
    display: flex;
    align-items: center;
  }
  .box div p.choose_title{
    color: #4cc3ad;
  }
</style>
