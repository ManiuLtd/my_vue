<template>
    <div>
      <top-header title-txt="订单跟踪"></top-header>
      <div class="content">
          <ul>
            <li v-for="(item,index) in orderData">
              <div class="lt"></div>
              <div class="rt">
                <p class="title_p1" v-text="item.logRemark"></p>
                <p class="title_p2" v-text="item.logAddTime"></p>
              </div>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
  import TopHeader from '../components/TopHeader'
  import * as API from '../service/API';
  import Loading from '../widget/loading/loading'


  export default {
    data(){
      return{
        orderData:'',
      }
    },
    mounted(){
      this.getOrderData();
    },
    methods:{
       getOrderData(){
         let loading = new Loading();
         loading.show();
         let orderId = this.$route.params.id;
         let requestUrl = API.BASEURL + `/order/detail/${orderId}.html`;
         this.$get(requestUrl).then((res)=>{
           if(res.code != 200){
             new Toast(res.msg).show();
             return ;
           }
           this.orderData = res.logList;
           loading.close();
         }).then((error)=>{
           loading.close();
         });
       },
    },
    components:{TopHeader},
    }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  @import "../style/public.scss";
  .content {
    display: flex;
    flex-direction: column;
    margin-top: 1.61rem;
  }
  ul {
    flex: 1;
    overflow-y: scroll;
    padding: .8rem .9rem;
  }
  ul li .lt{
    float: left;
    width: .55rem;
    height: 1.99rem;
    background-image: url("../assets/images/tracking_line.png");
    background-repeat: no-repeat;
    background-position: 0 0;
    transform:rotate(180deg);
    background-size: cover;
  }
  ul li+li .rt{
    /*margin-top: .9rem;*/
  }
  .content ul li:last-child .lt{
    width: .55rem;
    height: .55rem;
    background: url("../assets/images/tracking_circle.png") no-repeat center;
    background-position: 0 0;
    background-size: cover;
  }
  ul li .rt{
    float: right;
    width: 8rem;
    background: #f9f9f9;
  }
  ul .title_p1{
    font-size: .45rem;
    color: #4a4d5e;
  }
  ul .title_p2{
    font-size: .36rem;
    color: #4a4d5e;
    opacity: 0.6;
    padding-left: .05rem;
  }
  li:after{
    content: "";
    display: block;
    clear: both;
  }
</style>
