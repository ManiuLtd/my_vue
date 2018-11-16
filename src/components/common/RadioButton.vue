<template>
    <div class="radio_content">
      <input type="radio" class="rdo" v-bind:name="radio_name" v-bind:checked="isChecked" :value="radio_val" @change="radio_change"/>
      <span class="val" v-text="radio_title"></span>
    </div>
</template>

<script>
    export default {
      props:{
        isChecked:{
          default:false
        },
        radio_name:{
          default:'common_radio'
        },
        radio_title:{
          default: ''
        },
        radio_val:{
          default: ''
        }
      },
      methods:{
        radio_change(){
          this.$emit('radioChange',this.radio_val)
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../style/common.scss";
  .radio_content{
    display: inline-block;
    position: relative;
    padding-left: .71rem;
    font-size: 0;
  }
  .rdo{
    width: 0rem;
    height: 0rem;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -.25rem;
  }
  .rdo:before,.rdo:after{
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("../../assets/images/icon_radio_nocheck.png");
    width: 0.51rem;
    height: 0.51rem;
    background-size: cover;
  }
  .rdo:checked:after{
    background-image: url("../../assets/images/icon_radio_check.png");
    transition: .3s ease;
    background-size: cover;
  }
  .val{
    font-size: .48rem;
    color: $font_100;
  }
</style>
