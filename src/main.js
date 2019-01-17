// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './stores'
import './config/rem' // rem
import { get, post, postImg } from "./service/Server";  // http
import './style/font/font-style.scss'

//定义axios 请求全局变量
Vue.prototype.$get = get;
Vue.prototype.$post = post;

Vue.prototype.$postImg = postImg;

Vue.config.productionTip = false

//引入vant 组件
import Vant from 'vant';
// import 'vant/lib/vant-css/index.css';

Vue.use(Vant);
Vue.use(Vuex)


// 自定义全局过滤--------------------------
import Filters from '@/global/filters.js'
// 自定义全局过滤--------------------------

/* eslint-disable no-new */
new Vue({
  el: '#app',
  filters: Filters,
  router,
  store,
  components: { App },
  template: '<App/>'
})

