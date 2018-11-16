<template>
  <div class="shop_create_content">
    <top-header title-txt="上传资料"></top-header>
    <form class="content" onsubmit="return false">
      <div class="input_content">
        <ul class="input_box">
          <li class="input_img">
            <label><span class="must">*</span>证件资料</label>
            <div class="img_select_box">
              <div class="img_box" v-for="(item,key) in formData.a">
                <img class="img_select" :src="item.id ? fileHost+item.pd_url : item.pd_url"/>
              </div>
              <p class="tips">您已认证该资料信息，无需再次修改</p>
            </div>
          </li>
          <li class="input_img">
            <label>其他资料上传</label>
            <div class="img_up">
              <van-uploader :after-read="onOtherRead" accept="image/*" multiple>
                <van-icon name="photograph" />
              </van-uploader>
            </div>
            <p class="tips">图片上传要求：请确保照片的真实有效，单张图片小于10M,此处最多添加3张图片。</p>
          </li>
          <div class="img_select_box">
            <div class="img_box" v-for="(item,key) in formData.g">
              <img class="img_delete" src="../../assets/images/icon_img_delete.png" @click="deleteImage(key,'g')"/>
              <img class="img_select" :src="item.id ? fileHost+item.pd_url : item.pd_url"/>
            </div>
          </div>
        </ul>
      </div>
      <p class="must_title"><span class="must">*</span>为必填项，请确保照片资料真实有效。</p>
      <span class="preserve_btn" v-on:click="submit">保存</span>
    </form>
  </div>
</template>
<script>
  import TopHeader from '../../components/TopHeader'
  import * as API from '../../service/API';
  import Toast from '../../widget/Toast'
  import md5 from 'js-md5';
  import DateUtils from '../../utils/DateUtils';
  import LocalStorageUtils from '../../utils/LocalStorageUtils';
  import axios from 'axios';

  export default {
    data() {
      return {
        personImgNameEtx:[], //个人资料图后缀
        otherImageNameEtx:[], // 其他资料图后缀
        person_selectImages:[], // 选择的图片，里面是base64位编码
        other_selectImages:[], //其他资料，图片上传，里面是base64位编码
        perosnUploadImages:[], // 个人资料上传图片返回的路径
        otherUploadImages:[], // 其他资料上传图片返回的路径
        fileHost: process.env.ALY_IMG_URL,
        formData:{
          a:[],
          g:[],
        }
      };
    },
    methods: {
      submit(){
        let formData = this.formData;
        let that = this;
        (new Promise(function(resolve){
          console.log(formData.a.length);
          if(formData.a){
            var need_upload = false;
            for(let key in formData.a){
              if(formData.a[key].id == 0){
                need_upload = true;
                break;
              }
            }

            //如果没有新文件，则不再执行
            if(!need_upload){
              resolve(formData.a);
            }

            for(let key in formData.a){

              if(formData.a[key].id == 0){
                that.$postImg(process.env.UPLOAD_IMG_URL, { "ext": formData.a[key].ext, "content": formData.a[key].pd_url}).then((response) => {
                  formData.a[key].pd_url = response.result.url;
                  formData.a[key].id = -100; //非0即可
                  console.log(key);
                  if((formData.a.length - 1) == key){
                    console.log('end');
                    resolve(formData.a);
                  }
                })
              }
            }
          }else{
            resolve(formData.a);
          }

        })).then(function(literature){
            return new Promise(function(resolve, reject){
              if(formData.g){
                var need_upload = false;
                for(let key in formData.g){
                  if(formData.g[key].id == 0){
                    need_upload = true;
                    break;
                  }
                }
                //如果没有新文件，则不再执行
                if(!need_upload){
                  resolve({a:literature,g:formData.g});
                }

                for(let key in formData.g){
                  if(formData.g[key].id == 0){
                    that.$postImg(process.env.UPLOAD_IMG_URL, { "ext": formData.g[key].ext, "content": formData.g[key].pd_url}).then((response) => {
                      formData.g[key].pd_url = response.result.url;
                      formData.g[key].id = -100; //非0即可
                      if((formData.g.length - 1) == key){
                        resolve({a:literature,g:formData.g});
                      }
                    })
                  }
                }
              }else {
                resolve({a:literature,g:formData.g});
              }
            })
        }).then(function(formData){
          var tempFormData = JSON.parse(JSON.stringify(formData));
          console.log(tempFormData);

          let data = {};
          data.idUpload = [];
          data.otherUpload = [];

          tempFormData.a.forEach(v =>{
            data.idUpload.push(v.pd_url) ;
          })
          tempFormData.g.forEach(v =>{
            data.otherUpload.push(v.pd_url) ;
          })
          console.log(data);
          that.$post(API.PARTNER_DATURM_INFO,data).then((response)=>{
            console.log(response);
            if(response.code != 200){
              new Toast(response.msg).show();
              return;
            }else{
              new Toast(response.msg).show();
            }
          })
          console.log(data);
        })
      },
      initImages(){
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
          }
        })
      },
      upload: function(){
        this.postPersonImage(this.personImgNameEtx[0]);
      },
      //绑定个人证件照信息
      onPersonRead(file){
        let base64 = file.content;  // 文件路径
        this.person_selectImages.push(base64);
        let fileName = file.file.name; //文件名
        let ext_name = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();  //后缀名
        this.formData.a.push({pd_url:base64,id:0,ext:ext_name,pd_type:'a'});
      },
      // 绑定其他照片信息
      onOtherRead(file){
        let base64 = file.content;  // 文件路径
        this.other_selectImages.push(base64);
        let fileName = file.file.name; //文件名
        let ext_name = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();  //后缀名
        this.formData.g.push({pd_url:base64,id:0,ext:ext_name,pd_type:'a'});
      },
      // 删除指定图片，position，图片位置
      deleteImage(key,type){
        this.formData[type].splice(key, 1);
      }
    },
    mounted() {
      let screenHeigt = window.screen.availHeight;
      let topHeight = document.getElementsByClassName('common_header')[0].offsetHeight;
      document.getElementsByClassName('shop_create_content')[0].style.minHeight = screenHeigt - topHeight + 'px';
      document.getElementsByClassName('shop_create_content')[0].style.backgroundColor = '#eee';
      this.initImages();
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
    padding: 0.55rem 0.51rem;
    border-bottom: 1px solid #eeeeee;
    label{
      width: 24%;
      margin-right: .5rem;
    }
  .img_select_box{
    padding: 0;
    .tips{
      width: 100%;
      margin-top: .3rem;
    }
  }
  .img_up{
    width: 1.88rem;
    height: 1.88rem;
  }
  .tips{
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
  .img_delete{
    position: absolute;
    right: 0rem;
    top: -0.2rem;
    width: 0.52rem;
    height: 0.52rem;
  }
  .img_select{
    padding-right: 0.2rem;
    width: 1.88rem;
    height: 1.88rem;
  }
  }
  }
  .tips{
    font-size: 0.32rem;
    color: #cdcdd1;
  }
</style>

