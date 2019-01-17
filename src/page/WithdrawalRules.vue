<template>
  <transition name="slide-left">
    <div class="rules_content" v-if="isShow">
      <div>
        <p class="rules_title"><i class="rules_icon"></i><span>提现规则</span></p>
        <table class="table table-bordered">
          <tbody>
          <tr>
            <td style="padding: .35rem .6rem;">到账时间</td>
            <td>提现金额<1000元</td>
            <td>提现金额≥1000元</td>
          </tr>
          <tr v-for="(item,key,index) in rulesData">
            <td>T+<span v-text="key"></span></td>
            <td v-for="(fee,i) in item.desc" v-text="fee"></td>
          </tr>
          <tr>
            <td colspan="3" class="title_left">
              <p>其它说明：</p>
              <p>1、单笔提现金额≥10元；</p>
              <p>2、大笔提现金额≤10万元。</p>
            </td>
          </tr>
          </tbody>
        </table>
        <p class="close" @click="isClose"><i></i></p>
      </div>

    </div>
  </transition>
</template>

<script>
  import * as API from '../service/API';
  import Toast from "../widget/Toast";
  import Loading from '../widget/global_loading/loading';
  import SuccessLoading from "../widget/sucess_loading/SuccessLoading";

  export default {
    data(){
      return{
        rulesData:[],
      }
    },
    props:{
      isShow:{default:false,type:Boolean}
    },
    mounted(){
      this.getData();
    },
    methods:{
      isClose(){
        this.$emit('rulesClose');
      },
      getData(){
        this.$get(API.PARTNER_CASH_WITHDRAWAL).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else {
            this.rulesData = response.data;
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .rules_content{
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 100;
    justify-content: center;
    align-items: center;
  }
  .rules_title{
    position: relative;
    font-size: .48rem;
    color: #666666;
    text-align: center;
  }
  .rules_title .rules_icon{
    position: absolute;
    display: inline-block;
    width: .58rem;
    height: .67rem;
    left: 32%;
    top:50%;
    margin-top: -.34rem;
    background: url('../assets/images/withdrawal_rules_icon.png') no-repeat center;
    background-size: cover;
  }
  table {
    font-size: .36rem;
    border-spacing: 0;
    border-collapse: collapse;
    margin: 1.6rem auto 2.26rem;
    color: #666666;
  }
  table>tbody>tr>td{
    border: 1px solid #b4b4b4;
    padding: .35rem .2rem;
    text-align: center;
  }
  .title_left{
    text-align: left;
    padding: .46rem .6rem;
  }
  .title_left p{
    padding-bottom: .2rem;
  }
  .title_left p:last-child{
    padding: 0;
  }
  .close{
    text-align: center;
  }
  .close i{
    display: inline-block;
    width: .61rem;
    height: .61rem;
    background: url('../assets/images/withdrawal_rules_close_icon.png') no-repeat center;
    background-size: cover;
  }


  .slide-left-enter {
    transform: translateY(100%);
  }
  .slide-left-enter-active{
    transition: transform .3s;
  }
  .slide-left-enter-to{
    transform: translateY(0);
  }
  .slide-left-leave {
    transform: translateY(0);
  }
  .slide-left-leave-active {
    transition: transform .3s
  }
  .slide-left-leave-to {
    transform: translateY(100%);
  }

</style>
