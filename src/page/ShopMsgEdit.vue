<template>
  <div class="shop_create_content">
    <top-header title-txt="基本信息"></top-header>
    <form id="shopMsg" class="content" onsubmit="return false">
      <div class="input_content">
        <ul class="input_box">
          <!--店铺名称-->
          <li class="input_div">
            <label><span class="must">*</span>店铺名称</label>
            <input type="text" maxlength="20" name="partner_name" v-model.trim="formData.partner_name" placeholder="输入店铺名称(20字以内)" >
          </li>
          <!--店铺LOGO-->
          <li class="input_img">
            <label><span class="must">*</span>店铺LOGO</label>
            <div class="img_up">
              <van-uploader :after-read="onProductLogoRead" accept="image/*" multiple>
                <van-icon name="photograph" />
              </van-uploader>
            </div>
            <input type="hidden" id="headImg" name="headImg" value="">
            <p class="tips">图片上传要求：单张图片小于10M，此处只能添加一张图片</p>
          </li>
          <div class="img_select_box">
            <div class="img_box" v-for="(item,index) in imageData.a">
              <img class="img_delete" src="../assets/images/icon_img_delete.png" @click="deleteLogoImage(index)"/>
              <img class="img_select" :src="item.id ? fileHost+item.pd_url : item.pd_url"/>
            </div>
          </div>
          <!--店铺图片-->
          <li class="input_img">
            <label><span class="must">*</span>店铺图片</label>
            <div class="img_up">
              <van-uploader :after-read="onProductOtherRead" accept="image/*" multiple>
                <van-icon name="photograph" />
              </van-uploader>
            </div>
            <input type="hidden" name="partnerImg[]" value="">
            <p class="tips">图片上传要求：单张图片小于10M此处最多只能添加三张图片。</p>
          </li>
          <div class="img_select_box">
            <div class="img_box" v-for="(item,index) in imageData.g">
              <img class="img_delete" src="../assets/images/icon_img_delete.png" @click="deleteOtherImage(index)"/>
              <img class="img_select" :src="item.id ? fileHost+item.pd_url : item.pd_url"/>
            </div>
          </div>
          <!--店铺地址-->
          <li class="input_div">
            <label><span class="must">*</span>店铺地址</label>
            <input type="hidden" name="provinces" placeholder="" value="">
            <input type="hidden" name="city" placeholder="" value="">
            <input type="hidden" name="area" placeholder="" value="">
            <router-link to="/address">
              <input type="text" v-model.trim="address" placeholder="请选择" readonly="readonly" class="icon_input">
              <i class="icon_arrow"></i>
            </router-link>
          </li>
          <!--详细地址-->
          <li class="input_div">
            <label><span class="must">*</span>详细地址</label>
            <input type="text" name="detail_address" v-model.trim="formData.detail_address" placeholder="输入详细地址" value="">
          </li>
          <!--商家电话-->
          <li class="input_div">
            <label><span class="must">*</span>商家电话</label>
            <input type="text" name="partner_phone" v-model.trim="formData.partner_phone" placeholder="输入商家电话" value="">
          </li>
        </ul>
      </div>
      <p class="must_title"><span class="must">*</span>为必填项</p>
      <span class="preserve_btn" @click="uploadImg">保存</span>
    </form>
  </div>
