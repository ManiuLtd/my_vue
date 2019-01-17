<template>
  <div class="shop_create_content">
    <top-header title-txt="商户认证"></top-header>
    <form class="content" style="padding-bottom: 3.6rem">
      <div class="input_content">
        <ul class="input_box">
          <li class="title_bar">
              <p class="title_left">
                <img src="../assets/images/icon_line.png">
                <span>实名认证</span>
              </p>
          </li>
          <li class="input_div">
            <label><span class="must">*</span>姓名</label>
            <input type="text" placeholder="输入姓名" v-model.trim="username">
          </li>
          <li class="input_div">
            <label><span class="must">*</span>身份证号</label>
            <input type="text" placeholder="输入身份证号码" v-model.trim="idNum">
          </li>
          <li class="title_bar">
            <p class="title_left">
              <img src="../assets/images/icon_line.png">
              <span>资料信息</span>
            </p>
          </li>
          <li class="input_div">
            <router-link to="/address">
              <label><span class="must">*</span>居住地址</label>
              <input type="text" readonly="readonly" v-bind:value='addressInfo.name' name="" style="margin-right: .3rem;">
              <i class="icon_arrow"></i>
            </router-link>
          </li>
          <li class="input_div">
            <label><span class="must">*</span>详细地址</label>
            <input type="text" placeholder="输入详细地址" v-model.trim="detailAddress">
          </li>
          <li class="input_div">
            <router-link to="/trade">
              <label><span class="must">*</span>行业类别</label>
              <input type="text" readonly="readonly" v-model="tradeName" name="" style="margin-right: .3rem;">
              <i class="icon_arrow"></i>
            </router-link>
          </li>
          <!--<li class="input_div">-->
            <!--<router-link to="/goodsCat">-->
              <!--<label><span class="must">*</span>销售品类</label>-->
              <!--<input type="text" readonly="readonly" placeholder="请选择"  v-bind:value='brand_data.brand' name="" style="margin-right: .3rem;">-->
              <!--<i class="icon_arrow"></i>-->
            <!--</router-link>-->
          <!--</li>-->
          <li class="input_div">
            <label><span class="must">*</span>邀请码</label>
            <input type="text" readonly placeholder="输入邀请码" v-model.trim="servicePserson">
          </li>
          <div class="input_img_warp">
            <div class="input_img">
              <label><span class="must">*</span>证件资料</label>
              <div class="open_album_box">
                <input class="open_album" id="input_person_img" type="file"
                       accept="image/x-png, image/jpg, image/jpeg" @change="onPersonRead"/>
              </div>
              <p class="tips">请上传身份证正反面照、手持身份证照、营业执照4张。上传注意证件照片上的文字清晰可见。</p>
            </div>
            <div class="img_select_box">
              <div class="img_box" v-for="(item,index) in imageData.a">
                <img class="img_delete" src="../assets/images/icon_img_delete.png" @click="deletePersonImage(index)"/>
                <img class="img_select" :src="item.id ? fileHost+item.pd_url : item.pd_url"/>
              </div>
            </div>
          </div>
          <div class="input_img_warp">
            <div class="input_img">
              <label><span class="must"></span>其他资料</label>
              <div class="open_album_box">
                <input class="open_album" id="input_other_img" type="file"
                       accept="image/x-png, image/jpg, image/jpeg" @change="onOtherRead"/>
              </div>
              <p class="tips">请注意证件照片上的文字清晰可见,限制3张。</p>
            </div>
            <div class="img_select_box">
              <div class="img_box" v-for="(item,index) in imageData.g">
                <img class="img_delete" src="../assets/images/icon_img_delete.png" @click="deleteOtherImage(index)"/>
                <img class="img_select" :src="item.id ? fileHost+item.pd_url : item.pd_url"/>
              </div>
            </div>
          </div>
        </ul>
      </div>
      <p class="must_title"><span class="must">*</span>为必填项，请确保照片资料真实有效。</p>
    </form>
    <span :class="bottom_btn_style" v-on:click="uploadImg" >确认认证</span>
    <loading :schedule="uploadSchedule" v-if="isShowLoading"></loading>
  </div>
