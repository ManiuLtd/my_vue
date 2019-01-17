<template>
  <div class="shop_create_content">
    <div class="page_bg"></div>
    <top-header title-txt="基本信息"></top-header>
    <form id="shopMsg" class="content" onsubmit="return false">
      <div class="input_content">
        <ul class="input_box">
          <!--店铺名称-->
          <li class="input_div">
            <label><span class="must">*</span>店铺名称</label>
            <input type="text" maxlength="20" name="partner_name" v-model.trim="formData.partner_name"
                   placeholder="输入店铺名称(20字以内)">
          </li>
          <!--店铺LOGO-->
          <div class="input_img_warp">
            <div class="input_img">
              <label><span class="must">*</span>店铺LOGO</label>
              <!--选择图片-->
              <div class="open_album_box">
                <input class="open_album" id="input_product_logo" type="file"
                       accept="image/x-png, image/jpg, image/jpeg" @change="onProductLogoRead"/>
              </div>
              <input type="hidden" id="headImg" name="headImg" value="">
              <p class="tips">图片上传要求：单张图片小于10M，此处只能添加一张图片</p>
            </div>
            <div class="img_select_box">
              <div class="img_box" v-for="(item,index) in imageData.a">
                <img class="img_delete" src="../assets/images/icon_img_delete.png" @click="deleteLogoImage(index)"/>
                <img class="img_select" :src="item.id ? fileHost+item.pd_url : item.pd_url"/>
              </div>
            </div>
          </div>
          <!--店铺图片-->
          <div class="input_img_warp">
            <div class="input_img">
              <label><span class="must">*</span>店铺图片</label>
              <!--选择图片-->
              <div class="open_album_box">
                <input class="open_album" id="input_product_img" type="file"
                       accept="image/x-png, image/jpg, image/jpeg" @change="onProductOtherRead"/>
              </div>
              <input type="hidden" name="partnerImg[]" value="">
              <p class="tips">图片上传要求：单张图片小于10M此处最多只能添加三张图片。</p>
            </div>
            <div class="img_select_box">
              <div class="img_box" v-for="(item,index) in imageData.g">
                <img class="img_delete" src="../assets/images/icon_img_delete.png" @click="deleteOtherImage(index)"/>
                <img class="img_select" :src="item.id ? fileHost+item.pd_url : item.pd_url"/>
              </div>
            </div>
          </div>
          <!--店铺地址-->
          <li class="input_div">
            <router-link to="/address">
              <label><span class="must">*</span>店铺地址</label>
              <input type="text" v-model.trim="addressInfo.name" placeholder="请选择" readonly="readonly" class="icon_input">
              <i class="icon_arrow"></i>
            </router-link>
          </li>
          <!--店铺位置-->
            <li class="input_div">
              <router-link to="/baiduAddress">
                <label><span class="must">*</span>店铺位置</label>
                <input type="text" v-model.trim="addressInfo.selectAddress" placeholder="请选择" readonly="readonly" class="icon_input">
                <i class="icon_arrow"></i>
              </router-link>
            </li>
          <!--详细地址-->
          <li class="input_div">
            <label><span class="must">*</span>详细地址</label>
            <input type="text" name="detail_address" v-model.trim="formData.detail_address" placeholder="输入详细地址"
                   value="">
          </li>
          <!--商家电话-->
          <li class="input_div">
            <label><span class="must">*</span>客服电话</label>
            <input type="number" name="partner_phone" v-model.trim="formData.partner_phone" placeholder="输入商家电话" value="" :oninput="oninputContent">
          </li>
          <li class="input_div">
            <label><span class="must">*</span>营业状态</label>
            <p :class="{active:true,noActive:formData.is_normal == 1}">
              <radio-button radio_name="businessStatus" radio_val="2" :is-checked="formData.is_normal==2" radio_title="营业"  @radioChange="getPartnerState" :is-disabled="formData.is_normal == 1" style="margin-right: 1rem;"></radio-button>
              <radio-button radio_name="businessStatus" radio_val="3" :is-checked="formData.is_normal==3 || formData.is_normal == 1" radio_title="停业中" @radioChange="getPartnerState" :is-disabled="formData.is_normal == 1"></radio-button>
            </p>
          </li>
          <li class="input_div">
            <label>商家简介</label>
            <div class="dashed_textarea">
              <textarea placeholder="输入商家的详细描述(不超过150个字)" maxlength="150" v-model.trim="formData.partner_intro"></textarea>
            </div>
          </li>
          <li class="input_div">
            <label>商家公告</label>
            <div class="dashed_textarea">
              <textarea placeholder="输入商家的相关公告(不超过50个字)" maxlength="50" v-model.trim="formData.partner_notice"></textarea>
            </div>
          </li>
        </ul>
      </div>
      <p class="must_title"><span class="must">*</span>为必填项</p>
    </form>
    <span :class="bottom_btn_style" @click="uploadImg">保存</span>
    <loading :schedule="uploadSchedule" v-if="isShowLoading"></loading>
  </div>
