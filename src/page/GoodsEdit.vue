<template>
  <div>
    <top-header title-txt="编辑商品"></top-header>
    <div style="height: 1.61rem;"></div>
    <!--添加商品-->
    <div class="add_header">
      <!--title-->
      <div class="header_title">
        <div class="title_left">
          <span class="must">*</span>
          <span>为必填项</span>
        </div>
      </div>
      <!--item-->
      <div class="add_box">
        <div class="add_content_left">
          <span class="must">*</span>
          <span class="tips">商品名称</span>
        </div>
        <span>{{ productName }}</span>
      </div>
      <!--商品分类-->
        <div class="add_box">
          <div class="add_content_left">
            <span class="must">*</span>
            <span class="tips">商品分类</span>
          </div>
          <span>{{categoryTxt}}</span>
        </div>
      <!--商品品牌-->
        <div class="add_box">
        <div class="add_content_left">
          <span class="must">*</span>
          <span class="tips">商品品牌</span>
        </div>
        <span>{{brandInfo}}</span>
      </div>
      <!--商品介绍-->
      <div class="add_box" style="border: none;">
        <div class="add_content_left">
          <span class="must">*</span>
          <span class="tips">商品介绍</span>
        </div>
      </div>
      <div class="add_content_bottom">
        <textarea placeholder="输入该商品的详细描述" v-model.trim="introduction"></textarea>
      </div>
      <!--商品头图-->
      <div class="product_logo_box">
        <div class="add_img_box">
          <div class="img_content_left">
            <span class="must">*</span>
            <span class="tips">商品头图</span>
          </div>
          <div class="img_up">
            <van-uploader :after-read="onProductLogoRead" accept="image/*" multiple>
              <van-icon name="photograph" />
            </van-uploader>
          </div>
          <span class="img_tips">图片上传要求：单张图片小于10M此处最多只能添加一张图片。</span>
        </div>
        <div class="img_select_box">
          <div class="img_box" v-for="(item,index) in imageData.a">
            <img class="img_delete" src="../assets/images/icon_img_delete.png" @click="deleteLogoImage(index)"/>
            <img class="img_select" :src="item.id ? fileHost+item.pd_url : item.pd_url"/>
          </div>
        </div>
      </div>
      <!--商品图片-->
      <div class="product_imgs_box">
        <div class="add_img_box">
          <div class="img_content_left">
            <span class="must">*</span>
            <span class="tips">商品图片</span>
          </div>
          <div class="img_up">
            <van-uploader :after-read="onProductOtherRead" accept="image/*" multiple>
              <van-icon name="photograph" />
            </van-uploader>
          </div>
          <span class="img_tips">图片上传要求：单张图片小于10M此处最多只能添加三张图片。</span>
        </div>
        <div class="img_select_box">
          <div class="img_box" v-for="(item,index) in imageData.g">
            <img class="img_delete" src="../assets/images/icon_img_delete.png" @click="deleteOtherImage(index)"/>
            <img class="img_select" :src="item.id ? fileHost+item.pd_url : item.pd_url"/>
          </div>
        </div>
      </div>
      <div class="bar"></div>
      <!--------商品属性-------------->
      <div class="add_box">
        <div class="add_content_left">
          <span class="tips">商品属性</span>
        </div>
      </div>
      <div class="attributes_box" v-for="(item,index) in attributesContent">
        <div class="img_content_left">
          <span class="must">*</span>
          <span class="tips">{{item.label}}</span>
        </div>
        <input class="attributes_input" type="text" placeholder="请输入内容"  v-model.trim="attributesContent[index].value"/>
      </div>
      <div class="bar"></div>
      <!--商品规格-->
    <div class="add_box">
      <div class="add_content_left">
        <span class="must">*</span>
        <span class="tips">商品规格</span>
      </div>
      <span @click="addSpec()">请添加<img src="../assets/images/icon_arrow_right.png"/></span>
    </div>
      <div class="spec_list" v-for="(specData,index) in specDataList" @click="checkDetailSpec(index)">
        <span class="spec_details_name">规格 {{index + 1}}</span>
        <div class="check_spec_box">
          <span class="check">查看</span>
          <img class="arrow" src="../assets/images/icon_my_arrow.png" />
        </div>
      </div>
      <div class="bar"></div>
      <!--满减活动-->
      <div class="add_box">
        <div class="add_content_left">
          <span class="must">*</span>
          <span class="tips">满减活动</span>
        </div>
        <span>
          <radio-button radio_name="active" radio_title="参与" style="margin-right: 1rem;" is-checked="isJionActivity == 1" radio_val="1" @radioChange="getisJionActivity"></radio-button>
          <radio-button radio_name="active" radio_title="不参与" radio_val="2" is-checked="isJionActivity == 2" @radioChange="getisJionActivity"></radio-button>
        </span>
      </div>
      <!--限购数量-->
      <div class="add_box">
        <div class="add_content_left">
          <span class="tips">单笔订单限购数量</span>
        </div>
        <input type="number" placeholder="输入限购数量" v-model.trim="limitNum">
      </div>
      <!--上架状态-->
      <div class="add_box" style="border: none;">
        <div class="add_content_left">
          <span class="must">*</span>
          <span class="tips">上架状态</span>
        </div>
        <span>
          <radio-button radio_name="g_status" radio_title="审核通过后，立即自动上架" radio_val="4" is-checked="productState == 4" @radioChange="getProductState"></radio-button>
        </span>
      </div>
      <div class="add_box">
        <div class="add_content_left" style="visibility: hidden;">
          <span class="must">*</span>
          <span class="tips">上架状态</span>
        </div>
        <span>
          <radio-button radio_name="g_status" radio_title="审核通过后，手动操作上架" radio_val="1" is-checked="productState == 1" @radioChange="getProductState"></radio-button>
        </span>
      </div>
    </div>
    <!--协议部分-->
    <div class="protocol">
      <p class="agreement">
        <van-checkbox v-model.trim="protocolChecked">
          <img id="img_chk" slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.normal"/>
          我已经阅读并同意
          <a href="" style="color: #4cc3ad;">《开店服务协议》</a>
        </van-checkbox>
      </p>
    </div>
    <span class="preserve_btn" @click="uploadImg">保存</span>
  </div>
