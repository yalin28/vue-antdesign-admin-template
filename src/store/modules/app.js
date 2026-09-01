import { defineStore } from "pinia";
import storage from "@/utils/storage";
import layout_config from "@/config/layout";
import {
  SIDEBAR_TYPE,
  DEFAULT_THEME,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR,
  DEFAULT_COLOR_WEAK,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_CONTENT_WIDTH_TYPE,
  DEFAULT_MULTI_TAB,
} from "@/store/mutation-types";

export const useAppStore = defineStore("app", {
  state: () => ({
    sidebar: storage.get(SIDEBAR_TYPE, true),
    device: "desktop",
    theme: storage.get(DEFAULT_THEME, layout_config.navTheme),
    layout: storage.get(DEFAULT_LAYOUT_MODE, layout_config.layout),
    contentWidth: storage.get(DEFAULT_CONTENT_WIDTH_TYPE, layout_config.contentWidth),
    fixedHeader: storage.get(DEFAULT_FIXED_HEADER, layout_config.fixedHeader),
    fixSiderbar: storage.get(DEFAULT_FIXED_SIDEMENU, layout_config.fixSiderbar),
    autoHideHeader: storage.get(DEFAULT_FIXED_HEADER_HIDDEN, layout_config.autoHideHeader),
    color: storage.get(DEFAULT_COLOR, layout_config.primaryColor),
    weak: storage.get(DEFAULT_COLOR_WEAK, layout_config.colorWeak),
    multiTab: storage.get(DEFAULT_MULTI_TAB, layout_config.multiTab),
  }),
  actions: {
    setSidebar(type) {
      this.sidebar = type;
      storage.set(SIDEBAR_TYPE, type);
    },
    CloseSidebar() {
      storage.set(SIDEBAR_TYPE, true);
      this.sidebar = false;
    },
    ToggleDevice(device) {
      this.device = device;
    },
    ToggleTheme(theme) {
      storage.set(DEFAULT_THEME, theme);
      this.theme = theme;
    },
    ToggleLayoutMode(mode) {
      storage.set(DEFAULT_LAYOUT_MODE, mode);
      this.layout = mode;
    },
    ToggleFixedHeader(fixedHeader) {
      if (!fixedHeader) {
        this.ToggleFixedHeaderHidden(false);
      }
      storage.set(DEFAULT_FIXED_HEADER, fixedHeader);
      this.fixedHeader = fixedHeader;
    },
    ToggleFixSiderbar(fixSiderbar) {
      storage.set(DEFAULT_FIXED_SIDEMENU, fixSiderbar);
      this.fixSiderbar = fixSiderbar;
    },
    ToggleFixedHeaderHidden(show) {
      storage.set(DEFAULT_FIXED_HEADER_HIDDEN, show);
      this.autoHideHeader = show;
    },
    ToggleContentWidth(type) {
      storage.set(DEFAULT_CONTENT_WIDTH_TYPE, type);
      this.contentWidth = type;
    },
    ToggleColor(color) {
      storage.set(DEFAULT_COLOR, color);
      this.color = color;
    },
    ToggleWeak(flag) {
      storage.set(DEFAULT_COLOR_WEAK, flag);
      this.weak = flag;
    },
    ToggleMultiTab(bool) {
      storage.set(DEFAULT_MULTI_TAB, bool);
      this.multiTab = bool;
    },
  },
});

export default useAppStore;
