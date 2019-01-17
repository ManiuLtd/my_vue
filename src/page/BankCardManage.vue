<template>
    <div class="bankcardcontent">
      <top-header title-txt="银行卡管理" is-has-slot="true">
         <img :class="{'title-right':true,'title-right-hide':bankCardNum <= 0}" slot="rightImg" src="../assets/images/icon_bankcard_add.png" @click="addBankCard"/>
      </top-header>
      <div class="nobankcard" v-if="bankCardNum <= 0">
        <img src="../assets/images/icon_nobankcard.png" alt="">
        <p class="nobankcard_tip">暂未绑定银行卡哦~</p>
        <p class="add_bankcard" @click="addBankCard">立即绑定</p>
      </div>
      <div class="backcard" v-if="bankCardNum > 0" v-for="(item,index) in userInfo">
        <div class="name">
          <p class="name_info">
            <img class="logo" :src= baseUrl+item.url />
            <span class="type">{{item.partnerBankName}}(储蓄卡)</span>
          </p>
          <span class="accountStatus" v-if="item.partnerAccountStatus==1" @click="activeBankCard(item)">激活</span>
          <span class="accountStatus activated" v-if="item.partnerAccountStatus==0">已激活</span>
        </div>
        <p class="num" v-text="item.partnerBankCode.substr(0,4)+'*** **** ****'+item.partnerBankCode.substring(15)"></p>
        <p class="account">账户名：<span v-text="'*'+item.partnerUserName.substr(1,2)"></span></p>
        <p class="default_btn" @click="isChecked(item.partnerIsDefault,index+1,item.bankId)" v-if="bankCardNum > 1 && item.partnerAccountStatus==0">
          <i :class="{ischeck:item.partnerIsDefault==1 || checked==index+1}"></i>
          <span>默认</span>
        </p>
      </div>
      <router-link :to="{path: '/cooperativeBank'}">
        <p class="bankQuery">合作银行查询<img src="../assets/images/icon_rule_arrow.png"/></p>
      </router-link>
      <div class="tips">
        <span>温馨提示：</span>
        <span>1、银行卡必须为实名认证本人的银行卡;</span>
        <span>2、手机号必须为银行预留手机号；</span>
        <span>3、只能添加储蓄卡;</span>
        <span>4、若您有疑问，请拨打客服电话400-888-0028。</span>
      </div>
    </div>
</template>

<script>
  import TopHeader from '../components/TopHeader'
  import * as API from '../service/API';
  import Toast from '../widget/Toast';
  import Loading from '../components/Loading';
  import { Dialog } from 'vant';

    export default {
      data(){
        return {
          bankNum:'',
          bankName:'',
          trueName:'',
          userInfo:[],
          bankCardNum:'',  //  绑定银行卡数量
          baseUrl: API.BASEURL+'/',
          formData:{
            ident_no: "",
            true_name: "",
            card_no: "",
            phone: "",
            bank_type: "",
            bank_id: "",
            is_default:"",
          },
          checked:'',
        }
      },
      methods:{
        activeBankCard(msg){
          this.$router.push({name:'bankCardActivate',params:{bankdata:msg,bankCardNum:this.bankCardNum}});
        },
        getStoreInfo(){
          this.$get(API.BANK_MANAGE).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg);
              return;
            }else{
              this.userInfo = response.data.banks;
              this.bankCardNum = this.userInfo.length == null || undefined ? 0 : this.userInfo.length;
            }
          });
        },
        addBankCard(){
          this.$router.push({name:'addBankCard',params:{bankCardNum:this.bankCardNum}});
        },
        isChecked(ischeck,index,id){
          if(ischeck != 1){
            Dialog.confirm({
              title:'确定设置该银行卡为默认吗？',
              confirmButtonText:'是',
              cancelButtonText:'否'
            }).then(() => {
              this.$post(API.BANK_SET_DEFAULT_BANK,{bank_id:id}).then((response)=>{
                if(response.code != 200){
                  new Toast(response.msg).show();
                  return;
                }else{
                  new Toast(response.msg).show();
                  this.getStoreInfo();
                  this.checked = index;
                }
              });
            }).catch(() => {

            });
          }
        }
      },
      beforeRouteLeave (to, from, next) {
        if(to.path=='/addBankCard'){
          this.$store.dispatch('setIsRefresh',true);
        }
        next();
      },
      activated(){
        this.getStoreInfo();
      },
      components:{TopHeader}
    }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  .bankcardcontent{
    padding-top: 1.61rem;
    .title-right{
      width: 1.61rem;
      height: 1.61rem;
    }
    .title-right-hide{
      visibility: hidden;
    }
    .common_header{
      border: none;
    }
    .backcard{
      position: relative;
      margin: .45rem 0 0 .52rem;
      background: url("../assets/images/icon_bank_bg.png") no-repeat;
      background-size: cover;
      width: 9.7rem;
      height: 3.8rem;
      padding:.68rem .6rem .6rem;
      box-sizing: border-box;
    .name{
      display: flex;
      align-items: center;
      justify-content: space-between;
    .name_info{
      display: flex;
      font-size:0;
      align-items: center;
    .logo{
      width: 0.88rem;
      height: 0.88rem;
    }
    .type{
      color: white;
      font-size: 0.4rem;
      padding-left: .17rem;
    }
    }
    .accountStatus{
      display: inline-block;
      padding: .1rem .43rem;
      border: 1px solid white;
      border-radius: .16rem;
      font-size: .36rem;
      color: white;
    }
    .activated{
      border: none!important;
    }
    }
    .num{
      padding-top: 0.4rem;
      color: white;
      font-size: 0.52rem;
    }
    .account{
      padding-top: 0.15rem;
      font-size: 0.36rem;
      color: white;
    }
    .default_btn{
      position: absolute;
      right: .28rem;
      bottom: .34rem;
      display: flex;
      font-size:0;
    i{
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: url("../../static/images/icon_bankCard_nocheck.png") no-repeat center;
      background-size: contain;
      margin-right: .2rem;
    }
    .ischeck{
      background: url("../../static/images/icon_bankCard_check.png") no-repeat center;
      background-size: contain;
    }
    span{
      font-size: .4rem;
      color: white;
      line-height: .5rem;
    }
    }
    }
    .backcard:nth-child(2n+1){
      background: url("../assets/images/icon_bank_bg2.png") no-repeat center;
      background-size: cover;
    }
    .nobankcard{
      text-align: center;
      font-size: 0;
      padding-top:1.9rem;
    img{
      width: 4.54rem;
      height: 4.02rem;
      margin-bottom: .5rem;
    }
    .nobankcard_tip{
      font-size: .36rem;
      color: #999999;
      padding-bottom: 1.2rem;
    }
    .add_bankcard{
      width: 4.55rem;
      text-align: center;
      display: inline-block;
      padding: .4rem 0;
      font-size: .48rem;
      color: #ffffff;
      background-color: $main_grren;
      border-radius: .3rem;
    }
    }
    .bankQuery{
      position: relative;
      text-align: center;
      font-size: 0.48rem;
      color:$main_grren;
      margin-top: 1rem;
      img{
        height: 0.3rem;
        width: 0.18rem;
        position: absolute;
        top: 50%;
        margin-top: -0.13rem;
        left: 65%;
      }
    }
    .tips{
      margin: 1rem 0 1rem 1.5rem;
      span{
        color: #999999;
        font-size: 0.36rem;
        display: block;
        padding-top: 0.2rem;
      }
    }
  }

</style>
