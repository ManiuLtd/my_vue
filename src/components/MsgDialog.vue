<template>
    <div class="content" v-if="Object.keys(msgInfo).length > 0">
      <div class="dialog_shadow_bg"></div>
      <div class="dialog_layout">
        <div class="dialog_header">
          <span class="title" v-text="msgInfo.msg_title"></span>
        </div>
        <div class="dialog_content" v-text="msgInfo.msg_content"></div>
        <div class="dialog_footer" @click="submit">确定</div>
      </div>
    </div>
</template>

<script>
    export default {
      props:{
        msgInfo:{default: {}},
      },
      methods:{
        submit(){
          this.$emit('setRead');
          this.$router.push('/messageCenter');
        }
      }
    }
</script>

<style lang="scss" scoped>
  .content{
    .dialog_shadow_bg{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      z-index: 1000;
    }
    .dialog_layout{
      background-color: white;
      position: fixed;
      top: 40%;
      left: 15%;
      z-index: 1001;
      border-radius: 0.5rem;
      width: 7.8rem;
      .dialog_header{
        line-height: 0.8rem;
        text-align: center;
        .title{
          color: #1a1b39;
          font-size: 0.48rem;
        }
      }
      .dialog_content{
        overflow-y:auto;
        min-height: 1rem;
        max-height: 3rem;
        color: #1a1b39;
        padding: 0.2rem 0.5rem;
        font-size: 0.36rem;
      }
      .dialog_footer{
        border-top: 1px solid #ebebeb;
        font-size: 0.48rem;
        text-align: center;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        color: #4CC3AD;
      }
    }
  }
</style>
