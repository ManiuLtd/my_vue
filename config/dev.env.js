'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_URL: '"http://test.admin.weilainongzi.com"',
  UPLOAD_IMG_URL: '"http://47.94.152.208:12345/file/upload_.html"',
  ALY_IMG_URL: '"http://ysfq-test.oss-cn-beijing.aliyuncs.com/"',
})
