<template>
  <div>
    <top-header title-txt="创建店铺"></top-header>
    <!--商户绑卡-->
    <div class="add_card">
      <!--title-->
      <div class="card_title">
        <div id="title_left">
          <img src="../assets/images/icon_line.png">
          <span>商户信息</span>
        </div>
        <div id="title_right">
          <span class="must">*</span>
          <span>为必填项</span>
        </div>
      </div>
      <!--item-->
      <div class="store_name_box">
        <span class="tips">商户姓名</span>
        <span class="store_name" v-text="storeInfo.truename"></span>
      </div>
      <div class="id_num_box">
        <span class="tips">身份证号</span>
        <span class="id_num" v-text="storeInfo.identno"></span>
      </div>
     <!-- <div class="bank_card_box">
        <div class="bank_card_left">
          <span class="must">*</span>
          <span class="tips">银行卡号</span>
        </div>
        <input type="number" class="id_num" placeholder="请输入银行卡号" @blur="getBankCardInfo" v-model.trim="bankcardNum"/>
      </div>
      <div class="bank_card_box bank_card_name">
        <div class="bank_card_left">
          <span class="must">*</span>
          <span class="tips">开户行</span>
        </div>
        <span type="text" class="bank_name" v-text="bankCardName"></span>
      </div>-->
    </div>
    <!--基本信息-->
    <div class="info">
      <!--title-->
      <div class="info_title">
        <div id="info_left">
          <img src="../assets/images/icon_line.png">
          <span>基本信息</span>
        </div>
      </div>
      <div class="store_name_box">
        <div class="store_name_left">
          <span class="must">*</span>
          <span class="tips">店铺名称</span>
        </div>
        <input type="text" class="store_name" maxlength="20" placeholder="输入(20字以内)店铺名" v-model.trim="storeName"/>
      </div>
      <!--店铺logo-->
      <div class="div_logo_box">
        <div class="store_logo_box">
          <div class="store_logo_left">
            <span class="must">*</span>
            <span class="tips">店铺LOGO</span>
          </div>
          <div class="img_up" style="margin-left: .6rem;">
            <div class="open_album_box">
              <input class="open_album" id="input_product_logo" type="file"
                     accept="image/x-png, image/jpg, image/jpeg" @change="onProductLogoRead"/>
            </div>
          </div>
          <span class="img_tips">图片上传要求：单张图片小于10M，此处只能添加一张图片。</span>
        </div>
        <div class="img_select_box">
          <div class="img_box" v-for="(info,index) in logoUploadImages">
            <img class="img_delete" src="../assets/images/icon_img_delete.png" @click="deleteShopImage(index)"/>
            <img class="img_select" :src="info.id == 0 ? info.pd_url : `${fileHost}${info.pd_url}`"/>
          </div>
        </div>
      </div>
      <!--店铺图片-->
      <div class="div_logo_box">
        <div class="store_logo_box store_imgs_box">
          <div class="store_logo_left">
            <span class="must">*</span>
            <span class="tips">店铺图片</span>
          </div>
          <div class="img_up" style="margin-left: 0.9rem;">
            <div class="open_album_box">
              <input class="open_album" id="input_product" type="file"
                     accept="image/x-png, image/jpg, image/jpeg" @change="onProductRead"/>
            </div>
          </div>
          <span class="img_tips">图片上传要求：单张图片小于10M，此处最多只能添加三张图片。</span>
        </div>
        <div class="img_select_box">
          <div class="img_box" v-for="(info,index) in shopUploadImages">
            <img class="img_delete" src="../assets/images/icon_img_delete.png" @click="deleteOtherImage(index)"/>
            <img class="img_select" :src="info.id == 0 ? info.pd_url : `${fileHost}${info.pd_url}`"/>
          </div>
        </div>
      </div>
      <!--店铺地址-->
      <router-link to="/address">
        <div class="address_box">
          <div class="address_left">
            <span class="must">*</span>
            <span class="tips">店铺地址</span>
          </div>
          <div class="home_address_box">
            <span class="home_address" v-text="addressInfo.name" style="color: #1a1b39"></span>
            <img src="../assets/images/icon_arrow_right.png" />
          </div>
        </div>
      </router-link>
      <!--店铺位置-->
      <router-link to="/baiduAddress">
        <div class="address_box">
          <div class="address_left">
            <span class="must">*</span>
            <span class="tips">店铺位置</span>
          </div>
          <div class="home_address_box">
            <span class="home_address" style="color: #1a1b39">{{addressInfo.selectAddress}}</span>
            <img src="../assets/images/icon_arrow_right.png" />
          </div>
        </div>
      </router-link>
      <!--详细地址-->
      <div class="detail_address">
        <div class="bank_card_left">
          <span class="must">*</span>
          <span class="tips">详细地址</span>
        </div>
        <input type="text" class="id_num" placeholder="输入详细地址" v-model.trim="detailsAddress"/>
      </div>
      <!--商家电话-->
      <div class="store_phone">
        <div class="bank_card_left">
          <span class="must">*</span>
          <span class="tips">商家电话</span>
        </div>
        <input type="number" class="id_num" placeholder="输入商家电话" v-model.trim="phoneNum"/>
      </div>
    </div>
    <!--协议部分-->
    <div class="protocol">
      <p class="agreement">
      <van-checkbox v-model.trim="checked">
        <img id="img_chk" slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.normal"/>
      </van-checkbox>
      我已经阅读并同意
      <router-link to="/storeService">
        <span class="protocol_agreement_span">《开店服务协议》</span>
      </router-link>
    </p>
    </div>
    <span :class="bottom_btn_style" @click="uploadImages">保存</span>
    <loading :schedule="uploadSchedule" v-if="isShowLoading"></loading>
  </div>
