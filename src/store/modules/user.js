import { defineStore } from "pinia";
import { login, getInfo, logout } from "@/api/user";
import { TOKEN_NAME } from "@/config/index";
import { welcome } from "@/utils/util";
import storage from "@/utils/storage";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: storage.get(TOKEN_NAME, ""),
    name: "",
    welcome: "",
    avatar: "",
    roles: [],
    info: {},
  }),
  actions: {
    SET_TOKEN(token) {
      this.token = token;
    },
    SET_NAME({ name, welcome }) {
      this.name = name;
      this.welcome = welcome;
    },
    SET_AVATAR(avatar) {
      this.avatar = avatar;
    },
    SET_ROLES(roles) {
      this.roles = roles;
    },
    SET_INFO(info) {
      this.info = info;
    },
    // 登录
    Login(userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((response) => {
            const result = response.result;
            storage.set(TOKEN_NAME, result.token, 7 * 24 * 60 * 60 * 1000);
            this.token = result.token;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    GetInfo() {
      return new Promise((resolve, reject) => {
        const token = storage.get(TOKEN_NAME) || this.token;
        getInfo({ token })
          .then((response) => {
            const result = response.result;
            if (result.role && result.role.permissions && result.role.permissions.length > 0) {
              const role = result.role;
              role.permissions.forEach((per) => {
                if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                  const action = per.actionEntitySet.map((action) => action.action);
                  per.actionList = action;
                }
              });
              role.permissionList = role.permissions.map((permission) => permission.permissionId);
              this.roles = role;
              this.info = result;
            } else {
              reject(new Error("getInfo: roles must be a non-null array !"));
              return;
            }

            this.name = result.name;
            this.welcome = welcome();
            this.avatar = result.avatar;

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 登出
    Logout() {
      return new Promise((resolve) => {
        logout(this.token)
          .then(() => {
            resolve();
          })
          .catch(() => {
            resolve();
          })
          .finally(() => {
            this.token = "";
            this.roles = [];
            this.info = {};
            storage.remove(TOKEN_NAME);
          });
      });
    },
  },
});

export default useUserStore;
