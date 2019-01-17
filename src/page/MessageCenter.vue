<template>
    <div class="msg_box">
      <div class="page_bg"></div>
      <top-header title-txt="消息中心"></top-header>
      <ul class="msg_content">
          <van-list v-model="loading" :finished="finished" @load="getMessage" >
              <li v-for="(msg,index) in msgList" @click="readMsg(index+1,msg,$event)" :key="index">
                  <img :src="msg.read_status == 1 ?readImg:unreadImg" alt="">
                  <p :class="{msg_title_fold:openMsg != index+1}" v-text="msg.msg_content"></p>
                  <p class="msg_time" v-text="msg.msg_add_time" v-show="openMsg != index+1"></p>
              </li>
          </van-list>
      </ul>
    </div>
</template>

<script>
  import * as API from '../service/API';
  import Toast from '../widget/Toast';
  import TopHeader from '../components/TopHeader';

    export default {
      data(){
        return {
          msgList:[],
          loading: false,
          runload:false,
          finished: false,
          pageInfo:{
            total:0,
            currPage:1,
            nextPage:0,
            pageCount:0
          },
          openMsg:'',   //展开消息
          readImg:require("../assets/images/icon_message_center.png"),
          unreadImg:require("../assets/images/icon_message_center_unread.png")
        }
      },
      methods:{
        getMessage(){
          if(this.runload){
            return ;
          }
          this.runload = true;
          let data = {};

          if(this.pageInfo.currPage != this.pageInfo.pageCount){
            data.p = this.pageInfo.nextPage;
          }
          this.$post(API.MESSAGE,data).then((response)=>{
            this.runload = false;
            this.loading = false;
            if(response.code != 200){
              new Toast(response.msg).show();
              return ;
            }
            this.pageInfo = response.pageInfo;
            if(this.pageInfo.currPage ==this.pageInfo.pageCount){
              this.finished = true;
            }
            if(response.message_list.length > 0){
              this.msgList = this.msgList.concat(response.message_list);
            }else{
              this.finished = true;
            }

          });
        },
        readMsg(i,msg,event){
          let that = event.currentTarget;
          if(msg.read_status == 0){
            let request_url = API.BASEURL+"/admin/message/"+msg.msg_id+".html";
            this.$get(request_url).then((response)=>{
              if(!response){
                new Toast(response.msg).show();
                return;
              }else if(response){
                msg.read_status = 1;
                that.children[0].setAttribute("src",this.readImg);
                if(this.openMsg == i){
                  this.openMsg = false;
                }else {
                  this.openMsg = i;
                }
              }
            });
          }else{
            that.children[0].setAttribute("src",this.readImg);
            if(this.openMsg == i){
              this.openMsg = false;
            }else {
              this.openMsg = i;
            }
          }
        },
      },
      mounted() {
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
    background-color: white;
    padding: 1.62rem .3rem 0;
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
