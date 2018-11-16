<template>
  <div class="shop_create_content">
    <top-header title-txt="添加规格"></top-header>
    <form class="content">
      <div class="input_content">
        <ul class="input_box">
          <li class="title_bar" >
            <p>规格</p>
          </li>
          <li class="input_div list_btn">
            <p><span class="must">*</span>规格类型</p>
            <span class="btn_type" :class="{check_btn : specType == 1}" @click="specType = 1">重量</span>
            <span class="btn_type" :class="{check_btn : specType == 2}" @click="specType = 2">容量</span>
          </li>
          <li class="input_div list_btn">
            <p><span class="must">*</span>规格单位</p>
            <span class="btn_type" :class="{check_btn : specType == 1}">kg</span>
            <span class="btn_type" :class="{check_btn : specType == 2}">ml</span>
          </li>
          <li class="input_div">
            <label><span class="must">*</span><span>规格值</span></label>
            <input type="number" placeholder="输入规格值" style="width: 53%;" v-model.trim="gn_spec_num">
          </li>
          <li class="input_div">
            <label><span class="must">*</span><span>单价(元)</span></label>
            <input type="number" placeholder="输入单价" style="width: 53%;" v-model.trim="gn_price">
          </li>
          <li class="input_div">
            <label><span class="must">*</span><span>剩余库存值(件)</span></label>
            <input type="number" placeholder="输入剩余库存值" style="width: 53%;" v-model.trim="gn_stock">
          </li>
          <li class="input_div">
            <label><span class="must">*</span><span>库存值提醒(件)</span></label>
            <input type="number" placeholder="输入库存值提醒" style="width: 53%;" v-model.trim="gn_stock_remind">
          </li>
        </ul>
      </div>
      <p class="must_title"><span class="must">*</span>为必填项</p>
      <span class="preserve_btn" @click="saveSpec">保存</span>
    </form>
  </div>
</template>
<script>
  import TopHeader from '../components/TopHeader'
  import * as API from '../service/API';
  import Toast from '../widget/Toast';
  import eventBus from  '../utils/eventBus'
  import Loading from '../widget/loading/loading'

  export default {
    data() {
      return {
        specId:this.$route.params.id,     //  规格类型 id
        specType:1,     //  规格类型   1 重量   2 容器
        gn_spec_num:'', //  规格值
        gn_id:0, //  规格值
        gn_price:'',  //单价
        gn_stock:'',  //剩余库存值
        gn_stock_remind:'', //库存值提醒
      };
    },
    mounted() {
      let screenHeigt = window.screen.availHeight;
      let topHeight = document.getElementsByClassName('common_header')[0].offsetHeight;
      document.getElementsByClassName('shop_create_content')[0].style.minHeight = screenHeigt - topHeight + 'px';
      document.getElementsByClassName('shop_create_content')[0].style.backgroundColor = '#eee';
      //eventBus.$on('spec',this.getSpecInfo);
      this.getSpecInfo();
    },
    methods:{
      getSpecInfo(){
        var content = JSON.parse(sessionStorage.getItem('TMEP_GOODS_SPEC_INFO'));
        if(content && this.specId > 0){
          this.specType = content.gn_spec_type;
          this.gn_spec_num = content.gn_spec_num;
          this.gn_price = content.gn_price;
          this.gn_stock = content.gn_stock;
          this.gn_id = content.gn_id;
          this.gn_stock_remind = content.gn_stock_remind;
        }
      },
      saveSpec(){
        if(false == this.verification()){
          return;
        }
        let data = {}
        data.gn_spec_type = this.specType;
        if(1 == this.specType){
          data.gn_spec_unit = 'kg';
        }else if(2 == this.specType){
          data.gn_spec_unit = 'ml';
        }
        data.gn_spec_num = this.gn_spec_num;
        data.gn_price = this.gn_price;
        data.gn_stock = this.gn_stock;
        data.gn_id = this.gn_id;
        data.gn_stock_remind = this.gn_stock_remind;
        let loading = new Loading();
        loading.show();
        this.$post(API.GOODS_EDIT_SPEC_PRICE,data).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }
          let specData = response.data;
          specData.gn_spec_type = data.gn_spec_type;
          eventBus.$emit('specDetail',specData);
          this.$router.go(-1);
          loading.close();
        }).then((error)=>{
          loading.close();
        });
      },
      verification(){
        if(!this.gn_spec_num){
          new Toast('请输入规格值').show();
          return false;
        }
        if(!this.gn_price){
          new Toast('请输入单价').show();
          return false;
        }
        if(!this.gn_stock){
          new Toast('请输入剩余库存值').show();
          return false;
        }
        if(!this.gn_stock_remind){
          new Toast('请输入库存值提醒').show();
          return;
        }
      }
    },
    components: {TopHeader}
  };
</script>
<style lang="scss" scoped>
  @import "../style/createStore.scss";
  /****title_bar*****/
  .title_bar {
    height: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    font-size: .4rem;
    padding: 0 .5rem;
  }
  .title_bar p:nth-child(1){
    color: #999999;
  }
  .title_bar p:nth-child(2){
    color: #4cc3ad;
  }
  .add_active{
    text-align: center;
    background-color: white;
    font-size: .47rem;
    padding: .65rem .5rem;
  }

  .add_active img {
    width: .56rem;
    height: .56rem;
    margin-right: .15rem;
  }

  .add_active label {
    color: #4cc3ad;
    vertical-align: bottom;
  }
  /*   规格选择  */
  .list_btn{
    color: #1a1b39;
    font-size: 0;
  }
  .list_btn p{
    font-size: .4rem;
    margin-bottom: .3rem;
  }
  .list_btn .btn_type{
    display: inline-block;
    width: 3.05rem;
    line-height: 1.05rem;
    text-align: center;
    color: $font_100;
    background-color: #F6F7F7;
    border-radius: 5px;
    font-size: .4rem;
    margin-right: .5rem;
  }
  .list_btn .check_btn{
    background-color: #E5F2EF;
  }
</style>
