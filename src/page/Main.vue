<template>
  <div class="main_box">
    <transition>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <tab-bottom hid-show="tabBottomShow"></tab-bottom>
  </div>

</template>

<script>
    import TabBottom from '../components/TabBottom'
    import eventBus from  '../utils/eventBus'
    export default {
      data(){
        return{
          tabBottomShow:''
        }
      },
      created(){
        eventBus.$on("bottomShop",this.getShow);
      },
      mounted(){
        let screenHeigt = window.screen.availHeight;
        if(document.getElementsByClassName('orderContent')[0]){
        document.getElementsByClassName('orderContent')[0].style.minHeight = screenHeigt + 'px';
        }

      },
      components:{
        TabBottom
      },
      methods:{
        getShow(n){
          this.tabBottomShow = n;
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>
