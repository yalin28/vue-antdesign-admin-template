import { SET_MULTI_TAB, ADD_EXCLUDE_VIEW, DEL_EXCLUDE_VIEW } from '../mutation-types'

const multiTab = {
  state: {
    tabList: [], // multi-tab 打开的路由
    excludeViews: [], //需要排除缓存的页面，点击 muiltiTab 的关闭后 将路由加入 excludeViews 中，下次监听路由的时候重新开启缓存
  },
  mutations: {
    [SET_MULTI_TAB](state, tabList) {
      state.tabList = []
      state.tabList = tabList
    },
    [ADD_EXCLUDE_VIEW]: (state, view) => {
      if (state.excludeViews.includes(view.name)) return
      if (!view.meta.Cache) {
        state.excludeViews.push(view.name)
      }
    },
    [DEL_EXCLUDE_VIEW]: (state, view) => {
      const index = state.excludeViews.indexOf(view.name)
      index > -1 && state.excludeViews.splice(index, 1)
    },
  },
  actions: {
    addNoCachedView({ commit }, view) {
      commit('ADD_EXCLUDE_VIEW', view)
    },
    delNoCachedView({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_EXCLUDE_VIEW', view)
        resolve([...state.excludeViews])
      })
    },
  },
}
export default multiTab
