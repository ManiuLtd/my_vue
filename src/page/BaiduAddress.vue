<template>
    <div class="content">
      <top-header title-txt="选择具体地址"></top-header>
      <search class="search" placeholder="请输入详细地址" :fun_click="fun_click" :search="search_click" :city="city_name"></search>
      <div class="lists">
        <ul>
          <li v-for="item in suggestionLists" @click="clickedAddress(item)">
            <span class="title">{{item.name}}</span>
            <span class="address">{{item.address}}</span>
          </li>
        </ul>
      </div>
      <div id="map"></div>
    </div>
</template>

<script>

  import TopHeader from '../components/TopHeader'
  import Search from './Search';
  import { mapActions } from 'vuex';
  import Toast from '../widget/Toast';
  import jsonp from 'jsonp';

  export default {
    data(){
      return {
        suggestionLists : [],
        homeAddress: {},
        city_name:'',
        bundleInfo:{
          area: "",
          area_name: "",
          city: "",
          city_name: "",
          name: "",
          province_name: "",
          provinces: "",
          lat:"",
          lng:"",
          selectAddress:""
        }
      }
    },
    methods:{
      ...mapActions(['saveAddress','clearAddress']),
      clickedAddress(item){
        this.bundleInfo = {...this.$store.state.address.addressInfo}
        this.bundleInfo.lat = item.location.lat;
        this.bundleInfo.lng = item.location.lng;
        this.bundleInfo.selectAddress = item.name;
        this.$store.dispatch('saveAddress',this.bundleInfo)
        this.$router.go(-1);
      },
      // 实时更新
      fun_click(val){
        let tags = '美食,酒店,购物,生活服务,丽人,旅游景点,休闲娱乐,运动健身,教育培训,文化传媒,医疗,汽车服务,交通设施,房地产,公司企业';
        let ak = 'Mg23cm5wxXFkDQ5h1jCf7m0ceucMIRkq';
        let requestUrl = 	`https://api.map.baidu.com/place/v2/search?query=${val}&tag=${tags}&region=${this.city_name}&city_limit=true&output=json&ak=${ak}`;
        jsonp(requestUrl,null,(err,data)=>{
          if(data&&data.status == 0){
            this.suggestionLists = [];
            let results = data.results;
            if(results&&results.length>0){
              this.suggestionLists = [...results];
            }
          }
        });
      },
      // 点搜索的时候的操作，就是有个提醒，提示
      search_click(val){
        let tags = '美食,酒店,购物,生活服务,丽人,旅游景点,休闲娱乐,运动健身,教育培训,文化传媒,医疗,汽车服务,交通设施,房地产,公司企业';
        let ak = 'Mg23cm5wxXFkDQ5h1jCf7m0ceucMIRkq';
        let requestUrl = 	`https://api.map.baidu.com/place/v2/search?query=${val}&tag=${tags}&region=${this.city_name}&city_limit=true&output=json&ak=${ak}`;
        jsonp(requestUrl,null,(err,data)=>{
          if(data&&data.status == 0){
            this.suggestionLists = [];
            let results = data.results;
            if(results&&results.length>0){
              this.suggestionLists = [...results];
            }else{
              new Toast("没有找到您的地址").show();
            }
          }else{
            new Toast("没有找到您的地址").show();
          }
        });
      }
    },
    mounted(){
      this.city_name = this.$store.state.address.addressInfo.city_name;
    },
    components: {TopHeader,Search}
  }
</script>

<style lang="scss" scoped>
  .content{
    .search{
      margin-top: 1.65rem;
    }
    /*// 推荐列表样式*/
    .lists {
      padding-top: 2.9rem;
      ul {
        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-bottom: 1px solid #eeeeee;
          height:1.8rem;
          background: #fff;
          font-size: 0.34rem;
          padding-left: 0.2rem;
          .title {
            padding: 0 0.2rem;
            font-size: 0.42rem;
            color: #1a1b39;
          }
          .address {
            overflow: hidden;
            display: block;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0.2rem 0.5rem 0 0.2rem;
            font-size: 0.36rem;
            color: #1a1b39;
            opacity: 0.6;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
</style>