</template>
<script>
  import TopHeader from '../components/TopHeader'
  import * as API from '../service/API';
  import Toast from '../widget/Toast';
  import ImageCompress from '../utils/ImageCompress';
  import * as constant from '../utils/constant';
  import axios from 'axios';
  import Loading from '../components/Loading'
  import eventBus from '../utils/eventBus'

  export default {
    data() {
      return {
        username:'', //姓名
        idNum:'', //身份证号
        addressInfo:{}, //地址信息
        brand_data:{}, // 销售品类数据
        activeName: '0',
        uploadSchedule:0,
        isShowLoading:false,
        partnerStatus: '',
        partnerName: '',
        fileHost: process.env.ALY_IMG_URL,
        detailAddress:'', //详细地址
        servicePserson:'', //邀请人员
        personImgNameEtx:[], //个人资料图后缀
        otherImageNameEtx:[], // 其他资料图后缀
        person_selectImages:[], // 选择的图片，里面是base64位编码
        other_selectImages:[], //其他资料，图片上传，里面是base64位编码
        perosnUploadImages:[], // 个人资料上传图片返回的路径
        otherUploadImages:[], // 其他资料上传图片返回的路径
        tradeName:'',
        tradeRate:'',
        imageData:{
          a:[],
          g:[]
        },
        runData:{
          failMsg:'',// 认证失败信息
          runTime:'',//  认证返回时间
        },
        rTime:'',    //认证成功返回时间
        clientHeight:document.documentElement.clientHeight,
        bottom_btn_style:'btn_fixed'
      };
    },
    beforeRouteLeave (to, from, next) {
      if(to.path=='/reviewProcessing'){
        this.$store.dispatch('clearAddress');
      }
      next();
    },
    computed:{
      logoImageslength() {
        return this.imageData.a ? this.imageData.a.length : 0 ;
      },
      otherImageLength() {
        return this.imageData.g ? this.imageData.g.length : 0 ;
      }
    },
    created(){
      eventBus.$on('getGoodsCat',this.getGoodsCatData);
      eventBus.$on('getTrade',this.getTrade);
    },
    activated(){
      this.resizeWindow();
      this.addressInfo = this.$store.state.address.addressInfo;
      if(this.$store.state.pageRouter.isRefresh){
        Object.assign(this.$data, this.$options.data());
      }
      // 这儿主要是为了适配刷新的情况，当邀请码不存在时，刷新请求一下，使数据重新拿一下
      if(!this.servicePserson){
        this.getCertInfo();
      }
      this.$store.dispatch('setIsRefresh',false);
    },
    deactivated(){
      window.onresize = null;
      axios.defaults.showLoading = true; //默认显示loading
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
        // 认证其他图片不是必须传
        if(this.imageData.g.length == 0){
          this.submitInfo();
          return;
        }
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
        let data = {};
        data.truename = this.username;
        data.ident_no = this.idNum;
        data.user_type = '1';
        data.provinces = this.addressInfo.provinces;
        data.city = this.addressInfo.city;
        data.area = this.addressInfo.area;
        data.live_address = this.detailAddress;
        //data.partner_intention = this.brand_data.gb_id;
        // data.accept_officer = that.servicePserson;
        data.trade_name = this.tradeName;
        data.trade_rate = this.tradeRate;
        data.idUpload = [];
        data.otherUpload = [];

        if(tempimageData.a.length > 0){
          tempimageData.a.forEach(v =>{
            if(v.id != 0){
              data.idUpload.push(v.pd_url) ;
            }

          })
        }

        if(tempimageData.g.length > 0){
          tempimageData.g.forEach(v =>{
            if(v.id != 0){
              data.otherUpload.push(v.pd_url) ;
            }
          })
        }

        this.$post(API.CERTIFICATION,data).then((response)=>{
          this.uploadSchedule = 100;
          this.isShowLoading = false;
          if(response.code == 200){
            this.$router.replace("/reviewProcessing");
          }else if(response.msg){
            new Toast(response.msg).show();
            return;
          }else {
            new Toast('操作错误，请稍后再试').show();
            return;
          }
        })
      },
      getCertInfo(){
        this.$get(API.CERTIFICATION).then((response)=>{
          if(response.code == 200){

            if((typeof response.data) == 'object'){
              this.username = response.data.a_true_name;
              this.idNum = response.data.a_ident_no;
              this.detailAddress = response.data.a_detail_address;
              this.servicePserson = response.data.serviceOrinviteCode;
              this.tradeName = response.data.trade_name;
              this.tradeRate = response.data.trade_brokerage_rate;
              this.addressInfo.name = response.data.address;
              this.addressInfo.provinces = response.data.a_province;
              this.addressInfo.city = response.data.a_city;
              this.addressInfo.area = response.data.a_county;
              this.partnerStatus = response.data.partner_status;
              this.partnerName = response.data.partner_name;

              if(response.data.partner_daturms){
                if(response.data.partner_daturms.length == 0 || Object.keys(response.data.partner_daturms).length == 0){
                  this.imageData = {
                    a:[],
                    g:[]
                  }
                }else{
                  if(response.data.partner_daturms.a){
                    this.imageData.a = response.data.partner_daturms.a;
                  }
                  if(response.data.partner_daturms.g){
                    this.imageData.g = response.data.partner_daturms.g;
                  }
                }
              }else {
                this.imageData = {
                  a:[],
                  g:[]
                }
              }
            }
          }
        })
      },
      getGoodsCatData(bundle){
        this.brand_data = bundle;
        console.log(this.brand_data);
      },
      getTrade(trade){
        console.log(trade)
        this.tradeRate = trade.tradeRate;
        this.tradeName = trade.tradeName;
      },
      //绑定个人证件照信息
      onPersonRead(){
        let fileObj = document.getElementById("input_person_img").files[0]; // js 获取文件对象
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
          if(this.imageData.a.length < 4){
            this.imageData.a.push({ext:ext_name,pd_url:base64,id:0});
          }else{
            new Toast('证件资料最多上传4张').show();
          }
        });
      },
      // 绑定其他照片信息
      onOtherRead(){
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
          if(this.imageData.g.length < 3){
            this.imageData.g.push({ext:ext_name,pd_url:base64,id:0});
          }else{
            new Toast('其他资料最多上传3张').show();
          }
        });
      },
      // 删除指定图片，position，图片位置
      deletePersonImage(position){
        console.log(this.imageData.a);
        console.log(position);
        if(this.imageData.a[position].id > 0){
          let data = {};
          data.id = this.imageData.a[position].id;
          data.p_type = 'a';
          this.$post(API.DEL_IAMGE,data).then((response)=>{
            if(response.code == 200){
              this.imageData.a.splice(position, 1);
            }else{
              new Toast(response.msg).show();
              return;
            }
          });
        }else{
          this.imageData.a.splice(position, 1);
        }
      },
      // 删除指定图片，position，图片位置
      deleteOtherImage(position){
        console.log(this.imageData.g);
        console.log(position);
        if(this.imageData.g[position].id > 0){
          let data = {};
          data.id = this.imageData.g[position].id;
          data.p_type = 'g';
          this.$post(API.DEL_IAMGE,data).then((response)=>{
            if(response.code == 200){
              this.imageData.g.splice(position, 1);
            }else{
              new Toast(response.msg).show();
              return;
            }
          });
        }else{
          this.imageData.g.splice(position, 1);
        }
      },
      //图片上传
      uploadImg(){
        if(false == this.verification()){
          return;
        }
        axios.defaults.showLoading = false; //默认显示loading
        this.uploadSchedule = 0;  // 重置
        this.isShowLoading = true;
        this.uploadProductLogo(this.imageData.a.length - 1);
      },
      // 验证
      verification(){
        if(!this.username){
          new Toast('请输入姓名').show();
          return false;
        }
        if(!this.idNum){
          new Toast('请输入身份证号').show();
          return false;
        }
        if(this.imageData.a.length==0){
          new Toast('请上传证件图片').show();
          return false;
        }
        if(!this.detailAddress){
          new Toast('请输入详细地址').show();
          return false;
        }
        if(!this.tradeName){
          new Toast('请选择行业类别').show();
          return false;
        }
        if(!this.servicePserson){
          new Toast('请输入邀请人员').show();
          return false;
        }
        if(!this.addressInfo){
          new Toast('请选择居住地址').show();
          return false;
        }
        return true;
      }
    },
    components: {TopHeader,Loading}
  };

</script>
<style lang="scss" scoped>
  @import "../style/createStore.scss";
  /****title_bar*****/
  .title_bar {
    height: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    font-size: .4rem;
    padding: 0 .5rem;
  }
  .title_left img{
    width: 0.1rem;
    height: 0.4rem;
  }
  .title_left span{
    padding-left: 0.1rem;
    color: #666666;
    font-size: 0.4rem;
  }
  .title_right span{
    color:#989898;
    font-size: 0.36rem;
  }
  .input_img label{
    width: 25%;
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
  .input_img_warp{
    border-bottom: 1px solid #F1F1F1;
  }
</style>
