<template>
    <div class="msg_box">
      <top-header title-txt="消息中心"></top-header>
      <ul class="msg_content">
        <li v-for="(msg,index) in msgList" @click="openMsg($event)" :key="index">
          <img src="../assets/images/icon_message_center.png" alt="">
          <p class="msg_title_fold" v-text="msg.msg_content"></p>
          <p class="msg_time" v-text="msg.msg_add_time"></p>
        </li>
      </ul>
    </div>
</template>

<script>

  import * as API from '../service/API';
  import Loading from '../widget/loading/loading'
  import TopHeader from '../components/TopHeader';

    export default {
      data(){
        return {
          msgList:[]
        }
      },
      methods:{
        getMessage(){
          let loading = new Loading();
          loading.show();
          this.$get(API.MESSAGE).then((response)=>{
            if(response.code != 200){
              new Toast(response.msg).show();
              return ;
            }
            this.msgList = response.message_list;
            loading.close();
          }).then((error)=>{
            loading.close();
          });
        },
        setBg(){
          let screenHeigt = window.screen.availHeight;
          let topHeight = document.getElementsByClassName('common_header')[0].offsetHeight;
          document.getElementsByClassName('msg_box')[0].style.minHeight = screenHeigt - topHeight + 'px';
          document.getElementsByClassName('msg_box')[0].style.backgroundColor = '#eee';
        },
        openMsg(event){
          var that = event.currentTarget;
          that.childNodes[2].className='';
          that.childNodes[4].style='display:none;';
          var sib = this.siblings(that);
          for(var i = 0;i<sib.length;i++){
            sib[i].childNodes[2].className='msg_title_fold';
            sib[i].childNodes[4].style='display:block;';
          }
        },
        siblings(elm) {
          var a = [];
          var p = elm.parentNode.children;
          for(var i =0,pl= p.length;i<pl;i++) {
            if(p[i] !== elm) a.push(p[i]);
          }
          return a;
        }
      },
      mounted() {
        this.setBg();
        this.getMessage();
      },
      components:{
        TopHeader
      },
    }
</script>

<style lang="scss" scoped>
  @import "../style/common.scss";
  .msg_content{
    margin-top: 1.62rem;
    background-color: white;
    padding: 0 .3rem;
  }
  .msg_content li{
    position: relative;
    border-top: 1px solid #DFDFDD;
    padding: .7rem .4rem;
    font-size: 0;
  }
  .msg_content li p{
    width: 80%;
    display: inline-block;
    font-size: .48rem;
    color: $font_100;
  }
  .msg_content li img{
    width: 1.14rem;
    height: 1.14rem;
    vertical-align: top;
    margin-right: .3rem;
  }
  .msg_content li .msg_title_fold{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    vertical-align: top;
  }
  .msg_content .msg_time{
    position: absolute;
    left: 1.84rem;
    top: 1.44rem;
    font-size: .32rem;
    color: #989898;
  }
</style>
