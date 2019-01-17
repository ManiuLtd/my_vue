<template>
  <div>
    <top-header title-txt="添加商品"></top-header>
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
        <input type="text" maxlength="20" placeholder="输入商品名称(20字以内)" v-model.trim="productName">
      </div>
      <!--商品分类-->
      <router-link to="/category">
        <div class="add_box">
          <div class="add_content_left">
            <span class="must">*</span>
            <span class="tips">商品分类</span>
          </div>
          <span>{{categoryTxt}}<img src="../assets/images/icon_arrow_right.png"/></span>
        </div>
      </router-link>
      <!--商品品牌-->
      <div class="add_box" @click="toBrand">
        <div class="add_content_left">
          <span class="tips">商品品牌</span>
        </div>
        <span>{{brandInfo}}<img src="../assets/images/icon_arrow_right.png"/></span>
      </div>
      <!--商品介绍-->
      <div class="add_box" style="border: none;">
        <div class="add_content_left">
          <span class="must">*</span>
          <span class="tips">商品介绍</span>
        </div>
      </div>
      <div class="add_content_bottom">
        <textarea placeholder="输入该商品的详细描述(100字以内)" maxlength="100" v-model.trim="introduction"></textarea>
      </div>
      <!--商品头图-->
      <div class="product_logo_box">
        <div class="add_img_box">
          <div class="img_content_left">
            <span class="must">*</span>
            <span class="tips">商品头图</span>
          </div>
          <div class="img_up">
            <!--选择图片-->
            <div class="open_album_box">
              <input class="open_album" id="input_product_logo" type="file"
                     accept="image/x-png, image/jpg, image/jpeg" @change="onProductLogoRead"/>
            </div>
          </div>
          <span class="img_tips">图片上传要求：单张图片小于10M此处最多只能添加一张图片。</span>
        </div>
        <div class="img_select_box">
          <div class="img_box" v-for="(item,index) in imageData.a">
            <img class="img_delete" src="../assets/images/icon_img_delete.png" @click="deleteLogoImage(index)"/>
            <img class="img_select" :src="item.id == 0 ? item.pd_url : `${fileHost}${item.pd_url}`"/>
          </div>
        </div>
      </div>
      <!--商品图片-->
      <div class="product_logo_box">
        <div class="add_img_box">
          <div class="img_content_left">
            <span class="must">*</span>
            <span class="tips">商品图片</span>
          </div>
          <div class="img_up">
            <!--选择图片-->
            <div class="open_album_box">
              <input class="open_album" id="input_product_img" type="file"
                     accept="image/x-png, image/jpg, image/jpeg" @change="onProductOtherRead"/>
            </div>
          </div>
          <span class="img_tips">图片上传要求：单张图片小于10M此处最多只能添加三张图片。</span>
        </div>
        <div class="img_select_box">
          <div class="img_box" v-for="(item,index) in imageData.g">
            <img class="img_delete" src="../assets/images/icon_img_delete.png" @click="deleteOtherImage(index)"/>
            <img class="img_select" :src="item.id == 0 ? item.pd_url : fileHost+item.pd_url"/>
          </div>
        </div>
      </div>
      <div class="bar"></div>
      <!--------商品属性-------------->
      <div class="add_box" @click="editAttribute">
        <div class="add_content_left">
          <span class="tips">商品属性</span>
        </div>
        <span>请添加<img src="../assets/images/icon_arrow_right.png"/></span>
      </div>
      <div class="attr_info" v-if="attributesInfoLength > 0">
        <div class="attr_info_item" v-for="item in attributesInfo">
          <span class="attr_title">{{item.pn_name}}</span>
          <span class="attr_content">{{item.pv_value}}</span>
        </div>
      </div>
      <div class="bar"></div>
      <!--商品规格-->
      <div class="add_box" @click="addProductSpec">
        <div class="add_content_left">
          <span class="must">*</span>
          <span class="tips">商品规格</span>
        </div>
        <span>请添加<img src="../assets/images/icon_arrow_right.png"/></span>
      </div>
      <div class="spec_info" v-if="specDataListLength > 0">
        <div class="spec_list" v-for="(specInfo,index) in specInfos">
          <!--这儿认为字符串拼接了，变为规格01，规格02，这种，通过减法，改变下数据类型，不要字符串拼接-->
          <span class="spec_index_num">规格{{index - 0 + 1}}</span>
          <span class="spec_desc" v-html="specInfo.gdesc"></span>
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
          <radio-button radio_name="active" radio_title="参与" style="margin-right: 1rem;" :is-checked="isJionActivity == 1" radio_val="1" @radioChange="getisJionActivity"></radio-button>
          <radio-button radio_name="active" radio_title="不参与" radio_val="2" @radioChange="getisJionActivity" :is-checked="isJionActivity == 2"></radio-button>
        </span>
      </div>
      <!--限购数量-->
      <div class="add_box">
        <div class="add_content_left">
          <span class="tips">单笔订单限购数量</span>
        </div>
        <input type="number" placeholder="输入限购数量" v-model.trim="limitNum" style="width: 45%;">
      </div>
      <!--上架状态-->
      <div class="add_box" style="border: none;">
        <div class="add_content_left">
          <span class="must">*</span>
          <span class="tips">上架状态</span>
        </div>
        <span>
          <radio-button radio_name="g_status" radio_title="审核通过后，立即自动上架" :is-checked="productState == 4" radio_val="4"
                        @radioChange="getProductState"></radio-button>
        </span>
      </div>
      <div class="add_box">
        <div class="add_content_left" style="visibility: hidden;">
          <span class="must">*</span>
          <span class="tips">上架状态</span>
        </div>
        <span>
          <radio-button radio_name="g_status" radio_title="审核通过后，手动操作上架" radio_val="1" :is-checked="productState == 1"
                        @radioChange="getProductState"></radio-button>
        </span>
      </div>
    </div>
    <!--协议部分-->
    <div class="protocol">
      <p class="agreement">
        <van-checkbox v-model.trim="protocolChecked">
          <img id="img_chk" slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.normal"/>
        </van-checkbox>
        我已经阅读并同意
        <router-link to="/goodsRelease">
          <span class="protocol_agreement_span">《商品发布规格》</span>
        </router-link>
      </p>
    </div>
    <span :class="bottom_btn_style" @click="submit">确定添加</span>
    <loading :schedule="uploadSchedule" v-if="isShowLoading"></loading>
  </div>
