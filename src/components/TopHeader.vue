<template>
  <div class="common_header">
    <img src="../assets/images/back_left_blank.png" @click="back(frouter)">
    <span class="title" v-text="titleTxt"></span>
    <!--有两个右侧布局，需要判断v-if是否为空，来决定是否显示右侧这个文案，否则会导致中间titel不居中-->
    <span class="right" v-on:click="rightClick" v-html="fatherRight" v-if="!isHasSlot"></span>
    <slot name="rightImg"></slot>
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
        rightClick(){
          this.$emit('callBackRightClick');
        },
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
    background-color: white;
    border-bottom: 1px solid #eeeeee;
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
      color: #1a1b39;
      font-size: 0.5rem;
    }
    .right{
      color: #4cc3ad;
      font-size: 0.48rem;
      padding-right: 0.46rem;
      min-width: .96rem;
    }
  }
</style>
