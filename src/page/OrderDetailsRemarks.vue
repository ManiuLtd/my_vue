<template>
    <div>
      <top-header title-txt="商家备注"></top-header>
      <div class="orderRemark">
        <label>商家备注</label>
        <textarea placeholder="请输入商家备注" v-model="orderRemarks"></textarea>
      </div>
      <span class="preserve_btn" @click="submitRemarks">保存</span>
    </div>
</template>
<script>
  import eventBus from  '../utils/eventBus'
  import TopHeader from '../components/TopHeader'
  import Toast from '../widget/Toast';
  import * as API from '../service/API'
  import Loading from '../widget/loading/loading'

  export default {
    data() {
        return {
          orderRemarks:'',
        };
    },
    mounted(){

    },
    methods:{
      submitRemarks(){
        let loading = new Loading();
        loading.show();
        let data = {};
        data.oId = this.$route.params.id;
        data.remark = this.orderRemarks;

        var request_url = API.BASEURL+"/order/remark/"+data.oId+".html";
        this.$post(request_url,data).then((response)=>{
          if(response.code == 500){
            new Toast(response.msg).show();
            return;
          }else if(response.code == 200){
            eventBus.$emit('getRemarks',{oRemarks:this.orderRemarks,IsShow:true});
            new Toast(response.msg).show();
          }
          loading.close();
        }).then((error)=>{
          loading.close();
        })

        this.$router.go(-1);
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
  }
  .orderRemark textarea::-webkit-input-placeholder {
    color: #cdcdd1;
    font-size: .4rem;
  }
  .orderRemark textarea{
    width: 75%;
    font-size: .4rem;
    color: #686868;
  }
</style>
