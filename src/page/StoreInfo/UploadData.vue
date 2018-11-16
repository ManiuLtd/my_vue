<template>
  <div class="shop_create_content">
    <top-header title-txt="上传资料" father-right="编辑" @callBackRightClick="backUpload"></top-header>
      <div class="input_content">
        <ul class="input_box">
          <li class="input_img">
            <label><span class="must">*</span>证件资料</label>
            <div class="img_warp">
              <img v-for="item in formData.a" :src="fileHost+item.pd_url" alt="">
            </div>
          </li>
          <li class="input_img">
            <label>其他资料</label>
            <div class="img_warp">
	            <img v-for="item in formData.g" :src="fileHost+item.pd_url" alt="">
            </div>
          </li>
        </ul>
      </div>
      <p class="must_title"><span class="must">*</span>为必填项，请确保照片资料真实有效。</p>
  </div>
</template>
<script>
  import TopHeader from '../../components/TopHeader'
  import * as API from '../../service/API';
  import Toast from '../../widget/Toast'
  import LocalStorageUtils from '../../utils/LocalStorageUtils';
  import Loading from '../../widget/loading/loading'

  export default {
	data(){
	  return {
		fileHost:'',
		formData:{
		  a:[],
		  g:[],
		}
	  }
	},
	created: function(){
    let loading = new Loading();
    loading.show();
	  this.$get(API.PARTNER_DATURM_INFO).then((response)=>{
        if(response.code != 200){
          new Toast(response.msg).show();
          return;
        }else if(response.code == 200){
          if(response.data.g){
            this.formData.g = response.data.g;
          }
          if(response.data.a){
            this.formData.a = response.data.a;
          }
          console.log(this.formData)
        }
      loading.close();
	  }).then((error)=>{
      loading.close();
    });
	},
	methods: {
	  backUpload(){
        this.$router.push('/uploadDataEdit');
	  },
	  submit: function () {
      let loading = new Loading();
      loading.show();
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
          loading.close();
        }).then((error)=>{
          loading.close();
        });
	  }
	},
    mounted() {
      let screenHeigt = window.screen.availHeight;
      let topHeight = document.getElementsByClassName('common_header')[0].offsetHeight;
      document.getElementsByClassName('shop_create_content')[0].style.minHeight = screenHeigt - topHeight + 'px';
      document.getElementsByClassName('shop_create_content')[0].style.backgroundColor = '#eee';
      this.fileHost = process.env.ALY_IMG_URL;
    },
    components: {TopHeader}
  };
</script>
<style lang="scss" scoped>
  @import "../../style/common.scss";
  @import "../../style/public.scss";
  .shop_create_content{
    margin-top: 1.62rem;
    background-color: #eee;
  }

  /*  必填提示  */
  .must_title{
    font-size: .36rem;
    color: #989898;
    padding: .1rem .45rem 2rem;
  }
  .must{
    margin-right: .2rem;
    vertical-align: -webkit-baseline-middle;
  }
  /*  隐藏的信息盒子  */
  .input_content{
    margin-bottom: .2rem;
  }

  /** 图片上传*/
  .input_img{
    display: flex;
    background-color: white;
    border-bottom: 1px solid #eeeeee;
    padding: 0.55rem 0.51rem;
  }
  .input_img label{
    width: 30%;
  }
  /*资料显示的地方*/
  .img_warp img{
    width: 1.9rem;
    height: 1.9rem;
    margin-right: .3rem;
  }
</style>

