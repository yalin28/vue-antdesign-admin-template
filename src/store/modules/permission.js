import { defineStore } from "pinia";
import { constantRouterMap } from "@/router/router.config";
import { generatorDynamicRouter } from "@/router/generator-routers";

export const usePermissionStore = defineStore("permission", {
  state: () => ({
    routers: constantRouterMap,
    addRouters: [],
  }),
  actions: {
    SET_ROUTERS(routers) {
      this.addRouters = routers;
      this.routers = constantRouterMap.concat(routers);
    },
    GenerateRoutesSync(data) {
      return new Promise((resolve, reject) => {
        const { token } = data;
        generatorDynamicRouter(token)
          .then((routers) => {
            this.SET_ROUTERS(routers);
            resolve(routers);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});

export default usePermissionStore;
