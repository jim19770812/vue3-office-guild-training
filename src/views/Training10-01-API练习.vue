<template>
  <h1>1.应用实例API</h1>
  <div id="app1"></div>
  <button @click="button1_click">在单页面应用里创建再创建一个app</button>
  <ul>
    <li>
      可以通过createApp()再创建一个App也可以mount，但mount后并不能在界面上简单的输出数据，模板也不能用
    </li>
    <li>或许用返回template应该可以</li>
  </ul>
  <h2>1.1.应用配置：app.config.errorHandler 全局错误处理</h2>
  <ul>
    <li>全局错误处理和springboot的全局错误处理类似</li>
  </ul>
  <div id="app2"></div>
  <button @click="button2_click">测试全局错误处理1,会创建新的app替代当前app实例</button>
  <h2>1.2.app.unmount()卸载已经挂载的实例</h2>
  <h2>1.3.app.provide() 提供一个全局的值，在应用中可以注入然后获取全局注入的值</h2>
  <pre>
  类型
  interface App {
    provide&lt;T&gt;(key: InjectionKey&lt;T&gt; | symbol | string, value: T): this
  }
  </pre>
  <div>
    <T103Component></T103Component>
  </div>

  <h2>1.4.app.config.compilerOptions.delimiters:string 设置模板的分隔符，默认是{ {}}</h2>
  <h2>1.5.app.config.compilerOptions.comments:boolean 是否移除模板里的html注释</h2>
  <button @click="button4_click">获取app.config.globalProperties.data4</button>
  <ul>
    <li>getCurrentInstance()只能在setup()里调用</li>
    <li>
      和文档不同的是app.config.globalProperties可以设置值，但获取的时候需要用app.appContext.config.globalProperties获取值
    </li>
    <li>从日志里也可以看出这一点</li>
  </ul>
  <h2>1.6.app.config.optionMergeStrategies 用于定义组件选项的合并对象</h2>
  <h1>2.全局API：常规</h1>
  <h2>2.1.nextTick()</h2>
  <pre>
  function nextTick(callback?: () => void): Promise&lt;void&gt;
  </pre>
  <ul>
    <li>
      vue的状态变化时dom的变更会缓存到队列，直到tick才一起执行，这样可以确保组件的多次状态改变会被合并
    </li>
  </ul>
  <div id="count5">计数器：{{ count5 }}</div>
  <button @click="button5_click">变更计数器，并在下一次nextTick后更新计数器的值</button>
  从控制台可以看出变更前后的变化
  <h2>1.2.2.defineComponent() 用于TSX中用作标签时对组件类型提供推导支持</h2>
  <pre>
  推导过程类似下面的逻辑
  const Foo = defineComponent(/* ... */)
  type FooInstance = InstanceType&lt;typeof Foo&gt;
  </pre>
  <h2>
    1.2.3.defineAsyncComponent()和defineComponent()类似，但defineAsyncComponent()是懒加载的
  </h2>
  <h2>1.2.4.defineCustomElement() 返回一个原生的自定义元素</h2>
  <pre>
  function defineCustomElement(
    component:
      | (ComponentOptions & { styles?: string[] })
      | ComponentOptions['setup']
  ): {
    new (props?: object): HTMLElement
  }
  </pre>
  <h1>3.组合式API</h1>
  <h2>3.1.setup()</h2>
  <ul>
    <li>非SFC中使用组合式API时使用setup()</li>
    <li>选项式API中集成组合式API代码时使用setup()</li>
    <li>除此以外优先使用语法糖 &lt;script setup&gt;</li>
  </ul>
  <component :is="components.get('t10_6')"></component>
  <div>当前动态组件数量：{{ components.size }}</div>
  <button @click="button6_click">例子6，演示正常使用setup()的组件</button>
  <h2>3.2.访问props</h2>
  <T107Component message="访问props并通过外部传参"></T107Component>
  <h2>3.3.暴露公众属性</h2>
  <T108Component></T108Component>
  <h2>3.4.setup()上下文</h2>
  <T109Component></T109Component>
  <h2>4.响应式：核心和进阶</h2>
  <T1010Component></T1010Component>
  <h2>5.组合式API：生命周期钩子和依赖注入</h2>
  <component :is="components.get('t10_11')"></component>
  <p>
    <button @click="button_compose_api_click">创建并显示组合式API的组件</button>
  </p>
  <h2>6.状态选项</h2>
  <h3>6.1.data</h3>
  <pre>
  类型
  interface ComponentOptions {
    data?(
      this: ComponentPublicInstance,
      vm: ComponentPublicInstance
    ): object
  }
  </pre>
  <ul>
    <li>
      如果通过data(){return {a:1}}来定义，可以通过
      this.$data来访问data实例，其内部属性a可以用this.$data.a来访问
    </li>
    <li>
      以data(vm)=>{return {a:1}}来定义，可以通过vm实例来访问a,如vm.a
      <strong>貌似不灵</strong>
    </li>
    <li>如果data里要用某个延后创建的属性，可以用ref&lt;number&gt;(null)来占位</li>
  </ul>
  <pre>
    export default{
      data(){
        return {num:Ref&lt;number&gt;=ref&lt;number&gt;(null)}
      }
    }
  </pre>
  <component :is="components.get('t10_12')"></component>
  <p>
    <button @click="button_data_click1">data()的例子1</button>
  </p>
  <component :is="components.get('t10_12_2')"></component>
  <p>
    <button @click="button_data_click2">data()的例子2</button>
  </p>
  <h3>6.2.props</h3>
  <ul>
    <li>vue3组件的props和vue2的用法一样</li>
  </ul>
  <pre>
  类型
  interface ComponentOptions {
    props?: ArrayPropsOptions | ObjectPropsOptions
  }

  type ArrayPropsOptions = string[]

  type ObjectPropsOptions = { [key: string]: Prop }

  type Prop&lt;T = any&gt; = PropOptions&lt;T&gt; | PropType&lt;T&gt; | null

  interface PropOptions&lt;T&gt; {
    type?: PropType&lt;T&gt;
    required?: boolean
    default?: T | ((rawProps: object) => T)
    validator?: (value: unknown) => boolean
  }

  type PropType&lt;T&gt; = { new (): T } | { new (): T }[]
  </pre>
  例子
  <pre>
  export default {
    props: {
      // 类型检查
      height: Number,
      // 类型检查 + 其他验证
      age: {
        type: Number,
        default: 0,
        required: true,
        validator: (value) => {
          return value >= 0
        }
      }
    }
  }
  </pre>
  <h3>6.3.computed</h3>
  <ul>
    <li>vue3的计算属性和vue2一样</li>
    <li>
      可以提供get方法和set方法，实现计算属性的定制化，特别是set方法可以让计算字段具备写的特性
    </li>
  </ul>
  <pre>
  interface ComponentOptions {
    computed?: {
      [key: string]: ComputedGetter&gt;any&gt; | WritableComputedOptions&lt;any&gt;
    }
  }

  type ComputedGetter&lt;T&gt; = (
    this: ComponentPublicInstance,
    vm: ComponentPublicInstance
  ) => T

  type ComputedSetter&lt;T&gt; = (
    this: ComponentPublicInstance,
    value: T
  ) => void

  type WritableComputedOptions&lt;T&gt; = {
    get: ComputedGetter&lt;T&gt;
    set: ComputedSetter&lt;T&gt;
  }
  </pre>
  例子1
  <pre>
  export default {
    computed: {
      aDouble: (vm) => vm.a * 2
    }
  }
  </pre>
  例子2
  <pre>
  export default {
    data() {
      return { a: 1 }
    },
    computed: {
      // 只读
      val() {
        return this.a * 2
      },
      // 可写
      val2: {
        get() {
          return this.a + 1
        },
        set(v) {
          this.a = v - 1
        }
      }
    },
    created() {
      console.log(this.val1) // => 2
      console.log(this.val2) // => 2

      this.val2 = 3
      console.log(this.a) // => 2
      console.log(this.val1) // => 4
    }
  }
  </pre>
  <h3>6.4.methods</h3>
  <ul>
    <li>需要混入到组件实例的方法</li>
    <li>vue3的methods和vue2的用法一样</li>
  </ul>
  <pre>
  interface ComponentOptions {
    methods?: {
      [key: string]: (this: ComponentPublicInstance, ...args: any[]) => any
    }
  }
  </pre>
  <h3>6.5.watch</h3>
  <ul>
    <li>数据变更时的侦听回调</li>
    <li>watch有个选项，提供了监听器的触发时机，遍历深度，刷新时机和监听器的依赖关系</li>
  </ul>
  <pre>
    类型
    interface ComponentOptions {
      watch?: {
        [key: string]: WatchOptionItem | WatchOptionItem[]
      }
    }
    type WatchOptionItem = string | WatchCallback | ObjectWatchOptionItem
    type WatchCallback&lt;T&gt; = (
      value: T,
      oldValue: T,
      onCleanup: (cleanupFn: () => void) => void
    ) => void
    type ObjectWatchOptionItem = {
      handler: WatchCallback | string
      immediate?: boolean // default: false <strong>//创建时是否立即触发回调</strong>
      deep?: boolean // default: false <strong>//源数据是数组，可以控制是否深度遍历，确保在深度数据变更也可以触发watch事件</strong>
      flush?: 'pre' | 'post' | 'sync' // default: 'pre' <strong>//设置回调的刷新时机</strong>
      onTrack?: (event: DebuggerEvent) => void  <strong>//监听器的依赖关系</strong>
      onTrigger?: (event: DebuggerEvent) => void <strong>//监听器的依赖关系</strong>
    }
  </pre>
  <h3>6.6.emits</h3>
  <ul>
    <li>声明由组件触发的自定义事件</li>
    <li>参数可以是字符串也可以是对象</li>
  </ul>
  <pre>
  interface ComponentOptions {
    emits?: ArrayEmitsOptions | ObjectEmitsOptions
  }

  type ArrayEmitsOptions = string[]

  type ObjectEmitsOptions = { [key: string]: EmitValidator | null }

  type EmitValidator = (...args: unknown[]) => boolean
  </pre>
  <component :is="components.get('t_10_14')" @event1="event1"></component>
  <p>
    <button id="t_10_14_a" @click="button_emit_click1">验证自定义事件$emit</button>
  </p>
  <component :is="components.get('t_10_14_setup')" @event1="event1"></component>
  <p>
    <button @click="button_emit_click2">验证自定义事件$emit</button>
  </p>
