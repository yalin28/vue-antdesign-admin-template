import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import Antd from "ant-design-vue";
import router from "@/router";
import App from "@/App.vue";
import Icon from "@/components/Icon/index.vue";
import { generatorDynamicRouter } from "@/router/generator-routers";
import * as userApi from "@/api/user";

describe("App Integration & Generator Routers", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    window.scrollTo = vi.fn();
  });

  it("should generate dynamic routers without reference errors", async () => {
    vi.spyOn(userApi, "getCurrentUserNav").mockResolvedValue({
      result: [
        {
          id: 11,
          parentId: 0,
          path: "/dashboard",
          name: "dashboard",
          component: "RouteLayout",
          meta: { title: "工作台", icon: "dashboard" },
        },
        {
          id: 111,
          parentId: 11,
          path: "/dashboard/analysis",
          name: "analysis",
          component: "Index",
          meta: { title: "hello" },
        },
      ],
    });

    const routers = await generatorDynamicRouter("4291d7da9005377ec9aec4a71ea837f");
    expect(routers.length).toBeGreaterThan(0);
    const root = routers[0];
    expect(root.path).toBe("/");
    expect(root.children.length).toBe(1);
    expect(root.children[0].name).toBe("dashboard");
  });

  it("App.vue mounts cleanly without TDZ or initialization errors", async () => {
    const pinia = createPinia();
    router.push("/404");
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [pinia, router, Antd],
        components: {
          AIcon: Icon,
          Icon: Icon,
        },
      },
    });

    expect(wrapper.find("#app").exists()).toBe(true);
  });
});
