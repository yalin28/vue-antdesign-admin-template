<template>
  <div class="ant-pro-multi-tab">
    <div class="ant-pro-multi-tab-wrapper">
      <a-tabs
        hideAdd
        type="editable-card"
        v-model:activeKey="activeKey"
        :tabBarStyle="{ background: '#FFF', margin: 0, paddingLeft: '16px', paddingTop: '1px' }"
        @edit="onEdit"
      >
        <a-tab-pane
          v-for="page in pages"
          :key="page.fullPath"
          :closable="pages.length > 1"
        >
          <template #tab>
            <a-dropdown :trigger="['contextmenu']">
              <span style="user-select: none;">{{ page.meta?.customTitle || page.meta?.title || '标签' }}</span>
              <template #overlay>
                <a-menu @click="({ key }) => closeMenuClick(key, page.fullPath)">
                  <a-menu-item key="closeThat">关闭当前标签</a-menu-item>
                  <a-menu-item key="closeRight">关闭右侧</a-menu-item>
                  <a-menu-item key="closeLeft">关闭左侧</a-menu-item>
                  <a-menu-item key="closeAll">关闭全部</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
import { useMultiTabStore } from "@/store/modules/multi-tab";
import events from "./events";

export default {
  name: "MultiTab",
  data() {
    return {
      fullPathList: [],
      pages: [],
      activeKey: "",
    };
  },
  watch: {
    $route: {
      handler(newVal) {
        if (!newVal || !newVal.fullPath) return;
        this.activeKey = newVal.fullPath;
        if (!this.fullPathList.includes(newVal.fullPath)) {
          this.fullPathList.push(newVal.fullPath);
          this.pages.push(newVal);
        }
      },
      immediate: true,
    },
    activeKey(newPathKey) {
      if (newPathKey && this.$route && this.$route.fullPath !== newPathKey) {
        this.$router.push({ path: newPathKey });
      }
    },
    fullPathList: {
      handler() {
        const multiTabStore = useMultiTabStore();
        multiTabStore.SET_MULTI_TAB(this.fullPathList);
        if (this.$route) {
          multiTabStore.DEL_EXCLUDE_VIEW(this.$route);
        }
      },
      deep: true,
    },
  },
  created() {
    events
      .$on("open", (val) => {
        if (val) this.activeKey = val;
      })
      .$on("close", (val) => {
        this.closeThat(val || this.activeKey);
      })
      .$on("rename", ({ key, name }) => {
        const item = this.pages.find((p) => p.path === key);
        if (item) {
          item.meta.customTitle = name;
        }
      });

    if (this.$route && !this.fullPathList.includes(this.$route.fullPath)) {
      this.pages.push(this.$route);
      this.fullPathList.push(this.$route.fullPath);
      this.activeKey = this.$route.fullPath;
    }
  },
  methods: {
    onEdit(targetKey, action) {
      if (action === "remove") {
        this.remove(targetKey);
      }
    },
    remove(targetKey) {
      const closedRoute = this.pages.find((item) => item.fullPath === targetKey);
      this.pages = this.pages.filter((page) => page.fullPath !== targetKey);
      this.fullPathList = this.fullPathList.filter((path) => path !== targetKey);
      if (closedRoute?.name) {
        const multiTabStore = useMultiTabStore();
        multiTabStore.ADD_EXCLUDE_VIEW(closedRoute);
      }
      if (!this.fullPathList.includes(this.activeKey)) {
        this.selectedLastPath();
      }
    },
    selectedLastPath() {
      this.activeKey = this.fullPathList[this.fullPathList.length - 1];
    },
    closeThat(e) {
      if (this.fullPathList.length > 1) {
        this.remove(e);
      } else {
        message.info("这是最后一个标签了, 无法被关闭");
      }
    },
    closeLeft(e) {
      const currentIndex = this.fullPathList.indexOf(e);
      if (currentIndex > 0) {
        const toRemove = this.fullPathList.filter((item, index) => index < currentIndex);
        toRemove.forEach((item) => this.remove(item));
      } else {
        message.info("左侧没有标签");
      }
    },
    closeRight(e) {
      const currentIndex = this.fullPathList.indexOf(e);
      if (currentIndex < this.fullPathList.length - 1) {
        const toRemove = this.fullPathList.filter((item, index) => index > currentIndex);
        toRemove.forEach((item) => this.remove(item));
      } else {
        message.info("右侧没有标签");
      }
    },
    closeAll(e) {
      const currentIndex = this.fullPathList.indexOf(e);
      const toRemove = this.fullPathList.filter((item, index) => index !== currentIndex);
      toRemove.forEach((item) => this.remove(item));
    },
    closeMenuClick(key, route) {
      if (key === "closeThat") this.closeThat(route);
      else if (key === "closeRight") this.closeRight(route);
      else if (key === "closeLeft") this.closeLeft(route);
      else if (key === "closeAll") this.closeAll(route);
    },
  },
};
</script>

<style lang="less">
.ant-pro-multi-tab {
  margin: -23px -24px 24px -24px;
  background: #fff;
  font-size: 14px;
}
</style>
