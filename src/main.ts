import { createSSRApp } from "vue";
import App from "./App.vue";
import { Pinia } from "@/stores";
import "virtual:windi-components.css";
import "virtual:windi-utilities.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia);
  app.use(ElementPlus);
  return {
    app,
  };
}
