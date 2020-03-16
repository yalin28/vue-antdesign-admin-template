import { SET_MULTI_TAB } from '../mutation-types'

const multiTab = {
  state: {
    tabList: [] // multi-tab 打开的路由
  },
  mutations: {
    // 用计算属性命名功能将常量作为函数名
    [SET_MULTI_TAB](state, tabList) {
      state.tabList = []
      state.tabList = tabList
    }
  },
  actions: {}
}
export default multiTab
