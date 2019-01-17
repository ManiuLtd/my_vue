<template>
  <div class="shop_create_content">
    <div class="page_bg"></div>
    <top-header title-txt="上传资料"></top-header>
    <form class="content" onsubmit="return false">
      <div class="input_content">
        <ul class="input_box">
          <li class="input_img">
            <label><span class="must">*</span>证件资料</label>
            <div class="img_select_box">
              <div class="img_box" v-for="(item,key) in formData.a">
                <img class="img_select" :src="item.id == 0 ? item.pd_url : fileHost+item.pd_url"/>
              </div>
              <p class="tips">您已认证该资料信息，无需再次修改</p>
            </div>
          </li>
          <div class="div_input_img">
            <div class="input_img">
              <label>其他资料上传</label>
              <!--选择图片-->
              <div class="open_album_box">
                <input class="open_album" id="input_other_img" type="file"
                       accept="image/x-png, image/jpg, image/jpeg" @change="onOtherRead"/>
              </div>
              <p class="tips" style="margin-left: 0.5rem">图片上传要求：请确保照片的真实有效，单张图片小于10M,此处最多添加3张图片。</p>
            </div>
            <div class="img_select_box">
              <div class="img_box" v-for="(item,key) in formData.g">
                <img class="img_delete" src="../../assets/images/icon_img_delete.png" @click="deleteImage(key,'g')"/>
                <img class="img_select" :src="item.id == 0 ? item.pd_url : fileHost+item.pd_url"/>
              </div>
            </div>
          </div>
        </ul>
      </div>
      <p class="must_title"><span class="must">*</span>为必填项，请确保照片资料真实有效。</p>
      <span :class="bottom_btn_style" v-on:click="submit">保存</span>
    </form>
    <loading :schedule="uploadSchedule" v-if="isShowLoading"></loading>
  </div>
