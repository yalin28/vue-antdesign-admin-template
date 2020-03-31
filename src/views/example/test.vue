<template>
  <section class="test">
    <h1>组件测试</h1>
    <tinymce v-model="content" :height="300" />
  </section>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'test',
  data() {
    return {
      content: '',
    }
  },
  components: { Tinymce },
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
