import { getCurrentUserNav } from "@/api/user";
import { defaultRootRoutePath, notFoundRouter } from "@/config/route.config";

// 前端路由表，用于和接口返回数据做关系映射
const constantRouterComponents = {
  // 基础页面 layout
  BasicLayout: () => import("@/layouts/BasicLayout.vue"),
  BlankLayout: () => import("@/layouts/BlankLayout.vue"),
  RouteLayout: () => import("@/layouts/RouteLayout.vue"),
  PageLayout: () => import("@/layouts/PageLayout.vue"),

  // 异常页
  "403": () => import("@/views/exception/403.vue"),
  "404": () => import("@/views/exception/404.vue"),
  "500": () => import("@/views/exception/500.vue"),

  // views
  Index: () => import("@/views/dashboard/Analysis.vue"),
  TableList: () => import("@/views/example/TableList.vue"),
  TableTest: () => import("@/views/example/test.vue"),
};

export const createRootRouter = () => ({
  key: "root",
  name: "root",
  path: "/",
  component: () => import("@/layouts/BasicLayout.vue"),
  redirect: defaultRootRoutePath,
  meta: {
    title: "首页",
  },
  children: [],
});

export const listToTree = (list, tree, parentId) => {
  list.forEach((item) => {
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: [],
      };
      listToTree(list, child.children, item.id);
      if (child.children.length <= 0) {
        delete child.children;
      }
      tree.push(child);
    }
  });
};

export const generator = (routerMap, parent) => {
  return routerMap.map((item) => {
    const { title, show, hideChildren, hiddenHeaderContent, target, icon, permission } = item.meta || {};
    const component = typeof item.component === "string"
      ? constantRouterComponents[item.component] || (() => import(`@/views/${item.component}.vue`))
      : item.component || constantRouterComponents[item.key] || (() => import("@/layouts/RouteLayout.vue"));

    const currentRouter = {
      path: item.path || `${(parent && parent.path) || ""}/${item.key}`,
      name: item.name || item.key || "",
      component: component,
      meta: {
        title: title,
        icon: icon || undefined,
        hiddenHeaderContent: hiddenHeaderContent,
        target: target,
        permission: permission || item.name,
      },
    };

    if (show === false) {
      currentRouter.hidden = true;
    }
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true;
    }
    if (currentRouter.path && !currentRouter.path.startsWith("http")) {
      currentRouter.path = currentRouter.path.replace("//", "/");
    }
    if (item.redirect) {
      currentRouter.redirect = item.redirect;
    }
    if (item.children && item.children.length > 0) {
      currentRouter.children = generator(item.children, currentRouter);
    }
    return currentRouter;
  });
};

export const generatorDynamicRouter = (token) => {
  return new Promise((resolve, reject) => {
    getCurrentUserNav({ token })
      .then((res) => {
        const { result } = res;
        const menuNav = [];
        const childrenNav = [];
        listToTree(result, childrenNav, 0);
        const dynamicRoot = createRootRouter();
        dynamicRoot.children = childrenNav;
        menuNav.push(dynamicRoot);
        const routers = generator(menuNav);
        routers.push(notFoundRouter);
        resolve(routers);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
