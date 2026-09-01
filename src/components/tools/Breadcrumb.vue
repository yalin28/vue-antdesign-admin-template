<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.name || index">
      <router-link v-if="item.name !== name && index !== 1" :to="{ path: item.path === '' ? '/' : item.path }">
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
      name: "",
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
      this.breadList = [];
      if (!this.$route || !this.$route.matched) return;
      this.name = this.$route.name;
      this.$route.matched.forEach((item) => {
        this.breadList.push(item);
      });
    },
  },
};
</script>
