<template>
  <div>
    <top-header title-txt="编辑商品"></top-header>
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
        <input type="text" maxlength="20" placeholder="输入商品名称(20字以内)" v-model="goods_data.gName" :readonly="isNOEdit"/>
      </div>
      <!--商品分类-->
      <div class="add_box" @click="toCategory">
        <div class="add_content_left">
          <span class="must">*</span>
          <span class="tips">商品分类</span>
        </div>
        <span>{{categoryTxt}}</span>
      </div>
      <!--商品品牌-->
      <div class="add_box" @click="toBrand">
        <div class="add_content_left">
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
        <textarea placeholder="输入该商品的详细描述(100字以内)" maxlength="100" v-model.trim="goods_data.gDesc"></textarea>
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
        <span>编辑<img src="../assets/images/icon_arrow_right.png"/></span>
      </div>
      <div class="attr_info">
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
      <div class="spec_info">
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
        <input type="number" placeholder="输入限购数量" v-model.trim="goods_data.gOrderNum" style="width: 45%;">
      </div>
      <!--上架状态-->
      <div class="add_box" style="border: none;" v-if="goods_data.gStatus != '5'">
        <div class="add_content_left">
          <span class="must">*</span>
          <span class="tips">上架状态</span>
        </div>
        <span>
          <radio-button radio_name="g_status" radio_title="审核通过后，立即自动上架" :is-checked="productState == 4" radio_val="4"
                        @radioChange="getProductState"></radio-button>
        </span>
      </div>
      <div class="add_box" v-if="goods_data.gStatus != '5'">
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
    <span :class="bottom_btn_style" @click="submit">保存</span>
    <loading :schedule="uploadSchedule" v-if="isShowLoading"></loading>
  </div>
</template>

