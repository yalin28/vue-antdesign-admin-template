import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // 进度条
import '@/components/NProgress/nprogress.less' // 自定义进度条样式
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'

import { TOKEN_NAME, openPermission } from '@/config/index'
import { defaultRootRoutePath, whiteList } from '@/router/router.config'

if (openPermission) {
  NProgress.configure({ showSpinner: false }) // 进度条配置
}

router.beforeEach((to, from, next) => {
  console.log('开始执行permission.js逻辑...')
  // 开启了权限控制从接口获取角色对应的权限，会有接口请求过程，需要用到进度条；如果没开启权限控制，则不必启用进度条。
  // 开启可权限控制的同时也要判断路由是否在multiTab中打卡，已经打开的也不需要用到进度条。
  if (openPermission && !store.getters.multiTabList.includes(to.fullPath)) {
    NProgress.start() // 开始加重进度条
  }

  to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`)

  // 请求带有 redirect 重定向时，登录自动重定向到该地址
  const redirect = decodeURIComponent(from.query.redirect || to.path)

  if (Vue.ls.get(TOKEN_NAME)) {
    if (to.path === '/user/login') {
      next({ path: defaultRootRoutePath })
      if (openPermission) {
        NProgress.done()
      }
    } else {
      if (store.getters.roles.length === 0) {
        store
          .dispatch('GetInfo')
          .then((res) => {
            // 开启了权限控制 走动态添加路由逻辑
            if (openPermission) {
              const token = res.result && res.result.id
              store.dispatch('GenerateRoutesSync', { token }).then(() => {
                // 动态添加可访问路由表
                router.addRoutes(store.getters.addRouters)
                if (to.path === redirect) {
                  // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                  next({ ...to, replace: true })
                } else {
                  // 跳转到目的路由
                  next({ path: redirect })
                }
              })
            } else {
              if (to.path === redirect) {
                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            }
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试',
            })
            store.dispatch('Logout').then(() => {
              next({ path: '/user/login', query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    // 无 token
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      if (openPermission) {
        NProgress.done() // 如果当前页面是登录页后则不会触发afterEach钩子，所以手动处理它
      }
    }
  }
})

router.afterEach(() => {
  console.log('[permission.js逻辑执行结束]')
  if (openPermission) {
    NProgress.done() // 结束进度条加载
  }
})
