import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import Antd from "ant-design-vue";
import Icon from "@/components/Icon/index.vue";
import ExceptionPage from "@/components/Exception/ExceptionPage.vue";
import Ellipsis from "@/components/Ellipsis/Ellipsis.vue";

describe("Component Units", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("Icon component should render Ant Design Icon", () => {
    const wrapper = mount(Icon, {
      props: {
        type: "user",
      },
    });
    expect(wrapper.classes()).toContain("anticon");
  });

  it("ExceptionPage should render 404 title and description", () => {
    const wrapper = mount(ExceptionPage, {
      props: {
        type: "404",
      },
      global: {
        plugins: [Antd],
      },
    });
    expect(wrapper.text()).toContain("404");
    expect(wrapper.text()).toContain("抱歉，你访问的页面不存在");
  });

  it("Ellipsis should truncate text when exceeding length", () => {
    const wrapper = mount(Ellipsis, {
      props: {
        length: 5,
        tooltip: false,
      },
      global: {
        plugins: [Antd],
      },
      slots: {
        default: "这是一个超长的测试字符串",
      },
    });
    expect(wrapper.text()).toContain("...");
  });
});
