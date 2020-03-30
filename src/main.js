// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store/'
import { VueAxios } from '@/utils/request'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import '@/mock'

import setStoreWidthConfig from '@/core/set_store_width_config'
import '@/core/lazy_use'
import '@/permission' // permission control
import '@/utils/filter' // global filter
import '@/style/global.less'

Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created: setStoreWidthConfig,
  render: (h) => h(App),
}).$mount('#app')
