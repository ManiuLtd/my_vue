<template>
    <div class="shop_create_content">
      <div class="top_header">
        <div class="left">
          <img src="../assets/images/back_left_blank.png">
        </div>
        <div class="title">店铺管理</div>
      </div>
      <form class="content">
        <van-collapse v-model.trim="activeName" accordion>
          <van-collapse-item title="基本信息" name="1">
            <div class="input_content">
              <ul class="input_box">
                <li class="input_div">
                  <label><span class="must">*</span>店铺名称</label>
                  <input type="text" placeholder="输入店铺名称" value="">
                </li>
                <li class="input_div input_img">
                  <label><span class="must">*</span>店铺LOGO</label>
                  <img src="../assets/images/icon_up_img.png" alt="">
                  <p>图片上传要求：单张图片小于10M，此处只能添加一张图片</p>
                </li>
                <li class="input_div input_img">
                  <label><span class="must">*</span>店铺图片</label>
                  <img src="../assets/images/icon_up_img.png" alt="">
                  <p>图片上传要求：单张图片小于10M此处最多只能添加三张图片。</p>
                </li>
                <li class="input_div">
                  <label><span class="must">*</span>家庭地址</label>
                  <input type="text" placeholder="输入店铺名称" value="">
                </li>
                <li class="input_div">
                  <label><span class="must">*</span>详细地址</label>
                  <input type="text" placeholder="输入详细地址" value="">
                </li>
                <li class="input_div">
                  <label><span class="must">*</span>商家电话</label>
                  <input type="text" placeholder="输入商家电话" value="">
                </li>
              </ul>
            </div>
          </van-collapse-item>
          <van-collapse-item title="配送信息" name="2">
            <div class="input_content">
              <ul class="input_box">
                <li class="input_div">
                  <label><span class="must">*</span>配送服务</label>
                </li>
                <li class="input_div">
                  <label><span class="must">*</span>配送范围(公里)</label>
                  <input type="text" placeholder="输入与商家的直线距离" value="" style="width: 53%;">
                </li>
                <li class="input_div">
                  <label><span class="must">*</span>配送费</label>
                </li>
                <li class="input_div input_fee">
                  <label><span class="must">*</span>最低运费</label>
                  <input type="text" placeholder="输入多少公里以内，运费统一为多少元" value="">
                  <p>例如：20公里以内，运费统一为5元</p>
                </li>
                <li class="input_div input_fee">
                  <label><span class="must">*</span>附加运费</label>
                  <input type="text" placeholder="输入每增加多少公里，运费增加多少元" value="">
                  <p>例如：没增加30公里，运费增加3元</p>
                </li>
                <li class="input_div">
                  <label><span class="must">*</span>订单起送金额(元)</label>
                  <input type="text" placeholder="输入起送金额" value="" style="width: 45%;">
                </li>
                <li class="input_div">
                  <label><span class="must">*</span>配送时间(每天)</label>
                  <i class="icon_arrow"></i>
                </li>
              </ul>
            </div>
          </van-collapse-item>
          <van-collapse-item title="满减活动" name="3">
            <div class="input_content">
              <p class="active">
                <radio-button class="active_radio" is-checked="true"></radio-button>
                <span class="active_title">活动一</span>
                <img src="../assets/images/icon_close.png" class="active_close"/>
                <img src="../assets/images/icon_arrow_gray.png" class="active_arrow" alt="">
              </p>
              <p class="active">
                <radio-button class="active_radio"></radio-button>
                <span class="active_title">活动二</span>
                <img src="../assets/images/icon_close.png" class="active_close"/>
                <img src="../assets/images/icon_arrow_gray.png" class="active_arrow" alt="">
              </p>
            </div>
          </van-collapse-item>
        </van-collapse>
        <p class="must_title"><span class="must">*</span>为必填项</p>
        <div style="height: 1.25rem;"></div>
        <span class="preserve_btn">保存</span>
      </form>
    </div>
</template>
<script>

  import RadioButton from '../components/common/RadioButton';

    export default {
      components: {RadioButton},
      data() {
        return {
          activeName: '0',
        };
      },
      mounted () {
        var screenHeigt = window.screen.availHeight;
        document.getElementsByClassName('shop_create_content')[0].style.height=screenHeigt+'px';
        document.getElementsByClassName('shop_create_content')[0].style.backgroundColor='#eee';
      },
      comments:{
        RadioButton
      }
    };
</script>
<style lang="scss" scoped>
  @import "../style/common";
  @import "../style/public";
  /*  下拉小箭头  */
  .input_box .icon_arrow{
    width: .2rem;
    height: .3rem;
    display: inline-block;
    position: absolute;
    background: url("../assets/images/icon_arrow_right.png") no-repeat center;
    background-size: cover;
    right: .5rem;
    top:50%;
    margin-top: -.15rem;
  }
  /*  必填提示  */
  .must_title{
    font-size: .36rem;
    color: #989898;
    padding: .35rem .45rem;
  }
  .must{
    margin-right: .2rem;
    vertical-align: -webkit-baseline-middle;
  }
  /*  隐藏的信息盒子  */
  .input_content{
    margin-bottom: .2rem;
  }
  /*  图片上传*/
  .input_img{
    height: 1.88rem;
  }
  .input_img label{
    position: absolute;
  }
  .input_img img{
    position: absolute;
    left: 3.55rem;
    width: 1.88rem;
    height: 1.88rem;
  }
  .input_img p{
    float: right;
    width: 3.5rem;
    font-size: .32rem;
    color: #cdcdd1;
  }
  /*  配送费  */
  .input_fee{
    height: 2.4rem;
  }
  .input_box .input_fee input{
    display: block;
    border: 1px dashed #999999;
    height: 1.1rem;
    width: 87%;
    text-align: left;
    padding-left: .3rem;
  }
  .input_box .input_fee input::-webkit-input-placeholder{
    text-align: left;
  }
  .input_fee p{
    position: absolute;
    bottom: .45rem;
    font-size: .32rem;
    color: #4cc3ad;
    padding-left: .3rem;
  }
  /*  满减活动 */
  .active{
    position: relative;
    padding: .6rem 1.15rem;
    font-size: .48rem;
    color: $font_100;
  }
  .active_radio{
    position: absolute;
    top: 0.3rem;
    left: 0.5rem;

  }
  .active_title{
    padding-left: .3rem;
  }
  .active_close{
    position: absolute;
    top: 50%;
    margin-top: -.27rem;
    right: 1.3rem;
    width: .53rem;
  }
  .active_arrow{
    width: .2rem;
    position: absolute;
    top:50%;
    margin-top: -.15rem;
    right: .5rem;
  }
</style>
