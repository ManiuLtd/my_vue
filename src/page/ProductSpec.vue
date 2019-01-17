<template>
  <div class="content">
    <div class="page_bg"></div>
    <top-header title-txt="配置规格"></top-header>
    <div class="info">
      <p class="bar"></p>
      <div class="item" v-for="(item,index) in sale">
        <span class="title">{{item.pn_name}}</span>
        <div class="type">
          <span :class="pvId.indexOf(value.pv_id) == -1 ? 'type-normal' : 'type-selected'" v-for="value in item.value_options" @click="typeClicked(item,value)">{{value.pv_name}}</span>
          <span class="type-add" @click="isShowSpecAdd = true;addPnId=item.pn_id;addPnIdIndex=index"></span>
        </div>
      </div>
      <div class="item-info">
        <div class="edit">
          <span class="edit-tips">统一单价(元)</span>
          <input class="edit-info" placeholder="输入金额" :oninput="oninputContent" v-model="allPrice"/>
        </div>
        <div class="edit">
          <span class="edit-tips">统一库存(件)</span>
          <input class="edit-info" placeholder="输入剩余件数" :oninput="oninputContent" v-model="allStock"/>
        </div>
        <div class="options" v-if="saleLength > 0">
          <span class="add" @click="getsId">添加</span>
        </div>
      </div>
    </div>
    <div class="item-list">
      <div class="type-info" v-for="(info,index) in specInfos">
        <div class="type-overview">
          <div class="type-content">
            <span class="type-item" v-html="info.sInfo"></span>
          </div>
          <div class="type-options">
            <img class="icon-spec-del" src="../assets/images/icon_spec_del.png" @click="delSpec(index)"/>
            <span class="spec-num">规格{{index+1}}</span>
          </div>
        </div>
        <div class="item-type-info">
          <div class="type-edit">
            <span class="type-edit-tips">单价(元)</span>
            <input class="type-edit-info" placeholder="输入金额" :oninput="oninputContent" v-model="info.price"/>
          </div>
          <div class="type-edit">
            <span class="type-edit-tips">库存(件)</span>
            <input class="type-edit-info" placeholder="输入剩余件数" :oninput="oninputContent" v-model="info.stock"/>
          </div>
        </div>
      </div>
    </div>
    <span :class="bottom_btn_style" @click="save" v-if="!saleLength||specInfos&&specInfos.length>0">保存</span>
    <spec-add :is-show="isShowSpecAdd" @add = "addSpec" @closeAddDialog="closeAddSpec"></spec-add>
  </div>
</template>

