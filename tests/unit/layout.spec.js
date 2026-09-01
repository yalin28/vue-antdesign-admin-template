import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import Antd from "ant-design-vue";
import router from "@/router";
import BasicLayout from "@/layouts/BasicLayout.vue";
import Icon from "@/components/Icon/index.vue";
import { useAppStore } from "@/store/modules/app";

describe("BasicLayout Structure", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    window.matchMedia = window.matchMedia || function() {
      return {
        matches: false,
        addListener: function() {},
        removeListener: function() {},
        addEventListener: function() {},
        removeEventListener: function() {},
      };
    };
    window.scrollTo = vi.fn();
  });

  it("should mount BasicLayout with Antd classes", async () => {
    const appStore = useAppStore();
    appStore.setSidebar(true);
    appStore.ToggleDevice("desktop");

    const wrapper = mount(BasicLayout, {
      global: {
        plugins: [createPinia(), router, Antd],
        components: {
          AIcon: Icon,
          Icon: Icon,
        },
      },
    });

    expect(wrapper.find(".ant-layout").exists()).toBe(true);
    expect(wrapper.find(".ant-layout-sider").exists()).toBe(true);
  });
});
