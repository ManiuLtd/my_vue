import axios from 'axios';
import { WEIXIN_USER } from '../service/API'

function isWeiXin() {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

function getQueryString(name) {
  let reg = `(^|&)${name}=([^&]*)(&|$)`;
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

export function authorize(){
  let code = getQueryString('code');
  if(isWeiXin()){
    axios.get(WEIXIN_USER,{ params:{'code': code,'redirect_uri':location.href} }).then(response => {
      let data = response.data;
      if(data&&data.code=='301'){
        let url = data.redirectUrl;
          window.location.href = url;
      }
    })
  }
}
