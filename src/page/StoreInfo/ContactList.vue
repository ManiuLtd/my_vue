<template>
  <div class="basic">
    <div class="page_bg" v-if="contList.length == 0"></div>
    <top-header title-txt="联系人" father-right="添加" @callBackRightClick="addContact" frouter="/storeInfo"></top-header>
    <p v-if="contList.length == 0" class="empty_list">您还没有联系人，快添加吧~</p>
    <ul class="c_list">
      <li class="c_info" v-for="(msg,index) in contList" @click="checkMegInfo(msg)">
          <p class="c_card" v-text="msg.contactName"></p>
          <p class="c_title">
            <span class="c_name" v-text="msg.contactName"></span>
            <span class="c_tel" v-text="msg.phone"></span>
            <i class="icon_arrow"></i>
          </p>
      </li>
    </ul>
  </div>
</template>

<script>
  import * as API from '../../service/API';
  import Toast from '../../widget/Toast';
  import TopHeader from '../../components/TopHeader'

  export default {
    data(){
      return {
        contList:[]
      }
    },
    methods:{
      addContact(){
        this.$router.push('/contactInfo');
      },
      checkMegInfo(msg){
        sessionStorage.setItem('TMEP_MEG_INFO', JSON.stringify(msg))
        this.$router.push('/contactDetails');
      },
      getContactList(){
        this.$get(API.PARTNER_LINK_MAN).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }
          this.contList = response.data;
        });
      }
    },
    mounted(){
      this.getContactList();
    },
    components: {TopHeader}
  }
</script>

<style lang="scss" scoped>
  @import "../../style/common.scss";
  @import "../../style/public.scss";
  /*  ul */
  .c_list{
    margin-top: 1.61rem;
  }
  /*  li */
  .c_info{
    display: flex;
    padding: .65rem .5rem;
    justify-content: space-between;
    position: relative;
  }
  /*  名片  */
  .c_card{
    display: inline-block;
    width: 1.3rem;
    height: 1.3rem;
    line-height: 1.3rem;
    border-radius: 50%;
    background-color: #4CC3AD;
    color: white;
    text-align: center;
    font-size: .4rem;
  }
  /*  信息盒子p   */
  .c_title{
    height: 1.3rem;
    font-size: 0;
    position: absolute;
    top: .65rem;
    left: 1.95rem;
    right: 0;
    padding-bottom: .65rem;
    border-bottom: 1px solid #F1F1F1;
  }
  /*  姓名  */
  .c_name{
    font-size: .48rem;
    color: $font_100;
  }
  /*  电话  */
  .c_tel{
    position: absolute;
    left: 0;
    bottom: .65rem;
    font-size: .4rem;
    color: #999999;
  }
  .icon_arrow{
    width: .2rem;
    height: .3rem;
    display: inline-block;
    position: absolute;
    background: url('../../assets/images/icon_arrow_gray_right.png') no-repeat center;
    background-size: cover;
    right: .5rem;
    top: 50%;
    margin-top: -.5rem;
  }
  .empty_list{
    display: block;
    color: #757575;
    text-align: center;
    padding: 50% 0;
    font-size: .48rem;
   }

</style>
