import axios from "axios";
import { notification } from "ant-design-vue";
import { TOKEN_NAME, prodUseMock } from "@/config/index";
import storage from "@/utils/storage";
import { useUserStore } from "@/store/modules/user";

let baseURL = prodUseMock ? "/api" : (import.meta.env?.VITE_APP_API_BASE_URL || "/api");

// 创建 axios 实例
const service = axios.create({
  baseURL,
  timeout: 6000,
});

const err = (error) => {
  if (error.response) {
    const data = error.response.data || {};
    const token = storage.get(TOKEN_NAME);
    if (error.response.status === 403) {
      notification.error({
        message: "被禁用的",
        description: data.message || "无权限访问",
      });
    }
    if (error.response.status === 401 && !(data.result && data.result.isLoginRequest)) {
      notification.error({
        message: "非法访问",
        description: "授权验证失败",
      });
      if (token) {
        const userStore = useUserStore();
        userStore.Logout().then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        });
      }
    }
  }
  return Promise.reject(error);
};

// request interceptor
service.interceptors.request.use((config) => {
  const token = storage.get(TOKEN_NAME);
  if (token) {
    config.headers["Access-Token"] = token;
  }
  return config;
}, err);

// response interceptor
service.interceptors.response.use((response) => {
  return response.data;
}, err);

export const VueAxios = {
  install(app) {
    app.config.globalProperties.$axios = service;
    app.config.globalProperties.$http = service;
  },
};

export { service as axios };
export default service;
