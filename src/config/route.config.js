// 默认加载和登陆成功跳转路由
export const defaultRootRoutePath = "/dashboard";

// 不跳转白名单路由名
export const whiteList = ["login", "register", "registerResult"];

// 前端未找到页面路由
export const notFoundRouter = {
  path: "/:pathMatch(.*)*",
  redirect: "/404",
  hidden: true,
};

export default {
  defaultRootRoutePath,
  whiteList,
  notFoundRouter,
};
