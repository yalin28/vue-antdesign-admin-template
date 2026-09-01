<template>
  <div class="router-layout">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :exclude="excludeViews">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script>
import { computed } from "vue";
import { useMultiTabStore } from "@/store/modules/multi-tab";

export default {
  name: "RouteLayout",
  setup() {
    const multiTabStore = useMultiTabStore();
    const excludeViews = computed(() => multiTabStore.excludeViews);

    return {
      excludeViews,
    };
  },
};
</script>