</template>

<script>
  import TopHeader from '../components/TopHeader'
  import RadioButton from '../components/common/RadioButton.vue'
  import Toast from '../widget/Toast';
  import eventBus from  '../utils/eventBus'
  import * as API from '../service/API';
  import Loading from '../widget/loading/loading'
  import SuccessLoading from '../widget/sucess_loading/SuccessLoading'

  let person_index = 0;
  let other_indext = 0;

  export default {
    data(){
      return {
        protocolChecked:true,
        productName:'',
        introduction:'',
        brandInfo:'',
        brandInfoIds:'', //用于上传的 品牌ids
        limitNum:'',
        fileHost:'',
        g_id:0,
        selectSpec:{},
        specDataList:[],
        productState:'4',     //4 审核通过 立即上架   1 审核通过 手动上架
        isJionActivity:'1', // 是否参加活动，默认是参加
        categoryInfo:{}, // 捕获返回的对象
        categoryTxt:'请选择',  // 为了方便显示，拼接的分类名
        productLogo:[], // 商品头图
        productLogoExt:[], // 商品头图后缀

        productImages:[], //商品图片
        productImagesExt:[], //商品图片后缀

        responseLogoUrl:[],  //上传成功返回商品logo
        responseImages:[],   //上传返回的其他商品地址
        attributesInfo:[],   // 属性列表
        attributesContent:[],   // 保存输入的内容， 拷贝属性列表内容
        imageData:{
          a:[],
          g:[]
        },
        icon: {
          normal: '../../static/images/nocheck_out.png',
          active: '../../static/images/check_out.png'
        }
      }
    },
    created(){
      eventBus.$on('categorySelected',this.getCategory);
      eventBus.$on('getBrand',this.getBrandSelected);
      eventBus.$on('specData',this.getSpecData);
      eventBus.$on('delSpec',this.delSpecData);
    },
    mounted(){
      this.fileHost = process.env.ALY_IMG_URL;
      this.getGoodsData();
    },
    destroyed(){
      eventBus.$emit('spec',this.selectSpec);
    },
    methods:{
      addSpec(){
        sessionStorage.removeItem('TMEP_GOODS_SPEC_INFO')
        this.$router.push('/specEdit/0');
      },
      submit(){
        let imageData = this.imageData;
        let goodId = this.$route.params.id;
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
          loading.show();
          let data = {};
          data.goodsImg = [];
          tempimageData.g.forEach(v =>{
            if(v.id == -100){
              data.goodsImg.push(v.pd_url) ;
            }
          })
          data.gc_first_id = that.categoryInfo.firLevelId;
          data.gc_second_id = that.categoryInfo.secLevelId;
          data.gc_three_id = that.categoryInfo.thiLevelId;
          data.g_name = that.productName;
          data.gb_id = that.brandInfoIds;
          data.g_id = that.g_id;
          data.g_desc = that.introduction;
          data.is_join_activity = that.isJionActivity;
          data.g_order_num = that.limitNum;
          data.goodsHeadImg = tempimageData.a[0].pd_url;
          data.total_attr = that.attributesInfo[0].value;
          data.g_status = that.productState;  //4 审核通过 立即上架   1 审核通过 手动上架
          let g_standard = '';  //商品规格，逗号分隔
          for(let i = 0; i< that.specDataList.length; i++){
            g_standard = that.specDataList[i].gn_id + ',';
          }
          data.g_standard = g_standard;
          for(let i = 0; i<that.attributesContent.length; i++){
            let attributesName = that.attributesContent[i].name;
            data[attributesName] = that.attributesContent[i].value;
          }
          let requestUrl = API.BASEURL + `/goods/edit_goods/${goodId}.html`;
          that.$post(requestUrl,data).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg).show();
              return;
            }
            new SuccessLoading(response.msg).show();
            that.$router.replace("/goodDetails/"+that.g_id);
            loading.close();
          }).then((error)=>{
            loading.close();
          });
        })
      },
      delSpecData(index){
        console.log(index);
        this.specDataList.splice(index,1);
        console.log(this.specDataList);
      },
      getisJionActivity(val){
        this.isJionActivity = val;
      },
      getProductState(val){
        this.productState = val;
      },
      checkDetailSpec(index){
        let spec = this.specDataList[index];
        sessionStorage.setItem('TMEP_GOODS_SPEC_INFO', JSON.stringify(spec))
        //eventBus.$emit('specDetail',spec);
        this.$router.push(`/spec/${index + 1}`);
      },
      onProductLogoRead(file){
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
      onProductOtherRead(file){
        if(this.imageData.g.length < 3){
          let base64 = file.content;  // 文件路径
          let fileName = file.file.name; //文件名
          let ext_name = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();  //后缀名
          this.imageData.g.push({ext:ext_name,pd_url:base64,id:0});
        }else{
          new Toast('商品图片最多上传三张').show();
        }
      },
      deleteLogoImage(position){
        // if(this.imageData.a[position].id > 0){
        //   let loading = new Loading();
        //   loading.show();
        //   let data = {};
        //   data.id = this.imageData.a[position].id;
        //   data.p_type = 'a';
        //   this.$post(API.DEL_IAMGE,data).then((response)=>{
        //     if(response.code != 200){
        //       new Toast(response.msg).show();
        //       return;
        //     }
        //     new SuccessLoading('删除成功').show();
        //     this.imageData.a.splice(position, 1);
        //     loading.close();
        //   }).then((error)=>{
        //     loading.close();
        //   });
        // }else{
        //   this.imageData.a.splice(position, 1);
        // }
        this.imageData.a.splice(position, 1);

      },
      // 删除指定图片，position，图片位置
      deleteOtherImage(position){
        if(this.imageData.g[position].id > 0){
          let loading = new Loading();
          loading.show();
          let data = {};
          data.id = this.imageData.g[position].id;
          data.p_type = 'd';
          this.$post(API.DEL_IAMGE,data).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg).show();
              return;
            }
            new SuccessLoading('删除成功').show();
            this.imageData.g.splice(position, 1);
            loading.close();
          }).then((error)=>{
            loading.close();
          });
        }else{
          this.imageData.g.splice(position, 1);
        }

      },
      // 获取传递过来的规格对象
      getSpecData(content){
        if(content){
          var has_content = false;
          for (var index in this.specDataList ){
            if(this.specDataList[index].gn_id == content.gn_id){
              this.specDataList[index] = content;
              has_content = true;
            }
          }

          if(!has_content){
            this.specDataList.push(content);
          }
        }
      },
      getCategory(content){
        //要判断有值，再添加，避免空值覆盖
        if(content){
          this.categoryInfo = content;
          this.categoryTxt = this.categoryInfo.firLevelName + " " + this.categoryInfo.secLevelName
            + " " + this.categoryInfo.thiLevelName;
          this.getAttributeData( this.categoryInfo.firLevelId);
        }
      },
      //id 一级分类id
      getAttributeData(gc_id,g_id=0){
        let loading = new Loading();
        loading.show();
        let data = {};
        if(gc_id > 0){
          data['gc_id'] = gc_id;
        }
        if(g_id > 0){
          data['g_id'] = g_id;
        }
        this.$get(API.ATTRIBUTE_DATA,{},data).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }
          this.attributesInfo = response.data;
          this.attributesContent = this.attributesInfo.slice();
          // 删除首个元素，首个元素中是数据个数，不要显示出来
          this.attributesContent.splice(0,1);
          loading.close();
        }).then((error)=>{
          loading.close();
        });
      },
      getBrandSelected(content){

        if(content){
          let selectBrandIds = content.brandIds;
          let selectBrandNames = content.brandNames;
          // for(let i = 0; i<selectBrandIds.length;i++){
          //   this.brandInfo = + selectBrandNames[i] + ","  + this.brandInfo;
          //   this.brandInfoIds = selectBrandIds[i] + "," + this.brandInfoIds;
          // }
          console.log(selectBrandNames[0]);
          this.brandInfo = selectBrandNames[0];

          this.brandInfoIds = selectBrandIds[0];
          console.log(this.brandInfo);
          console.log(this.brandInfoIds);
        }
      },
      // 保存验证
      verification(){
        if(false == this.protocolChecked){
          new Toast('请先同意服务协议').show();
          return false;
        }
        if(!this.categoryInfo.firLevelId){
          new Toast("请选择商品分类").show();
          return false;
        }
        if(!this.brandInfoIds){
          new Toast("请选择商品品牌").show();
          return false;
        }
        if(!this.productName){
          new Toast("请输入商品名称").show();
          return false;
        }
        if(!this.introduction){
          new Toast("请输入商品描述").show();
          return false;
        }
        if(this.imageData.a.length==0){
          new Toast("请添加商品头图").show();
          return false;
        }
        if(this.imageData.g.length==0){
          new Toast("请添加商品图片").show();
          return false;
        }
        if(this.attributesInfo.length > 0){
          for(let i = 0; i<this.attributesContent.length; i++){
            if(!this.attributesContent[i].value){
              new Toast("商品属性"+this.attributesContent[i].label+"不能为空").show();
              return false;
            }
          }
        }

        if(this.specDataList.length==0){
          new Toast("请添加商品规格").show();
          return false;
        }

        return true;
      },
      //图片上传
      uploadImg(){
        if(false == this.verification()){
          return;
        }
        this.submit();
      },
      //给当前编辑的商品赋值
      getGoodsData(){
        let loading = new Loading();
        loading.show();
        let goodId = this.$route.params.id;
        let requestUrl = API.BASEURL + `/goods/edit_goods/${goodId}.html?g_id=${goodId}`;
        this.$get(requestUrl).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }
          this.productName = response.goods_data.gName;
          this.g_id = response.goods_data.gId;
          this.categoryTxt = response.top_level.gcName;

          this.introduction = response.goods_data.gDesc;
          this.productImages.push(response.goods_image.pd_url);
          this.isJionActivity = response.goods_data.isJoinActivity;
          this.limitNum = response.goods_data.gOrderNum;

          this.imageData.a.push({pd_url:response.goods_data.gImgs,id:-100});
          if(response.goods_image.d){
            this.imageData.g = response.goods_image.d;
          }

          if(response.brand_info){
            for(var index in response.brand_info){
              if(response.brand_info[index].gbId = response.goods_data.gbId){
                this.brandInfo = response.brand_info[index].gbName;
                this.brandInfoIds = response.goods_data.gbId;
              }
            }
          }

          if(response.gcInfos){
            this.categoryInfo.firLevelId = response.gcInfos.firstId;
            this.categoryInfo.secLevelId = response.gcInfos.secongId;
            this.categoryInfo.thiLevelId = response.gcInfos.threeId;

            this.categoryInfo.firLevelName = !response.gcInfos.firstInfo.gcName?"":response.gcInfos.firstInfo.gcName;
            this.categoryInfo.secLevelName = !response.gcInfos.secongInfo.gcName?"":response.gcInfos.firstInfo.gcName;
            this.categoryInfo.thiLevelName = !response.gcInfos.threeInfo.gcName?"":response.gcInfos.firstInfo.gcName;

            this.categoryTxt = this.categoryInfo.firLevelName + " " + this.categoryInfo.secLevelName
              + " " + this.categoryInfo.thiLevelName;
          }

          if(response.goods_data.gcTopId){
            this.getAttributeData(response.goods_data.gcTopId,response.goods_data.gId);
          }

          if(response.goods_spec){
            this.specDataList = response.goods_spec;
          }

          console.log(response.top_level);
          loading.close();
        }).then((error)=>{
          loading.close();
        });
      }
    },
    components:{TopHeader,RadioButton}
  }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  /*  灰色头部 */
