import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'
import { mapState } from 'vuex'

const mixin = {
  computed: {
    ...mapState({
      layoutMode: (state) => state.app.layout, //整体风格设置
      navTheme: (state) => state.app.theme, //主题色
      primaryColor: (state) => state.app.color, //默认主题色
      colorWeak: (state) => state.app.weak, //色盲模式
      fixedHeader: (state) => state.app.fixedHeader, //固定header
      fixSiderbar: (state) => state.app.fixSiderbar, //固定左侧菜单栏
      contentWidth: (state) => state.app.contentWidth, //内容区布局： 流式 |  固定
      autoHideHeader: (state) => state.app.autoHideHeader, //向下滚动时，是否隐藏 Header
      sidebarOpened: (state) => state.app.sidebar,
      multiTab: (state) => state.app.multiTab, //是否开启顶部标签
    }),
  },
  methods: {
    isTopMenu() {
      return this.layoutMode === 'topmenu'
    },
    isSideMenu() {
      return !this.isTopMenu()
    },
  },
}

const mixinDevice = {
  computed: {
    ...mapState({
      device: (state) => state.app.device,
    }),
  },
  methods: {
    isMobile() {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop() {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet() {
      return this.device === DEVICE_TYPE.TABLET
    },
  },
}

const AppDeviceEnquire = {
  mounted() {
    const { $store } = this
    deviceEnquire((deviceType) => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit('TOGGLE_DEVICE', 'desktop')
          $store.dispatch('setSidebar', true)
          break
        case DEVICE_TYPE.TABLET:
          $store.commit('TOGGLE_DEVICE', 'tablet')
          $store.dispatch('setSidebar', false)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit('TOGGLE_DEVICE', 'mobile')
          $store.dispatch('setSidebar', true)
          break
      }
    })
  },
}

export { mixin, AppDeviceEnquire, mixinDevice }