</template>

<script>
  import TopHeader from '../components/TopHeader'
  import Loading from '../components/Loading'
  import RadioButton from '../components/common/RadioButton.vue'
  import * as API from '../service/API'
  import * as constant from '../utils/constant';
  import Toast from '../widget/Toast'
  import ImageCompress from '../utils/ImageCompress';
  import axios from 'axios';

  export default {
    data() {
      return {
        data: {},
        uploadSchedule:0,
        isShowLoading:false,
        addressInfo:{},
        oninputContent:constant.INPUTTYPE_NUMBER,
        formData: {
          partner_name: "",
          headImg: "",
          partnerImg: [],
          provinces: "",
          city: "",
          area: "",
          partner_lng: "",
          partner_lat: "",
          detail_address: "",
          partner_phone: "",
          partner_intro:"",
          partner_notice:"",
          is_normal:""
        },
        fileHost: '',
        storeAddress: '',
        imageData: {
          a: [],
          g: []
        },
        productLogo: [], // 商品头图
        productLogoExt: [], // 商品头图后缀
        productImages: [], //商品图片
        productImagesExt: [], //商品图片后缀
        responseLogoUrl: [],  //上传成功返回商品logo
        responseImages: [],   //上传返回的其他商品地址
        clientHeight:document.documentElement.clientHeight,
        bottom_btn_style:'btn_fixed'
      }
    },
    computed:{
      logoImageslength() {
        return this.imageData.a ? this.imageData.a.length : 0 ;
      },
      otherImageLength() {
        return this.imageData.g ? this.imageData.g.length : 0 ;
      }
    },
    beforeRouteLeave (to, from, next) {
      if(to.path=='/baiduAddress'){
        if(this.addressInfo.city_name&&this.addressInfo.city_name!=''){
          this.$store.dispatch('saveAddress',this.addressInfo);
          next();
        }else{
          new Toast('请先选择店铺地址').show();
        }
      }else if(to.path=='/shopMsg'){
        // store中的值用完，立即清空
        this.$store.dispatch('clearAddress');
        next();
      }else{
        next();
      }
    },
    activated(){
      this.resizeWindow();
      this.addressInfo = this.$store.state.address.addressInfo;
      this.formData.provinces = this.addressInfo.provinces;
      this.formData.city = this.addressInfo.city;
      this.formData.area = this.addressInfo.area;
      this.formData.partner_lat = this.addressInfo.lat;
      this.formData.partner_lng =this.addressInfo.lng;

      if(this.$store.state.pageRouter.isRefresh){
        this.getData();
      }
      this.$store.dispatch('setIsRefresh',false);
    },
    deactivated(){
      window.onresize = null;
      axios.defaults.showLoading = true; //默认显示loading
    },
    methods: {
      resizeWindow(){
        window.onresize = ()=>{
          if(this.clientHeight>document.documentElement.clientHeight) {
            this.bottom_btn_style = "btn_margin";
          }else{
            this.bottom_btn_style = "btn_fixed";
          }
        }
      },
      uploadProductLogo(index){
        if (this.imageData.a[index].id == 0) {
          this.$postImg(process.env.UPLOAD_IMG_URL, {
            "ext": this.imageData.a[index].ext,
            "content": this.imageData.a[index].pd_url
          }).then((response) => {
            this.imageData.a[index].pd_url = response.result.url;
            this.imageData.a[index].id = -100; //非0即可
            index = index - 1;
            if(index >= 0){
              this.uploadProductLogo(index);
            }else{
              this.uploadProductImages(this.imageData.g.length - 1);
            }
            this.uploadSchedule = (this.logoImageslength - (index + 1)) / (this.logoImageslength + this.otherImageLength) * 100 - 10;
          })
        }else{
          this.uploadProductImages(this.imageData.g.length - 1);
        }
      },
      uploadProductImages(index){
        if (this.imageData.g[index].id == 0) {
          this.$postImg(process.env.UPLOAD_IMG_URL, {
            "ext": this.imageData.g[index].ext,
            "content": this.imageData.g[index].pd_url
          }).then((response) => {
            this.imageData.g[index].pd_url = response.result.url;
            this.imageData.g[index].id = -100; //非0即可
            index = index - 1;
            if(index >= 0){
              this.uploadProductImages(index);
            }else{
              this.submitInfo();
            }
            this.uploadSchedule = (this.otherImageLength + this.logoImageslength - (index + 1)) / (this.logoImageslength + this.otherImageLength) * 100 - 10;
          })
        }else{
          this.submitInfo();
        }
      },
      submitInfo(){
        let tempimageData = JSON.parse(JSON.stringify({a: this.imageData.a, g: this.imageData.g}));
        this.formData.headImg = [];
        this.formData.partnerImg = [];

        this.formData.headImg = tempimageData.a[0].pd_url;
        tempimageData.g.forEach(v => {
          this.formData.partnerImg.push(v.pd_url);
        })
        this.$post(API.SHOP_BASE_INFO, this.formData).then((response) => {
          if (response.code == 200) {
            this.$router.push('/storeManage');
          }else{
            new Toast(response.msg).show();
          }
          this.uploadSchedule = 100;
          this.isShowLoading = false;
        });
      },
      getData() {
        this.$get(API.SHOP_BASE_INFO).then((response) => {
          if (response.code != 200) {
            new Toast(response.msg).show();
            return;
          } else if (response.code == 200) {
            this.data = response.data
            //保存原先的数据store 对象
            let data = {};
            data.city_name = this.data.partner.city_name;
            data.name = this.data.partner.partner_address;
            data.provinces = this.data.partner.province;
            data.city = this.data.partner.city;
            data.area = this.data.partner.county;

            this.$store.dispatch('saveAddress',data);
            this.addressInfo = this.$store.state.address.addressInfo;

            this.formData.partner_name = this.data.partner.partnerName;
            this.formData.provinces = this.data.partner.province;
            this.formData.city = this.data.partner.city;
            this.formData.area = this.data.partner.county;
            this.formData.partner_lng = this.data.partner.partnerLng;
            this.formData.partner_lat = this.data.partner.partnerLat;
            this.formData.detail_address = this.data.partner.partnerDetailAddress;
            this.formData.partner_phone = this.data.partner.partnerPhone;
            this.formData.partner_intro = this.data.partner.partnerIntro;
            this.formData.partner_notice = this.data.partner.partnerNotice;
            this.formData.is_normal = this.data.partner.isNormal;
            if (this.data.partner_daturm.b) {
              this.imageData.a = this.data.partner_daturm.b;
            }
            if (this.data.partner_daturm.c) {
              this.imageData.g = this.data.partner_daturm.c;
            }
          }
        });
      },
      onProductLogoRead() {
        let fileObj = document.getElementById("input_product_logo").files[0]; // js 获取文件对象
        if (fileObj.size / 1024 > 10 * 1024) {
          new Toast('单张图片小于10M').show();
          return;
        }
        let fileName = fileObj.name; //文件名
        let ext_name = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();  //后缀名
        if(ext_name == 'bmp' || ext_name == 'gif'){
          new Toast(`无法上传${ext_name}格式的图片`).show();
          return;
        }
        new ImageCompress(fileObj,constant.NORMAL_PICTURE_SIZE,constant.NORMAL_QUALITY).compress((base64) => {
          // console.log("压缩后：" + base64.length / 1024 + " " + base64);
          if (this.imageData.a.length < 1) {
            this.imageData.a.push({ext: ext_name, pd_url: base64, id: 0});
          } else {
            this.imageData.a.pop()
            this.imageData.a.push({ext: ext_name, pd_url: base64, id: 0});
          }
        });
      },
      onProductOtherRead() {
        let fileObj = document.getElementById("input_product_img").files[0]; // js 获取文件对象
        if (fileObj.size / 1024 > 10 * 1024) {
          new Toast('单张图片小于10M').show();
          return;
        }
        let fileName = fileObj.name; //文件名
        let ext_name = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();  //后缀名
        if(ext_name == 'bmp' || ext_name == 'gif'){
          new Toast(`无法上传${ext_name}格式的图片`).show();
          return;
        }
        new ImageCompress(fileObj,constant.NORMAL_PICTURE_SIZE,constant.NORMAL_QUALITY).compress((base64) => {
          // console.log("压缩后：" + base64.length / 1024 + " " + base64);
          if (this.imageData.g.length < 3) {
            this.imageData.g.push({ext: ext_name, pd_url: base64, id: 0});
          } else {
            new Toast("店铺图片只能添加三张").show();
          }
        });
      },
      // 删除指定图片，position，图片位置
      deleteLogoImage(position) {
        this.imageData.a.splice(position, 1);
      },
      // 删除指定图片，position，图片位置
      deleteOtherImage(position) {
        this.imageData.g.splice(position, 1);
      },
      //图片上传
      uploadImg() {
        if (false == this.verification()) {
          return;
        }
        axios.defaults.showLoading = false; //默认显示loading
        this.uploadSchedule = 0;  // 重置
        this.isShowLoading = true;
        this.uploadProductLogo(this.imageData.a.length - 1);
      },
      verification() {
        if (!this.formData.partner_name) {
          new Toast('请输入店铺名称').show();
          return false;
        }
        if (this.imageData.a.length == 0) {
          new Toast('请添加店铺logo').show();
          return false;
        }
        if (this.imageData.g.length == 0) {
          new Toast('请添加店铺图片').show();
          return false;
        }
        if (!this.formData.provinces) {
          new Toast('请添加店铺地址').show();
          return false;
        }
        if (!this.formData.partner_lat || !this.formData.partner_lng){
          new Toast('请添加店铺位置').show();
          return false;
        }
        if (!this.formData.detail_address) {
          new Toast('请添加详细地址').show();
          return false;
        }
        if (!this.formData.partner_phone) {
          new Toast('请添加商家电话').show();
          return false;
        }
        if (!this.formData.is_normal) {
          new Toast('请选择营业状态').show();
          return false;
        }
      },
      getPartnerState(val){   //  营业状态
        this.formData.is_normal = val;
      },
    },
    mounted() {
      this.fileHost = process.env.ALY_IMG_URL;
    },
    components: {TopHeader,Loading,RadioButton}
  }
