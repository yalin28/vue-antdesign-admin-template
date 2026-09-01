<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    :mode="mode"
    :theme="theme"
    @openChange="onOpenChange"
    @select="onSelect"
  >
    <template v-for="item in menu" :key="item.path">
      <template v-if="!item.hidden">
        <!-- 包含子菜单 -->
        <a-sub-menu v-if="item.children && item.children.length && !item.hideChildrenInMenu" :key="item.path">
          <template #icon>
            <a-icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
          </template>
          <template #title>{{ item.meta && item.meta.title }}</template>
          <template v-for="child in item.children" :key="child.path">
            <template v-if="!child.hidden">
              <a-sub-menu v-if="child.children && child.children.length && !child.hideChildrenInMenu" :key="child.path">
                <template #icon>
                  <a-icon v-if="child.meta && child.meta.icon" :type="child.meta.icon" />
                </template>
                <template #title>{{ child.meta && child.meta.title }}</template>
                <a-menu-item v-for="subChild in child.children" :key="subChild.path">
                  <template #icon>
                    <a-icon v-if="subChild.meta && subChild.meta.icon" :type="subChild.meta.icon" />
                  </template>
                  <router-link v-if="!subChild.path.startsWith('http')" :to="{ name: subChild.name, path: subChild.path }">
                    <span>{{ subChild.meta && subChild.meta.title }}</span>
                  </router-link>
                  <a v-else :href="subChild.path" :target="(subChild.meta && subChild.meta.target) || '_blank'">
                    <span>{{ subChild.meta && subChild.meta.title }}</span>
                  </a>
                </a-menu-item>
              </a-sub-menu>
              <a-menu-item v-else :key="child.path">
                <template #icon>
                  <a-icon v-if="child.meta && child.meta.icon" :type="child.meta.icon" />
                </template>
                <router-link v-if="!child.path.startsWith('http')" :to="{ name: child.name, path: child.path }">
                  <span>{{ child.meta && child.meta.title }}</span>
                </router-link>
                <a v-else :href="child.path" :target="(child.meta && child.meta.target) || '_blank'">
                  <span>{{ child.meta && child.meta.title }}</span>
                </a>
              </a-menu-item>
            </template>
          </template>
        </a-sub-menu>
        <!-- 单级菜单 -->
        <a-menu-item v-else :key="item.path">
          <template #icon>
            <a-icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
          </template>
          <router-link v-if="!item.path.startsWith('http')" :to="{ name: item.name, path: item.path }">
            <span>{{ item.meta && item.meta.title }}</span>
          </router-link>
          <a v-else :href="item.path" :target="(item.meta && item.meta.target) || '_blank'">
            <span>{{ item.meta && item.meta.title }}</span>
          </a>
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
        return;
      }
      const latestOpenKey = openKeys.find((key) => !this.openKeys.includes(key));
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    updateMenu() {
      if (!this.$route || !this.$route.matched) return;
      const routes = [...this.$route.matched];
      const hidden = this.$route.meta?.hidden;
      if (routes.length >= 3 && hidden) {
        routes.pop();
        this.selectedKeys = [routes[routes.length - 1].path];
      } else if (routes.length > 0) {
        this.selectedKeys = [routes[routes.length - 1].path];
      }
      const openKeys = [];
      if (this.mode === "inline") {
        routes.forEach((item) => {
          openKeys.push(item.path);
        });
      }
      if (this.collapsed) {
        this.cachedOpenKeys = openKeys;
      } else {
        this.openKeys = openKeys;
      }
    },
    onSelect(obj) {
      this.selectedKeys = obj.selectedKeys;
      this.$emit("select", obj);
    },
  },
};
</script>
