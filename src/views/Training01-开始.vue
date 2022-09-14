<template>
  <h1>应用实例</h1>
  <pre>
    &lt;div id="<strong>app</strong>"&gt;
    ......
    import {createApp} from 'vue';
    //从一个单文件组件中导入根组件
    import App from './App.vue'
    const app = createApp(App) <strong>//app就是根组件</strong>

    app.mount('<strong>#app</strong>')  <strong>//挂载应用到#app元素</strong>
  </pre>
  createApp的结果根组件是app的实例，是单实例的
  <h1>全局组件的注册和使用</h1>
  <div>
    全局组件是在main.ts中注册的组件，在使用时可以不用import而在view/component里直接使用
  </div>
  <pre>
  import Component1 from '@/components/Component1.vue'
  app.component("g-component1", Component1)
  ....
  &lt;g-component1&gt;g-component1是来自main.ts中注册的全局组件&lt;/g-component1&gt;
  </pre>
  这样就会在占位符g-component1标签处显示全局组件的内容了。可以看下控制台，也会输出组件1的对应事件
  <g-component1>g-component1是来自main.ts中注册的全局组件</g-component1>
  <h1>多应用实例</h1>
  <ul>
    <li>vue支持多实例，每个实例不会互相打扰</li>
  </ul>
  <button @click="click_1">创建另一个vue实例并挂载到#app1</button>
  <div id="app1"></div>
  <ul>
    <li>
      <strong
        >貌似点了按钮这个不灵,vue2里的动态创建组件的功能在vue3里已经默认不再支持，而是需要通过加载一个动态编译插件来解决</strong
      >
    </li>
    <li>
      多实例功能一般用在服务器端渲染，也就是后端是java/php这样的程序，内部集成模板语言，模板里使用vue3的渲染方式
    </li>
  </ul>
  <h1>vue模板里的表达式</h1>
  <ul>
    <li>用{ { } }包起来的就是vue表达式</li>
    <li>
      可以用在javascript的return语法的表达式就可以作为vue表达式用于直接界面上输出
    </li>
  </ul>
  <h1>动态参数</h1>
  <ul>
    <li>
      动态参宿是指绑定的值的用变量的值表示，可以动态变更变量值来调整动态参数的内容
    </li>
    <li>用法 v-bind:[attributeName]="xxx"</li>
  </ul>
  <h1>声明响应式状态</h1>
  <ul>
    <li>使用reactive()函数来创建一个响应式对象或者数组</li>
    <li>响应对象可以是多层级的，任何遗一级的变化都会得到响应并触发更新</li>
    <li>使用ref()来定义响应式变量</li>
    <li>
      ref()可以创建一个对任意值的引用，可以在不失去响应性的前提下传递这些引用
    </li>
    <li>
      ref()的值作为顶层属性访问时可以不用通过.value()来访问，vue会自动解包
      <pre>
        const r1=ref({
            name: ref("张飞")
        })
        { { r1.name.value() } } <strong>非顶层属性，必须手工解包</strong>
        </pre
      >
      <div>{{ ref_obj1 }}</div>
      <button @click="button1_1_click">顶层直接使用的例子</button>
      <div>{{ ref_obj2.counter }}</div>
      <button @click="button1_2_click">非顶层属性使用的例子</button>
    </li>
    <li>ref()的值不作为顶层属性访问时必须要通过.value()来访问</li>
  </ul>
  reactive()和ref的区别
  <ul>
    <li>reactive()针对的是对象或者数字，比如{}和[]</li>
    <li>ref()针对的简单的的数值，比如string,number,Date之类</li>
  </ul>
  <pre>
  import { reactive } from 'vue';
  const state = reactive({value:100});
  </pre>
</template>

<script setup lang="ts">
import Component2 from "@/components/Component2.vue";
import { createApp, ref } from "vue";
const click_1 = () => {
  const app1 = createApp({
    setup() {
      console.log("实例：app1.setup()");
    },
    template: `
      <d-comp1 :message='新实例里的信息'></d-comp1>
      `,
  });
  app1.component("d-comp1", Component2).mount("#app1");
};
const ref_obj1 = ref(0);
const ref_obj2 = ref({
  counter: 0,
});

const button1_1_click = () => {
  ref_obj1.value++;
};
const button1_2_click = () => {
  ref_obj2.value.counter++;
};
</script>

<style lang="less"></style>
