<template>
    <div>
      <top-header title-txt="商家备注"></top-header>
      <div class="orderRemark">
        <label>商家备注</label>
        <textarea placeholder="请输入商家备注(5~100字)" v-model="orderRemarks" minlength="5" maxlength="100"></textarea>
      </div>
      <span :class="bottom_btn_style" @click="submitRemarks" >保存</span>
    </div>
</template>
<script>
  import eventBus from  '../utils/eventBus'
  import TopHeader from '../components/TopHeader'
  import Toast from '../widget/Toast';
  import * as API from '../service/API'
  import SuccessLoading from '../widget/sucess_loading/SuccessLoading'

  export default {
    data() {
        return {
          orderRemarks:'',
          clientHeight:document.documentElement.clientHeight,
          bottom_btn_style:'btn_fixed'
        };
    },
    mounted(){
      this.resizeWindow();
    },
    destroyed(){
      window.onresize = null;
    },
    methods:{
      resizeWindow(){
        window.onresize = ()=>{
          if(this.clientHeight>document.documentElement.clientHeight) {
            this.bottom_btn_style = "btn_margin";
          }else{
            this.bottom_btn_style = "btn_fixed";
          }
        }
      },
      submitRemarks(){
        let data = {};
        data.oId = this.$route.params.id;
        data.remark = this.orderRemarks;
        if(this.orderRemarks.length < 5){
          new Toast('不能少于5个字！').show();
          return;
        }else if(this.orderRemarks.length > 100){
          new Toast('不能超过100个字！').show();
          return;
        }else {
          var request_url = API.BASEURL+"/order/remark/"+data.oId+".html";
          this.$post(request_url,data).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg).show();
              return;
            }else if(response.code == 200){
              eventBus.$emit('getRemarks',{oRemarks:this.orderRemarks,IsShow:true});
              new SuccessLoading(response.msg).show();
            }
          }).then((error)=>{
          });
          this.$router.go(-1);
        }
      }
    },
    components:{TopHeader}
  }
</script>
<style scoped>
  .orderRemark{
    margin-top: 1.61rem;
    padding: .5rem .6rem;
    display: flex;
    align-content: flex-start;
  }
  .orderRemark label{
    font-size: .4rem;
    color: #686868;
    margin-right: .4rem;
    font-weight: 600;
  }
  .orderRemark textarea::-webkit-input-placeholder {
    color: #cdcdd1;
    font-size: .4rem;
  }
  .orderRemark textarea{
    min-height: 8rem;
    width: 75%;
    font-size: .4rem;
    color: #686868;
    margin-top: .01rem;
  }

  /*提交按钮*/
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
    margin-top: 2.56rem;
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: #5FCCC6;
  }
</style>
