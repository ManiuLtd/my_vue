<template>
  <div class="shop_create_content">
    <div class="page_bg"></div>
    <top-header :title-txt="'规格'+specIndex" father-right="编辑"  @callBackRightClick="editSpec"></top-header>
    <form class="content">
      <div class="input_content">
        <ul class="input_box">
          <li class="title_bar">
            <p>规格({{specIndex}})</p>
            <p @click="delSpec">删除</p>
          </li>
          <li class="input_div">
            <label><span class="must">*</span>规格类型</label>
            <input type="text"  v-model.trim="gnSpecType" readonly/>
          </li>
          <li class="input_div">
            <label><span class="must">*</span>规格单位</label>
            <input type="text" v-model.trim="specType" readonly>
          </li>
          <li class="input_div">
            <label><span class="must">*</span>规格值</label>
            <input type="text"  v-model.trim="specInfo.gn_spec_num" readonly="readonly">
          </li>
          <li class="input_div">
            <label><span class="must">*</span>单价(元)</label>
            <input type="text"  v-model.trim="specInfo.gn_price" readonly="readonly">
          </li>
          <li class="input_div">
            <label><span class="must">*</span>剩余库存值(件)</label>
            <input type="text" style="width: 55%;" v-model.trim="specInfo.gn_stock" readonly="readonly">
          </li>
          <li class="input_div">
            <label><span class="must">*</span>库存值提醒(件)</label>
            <input type="text" style="width: 55%;" v-model.trim="specInfo.gn_stock_remind" readonly="readonly">
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>
<script>
  import TopHeader from '../components/TopHeader'
  import { Dialog } from 'vant'
  import eventBus from  '../utils/eventBus'

  export default {
    data() {
      return {
        specIndex:'',
        specInfo:{},
        specType:'',
        gnSpecType:''
      };
    },
    activated(){
      this.specIndex = this.$route.params.id;
    },
    created(){
      this.getSpecInfo();
      eventBus.$on('specDetail',this.getCacheSpecInfo);
    },
    mounted() {},
    methods:{
      editSpec(){
        sessionStorage.setItem('TMEP_GOODS_SPEC_INFO',JSON.stringify(this.specInfo));
        this.$router.push(`/specEdit/${this.specIndex}`);
      },
      getSpecInfo(){
        var content = JSON.parse(sessionStorage.getItem('TMEP_GOODS_SPEC_INFO'));
        console.log(content);
        if(content){
          this.specInfo = content;
          this.specInfo.gn_spec_num = parseInt(this.specInfo.gn_spec_num);
          if(1 == this.specInfo.gn_spec_type){
            this.gnSpecType = '重量';
            this.specType = 'kg';
          }else if(2 == this.specInfo.gn_spec_type){
            this.gnSpecType = '容量';
            this.specType = 'ml';
          }
        }
      },
      getCacheSpecInfo(content){
        if(content){
          this.specInfo = content;
          this.specInfo.gn_spec_num = parseInt(this.specInfo.gn_spec_num);
          if(1 == this.specInfo.gn_spec_type){
            this.gnSpecType = '重量';
            this.specType = 'kg';
          }else if(2 == this.specInfo.gn_spec_type){
            this.gnSpecType = '容量';
            this.specType = 'ml';
          }
          sessionStorage.setItem('TMEP_GOODS_SPEC_INFO',JSON.stringify(this.specInfo));
        }
      },
      delSpec(){
        Dialog.confirm({
          title: '确定删除该规格吗？'
        }).then(() => {
          eventBus.$emit('delSpec',(this.specIndex -1));
          this.$router.go(-1);
        }).catch(() => {
          // on cancel
        });
      },
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
</style>
