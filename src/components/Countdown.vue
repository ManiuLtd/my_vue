<template>
    <div class="verification_code_box">
      <span v-if="isClick" class="verification_code" @click="getVerification" v-text="content"></span>
      <span v-if="!isClick" class="verification_code" style="color:#ccc;" v-text="content"></span>
    </div>
</template>

<script>

  let lastTime = 60;

  export default {
    data(){
      return{
        content: '获取验证码',
        isClick: true
      }
    },
    methods:{
      getVerification(){
        this.$emit('callBackRightClick');
      },
      startCountDown(){
        if(lastTime === 0){
          this.isClick = true;
          lastTime = 60;
          this.disabled = '';
          this.content = '重新获取';
        } else {
          this.isClick = false;
          lastTime--;
          this.disabled = ' disabled';
          this.content = lastTime + 's';
          setTimeout(()=>{
            this.startCountDown();
          },1000)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .verification_code_box{
    display: inline-block;
  }
  .verification_code{
    color: #4cc3ad;
    font-size: 0.48rem;
  }
</style>