<script>

  import TopHeader from '../components/TopHeader';
  import Toast from '../widget/Toast';
  import * as API from '../service/API';
  import SpecAdd from '../page/SpecAdd';
  import Vue from 'vue';
  import { Dialog } from 'vant';

  Vue.use(Dialog);

  export default{
    data(){
      return {
        sale:[],
        saleLength:'',
        bottom_btn_style:'btn_fixed',
        oninputContent:'value=value.replace(/[^\\d]/g,\'\')',
        selected:new Map(),   //选中id map
        selectedInfos: new Map(), // 选中内容map
        pvId:[],        // 选中的pv_id, 控制选中  [pvid,pvid,pvid]
        allPrice:'',    //统一价格   eg: 22
        allStock:'',    //统一库存   eg: 36
        specInfos:[],      //统一数据集合
        specInfosTemp:[],  //统一数据临时集合
        delSpecIds:[],    //保存删除的id集合
        addPnIdIndex:0,
        addPnId:'',
        isShowSpecAdd:false,
      }
    },
    methods:{
      closeAddSpec(isShow){
        this.isShowSpecAdd = isShow;
      },
      delSpec(index){
        Dialog.confirm({
          title:'确定删除该规格吗？'
        }).then(() => {
          if(this.specInfos[index].sku_id){
            this.delSpecIds.push(this.specInfos[index].sku_id);
          }
          this.specInfos.splice(index,1);
        }).catch(() => {
          // on cancel
        });
      },
      addSpec(inputContent){
        if(!inputContent){
          new Toast("请添加规格名称").show();
          return;
        }
        this.isShowSpecAdd = !this.isShowSpecAdd;
        let data = {};
        data.pn_id = this.addPnId;
        data.pv_name = inputContent;
        this.$post(API.ADD_EDIT_SPEC,data).then((response)=>{
          if(response.code != 200){
            new Toast(response.msg).show();
            return;
          }
          let pv_id = response.pv_id;
          let specData = {}
          specData.pv_id = pv_id;
          specData.pv_name = inputContent;
          this.sale[this.addPnIdIndex].value_options.push(specData);
        })
      },
      typeClicked(item,value){
        let pn_id = item.pn_id;
        let pv_id = value.pv_id;
        let pn_name = item.pn_name;
        let pv_name = value.pv_name;
        this.saveInfoState(pn_id,pv_id);
        this.saveClickState(pv_id);
        this.saveInfoContent(pn_name,pv_name);
      },
      // 保存点击状态
      saveClickState(pv_id,isNoRepeat = true){
        if(this.pvId){
          let pvIdIndex = this.pvId.indexOf(pv_id);
          if(pvIdIndex == -1){
            this.pvId.push(pv_id);
          }else{
            if(isNoRepeat){
              this.pvId.splice(pvIdIndex,1);
            }
          }
        }
      },
      //保存所有选择 id类型的 map {key: pn_id, set:{pv_id,pv_id,pv_id}}
      saveInfoState(pn_id,pv_id,isNoRepeat = true){
        let selectedMap = new Map(this.selected);
        let valueSet = selectedMap.get(pn_id);
        if(!valueSet){
          valueSet = new Set();
        }
        if(valueSet.has(pv_id)&&isNoRepeat){
          valueSet.delete(pv_id);
        }else{
          valueSet.add(pv_id);
        }
        selectedMap.set(pn_id,valueSet);
        this.selected = selectedMap;
      },
      //保存所有选择 文案类型的 map {key: pn_name, set:{pv_name,pv_name,pv_name}}
      saveInfoContent(pn_name,pv_name,isNoRepeat = true){
        let selectedMap = new Map(this.selectedInfos);
        let valueSet = selectedMap.get(pn_name);
        if(!valueSet){
          valueSet = new Set();
        }
        if(valueSet.has(pv_name)&&isNoRepeat){
          valueSet.delete(pv_name);
        }else{
          valueSet.add(pv_name);
        }
        selectedMap.set(pn_name,valueSet);
        this.selectedInfos = selectedMap;
      },
      //获取选中规格集合 sId： {96:22;36:56;89:69}
      getsId(){
        //重置临时数据集合
        this.specInfosTemp = [];
        // 调整this.selected 顺序
        let pnIds = [];
        let keys = this.selected.keys();
        for (let key of keys){
           pnIds.push(key);
        }
        // 数组排序
        pnIds.sort((val1,val2)=>{
           return val1-val2;
        })
        // 重置this.selected
        if(pnIds&&pnIds.length>0){
          let selectedTemp = new Map();
          for (let pnId of pnIds){
            selectedTemp.set(pnId,this.selected.get(pnId));
          }
          this.selected = new Map();
          this.selected = selectedTemp;
        }

        let idsArray = [];
        for (let pn_id of this.selected.keys()) {
          let pvIdSets = this.selected.get(pn_id);
          if(idsArray&&idsArray.length>0){
            let idsArrayTemp = [];
            for (let idStr of idsArray){
              for (let pv_id of pvIdSets) {
                let pnpvId = `${idStr}${pn_id}:${pv_id};`;
                idsArrayTemp.push(pnpvId);
              }
            }
            idsArray = [];
            idsArray = [...idsArrayTemp];
          }else{
            for (let pv_id of pvIdSets) {
              let pnpvId = `${pn_id}:${pv_id};`;
              idsArray.push(pnpvId);
            }
          }
        }
        if(idsArray.length == 0){
          new Toast("请先选择规格").show();
          return;
        }
        Dialog.confirm({
          title:'确定添加吗？'
        }).then(() => {
          // 存储 96:22;36:56;89:69
          for(let item of idsArray){
            let data = {};
            data.sId = item;
            this.specInfosTemp.push(data);
          }
          this.setAllStockPrice();
          this.getSInfo();
        }).catch(() => {
        });
      },
      // 统一数据设置 stock: 20; price: 30;
      setAllStockPrice(){
        if(this.specInfosTemp) {
          let length = this.specInfosTemp.length;
          if (length > 0) {
            for (let data of this.specInfosTemp) {
              if (this.allPrice) {
                data.price = this.allPrice;
              }
              if (this.allStock) {
                data.stock = this.allStock;
              }
            }
          }
        }
      },
      // 设置展示内容 sInfo：温度：三分热<br/>规格类型：中杯<br/>甜度：无糖<br/>，
      getSInfo(){
        let infoArray = [];
        for (let pn_name of this.selectedInfos.keys()) {
          let pvNameSets = this.selectedInfos.get(pn_name);
          if(infoArray&&infoArray.length>0){
            let infoArrayTemp = [];
            for (let nameStr of infoArray){
              for (let pv_name of pvNameSets) {
                let pnpvName = `${nameStr}${pn_name}:${pv_name}<br/>`;
                infoArrayTemp.push(pnpvName);
              }
            }
            infoArray = [];
            infoArray = [...infoArrayTemp];
          }else{
            for (let pv_name of pvNameSets) {
              let pnpvName = `${pn_name}:${pv_name}<br/>`;
              infoArray.push(pnpvName);
            }
          }
        }

        //封装 sInfo：温度：三分热<br/>规格类型：中杯<br/>甜度：无糖<br/>，
        if(this.specInfosTemp&&infoArray&&infoArray.length>0){
          let length = this.specInfosTemp.length;
          if(length>0){
            for(let i = 0; i <length; i++){
              let data = this.specInfosTemp[i];
              data.sInfo = infoArray[i];
            }
          }
        }
        this.sDesc();
      },
      // 封装： sDesc：  三分热 中杯 无糖
      sDesc(){
        let descArray = [];
        for (let pn_name of this.selectedInfos.keys()) {
          let pvNameSets = this.selectedInfos.get(pn_name);
          if(descArray&&descArray.length>0){
            let descArrayTemp = [];
            for (let nameStr of descArray){
              for (let pv_name of pvNameSets) {
                let pnpvName = `${nameStr}${pv_name}  `;
                descArrayTemp.push(pnpvName);
              }
            }
            descArray = [];
            descArray = [...descArrayTemp];
          }else{
            for (let pv_name of pvNameSets) {
              let pnpvName = `${pv_name}  `;
              descArray.push(pnpvName);
            }
          }
        }

        //封装： sDesc：  三分热 中杯 无糖
        if(this.specInfosTemp&&descArray&&descArray.length>0){
          let length = this.specInfosTemp.length;
          if(length>0){
            for(let i = 0; i <length; i++){
              let data = this.specInfosTemp[i];
              data.sDesc = descArray[i];
              data.gdesc = `￥${data.price}/${data.sDesc}余${data.stock}件`
            }
          }
        }
        // 清除保存的数据
        this.clearData();
        this.removeDuplicates();
      },
      // 添加后清空数据
      clearData(){
        this.pvId = [];
        this.allStock = '';
        this.allPrice = '';
        this.selected = new Map();
        this.selectedInfos = new Map();
      },
      // 添加去除重复
      removeDuplicates(){
        if(this.specInfos&&this.specInfos.length>0){
          let listTemp = [];
          for (let temp of this.specInfosTemp){
            let ishas = true;
            for (let info of this.specInfos){
              if (info.sId == temp.sId){
                ishas = false;
                continue;   // 终止循环，有这一条内容
              }
            }
            if(ishas){
              listTemp.push(temp);
            }
          }
          if(listTemp&&listTemp.length>0){
            for (let data of listTemp){
              this.specInfos.push(data);
            }
          }
        }else{
          this.specInfos = [];
          this.specInfos = [...this.specInfosTemp];
        }
      },
      save(){
        this.$store.dispatch('saveDelSpecInfo',this.delSpecIds);
        this.$store.dispatch('saveSpecInfo',this.specInfos);
        this.$router.go(-1);
      },
      //获取商品属性
      getAttributeData() {
        let gcId = this.$route.params.cateId; //分类Id
        let gId = this.$route.params.gId; //商品Id
        let requestUrl = API.ATTRIBUTE_DATA + `?gc_id=${gcId}`;
        if(gId){
          requestUrl = API.ATTRIBUTE_DATA + `?gc_id=${gcId}&g_id=${gId}`;
        }
        this.$get(requestUrl).then((response) => {
          if (response.code != 200) {
            new Toast(response.msg).show();
            return;
          }
          this.sale = response.data.sale;
          this.saleLength = 0;
          if(this.sale){
            this.saleLength = this.sale.length;
          }
          this.specInfos = this.$store.state.goods.specInfos;
        });
      },
      resizeWindow(){
        window.onresize = ()=>{
          if(this.clientHeight>document.documentElement.clientHeight) {
            this.bottom_btn_style = "btn_margin";
          }else{
            this.bottom_btn_style = "btn_fixed";
          }
        }
      },
    },
    mounted(){
      this.getAttributeData();
      this.resizeWindow();
    },
    components:{
      TopHeader,SpecAdd
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    background-color:#eeeeee;
    .info{
      padding-top: 1.61rem;
      background-color: white;
      margin-bottom: .26rem;
      .bar{
        height: .2rem;
        background-color: #eeeeee;
      }
      .item{
        padding-bottom: 0.6rem;
        .title{
          font-size: 0.4rem;
          color: #1a1b39;
          margin: 0.73rem 0 0.38rem 0.56rem;
        }
        .type{
          padding-left: .48rem;
          display: flex;
          flex-wrap: wrap;
          .type-normal{
            width: 3.03rem;
            height: 1.06rem;
            font-size: 0.4rem;
            color: #1a1b39;
            text-align: center;
            line-height: 1.06rem;
            margin-right: 0.3rem;
            margin-top: 0.2rem;
            background-color: #f6f7f7;
            border-radius: .15rem;
          }
          .type-selected{
            width: 3.03rem;
            height: 1.06rem;
            font-size: 0.4rem;
            color: #4cc3ad;
            text-align: center;
            line-height: 1.06rem;
            background: rgba(76,195,173,0.15);
            border-radius: 0.18rem;
            margin-right: 0.3rem;
            margin-top: 0.2rem;
          }
          .type-add{
            width: 3.03rem;
            height: 1.06rem;
            background-image: url("../assets/images/icon_spec_add.png");
            background-size: cover;
            margin-top: 0.2rem;
            margin-right: 0.3rem;
            background-color: #f6f7f7;
            border-radius: .15rem;
          }
        }
      }
      .item-info{
        .edit{
          padding-left: 0.5rem;
          padding-right: 0.5rem;
          height: 1.83rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top:1px solid #eeeeee;
          .edit-tips{
            width: 30%;
            color: #1a1b39;
            font-size: 0.48rem;
          }
          .edit-info{
            width: 60%;
            font-size: 0.48rem;
            text-align: right;
          }
        }
        .options{
          display: flex;
          justify-content: flex-end;
          .add{
            margin: 0.25rem 0.52rem 0.58rem 0;
            line-height: 1.09rem;
            text-align: center;
            display: block;
            width: 3.02rem;
            height: 1.09rem;
            color: #4cc3ad;
            font-size: 0.48rem;
            border-radius: 0.2rem;
            border: 1px solid #4cc3ad;
          }
        }
      }
    }
    .item-list{
      padding-bottom: 2rem;
      background-color:#eeeeee;
      .type-info{
        margin-bottom:.3rem;
        .type-overview{
          margin-top: 0.27rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: white;
          padding:.6rem .5rem;
          font-size:0;
          .type-content{
            font-size:0;
            .type-item{
              line-height: 0.8rem;
              color: #666666;
              font-size: 0.4rem;
            }
          }
          .type-options{
            display:flex;
            align-items: center;
            .icon-spec-del{
              width: 1.07rem;
              height: 1.07rem;
              margin-right: .3rem;
            }
            .spec-num{
              color: white;
              background-color: #4cc3ad;
              width: 1.07rem;
              height: 1.07rem;
              font-size: 0.3rem;
              border-radius: 50%;
              display: inline-block;
              line-height: 1.07rem;
              text-align: center;
            }
          }
        }
        .item-type-info{
          background-color: white;
          .type-edit {
            border-top: 1px solid #eeeeee;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            height: 1.83rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .type-edit-tips {
              width: 30%;
              color: #1a1b39;
              font-size: 0.48rem;
            }
            .type-edit-info {
              width: 60%;
              font-size: 0.48rem;
              text-align: right;
            }
          }
        }
      }
    }

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
      margin-top: 2.56rem;
      display: block;
      width: 100%;
      line-height: 1.25rem;
      font-size: .48rem;
      color: white;
      text-align: center;
      background-color: #5FCCC6;
    }
  }
</style>
