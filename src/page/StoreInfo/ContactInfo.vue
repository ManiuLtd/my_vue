<template>
  <div class="basic">
    <top-header title-txt="联系人信息"></top-header>
    <form class="content" onsubmit="return false">
      <div class="input_content">
        <ul class="input_box"  v-for="(item,index) in contactData" :key="index">
            <li class="title_bar">
              <p>联系人(<span v-text="index+1"></span>)</p>
              <p @click="delContact(index)">删除</p>
            </li>
            <li class="input_div" v-for="(val,key) in item"  v-if="val.dataKey != 'id'" :key="key">
              <label><span class="must">*</span><span v-text="val.label"></span></label>
              <input type="text" :placeholder="val.placeholder" v-model.trim="val.value" >
            </li>
          </ul>
        <p class="bar"></p>
        <p class="input_div add_active" @click="addContact">
          <label><img src="../../assets/images/icon_add_active.png" alt="">添加联系人</label>
        </p>
      </div>
      <p class="must_title"><span class="must">*</span>为必填项</p>
      <span @click="preserve" class="preserve_btn">保存</span>
    </form>
  </div>
</template>

<script>
  import TopHeader from '../../components/TopHeader'
  import * as API from '../../service/API';
  import Toast from '../../widget/Toast';
  import RadioButton from '../../components/common/RadioButton.vue'
  import axios from 'axios';
  import { Dialog } from 'vant'
  import Loading from '../../widget/loading/loading'
  import SuccessLoading from '../../widget/sucess_loading/SuccessLoading'
  let contactInfo =[
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
        contactData:[]
      }
    },
    mounted() {
      var screenHeigt = window.screen.availHeight;
      var topHeight = document.getElementsByClassName('common_header')[0].offsetHeight;
      document.getElementsByClassName('basic')[0].style.minHeight = screenHeigt - topHeight + 'px';
      document.getElementsByClassName('basic')[0].style.backgroundColor = '#eee';
      //this.getContactList();
      this.addContact();
    },
    methods:{
      addContact(){
        var tempContactInfo = JSON.parse(JSON.stringify(contactInfo)); //防止数组内对象引用传递
        this.contactData.push(tempContactInfo);
      },
      getContactList(){
        let loading = new Loading();
        loading.show();
        this.$get(API.PARTNER_LINK_MAN).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }
          this.contList = response.data;
          if(this.contList){
            for (var index in this.contList){
              var tempContactInfo = JSON.parse(JSON.stringify(contactInfo)); //防止数组内对象引用传递
              for (var subIndex in tempContactInfo){
                tempContactInfo[subIndex]['value'] = this.contList[index][tempContactInfo[subIndex]['dataKey']];
              }
              this.contactData.push(tempContactInfo);
            }

          }
          loading.close();
        }).then((error)=>{
          loading.close();
        });
      },
      preserve: function () {
        let loading = new Loading();
        let data = {};
        data.contact_id = [];
        data.contact_name = [];
        data.contact_phone = [];
        data.contact_card = [];
        data.contact_address = [];
        data.contact_profession = [];
        for (var i=0;i<this.contactData.length;i++){
          console.log(this.contactData[i]);
          for(var key in this.contactData[i]){
            if(this.contactData[i][key]['dataKey'] == 'id'){
              data.contact_id.push(this.contactData[i][key]['value']);
            }else if(this.contactData[i][key]['dataKey'] == 'contactName'){
              if(this.contactData[i][key]['value']!=''){
                data.contact_name.push(this.contactData[i][key]['value']);
              }else{
                new Toast("请输入联系人姓名！").show();
                return false;
              }
            }else if(this.contactData[i][key]['dataKey'] == 'phone'){
              if(this.contactData[i][key]['value']!=''){
                data.contact_phone.push(this.contactData[i][key]['value']);
              }else{
                new Toast("请输入联系人手机号！").show();
                return false;
              }
            }else if(this.contactData[i][key]['dataKey'] == 'identNo'){
              if(this.contactData[i][key]['value']!=''){
                data.contact_card.push(this.contactData[i][key]['value']);
              }else{
                new Toast("请输入联系人身份证号！").show();
                return false;
              }
            }else if(this.contactData[i][key]['dataKey'] == 'liveAddress'){
              if(this.contactData[i][key]['value']!=''){
                data.contact_address.push(this.contactData[i][key]['value']);
              }else{
                new Toast("请输入联系人居住地址！").show();
                return false;
              }
            }else if(this.contactData[i][key]['dataKey'] == 'profession'){
              if(this.contactData[i][key]['value']!=''){
                data.contact_profession.push(this.contactData[i][key]['value']);
              }else{
                new Toast("请输入联系人职业！").show();
                return false;
              }
            }
          }
        }
        loading.show();
        this.$post(API.ADD_PARTNER_LINK_MAN,data).then((response)=>{
          console.log(response);
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }
          new SuccessLoading(response.msg).show();
          this.$router.replace('/contactList');
          loading.close();
        }).then((error)=>{
          loading.close();
        });
      },
      delContact(index){
        Dialog.confirm({
          message: '确定删除该联系人吗？'
        }).then(() => {
          this.contactData.splice(index,1);
          new SuccessLoading('删除成功！').show();
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
</style>
