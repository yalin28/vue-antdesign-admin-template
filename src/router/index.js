import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap, syncRouterMap } from '@/config/router.config'
import { openPermission } from '@/config/permission.config'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: openPermission ? constantRouterMap : constantRouterMap.concat(syncRouterMap), //未开启权限默认把权限路由加进去
})
