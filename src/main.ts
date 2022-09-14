import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Component1 from '@/components/Component1.vue'
import App from './App.vue'
import router from './router'

import './assets/main.less'

const app = createApp(App)

app.use(createPinia())
app.use(router)
//注册一个全局处理器处理全局的错误，可以在这里捕获未经过处理的异常
app.config.errorHandler = (err, vm, info) => {
  console.error("全局异常捕获：", err);
};

/**
 * 定义一个全局组件
 */

app.component("g-component1", Component1)
app.mount('#app')
