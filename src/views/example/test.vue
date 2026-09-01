<template>
  <section class="test">
    <h1>富文本测试</h1>
    <tinymce class="tiny" v-model="content1" :height="300" />
    <div style="height: 20px;"></div>
    <tinymce class="tiny" v-model="content2" :height="300" />
  </section>
</template>

<script>
import Tinymce from "@/components/Tinymce/index.vue";

export default {
  name: "ExampleTest",
  components: { Tinymce },
  data() {
    return {
      content1: "<p>初始富文本内容 1</p>",
      content2: "<p>初始富文本内容 2</p>",
    };
  },
};
</script>

<style scoped lang="less">
.test {
  background: #fff;
  padding: 24px;
  border-radius: 4px;
  h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }
  .tiny {
    min-height: 300px;
  }
}
</style>
