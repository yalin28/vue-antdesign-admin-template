// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'

// 自定义 icon引入
// import { bxAnaalyse } from '@/core/icons'

// 默认加载和登陆成功跳转路由
export const defaultRoutePath = '/dashboard/analysis'

// 不跳转白名单路由名
export const whiteList = ['login', 'register', 'registerResult']

// 需要异步加载或者权限控制的理由
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/analysis',
    children: [
      // 默认页
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/analysis',
        component: RouteView,
        meta: { title: '工作台', keepAlive: true, icon: 'dashboard', permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '分析页', keepAlive: false, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/quick-start',
        name: 'quickStart',
        redirect: '/quick-start/list',
        component: RouteView,
        meta: { title: '快速开始', keepAlive: true, icon: 'thunderbolt', permission: ['dashboard'] },
        children: [
          {
            path: '/quick-start/list',
            name: 'quickStartList',
            component: () => import('@/views/quick-start/TableList'),
            meta: { title: '表格', keepAlive: false, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: 'https://pro.loacg.com/docs/getting-started',
        name: 'docs',
        meta: { title: '在线文档', icon: 'select', target: '_blank' }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

// 基础路由 非异步加载
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