</template>
<script>
  import TopHeader from '../../components/TopHeader'
  import * as API from '../../service/API';
  import Toast from '../../widget/Toast'
  import ImageCompress from '../../utils/ImageCompress';
  import * as constant from '../../utils/constant';
  import axios from 'axios';
  import Loading from '../../components/Loading'

  export default {
    data() {
      return {
        uploadSchedule:0,
        isShowLoading:false,
        personImgNameEtx: [], //个人资料图后缀
        otherImageNameEtx: [], // 其他资料图后缀
        person_selectImages: [], // 选择的图片，里面是base64位编码
        other_selectImages: [], //其他资料，图片上传，里面是base64位编码
        perosnUploadImages: [], // 个人资料上传图片返回的路径
        otherUploadImages: [], // 其他资料上传图片返回的路径
        fileHost: process.env.ALY_IMG_URL,
        formData: {
          a: [],
          g: [],
        },
        clientHeight:document.documentElement.clientHeight,
        bottom_btn_style:'btn_fixed'
      };
    },
    computed:{
      logoImageslength() {
        return this.formData.a ? this.formData.a.length : 0 ;
      },
      otherImageLength() {
        return this.formData.g ? this.formData.g.length : 0 ;
      }
    },
    mounted() {
      this.resizeWindow();
      this.initImages();
    },
    destroyed(){
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
        if (this.formData.a[index].id == 0) {
          this.$postImg(process.env.UPLOAD_IMG_URL, {
            "ext": this.formData.a[index].ext,
            "content": this.formData.a[index].pd_url
          }).then((response) => {
            this.formData.a[index].pd_url = response.result.url;
            this.formData.a[index].id = -100; //非0即可
            index = index - 1;
            if(index >= 0){
              this.uploadProductLogo(index);
            }else{
              if(this.formData.g && this.formData.g.length>0){
                this.uploadProductImages(this.formData.g.length - 1);
              }else{
                this.submitInfo();
              }
            }
            this.uploadSchedule = (this.logoImageslength - (index + 1)) / (this.logoImageslength + this.otherImageLength) * 100 - 10;
          })
        }else{
          if(this.formData.g && this.formData.g.length>0){
            this.uploadProductImages(this.formData.g.length - 1);
          }else{
            this.submitInfo();
          }
        }
      },
      uploadProductImages(index){
        if (this.formData.g[index].id == 0) {
          this.$postImg(process.env.UPLOAD_IMG_URL, {
            "ext": this.formData.g[index].ext,
            "content": this.formData.g[index].pd_url
          }).then((response) => {
            this.formData.g[index].pd_url = response.result.url;
            this.formData.g[index].id = -100; //非0即可
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
        let tempFormData = JSON.parse(JSON.stringify({a: this.formData.a, g: this.formData.g}));
        console.log(tempFormData);

        let data = {};
        data.idUpload = [];
        data.otherUpload = [];

        tempFormData.a.forEach(v => {
          data.idUpload.push(v.pd_url);
        })
        tempFormData.g.forEach(v => {
          data.otherUpload.push(v.pd_url);
        })
        console.log(data);
        this.$post(API.PARTNER_DATURM_INFO, data).then((response) => {
          this.uploadSchedule = 100;
          this.isShowLoading = false;
          if (response.code != 200) {
            new Toast(response.msg).show();
            return;
          } else {
            this.$router.replace('/uploadData');
          }
        });
      },
      submit(){
        axios.defaults.showLoading = false; //默认显示loading
        this.uploadSchedule = 0;  // 重置
        this.isShowLoading = true;
        this.uploadProductLogo(this.formData.a.length - 1);
      },
      initImages() {
        this.$get(API.PARTNER_DATURM_INFO).then((response) => {
          if (response.code != 200) {
            new Toast(response.msg).show();
            return;
          } else if (response.code == 200) {
            if (response.data.g) {
              this.formData.g = response.data.g;
            }
            if (response.data.a) {
              this.formData.a = response.data.a;
            }
          }
        })
      },
      //绑定个人证件照信息
      onPersonRead(file) {
        let base64 = file.content;  // 文件路径
        this.person_selectImages.push(base64);
        let fileName = file.file.name; //文件名
        let ext_name = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();  //后缀名
        if(ext_name == 'bmp' || ext_name == 'gif'){
          new Toast(`无法上传${ext_name}格式的图片`).show();
          return;
        }
        this.formData.a.push({pd_url: base64, id: 0, ext: ext_name, pd_type: 'a'});
      },
      // 绑定其他照片信息
      onOtherRead() {
        let fileObj = document.getElementById("input_other_img").files[0]; // js 获取文件对象
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
        new ImageCompress(fileObj,constant.DATA_PICTURE_SIZE,constant.DATA_QUALITY).compress((base64) => {
          // console.log("压缩后：" + base64.length / 1024 + " " + base64);
          if (this.formData.g.length < 3) {
            this.formData.g.push({pd_url: base64, id: 0, ext: ext_name, pd_type: 'a'});
          } else {
            new Toast("店铺图片只能添加三张").show();
          }
        });
      },
      // 删除指定图片，position，图片位置
      deleteImage(key, type) {
        this.formData[type].splice(key, 1);
      }
    },
    components: {TopHeader,Loading}
  };
</script>
<style lang="scss" scoped>
  @import "../../style/common.scss";
  @import "../../style/public.scss";

  .shop_create_content .content{
    padding-top: 1.62rem;
  }

  /*  必填提示  */
  .must_title {
    font-size: .36rem;
    color: #989898;
    padding: .1rem .45rem 2rem;
  }

  .must {
    margin-right: .2rem;
    vertical-align: -webkit-baseline-middle;
  }

  /*  隐藏的信息盒子  */
  .input_content {
    margin-bottom: .2rem;
  }

  /** 图片上传*/
  .input_img {
    display: flex;
    background-color: white;
    padding: 0.55rem 0.51rem;
    border-bottom: 1px solid #eeeeee;
    label {
      width: 24%;
      margin-right: .5rem;
    }
    .img_select_box {
      padding: 0;
      margin-top:-0.2rem;
      .tips {
        width: 100%;
        margin-top: .3rem;
      }
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
  div.input_img{
    border: none;
  }
  .div_input_img{
    border-bottom: 1px solid #eeeeee;
  }

  .img_select_box {
    background-color: white;
    padding: 0.35rem 0.51rem 0.55rem;
    .img_box {
      display: inline-block;
      position: relative;
      width: 1.88rem;
      height: 1.88rem;
      padding-right: 0.2rem;
      margin-right:.3rem;
      margin-top:.4rem;
      .img_delete {
        position: absolute;
        right: 0rem;
        top: -0.2rem;
        width: 0.52rem;
        height: 0.52rem;
      }
      .img_select {
        width: 1.88rem;
        height: 1.88rem;
        border-radius: 8px;
      }
    }
  }

  .tips {
    font-size: 0.32rem;
    color: #cdcdd1;
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
    background-image: url("../../assets/images/icon_up_img.png");
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

