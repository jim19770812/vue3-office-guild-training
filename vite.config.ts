import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    hmr: true, //修改代码后自动刷新浏览器页面
    open: false,//是否自动打开浏览器
    strictPort: true, //强制端口使用port指定的端口，如果不可用就会抛出异常
  },
  build: {
    minify:true, //最小化，混淆代码品质更好
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
