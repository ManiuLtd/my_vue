<template>
  <div class="active_box">
    <div class="page_bg"></div>
    <top-header title-txt="满减活动" father-right="添加" @callBackRightClick="addActive"></top-header>
    <p v-if="formData.length == 0" class="active_empty_list">您还没有满减活动，快添加吧~</p>
    <ul class="active_list">
      <li class="a_info" v-for="(msg,index) in formData" @click="checkMegInfo(msg)">
        <p class="active_title">
          <span class="active_label">活动 {{index+1}}</span>
          <span class="active_cont">满<span v-text="msg.pcBuyUp"></span>减<span v-text="msg.pcBuyUpSubtraction"></span></span>
          <span class="active_cont active_status" v-if="msg.isAble == 1">使用中</span>
          <span class="active_cont active_status" v-if="msg.isAble == 2">已停用</span>
        </p>
        <p class="active_time"><span v-text="msg.pcStartTime"></span> — <span v-text="msg.pcEndTime"></span></p>
        <p class="active_img" @click.stop>
          <img src="../assets/images/icon_active_edit.png" alt="" @click="editActive(msg)" @click.stop>
          <!--<img src="../assets/images/icon_active_del.png" alt="" @click="delActive(index,msg.pcId)">-->
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
  import * as API from '../service/API';
  import Toast from '../widget/Toast';
  import TopHeader from '../components/TopHeader'
  import { Dialog } from 'vant'
  import SuccessLoading from '../widget/sucess_loading/SuccessLoading'

  export default {
    data(){
      return {
        data:{},
        formData:{}
      }
    },
    methods:{
      addActive(){
        if(this.formData.length>=10){
          new Toast('最多添加10个满减活动').show();
          return;
        }else {
          this.$router.push('/shopActive');
        }
      },
      checkMegInfo(msg){
//        sessionStorage.setItem('TMEP_MEG_INFO', JSON.stringify(msg));
//        this.$router.push('/shopActive');
        sessionStorage.setItem('SHOP_ACTIVE_INFO', JSON.stringify(msg));
        this.$router.push('/shopActiveEdit');
      },
      getContactList(){
        this.$get(API.SHOP_COUPON_INFO).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else if(response.code == 200){
            this.data = response.data;
            this.formData = this.data.coupons;
          }
        })
      },
      //  删除活动
      delActive(key,id){
        Dialog.confirm({
          title: '确定删除该活动吗？'
        }).then(() => {
          let data = {};
          data.id = id;

          this.$post(API.DEL_SHOP_COUPON_INFO,data).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg).show();
              return;
            }else if(response.code == 200){
              this.formData.splice(key,1);
              new SuccessLoading(response.msg).show();
            }
          })
        }).catch(() => {
          // on cancel
        });
      },
      // 编辑活动
      editActive(msg){
        sessionStorage.setItem('SHOP_ACTIVE_INFO', JSON.stringify(msg));
        this.$router.push('/shopActiveEdit');
      }

    },
    mounted(){
      this.getContactList();
    },
    components: {TopHeader}
  }
</script>
<style lang="scss" scoped>
  @import "../style/common.scss";
  @import "../style/public.scss";
  .active_box{
    background-color: #eeeeee;
  }
  /*  ul */
  .active_list{
    padding-top: 1.61rem;
    overflow: hidden;
  }
  /* li */
  .active_list .a_info{
    position: relative;
    padding: .5rem .3rem;
    margin: .28rem;
    background-color: white;
    border-radius: 5px;
    font-size: 0;
  }
  /*  活动标签 */
  .active_title{
    display: flex;
    align-items: center;
  }
  .active_label{
    width: auto;
    padding: .1rem;
    display: inline-block;
    font-size: .36rem;
    border-radius: 5px;
    color: white;
    font-weight: 600;
    background-color: #4cc3ad;
    white-space:nowrap
  }
  /*  活动内容 */
  .active_cont{
    display: inline-block;
    font-size: .48rem;
    line-height: .62rem;
    color: $font_100;
    padding-left: .3rem;
  }
  /*  活动状态 */
  .active_status{
    flex: 1;
    text-align: right;
    padding-right: 1.5rem;
  }
  /*  活动时间 */
  .active_time{
    font-size: .4rem;
    color: #999999;
    padding-top: .28rem;
  }
  /*  活动操作图片 */
  .active_img{
    position: absolute;
    top: 50%;
    margin-top: -.36rem;
    right: .3rem;
  }
  .active_img img{
    width: .71rem;
    height: .71rem;
    margin-right: .28rem;
  }
  /*.active_img img:nth-child(2){*/
    /*margin-left: .28rem;*/
  /*}*/
  .active_empty_list{
    display: block;
    color: #757575;
    text-align: center;
    padding: 50% 0;
    font-size: .48rem;
  }
</style>
