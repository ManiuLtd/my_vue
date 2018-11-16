<template>
  <div>
    <top-header title-txt="创建店铺"></top-header>
    <!--商户绑卡-->
    <div class="add_card">
      <!--title-->
      <div class="card_title">
        <div id="title_left">
          <img src="../assets/images/icon_line.png">
          <span>商户绑卡</span>
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
      <div class="bank_card_box">
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
      </div>
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
      <div class="store_logo_box">
        <div class="store_logo_left">
          <span class="must">*</span>
          <span class="tips">店铺LOGO</span>
        </div>
        <div class="img_up" style="margin-left: .9rem;">
          <van-uploader :after-read="onLogoRead" accept="image/*" multiple>
            <van-icon name="photograph" />
          </van-uploader>
        </div>
        <span class="img_tips">图片上传要求：单张图片小于10M，此处只能添加一张图片。</span>
      </div>
      <div class="img_select_box">
        <div class="img_box" v-for="(info,index) in logoUploadImages">
          <img class="img_delete" src="../assets/images/icon_img_delete.png" @click="deleteShopImage(index)"/>
          <img class="img_select" :src="info.id ? fileHost+info.pd_url : info.pd_url"/>
        </div>
      </div>
      <!--店铺图片-->
      <div class="store_logo_box store_imgs_box">
        <div class="store_logo_left">
          <span class="must">*</span>
          <span class="tips">店铺图片</span>
        </div>
        <div class="img_up" style="margin-left: 1.3rem;">
          <van-uploader :after-read="onShopRead" accept="image/*" multiple>
            <van-icon name="photograph" />
          </van-uploader>
        </div>
        <span class="img_tips">图片上传要求：单张图片小于10M，此处最多只能添加三张图片。</span>
      </div>
      <div class="img_select_box">
        <div class="img_box" v-for="(info,index) in shopUploadImages">
          <img class="img_delete" src="../assets/images/icon_img_delete.png" @click="deleteOtherImage(index)"/>
          <img class="img_select" :src="info.id ? fileHost+info.pd_url : info.pd_url"/>
        </div>
      </div>
      <!--家庭地址-->
      <router-link to="/address">
        <div class="address_box">
            <div class="address_left">
              <span class="must">*</span>
              <span class="tips">家庭地址</span>
            </div>
            <div class="home_address_box">
              <span class="home_address" v-text="homeAddress.name"></span>
              <img src="../assets/images/icon_arrow_right.png"/>
            </div>
        </div>
      </router-link>
      <!--店铺地址-->
      <div class="address_box" @click="getStoreAddress">
          <div class="address_left">
            <span class="must">*</span>
            <span class="tips">店铺地址</span>
          </div>
          <div class="home_address_box">
            <span class="home_address">{{storeAddress}}</span>
            <img src="../assets/images/icon_arrow_right.png" style="padding-top: 0.25rem"/>
          </div>
      </div>
      <!--详细地址-->
      <div class="detail_address">
        <div class="bank_card_left">
          <span class="must">*</span>
          <span class="tips">详细地址</span>
        </div>
        <input type="text" class="id_num" placeholder="输入详细地址"  v-model.trim="detailsAddress"/>
      </div>
      <!--商家电话-->
      <div class="store_phone">
        <div class="bank_card_left">
          <span class="must">*</span>
          <span class="tips">商家电话</span>
        </div>
        <input type="text" class="id_num" placeholder="输入商家电话" v-model.trim="phoneNum"/>
      </div>
    </div>
    <!--协议部分-->
    <div class="protocol">
      <p class="agreement">
        <van-checkbox v-model.trim="checked">
          <img id="img_chk" slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.normal"/>
          我已经阅读并同意
          <a href="" style="color: #4cc3ad;">《开店服务协议》</a>
        </van-checkbox>
      </p>
    </div>
    <span class="preserve_btn" @click="uploadImages">保存</span>
  </div>
</template>

