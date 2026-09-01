<template>
  <a-config-provider :locale="locale" :theme="themeConfig">
    <div id="app" :class="[{ colorWeak: colorWeak }]">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { useAppStore } from "@/store/modules/app";
import { deviceEnquire } from "@/utils/device";

dayjs.locale("zh-cn");

const appStore = useAppStore();
const locale = ref(zhCN);

const colorWeak = computed(() => appStore.weak);

const themeConfig = computed(() => ({
  token: {
    colorPrimary: appStore.color || "#1890FF",
  },
}));

onMounted(() => {
  const el = document.getElementById("loading-mask");
  if (el) {
    el.parentNode && el.parentNode.removeChild(el);
  }
  
  deviceEnquire((deviceType) => {
    switch (deviceType) {
      case "desktop":
        appStore.ToggleDevice("desktop");
        appStore.setSidebar(true);
        break;
      case "tablet":
        appStore.ToggleDevice("tablet");
        appStore.setSidebar(false);
        break;
      case "mobile":
      default:
        appStore.ToggleDevice("mobile");
        appStore.setSidebar(true);
        break;
    }
  });
});
</script>
