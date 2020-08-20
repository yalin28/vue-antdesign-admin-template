/* 项目通用全局配置 */

module.exports = {
  TOKEN_NAME: 'ACCESS_TOKEN',
  openPermission: true, // 是否开启权限控 开启则从接口获取路由
  prodUseMock: true, //生产环境中是否可以用 mock，正式项目中请不开启此选项
  prodShowSettingDrawer: true, //生产环境中是否显示设置抽屉

  // vue-ls options Vue-ls 插件配置项 (localStorage/sessionStorage)
  storageOptions: {
    namespace: 'PRO__',
    name: 'ls', // 用 Vue.name.xx(get/set/remove/clear)
    storage: 'local', // session, local, memory
  },
}
