<template>
  <div class="basic">
    <div class="page_bg"></div>
    <top-header title-txt="修改联系人信息"></top-header>
    <form class="content" onsubmit="return false">
      <div class="input_content">
        <li class="title_bar">
          <p>联系人</p>
          <p @click="delContact">删除</p>
        </li>
        <ul class="input_box"  v-for="(item,index) in contactData" :key="index">
            <li class="input_div" v-for="(val,key) in item" v-if="val.dataKey != 'id'" :key="key">
              <label><span class="must">*</span><span v-text="val.label"></span></label>
              <input type="text" :placeholder="val.placeholder" v-model.trim="val.value" >
            </li>
          </ul>
        <p class="bar"></p>
      </div>
      <p class="must_title"><span class="must">*</span>为必填项</p>
      <span @click="preserve" :class="bottom_btn_style">保存</span>
    </form>
  </div>
</template>

<script>
  import TopHeader from '../../components/TopHeader'
  import * as API from '../../service/API';
  import * as constant from '../../utils/constant';
  import Toast from '../../widget/Toast';
  import RadioButton from '../../components/common/RadioButton.vue'
  import { Dialog } from 'vant'
  import SuccessLoading from '../../widget/sucess_loading/SuccessLoading'
  import idCard from '../../utils/idCard'

  var contactInfo =[
    {label:'联系人id',placeholder:'输入联系人id',prop:null,dataKey:'id',value:''},
    {label:'姓名',placeholder:'输入联系人姓名',prop:null,dataKey:'contactName',value:''},
    {label:'手机号',placeholder:'输入联系人手机号',prop:null,dataKey:'phone',value:''},
    {label:'身份证号',placeholder:'输入联系人身份证号',prop:null,dataKey:'identNo',value:''},
    {label:'居住地址',placeholder:'输入居住详细地址',prop:null,dataKey:'liveAddress',value:''},
    {label:'职业',placeholder:'输入联系人职业',prop:null,dataKey:'profession',value:''},
  ];
  export default {
    name: "StoreInfo",
    data(){
      return{
        contList:[],
        contactData:[],
        msgInfo:{},
        clientHeight:document.documentElement.clientHeight,
        bottom_btn_style:'btn_fixed'
      }
    },
    mounted() {
      this.resizeWindow();
      this.initContactinfo();
    },
    destroyed(){
      window.onresize = null;
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
      addContact(){
        this.contactData.push(contactInfo);
      },
      initContactinfo(){
        this.msgInfo = JSON.parse(sessionStorage.getItem('TMEP_MEG_INFO'));

        var tempContactInfo = JSON.parse(JSON.stringify(contactInfo)); //防止数组内对象引用传递
        for (var subIndex in tempContactInfo){
          tempContactInfo[subIndex]['value'] = this.msgInfo[tempContactInfo[subIndex]['dataKey']];
        }
        this.contactData.push(tempContactInfo);
      },
      preserve: function () {
        let data = {};
        let editInfo = this.contactData[0];
        for(var key in editInfo){
          if(editInfo[key]['dataKey'] == 'id'){
            this.msgInfo.id = data.contact_id = editInfo[key]['value'];
          }else if(editInfo[key]['dataKey'] == 'contactName'){
            if(editInfo[key]['value']!=''){
              this.msgInfo.contactName = data.contact_name = editInfo[key]['value'];
            }else{
              new Toast("请输入联系人姓名！").show();
              return false;
            }
          }else if(editInfo[key]['dataKey'] == 'phone'){
            if(editInfo[key]['value']==''){
              new Toast("请输入联系人手机号！").show();
              return false;
            }else if(!constant.REGULAR_PHONE.test(editInfo[key]['value'])){
              new Toast("手机号格式有误").show();
              return;
            }else{
              this.msgInfo.phone = data.contact_phone = editInfo[key]['value'];
            }
          }else if(editInfo[key]['dataKey'] == 'identNo'){
            if(editInfo[key]['value']!=''){
              this.msgInfo.identNo = data.contact_card = editInfo[key]['value'];
            }else{
              new Toast("请输入联系人身份证号！").show();
              return false;
            }
          }else if(editInfo[key]['dataKey'] == 'liveAddress'){
            if(editInfo[key]['value']!=''){
              this.msgInfo.liveAddress = data.contact_address = editInfo[key]['value'];
            }else{
              new Toast("请输入联系人居住地址！").show();
              return false;
            }
          }else if(editInfo[key]['dataKey'] == 'profession'){
            if(editInfo[key]['value']!=''){
              this.msgInfo.profession = data.contact_profession = editInfo[key]['value'];
            }else{
              new Toast("请输入联系人职业！").show();
              return false;
            }
          }
        }
        this.finalData = data;
        this.$post(API.PARTNER_LINK_MAN,data).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }else{
            this.msgInfo.age = idCard.getAgeByIdCard(this.msgInfo.identNo.replace('X','x'));
            this.msgInfo.sex = idCard.getSexByIdCard(this.msgInfo.identNo.replace('X','x'));
            console.log(1,this.msgInfo);
            sessionStorage.setItem('TMEP_MEG_INFO',JSON.stringify(this.msgInfo));
            new SuccessLoading(response.msg).show();
            this.$router.replace('/contactDetails');
            return;
          }
        })

      },
      delContact(){
        console.log(this.msgInfo);
        Dialog.confirm({
          title: '确定删除该联系人吗？'
        }).then(() => {
          let data = {};
          data.id = this.msgInfo.id;
          this.$post(API.DEL_PARTNER_LINK_MAN,data).then((response)=>{
            console.log(response);
            if(response.code != 200){
              new Toast(response.msg).show();
              return;
            }else{
              this.$router.replace('/contactList');
              new SuccessLoading(response.msg).show();
            }
          })
          this.contactData.splice(0,1);
        }).catch(() => {
          // on cancel
        });
      }
    },
    components: {TopHeader,RadioButton}
  }
</script>

<style lang="scss" scoped>
  @import "../../style/common.scss";
  @import "../../style/public.scss";
  @import "../../style/storeInfo.scss";
  .title_bar {
    height: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    font-size: .4rem;
    padding: 0 .5rem;
  }
  .title_bar p:nth-child(1){
    color: #999999;
  }
  .title_bar p:nth-child(2){
    color: #4cc3ad;
  }
  .add_active{
    text-align: center;
    background-color: white;
    font-size: .47rem;
    padding: .65rem .5rem;
  }

  .add_active img {
    width: .56rem;
    height: .56rem;
    margin-right: .15rem;
  }

  .add_active label {
    color: #4cc3ad;
    vertical-align: bottom;
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
</style>
