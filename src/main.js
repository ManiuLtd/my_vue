// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// rem
import './config/rem'
// http
import {get,post,postImg} from "./service/Server";

//定义axios 请求全局变量
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$postImg = postImg;

Vue.config.productionTip = false

//引入vant 组件
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

Vue.use(Vant);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

/**
 * 解决keepAlive造成返回上一页无法清除缓存问题，使用时需在子页route中配置meta.rank数据
 *
 */
Vue.mixin({
  beforeRouteLeave:function(to, from, next){
    if (from && from.meta.rank && to.meta.rank && from.meta.rank>to.meta.rank)
    {
      if (this.$vnode && this.$vnode.data.keepAlive)
      {
        if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache)
        {
          if (this.$vnode.componentOptions)
          {
            var key = this.$vnode.key == null
              ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
              : this.$vnode.key;
            var cache = this.$vnode.parent.componentInstance.cache;
            var keys  = this.$vnode.parent.componentInstance.keys;
            if (cache[key])
            {
              if (keys.length) {
                var index = keys.indexOf(key);
                if (index > -1) {
                  keys.splice(index, 1);
                }
              }
              delete cache[key];
            }
          }
        }
      }
      this.$destroy();
    }
    next();
  },
});
