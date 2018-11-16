<template>
  <div class="shop_create_content">
    <top-header title-txt="配送信息" ></top-header>
    <form class="content" onsubmit="return false">
      <div class="input_content">
        <ul class="input_box">
          <li class="input_div">
            <label><span class="must">*</span>配送服务</label>
            <p class="active">
              <radio-button @radioChange="disChange(1);" :is-checked="disState[1]" radio_title="支持配送"  style="margin-right: .63rem;"></radio-button>
              <radio-button @radioChange="disChange(2);" :is-checked="disState[2]" radio_title="不支持配送" ></radio-button>
            </p>
          </li>
          <div v-if="disState[3]">
            <li class="input_div">
              <label><span class="must">*</span>配送范围(公里)</label>
              <input type="text" v-model.trim="formData.distance" placeholder="输入与商家的直线距离" value="" style="width: 53%;">
            </li>
            <p class="bar"></p>
            <li class="input_div">
              <label><span class="must">*</span>配送费</label>
              <p class="active">
                <radio-button @radioChange="freightChange(2);" :is-checked="freightState[2]" radio_name="free_freight" radio_title="免运费" style="margin-right: .63rem;"></radio-button>
                <radio-button @radioChange="freightChange(1);" :is-checked="freightState[1]" radio_name="free_freight" radio_title="设置运费"></radio-button>
              </p>
            </li>
            <div v-if="this.freightState[3]">
              <li class="input_div input_fee">
                <label><span class="must">*</span>最低运费</label>
                <input type="text" v-model.trim="formData.lowestFreigh" placeholder="输入多少公里以内，运费统一为多少元" value="">
                <p>例如：20公里以内，运费统一为5元</p>
              </li>
              <li class="input_div input_fee">
                <label><span class="must">*</span>附加运费</label>
                <input type="text" v-model.trim="formData.additionFreight" placeholder="输入每增加多少公里，运费增加多少元" value="">
                <p>例如：每增加30公里，运费增加3元</p>
              </li>
              <p class="bar"></p>
            </div>

            <li class="input_div">
              <label><span class="must">*</span>订单起送金额(元)</label>
              <input v-model.trim="formData.sendOutMoney" type="text" placeholder="输入起送金额" value="" style="width: 45%;">
            </li>
            <router-link to="/shopDbTime">
              <li class="input_div">
                <label><span class="must">*</span>配送时间(每天)</label>
                <input type="text" placeholder="请选择" :value="DbTimeText" readonly="readonly" class="time_input">
                <i class="icon_arrow"></i>
              </li>
            </router-link>
          </div>

        </ul>
      </div>
      <p class="must_title"><span class="must">*</span>为必填项</p>
      <span @click="submit" class="preserve_btn">保存</span>
    </form>
  </div>
</template>
<script>
  import TopHeader from '../components/TopHeader'
  import RadioButton from '../components/common/RadioButton.vue'
  import Toast from '../widget/Toast'
  import * as API from '../service/API'
  import eventBus from  '../utils/eventBus'
  export default {
      data(){
          return {
              activeName: '0',
              disState:{
                  1:false,
                  2:false,
                  3:false,
              },
              freightState:{
                  1:false,
                  2:false,
                  3:false
              },
              DbTime:{},    //  选择配送时间
              DbTimeText:'',
              formData:{}
          }
      },
      created: function(){
        this.$get(API.SHOP_DISTRIBUT_INFO).then((response)=>{
              if(response.code != 200){
                  new Toast(response.msg).show();
                  return;
              }else if(response.code == 200){
                  this.formData.is_support_distribut = response.data.isSupportDistribut;
                  this.disChange(this.formData.is_support_distribut);
                  this.formData.distance = response.data.distributDistance;
                  this.formData.free_freight = response.data.freeFreight;
                  this.freightChange(this.formData.free_freight);
                  // eg. 20公里以内，运费统一为5
                  this.formData.lowestFreightDistance = response.data.lowestFreightDistance;
                  this.formData.lowestFreightMoney = response.data.lowestFreightMoney;
                  this.formData.lowestFreigh = this.formData.lowestFreightDistance+','+this.formData.lowestFreightMoney;

                  // 每增加30公里，运费增加3元
                  this.formData.additionFreightDistance = response.data.additionFreightDistance;
                  this.formData.additionFreightMoney = response.data.additionFreightMoney;
                  this.formData.additionFreight = this.formData.additionFreightDistance+','+this.formData.additionFreightMoney;

                  this.formData.sendOutMoney = response.data.sendOutMoney;
                  this.formData.beginDistributTime = response.data.beginDistributTime;
                  this.formData.endDistributTime = response.data.endDistributTime;
                  this.DbTimeText = this.formData.beginDistributTime + '~' + this.formData.endDistributTime;
              }
          });
        eventBus.$on('runDbTime',this.getDbTime);
      },
      methods: {
        freightChange: function(value){
            this.formData.free_freight = value;
            if(value == 1){
                this.freightState[3] = true;
            }else{
                this.freightState[3] = false;
            }
            this.freightState[value] = true;
        },
        disChange: function(value){
            this.disState[value] = true;
            if(value == 1){
                this.disState[3] = true;
            }else{
                this.disState[3] = false;
            }
            this.formData.is_support_distribut = value;
        },
        //  获取配送时间
        getDbTime(content){
          this.DbTime = content;
          this.DbTimeText = this.DbTime.startTime + '~' + this.DbTime.endTime;
          this.formData.beginDistributTime = this.DbTime.startTime;
          this.formData.endDistributTime = this.DbTime.endTime;
        },
        submit: function () {
            let lowestFreighArr=this.formData.lowestFreigh.split(",");
            this.formData.lowestFreightDistance = lowestFreighArr[0];
            this.formData.lowestFreightMoney = lowestFreighArr[1];
            let additionFreightArr=this.formData.additionFreight.split(",");
            this.formData.additionFreightDistance = additionFreightArr[0];
            this.formData.additionFreightMoney = additionFreightArr[1];
            this.$post(API.SHOP_DISTRIBUT_INFO,this.formData).then((response)=>{
                if(response.code != 200){
                    new Toast(response.msg).show();
                    return;
                }else if(response.code == 200){
                    new Toast(response.msg).show();
                    this.data = response.data
                }
            })
        }
      },
    mounted () {
      let screenHeigt = window.screen.availHeight;
      let topHeight = document.getElementsByClassName('common_header')[0].offsetHeight;
      document.getElementsByClassName('shop_create_content')[0].style.minHeight=screenHeigt-topHeight+'px';
      document.getElementsByClassName('shop_create_content')[0].style.backgroundColor='#eee';
    },
    components:{TopHeader,RadioButton}
  };
</script>
<style lang="scss" scoped>
  @import "../style/createStore.scss";
  .input_div .time_input{
    right: 1rem;
    width: 50%;
  }
</style>
