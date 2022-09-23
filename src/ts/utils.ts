import { createApp, type Component } from "vue";
import { createPinia } from "pinia";
import Component1 from "@/components/Component1.vue";
import router from "../router";

export function getCurrentApp(): Component {
  return window.$app as Component;
}

/**
 * 创建一个App实例，用于替代单实例的App实例
 * @param root 
 * @returns 
 */
export function createMainApp(root: Component): Component {
  /**
   * 卸载默认的App
   */
  (window.$app as Component)?.unmount();
  /**
   * 根据传入的根组件重新创建一个App实例
   */
  const app = createApp(root);
  window.$app2 = app;
  app.use(createPinia());
  app.use(router);

  /**
   * 定义一个全局组件
   */
  app.mount("#app");
  return app;
}
