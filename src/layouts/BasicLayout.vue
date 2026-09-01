<template>
  <a-layout :class="['layout', device]">
    <!-- Mobile Drawer SideMenu -->
    <a-drawer
      v-if="isMobile()"
      placement="left"
      :rootClassName="'drawer-sider ' + navTheme"
      :closable="false"
      :open="!collapsed"
      @close="drawerClose"
    >
      <side-menu mode="inline" :menus="menus" :theme="navTheme" :collapsed="false" :collapsible="true" @menuSelect="menuSelect"></side-menu>
    </a-drawer>

    <!-- Desktop SideMenu -->
    <side-menu v-else-if="isSideMenu()" mode="inline" :menus="menus" :theme="navTheme" :collapsed="collapsed" :collapsible="true"></side-menu>

    <a-layout :class="[layoutMode, 'content-width-' + contentWidth]" :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }">
      <!-- Layout Header -->
      <global-header :mode="layoutMode" :menus="menus" :theme="navTheme" :collapsed="collapsed" :device="device" @toggle="toggle" />

      <!-- Layout Content -->
      <a-layout-content :style="{ height: '100%', margin: '24px' }">
        <route-layout />
      </a-layout-content>

      <!-- Setting Drawer -->
      <setting-drawer v-if="showDrawer" />
    </a-layout>
  </a-layout>
</template>

<script>
import { triggerWindowResizeEvent } from "@/utils/util";
import { mixin, mixinDevice } from "@/utils/mixin";
import { useAppStore } from "@/store/modules/app";
import { usePermissionStore } from "@/store/modules/permission";
import RouteLayout from "./RouteLayout.vue";
import SideMenu from "@/components/Menu/SideMenu.vue";
import GlobalHeader from "@/components/GlobalHeader/GlobalHeader.vue";
import SettingDrawer from "@/components/SettingDrawer/SettingDrawer.vue";
import { openPermission, prodShowSettingDrawer } from "@/config/index";
import { syncRouterMap } from "@/router/router.config";

export default {
  name: "BasicLayout",
  components: {
    RouteLayout,
    SideMenu,
    GlobalHeader,
    SettingDrawer,
  },
  mixins: [mixin, mixinDevice],
  data() {
    return {
      showDrawer: prodShowSettingDrawer || import.meta.env?.DEV,
      collapsed: false,
    };
  },
  computed: {
    menus() {
      const permissionStore = usePermissionStore();
      const routerList = openPermission ? permissionStore.addRouters : syncRouterMap;
      const rootRoute = routerList.find((item) => item.path === "/") || routerList[0];
      return (rootRoute && rootRoute.children) || [];
    },
    contentPaddingLeft() {
      if (!this.fixSiderbar || this.isMobile() || !this.isSideMenu()) {
        return "0";
      }
      if (this.sidebarOpened) {
        return "256px";
      }
      return "80px";
    },
  },
  watch: {
    sidebarOpened(val) {
      this.collapsed = !val;
    },
  },
  created() {
    this.collapsed = !this.sidebarOpened;
  },
  methods: {
    toggle() {
      const appStore = useAppStore();
      this.collapsed = !this.collapsed;
      appStore.setSidebar(!this.collapsed);
      triggerWindowResizeEvent();
    },
    menuSelect() {},
    drawerClose() {
      this.collapsed = true;
      const appStore = useAppStore();
      appStore.setSidebar(false);
    },
  },
};
</script>

<style lang="less"></style>
