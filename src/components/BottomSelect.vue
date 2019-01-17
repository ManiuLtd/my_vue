<template>
    <div class="overlay" v-show="isShowSelect">
      <div class="content">
        <div class="options">
          <span class="cancel">取消</span>
          <span class="complete">确定</span>
        </div>
        <div class="list">

        </div>
      </div>
    </div>
</template>

<script>
    export default {
      props:{
        isShowSelect:false
      }
    }
</script>

<style lang="scss" scoped>
  @keyframes showSelect
  {
    0% {margin-bottom: -100%;}
    100% {margin-bottom: 0}
  }
  @keyframes closeSelect
  {
    0% {margin-bottom: 0;}
    100% {margin-bottom: -100%}
  }
  .overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.5;
    .content{
      position: fixed;
      left: 0;
      bottom: 0;
      height: 7.58rem;
      width: 100%;
      .options{
        height: 1.03rem;
        display: flex;
        justify-content: space-between;
        background-color: #eeeeee;
        .cancel,.complete{
          color: #999999;
          font-size: 0.4rem;
        }
      }
      .list{
        height: 6.55rem;
        background-color: white;
      }
    }
  }
  .overlay_show_anim{
    animation: showSelect 400ms ease 0s 1 normal forwards running;
  }
  .overlay_close_anim{
    animation: closeSelect 400ms ease 0s 1 normal forwards running;
  }
</style>