</template>

<script setup lang="ts">
import T1010Component from "@/components/T10_10Component.vue";
import T103Component from "@/components/T10_3Component.vue";
import T107Component from "@/components/T10_7Component.vue";
import T108Component from "@/components/T10_8Component.vue";
import T109Component from "@/components/T10_9Component.vue";
import { createMainApp } from "@/ts/utils";
import { defineAsyncComponent, getCurrentInstance, nextTick, onMounted, ref } from "vue";
const { proxy, appContext } = getCurrentInstance();

const components = ref<Map<string, any>>(new Map<string, any>());
/**
 * 只有在setup事件里才能获取
 */
console.log(
  "app.appContext.config.globalProperties",
  appContext.config.globalProperties.$data4
);

const button1_click = () => {
  /**
   * 虽然有创建一个新的app，执行后onMounted时间也确实执行了，但没卵用
   *
   */
  createMainApp({
    setup() {
      onMounted(() => {
        console.log("执行app1的onMounted事件");
      });
    },
    render() {
      return `在控制台可以看到结果，恢复原始页面只能靠刷新`;
    },
  });
};

const button2_click = () => {
  const app2 = createMainApp({
    setup() {
      onMounted(() => {
        console.log("app2.onMounted");
        throw new Error("app2 ERROR");
      });
    },
    render() {
      return `在控制台可以看到结果，恢复原始页面只能靠刷新`;
    },
  });
  app2.config.errorHandler = (err) => {
    console.log("全局错误发生：", err);
  };
  app2.mount("#app2");
};

