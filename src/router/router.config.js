import { defaultRootRoutePath, whiteList, notFoundRouter } from "@/config/route.config";
import { openPermission } from "@/config/index";
import exampleModule from "@/router/modules/example";
import linkModule from "@/router/modules/link";

export { defaultRootRoutePath, whiteList, notFoundRouter };

// 基础路由 固定不变的路由
export const constantRouterMap = [
  {
    path: "/user",
    component: () => import("@/layouts/UserLayout.vue"),
    redirect: "/user/login",
    hidden: true,
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/views/user/Login.vue"),
      },
    ],
  },
  {
    path: "/404",
    component: () => import("@/views/exception/404.vue"),
  },
];

// 同步路由 一般为前端写死的路由不通过接口获取
let syncRouterMap = [
  {
    path: "/",
    name: "index",
    component: () => import("@/layouts/BasicLayout.vue"),
    meta: { title: "首页" },
    redirect: `${defaultRootRoutePath}/analysis`,
    children: [
      {
        path: defaultRootRoutePath,
        name: "dashboard",
        redirect: `${defaultRootRoutePath}/analysis`,
        component: () => import("@/layouts/RouteLayout.vue"),
        meta: { title: "工作台", keepAlive: true, icon: "dashboard", permission: ["dashboard"] },
        children: [
          {
            path: `${defaultRootRoutePath}/analysis`,
            name: "analysis",
            component: () => import("@/views/dashboard/Analysis.vue"),
            meta: { title: "hello", keepAlive: true, permission: ["dashboard"] },
          },
        ],
      },
      exampleModule,
      linkModule,
    ],
  },
];

if (!openPermission) {
  syncRouterMap.push(notFoundRouter);
}

export { syncRouterMap };
