<template>
  <div class="setting-drawer">
    <a-drawer width="300" placement="right" @close="onClose" :closable="false" :open="visible">
      <div class="setting-drawer-index-content">
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">整体风格设置</h3>
          <div class="setting-drawer-index-blockCheckbox">
            <a-tooltip title="暗色菜单风格">
              <div class="setting-drawer-index-item" @click="handleMenuTheme('dark')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg" alt="dark" />
                <div class="setting-drawer-index-selectIcon" v-if="navTheme === 'dark'">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>

            <a-tooltip title="亮色菜单风格">
              <div class="setting-drawer-index-item" @click="handleMenuTheme('light')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg" alt="light" />
                <div class="setting-drawer-index-selectIcon" v-if="navTheme !== 'dark'">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>
          </div>
        </div>

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">主题色</h3>
          <div style="height: 20px;">
            <a-tooltip class="setting-drawer-theme-color-colorBlock" v-for="(item, index) in colorList" :key="index" :title="item.key">
              <a-tag :color="item.color" @click="changeColor(item.color)">
                <a-icon type="check" v-if="item.color === primaryColor"></a-icon>
              </a-tag>
            </a-tooltip>
          </div>
        </div>
        <a-divider />

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">导航模式</h3>
          <div class="setting-drawer-index-blockCheckbox">
            <a-tooltip title="侧边栏导航">
              <div class="setting-drawer-index-item" @click="handleLayout('sidemenu')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg" alt="sidemenu" />
                <div class="setting-drawer-index-selectIcon" v-if="layoutMode === 'sidemenu'">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>

            <a-tooltip title="顶部栏导航">
              <div class="setting-drawer-index-item" @click="handleLayout('topmenu')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg" alt="topmenu" />
                <div class="setting-drawer-index-selectIcon" v-if="layoutMode !== 'sidemenu'">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>
          </div>
          <div :style="{ marginTop: '24px' }">
            <a-list :split="false">
              <a-list-item>
                <template #actions>
                  <a-select size="small" style="width: 80px;" :value="contentWidth" @change="handleContentWidthChange">
                    <a-select-option value="Fixed">固定</a-select-option>
                    <a-select-option value="Fluid" v-if="layoutMode !== 'sidemenu'">流式</a-select-option>
                  </a-select>
                </template>
                <a-list-item-meta title="内容区域宽度" />
              </a-list-item>
              <a-list-item>
                <template #actions>
                  <a-switch size="small" :checked="fixedHeader" @change="handleFixedHeader" />
                </template>
                <a-list-item-meta title="固定 Header" />
              </a-list-item>
              <a-list-item>
                <template #actions>
                  <a-switch size="small" :disabled="!fixedHeader" :checked="autoHideHeader" @change="handleFixedHeaderHidden" />
                </template>
                <a-list-item-meta title="下滑时隐藏 Header" />
              </a-list-item>
              <a-list-item>
                <template #actions>
                  <a-switch size="small" :disabled="layoutMode === 'topmenu'" :checked="fixSiderbar" @change="handleFixSiderbar" />
                </template>
                <a-list-item-meta title="固定侧边菜单" />
              </a-list-item>
            </a-list>
          </div>
        </div>
        <a-divider />

        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">其他设置</h3>
          <div>
            <a-list :split="false">
              <a-list-item>
                <template #actions>
                  <a-switch size="small" :checked="colorWeak" @change="onColorWeak" />
                </template>
                <a-list-item-meta title="色弱模式" />
              </a-list-item>
              <a-list-item>
                <template #actions>
                  <a-switch size="small" :checked="multiTab" @change="onMultiTab" />
                </template>
                <a-list-item-meta title="多页签模式" />
              </a-list-item>
            </a-list>
          </div>
        </div>
        <a-divider />
        <div :style="{ marginBottom: '24px' }">
          <a-button @click="doCopy" icon="copy" block>拷贝设置</a-button>
        </div>
      </div>
      <template #handle>
        <div class="setting-drawer-index-handle" @click="toggle">
          <a-icon type="setting" v-if="!visible" />
          <a-icon type="close" v-else />
        </div>
      </template>
    </a-drawer>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
import { colorList, updateColorWeak } from "./settingConfig";
import { mixin, mixinDevice } from "@/utils/mixin";
import { useAppStore } from "@/store/modules/app";

export default {
  name: "SettingDrawer",
  mixins: [mixin, mixinDevice],
  data() {
    return {
      visible: false,
      colorList,
    };
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    toggle() {
      this.visible = !this.visible;
    },
    onColorWeak(checked) {
      const appStore = useAppStore();
      appStore.ToggleWeak(checked);
      updateColorWeak(checked);
    },
    onMultiTab(checked) {
      const appStore = useAppStore();
      appStore.ToggleMultiTab(checked);
    },
    handleMenuTheme(theme) {
      const appStore = useAppStore();
      appStore.ToggleTheme(theme);
    },
    doCopy() {
      const text = `export default {
  primaryColor: undefined,
  navTheme: undefined,
  layout: undefined,
  contentWidth: undefined,
  fixedHeader: ${this.fixedHeader},
  fixSiderbar: ${this.fixSiderbar},
  autoHideHeader: ${this.autoHideHeader},
  colorWeak: ${this.colorWeak},
  multiTab: ${this.multiTab},
};`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          message.success("复制完毕");
        }).catch(() => {
          message.error("复制失败");
        });
      } else {
        message.success("复制完毕");
      }
    },
    handleLayout(mode) {
      const appStore = useAppStore();
      appStore.ToggleLayoutMode(mode);
      this.handleFixSiderbar(false);
    },
    handleContentWidthChange(type) {
      const appStore = useAppStore();
      appStore.ToggleContentWidth(type);
    },
    changeColor(color) {
      if (this.primaryColor !== color) {
        const appStore = useAppStore();
        appStore.ToggleColor(color);
      }
    },
    handleFixedHeader(fixed) {
      const appStore = useAppStore();
      appStore.ToggleFixedHeader(fixed);
    },
    handleFixedHeaderHidden(autoHidden) {
      const appStore = useAppStore();
      appStore.ToggleFixedHeaderHidden(autoHidden);
    },
    handleFixSiderbar(fixed) {
      const appStore = useAppStore();
      if (this.layoutMode === "topmenu") {
        appStore.ToggleFixSiderbar(false);
        return;
      }
      appStore.ToggleFixSiderbar(fixed);
    },
  },
};
</script>

<style lang="less" scoped>
.setting-drawer-index-content {
  .setting-drawer-index-blockCheckbox {
    display: flex;
    .setting-drawer-index-item {
      margin-right: 16px;
      position: relative;
      border-radius: 4px;
      cursor: pointer;
      img {
        width: 48px;
      }
      .setting-drawer-index-selectIcon {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        padding-top: 15px;
        padding-left: 24px;
        height: 100%;
        color: #1890ff;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
  .setting-drawer-theme-color-colorBlock {
    width: 20px;
    height: 20px;
    border-radius: 2px;
    float: left;
    cursor: pointer;
    margin-right: 8px;
    padding-left: 0px;
    padding-right: 0px;
    text-align: center;
    color: #fff;
    font-weight: 700;
  }
}
.setting-drawer-index-handle {
  position: absolute;
  top: 240px;
  background: #1890ff;
  width: 48px;
  height: 48px;
  right: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1001;
  text-align: center;
  font-size: 16px;
  border-radius: 4px 0 0 4px;
  i, .anticon {
    color: #fff;
    font-size: 20px;
  }
}
</style>
