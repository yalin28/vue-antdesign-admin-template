<template>
  <a-breadcrumb class="breadcrumb" v-if="breadList.length > 0">
    <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.path || index">
      <router-link v-if="index < breadList.length - 1 && item.path" :to="{ path: item.path }">
        {{ item.meta?.title }}
      </router-link>
      <span v-else>{{ item.meta?.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      breadList: [],
    };
  },
  watch: {
    $route: {
      handler() {
        this.getBreadcrumb();
      },
      immediate: true,
    },
  },
  methods: {
    getBreadcrumb() {
      if (!this.$route || !this.$route.matched) {
        this.breadList = [];
        return;
      }
      this.breadList = this.$route.matched.filter(
        (item) => item.meta && item.meta.title && item.path !== "/"
      );
    },
  },
};
</script>

<style lang="less" scoped>
.breadcrumb {
  margin-bottom: 16px;
}
</style>
