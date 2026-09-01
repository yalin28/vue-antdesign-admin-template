import { deviceEnquire, DEVICE_TYPE } from "@/utils/device";
import { useAppStore } from "@/store/modules/app";

export const mixin = {
  computed: {
    layoutMode() {
      return useAppStore().layout;
    },
    navTheme() {
      return useAppStore().theme;
    },
    primaryColor() {
      return useAppStore().color;
    },
    colorWeak() {
      return useAppStore().weak;
    },
    fixedHeader() {
      return useAppStore().fixedHeader;
    },
    fixSiderbar() {
      return useAppStore().fixSiderbar;
    },
    contentWidth() {
      return useAppStore().contentWidth;
    },
    autoHideHeader() {
      return useAppStore().autoHideHeader;
    },
    sidebarOpened() {
      return useAppStore().sidebar;
    },
    multiTab() {
      return useAppStore().multiTab;
    },
  },
  methods: {
    isTopMenu() {
      return this.layoutMode === "topmenu";
    },
    isSideMenu() {
      return !this.isTopMenu();
    },
  },
};

export const mixinDevice = {
  computed: {
    device() {
      return useAppStore().device;
    },
  },
  methods: {
    isMobile() {
      return this.device === DEVICE_TYPE.MOBILE;
    },
    isDesktop() {
      return this.device === DEVICE_TYPE.DESKTOP;
    },
    isTablet() {
      return this.device === DEVICE_TYPE.TABLET;
    },
  },
};

export const AppDeviceEnquire = {
  mounted() {
    const appStore = useAppStore();
    deviceEnquire((deviceType) => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          appStore.ToggleDevice("desktop");
          appStore.setSidebar(true);
          break;
        case DEVICE_TYPE.TABLET:
          appStore.ToggleDevice("tablet");
          appStore.setSidebar(false);
          break;
        case DEVICE_TYPE.MOBILE:
        default:
          appStore.ToggleDevice("mobile");
          appStore.setSidebar(true);
          break;
      }
    });
  },
};

export default { mixin, AppDeviceEnquire, mixinDevice };
