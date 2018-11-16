<template>
  <div class="shop_create_content">
    <top-header title-txt="商户认证"></top-header>
    <form class="content">
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
              <input type="text" readonly="readonly" v-bind:value='address_data.name' name="" style="margin-right: .3rem;">
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
            <label><span class="must">*</span>服务编号</label>
            <input type="text" placeholder="输入服务编号" v-model.trim="servicePserson">
          </li>
          <li class="input_img">
            <label><span class="must">*</span>证件资料</label>
            <div class="img_up">
              <van-uploader :after-read="onPersonRead" accept="image/*" multiple>
                <van-icon name="photograph" />
              </van-uploader>
            </div>
            <p class="tips">请上传身份证正反面照、手持身份证照、营业执照4张。上传注意证件照片上的文字清晰可见。</p>
          </li>
          <div class="img_select_box">
            <div class="img_box" v-for="(item,index) in imageData.a">
              <img class="img_delete" src="../assets/images/icon_img_delete.png" @click="deletePersonImage(index)"/>
              <img class="img_select" :src="item.id ? fileHost+item.pd_url : item.pd_url"/>
            </div>
          </div>
          <li class="input_img">
            <label><span class="must"></span>其他资料</label>
            <div class="img_up">
              <van-uploader :after-read="onOtherRead" accept="image/*" multiple>
                <van-icon name="photograph" />
              </van-uploader>
            </div>
            <p class="tips">请注意证件照片上的文字清晰可见,限制3张。</p>
          </li>
          <div class="img_select_box">
            <div class="img_box" v-for="(item,index) in imageData.g">
              <img class="img_delete" src="../assets/images/icon_img_delete.png" @click="deleteOtherImage(index)"/>
              <img class="img_select" :src="item.id ? fileHost+item.pd_url : item.pd_url"/>
            </div>
          </div>
        </ul>
      </div>
      <p class="must_title"><span class="must">*</span>为必填项，请确保照片资料真实有效。</p>
      <span class="preserve_btn" v-on:click="uploadImg">确认认证</span>
    </form>
  </div>
