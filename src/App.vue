<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'

export default {
  mixins: [AppDeviceEnquire],
  data () {
    return {
      locale: zhCN
    }
  },
  mounted () {

  }
}
</script>
<style lang="less">
#app {
  height: 100%;
  /* 页面切换动画 */
  .page-toggle-enter-active{
    transition: all 0.2s ease-in 0.25s;
  }
  .page-toggle-leave-active{
    transition: all 0.2s ease-out 0s;
  }
  .page-toggle-enter, .page-toggle-leave-to{
    opacity: 0;
    padding: 0px;
  }
}
</style>