</template>
<script>
  import TopHeader from '../components/TopHeader'
  import * as API from '../service/API'
  import Toast from '../widget/Toast'
  import eventBus from  '../utils/eventBus'
  import Loading from '../widget/loading/loading'

  let logo_index = 0;
  let other_indext = 0;

  export default {
      data(){
          return {
            data:{},
            address:'',
            formData:{
                partner_name: "",
                headImg: "",
                partnerImg: [],
                provinces: "",
                city: "",
                area:"",
                partner_lng:"",
                partner_lat:"",
                detail_address:"",
                partner_phone:"",
            },
            fileHost:'',
            imageData:{
              a:[],
              g:[]
            },
            productLogo:[], // 商品头图
            productLogoExt:[], // 商品头图后缀
            productImages:[], //商品图片
            productImagesExt:[], //商品图片后缀
            responseLogoUrl:[],  //上传成功返回商品logo
            responseImages:[],   //上传返回的其他商品地址
          }
      },
      created(){
        eventBus.$on('getAddress',this.getAddressData);
      },
      methods: {
        submit1: function () {
          let loading = new Loading();
          loading.show();
          this.$post(API.SHOP_BASE_INFO, this.formData).then((response) => {
            if (response.code != 200) {
              new Toast(response.msg).show();
              return;
            } else if (response.code == 200) {
              this.data = response.data
            }
            loading.close();
          }).then((error) => {
            loading.close();
          });
        },
        submit(){
          let imageData = this.imageData;
          let that = this;
          (new Promise(function(resolve){
            console.log(imageData.a.length);
            if(imageData.a){
              var need_upload = false;
              for(let key in imageData.a){
                if(imageData.a[key].id == 0){
                  need_upload = true;
                  break;
                }
              }

              //如果没有新文件，则不再执行
              if(!need_upload){
                resolve(imageData.a);
              }

              for(let key in imageData.a){

                if(imageData.a[key].id == 0){
                  that.$postImg(process.env.UPLOAD_IMG_URL, { "ext": imageData.a[key].ext, "content": imageData.a[key].pd_url}).then((response) => {
                    imageData.a[key].pd_url = response.result.url;
                    imageData.a[key].id = -100; //非0即可
                    console.log(key);
                    if((imageData.a.length - 1) == key){
                      console.log('end');
                      resolve(imageData.a);
                    }
                  })
                }
              }
            }else{
              resolve(imageData.a);
            }

          })).then(function(literature){
            return new Promise(function(resolve, reject){
              if(imageData.g){
                var need_upload = false;
                for(let key in imageData.g){
                  if(imageData.g[key].id == 0){
                    need_upload = true;
                    break;
                  }
                }
                //如果没有新文件，则不再执行
                if(!need_upload){
                  resolve({a:literature,g:imageData.g});
                }

                for(let key in imageData.g){
                  if(imageData.g[key].id == 0){
                    that.$postImg(process.env.UPLOAD_IMG_URL, { "ext": imageData.g[key].ext, "content": imageData.g[key].pd_url}).then((response) => {
                      imageData.g[key].pd_url = response.result.url;
                      imageData.g[key].id = -100; //非0即可
                      if((imageData.g.length - 1) == key){
                        resolve({a:literature,g:imageData.g});
                      }
                    })
                  }
                }
              }else {
                resolve({a:literature,g:imageData.g});
              }
            })
          }).then(function(imageData){
            var tempimageData = JSON.parse(JSON.stringify(imageData));
            let loading = new Loading();
            that.formData.headImg = [];
            that.formData.partnerImg = [];

            that.formData.headImg = tempimageData.a[0].pd_url;
            tempimageData.g.forEach(v =>{
              that.formData.partnerImg.push(v.pd_url) ;
            })

            loading.show();
            that.$post(API.SHOP_BASE_INFO, that.formData).then((response) => {
              if (response.code != 200) {
                new Toast(response.msg).show();
                return;
              } else if (response.code == 200) {
                new Toast(response.msg).show();
              }
              loading.close();
            }).then((error) => {
              loading.close();
            });
          })
        },
        getAddressData(data) {
          this.address = data.name;
          this.formData.provinces = data.provinces;
          this.formData.city = data.city;
          this.formData.area = data.area;
          console.log(data)
        },
        getData() {
          let loading = new Loading();
          loading.show();
          this.$get(API.SHOP_BASE_INFO).then((response) => {
            if (response.code != 200) {
              new Toast(response.msg).show();
              return;
            } else if (response.code == 200) {
              this.data = response.data

              this.formData.partner_name = this.data.partner.partnerName;
              this.formData.provinces = this.data.partner.province;
              this.formData.city = this.data.partner.city;
              this.formData.area = this.data.partner.county;
              this.formData.partner_lng = this.data.partner.partnerLng;
              this.formData.partner_lat = this.data.partner.partnerLat;
              this.formData.detail_address = this.data.partner.partnerDetailAddress;
              this.address = this.data.partner.partner_address;
              this.formData.partner_phone = this.data.partner.partnerPhone;
              if(this.data.partner_daturm.b){
                this.imageData.a = this.data.partner_daturm.b;
              }
              if(this.data.partner_daturm.c){
                this.imageData.g = this.data.partner_daturm.c;
              }
            }
            loading.close();
          }).then((error) => {
            loading.close();
          });
        },
        onProductLogoRead(file) {
          let base64 = file.content;  // 文件路径
          let fileName = file.file.name; //文件名
          let ext_name = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();  //后缀名
          if(this.imageData.a.length < 1){
            this.imageData.a.push({ext:ext_name,pd_url:base64,id:0});
          }else{
            this.imageData.a.pop()
            this.imageData.a.push({ext:ext_name,pd_url:base64,id:0});
          }
        },
        onProductOtherRead(file) {
          if(this.imageData.g.length < 3){
            let base64 = file.content;  // 文件路径
            let fileName = file.file.name; //文件名
            let ext_name = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();  //后缀名
            this.imageData.g.push({ext:ext_name,pd_url:base64,id:0});
          }else{
            new Toast("店铺图片只能添加三张").show();
          }
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
          this.submit();
        },
        //上传个人认证图片
        postLogoImage(ext) {
          let loading = new Loading();
          loading.show();
          this.$postImg(process.env.UPLOAD_IMG_URL, {
            "ext": ext,
            "content": this.productLogo[logo_index]
          }).then((response) => {
            this.responseLogoUrl.push(response.result.url);
            if (logo_index < this.productLogo.length) {
              logo_index = logo_index + 1;
              this.postLogoImage(this.productLogoExt[person_index]);
            } else {
              if (this.productImages && this.productImages.length > 0) {
                this.postOtherImage(this.productImagesExt[0]);
              } else {
                this.saveProduct();
              }
            }
            loading.close();
          }).then((error) => {
            loading.close();
          });
        },
        //上传其他资料图片
        postOtherImage(ext) {
          let loading = new Loading();
          loading.show();
          this.$postImg(process.env.UPLOAD_IMG_URL, {
            "ext": ext,
            "content": this.productImages[other_indext]
          }).then((response) => {
            this.responseImages.push(response.result.url);
            if (other_indext < this.productImages.length) {
              other_indext = other_indext + 1;
              this.postOtherImage(this.productImagesExt[other_indext]);
            } else {
              this.saveProduct();
            }
            loading.close();
          }).then((error) => {
            loading.close();
          });
        },
        verification(){
          if(!this.formData.partner_name){
            new Toast('请输入店铺名称').show();
            return false;
          }
          if(this.imageData.a.length == 0){
            new Toast('请添加店铺logo').show();
            return false;
          }
          if(this.imageData.g.length == 0){
            new Toast('请添加店铺图片').show();
            return false;
          }
          if(!this.formData.provinces){
            new Toast('请添加店铺地址').show();
            return false;
          }
          if(!this.formData.detail_address){
            new Toast('请添加详细地址').show();
            return false;
          }
          if(!this.formData.partner_phone){
            new Toast('请添加商家电话').show();
            return false;
          }
        }
      },
      mounted () {
        let screenHeigt = window.screen.availHeight;
        let topHeight = document.getElementsByClassName('common_header')[0].offsetHeight;
        document.getElementsByClassName('shop_create_content')[0].style.minHeight=screenHeigt-topHeight+'px';
        document.getElementsByClassName('shop_create_content')[0].style.backgroundColor='#eee';
        this.fileHost = process.env.ALY_IMG_URL;
        this.getData();
      },
      components:{TopHeader}
  }
</script>
<style lang="scss" scoped>
 @import "../style/createStore.scss";
 .input_box .icon_input{
   right: 1rem;
   width: 60%;
 }
 /** 图片上传*/
 .input_img{
   display: flex;
   justify-content: space-between;
   background-color: white;
   border-bottom: 1px solid #eeeeee;
   padding: 0.55rem 0.51rem;
 .label{
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
</style>
