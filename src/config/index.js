/* 项目通用全局配置 */

export const TOKEN_NAME = "ACCESS_TOKEN";
export const openPermission = true; // 是否开启权限控制 开启则从接口获取路由
export const prodUseMock = true; // 生产环境中是否可以用 mock，正式项目中请不开启此选项
export const prodShowSettingDrawer = true; // 生产环境中是否显示设置抽屉

// storage options
export const storageOptions = {
  namespace: "PRO__",
  name: "ls",
  storage: "local",
};

export default {
  TOKEN_NAME,
  openPermission,
  prodUseMock,
  prodShowSettingDrawer,
  storageOptions,
};
