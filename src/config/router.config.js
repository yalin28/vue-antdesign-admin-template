// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteLayout } from '@/layouts'

// 自定义 icon引入
// import { bxAnaalyse } from '@/core/icons'

// 默认加载和登陆成功跳转路由
export const defaultRootRoutePath = '/dashboard'

// 不跳转白名单路由名
export const whiteList = ['login', 'register', 'registerResult']

// 前端未找到页面路由（固定不用改）
export const notFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true,
}

// 同步路由 一般为前端写死的路由不通过接口获取
export const syncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: `${defaultRootRoutePath}/analysis`,
    children: [
      // 默认页
      {
        path: defaultRootRoutePath,
        name: 'dashboard',
        redirect: `${defaultRootRoutePath}/analysis`,
        component: RouteLayout,
        meta: { title: '工作台', keepAlive: true, icon: 'dashboard', permission: ['dashboard'] },
        children: [
          {
            path: `${defaultRootRoutePath}/analysis`,
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'hello', keepAlive: true, permission: ['dashboard'] },
          },
        ],
      },
      {
        path: '/example',
        name: 'example',
        redirect: '/example/table',
        component: RouteLayout,
        meta: { title: '示例页面', keepAlive: true, icon: 'thunderbolt', permission: ['dashboard'] },
        children: [
          {
            path: '/example/table',
            name: 'exampleTableList',
            component: () => import('@/views/example/TableList'),
            meta: { title: 'table', keepAlive: true, permission: ['dashboard'] },
          },
          {
            path: '/example/test',
            name: 'exampleTest',
            component: () => import('@/views/example/test'),
            meta: { title: 'test', keepAlive: true, permission: ['dashboard'] },
          },
        ],
      },
      {
        path: 'https://pro.loacg.com/docs/getting-started',
        name: 'docs',
        meta: { title: '在线文档', icon: 'select', target: '_blank' },
      },
    ],
  },
]

// 基础路由 固定不变的路由
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
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),
      },
    ],
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
  },
]

// 需要异步加载或者权限控制的路由 由接口获取
export const asyncRouterMap = syncRouterMap
