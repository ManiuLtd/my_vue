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
    <tab-bottom :isHidden="showTab"></tab-bottom>
  </div>
</template>

<script>
    import TabBottom from '../components/TabBottom'

    export default {
      data(){
        return {
          clientHeight:document.documentElement.clientHeight,
          showTab: true,  // 控制按钮盒子显示隐藏
        }
      },
      activated(){
        window.onresize= ()=>{
          if(this.clientHeight>document.documentElement.clientHeight) {
            this.showTab =false
          }else{
            this.showTab = true
          }
        }
      },
      deactivated(){
        window.onresize = null;
      },
      components:{
        TabBottom
      },
    }
</script>

<style lang="scss" scoped>

</style>
