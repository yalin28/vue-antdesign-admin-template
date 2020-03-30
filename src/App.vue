<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { AppDeviceEnquire } from '@/utils/mixin'

export default {
  mixins: [AppDeviceEnquire],
  data() {
    return {}
  },
  mounted() {},
}
</script>
<style lang="less">
#app {
  height: 100%;
}
</style>
