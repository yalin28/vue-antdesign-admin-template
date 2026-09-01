import { createPinia } from "pinia";
import { useAppStore } from "./modules/app";
import { useUserStore } from "./modules/user";
import { usePermissionStore } from "./modules/permission";
import { useMultiTabStore } from "./modules/multi-tab";

export const pinia = createPinia();

export { useAppStore, useUserStore, usePermissionStore, useMultiTabStore };

// 统一 store 代理对象，提供向后兼容支持
export const store = {
  get getters() {
    const appStore = useAppStore(pinia);
    const userStore = useUserStore(pinia);
    const permissionStore = usePermissionStore(pinia);
    const multiTabStore = useMultiTabStore(pinia);

    return {
      device: appStore.device,
      theme: appStore.theme,
      color: appStore.color,
      token: userStore.token,
      avatar: userStore.avatar,
      nickname: userStore.name,
      welcome: userStore.welcome,
      roles: userStore.roles,
      userInfo: userStore.info,
      addRouters: permissionStore.addRouters,
      multiTab: appStore.multiTab,
      multiTabList: multiTabStore.tabList,
    };
  },
  dispatch(actionName, payload) {
    const appStore = useAppStore(pinia);
    const userStore = useUserStore(pinia);
    const permissionStore = usePermissionStore(pinia);
    const multiTabStore = useMultiTabStore(pinia);

    if (typeof userStore[actionName] === "function") {
      return userStore[actionName](payload);
    }
    if (typeof appStore[actionName] === "function") {
      return appStore[actionName](payload);
    }
    if (typeof permissionStore[actionName] === "function") {
      return permissionStore[actionName](payload);
    }
    if (typeof multiTabStore[actionName] === "function") {
      return multiTabStore[actionName](payload);
    }

    return Promise.resolve();
  },
  commit(mutationName, payload) {
    const appStore = useAppStore(pinia);
    const userStore = useUserStore(pinia);
    const permissionStore = usePermissionStore(pinia);
    const multiTabStore = useMultiTabStore(pinia);

    switch (mutationName) {
      case "SET_SIDEBAR_TYPE":
        appStore.setSidebar(payload);
        break;
      case "CLOSE_SIDEBAR":
        appStore.CloseSidebar();
        break;
      case "TOGGLE_DEVICE":
        appStore.ToggleDevice(payload);
        break;
      case "TOGGLE_THEME":
        appStore.ToggleTheme(payload);
        break;
      case "TOGGLE_LAYOUT_MODE":
        appStore.ToggleLayoutMode(payload);
        break;
      case "TOGGLE_FIXED_HEADER":
        appStore.ToggleFixedHeader(payload);
        break;
      case "TOGGLE_FIXED_SIDERBAR":
        appStore.ToggleFixSiderbar(payload);
        break;
      case "TOGGLE_FIXED_HEADER_HIDDEN":
        appStore.ToggleFixedHeaderHidden(payload);
        break;
      case "TOGGLE_CONTENT_WIDTH":
        appStore.ToggleContentWidth(payload);
        break;
      case "TOGGLE_COLOR":
        appStore.ToggleColor(payload);
        break;
      case "TOGGLE_WEAK":
        appStore.ToggleWeak(payload);
        break;
      case "TOGGLE_MULTI_TAB":
        appStore.ToggleMultiTab(payload);
        break;
      case "SET_TOKEN":
        userStore.token = payload;
        break;
      case "SET_ROLES":
        userStore.roles = payload;
        break;
      case "SET_ROUTERS":
        permissionStore.SET_ROUTERS(payload);
        break;
      case "SET_MULTI_TAB":
        multiTabStore.SET_MULTI_TAB(payload);
        break;
      case "ADD_EXCLUDE_VIEW":
        multiTabStore.ADD_EXCLUDE_VIEW(payload);
        break;
      case "DEL_EXCLUDE_VIEW":
        multiTabStore.DEL_EXCLUDE_VIEW(payload);
        break;
      default:
        break;
    }
  },
};

export default store;
