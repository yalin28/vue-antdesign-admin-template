<template>
  <section class="test">
    <h1>组件测试</h1>
  </section>
</template>

<script>
import {} from '@/components'

export default {
  name: 'test',
  data() {
    return {}
  },
  components: {},
  watch: {},
  mounted() {
    console.log()
  },
  methods: {},
}
</script>

<style scoped lang="less">
.test {
  h1 {
    .tc();
  }
}
</style>
