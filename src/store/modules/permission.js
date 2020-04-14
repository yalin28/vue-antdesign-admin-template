import { constantRouterMap } from '@/router/router.config'
import { generatorDynamicRouter } from '@/router/generator-routers'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
  },
  actions: {
    // 从接口获取
    GenerateRoutesSync({ commit }, data) {
      return new Promise((resolve) => {
        const { token } = data
        generatorDynamicRouter(token).then((routers) => {
          commit('SET_ROUTERS', routers)
          resolve()
        })
      })
    },
  },
}

export default permission
