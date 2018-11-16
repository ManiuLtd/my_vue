<template>
  <div class="basic">
    <top-header title-txt="受理信息"></top-header>
    <form class="content" onsubmit="return false">
      <div class="input_content">
        <ul class="input_box">
          <li class="input_div" @click="showDepartment">
            <label>受理营业部</label>
            <input type="text" placeholder="请选择" name="accept_department" v-model.trim="accept_department" class="icon_input" readonly="readonly" style="width: 50%;">
            <i @click="show = !show" class="icon_arrow"></i>
          </li>
          <li class="input_div">
            <label>营业部经理</label>
            <input type="text" name="sale_manager" v-model.trim="acceptInfo.sale_manager" placeholder="输入经理姓名" >
          </li>
          <li class="input_div">
            <label>办理人员</label>
            <input type="text" name="accept_officer" v-model.trim="acceptInfo.accept_officer" readonly="readonly" placeholder="输入办理人员" value="">
          </li>
        </ul>
      </div>
      <p class="must_title"></p>
      <span @click="preserve" class="preserve_btn">保存</span>
    </form>
    <van-popup v-model.trim="isShowDepartment"  position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="isShowDepartment = false"
        @change="onChange" ref="department"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>

  import TopHeader from '../../components/TopHeader'
  import Toast from '../../widget/Toast';
  import RadioButton from '../../components/common/RadioButton.vue'
  import * as API from '../../service/API'
  import Loading from '../../widget/loading/loading'


  export default {
    data(){
      return {
        acceptInfo:{},
        accept_department:'',
        sale_manager:'',
        accept_officer:'',
        show: false,
        isShowDepartment : false,
        columns: [],
      }
    },
    methods: {
      showDepartment(){
        this.isShowDepartment = true;
        console.log(this.$refs);

      },
      onChange(picker, value, index) {
      },
      onConfirm(value, index){
        this.accept_department = value.text;
        this.acceptInfo.accept_department = value.key;;
        this.isShowDepartment = false;
      },
      getAcceptPerson(){
        // 如果接口数据中有值，这儿不做请求
        let loading = new Loading();
        loading.show();
        if(this.columns&&this.columns.length>0){
          return;
        }
        this.$get(API.PARTNER_ACCEPT_INFO).then((response)=>{
          console.log(response);
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }
          if(response.code == 200){
            this.acceptInfo = response.data;
            let departments = this.acceptInfo.departments;
            this.columns= departments;
            this.accept_department = '请选择';
            if(departments&&departments.length>0){
              for(let index in departments){
                if(this.acceptInfo.accept_department == departments[index].key){
                  this.accept_department = departments[index].text;
                }
              }
            }
          }
          loading.close();
        }).then((error)=>{
          loading.close();
        })
      },
      preserve: function () {
        let loading = new Loading();
        loading.show();
        let formData = {
          accept_department:this.acceptInfo.accept_department,
          accept_officer:this.acceptInfo.accept_officer,
          sale_manager:this.acceptInfo.sale_manager,
        }
        this.$post(API.PARTNER_ACCEPT_INFO,formData).then((response)=>{
            if(response.code == 500){
                new Toast(response.msg).show();
                return;
            }else if(response.code == 200){
                this.data = response.data
                new Toast(response.msg).show();
            }
          loading.close();
        }).then((error)=>{
          loading.close();
        })
      }
    },
    mounted() {
      var screenHeigt = window.screen.availHeight;
      var topHeight = document.getElementsByClassName('common_header')[0].offsetHeight;
      document.getElementsByClassName('basic')[0].style.minHeight = screenHeigt - topHeight + 'px';
      document.getElementsByClassName('basic')[0].style.backgroundColor = '#eee';
      this.getAcceptPerson();
    },
    components: {TopHeader,RadioButton}
  }
</script>

<style lang="scss" scoped>
  @import "../../style/common.scss";
  @import "../../style/public.scss";
  @import "../../style/storeInfo.scss";
</style>
