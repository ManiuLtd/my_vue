import * as types from '../mutation-types'

const state = {
  attribute:[], //属性集合
  specInfos:[],  // 规格集合
  delSpecIds:[], //删除规格id集合
}

const getters = {
}

const mutations = {
  [types.SAVE_SPEC_OVERVIEW](state,data){
    state.specInfos = data ? [...data] : [];
  },
  [types.SAVE_DEL_SPEC](state,ids){
    state.delSpecIds = ids ? [...ids] : [];
  },
  [types.CLEAR_DEL_SPEC](state){
    state.delSpecIds = [];
  },
  [types.SAVE_ATTR_INFO](state,attribute){
    state.attribute = [...attribute]
  },
  [types.CLEAR_GOODS_INFO](state){
    state.specInfos = [];
    state.attribute = [];
  }
}

const actions = {
  saveSpecInfo({commit,state},specInfo){
    commit(types.SAVE_SPEC_OVERVIEW,specInfo)
  },
  saveAttrInfo({commit,state},attribute){
    commit(types.SAVE_ATTR_INFO,attribute)
  },
  saveDelSpecInfo({commit,state},ids){
    commit(types.SAVE_DEL_SPEC,ids)
  },
  clearDelSpecInfo({commit,state}){
    commit(types.CLEAR_DEL_SPEC)
  },
  clearGoods({commit,state}){
    commit(types.CLEAR_GOODS_INFO)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

