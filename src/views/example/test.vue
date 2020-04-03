<template>
  <section class="test">
    <h1>富文本测试</h1>
    <tinymce class="tiny" v-model="content1" :height="300" />
    <tinymce class="tiny" v-model="content2" :height="300" />
  </section>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'exampleTest',
  data() {
    return {
      content1: '',
      content2: '',
    }
  },
  components: { Tinymce },
  watch: {},
  methods: {},
}
</script>

<style scoped lang="less">
.test {
  h1 {
    .sc(24px,#333);
  }
  .tiny {
    height: 500px;
  }
}
</style>
