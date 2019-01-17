import LocalStorageUtils from '../utils/LocalStorageUtils';
import { LOGOUT,PARTNER_INFO} from '../service/API';
import { authorize } from '../utils/WeixinUtils';
import Toast from '../widget/Toast';
import Vue from 'vue';
import { Dialog } from 'vant';

Vue.use(Dialog);

/**
 *  登录跳转处理，如下case中的页面，需要加此判断
 * */
export function loginRedirect(ctx){
  ctx.$store.dispatch('initUserInfo');
  authorize();
  let userInfo = ctx.$store.state.userInfo.userInfo;
  if(!userInfo.aName){ return; }       //用户名不为空将做下面的请求
  let is_ident = userInfo.is_ident;
  let partnerStatus = userInfo.partnerStatus;
  let partnerName = userInfo.partnerName;
  if(true == is_ident){
    if('5' == partnerStatus && partnerName){
      ctx.$router.replace('/main');
      return;
    }
  }
  getPartnerInfo(ctx);
}

//单独获取
function getPartnerInfo(ctx) {
  ctx.$get(PARTNER_INFO).then((response) => {
    if (response.code != 200) {
      new Toast(response.msg).show();
      return;
    }
    let is_ident = response.data.is_ident;
    let partnerStatus = response.data.partner_status;
    let partnerName = response.data.partner_name;
    let nextPage = '/loginSuccess';
    if(true == is_ident){
      //审核状态【1.未申请 2.待审核 3.打回 4.拒绝 5.通过】，审核通过后启用
      switch (partnerStatus) {
        case '5':
          nextPage = partnerName ? '/main' : './reviewSuccess';
          break;
        case '2':
          nextPage = './reviewProcessing';
          break;
        case '3':
          nextPage = './reviewFailure';
          break;
        case '4':
          nextPage = './reviewRefuse';
          break;
        case '1':
          nextPage = '/loginSuccess';
          break;
        default:
          nextPage = '/loginSuccess';
          break;
      }
    }
    ctx.$store.dispatch('setUserInfo',response.data);
    ctx.$router.replace(nextPage);
  });
}


export function showDialog(ctx){
  Dialog.confirm({
    title:'退出当前账号'
  }).then(() => {
    signOut(ctx);
  }).catch(() => {
    // on cancel
  });
}

export function signOut(ctx){
  ctx.$post(LOGOUT).then((response)=>{
    if(response.code == 200){
      //LocalStorageUtils 清空
      new LocalStorageUtils().clear();
      ctx.$store.dispatch('clearUserInfo');
      ctx.$router.push("/login");
      try {  //非 app 登录，无该方法，捕获异常，不要弹错误
        window.erock.erock_signOut();
      }catch (e) {
        console.log('非app内登录，无法调取app方法')
      }
    }
  });
}
