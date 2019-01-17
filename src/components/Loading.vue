<template>
  <div class="loading_content" @touchmove.prevent>
    <div class="shadow_bg"></div>
    <div class="loading">
      <div class="dot"></div>
      <div class="num" v-text="parseInt(schedule)+'%'"></div>
    </div>
    <span class="tips">正在提交，请勿操作 ...</span>
  </div>

</template>

<script>
    export default {
        props:{
          schedule:{
            default : 0
          }
        }
    }
</script>

<style lang="scss" scoped>
  .loading_content{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index:100002;
    flex-direction: column;
    .shadow_bg{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #000;
      opacity: 0.5;
    }
    .loading {
      width: 120px;
      height: 120px;
      position: relative;
      border: 1px solid #f90;
      border-radius: 50%;
      .dot {
        width: 100%;;
        height: 100%;
        animation: rond .8s infinite;
        -webkit-animation: rond .8s infinite;
      }
      .dot:after {
        width: 10px;
        height: 10px;
        position: absolute;
        top: 5px;
        left: 90px;
        content: "";
        display: table;
        background-color: #f50;
        border-radius: 50%;
      }
      .num {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        line-height: 120px;
        text-align: center;
        font-size: 20px;
        color: #f60;
      }
    }
    .tips{
      margin-top: 0.5rem;
      margin-left: 0.6rem;
      color: #f60;
      font-size: 0.48rem;
    }
  }
  @keyframes rond {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes rond {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
</style>