<script>

  import * as API from '../service/API';
  import Toast from '../widget/Toast';
  import TopHeader from '../components/TopHeader'
  import Loading from '../widget/loading/loading'
  import eventBus from  '../utils/eventBus'

  let logo_index = 0;
  let shop_index = 0;

  export default {
      data(){
        return {
          storeInfo:{},
          checked:true,
          username:'', //商户姓名
          idNum:'', //身份证号
          bankCardName:'', //银行卡名称
          bankcardNum:'', //银行卡号
          storeName:'', //店铺名称
          fileHost:'',
          logoUploadImages:[], // 个人资料上传图片返回的路径
          shopUploadImages:[], // 其他资料上传图片返回的路径
          homeAddress:{}, //家庭地址
          detailsAddress:'', //详细地址
          storeAddress:'',
          lat:'',
          lng:'',
          phoneNum:'', //商家电话
          icon: {
            normal: '../../static/images/nocheck_out.png',
            active: '../../static/images/check_out.png'
          }
        }
      },
      methods:{
        getAddressData(data){
          this.homeAddress = data
        }
        ,
        getStoreInfo(){
          let loading = new Loading();
          loading.show();
          this.$get(API.PARTNER_INFO).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg);
              return;
            }
            this.storeInfo = response.data;
            loading.close();
          }).then((error)=>{
            loading.close();
          });
        },
        getStoreAddress(){
          window.erock.getlocation();
        },
        // 此方法android 调用
        getLocationPoiInfo(address,lat,lng){
          this.storeAddress = address;
          this.lat = lat;
          this.lng = lng;
        },
        submit(){
          let logoUploadImages = this.logoUploadImages;
          let shopUploadImages = this.shopUploadImages;
          let that = this;
          (new Promise(function(resolve){
            if(logoUploadImages){
              var need_upload = false;
              for(let key in logoUploadImages){
                if(logoUploadImages[key].id == 0){
                  need_upload = true;
                  break;
                }
              }

              //如果没有新文件，则不再执行
              if(!need_upload){
                resolve(logoUploadImages);
              }

              for(let key in logoUploadImages){

                if(logoUploadImages[key].id == 0){
                  that.$postImg(process.env.UPLOAD_IMG_URL, { "ext": logoUploadImages[key].ext, "content": logoUploadImages[key].pd_url}).then((response) => {
                    logoUploadImages[key].pd_url = response.result.url;
                    logoUploadImages[key].id = -100; //非0即可
                    if((logoUploadImages.length - 1) == key){
                      resolve(logoUploadImages);
                    }
                  })
                }
              }
            }else{
              resolve(logoUploadImages);
            }

          })).then(function(logoImages){
            return new Promise(function(resolve, reject){
              if(shopUploadImages){
                var need_upload = false;
                for(let key in shopUploadImages){
                  if(shopUploadImages[key].id == 0){
                    need_upload = true;
                    break;
                  }
                }
                //如果没有新文件，则不再执行
                if(!need_upload){
                  resolve({logo:logoImages,shop:shopUploadImages});
                }

                for(let key in shopUploadImages){
                  if(shopUploadImages[key].id == 0){
                    that.$postImg(process.env.UPLOAD_IMG_URL, { "ext": shopUploadImages[key].ext, "content": shopUploadImages[key].pd_url}).then((response) => {
                      shopUploadImages[key].pd_url = response.result.url;
                      shopUploadImages[key].id = -100; //非0即可
                      if((shopUploadImages.length - 1) == key){
                        resolve({logo:logoImages,shop:shopUploadImages});
                      }
                    })
                  }
                }
              }else {
                resolve({logo:logoImages,shop:shopUploadImages});
              }
            })
          }).then(function(imageInfo){
            var imageInfo = JSON.parse(JSON.stringify(imageInfo));
            let loading = new Loading();
            loading.show();
            let data = {};
            data.partner_name = that.storeName;
            data.card_no = that.bankcardNum;
            data.bank_type = that.bankCardName;
            data.is_agree = that.checked == true ? 'on' : 'off';  //是否同意合同
            data.provinces = that.homeAddress.provinces;   //省份
            data.city = that.homeAddress.city;         //城市
            data.area = that.homeAddress.area;         //区县
            data.detail_address = that.detailsAddress;
            data.partner_phone = that.phoneNum;
            data.partner_lng = this.lng;  //经度
            data.partner_lat = this.lat;  //纬度
            data.headImg = imageInfo.logo[0].pd_url;
            data.partnerImg = [];

            imageInfo.shop.forEach(v =>{
              data.partnerImg.push(v.pd_url) ;
            })
            that.$post(API.SHOP_SETUP,data).then((response)=>{
              if(response.code != 200){
                new Toast(response.msg).show();
                return;
              }else{
                new Toast(response.msg).show();
              }
              this.$router.replace('/addShopSuccess');
              loading.close();
            }).then((error)=>{
              new Toast(response.msg).show();
              loading.close();
            });
          })
        },
        verification(){
          if(!this.checked){
            new Toast("请先同意服务协议").show();
            return false;
          }
          if(!this.bankcardNum){
            new Toast("请输入银行卡号").show();
            return false;
          }
          if(!this.storeName){
            new Toast("请输入店铺名称").show();
            return false;
          }
          if(!this.homeAddress){
            new Toast("请输入家庭地址").show();
            return false;
          }
          if(!this.detailsAddress){
            new Toast("请输入详细地址").show();
            return false;
          }
          if(!this.phoneNum){
            new Toast("请输入商家电话").show();
            return false;
          }
          if(this.logoUploadImages.length == 0){
            new Toast("请添加店铺logo").show();
            return false;
          }
          if(this.shopUploadImages.length == 0){
            new Toast("请上传店铺图片").show();
            return false;
          }
          return true;
        },
        //上传店铺LOGO
        onLogoRead(file){
          let base64 = file.content;  // 文件路径
          let fileName = file.file.name; //文件名
          let ext_name = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();  //后缀名
          if(this.logoUploadImages.length < 1){
            this.logoUploadImages.push({ext:ext_name,pd_url:base64,id:0});
          }else{
            this.logoUploadImages.pop()
            this.logoUploadImages.push({ext:ext_name,pd_url:base64,id:0});
          }
        },
        // 上传店铺图片
        onShopRead(file){
          if(this.shopUploadImages.length < 3){
            let base64 = file.content;  // 文件路径
            let fileName = file.file.name; //文件名
            let ext_name = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();  //后缀名
            this.shopUploadImages.push({ext:ext_name,pd_url:base64,id:0});
          }else{
            new Toast("店铺图片只能添加三张").show();
          }
        },
        // 删除指定图片，position，图片位置
        deleteShopImage(position){
          this.logoUploadImages.splice(position,1);
        },
        // 删除指定图片，position，图片位置
        deleteOtherImage(position){
          this.shopUploadImages.splice(position,1);
        },
        uploadImages(){
          if(false == this.verification()){
            return;
          }
          this.submit();
        },
        // 通过卡号获取开户行
        getBankCardInfo(){
          this.$post(API.BANK_INFO,{'bank_no':this.bankcardNum}).then((response)=>{
            if(response.code!=200){
              new Toast(response.msg).show();
            }
            this.bankCardName = response.data.CardName;
          });
        }
      },
      created(){
        eventBus.$on('getAddress',this.getAddressData);
        window.getLocationPoiInfo = this.getLocationPoiInfo;
      },
      mounted(){
        this.getStoreInfo();
        this.fileHost = process.env.ALY_IMG_URL;
        console.log(this.fileHost);
      },
      components:{TopHeader}
    }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  /*商户绑卡*/
  .add_card{
     margin-top:1.61rem;
    .card_title{
      background-color: #eeeeee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.46rem;
      padding-right: 0.46rem;
      height: 0.98rem;
      #title_left{
        display: flex;
        justify-content: center;
        img{
          padding-top: 0.08rem;
          width: 0.1rem;
          height: 0.4rem;
        }
        span{
          padding-left: 0.1rem;
          color: #666666;
          font-size: 0.4rem;
        }
      }
      #title_right{
        display: flex;
        justify-content: center;
        span{
          color:#989898;
          font-size: 0.36rem;
        }
        .must{
          padding-top: 0.1rem;
          padding-right: 0.1rem;
          color: #e36348;
          font-size: 0.47rem;
        }
      }
    }
    .store_name_box{
      display: flex;
      justify-content: space-between;
      height: 1.74rem;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      .tips{
        padding-left: 0.51rem;
        font-size: 0.48rem;
        color: #1a1b39;
      }
      .store_name{
        padding-right: 0.51rem;
        font-size: 0.48rem;
        color: #666666;
      }
    }
    .id_num_box{
      display: flex;
      justify-content: space-between;
      height: 1.74rem;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      .tips{
        padding-left: 0.51rem;
        font-size: 0.48rem;
        color: #1a1b39;
      }
      .id_num{
        padding-right: 0.51rem;
        font-size: 0.48rem;
        color: #666666;
      }
    }
    .bank_card_box{
      display: flex;
      justify-content: space-between;
      height: 1.74rem;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      .bank_card_left{
        display: flex;
        justify-content: center;
        padding-left: 0.51rem;
        .must{
          padding-top: 0.1rem;
          padding-right: 0.1rem;
        }
        .tips{
          font-size: 0.48rem;
          color: #1a1b39;
        }
      }
      .id_num{
        font-size: 0.48rem;
        text-align: right;
        padding-right: 0.51rem;
      }
    }
    .bank_card_name{
      .bank_name{
        display: inline-block;
        color: #666666;
        font-size: 0.48rem;
        padding-right: 0.51rem;
      }
    }

  }
  /*基本信息*/
  .info{
    .info_title{
      background-color: #eeeeee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.46rem;
      padding-right: 0.46rem;
      height: 0.98rem;
      #info_left{
        display: flex;
        justify-content: center;
        img{
          padding-top: 0.08rem;
          width: 0.1rem;
          height: 0.4rem;
        }
        span{
          padding-left: 0.1rem;
          color: #666666;
          font-size: 0.4rem;
        }
      }
      #info_right{
        display: flex;
        justify-content: center;
        span{
          color:#989898;
          font-size: 0.36rem;
        }
        .must{
          padding-top: 0.1rem;
          padding-right: 0.1rem;
          color: #e36348;
          font-size: 0.47rem;
        }
      }
    }
    .store_name_box{
      display: flex;
      justify-content: space-between;
      height: 1.74rem;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      .store_name_left{
        display: flex;
        justify-content: center;
        padding-left: 0.51rem;
        .must{
          padding-top: 0.1rem;
          padding-right: 0.1rem;
        }
        .tips{
          font-size: 0.48rem;
          color: #1a1b39;
        }
      }
      .store_name{
        font-size: 0.48rem;
        text-align: right;
        padding-right: 0.51rem;
      }
    }
    .store_logo_box{
      padding-top: 0.51rem;
      padding-bottom: 0.46rem;
      display: flex;
      border-bottom: 1px solid #eeeeee;
      .store_logo_left{
        display: flex;
        justify-content: center;
        padding-left: 0.51rem;
        .must{
          padding-top: 0.1rem;
          padding-right: 0.1rem;
        }
        .tips{
          white-space: nowrap;
          font-size: 0.48rem;
          color: #1a1b39;
        }
      }
      .img_up{
        width: 1.88rem;
        height: 1.88rem;
      }
      .img_tips{
        padding-left: 0.45rem;
        color: #cdcdd1;
        font-size: 0.32rem;
      }
    }
    .address_box{
      display: flex;
      justify-content: space-between;
      height: 1.74rem;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      .address_left{
        display: flex;
        justify-content: center;
        padding-left: 0.51rem;
        .must{
          padding-top: 0.1rem;
          padding-right: 0.1rem;
        }
        .tips{
          font-size: 0.48rem;
          color: #1a1b39;
        }
      }
      .home_address_box{
        .home_address{
          font-size: 0.48rem;
        }
        img{
          width: 0.2rem;
          height: 0.3rem;
          padding-right: 0.51rem;
          padding-bottom: 0.1rem;
        }
      }
    }
    .detail_address,.store_phone{
      display: flex;
      justify-content: space-between;
      height: 1.74rem;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
      .bank_card_left{
        display: flex;
        justify-content: center;
        padding-left: 0.51rem;
        .must{
          padding-top: 0.1rem;
          padding-right: 0.1rem;
        }
        .tips{
          font-size: 0.48rem;
          color: #1a1b39;
        }
      }
      .id_num{
        font-size: 0.48rem;
        text-align: right;
        padding-right: 0.51rem;
      }
    }
  }
  /*协议*/
  .protocol{
    padding-top: 0.3rem;
    padding-bottom: 2.56rem;
    background-color: #eeeeee;
    .agreement{
      padding-left: 0.51rem;
      font-size:.4rem;
      color: rgba(26,27,57,1);
      i{
        display: inline-block;
        width: .6rem;
        height: .6rem;
        margin-right: .2rem;
      }
      img{
        padding-top: 0.1rem;
        width: 0.83rem;
        height: 0.82rem;
      }
    }
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
