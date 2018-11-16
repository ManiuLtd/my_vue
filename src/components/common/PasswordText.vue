<template>
  <div class="content">
    <input class="edit" v-bind:type="inputType" v-bind:placeholder="inputHint" v-model.trim="inputContent"/>
    <div class="option">
      <img class="delete" src="../../assets/images/icon_close.png" v-show="isShowDelte" v-on:click="clearInput"/>
      <input type="checkbox" class="show" v-show="isShowPassword" v-model.trim="isCheckedPassword"/>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        inputContent : '',
        inputType : 'password',
        isCheckedPassword : false,
      }
    },
    props:{
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
      },
      isShowPassword(){
        if(this.inputContent&&this.inputContent.length>0){
          return true;
        }
        return false;
      },
    },
    watch:{
      isCheckedPassword:function () {
        return this.isCheckedPassword ? this.inputType = 'text' : this.inputType = 'password';
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
    .option{
      width: 20%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .delete{
        padding-right: 0.15rem;
        width: 0.53rem;
        height: 0.53rem;
      }
      .show{
        top: -0.15rem;
        width: 0rem;
        height: 0rem;
        position: relative;
      }
      .show:before,.show:after{
        content: '';
        width: 0.66rem;
        height: 0.36rem;
        position: absolute;
        display: inline-block;
        background-image: url("../../assets/images/hide_password.png");
        background-size: cover;
      }
      .show:checked:after{
        background-image: url("../../assets/images/show_password.png");
        transition: .3s ease;
        background-size: cover;
      }
    }
  }
</style>
