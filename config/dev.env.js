'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_URL: '"https://test-sapi.qsys.club"',
  API_URL: '"http://qingsong.com"',
  // UPLOAD_IMG_URL: '"https://test-channel.qsys.club/file/upload_.html"',
  // UPLOAD_IMG_URL: '"http://47.94.152.208:12345/file/upload_.html"',
  // ALY_IMG_URL: '"http://ysfq-test.oss-cn-beijing.aliyuncs.com/"',
  UPLOAD_IMG_URL: '"https://test-channel.qsys.club/file/upload_.html"',
  ALY_IMG_URL: '"https://qy-dev.oss-cn-beijing.aliyuncs.com/"',
})