const button4_click = () => {
  console.log("1");
  /**
   * getCurrentInstance()只能在setup()方法里才能执行
   */
  // const app4 = getCurrentInstance();
  /**
   * 只有在setup事件里才能获取
   */
  console.log(
    "app.appContext.config.globalProperties",
    appContext.config.globalProperties.$data4
  );
};

const count5 = ref(0);
const button5_click = async () => {
  count5.value++;
  console.log("执行nextTick之前", document.getElementById("count5")?.innerText);
  await nextTick();
  console.log("执行nextTick之后", document.getElementById("count5")?.innerText);
};

const button6_click = async () => {
  const component10_6 = defineAsyncComponent(
    () => import("@/components/T10_6Component.vue")
  );
  console.log("component10_6", component10_6);
  components.value.set("t10_6", component10_6);
  console.log("components.size()=", components.value.size);
};

const button_compose_api_click = () => {
  const component10_11 = defineAsyncComponent(
    () => import("@/components/T10_11Component.vue")
  );
  components.value.set("t10_11", component10_11);
};

const button_data_click1 = () => {
  const component10_12 = defineAsyncComponent(
    () => import("@/components/T10_12Component.vue")
  );
  console.log("component10_12", component10_12);
  components.value.set("t10_12", component10_12);
};

const button_data_click2 = () => {
  const component10_12_2 = defineAsyncComponent(
    () => import("@/components/T10_12Component2.vue")
  );
  console.log("component10_12_2", component10_12_2);
  components.value.set("t10_12_2", component10_12_2);
};

const event1 = (num: number) => {
  console.log("父组件的event1事件：", JSON.stringify(obj));
};

const button_emit_click1 = () => {
  const component10_14 = defineAsyncComponent(
    () => import("@/components/T10_14Component.vue")
  );
  console.log("component10_14", component10_14);
  components.value.set("t_10_14", component10_14);
};

const button_emit_click2 = () => {
  const component10_14_setup = defineAsyncComponent(
    () => import("@/components/T10_14Component_setup.vue")
  );
  console.log("component10_14_setup", component10_14_setup);
  components.value.set("t_10_14_setup", component10_14_setup);
};
</script>

<style lang="less"></style>