</template>

<script>
  import TopHeader from '../components/TopHeader'
  import RadioButton from '../components/common/RadioButton.vue'
  import Toast from '../widget/Toast';
  import eventBus from '../utils/eventBus'
  import * as API from '../service/API';
  import ImageCompress from '../utils/ImageCompress';
  import * as constant from '../utils/constant';
  import axios from 'axios';
  import Loading from '../components/Loading'

  export default {
    data() {
      return {
        protocolChecked: true,
        productName: '',
        introduction: '',
        brandInfo: '',
        brandInfoIds: '', //用于上传的 品牌ids
        limitNum: '',
        fileHost: process.env.ALY_IMG_URL,
        uploadSchedule:0,
        isShowLoading:false,
        specInfos: [],
        specDataListLength: '',
        productState: '4',     //4 审核通过 立即上架   1 审核通过 手动上架
        isJionActivity: '2', // 是否参加活动，默认是参加
        categoryInfo: {}, // 捕获返回的对象
        categoryTxt: '请选择',  // 为了方便显示，拼接的分类名
        productLogo: [], // 商品头图
        productLogoExt: [], // 商品头图后缀
        productImages: [], //商品图片
        productImagesExt: [], //商品图片后缀
        responseLogoUrl: [],  //上传成功返回商品logo
        responseImages: [],   //上传返回的其他商品地址
        attributesInfo: [],   // 属性列表
        attributesInfoLength:'',
        minPrice:0, //最低价格
        specsInfoArray:[],
        icon: {
          normal: '../../static/images/nocheck_out.png',
          active: '../../static/images/check_out.png'
        },
        imageData: {
          a: [],
          g: []
        },
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
    deactivated(){
      window.onresize = null;
      axios.defaults.showLoading = true; //默认显示loading
    },
    created() {
      eventBus.$on('categorySelected', this.getCategory);
      eventBus.$on('getBrand', this.getBrandSelected);
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
      // 传最后一级的分类id
      getCateId(){
        let cateId = this.categoryInfo.thiLevelId;
        if(!cateId){
          cateId = this.categoryInfo.secLevelId;
          if(!cateId){
            cateId = this.categoryInfo.firLevelId;
          }
        }
        return cateId;
      },
      editAttribute(){
        let cateId = this.getCateId();
        if(cateId){
          this.$router.push({name:'productAttribute',params: { cateId: cateId }});
        }else{
          new Toast("请先选择商品分类").show();
        }
      },
      addProductSpec() {
        let cateId = this.getCateId();
        if(cateId){
          this.$router.push({name:'productSpec',params: { cateId: cateId}});
        }else{
          new Toast("请先选择商品分类").show();
        }
      },
      // 查看商品品牌
      toBrand(){
        let cateId = this.getCateId();
        if(cateId){
          this.$router.push(`/brand/${cateId}`);
        }else{
          new Toast("请先选择商品分类").show();
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
      // 封装接口属性内容
      getInterAttr(){
        let attrInfoArray = [];
        if(this.attributesInfo){
          let length = this.attributesInfo.length;
          for (let i = 0; i<length;i++){
            let attrInfo = this.attributesInfo[i];
            let attrObj = {};
            attrObj.pn_id =  attrInfo.pn_id;//属性名id
            attrObj.pp_val =  attrInfo.pv_value;//文本属性值
            attrInfoArray.push(attrObj);
          }
        }
        return attrInfoArray;
      },
      // 封装接口所需规格属性
      getInterSpec(){
        this.specsInfoArray = [];
        if(this.specInfos){
          for (let info of this.specInfos){
            let specObj = {};
            specObj.ps_num = info.stock;
            specObj.ps_price = info.price;
            specObj.ps_name = info.sDesc;
            specObj.ps_properties = info.sId;
            this.specsInfoArray.push(specObj);
            // 封装获取最低金额
            if(0 == this.minPrice){
              this.minPrice = info.price;
            }
            if(this.minPrice > info.price){
              this.minPrice = info.price;
            }
          }
        }
      },
      submitInfo(){
        this.getInterSpec();
        let tempimageData = JSON.parse(JSON.stringify({a: this.imageData.a, g: this.imageData.g}));
        let data = {};
        data.goodsImg = [];
        data.gc_first_id = this.categoryInfo.firLevelId;
        data.gc_second_id = this.categoryInfo.secLevelId;
        data.gc_three_id = this.categoryInfo.thiLevelId;
        data.g_name = this.productName;
        data.gb_id = this.brandInfoIds;
        data.g_desc = this.introduction;
        data.is_join_activity = this.isJionActivity;
        data.g_order_num = this.limitNum;
        data.skus = this.specsInfoArray;
        data.g_price = this.minPrice;
        data.g_attrs = this.getInterAttr();
        data.g_status = this.productState;  //4 审核通过 立即上架   1 审核通过 手动上架
        data.goodsHeadImg = tempimageData.a[0].pd_url;
        tempimageData.g.forEach(v => {
          data.goodsImg.push(v.pd_url);
        })
        let requestUrl = API.BASEURL + '/goods/edit_goods/0.html';
        this.$post(requestUrl, data).then((response) => {
          this.uploadSchedule = 100;
          this.isShowLoading = false;
          if (response.code != 200) {
            new Toast(response.msg).show();
            return;
          }
          this.$router.replace("/addGoodSuccess");
        });
      },
      submit(){
        if (!this.verification()) {
          return false;
        }
        axios.defaults.showLoading = false; //默认显示loading
        this.uploadSchedule = 0;  // 重置
        this.isShowLoading = true;
        this.uploadProductLogo(this.imageData.a.length - 1);
      },
      getisJionActivity(val) {
        this.isJionActivity = val;
      },
      getProductState(val) {
        this.productState = val;
      },
      addSpec() {
        sessionStorage.removeItem('TMEP_GOODS_SPEC_INFO')
        this.$router.push('/specEdit/0');
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
            new Toast('商品图片最多上传三张').show();
          }
        });
      },
      deleteLogoImage(position) {
        this.imageData.a.splice(position, 1);
      },
      // 删除指定图片，position，图片位置
      deleteOtherImage(position) {
        this.imageData.g.splice(position, 1);
      },
      getCategory(content) {
        //要判断有值，再添加，避免空值覆盖
        if (content) {
          this.categoryInfo = content;
          this.categoryTxt = this.categoryInfo.firLevelName;
          if(this.categoryInfo.secLevelName){
            this.categoryTxt = this.categoryTxt + '/'+this.categoryInfo.secLevelName;
          }
          if(this.categoryInfo.thiLevelName){
            this.categoryTxt = this.categoryTxt + '/'+this.categoryInfo.thiLevelName;
          }
          //清空品牌
          this.brandInfo = '';
          this.brandInfoIds = '';
          //清空属性
          this.attributesInfo = [];
          //清空规格
          this.specInfos = [];
          this.$store.dispatch('clearGoods');
        }
      },
      getBrandSelected(content) {
        if (content) {
          let selectBrandIds = content.brandIds;
          let selectBrandNames = content.brandNames;
          this.brandInfo = selectBrandNames[0];
          this.brandInfoIds = selectBrandIds[0];
        }
      },
      // 保存验证
      verification() {
        if (false == this.protocolChecked) {
          new Toast('请先同意服务协议').show();
          return false;
        }
        if (!this.categoryInfo.firLevelId) {
          new Toast("请选择商品分类").show();
          return false;
        }
        if (!this.productName) {
          new Toast("请输入商品名称").show();
          return false;
        }
        if (!this.introduction) {
          new Toast("请输入商品描述").show();
          return false;
        }
        if (this.imageData.a.length == 0) {
          new Toast("请添加商品头图").show();
          return false;
        }
        if (this.imageData.g.length == 0) {
          new Toast("请添加商品图片").show();
          return false;
        }
        if (this.specInfos.length == 0) {
          new Toast("请添加商品规格").show();
          return false;
        }
        if (this.limitNum!='') {
          let reg = /^[1-9]\d*$/;
          if(!reg.test(this.limitNum)){
            new Toast("单笔订单限购数量非负整数").show();
            return false;
          }
        }
        return true;
      },
    },
    activated(){
      this.attributesInfo = this.$store.state.goods.attribute;
      this.specInfos = this.$store.state.goods.specInfos;
      this.attributesInfoLength = this.attributesInfo==null||undefined ? 0 : this.attributesInfo.length;
      this.specDataListLength = this.specInfos==null||undefined ? 0 :this.specInfos.length;
      this.resizeWindow();
      if(this.$route.meta.isRefresh){
        this.$store.dispatch('clearGoods');
        Object.assign(this.$data, this.$options.data())
        this.$route.meta.isRefresh = false;
      }
    },
    components: {TopHeader, RadioButton,Loading}
  }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  /*  灰色头部 */
  .add_header {
    margin-top: 1.61rem;
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
        .must {
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
      img {
        width: 0.2rem;
        height: 0.3rem;
      }
      span {
        font-size: .48rem;
        color: #666666;
        padding-right: 0.51rem;
        img {
          margin-left: .15rem;
        }
      }
      input {
        font-size: .48rem;
        text-align: right;
        padding-right: 0.51rem;
      }
      input::-webkit-input-placeholder {
        text-align: right;
      }
    }
    .attr_info{
      padding:0.6rem;
      .attr_info_item{
        padding-bottom: .55rem;
        display: flex;
        flex-direction: column;
        .attr_title{
          color: #999999;
          font-size: 0.4rem;
        }
        .attr_content{
          padding-top: 0.3rem;
          color: #1a1b39;
          font-size: 0.48rem;
        }
      }
    }
    /*属性列表*/
    .add_content_bottom {
      display: flex;
      padding: 0 .51rem;
      border-bottom: 1px solid #eeeeee;
      textarea {
        width: 100%;
        font-size: .48rem;
        display: block;
        height: 2.05rem;
        border: 1px dashed #989898;
        padding: .3rem;
        margin-bottom: .6rem;
      }
    }
    /*规格列表*/
    .spec_info{
      padding:.6rem;
      .spec_list {
        padding-bottom: .55rem;
        background-color: white;
        .spec_index_num{
          display: block;
          color: #999999;
          font-size: 0.4rem;
        }
        .spec_desc{
          padding-top: 0.3rem;
          display: block;
          color: #1a1b39;
          font-size: 0.48rem;
        }
      }
    }

    /*   bar隔离条   */
    .bar {
      height: .26rem;
      background-color: #eee;
      width: 100%;
    }
    /*  包含图片上传的盒子 */
    .product_logo_box{
      border-bottom: 1px solid #eeeeee;
      .add_img_box {
        padding-top: 0.51rem;
        padding-bottom: 0.46rem;
        display: flex;
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
          padding: 0 0.51rem 0 0.45rem;
          color: #666666;
          font-size: 0.32rem;
        }
      }
    }
    /*图片展示部分*/
    .img_select_box {
      background-color: white;
      padding: 0.55rem 0.51rem;
      .img_box {
        display: inline-block;
        position: relative;
        width: 1.88rem;
        height: 1.88rem;
        padding-right: 0.2rem;
        margin-right:.3rem;
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
  }
  /*协议*/
  .protocol {
    padding-top: 0.3rem;
    padding-bottom: 2.56rem;
    background-color: #eeeeee;
    .agreement {
      display: flex;
      padding-left: 0.51rem;
      font-size: .4rem;
      color: $font_100;
      img {
        width: 0.83rem;
        height: 0.82rem;
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
  /*选择图片*/
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
