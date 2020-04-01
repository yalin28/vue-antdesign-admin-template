import { SET_MULTI_TAB } from '../mutation-types'

const multiTab = {
  state: {
    tabList: [], // multi-tab 打开的路由
    cachedViews: [], //需要缓存的页面
  },
  mutations: {
    // 用计算属性命名功能将常量作为函数名
    [SET_MULTI_TAB](state, tabList) {
      state.tabList = []
      state.tabList = tabList
    },
    ADD_CACHED_VIEW: (state, view) => {
      if (state.cachedViews.includes(view.name)) return
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
    },
    DEL_CACHED_VIEW: (state, view) => {
      const index = state.cachedViews.indexOf(view.name)
      index > -1 && state.cachedViews.splice(index, 1)
    },
    DEL_OTHERS_CACHED_VIEWS: (state, view) => {
      const index = state.cachedViews.indexOf(view.name)
      if (index > -1) {
        state.cachedViews = state.cachedViews.slice(index, index + 1)
      } else {
        // if index = -1, there is no cached tags
        state.cachedViews = []
      }
    },
    DEL_ALL_CACHED_VIEWS: (state) => {
      state.cachedViews = []
    },
  },
  actions: {
    addCachedView({ commit }, view) {
      commit('ADD_CACHED_VIEW', view)
    },
    delCachedView({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_CACHED_VIEW', view)
        resolve([...state.cachedViews])
      })
    },
    delAllCachedViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_CACHED_VIEWS')
        resolve([...state.cachedViews])
      })
    },
    delOthersCachedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_CACHED_VIEWS', view)
        resolve([...state.cachedViews])
      })
    },
  },
}
export default multiTab
