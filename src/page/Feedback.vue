<template>
  <div>
    <div class="content">
      <top-header title-txt="帮助与反馈"></top-header>
      <div class="advice_box">
        <textarea placeholder="感谢您对我们的支持，我们期待您宝贵的意见，请点击输入。" v-model.trim="advice"></textarea>
      </div>
      <p class="img_title">上传图片</p>
      <ul class="img_select_box">
        <li class="img_box" v-for="(item,index) in formData.fd_imgs">
          <img class="img_delete" src="../assets/images/icon_img_delete.png" @click="deleteImage(index)"/>
          <img class="img_select" :src="item.id == 0 ? item.pd_url : fileHost+item.pd_url"/>
        </li>
        <li class="upload_img">
          <input class="open_album" id="input_other_img" type="file" accept="image/x-png, image/jpg, image/jpeg" @change="onAdviceImg"/>
        </li>
      </ul>
      <p class="tel" @click="telConfirm">
        客服电话: 400-888-0028
        <img src="../assets/images/icon_rule_arrow.png" alt="">
      </p>
    </div>
    <span :class="bottom_btn_style" @click="submit" v-if="advice">提交</span>
    <span :class="bottom_btn_style" style="background-color: #999999;" v-if="advice==''" @click="submit">提交</span>
    <loading :schedule="uploadSchedule" v-if="isShowLoading"></loading>
  </div>
</template>

<script>
  import TopHeader from '../components/TopHeader';
  import ImageCompress from '../utils/ImageCompress';
  import * as API from '../service/API';
  import Toast from '../widget/Toast';
  import * as constant from '../utils/constant';
  import axios from 'axios';
  import Loading from '../components/Loading';
  import { Dialog } from 'vant';
  import SuccessLoading from "../widget/sucess_loading/SuccessLoading";

  export default {
    data(){
      return{
        uploadSchedule:0,
        isShowLoading:false,
        advice:'',
        fileHost: '',
        formData: {
          fd_imgs: []
        },
        clientHeight:document.documentElement.clientHeight,
        bottom_btn_style:'btn_fixed'
      }
    },
    computed:{
      logoImageslength() {
        return this.formData.fd_imgs ? this.formData.fd_imgs.length : 0 ;
      },
    },
    mounted() {
      this.fileHost = process.env.ALY_IMG_URL;
      this.resizeWindow();
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
      submitInfo(){
        let tempFormData = JSON.parse(JSON.stringify({fd_imgs: this.formData.fd_imgs}));

        let data = {};
        data.fd_content = this.advice;
        data.fd_imgs = [];
        tempFormData.fd_imgs.forEach(v => {
          data.fd_imgs.push(this.fileHost + v.pd_url);
        });
        this.$post(API.FEED_ADD,data).then((response) => {
          this.uploadSchedule = 100;
          this.isShowLoading = false;
          if (response.code != 200) {
            new Toast(response.msg).show();
            return;
          } else {
            new SuccessLoading('提交成功！').show();
            this.$router.go(-1);
          }
        });
      },
      uploadProductImages(index){
        if (this.formData.fd_imgs[index].id == 0) {
          this.$postImg(process.env.UPLOAD_IMG_URL, {
            "ext": this.formData.fd_imgs[index].ext,
            "content": this.formData.fd_imgs[index].pd_url
          }).then((response) => {
            this.formData.fd_imgs[index].pd_url = response.result.url;
            this.formData.fd_imgs[index].id = -100; //非0即可
            index = index - 1;
            if(index >= 0){
              this.uploadProductImages(index);
            }else{
              this.submitInfo();
            }
            this.uploadSchedule = (this.logoImageslength  - (index + 1)) / (this.logoImageslength) * 100 - 10;
          })
        }else{
          this.submitInfo();
        }
      },
      onAdviceImg() {
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
          if (this.formData.fd_imgs.length < 3) {
            this.formData.fd_imgs.push({pd_url: base64, id: 0, ext: ext_name});
          } else {
            new Toast("图片最多上传三张").show();
          }
        });
      },
      telConfirm(){
        Dialog.confirm({
          title:'400-888-0028'
        }).then(() => {

        }).catch(() => {
          // on cancel
        });
      },
      // 删除指定图片，position，图片位置
      deleteImage(position) {
        this.formData.fd_imgs.splice(position, 1);
      },
      // 帮助与反馈提交
      submit(){
        if(!this.advice){
          new Toast("请输入反馈意见").show();
          return;
        }else{
          Dialog.confirm({
            title:'确定提交意见吗？若提交请耐心等待'
          }).then(() => {
          if(this.formData.fd_imgs && this.formData.fd_imgs.length > 0){
            axios.defaults.showLoading = false; //默认显示loading
            this.uploadSchedule = 0;  // 重置
            this.isShowLoading = true;
            this.uploadProductImages(this.formData.fd_imgs.length - 1);
          }else {
            let data = {};
            data.fd_content = this.advice;
            data.fd_imgs = this.formData.fd_imgs;
            this.$post(API.FEED_ADD,data).then((response) => {
              this.uploadSchedule = 100;
              this.isShowLoading = false;
              if (response.code != 200) {
                new Toast(response.msg).show();
                return;
              } else {
                new SuccessLoading('提交成功！').show();
                this.$router.go(-1);
              }
            });
          }
          }).catch(() => {
            // on cancel
          });
        }
      },
    },
    components:{
      TopHeader,Loading
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  .content{
    padding: 1.61rem .5rem 0;
  }
  .advice_box{
    margin: .5rem 0;
    padding: .5rem .4rem;
    box-sizing: border-box;
    background-color: #f6f6f6;
    border-radius: .3rem;
    font-size: 0;
  }
  .advice_box textarea{
    width: 100%;
    min-height: 4.5rem;
    background-color: transparent;
    font-size: .42rem;
    color: $font_100;
  }
  textarea::-webkit-input-placeholder {
    color: #c6c6c8;
    font-size: .42rem;
  }
  .img_title{
    font-size: .45rem;
    color: $font_100;
    padding: .31rem .4rem;
  }
  /* 上传图片 */
  .upload_img{
    position: relative;
    width: 3rem;
    height: 3rem;
    margin: .13rem;
    display: inline-block;
    background: url("../assets/images/icon_advice_img.png") no-repeat center;
    background-size: cover;
    vertical-align: top;
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
  .img_select_box{
    font-size: 0;
  }
  .img_select_box .img_box{
    position: relative;
    width: 3rem;
    height: 3rem;
    display: inline-block;
    border: 1px solid #dfdfdd;
    box-sizing: border-box;
    border-radius: .3rem;
    margin: .13rem;
    vertical-align: middle;
  }
  .img_delete {
    position: absolute;
    right: -0.2rem;
    top: -0.2rem;
    width: 0.52rem;
    height: 0.52rem;
    cursor: pointer;
  }
  .img_select{
    width: 100%;
    height: 100%;
  }
  /* 客服电话 */
  .tel{
    position: relative;
    text-align: center;
    font-size: .45rem;
    color: $main_grren;
    margin: 1.8rem 0;
  }
  .tel img{
    position: absolute;
    top: 50%;
    margin-top: -0.16rem;
    left: 77%;
    height: 0.3rem;
    width: 0.18rem;
  }
  /* 提交按钮 */
  .btn_margin{
    display: block;
    width: 100%;
    line-height: 1.25rem;
    font-size: .48rem;
    color: white;
    text-align: center;
    background-color: #5FCCC6;
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
</style>
