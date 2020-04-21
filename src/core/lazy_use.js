import Vue from 'vue'
import VueStorage from 'vue-ls'
import VueClipboard from 'vue-clipboard2'

import { storageOptions } from '@/config/index'
import '@/core/lazy_lib/components_use' // antDesign 按需引入

import MultiTab from '@/components/MultiTab' //顶部tab切换组件
import PageLoading from '@/components/PageLoading'
import PermissionHelper from '@/utils/helper/permission'

// 按钮级别权限控制指令
import './directives/action'

VueClipboard.config.autoSetContainer = true

Vue.use(MultiTab)
Vue.use(PageLoading)
Vue.use(VueStorage, storageOptions)
Vue.use(VueClipboard)
Vue.use(PermissionHelper)
