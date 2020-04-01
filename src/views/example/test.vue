<template>
  <section class="test">
    <h1>组件测试</h1>
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
  mounted() {
    console.log('mounted')
  },
  activated() {
    console.log('activated')
  },
  methods: {},
}
</script>

<style scoped lang="less">
.test {
  h1 {
    .tc();
  }
  .tiny {
    height: 500px;
  }
}
</style>
