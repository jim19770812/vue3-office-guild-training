<template>
  <div>全部生命周期钩子都在控制台里有输出</div>
  <h3>vue2和vue3的生命周期对应关系</h3>
  <table>
    <thead>
      <tr>
        <td class="column center">顺序</td>
        <td class="column center">vue2的事件钩子</td>
        <td class="column center">vue3的事件钩子函数</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="column center">1</td>
        <td class="column">beforeCreate</td>
        <td class="column">setup()</td>
      </tr>
      <tr>
        <td class="column center">2</td>
        <td class="column">create</td>
        <td class="column">setup()</td>
      </tr>
      <tr>
        <td class="column center">3</td>
        <td class="column">beforeMount</td>
        <td class="column">onBeforeMount()</td>
      </tr>
      <tr>
        <td class="column center">4</td>
        <td class="column">mounted</td>
        <td class="column">onMounted()</td>
      </tr>
      <tr>
        <td class="column center">5</td>
        <td class="column">beforeUpdate</td>
        <td class="column">onBeforeUpdate()</td>
      </tr>
      <tr>
        <td class="column center">6</td>
        <td class="column">updated</td>
        <td class="column">onUpdated()</td>
      </tr>
      <tr>
        <td class="column center">7</td>
        <td class="column">beforeDestroy</td>
        <td class="column">onBeforeUnmount()</td>
      </tr>
      <tr>
        <td class="column center">8</td>
        <td class="column">destroyed</td>
        <td class="column">onUnmounted()</td>
      </tr>
      <tr>
        <td class="column center">9</td>
        <td class="column">activated</td>
        <td class="column">onActivated()</td>
      </tr>
      <tr>
        <td class="column center">10</td>
        <td class="column">deactivated</td>
        <td class="column">onDeactivated()</td>
      </tr>
      <tr>
        <td class="column center">11</td>
        <td class="column">errorCaptured</td>
        <td class="column">onErrorCaptured()</td>
      </tr>
    </tbody>
  </table>
  <h3>组合式API：依赖注入</h3>
  <ul>
    <li>通过在app实例里通过provide注入值，在任何地方用inject可以得到这个值</li>
    <li>provide()方法貌似只能通过Vue的实例来设置？</li>
    <li>Component虽然有provide属性，但目前不清楚是做什么用的？</li>
  </ul>
  <pre>
  provide类型
  function provide&lt;T&gt;(key: InjectionKey&lt;T&gt; | string, value: T): void

  inject类型（没有默认值）
  function inject&lt;T&gt;(key: InjectionKey&lt;T&gt; | string): T | undefined

  injrect类型（带有默认值的）
  function inject&lt;T&gt;(key: InjectionKey&lt;T&gt; | string, defaultValue: T): T

  inject类型（使用工厂函数）
  function inject&lt;T&gt;(
    key: InjectionKey&lt;T> | string,
    defaultValue: () => T,
    treatDefaultAsFactory: true
  ): T
  </pre>
  <p class="red">{{ t10_3_message }}</p>
</template>

<script setup lang="ts">
import {
  inject,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onServerPrefetch,
  onUnmounted,
  onUpdated,
} from "vue";

const t10_3_message = inject("t10_3_message");
onMounted(() => {
  console.log("onMounted");
});

onUpdated(() => {
  console.log("onUpdated");
});

onUnmounted(() => {
  console.log("onUnmounted");
});

onBeforeMount(() => {
  console.log("onBeforeMount");
});

onBeforeUpdate(() => {
  console.log("onBeforeUpdate");
});

onBeforeUnmount(() => {
  console.log("onBeforeUnmount");
});

onRenderTracked(() => {
  console.log("onRenderTracked");
});

onRenderTriggered(() => {
  console.log("onRenderTriggered");
});

onActivated(() => {
  console.log("onActivated");
});

onDeactivated(() => {
  console.log("onDeactivated");
});

onServerPrefetch(() => {
  console.log("onServerPrefetch");
});
</script>

<style lang="less">
table {
  width: 600px;
  text-align: left;
  border: 1px solid gray;
  border-spacing: 0px;
}
td {
  border-spacing: 0px;
  border: 1px solid gray;
}
.left {
  text-align: left;
}
.center {
  text-align: center;
}
.column {
  width: 300px;
}
</style>
