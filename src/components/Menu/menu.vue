<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    :mode="mode"
    :theme="theme"
    @openChange="onOpenChange"
    @click="handleClick"
  >
    <template v-for="item in menu" :key="item.path">
      <template v-if="!item.hidden">
        <!-- 包含子菜单 -->
        <a-sub-menu v-if="item.children && item.children.length && !item.hideChildrenInMenu" :key="item.path">
          <template #icon>
            <a-icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
          </template>
          <template #title>{{ item.meta?.title || item.name }}</template>
          <template v-for="child in item.children" :key="child.path">
            <template v-if="!child.hidden">
              <a-sub-menu v-if="child.children && child.children.length && !child.hideChildrenInMenu" :key="child.path">
                <template #icon>
                  <a-icon v-if="child.meta && child.meta.icon" :type="child.meta.icon" />
                </template>
                <template #title>{{ child.meta?.title || child.name }}</template>
                <a-menu-item v-for="subChild in child.children" :key="subChild.path">
                  <template #icon>
                    <a-icon v-if="subChild.meta && subChild.meta.icon" :type="subChild.meta.icon" />
                  </template>
                  <span>{{ subChild.meta?.title || subChild.name }}</span>
                </a-menu-item>
              </a-sub-menu>
              <a-menu-item v-else :key="child.path">
                <template #icon>
                  <a-icon v-if="child.meta && child.meta.icon" :type="child.meta.icon" />
                </template>
                <span>{{ child.meta?.title || child.name }}</span>
              </a-menu-item>
            </template>
          </template>
        </a-sub-menu>
        <!-- 单级菜单 -->
        <a-menu-item v-else :key="item.path">
          <template #icon>
            <a-icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
          </template>
          <span>{{ item.meta?.title || item.name }}</span>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>

<script>
export default {
  name: "SMenu",
  props: {
    menu: {
      type: Array,
      required: true,
    },
    theme: {
      type: String,
      default: "dark",
    },
    mode: {
      type: String,
      default: "inline",
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["select", "openChange", "click"],
  data() {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: [],
    };
  },
  computed: {
    rootSubmenuKeys() {
      return this.menu.map((item) => item.path);
    },
  },
  watch: {
    collapsed(val) {
      if (val) {
        this.cachedOpenKeys = [...this.openKeys];
        this.openKeys = [];
      } else {
        this.openKeys = this.cachedOpenKeys;
      }
    },
    $route() {
      this.updateMenu();
    },
  },
  mounted() {
    this.updateMenu();
  },
  methods: {
    onOpenChange(openKeys) {
      if (this.mode === "horizontal") {
        this.openKeys = openKeys;
        this.$emit("openChange", openKeys);
        return;
      }
      const latestOpenKey = openKeys.find((key) => !this.openKeys.includes(key));
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
      this.$emit("openChange", this.openKeys);
    },
    updateMenu() {
      if (!this.$route || !this.$route.matched) return;
      const routes = [...this.$route.matched];
      const hidden = this.$route.meta?.hidden;
      if (routes.length >= 3 && hidden) {
        routes.pop();
        this.selectedKeys = [routes[routes.length - 1].path];
      } else if (routes.length > 0) {
        this.selectedKeys = [this.$route.path || routes[routes.length - 1].path];
      }
      const openKeys = [];
      if (this.mode === "inline") {
        routes.forEach((item) => {
          if (item.path && item.path !== "/") {
            openKeys.push(item.path);
          }
        });
      }
      if (this.collapsed) {
        this.cachedOpenKeys = openKeys;
      } else {
        this.openKeys = openKeys;
      }
    },
    handleClick({ key }) {
      if (!key) return;
      if (key.startsWith("http://") || key.startsWith("https://")) {
        window.open(key, "_blank");
      } else {
        this.selectedKeys = [key];
        this.$router.push({ path: key });
      }
      this.$emit("click", { key });
      this.$emit("select", { key, selectedKeys: this.selectedKeys });
    },
  },
};
</script>

<style lang="less" scoped></style>
