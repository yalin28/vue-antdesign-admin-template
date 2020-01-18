import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // 进度条
import '@/components/NProgress/nprogress.less' // 自定义进度条样式
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import permissionConfig from '@/config/permission.config'

NProgress.configure({ showSpinner: false }) // 进度条配置

const whiteList = ['login', 'register', 'registerResult'] // 不跳转白名单
const defaultRoutePath = '/dashboard/analysis'

router.beforeEach((to, from, next) => {
  console.log('开始执行permission.js逻辑...')
  NProgress.start() // 开始加重进度条
  to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`)

  const redirect = decodeURIComponent(from.query.redirect || to.path)

  if (Vue.ls.get(ACCESS_TOKEN)) {
    if (to.path === '/user/login') {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store
          .dispatch('GetInfo')
          .then(res => {
            // 开启了权限控制 走动态添加路由逻辑
            if (permissionConfig.open) {
              const roles = res.result && res.result.role
              store.dispatch('GenerateRoutes', { roles }).then(() => {
                // 根据roles权限生成可访问的路由表
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
              description: '请求用户信息失败，请重试'
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
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done() // 如果当前页面是登录页后则不会触发afterEach钩子，所以手动处理它
    }
  }
})

router.afterEach(() => {
  console.log('[permission.js逻辑执行结束]')
  NProgress.done() // 结束进度条加载
})
