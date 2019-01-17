import * as types from '../mutation-types'
import LocalStorageUtils from '../../utils/LocalStorageUtils';

let userInfo = {
  aName:'', //用户手机号
  is_ident:'', //是否认证
  partnerStatus:'', //审核状态【1.未申请 2.待审核 3.打回 4.拒绝 5.通过】，审核通过后启用   -1 为自己添加，表示无partner 信息
  partnerName:'' //商店名称
}

const state = {
  userInfo:{},
  phoneNum:''
}

const getters = {

}

const mutations = {
  // 保存用户信息
  [types.SAVE_USER_INFO](state,userData){
    if(userData){
      state.userInfo = {...userData}
      let localStorageUtils = new LocalStorageUtils();
      localStorageUtils.clear();
      localStorageUtils.setStore('userInfo',state.userInfo);
      let num = state.userInfo.aName;
      if(num){
        state.phoneNum = num.substr(0,3) + '****' + num.substring(7)
      }
    }
  },
  // 初始化用户信息
  [types.INIT_USER_INFO](state){
    if(state.userInfo.aName&&state.userInfo.partnerStatus){
      return;     //适应刷新的情况，刷新会导致vuex store丢失，但又不想频繁赋值，如果上面有值，就不用初始化值了
    }
    let localStorageUtils = new LocalStorageUtils();
    let userDataLocal = localStorageUtils.getStore('userInfo');
    if(userDataLocal&&!state.userInfo.aName){
      state.userInfo = JSON.parse(userDataLocal);
      let num = state.userInfo.aName;
      if(num){
        state.phoneNum = num.substr(0,3) + '****' + num.substring(7)
      }
    }
  },
  [types.CLEAR_USER_INFO](state){
    state.userInfo = {};
  }
}

const actions = {
  setUserInfo({commit,state},userData){
    commit(types.SAVE_USER_INFO,userData)
  },
  initUserInfo({commit,state}){
    commit(types.INIT_USER_INFO);
  },
  clearUserInfo({commit,state}){
    commit(types.CLEAR_USER_INFO);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

