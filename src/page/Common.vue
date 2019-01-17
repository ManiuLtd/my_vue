<template>
  <div class="hello">
    <h1>scss常量赋值测试</h1>
    <EditText input-type="password" input-hint="请输入内容"></EditText>
    <div>
      <radio-button></radio-button>
      <radio-button></radio-button>
    </div>
  </div>
</template>

<script>

  import EditText from '../components/common/EditText';
  import RadioButton from '../components/common/RadioButton';
  export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    EditText,RadioButton
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/common";
  h1{
    color: $main_grren;
  }
</style>
