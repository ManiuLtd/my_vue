<template>
  <div class="content">
    <input class="edit" v-bind:type="inputType" v-bind:placeholder="inputHint" v-model.trim="inputContent"/>
    <img class="delete" src="../../assets/images/icon_close.png" v-show="isShowDelte" v-on:click="clearInput"/>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        inputContent : '',
      }
    },
    props:{
      inputType:{
        // 对应input 中的类型，text, number ...
        default:'text'
      },
      inputHint:{
        require:true
      }
    },
    computed:{
      isShowDelte(){
        this.$emit('sendInputContent',this.inputContent);
        if(this.inputContent&&this.inputContent.length>0){
          return true;
        }
        return false;
      }
    },
    methods:{
      clearInput(){
        this.inputContent = '';
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/common";

  .content{
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;
    .edit{
      border: none;
      outline: none;
      color: $font_100;
      font-size: 0.48rem;
      width: 70%;
    }
    .delete{
      padding-right: 0.1rem;
      width: 0.53rem;
      height: 0.53rem;
    }
  }
</style>
