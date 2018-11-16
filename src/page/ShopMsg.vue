<template>
  <div class="shop_create_content">
    <top-header title-txt="基本信息" father-right="编辑" @callBackRightClick="editMsg"></top-header>
    <form id="shopMsg" class="content" onsubmit="return false">
      <div class="input_content">
        <ul class="input_box">
          <li class="input_div">
            <label><span class="must"></span>店铺名称</label>
            <input readonly="readonly" type="text" name="partner_name" v-model.trim="formData.partner_name">
          </li>
          <li class="input_div input_img">
            <label><span class="must"></span>店铺LOGO</label>
            <p class="image_warp"><img :src="fileHost+LogoImage" alt=""></p>
          </li>
          <li class="input_div input_img">
            <label><span class="must"></span>店铺图片</label>
            <p class="image_warp" v-for="(item,index) in shopImage"><img :src="fileHost+item.pd_url" alt=""></p>
          </li>
          <li class="input_div">
            <label><span class="must"></span>店铺地址</label>
            <input type="text" v-model.trim="address" readonly="readonly">
          </li>

          <li class="input_div">
            <label><span class="must"></span>详细地址</label>
            <input readonly="readonly" type="text" name="detail_address" v-model.trim="formData.detail_address">
          </li>
          <li class="input_div">
            <label><span class="must"></span>商家电话</label>
            <input readonly="readonly" type="text" name="partner_phone" v-model.trim="formData.partner_phone">
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>
<script>
  import TopHeader from '../components/TopHeader'
  import * as API from '../service/API'
  import eventBus from  '../utils/eventBus'
  import Loading from '../widget/loading/loading'

  export default {
      data(){
          return {
            data:{},
            address:'',
            fileHost:'',
            formData:{
              partner_name: "",
              headImg: "",
              partnerImg: "",
              provinces: "",
              city: "",
              area:"",
              partner_lng:"",
              partner_lat:"",
              detail_address:"",
              partner_phone:"",
            },
            LogoImage:'',     //  店铺Logo图片存放处
            shopImage:[],     //  店铺图片存放处
          }
      },
      methods: {
        editMsg(){
          this.$router.push('/shopMsgEdit');
        },
        submit: function () {
          let loading = new Loading();
          loading.show();
            this.$post(API.SHOP_BASE_INFO,this.formData).then((response)=>{
                if(response.code != 200){
                    new Toast(response.msg).show();
                    return;
                }else if(response.code == 200){
                    this.data = response.data
                }
              loading.close();
            }).then((error)=>{
              loading.close();
            });
        },
        getAddressData(data){
          console.log(data);
          this.address = data.name;
            this.formData.provinces = data.provinces;
            this.formData.city = data.city;
            this.formData.area = data.area;
            console.log(data)
        },
        getDate(){
          let loading = new Loading();
          loading.show();
            this.$get(API.SHOP_BASE_INFO).then((response)=>{
                if(response.code != 200){
                    new Toast(response.msg).show();
                    return;
                }else if(response.code == 200){
                  this.data = response.data;
                  this.formData.provinces = this.data.partner.province;
                  this.formData.city = this.data.partner.city;
                  this.formData.area = this.data.partner.county;
                  this.formData.partner_lng = this.data.partner.partnerLng;
                  this.formData.partner_lat = this.data.partner.partnerLat;
                  this.formData.detail_address = this.data.partner.partnerDetailAddress;
                  this.address = this.data.partner.partner_address;
                  this.formData.partner_phone = this.data.partner.partnerPhone;
                  this.formData.partner_name = this.data.partner.partnerName;
                  this.LogoImage = this.data.partner_daturm.b[0].pd_url;

                  if(this.data.partner_daturm.c){
                    this.shopImage = this.data.partner_daturm.c;
                  }
                  console.log(this.data);
                  console.log(this.shopImage);
                  console.log(this.LogoImage);
                }
              loading.close();
            }).then((error)=>{
              loading.close();
            });
        }
      },
    mounted () {
      var screenHeigt = window.screen.availHeight;
      var topHeight = document.getElementsByClassName('common_header')[0].offsetHeight;
      document.getElementsByClassName('shop_create_content')[0].style.minHeight=screenHeigt-topHeight+'px';
      document.getElementsByClassName('shop_create_content')[0].style.backgroundColor='#eee';
      this.fileHost = process.env.ALY_IMG_URL;
      this.getDate();
      eventBus.$on('getAddress',this.getAddressData);
    },
    components:{TopHeader}
  };
</script>
<style lang="scss" scoped>
 @import "../style/createStore.scss";
 .input_box .icon_input{
   right: 1rem;
   width: 60%;
 }
  .input_img{
    justify-content: baseline;
  }
  .input_img label{
    width: 35%;
  }
  .image_warp{
    width: 1.86rem;
    height: 1.86rem;
    margin-right: .3rem;
  }
  .input_img .image_warp:last-child{
    margin-right: 0;
  }
  .image_warp img{
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
</style>
