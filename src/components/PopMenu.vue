<template>
  <div class="content" @touchmove.prevent @click="setIsShow" :class={content_hidden:isHiddenRoot}>
    <transition name="fade"  v-on:before-enter="beforeEnter" v-on:after-leave="afterLeave">
      <div class="pop_menu_bg" v-if="isShow"></div>
    </transition>
    <transition name="from-top">
      <div class="list" v-if="isShow" >
        <slot name="list"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        isHiddenRoot: true
      }
    },
    props:{
      isShow:{ type:Boolean,default:false }
    },
    methods:{
      setIsShow(){
        this.$emit('setIsShow',!this.isShow);
      },
      beforeEnter: function (el) {
        this.isHiddenRoot = false;
      },
      afterLeave: function (el) {
        this.isHiddenRoot = true
      },
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    position: fixed;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    z-index:100;
    .pop_menu_bg{
      position: fixed;
      left: 0;
      top:0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
    }
    .list{
      width: 100%;
      background-color: white;
      position: relative;
    }
  }

  .content_hidden{
    display: none;
  }

  .from-top-enter {
    opacity: 0;
    transform: translateY(-100%);
  }
  .from-top-enter-active{
    transition: all .4s;
  }
  .from-top-enter-to{
    opacity: 1;
    transform: translateY(0);
  }
  .from-top-leave {
    opacity: 1;
    transform: translateY(0);
  }
  .from-top-leave-active {
    transition: all .4s
  }
  .from-top-leave-to {
    opacity: 0;
    transform: translateY(-100%);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
