<template>
  <transition name="fade">
    <div class="content" v-if="isShow" @touchmove.prevent >
      <div class="dialog-bg"></div>
      <div class="box">
        <input class="edit" placeholder="请输入规格名" v-model.trim="inputContent"/>
        <span class="cancel" @click="cancel">取消</span>
        <span class="add" @click="addSpec">添加</span>
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
      data(){
        return {
          inputContent:''
        }
      },
      props:{
        isShow:{default:false},
      },
      methods:{
        addSpec(){
          this.$emit('add',this.inputContent);
          this.inputContent = '';
        },
        cancel(){
          this.$emit('closeAddDialog',!this.isShow);
          this.inputContent = '';
        }
      }
    }
</script>

<style lang="scss" scoped>
  .content{
    .dialog-bg{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      z-index: 10000;
    }
    .box{
      height: 3.6rem;
      width: 80%;
      background-color: white;
      border-radius: 0.35rem;
      position: fixed;
      z-index: 10001;
      top: 35%;
      left: 10%;
      font-size:0;
      .edit{
        padding-left: 1rem;
        margin-top: 0.9rem;
        font-size: 0.48rem;
      }
      span{
        position: absolute;
        bottom: 0;
        display: inline-block;
        width: 50%;
        border-top: 1px solid #ebebeb;
        font-size: 0.48rem;
        line-height: 1.2rem;
        text-align: center;
        box-sizing: border-box;
      }
      .cancel{
        left: 0;
        border-right: 1px solid #ebebeb;
      }
      .add{
        right: 0;
        color: #4CC3AD;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
