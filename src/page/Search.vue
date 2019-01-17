<template>
  <div class="search-container">
    <div class="search-position">
      <i></i>
      <p class="search-position-title" v-text="city"></p>
    </div>
    <div class="search-input">
      <img class="iconfont" src="../assets/images/search_gray.png"/>
      <input type="text" autofocus="autofocus" v-model.trim="search_val" :placeholder="placeholder">
    </div>
    <span class="btn-search" v-bind:class="{ active: btnActive }" @click="search(search_val)">搜索</span>
  </div>
</template>

<script>
  export default {
    props: ["placeholder", "fun_click",'search','city'],
    data() {
      return {
        search_val: "",
        btnActive: false
      }
    },
    watch: {
      search_val(data) {
        if (data !== "") {
          this.btnActive = true;
          this.fun_click(data);
        }
        else {
          this.btnActive = false;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .search-container {
    height: 1.2rem;
    padding-top: 0.2rem;
    top: 0;
    width: 100%;
    position: fixed;
    display: flex;
    padding-bottom: 0.2rem;
    background: #fff;
    z-index: 9999;
    .search-position{
      position: relative;
      padding-left:0.46rem;
      i{
        position: absolute;
        display: inline-block;
        width: .3rem;
        height: .4rem;
        background: url("../assets/images/icon_location_city.png") no-repeat center;
        background-size: cover;
        top: 45%;
        margin-top: -.25rem;
      }
      .search-position-title{
        margin-left: .5rem;
        font-size: .36rem;
        line-height: 1rem;
        color: rgba(26,27,57,1);
      }
    }
    .search-input, .btn-search {
      line-height:1rem;
      font-size: 0.36rem;
    }
    .search-input {
      flex: 1;
      height: 1rem;
      background: rgb(239, 238, 244);
      border-radius: 0.5rem;
      margin: 0 10px;
      padding-left: 0.1rem;
      .iconfont{
        padding-bottom: 0.1rem;
        padding-left: 0.2rem;
        background-size: cover;
        width: 0.42rem;
        height: 0.42rem;
        border: none;
        outline: none;
      }
      input {
        width: 85%;
        border: none;
        text-indent: 0.1rem;
        outline: none;
        background: rgba(237, 237, 237, 0.1);
        line-height: normal;
        &::-webkit-input-placeholder {
          font-size: 0.36rem;
        }
      }
    }
    .btn-search {
      font-size:0.36rem;
      display: inline-block;
      color: #fff;
      width:1.45rem;
      text-align: center;
      border-radius: 0.1rem;
      margin-right:5px;
      color: #4cc3ad;
    }
  }
</style>
