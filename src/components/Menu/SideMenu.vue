<template>
  <a-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null]"
    width="256px"
    :collapsible="collapsible"
    :collapsed="collapsed"
    :trigger="null"
  >
    <logo />
    <s-menu :collapsed="collapsed" :menu="menus" :theme="theme" :mode="mode" @select="onSelect" style="padding: 16px 0px;"></s-menu>
  </a-layout-sider>
</template>

<script>
import Logo from "@/components/tools/Logo.vue";
import SMenu from "./index";
import { mixin, mixinDevice } from "@/utils/mixin";

export default {
  name: "SideMenu",
  components: { Logo, SMenu },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      default: "inline",
    },
    theme: {
      type: String,
      default: "dark",
    },
    collapsible: {
      type: Boolean,
      default: false,
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
    menus: {
      type: Array,
      required: true,
    },
  },
  emits: ["menuSelect"],
  methods: {
    onSelect(obj) {
      this.$emit("menuSelect", obj);
    },
  },
};
</script>
