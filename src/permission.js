import router from "./router";
import store from "./store";
import { useUserStore } from "@/store/modules/user";
import { usePermissionStore } from "@/store/modules/permission";
import { useMultiTabStore } from "@/store/modules/multi-tab";
import NProgress from "nprogress";
import "@/components/NProgress/nprogress.less";
import { notification } from "ant-design-vue";
import { setDocumentTitle, domTitle } from "@/utils/domUtil";
import { TOKEN_NAME, openPermission } from "@/config/index";
import { defaultRootRoutePath, whiteList } from "@/router/router.config";
import storage from "@/utils/storage";

if (openPermission) {
  NProgress.configure({ showSpinner: false });
}

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();
  const multiTabStore = useMultiTabStore();

  if (openPermission && !multiTabStore.tabList.includes(to.fullPath)) {
    NProgress.start();
  }

  if (to.meta && typeof to.meta.title !== "undefined") {
    setDocumentTitle(`${to.meta.title} - ${domTitle}`);
  }

  const redirect = decodeURIComponent(from.query.redirect || to.path);
  const token = storage.get(TOKEN_NAME) || userStore.token;

  if (token) {
    if (to.path === "/user/login") {
      next({ path: defaultRootRoutePath });
      if (openPermission) {
        NProgress.done();
      }
    } else {
      if (userStore.roles.length === 0 && (!userStore.roles.permissions || userStore.roles.permissions.length === 0)) {
        userStore
          .GetInfo()
          .then((res) => {
            if (openPermission) {
              const userToken = res.result && res.result.id;
              permissionStore.GenerateRoutesSync({ token: userToken }).then((routers) => {
                // Vue Router 4 动态添加路由
                routers.forEach((r) => {
                  router.addRoute(r);
                });
                if (to.path === redirect) {
                  next({ ...to, replace: true });
                } else {
                  next({ path: redirect });
                }
              });
            } else {
              if (to.path === redirect) {
                next({ ...to, replace: true });
              } else {
                next({ path: redirect });
              }
            }
          })
          .catch(() => {
            notification.error({
              message: "错误",
              description: "请求用户信息失败，请重试",
            });
            userStore.Logout().then(() => {
              next({ path: "/user/login", query: { redirect: to.fullPath } });
            });
          });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      next();
    } else {
      next({ path: "/user/login", query: { redirect: to.fullPath } });
      if (openPermission) {
        NProgress.done();
      }
    }
  }
});

router.afterEach(() => {
  if (openPermission) {
    NProgress.done();
  }
});
