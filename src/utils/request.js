import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { TOKEN_NAME, prodUseMock } from '@/config/index'

let baseURL = prodUseMock ? '/api' : process.env.VUE_APP_API_BASE_URL

// 创建 axios 实例
const service = axios.create({
  baseURL, // api base_url
  timeout: 6000, // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(TOKEN_NAME)
    if (error.response.status === 403) {
      notification.error({
        message: '被禁用的',
        description: data.message,
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLoginRequest)) {
      notification.error({
        message: '非法访问',
        description: '授权验证失败',
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use((config) => {
  const token = Vue.ls.get(TOKEN_NAME)
  if (token) {
    config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service)
  },
}

export { installer as VueAxios, service as axios }
