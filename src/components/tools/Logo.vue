<template>
  <div class="logo">
    <router-link :to="{ path: defaultRootRoutePath }">
      <img src="@/assets/logo.svg" alt="logo" />
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
import { defaultRootRoutePath } from "@/router/router.config";

export default {
  name: "Logo",
  props: {
    title: {
      type: String,
      default: "Ant Design Pro",
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      defaultRootRoutePath,
    };
  },
};
</script>