</script>

<style lang="scss" scoped>
  @import "../style/createStore.scss";
  .shop_create_content{
    background-color: #eeeeee;
    .content{
      padding-bottom: 3rem;
    }
  }
  .input_box .icon_input {
    right: 1rem;
    width: 60%;
  }

  /** 图片上传*/
  .input_img_warp{
    border-bottom: 1px solid #F1F1F1;
    .input_img {
      display: flex;
      justify-content: space-between;
      background-color: white;
      padding: 0.55rem 0.51rem;
      .label {
      }
      .img_up {
        width: 1.88rem;
        height: 1.88rem;
      }
      .tips {
        width: 40%;
        font-size: 0.32rem;
        color: #cdcdd1;
      }
    }
  }
  .open_album_box {
    display: inline-block;
    position: relative;
    width: 1.88rem;
    height: 1.88rem;
    background-size: cover;
    background-image: url("../assets/images/icon_up_img.png");
    overflow: hidden;
  }

  .open_album {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }


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
    margin-top: -1.25rem;
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: #5FCCC6;
  }

  .dashed_textarea{
    display: flex;
    padding-top: .55rem;
    border-bottom: 1px solid #eeeeee;
    textarea {
      width: 100%;
      font-size: .48rem;
      display: block;
      height: 2.05rem;
      border: 1px dashed #989898;
      padding: .3rem;
    }
  }
  .noActive /deep/ .val{
    color: #666666!important;
  }
</style>
