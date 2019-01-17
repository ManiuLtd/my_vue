<template>
  <div class="tab_bottom" :class={tab_bottom_fixed:isHidden}>
    <div class="bottom_item">
      <router-link to="/main/home" replace>
        <img :src="current_name === 1 ? '../static/images/home_fill.png' : '../static/images/home.png'" />
        <span :class="{tab_txt_select : current_name === 1}">首页</span>
      </router-link>
    </div>
    <div class="bottom_item">
      <router-link to="/main/order" replace>
        <img :src="current_name === 2 ? '../static/images/orders_fill.png' : '../static/images/orders.png'"/>
        <span :class="{tab_txt_select : current_name === 2}">订单</span>
      </router-link>
    </div>
    <div class="bottom_item">
      <router-link to="/main/mine" replace>
        <img :src="current_name === 3 ? '../static/images/person_fill.png' : '../static/images/person.png'"/>
        <span :class="{tab_txt_select : current_name === 3}">我的</span>
      </router-link>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        props:{
          isHidden:{type:Boolean,default:false}
        },
        computed:{
          // 通过router 中设置name属性， 然后通过computed监听路由名的变化
          current_name:function () {
            let routeName = this.$route.name;
            if('home' === routeName){
              return 1;
            }else if('order' === routeName){
              return 2;
            }else if('mine' === routeName){
              return 3;
            }
            return 1;
          }
        }
    }
</script>
<style lang="scss" scoped>
  /**底部tab切换*/
  .tab_bottom{
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: white;
    height: 1.8rem;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    box-shadow:0 0 70px #dcdcdc;
  }
  .bottom_item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  span{
    padding-left: 0.12rem;
    display: block;
    color: #d5d8dd;
    font-size: 0.36rem;
  }
  img{
    width: 1rem;
    height: 1rem;
  }
  .tab_txt_select{
    color: #4cc3ad;
  }
  .tab_bottom_fixed{
    position: fixed;
  }

</style>
