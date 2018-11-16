<template>
  <div class="basic">
    <top-header title-txt="联系人信息" father-right="添加" @callBackRightClick="addContact"></top-header>
    <ul class="c_list">
          <li class="c_info" v-for="(msg,index) in contList" @click="checkMegInfo(msg)">
              <p class="c_card" v-text="msg.contactName"></p>
              <p class="c_title">
              <span class="c_name" v-text="msg.contactName"></span>
              <span class="c_tel" v-text="msg.phone"></span>
            </p>
               <i class="icon_arrow"></i>
          </li>
        </ul>
  </div>
</template>

<script>

  import * as API from '../../service/API';
  import Toast from '../../widget/Toast';
  import TopHeader from '../../components/TopHeader'
  import Loading from '../../widget/loading/loading'

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
        let loading = new Loading();
        loading.show();
        this.$get(API.PARTNER_LINK_MAN).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }
          this.contList = response.data;
          if(this.contList.length == 0){
            this.$router.push("/contactNothing");
          }

          loading.close();
        }).then((error)=>{
          loading.close();
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
    border-bottom: 1px solid #F1F1F1;
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
    left: 2.1rem;
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
    bottom: 0;
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
    margin-top: -.15rem;
  }
</style>
