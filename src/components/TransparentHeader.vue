<template>
  <div class="common_header">
    <img src="../assets/images/back_left_blank_white.png" @click="back(frouter)">
    <span class="title" v-text="titleTxt"></span>
    <slot name="rightContent" class="right"></slot>
  </div>
</template>

<script>
  export default {
    props:{
      titleTxt:{
        default:''
      },
      fatherRight:{
        default: ''
      },
      frouter:{
        default:''
      },
      isHasSlot:{
        default:false
      }
    },
    methods:{
      back(router){
        if(router && router!=''){
          this.$router.replace(''+ router +'')
        }else {
          this.$router.go(-1);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .common_header{
    width: 100%;
    height: 1.61rem;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index:99999;
    img{
      width: 1.61rem;
      height: 1.61rem;
    }
    .title{
      color: white;
      font-size: 0.5rem;
    }
    .right{
      width: 1.61rem;
      height: 1.61rem;
      display: block;
    }
  }
</style>
