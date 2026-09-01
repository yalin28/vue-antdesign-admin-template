import { createRouter, createWebHashHistory } from "vue-router";
import { constantRouterMap, syncRouterMap } from "@/router/router.config";
import { openPermission } from "@/config/index";

const routes = openPermission ? constantRouterMap : constantRouterMap.concat(syncRouterMap);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

export default router;