.add_header {
  .header_title {
    background-color: #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0.46rem;
    padding-right: 0.46rem;
    height: 0.98rem;
    .title_left {
      display: flex;
      justify-content: center;
      .must{
        color: #e36348;
      }
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
  }
  /*  包input的盒子 */
  .add_box {
    display: flex;
    justify-content: space-between;
    height: 1.74rem;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    .add_content_left {
      display: flex;
      justify-content: center;
      padding-left: 0.51rem;
      .must {
        color: #e36348;
        padding-top: 0.1rem;
        padding-right: 0.1rem;
      }
      .tips {
        font-size: 0.48rem;
        color: $font_100;
      }
    }
    img{
      width: 0.2rem;
      height: 0.3rem;
    }
    span{
      font-size: .48rem;
      color: #666666;
      padding-right: 0.51rem;
      img{
        margin-left: .15rem;
      }
    }
    input{
      text-align: right;
      padding-right: 0.51rem;
    }
    input::-webkit-input-placeholder{
      text-align: right;
    }
  }
  /*属性列表*/
  .add_content_bottom{
    display: flex;
    padding: 0 .51rem;
    border-bottom: 1px solid #eeeeee;
    textarea{
      width: 100%;
      display: block;
      height: 2.05rem;
      border: 1px dashed #989898;
      padding: .3rem;
      margin-bottom: .6rem;
    }
  }
  .attributes_box{
    display: flex;
    height: 1.80rem;
    justify-content: space-between;
    align-items: center;
    .img_content_left {
      display: flex;
      justify-content: center;
      padding-left: 0.51rem;
      .must {
        color: #e36348;
        padding-top: 0.1rem;
        padding-right: 0.1rem;
      }
      .tips {
        white-space: nowrap;
        font-size: 0.48rem;
        color: $font_100;
      }
    }
    .attributes_input{
      text-align: right;
      padding-right: 0.62rem;
      font-size: 0.48rem;
    }
  }
   /*规格列表*/
  .spec_list{
    height: 1.74rem;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .spec_details_name{
      padding-left: 1.18rem;
      color: #1a1b39;
      font-size: 0.48rem;
    }
    .check_spec_box{
      display: flex;
      align-items: center;
      padding-right: 0.52rem;
      .check{
        padding-right: 0.3rem;
        color: #cdcdd1;
        font-size: 0.48rem;
      }
      .arrow{
        width: 0.2rem;
        height: 0.3rem;
      }
    }
  }

   /*   bar隔离条   */
  .bar{
    height: .26rem;
    background-color: #eee;
    width: 100%;
  }
  /*  包含图片上传的盒子 */
  .add_img_box {
    padding-top: 0.51rem;
    padding-bottom: 0.46rem;
    display: flex;
    border-bottom: 1px solid #eeeeee;
    .img_content_left {
      display: flex;
      justify-content: center;
      padding-left: 0.51rem;
      .must {
        color: #e36348;
        padding-top: 0.1rem;
        padding-right: 0.1rem;
      }
      .tips {
        white-space: nowrap;
        font-size: 0.48rem;
        color: $font_100;
      }
    }
    .img_up {
      padding-left: 0.45rem;
      width: 1.88rem;
      height: 1.88rem;
    }
    .img_tips {
      padding-left: 0.45rem;
      color: #666666;
      font-size: 0.32rem;
    }
  }
  /*图片展示部分*/
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
}
/*协议*/
.protocol{
  padding-top: 0.3rem;
  padding-bottom: 2.56rem;
  background-color: #eeeeee;
.agreement{
  padding-left: 0.51rem;
  font-size:.4rem;
  color: $font_100;
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
</style>
