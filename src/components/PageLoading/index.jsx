import { createVNode, render, defineComponent, h } from "vue";
import { Spin } from "ant-design-vue";

export const PageLoading = defineComponent({
  name: "PageLoading",
  props: {
    tip: {
      type: String,
      default: "Loading..",
    },
    size: {
      type: String,
      default: "large",
    },
  },
  render() {
    const style = {
      textAlign: "center",
      background: "rgba(0,0,0,0.6)",
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1100,
    };
    const spinStyle = {
      position: "absolute",
      left: "50%",
      top: "40%",
      transform: "translate(-50%, -50%)",
    };
    return (
      <div style={style}>
        <Spin size={this.size} style={spinStyle} tip={this.tip} />
      </div>
    );
  },
});

let container = null;

export const loading = {
  show(options = {}) {
    if (!container) {
      container = document.createElement("div");
      container.setAttribute("class", "ant-loading-wrapper");
      document.body.appendChild(container);
    }
    const vnode = createVNode(PageLoading, { ...options });
    render(vnode, container);
  },
  hide() {
    if (container) {
      render(null, container);
      container.parentNode && container.parentNode.removeChild(container);
      container = null;
    }
  },
};

export const PageLoadingPlugin = {
  install(app) {
    app.config.globalProperties.$loading = loading;
  },
};

export default PageLoadingPlugin;