</template>
<script>
  import TopHeader from '../components/TopHeader'
  import eventBus from  '../utils/eventBus'
  import * as API from '../service/API';
  import Toast from '../widget/Toast'

  let person_index = 0;
  let other_indext = 0;

  export default {
    data() {
      return {
        username:'', //姓名
        idNum:'', //身份证号
        address_data:{}, //地址信息
        brand_data:{}, // 销售品类数据
        activeName: '0',
        fileHost: process.env.ALY_IMG_URL,
        detailAddress:'', //详细地址
        servicePserson:'', //服务人员
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
      };
    },
    created(){
      eventBus.$on('getGoodsCat',this.getGoodsCatData);
      eventBus.$on('getAddress',this.getAddressData);
      eventBus.$on('getTrade',this.getTrade);
    },
    mounted() {
      let screenHeigt = window.screen.availHeight;
      let topHeight = document.getElementsByClassName('common_header')[0].offsetHeight;
      document.getElementsByClassName('shop_create_content')[0].style.minHeight = screenHeigt - topHeight + 'px';
      document.getElementsByClassName('shop_create_content')[0].style.backgroundColor = '#eee';
      this.getCertInfo();
    },
    methods:{
      getCertInfo(){
        this.$get(API.CERTIFICATION).then((response)=>{
          if(response.code == 200){
            console.log((typeof response.data) == 'object');
            if((typeof response.data) == 'object'){
              this.username = response.data.a_true_name;
              this.idNum = response.data.a_ident_no;
              this.detailAddress = response.data.a_detail_address;
              this.servicePserson = response.data.ai_service_no;
              this.tradeName = response.data.trade_name;
              this.tradeRate = response.data.trade_brokerage_rate;
              this.address_data.name = response.data.address;
              this.address_data.provinces = response.data.a_province;
              this.address_data.city = response.data.a_city;
              this.address_data.area = response.data.a_county;
              this.imageData = response.data.partner_daturms;
            }

          }
        })
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
          let data = {};
          data.truename = that.username;
          data.ident_no = that.idNum;
          data.user_type = '1';
          data.provinces = that.address_data.provinces;
          data.city = that.address_data.city;
          data.area = that.address_data.area;
          data.live_address = that.detailAddress;
          //data.partner_intention = this.brand_data.gb_id;
          data.accept_officer = that.servicePserson;
          data.trade_name = that.tradeName;
          data.trade_rate = that.tradeRate;
          data.idUpload = [];
          data.otherUpload = [];

          tempimageData.a.forEach(v =>{
            data.idUpload.push(v.pd_url) ;
          })
          tempimageData.g.forEach(v =>{
            data.otherUpload.push(v.pd_url) ;
          })
          that.$post(API.CERTIFICATION,data).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg).show();
              that.runData.failMsg = response.msg;
              that.runData.runTime = response.runtime;
              eventBus.$emit('getFailMsg',that.runData);
              return;
            }
            that.rTime = response.runTime;
            eventBus.$emit('getTime',that.rTime);
            that.$router.replace("/reviewProcessing");
          })

        })
      },
      getGoodsCatData(bundle){
        this.brand_data = bundle;
        console.log(this.brand_data);
      },
      getAddressData(bundle){
        this.address_data = bundle;
        console.log(this.address_data);
      },
      getTrade(trade){
        console.log(trade)
        this.tradeRate = trade.tradeRate;
        this.tradeName = trade.tradeName;
      },
      //绑定个人证件照信息
      onPersonRead(file){
        if(this.imageData.a.length < 4){
          let base64 = file.content;  // 文件路径
          let fileName = file.file.name; //文件名
          let ext_name = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();  //后缀名
          this.imageData.a.push({ext:ext_name,pd_url:base64,id:0});
        }else{
          new Toast('证件资料最多上传四张').show();
        }
      },
      // 绑定其他照片信息
      onOtherRead(file){
        if(this.imageData.g.length < 3){
          let base64 = file.content;  // 文件路径
          let fileName = file.file.name; //文件名
          let ext_name = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();  //后缀名
          this.imageData.g.push({ext:ext_name,pd_url:base64,id:0});
        }else{
          new Toast('其他资料最多上传三张').show();
        }
      },
      // 删除指定图片，position，图片位置
      deletePersonImage(position){
        this.imageData.a.splice(position,1);
      },
      // 删除指定图片，position，图片位置
      deleteOtherImage(position){
        this.imageData.g.splice(position,1);
      },
      //图片上传
      uploadImg(){
        if(false == this.verification()){
          return;
        }
        this.submit();
      },
      //上传个人认证图片
      postPersonImage(ext){
        this.$postImg(process.env.UPLOAD_IMG_URL, { "ext": ext, "content": this.person_selectImages[person_index]}).then((response) => {
          this.perosnUploadImages.push(response.result.url);
          if(person_index < this.person_selectImages.length){
            person_index = person_index + 1;
            this.postPersonImage(this.personImgNameEtx[person_index]);
          }else {
            if(this.other_selectImages&&this.other_selectImages.length>0){
              this.postOtherImage(this.otherImageNameEtx[0]);
            }else{
              this.certification();
            }
          }
        })
      },
      //上传其他资料图片
      postOtherImage(ext){
        this.$postImg(process.env.UPLOAD_IMG_URL, { "ext": ext, "content": this.other_selectImages[other_indext]}).then((response) => {
          this.otherUploadImages.push(response.result.url);
          if(other_indext < this.other_selectImages.length){
            other_indext = other_indext + 1;
            this.postOtherImage(this.otherImageNameEtx[other_indext]);
          }else{
            this.certification();
          }
        })
      },
      //商户认证
      certification(){
        let data = {};
        data.truename = this.username;
        data.ident_no = this.idNum;
        data.user_type = '1';
        data.provinces = this.address_data.provinces;
        data.city = this.address_data.city;
        data.area = this.address_data.area;
        data.live_address = this.detailAddress;
        //data.partner_intention = this.brand_data.gb_id;
        data.accept_officer = this.servicePserson;
        data.trade_name = this.tradeName;
        data.trade_rate = this.tradeRate;
        let idUpload = [];
        for(let i = 0; i<this.perosnUploadImages.length; i++){
          idUpload.push(this.perosnUploadImages[i]);
        }
        data.idUpload = idUpload;
        let otherUpload = [];
        for(let i = 0; i<this.otherUploadImages.length; i++){
          otherUpload.push(this.otherUploadImages[i]);
        }
        this.$post(API.CERTIFICATION,data).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            this.runData.failMsg = response.msg;
            this.runData.runTime = response.runtime;
            eventBus.$emit('getFailMsg',this.runData);
            return;
          }
          this.rTime = response.runTime;
          eventBus.$emit('getTime',this.rTime);
          this.$router.replace("/reviewProcessing");
        })
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
          new Toast('请输入服务人员').show();
          return false;
        }
        if(!this.address_data){
          new Toast('请选择居住地址').show();
          return false;
        }
        return true;
      }
    },
    components: {TopHeader}
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
    width: 35%;
  }

</style>
