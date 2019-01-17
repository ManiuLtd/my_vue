import Vue from 'vue';
import Vuex from 'vuex';

import address from './modules/address'
import pageRouter from './modules/pageRouter'
import goods from './modules/goods'
import userInfo from './modules/userInfo'

Vue.use(Vuex);

const state = {
  isRefresh:false, //是否刷新页面
}

export default new Vuex.Store({
  modules:{
    address,
    pageRouter,
    goods,
    userInfo
  }
})
