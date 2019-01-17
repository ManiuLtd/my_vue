import * as types from '../mutation-types'

let storeAddrBean = {
  area: "",
  area_name: "",
  city: "",
  city_name: "",
  name: "",
  province_name: "",
  provinces: "",
  lat:"",
  lng:"",
  selectAddress:""
}

const state = {
  addressInfo:storeAddrBean,
  addressRouter:'',
}

const getters = {
}

const mutations = {
  [types.SAVE_ADDRESS](state,address){
    state.addressInfo = {...address}
  },
  [types.CLEAR_ADDRESS](state){
    state.addressInfo = {}
  }
}

const actions = {
  saveAddress({commit,state},address){
    commit(types.SAVE_ADDRESS,address)
  },
  clearAddress({commit,state}){
    commit(types.CLEAR_ADDRESS)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
