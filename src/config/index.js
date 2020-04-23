/* 项目通用全局配置 */

export const TOKEN_NAME = 'ACCESS_TOKEN'
export const openPermission = true // 是否开启权限控 开启则从接口获取路由
export const prodCanUseMock = true //生成环境包中是否可以用 mock
// vue-ls options Vue-ls 插件配置项 (localStorage/sessionStorage)
export const storageOptions = {
  namespace: 'PRO__',
  name: 'ls', // 用 Vue.name.xx(get/set/remove/clear)
  storage: 'local', // session, local, memory
}
