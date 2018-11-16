<template>
  <div class="basic">
    <top-header title-txt="满减活动" father-right="添加" @callBackRightClick="addContact"></top-header>
    <p>您还没有满减活动，快添加吧~</p>
  </div>
</template>

<script>

  import TopHeader from '../components/TopHeader'
  import RadioButton from '../components/common/RadioButton.vue'

  export default {
    name: "StoreInfo",
    mounted() {
      var screenHeigt = window.screen.availHeight;
      var topHeight = document.getElementsByClassName('common_header')[0].offsetHeight;
      document.getElementsByClassName('basic')[0].style.minHeight = screenHeigt - topHeight + 'px';
    },
    methods:{
      addContact(){
        this.$router.push('/shopActive');
      }
    },
    components: {TopHeader,RadioButton}
  }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  @import "../style/public.scss";
  .basic{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #757575;
    font-size: .48rem;
  }
</style>