<script>
  import TopHeader from '../components/TopHeader'
  import RadioButton from '../components/common/RadioButton.vue'
  import Toast from '../widget/Toast';
  import eventBus from '../utils/eventBus'
  import * as API from '../service/API';
  import SuccessLoading from '../widget/sucess_loading/SuccessLoading'
  import ImageCompress from '../utils/ImageCompress';
  import * as constant from '../utils/constant';
  import axios from 'axios';
  import Loading from '../components/Loading'

  export default {
    data() {
      return {
        protocolChecked: true,
        brandInfo: '',
        brandInfoIds: '', //用于上传的 品牌ids
        limitNum: '',
        goods_data:{}, //商品信息
        fileHost: process.env.ALY_IMG_URL,
        uploadSchedule:0,
        isShowLoading:false,
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
        delSpecIds:[],
        isNOEdit:false,
        icon: {
          normal: '../../static/images/nocheck_out.png',
          active: '../../static/images/check_out.png'
        },
        imageData: {
          a: [],
          g: []
        },
        clientHeight:document.documentElement.clientHeight,
        bottom_btn_style:'btn_fixed',
        specInfos: [],
        minPrice:0, //最低价格
        specsInfoArray:[],
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
          let gId = this.goods_data.gId; //商品id
          this.$router.push({name:'productAttribute',params: { cateId: cateId, gId: gId}});
        }else{
          new Toast("请先选择商品分类").show();
        }
      },
      addProductSpec() {
        let cateId = this.getCateId();
        if(cateId){
          let gId = this.goods_data.gId; //商品id
          this.$router.push({name:'productSpec',params: { cateId: cateId, gId: gId}});
        }else{
          new Toast("请先选择商品分类").show();
        }
      },
      // 选择分类
      toCategory(){
        if(this.isNOEdit){
          return;
        }
        this.$router.push('/category');
      },
      // 查看商品品牌
      toBrand(){
        if(this.isNOEdit){
          return;
        }
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
            specObj.ps_id = info.sku_id;
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
        let data = {};
        let tempimageData = JSON.parse(JSON.stringify({a: this.imageData.a, g: this.imageData.g}));
        data.goodsImg = [];
        tempimageData.g.forEach(v => {
          if (v.id == -100) {
            data.goodsImg.push(v.pd_url);
          }
        })
        data.g_id = this.goods_data.gId;
        data.g_name = this.goods_data.gName;
        data.gc_first_id = this.categoryInfo.firLevelId;
        data.gc_second_id = this.categoryInfo.secLevelId;
        data.gc_three_id = this.categoryInfo.thiLevelId;
        data.gb_id = this.brandInfoIds;
        data.g_desc = this.goods_data.gDesc;
        data.is_join_activity = this.isJionActivity;
        data.g_order_num = this.goods_data.gOrderNum;
        data.g_price = this.minPrice;
        data.del_skus = this.delSpecIds;
        data.skus = this.specsInfoArray;
        data.g_attrs = this.getInterAttr();
        data.g_status = this.productState;  //4 审核通过 立即上架   1 审核通过 手动上架
        data.goodsHeadImg = tempimageData.a[0].pd_url;
        let requestUrl = API.BASEURL + '/goods/edit_goods/0.html';
        this.$post(requestUrl, data).then((response) => {
          this.uploadSchedule = 100;
          this.isShowLoading = false;
          if (response.code != 200) {
            new Toast(response.msg).show();
            return;
          }
          new SuccessLoading('商品编辑成功').show();
          this.$router.replace("/shopList");
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
        if (this.imageData.g[position].id > 0) {
          let data = {};
          data.id = this.imageData.g[position].id;
          this.$post(API.DEL_IAMGE, data).then((response) => {
            if (response.code != 200) {
              new Toast(response.msg).show();
              return;
            }
            new SuccessLoading('删除成功').show();
            this.imageData.g.splice(position, 1);
          });
        } else {
          this.imageData.g.splice(position, 1);
        }
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
        if (!this.goods_data.gName) {
          new Toast("请输入商品名称").show();
          return false;
        }
        if (!this.goods_data.gDesc) {
          new Toast("请输入商品介绍").show();
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
        if (this.goods_data.gOrderNum != '') {
          let reg = /^[1-9]\d*$/;
          if(!reg.test(this.goods_data.gOrderNum)){
            new Toast("单笔订单限购数量非负整数").show();
            return false;
          }
        }
        return true;
      },
      // 获取商品详情数据
      getGoodsData() {
        let goodId = this.$route.params.id;
        let requestUrl = API.BASEURL + `/goods/edit_goods/${goodId}.html?g_id=${goodId}`;
        this.$get(requestUrl).then((response) => {
          if (response.code != 200) {
            new Toast(response.msg).show();
            return;
          }
          this.goods_data = response.goods_data;
          if(this.goods_data.gStatus){
            this.isNOEdit = this.goods_data.gStatus == 3 ? false : true;  //3 为打回，可编辑状态, 不为3，不可编辑
          }
          //是否参加活动
          this.isJionActivity = this.goods_data.isJoinActivity;
          //赋值商品分类信息
          let gcInfos = response.gcInfos;
          if (gcInfos) {
            this.categoryInfo.firLevelId = gcInfos.firstId;
            this.categoryInfo.secLevelId = gcInfos.secongId;
            this.categoryInfo.thiLevelId = gcInfos.threeId;

            this.categoryInfo.firLevelName = !gcInfos.firstInfo.gcName ? "" : gcInfos.firstInfo.gcName;
            this.categoryInfo.secLevelName = !gcInfos.secongInfo.gcName ? "" :gcInfos.secongInfo.gcName;
            this.categoryInfo.thiLevelName = !gcInfos.threeInfo.gcName ? "" : gcInfos.threeInfo.gcName;
            this.getCategory(this.categoryInfo);
          }
          //添加商品头图
          this.imageData.a.push({pd_url: response.goods_data.gImgs, id: -100});
          if (response.goods_image.d) {
            this.imageData.g = response.goods_image.d;
          }

          //获取商品属性
          let gcId =  this.goods_data.gcId; // 分类id
          let gId = this.goods_data.gId; //商品id
          this.getAttributeData(gId,gcId);
          //获取商品规格 (展示部分)
          let sku_data = response.sku_data;
          if(sku_data){
            this.specInfos = []; //做下数据重置，保护操作
            for (let item of sku_data){
              let info = {};
              info.sku_id = item.sku_id;
              info.gdesc = `￥${item.ps_price}/${item.ps_name} 余${item.ps_num}件`;
              info.price = item.ps_price;
              info.sId = item.ps_properties;
              info.sDesc = item.ps_name;
              info.stock = item.ps_num;
              let edit_info = item.edit_info;
              if(edit_info&&edit_info.length>0){
                let infoContent = '';
                for (let info of edit_info) {
                  infoContent = infoContent + info + '<br/>';
                }
                info.sInfo = infoContent;
              }
              this.specInfos.push(info);
            }

            this.$store.dispatch('saveSpecInfo',this.specInfos);
          }
          //获取商品品牌
          let brand_info = response.brand_info;
          if (brand_info) {
            let gbId = this.goods_data.gbId;
            for (let item of brand_info) {
              if (item.gbId == gbId) {
                this.brandInfo = item.gbName;
                this.brandInfoIds = gbId;
              }
            }
          }
        })
      },
      //获取商品属性 gId
      getAttributeData(gId,gcId) {
        this.$get(API.ATTRIBUTE_DATA + `?gc_id=${gcId}&g_id=${gId}`).then((response) => {
          if (response.code != 200) {
            new Toast(response.msg).show();
            return;
          }
          this.attributesInfo = response.data.no_sale;
        });
      },
    },
    activated(){
      let store_attribut = this.$store.state.goods.attribute;
      if(store_attribut&&store_attribut.length>0){ // 因为编辑页面， this.attributesInfo是被赋值过的，然后，如果属性页面直接返回，store中没值，就会清空原有数据
        this.attributesInfo = store_attribut;
      }
      let specInfos = this.$store.state.goods.specInfos;
      if(specInfos&&specInfos.length>0){
        this.specInfos = specInfos;
      }
      let delSpecIds = this.$store.state.goods.delSpecIds;
      if(delSpecIds&&delSpecIds.length>0){
        this.delSpecIds = delSpecIds;
      }
      this.resizeWindow();
      if(this.$store.state.pageRouter.isRefresh){
        this.$store.dispatch('clearDelSpecInfo');
        this.$store.dispatch('clearGoods');
        //数据清空，重新请求
        Object.assign(this.$data, this.$options.data())
        this.getGoodsData();
      }
      this.$store.dispatch('setIsRefresh',false);
    },
    mounted(){
      // 这儿调用的目的：兼容F5，浏览器，中的刷新操作，使其刷新的时候，数据依然存在
      this.getGoodsData();
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
