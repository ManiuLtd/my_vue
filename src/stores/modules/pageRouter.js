import * as types from '../mutation-types'

const state = {
  isRefresh: false
}

const getters = {
}

const mutations = {
  [types.SET_ROUTER_REFRESH](state,isRefresh){
    state.isRefresh = isRefresh
  },
}

const actions = {
  setIsRefresh({commit,state},isRefresh){
    commit(types.SET_ROUTER_REFRESH,isRefresh)
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}

