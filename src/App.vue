<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="app">
    <div class="app-menu">
      <router-link to="/">Vue3</router-link>
      <router-link to="/training-01">01.开始</router-link>
      <router-link to="/training-01-1">01.开始-错误处理</router-link>
      <router-link to="/training01-01-2">01.2-开始-setup语法糖</router-link>
      <router-link to="/training-02">02.基础</router-link>
      <router-link to="/training-03">03.深入组件</router-link>
      <router-link to="/training-04">04.逻辑复用</router-link>
      <router-link to="/training-05">05.内置组件</router-link>
      <router-link to="/training-06">06.应用规模化</router-link>
      <router-link to="/training-07">07.最佳实践</router-link>
      <router-link to="/training-08">08.TypeScript</router-link>
      <router-link to="/training-09">09.进阶主题</router-link>
    </div>
    <div class="app-content">
      <RouterView />
    </div>
  </div>
</template>

<style lang="less">
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

.app * {
  margin: 8px;
}

.app .app-menu {
  padding-left: 8px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  background: black;
  width: 35%;
}

.app .app-menu a:hover {
  color: gray;
}

.app .app-menu a {
  color: gray;
}

.app > .app-content {
  line-height: 1.5;
  width: 80%;
}

.app strong {
  font-weight: bold;
  color: coral;
}

.app .red {
  color: red;
}

.app code {
  display: block;
  background: #efc;
  color: black;
}

.app pre {
  display: block;
  background: black;
  color: #c7a8de;
}
</style>
