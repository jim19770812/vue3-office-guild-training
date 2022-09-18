<template>
  <h1>应用实例API</h1>
  <h2>createApp()</h2>
  <ul>
    <li>创建一个应用实例</li>
    <li>
      支持多实例，特别是SSR项目（服务器渲染模式-既后端是springboot/php之类的实现的渲染模式）
    </li>
    <li></li>
  </ul>
  <h2>createSSRApp()</h2>
  <ul>
    <li>创建一个SSR实例，既创建一个服务器端渲染的APP</li>
  </ul>
  <h2>app.mount()</h2>
  <ul>
    <li>挂载到某个dom元素</li>
    <li>每个App，mount只能执行1次</li>
  </ul>
  <h2>app.provide()</h2>
  <ul>
    <li>
      提供者，通过为app设置provide，可以在所有可以访问app的场景使用这个提供的值，比如naive-ui的message，完全可以通过provide来设置下这个message的实例，然后在任何地方来使用message的实例
    </li>
  </ul>
  <pre>
  import {createApp} from 'vue';
  const app=createApp(App);
  app.provide('message', 'hello'); <strong>//设置message的内容是</strong>
  ....

  使用场景
  ....
  import{inject} from 'vue';
  console.log(injrect('message')); <strong>//会输出hello</strong>
  </pre>

  <h2>app.component()</h2>
  <ul>
    <li>注册一个全局组件</li>
    <li>可以在应用场景通过名字来获取组件</li>
    <li>和defineComponent()类型推导的方法配合使用</li>
  </ul>
  <pre>
    import {ceateApp} from 'vue';
    const app=createApp({});
    app.component('my-component', myComponent);
    ....
    //得到一个已经注册的组件
    ....
    const myComponent=app.component('my-component');
    <strong>得到了组件之后要怎么用？</strong>
  </pre>
  <h2>app.directive()</h2>
  <ul>
    <li>注册一个全局指令</li>
  </ul>
  <h2>app.use()</h2>
  <ul>
    <li>安装一个插件</li>
  </ul>
  <pre>
    声明
    interface App {
      use(plugin: Plugin, ...options: any[]): this
    }
  </pre>
  <h2>app.mixin()</h2>
  <ul>
    <li>应用一个全局mixin，全局的mixin可以应用在app全局范围的每个组件</li>
    <li>相当于给所有组件都增加特性</li>
    <li>mixin不推荐使用，特别是全局的minin</li>
  </ul>
  <pre>
    interface App {
      mixin(mixin: ComponentOptions): this
    }
  </pre>
  <h2>app.config</h2>
  <ul>
    <li>config对象提供了对app的配置功能，可以实现对app的定制</li>
  </ul>
  <h3>app.config.errorHandler</h3>
  <ul>
    <li>全局异常处理函数</li>
  </ul>
  类型
  <pre>
  interface AppConfig {
    errorHandler?: (
      err: unknown,
      instance: ComponentPublicInstance | null,
      // `info` 是一个 Vue 特定的错误信息
      // 例如：错误是在哪个生命周期的钩子上抛出的
      info: string
    ) => void
  }
  </pre>
  <pre>
  app.config.errorHandler = (err, instance, info) => {
    // 处理错误，例如：报告给一个服务
  }
  </pre>
  <h3>app.config.warnHandler</h3>
  <ul>
    <li>全局警告处函数，声明和用法和app.config.errorHandler一样</li>
    <li>只在开发阶段使用，意义不大</li>
  </ul>
  <h3>app.config.performance</h3>
  <ul>
    <li>
      用于在devtool里性能页中启动组件初始化，编译，渲染等profile特性的追踪，设置成true可以开启
    </li>
  </ul>
  app.config.globalProperties
  <ul>
    <li>定义可以全局使用的属性</li>
    <li>可以在任何场景使用全局属性</li>
  </ul>
  类型
  <pre>
    interface AppConfig{
      globalProperties : Record&lt;string, any&gt;
    }
  </pre>
  <pre>
    //定义
    app.config.globalProperties.<strong>msg</strong> ="hello";
    ....
    应用场景
    mounted(()=>{
      console.log(<strong>this.msg</strong>); //会输出hello
    })
  </pre>
  <h3>app.config.optionMergeStrategies</h3>
  <ul>
    <li>定义自定义组件选项的合并策略对象</li>
  </ul>
  类型
  <pre>
    interface AppConfig {
      optionMergeStrategies: Record&lt;string, OptionMergeFunction&gt;
    }

    type OptionMergeFunction = (to: unknown, from: unknown) => any
  </pre>

  <h3>app.config.compilerOptions</h3>
  <ul>
    <li>编译选项，也可以通过配置文件来覆盖</li>
    <li>可以在每个组件设置compilerOptions来微调编译设置</li>
  </ul>
  详细介绍
  <ul>
    <li>
      app.config.compilerOptions.isCustomElement用来判断是否是自定义的原生元素，在完整构建版本里可用，浏览器中使用vue.js需要特殊配置，见官网
      <pre>
      app.config.compilerOptions.isCustomElement(tag: string)=>boolean
      </pre>
    </li>
    <li>
      app.config.compilerOptions.whitespace用来调整模板中的空格行为，一般不需要特别关注
    </li>
    <li>
      app.config.compilerOptions.comments用于移除模板中的html注释，默认是false
      <pre>
      app.config.compilerOptions.comments:boolean=true|false;
      </pre>
    </li>
  </ul>
  <h1>通用</h1>
  <h2>nextTick()</h2>
  <ul>
    <li>等待下一个DOM的更新刷新事件，这点是对js的类似方法的封装</li>
  </ul>
  <pre>
  function nextTick(callback?: () => void): Promise&lt;void&gt;
  </pre>
  <h2>defineComponent()</h2>
  <ul>
    <li>定义vue组件时提供类型推导的辅助函数</li>
    <li>返回的是组件的构造方法</li>
  </ul>
  <pre>
  function defineComponent(
    component: ComponentOptions | ComponentOptions['setup']
  ): ComponentConstructor
  </pre>
  <h2>defineAsyncComponent()</h2>
  <ul>
    <li>定义一个异步组件，懒加载模式</li>
  </ul>
  <pre>
  function defineAsyncComponent(
    source: AsyncComponentLoader | AsyncComponentOptions
  ): Component

  type AsyncComponentLoader = () => Promise&lt;Component&gt;

  interface AsyncComponentOptions {
    loader: AsyncComponentLoader
    loadingComponent?: Component
    errorComponent?: Component
    delay?: number
    timeout?: number
    suspensible?: boolean
    onError?: (
      error: Error,
      retry: () => void,
      fail: () => void,
      attempts: number
    ) => any
  }
  </pre>
  <h2>defineCustomElement()</h2>
  <ul>
    <li>
      defineComponent会返回一个原声的自定义元素，类似WebComponents的document.createDocumentFragment
    </li>
    <li>它的作用可以把创建的自定义元素挂载到任意的元素下</li>
    <li>这个API一般用不着</li>
  </ul>
  <pre>
  function defineCustomElement(component: (ComponentOptions & { styles?: string[] }) | ComponentOptions['setup']): {
    new (props?: object): HTMLElement
  }
  </pre>
  <pre>
  import {defineCustomeElement} from 'vue';
  const element=defineCustomElement({
    //组件选项
  })
  element.define('#my-div', element)
  </pre>
</template>

<script setup lang="ts"></script>

<style lang="less"></style>
