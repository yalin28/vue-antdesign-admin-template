<template>
  <section class="Hello">
    <h1>hello~</h1>
    <p>欢迎来到工作台/统计页面（默认根路由页面，可根据需求调整）</p>
  </section>
</template>

<script>
export default {
  name: "Analysis",
};
</script>

<style scoped lang="less">
.Hello {
  background: #fff;
  padding: 24px;
  border-radius: 4px;
  h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 12px;
  }
  p {
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