</template>

<script>

  import * as API from '../service/API';
  import Toast from '../widget/Toast';
  import TopHeader from '../components/TopHeader'
  import ImageCompress from '../utils/ImageCompress';
  import * as constant from '../utils/constant';
  import axios from 'axios';
  import Loading from '../components/Loading'

  export default {
    data() {
      return {
        storeInfo: {},
        checked: true,
        username: '', //商户姓名
        idNum: '', //身份证号
        bankCardName: '', //银行卡名称
        bankCode: '', //银行卡名称
        bankcardNum: '', //银行卡号
        storeName: '', //店铺名称
        fileHost: '',
        uploadSchedule:0,
        isShowLoading:false,
        logoUploadImages: [], // 个人资料上传图片返回的路径
        shopUploadImages: [], // 其他资料上传图片返回的路径
        detailsAddress: '', //详细地址
        phoneNum: '', //商家电话
        addressInfo:{},
        icon: {
          normal: '../../static/images/nocheck_out.png',
          active: '../../static/images/check_out.png'
        },
        clientHeight:document.documentElement.clientHeight,
        bottom_btn_style:'btn_fixed'
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
      }else if(to.path == '/storeService'){
        this.$store.dispatch('saveAddress',this.addressInfo);
        next();
      }else{
        next();
      }
    },
    computed:{
      logoImageslength() {
        return this.logoUploadImages ? this.logoUploadImages.length : 0 ;
      },
      otherImageLength() {
        return this.shopUploadImages ? this.shopUploadImages.length : 0 ;
      },
    },
    activated(){
      this.resizeWindow();
      this.addressInfo = this.$store.state.address.addressInfo;
      // store中的值用完，立即清空
      this.$store.dispatch('clearAddress');
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
      getStoreInfo() {
        this.$get(API.PARTNER_INFO).then((response) => {
          if (response.code != 200) {
            new Toast(response.msg);
            return;
          }
          this.storeInfo = response.data;
        });
      },
      verification() {
        if (!this.checked) {
          new Toast("请先同意服务协议").show();
          return false;
        }
        if (!this.storeName) {
          new Toast("请输入店铺名称").show();
          return false;
        }
        if (!this.addressInfo) {
          new Toast("请输入店铺地址").show();
          return false;
        }
        if (!this.detailsAddress) {
          new Toast("请输入详细地址").show();
          return false;
        }
        if (!this.phoneNum) {
          new Toast("请输入商家电话").show();
          return false;
        }
        if (this.logoUploadImages.length == 0) {
          new Toast("请添加店铺logo").show();
          return false;
        }
        if (this.shopUploadImages.length == 0) {
          new Toast("请上传店铺图片").show();
          return false;
        }
        return true;
      },
      //上传店铺LOGO
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
//             console.log("压缩后：" + base64.length / 1024 + " " + base64);
          if (this.logoUploadImages.length < 1) {
            this.logoUploadImages.push({ext: ext_name, pd_url: base64, id: 0});
          } else {
            this.logoUploadImages.pop()
            this.logoUploadImages.push({ext: ext_name, pd_url: base64, id: 0});
          }
        });
      },
      // 上传店铺图片
      onProductRead() {
        let fileObj = document.getElementById("input_product").files[0]; // js 获取文件对象
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
//             console.log("压缩后：" + base64.length / 1024 + " " + base64);
          if (this.shopUploadImages.length < 3) {
            this.shopUploadImages.push({ext: ext_name, pd_url: base64, id: 0});
          } else {
            this.shopUploadImages.pop()
            this.shopUploadImages.push({ext: ext_name, pd_url: base64, id: 0});
          }
        });
      },
      // 删除指定图片，position，图片位置
      deleteShopImage(position) {
        this.logoUploadImages.splice(position, 1);
      },
      // 删除指定图片，position，图片位置
      deleteOtherImage(position) {
        this.shopUploadImages.splice(position, 1);
      },

      uploadProductLogo(index){
        if (this.logoUploadImages[index].id == 0) {
          this.$postImg(process.env.UPLOAD_IMG_URL, {
            "ext": this.logoUploadImages[index].ext,
            "content": this.logoUploadImages[index].pd_url
          }).then((response) => {
            this.logoUploadImages[index].pd_url = response.result.url;
            this.logoUploadImages[index].id = -100; //非0即可
            index = index - 1;
            if(index >= 0){
              this.uploadProductLogo(index);
            }else{
              this.uploadProductImages(this.shopUploadImages.length - 1);
            }
            this.uploadSchedule = (this.logoImageslength - (index + 1)) / (this.logoImageslength + this.otherImageLength) * 100 - 10;
          })
        }else{
          this.uploadProductImages(this.shopUploadImages.length - 1);
        }
      },
      uploadProductImages(index){
        if (this.shopUploadImages[index].id == 0) {
          this.$postImg(process.env.UPLOAD_IMG_URL, {
            "ext": this.shopUploadImages[index].ext,
            "content": this.shopUploadImages[index].pd_url
          }).then((response) => {
            this.shopUploadImages[index].pd_url = response.result.url;
            this.shopUploadImages[index].id = -100; //非0即可
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
        var imageInfo = JSON.parse(JSON.stringify({logo: this.logoUploadImages, shop: this.shopUploadImages}));
        let data = {};
        data.partner_name = this.storeName;
        data.bank_code = this.bankCode;
        data.is_agree = this.checked == true ? 'on' : 'off';  //是否同意合同
        data.provinces = this.addressInfo.provinces;   //省份
        data.city = this.addressInfo.city;         //城市
        data.area = this.addressInfo.area;         //区县
        data.detail_address = this.detailsAddress;
        data.partner_phone = this.phoneNum;
        data.partner_lng = this.addressInfo.lng;  //经度
        data.partner_lat = this.addressInfo.lat;  //纬度
        data.headImg = imageInfo.logo[0].pd_url;
        data.partnerImg = [];

        imageInfo.shop.forEach(v => {
          data.partnerImg.push(v.pd_url);
        })
        this.$post(API.SHOP_SETUP, data).then((response) => {
          this.uploadSchedule = 100;
          this.isShowLoading = false;
          if (response.code != 200) {
            new Toast(response.msg).show();
            return;
          } else {
            new Toast(response.msg).show();
          }
          this.$router.replace('/addShopSuccess');
        }).then((error) => {
          new Toast(response.msg).show();
        });
      },
      uploadImages() {
        if (false == this.verification()) {
          return;
        }
        axios.defaults.showLoading = false; //默认显示loading
        this.uploadSchedule = 0;  // 重置
        this.isShowLoading = true;
        this.uploadProductLogo(this.logoUploadImages.length - 1);
      },
     /* // 通过卡号获取开户行
      getBankCardInfo() {
        this.$post(API.BANK_INFO, {'bank_no': this.bankcardNum}).then((response) => {
          if (response.code != 200) {
            new Toast(response.msg).show();
          }
          this.bankCardName = response.data.CardName;
          this.bankCode = response.data.BranchBankCode;
        });
      }*/
    },
    mounted() {
      this.getStoreInfo();
      this.fileHost = process.env.ALY_IMG_URL;
    },
    components: {TopHeader,Loading}
  }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  /*商户绑卡*/
  .add_card {
    margin-top: 1.61rem;
    .card_title {
      background-color: #eeeeee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.46rem;
      padding-right: 0.46rem;
      height: 0.98rem;
      #title_left {
        display: flex;
        justify-content: center;
        img {
          padding-top: 0.08rem;
          width: 0.1rem;
          height: 0.4rem;
        }
        span {
          padding-left: 0.1rem;
          color: #666666;
          font-size: 0.4rem;
        }
      }
      #title_right {
        display: flex;
        justify-content: center;
        span {
          color: #989898;
          font-size: 0.36rem;
        }
        .must {
          padding-top: 0.1rem;
          padding-right: 0.1rem;
          color: #e36348;
          font-size: 0.47rem;
        }
      }
    }
    .store_name_box {
      display: flex;
      justify-content: space-between;
      height: 1.74rem;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      .tips {
        padding-left: 0.51rem;
        font-size: 0.48rem;
        color: #1a1b39;
      }
      .store_name {
        padding-right: 0.51rem;
        font-size: 0.48rem;
        color: #666666;
      }
    }
    .id_num_box {
      display: flex;
      justify-content: space-between;
      height: 1.74rem;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      .tips {
        padding-left: 0.51rem;
        font-size: 0.48rem;
        color: #1a1b39;
      }
      .id_num {
        padding-right: 0.51rem;
        font-size: 0.48rem;
        color: #666666;
      }
    }
    .bank_card_box {
      display: flex;
      justify-content: space-between;
      height: 1.74rem;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      .bank_card_left {
        display: flex;
        justify-content: center;
        padding-left: 0.51rem;
        .must {
          padding-top: 0.1rem;
          padding-right: 0.1rem;
        }
        .tips {
          font-size: 0.48rem;
          color: #1a1b39;
        }
      }
      .id_num {
        font-size: 0.48rem;
        text-align: right;
        padding-right: 0.51rem;
      }
    }
    .bank_card_name {
      .bank_name {
        display: inline-block;
        color: #666666;
        font-size: 0.48rem;
        padding-right: 0.51rem;
      }
    }

  }

  /*基本信息*/
  .info {
    .info_title {
      background-color: #eeeeee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.46rem;
      padding-right: 0.46rem;
      height: 0.98rem;
      #info_left {
        display: flex;
        justify-content: center;
        img {
          padding-top: 0.08rem;
          width: 0.1rem;
          height: 0.4rem;
        }
        span {
          padding-left: 0.1rem;
          color: #666666;
          font-size: 0.4rem;
        }
      }
      #info_right {
        display: flex;
        justify-content: center;
        span {
          color: #989898;
          font-size: 0.36rem;
        }
        .must {
          padding-top: 0.1rem;
          padding-right: 0.1rem;
          color: #e36348;
          font-size: 0.47rem;
        }
      }
    }
    .store_name_box {
      display: flex;
      justify-content: space-between;
      height: 1.74rem;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      .store_name_left {
        display: flex;
        justify-content: center;
        padding-left: 0.51rem;
        .must {
          padding-top: 0.1rem;
          padding-right: 0.1rem;
        }
        .tips {
          font-size: 0.48rem;
          color: #1a1b39;
        }
      }
      .store_name {
        font-size: 0.48rem;
        text-align: right;
        padding-right: 0.51rem;
      }
    }
  .div_logo_box{
    border-bottom: 1px solid #eeeeee;
    .store_logo_box {
      padding-top: 0.51rem;
      padding-bottom: 0.46rem;
      display: flex;
      .store_logo_left {
        display: flex;
        justify-content: center;
        padding-left: 0.51rem;
        .must {
          padding-top: 0.1rem;
          padding-right: 0.1rem;
        }
        .tips {
          white-space: nowrap;
          font-size: 0.48rem;
          color: #1a1b39;
        }
      }
      .img_up {
        width: 1.88rem;
        height: 1.88rem;
      }
      .img_tips {
        padding-right: 0.51rem;
        padding-left: 0.45rem;
        color: #cdcdd1;
        font-size: 0.32rem;
      }
    }
  }
    .address_box {
      display: flex;
      justify-content: space-between;
      height: 1.74rem;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      .address_left {
        display: flex;
        justify-content: center;
        padding-left: 0.51rem;
        .must {
          padding-top: 0.1rem;
          padding-right: 0.1rem;
        }
        .tips {
          font-size: 0.48rem;
          color: #1a1b39;
        }
      }
      .home_address_box {
        .home_address {
          font-size: 0.48rem;
        }
        img {
          width: 0.2rem;
          height: 0.3rem;
          padding-right: 0.51rem;
          padding-bottom: 0.1rem;
        }
      }
    }
    .detail_address, .store_phone {
      display: flex;
      justify-content: space-between;
      height: 1.74rem;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      .bank_card_left {
        display: flex;
        justify-content: center;
        padding-left: 0.51rem;
        .must {
          padding-top: 0.1rem;
          padding-right: 0.1rem;
        }
        .tips {
          font-size: 0.48rem;
          color: #1a1b39;
        }
      }
      .id_num {
        font-size: 0.48rem;
        text-align: right;
        padding-right: 0.51rem;
      }
    }
  }

  /*协议*/
  .protocol {
    padding-top: 0.3rem;
    padding-bottom: 1.5rem;
    background-color: #eeeeee;
    .agreement {
      padding-top: 0.3rem;
      padding-bottom: 2.56rem;
      display: flex;
      padding-left: 0.51rem;
      font-size: .4rem;
      color: rgba(26, 27, 57, 1);
      img {
        width: 0.83rem;
        height: 0.82rem;
      }
    }
  }

  /** 图片上传*/
  .input_img {
    display: flex;
    justify-content: space-between;
    background-color: white;
    border-bottom: 1px solid #eeeeee;
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

  .img_select_box{
    background-color: white;
    padding: 0.55rem 0.51rem;
    .img_box{
      display: inline-block;
      position: relative;
      width: 1.88rem;
      height: 1.88rem;
      padding-right: 0.2rem;
      margin-right:.3rem;
      .img_delete{
        position: absolute;
        right: 0rem;
        top: -0.2rem;
        width: 0.52rem;
        height: 0.52rem;
      }
      .img_select{
        width: 1.88rem;
        height: 1.88rem;
        border-radius: 8px;
      }
    }
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
    margin-top: -1.25rem;
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: #5FCCC6;
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
</style>
