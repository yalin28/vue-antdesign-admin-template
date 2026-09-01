import { createApp } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import App from "@/App.vue";
import router from "@/router";
import { pinia } from "@/store";
import { VueAxios } from "@/utils/request";
import "@/mock";
import setStoreWidthConfig from "@/core/set_store_width_config";
import actionDirective from "@/core/directives/action";
import Icon from "@/components/Icon/index.vue";
import "@/permission";
import "@/style/global.less";
import "virtual:svg-icons-register";

const app = createApp(App);

app.use(pinia);
setStoreWidthConfig();
app.use(router);
app.use(Antd);
app.use(VueAxios);
app.component("AIcon", Icon);
app.component("Icon", Icon);
app.directive("action", actionDirective);

app.mount("#app");
