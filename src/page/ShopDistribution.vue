<template>
  <div class="shop_create_content">
    <div class="page_bg"></div>
    <top-header title-txt="配送信息" ></top-header>
    <form class="content" onsubmit="return false">
      <div class="input_content">
        <ul class="input_box">
          <li class="input_div">
            <label><span class="must">*</span>配送方式</label>
            <p class="active">
              <radio-button @radioChange="disChange(1);" :is-checked="disState[1]" radio_title="商家配送"  style="margin-right: .63rem;"></radio-button>
              <radio-button @radioChange="disChange(2);" :is-checked="disState[2]" radio_title="买家自提" ></radio-button>
            </p>
          </li>
          <div v-if="disState[3]">
            <li class="input_div">
              <label><span class="must">*</span>配送范围(公里)</label>
              <input type="number" v-model.trim="formData.distance" placeholder="输入与商家的直线距离" value="" style="width: 53%;">
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
              <li class="input_div input_fee_title">
                <label><span class="must">*</span>最低运费</label>
              </li>
              <li class="input_div input_fee_title">
                <label><span class="must input_fee_must">*</span>基础距离(公里)</label>
                <input type="number" v-model.trim="formData.lowestFreightDistance" placeholder="输入基础距离" value="">
              </li>
              <li class="input_div input_fee_title">
                <label><span class="must input_fee_must">*</span>最低运费(元)</label>
                <input type="number" v-model.trim="formData.lowestFreightMoney" placeholder="输入最低运费" value="">
              </li>
              <li class="input_div input_fee_tip"><span class="must input_fee_must">*</span>例如：基础距离以内，收取最低运费</li>
              <li class="input_div input_fee_title">
                <label><span class="must">*</span>附加运费</label>
              </li>
              <li class="input_div input_fee_title">
                <label><span class="must input_fee_must">*</span>递增距离(公里)</label>
                <input type="number" v-model.trim="formData.additionFreightDistance" placeholder="输入递增距离" value="">
              </li>
              <li class="input_div input_fee_title">
                <label><span class="must input_fee_must">*</span>递增运费(元)</label>
                <input type="number" v-model.trim="formData.additionFreightMoney" placeholder="输入递增运费" value="">
              </li>
              <li class="input_div input_fee_tip"><span class="must input_fee_must">*</span>例如：超出基础距离，每增加1公里，运费增加1元</li>
              <p class="bar"></p>
            </div>

            <li class="input_div">
              <label><span class="must">*</span>订单起送金额(元)</label>
              <input v-model.trim="formData.sendOutMoney" type="number" placeholder="输入起送金额" value="" style="width: 45%;">
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
    </form>
    <span @click="submit" :class="bottom_btn_style">保存</span>
  </div>
</template>
<script>
  import TopHeader from '../components/TopHeader'
  import RadioButton from '../components/common/RadioButton.vue'
  import Toast from '../widget/Toast'
  import * as API from '../service/API'
  import eventBus from  '../utils/eventBus'
  import SuccessLoading from '../widget/sucess_loading/SuccessLoading'
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
            formData:{},
            clientHeight:document.documentElement.clientHeight,
            bottom_btn_style:'btn_fixed'
        }
    },
    created: function(){
      eventBus.$on('runDbTime',this.getDbTime);
    },
    activated(){
      this.resizeWindow();
      if(this.$store.state.pageRouter.isRefresh){
        Object.assign(this.$data, this.$options.data());
        this.getDistributionInfo();
      }
      this.$store.dispatch('setIsRefresh',false);
    },
    deactivated(){
      window.onresize = null;
    },
    methods: {
      resizeWindow(){
        window.onresize = ()=>{
          if(this.clientHeight>document.documentElement.clientHeight) {
            this.bottom_btn_style = "btn_margin";
          }else{
            this.bottom_btn_style = "btn_fixed";
          }
        }
      },
      getDistributionInfo(){
        this.$get(API.SHOP_DISTRIBUT_INFO).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else if(response.code == 200){
            this.formData.is_support_distribut = response.data.isSupportDistribut;
            this.disChange(this.formData.is_support_distribut);
            this.formData.distance = response.data.distributDistance ? response.data.distributDistance.toFixed(2) : '';
            this.formData.free_freight = response.data.freeFreight;
            this.freightChange(this.formData.free_freight);
            // eg. 20公里以内，运费统一为5
            this.formData.lowestFreightDistance = response.data.lowestFreightDistance ? response.data.lowestFreightDistance.toFixed(2) : '';
            this.formData.lowestFreightMoney = response.data.lowestFreightMoney ? response.data.lowestFreightMoney.toFixed(2) :'';

            // 每增加30公里，运费增加3元
            this.formData.additionFreightDistance = response.data.additionFreightDistance ? response.data.additionFreightDistance.toFixed(2) : '';
            this.formData.additionFreightMoney = response.data.additionFreightMoney ? response.data.additionFreightMoney.toFixed(2) : '';

            this.formData.sendOutMoney = response.data.sendOutMoney;
            this.formData.beginDistributTime = response.data.beginDistributTime;
            this.formData.endDistributTime = response.data.endDistributTime;
            this.DbTimeText = this.formData.beginDistributTime + '~' + this.formData.endDistributTime;
          }
        });
      },
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
        if(this.formData.is_support_distribut == 1){
          if(!this.formData.free_freight){
            new Toast("配送设置必选").show();
            return false;
          }else if(this.formData.free_freight == 1){
            if(this.formData.distance <= 0){
              this.formData.distance = '';
              new Toast("配送范围不能为负值或0").show();
              return false;
            }
            if(this.formData.lowestFreightDistance <= 0){
              this.formData.lowestFreightDistance = '';
              new Toast("基础距离不能为负值或0").show();
              return false;
            }
            if(this.formData.lowestFreightMoney <= 0){
              this.formData.lowestFreightMoney = '';
              new Toast("最低运费不能为负值或0").show();
              return false;
            }
            if(this.formData.additionFreightDistance <= 0){
              this.formData.additionFreightDistance = '';
              new Toast("递增距离不能为负值或0").show();
              return false;
            }
            if(this.formData.additionFreightMoney <= 0){
              this.formData.additionFreightMoney = '';
              new Toast("递增运费不能为负值或0").show();
              return false;
            }
          }
          if(this.formData.sendOutMoney <= 0){
            this.formData.sendOutMoney = '';
            new Toast("订单起送金额不能为负值或0").show();
            return false;
          }
        }

        this.$post(API.SHOP_DISTRIBUT_INFO,this.formData).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else if(response.code == 200){
            new SuccessLoading(response.msg).show();
            this.data = response.data;
            this.$router.replace('/storeManage');
          }
        })
      }
    },
    components:{TopHeader,RadioButton}
  };
</script>
<style lang="scss" scoped>
  @import "../style/createStore.scss";

  .shop_create_content{
    background-color: #eeeeee;
    .content{
      padding-bottom: 2.56rem;
    }
  }

  .input_div .time_input{
    right: 1rem;
    width: 50%;
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
    margin-top: -1.25rem;
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: #5FCCC6;
  }
</style>
