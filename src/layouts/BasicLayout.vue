<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <a-drawer
      v-if="isMobile()"
      placement="left"
      :wrapClassName="`drawer-sider ${navTheme}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
    >
      <side-menu mode="inline" :menus="menus" :theme="navTheme" :collapsed="false" :collapsible="true" @menuSelect="menuSelect"></side-menu>
    </a-drawer>

    <side-menu v-else-if="isSideMenu()" mode="inline" :menus="menus" :theme="navTheme" :collapsed="collapsed" :collapsible="true"></side-menu>

    <a-layout :class="[layoutMode, `content-width-${contentWidth}`]" :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }">
      <!-- layout header -->
      <global-header :mode="layoutMode" :menus="menus" :theme="navTheme" :collapsed="collapsed" :device="device" @toggle="toggle" />

      <!-- layout content -->
      <a-layout-content :style="{ height: '100%', margin: '24px' }">
        <!-- <multi-tab v-if="multiTab"></multi-tab> -->
        <route-layout />
      </a-layout-content>

      <!-- layout footer -->
      <!-- <a-layout-footer>
        <global-footer />
      </a-layout-footer> -->

      <!-- Setting Drawer (show in development mode) -->
      <settingDrawer v-if="showDrawer" />
    </a-layout>
  </a-layout>
</template>

<script>
import { triggerWindowResizeEvent } from '@/utils/util'
import { mapState, mapActions } from 'vuex'
import { mixin, mixinDevice } from '@/utils/mixin'

import RouteLayout from './RouteLayout'
import SideMenu from '@/components/Menu/SideMenu'
import GlobalHeader from '@/components/GlobalHeader'
// import GlobalFooter from '@/components/GlobalFooter'
import SettingDrawer from '@/components/SettingDrawer'
import { openPermission, prodShowSettingDrawer } from '@/config/index'
import { syncRouterMap } from '@/router/router.config'
export default {
  name: 'BasicLayout',
  mixins: [mixin, mixinDevice],
  components: {
    RouteLayout,
    SideMenu,
    GlobalHeader,
    // GlobalFooter,
    SettingDrawer,
  },
  data() {
    return {
      showDrawer: prodShowSettingDrawer || process.env.NODE_ENV !== 'production',
      collapsed: false,
      menus: [],
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: (state) => state.permission.addRouters,
    }),
    contentPaddingLeft() {
      if (!this.fixSiderbar || this.isMobile()) {
        return '0'
      }
      if (this.sidebarOpened) {
        return '256px'
      }
      return '80px'
    },
  },
  watch: {
    sidebarOpened(val) {
      this.collapsed = !val
    },
  },
  created() {
    const menus = openPermission ? this.mainMenu : syncRouterMap
    this.menus = menus.find((item) => item.path === '/').children
    this.collapsed = !this.sidebarOpened
  },
  mounted() {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    ...mapActions(['setSidebar']),
    toggle() {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    paddingCalc() {
      let left = ''
      if (this.sidebarOpened) {
        left = this.isDesktop() ? '256px' : '80px'
      } else {
        left = (this.isMobile() && '0') || (this.fixSiderbar && '80px') || '0'
      }
      return left
    },
    menuSelect() {},
    drawerClose() {
      this.collapsed = false
    },
  },
}
</script>

<style lang="less"></style>
