import { useAppStore } from "@/store/modules/app";
import { useUserStore } from "@/store/modules/user";
import layout_config from "@/config/layout";
import storage from "@/utils/storage";
import {
  DEFAULT_COLOR,
  DEFAULT_THEME,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR_WEAK,
  SIDEBAR_TYPE,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_CONTENT_WIDTH_TYPE,
  DEFAULT_MULTI_TAB,
} from "@/store/mutation-types";
import { TOKEN_NAME } from "@/config/index";

export default function Initializer() {
  const appStore = useAppStore();
  const userStore = useUserStore();

  appStore.setSidebar(storage.get(SIDEBAR_TYPE, true));
  appStore.ToggleTheme(storage.get(DEFAULT_THEME, layout_config.navTheme));
  appStore.ToggleLayoutMode(storage.get(DEFAULT_LAYOUT_MODE, layout_config.layout));
  appStore.ToggleFixedHeader(storage.get(DEFAULT_FIXED_HEADER, layout_config.fixedHeader));
  appStore.ToggleFixSiderbar(storage.get(DEFAULT_FIXED_SIDEMENU, layout_config.fixSiderbar));
  appStore.ToggleContentWidth(storage.get(DEFAULT_CONTENT_WIDTH_TYPE, layout_config.contentWidth));
  appStore.ToggleFixedHeaderHidden(storage.get(DEFAULT_FIXED_HEADER_HIDDEN, layout_config.autoHideHeader));
  appStore.ToggleWeak(storage.get(DEFAULT_COLOR_WEAK, layout_config.colorWeak));
  appStore.ToggleColor(storage.get(DEFAULT_COLOR, layout_config.primaryColor));
  appStore.ToggleMultiTab(storage.get(DEFAULT_MULTI_TAB, layout_config.multiTab));
  
  const token = storage.get(TOKEN_NAME, "");
  if (token) {
    userStore.token = token;
  }
}
