<template>
  <div class="active_box">
    <top-header title-txt="满减活动" father-right="添加" @callBackRightClick="addActive"></top-header>
    <ul class="active_list">
      <li class="a_info" v-for="(msg,index) in formData" @click="checkMegInfo(msg)">
        <p class="active_title">
          <span class="active_label">活动 {{index+1}}</span>
          <span class="active_cont">满<span v-text="msg.pcBuyUp"></span>减<span v-text="msg.pcBuyUpSubtraction"></span></span>
        </p>
        <p class="active_time"><span v-text="msg.pcStartTime"></span> — <span v-text="msg.pcEndTime"></span></p>
        <p class="active_img" @click.stop>
          <img src="../assets/images/icon_active_del.png" alt="" @click="delActive(index,msg.pcId)">
          <img src="../assets/images/icon_active_edit.png" alt="" @click="editActive(msg)">
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
  import * as API from '../service/API';
  import Toast from '../widget/Toast';
  import TopHeader from '../components/TopHeader'
  import Loading from '../widget/loading/loading'
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
        this.$router.push('/shopActive');
      },
      checkMegInfo(msg){
        console.log(this.mag);
//        sessionStorage.setItem('TMEP_MEG_INFO', JSON.stringify(msg));
//        this.$router.push('/shopActive');
      },
      getContactList(){
        let loading = new Loading();
        loading.show();
        this.$get(API.SHOP_COUPON_INFO).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else if(response.code == 200){
            this.data = response.data;
            this.formData = this.data.coupons;
          }
          loading.close();
        }).then((error)=>{
          loading.close();
        });
      },
      //  删除活动
      delActive(key,id){
        Dialog.confirm({
          title: '确定删除该活动吗？'
        }).then(() => {
          this.formData.splice(key,1);
          this.preserve();
        }).catch(() => {
          // on cancel
        });
      },
      // 编辑活动
      editActive(msg){
        sessionStorage.setItem('SHOP_ACTIVE_INFO', JSON.stringify(msg));
        this.$router.push('/shopActiveEdit');
      },
      // 删除数据
      preserve(){
        let data = {};
        data.ids = [];
        data.start_time = [];
        data.end_time = [];
        data.buy_up = [];
        data.buy_up_subtraction = [];

        for (var index in this.formData){
          for (var key in this.formData[index]){
            if(key == 'pcId'){
              data.ids.push(this.formData[index][key])
            }else if(key == 'pcStartTime'){
              data.start_time.push(this.formData[index][key])
            }else if(key == 'pcEndTime'){
              data.end_time.push(this.formData[index][key])
            }else if(key == 'pcBuyUp'){
              data.buy_up.push(this.formData[index][key])
            }else if(key == 'pcBuyUpSubtraction'){
              data.buy_up_subtraction.push(this.formData[index][key])
            }
          }
        }
        this.$post(API.SHOP_COUPON_INFO,data).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else if(response.code == 200){
            this.data = response.data;
            new SuccessLoading("操作成功！").show();
          }
        })
      }
    },
    mounted(){
      let screenHeigt = window.screen.availHeight;
      let topHeight = document.getElementsByClassName('common_header')[0].offsetHeight;
      document.getElementsByClassName('active_box')[0].style.minHeight = screenHeigt - topHeight + 'px';
      document.getElementsByClassName('active_box')[0].style.backgroundColor = '#eee';
      this.getContactList();
    },
    components: {TopHeader}
  }
</script>
<style lang="scss" scoped>
  @import "../style/common.scss";
  @import "../style/public.scss";
  /*  ul */
  .active_list{
    margin-top: 1.61rem;
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
    width: 1.3rem;
    padding: .1rem 0;
    display: inline-block;
    font-size: .36rem;
    text-align: center;
    border-radius: 5px;
    color: white;
    font-weight: 600;
    background-color: #4cc3ad;
  }
  /*  活动内容 */
  .active_cont{
    display: inline-block;
    font-size: .48rem;
    line-height: .62rem;
    color: $font_100;
    padding-left: .3rem;
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
    margin-top: -.27rem;
    right: .3rem;
  }
  .active_img img{
    width: .54rem;
    height: .54rem;
  }
  .active_img img:nth-child(2){
    margin-left: .28rem;
  }
</style>
