module.exports = {
  proxy: {
    '/api': {    //将www.exaple.com映射为/api
      target: 'http://test.admin.weilainongzi.com',  // 接口域名
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/api': ''   //需要rewrite的,
      }
    }
  }
}
