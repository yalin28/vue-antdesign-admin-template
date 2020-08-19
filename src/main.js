// IE10兼容 with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store/'
import { VueAxios } from '@/utils/request'

// --- 注意 ---- mockjs不支持IE，正式项目中请不要在 production ENV中使用
import '@/mock'

import setStoreWidthConfig from '@/core/set_store_width_config'
import '@/core/lazy_use'
import '@/permission' // permission control
import '@/utils/filter' // global filter
import '@/style/global.less'

// 给 axios Promise 扩展 finally
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()

Vue.config.productionTip = false

Vue.use(VueAxios)

new Vue({
  router,
  store,
  created: setStoreWidthConfig,
  render: (h) => h(App),
}).$mount('#app')
