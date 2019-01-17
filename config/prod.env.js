'use strict'
const target = process.env.npm_lifecycle_event;
let buildConfig = {};
if(target == 'dev'){
  buildConfig = {
    NODE_ENV: require('./dev.env').NODE_ENV,
    API_URL: require('./dev.env').API_URL,
    UPLOAD_IMG_URL: require('./dev.env').UPLOAD_IMG_URL,
    ALY_IMG_URL: require('./dev.env').ALY_IMG_URL,
  }
}else if(target == 'build') {
  buildConfig = {
    NODE_ENV: '"production"',
    API_URL: '"http://m.weilainongzi.com"',
    UPLOAD_IMG_URL: '"https://yschannel.otouzi.com/file/upload_.html"',
    ALY_IMG_URL: '"https://ysfq-online.oss-cn-beijing.aliyuncs.com/"',
  }
}else if(target == 'test') {
  buildConfig = {
    NODE_ENV: '"test"',
    API_URL: '"https://test-sapi.qsys.club"',
    UPLOAD_IMG_URL: '"https://test-channel.qsys.club/file/upload_.html"',
    ALY_IMG_URL: '"https://qy-dev.oss-cn-beijing.aliyuncs.com/"',
  }
}
module.exports = buildConfig
