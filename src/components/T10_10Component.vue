<template>
  <div>refVal={{ refVal }}</div>
  <div>computedVal1={{ computedVal1 }}</div>
  <button @click="button1_click">computed变更</button>
  <div>computedVal2={{ computedVal2 }}</div>
  <div>{{ reactive1 }}</div>
  <button @click="button2_click">列表增加项目</button>
  <div>只读数值：{{ readonlyVal1 }}</div>
  <div>watchEffect()</div>
  <ul>
    <li>watchEffect()只是触发影响，貌似是监控所有的ref对象</li>
  </ul>
  <div>watchEffectVal={{ watchEffectVal }}</div>
  <button @click="start_watch_effect_click">开始watchEffect</button>
  <button @click="watch_effect_plus_click">watchEffectVal++</button>
  <button @click="stop_watch_effect_click">
    结束watchEffect<strong>（不灵，停不掉）</strong>
  </button>
  <div>watch()值1：{{ watchVal1 }}</div>
  <button @click="button_watchVal1_click">watchVal1++</button>
  <div>watch()值1：{{ watchVal2 }}</div>
  <button @click="button_watchVal2_click">watchVal2++</button>
  <div>isRef()</div>
  <button @click="button_isRef_click">判断isRef()是否是引用对象</button>
  <div>unref()</div>
  <button @click="button_unref_click">unref()解包</button>
  <div>toRef</div>
  <dir>refObject1={{ refObject1 }}</dir>
  <button @click="button_toRef_click">toRef让年龄+1</button>
  <div>
    isProxy() 判断对象是否是用 reactive()， readonly() shallowReactive()，
    shallowReadonly()创建
  </div>
  <button @click="button_isproxy_click">isProxy()测试1</button>
  <div>isReactive() 判断对象是否是由reactive创建</div>
  <button @click="button_is_reactive_click">isReactive()测试</button>
  <div>isReadonly() 判断对象是否是由readonly创建</div>
  <button @click="button_is_readonly_click">isReadonly()测试</button>
  <div>shallowRef()，这是ref()的浅层作用形式</div>
  <ul>
    <li>对整体的变更才会触发更改，只是对对象属性的修改不会触发变更</li>
  </ul>
  <pre>
  类型
  function shallowRefk&lt;T&gt;(value: T): ShallowRef&lt;T&gt;
  interface ShallowRef&lt;T&gt; {
    value: T
  }
  </pre>
  <button @click="button_sallowRef_click">shallowRef()的例子</button>
  <div>triggerRef()，强制触发浅层ref的watchEffect()变更</div>
  <ul>
    <li>可以做为在浅层ref值变更不触发watchEffect的补充手段</li>
  </ul>
  <pre>
  function triggerRef(ref: ShallowRef): void
  </pre>
  <button @click="button_triggerRef_click">triggerRef()的例子</button>
  <div>shallowReactive()，这个接口是对reactive()的浅层作用</div>
  <ul>
    <li>非深层次的转换，只有根属性是响应式的，二级及以下属性是非响应式的</li>
    <li>shallowReactive的性能更高一点</li>
  </ul>
  <pre>
  类型
  function shallowReactive&lt;T extends object&gt;(target: T): T
  </pre>
  <button @click="button_shallowReactive_click">shallowReactive()的例子1</button>
  <div>shallowReadonly()，readonly()的浅层作用形式</div>
  <ul>
    <li>只有顶层属性变成了只读，非顶层属性仍然可以修改</li>
    <li>非顶层属性也不会被自动解包了</li>
  </ul>
  <pre>
  类型
  function shallowReadonly&lt;T extends object&gt;(target: T): Readonly&lt;T&gt;
  </pre>
  <button @click="button_shallowReadonly_click1">shallowReadonly()的例子1</button>
  <div>
    toRaw()，返回reactive(), readonly(), shallowReactive(),
    shallowReadonly()所代理的原始对象
  </div>
  <pre>
    类型
    function toRaw&lt;T&gt;(proxy: T): T
  </pre>
  <button @click="button_toRaw_click">toRaw()的例子1</button>
  <div>markRaw()，把对象标记为不可转为代理</div>
  <pre>
    类型
    function markRaw&lt;T extends object&gt;(value: T): T
  </pre>
  <button @click="button_markRaw_click">markRaw()的例子1</button>
  <div>effectScope()</div>
  <ul>
    <li>
      effect作用域，可以用编程式的创建一个影响作用域，在作用域中计算属性和侦听器才可用，出了作用域就失效
    </li>
    <li>作用域类似spring中的编程式事务</li>
  </ul>
  <pre>
  类型
  function effectScope(detached?: boolean): EffectScope
  interface EffectScope {
    run&lt;T&gt;(fn: () => T): T | undefined // 如果作用域不活跃就为 undefined
    stop(): void
  }
  </pre>
  <button @click="button_effectScope_click">effectScope()例子1</button>
  <div>getCurrentScope()获取当前活动的effect作用域</div>
  <pre>
    类型
    function getCurrentScope(): EffectScope | undefined
  </pre>
  <div>onScopeDispose()在当前的effect作用域上注册一个回调处理函数</div>
  <pre>
    类型
    function onScopeDispose(fn: () => void): void
  </pre>
</template>

<script setup lang="ts">
import {
computed,
effectScope,
isProxy,
isReactive,
isReadonly,
isRef,
markRaw,
nextTick,
reactive,
readonly,
ref,
shallowReactive,
shallowReadonly,
shallowRef,
toRaw,
toRef,
triggerRef,
unref,
watch,
watchEffect,
type ComputedRef,
type Ref,
type WriteableComputedRef
} from "vue";

/**
 * ref的格式
   function ref<T>(value: T): Ref<UnwrapRef<T>>

   interface Ref<T> {
      value: T
   }

   通过.value解包，但在 <script setup>语法糖里会自动解包ref数据，因此在template里直接使用ref数据就可以，无需解包
 *
 */
const refVal = ref<number>(0);

/**
// 只读
function computed<T>(
  getter: () => T,
  // 查看下方的 "计算属性调试" 链接
  debuggerOptions?: DebuggerOptions
): Readonly<Ref<Readonly<T>>>

// 可写的
function computed<T>(
  options: {
    get: () => T
    set: (value: T) => void
  },
  debuggerOptions?: DebuggerOptions
): Ref<T>
 */

/**
 * 只读计算值
 */
const computedVal1: ComputedRef<number> = computed(() => refVal.value + 1);

/**
 * 可读写计算值
 */
const computedVal2: WriteableComputedRef<number> = computed({
  get: () => computedVal1.value,
  set: (val) => (refVal.value = val + 1),
});

const button1_click = () => {
  computedVal2.value += 1;
};

/**
    reactive 主要用于Map，List这样的集合类型数据
    类型
    function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
 */
const reactive1: Array<string> = reactive<Array<string>>([]);
const button2_click = () => {
  reactive1.push("item" + reactive1.length);
};

/**
   readonly()只读对象，返回一个只读的对象，构造方法必须是个对象，可以通过ref得到这个对象
   类型
    function readonly<T extends object>(
        target: T
    ): DeepReadonly<UnwrapNestedRefs<T>>
 */
const readonlyVal1 = readonly(ref(0));

/**
 * watchEffect() 响应式的追踪依赖，并在依赖更改时重新执行
 * 类型定义
    function watchEffect(
        effect: (onCleanup: OnCleanup) => void,
        options?: WatchEffectOptions
    ): StopHandle

    type OnCleanup = (cleanupFn: () => void) => void //清理监视的定义

    //监视的选项
    interface WatchEffectOptions {
        flush?: 'pre' | 'post' | 'sync' // 默认：'pre' //post表示监听器会延迟到组件渲染后触发，
        onTrack?: (event: DebuggerEvent) => void
        onTrigger?: (event: DebuggerEvent) => void
    }

    type StopHandle = () => void
 */
/**
 * watchPostEffect() 是 flush:'post'的别名
 * watchSyncEffect() 是 flush:'sync'的别名
 */
const watchEffectVal: Ref<number> = ref(0);
const stop = watchEffect(() => {});
const start_watch_effect_click = () => {
  /**
   * 开始监视
   */
  watchEffect(
    () => {
      console.log("watchEffect 事件：", watchEffectVal.value);
    },
    { flush: "post" }
  );
};

const stop_watch_effect_click = () => {
  /**
   * 停止监视
   */
  stop();
};

const watch_effect_plus_click = () => {
  watchEffectVal.value++;
};

/**
 * watch()  监听一个或多个响应数据，在数据变化时触发给回调，支持监听多个响应数据
 * 貌似和watchEffect()没有太多区别
 *
   类型
    // 侦听单个来源
    function watch<T>(
        source: WatchSource<T>,
        callback: WatchCallback<T>,
        options?: WatchOptions
    ): StopHandle

    // 侦听多个来源
    function watch<T>(
        sources: WatchSource<T>[],
        callback: WatchCallback<T[]>,
        options?: WatchOptions
    ): StopHandle

    type WatchCallback<T> = (
        value: T,
        oldValue: T,
        onCleanup: (cleanupFn: () => void) => void
    ) => void

    type WatchSource<T> =
    | Ref<T> // ref
    | (() => T) // getter
    | T extends object
    ? T
    : never // 响应式对象

    interface WatchOptions extends WatchEffectOptions {
        immediate?: boolean // 默认：false
        deep?: boolean // 默认：false
        flush?: 'pre' | 'post' | 'sync' // 默认：'pre'
        onTrack?: (event: DebuggerEvent) => void
        onTrigger?: (event: DebuggerEvent) => void
    }
 */
/**
 * 监控多个值的例子，如果是监控一个值，只要把数组改成值就好了。
 */
const watchVal1 = ref(0);
const watchVal2 = ref(0);
watch([watchVal1, watchVal2], ([valOld1, valNew1], [valOld2, valNew2]) => {
  console.log("watchVal1 发生了变更", valOld1, valNew1);
  console.log("watchVal2 发生了变更", valOld2, valNew2);
});
const button_watchVal1_click = () => {
  watchVal1.value++;
};
const button_watchVal2_click = () => {
  watchVal2.value++;
};
/**
 * isRef 不能在模板的表达式里使用
 */
const button_isRef_click = () => {
  console.log("isRef(ref(0))=", isRef(ref(0)));
  console.log("isRef(0)", isRef(0));
};
/**
 * unRef() 解包，返回被包装的值
 */

const button_unref_click = () => {
  const temp = ref(0);
  console.log("unRef(ref(0))", unref(temp));
};
/**
 * toRef() 把对象的属性转换成一个ref对象，对新ref对象的变更也会影响原对象的属性值
 * toRef和ref(对象的属性) 的结果不同， ref(对象的属性)会让对象属性和新的ref对象脱钩
    function toRef<T extends object, K extends keyof T>(
        object: T,
        key: K,
        defaultValue?: T[K]
    ): ToRef<T[K]>

    type ToRef<T> = T extends Ref ? T : Ref<T>
 */
const refObject1 = reactive({
  name: "张飞",
  age: 20,
});
const ageRef = toRef(refObject1, "age");
const button_toRef_click = () => {
  ageRef.value++;
};
/**
 * toRefs() 把普通对象转换成一个响应式对象，该响应式对象的每个属性都是使用toRef()转换过的
 */

/**
 * isProxy()
 */
const button_isproxy_click = () => {
  console.log("isProxy(ref(0))=", isProxy(ref(0)));
  console.log("isProxy(readonly(1))=", isProxy(readonly(ref(1))));
  console.log("isProxy(reactive({}))=", isProxy(reactive({ name: "jim" })));
};
/**
 * isReactive()
 * 类型
    function isReactive(value: unknown): boolean
 */
const button_is_reactive_click = () => {
  console.log("isReactive(0)=", isReactive(0));
  console.log("isReactive({})=", isReactive({}));
  console.log("isReactive(reactive({}))=", isReactive(reactive({})));
};
/**
 * isReadonly()
 * 类型
    function isReadonly(value: unknown): boolean
 */
const button_is_readonly_click = () => {
  console.log("isReadonly(ref(0))=", isReadonly(ref(0)));
  console.log("isReadonly(readonly(ref(0)))=", isReadonly(readonly(ref(0))));
};

const button_sallowRef_click = () => {
  const cnt2 = shallowRef({ count: 0 });
  watch(cnt2, (val) => {
    console.log("sallowRef触发了变更", val);
  });
  console.log("部分更改，观察是否发生变更");
  cnt2.value.count++;
  console.log("整体更改，观察是否触发变更");
  const temp: number = cnt2.value.count + 1;
  cnt2.value = { count: temp };
};

const button_triggerRef_click = () => {
  let cnt1 = shallowRef({ count: 0 });
  let cnt2 = shallowRef({ count: 0 });
  watchEffect(
    () => {
      console.log("watchEffect 事件：", cnt1.value.count, cnt2.value.count);
    },
    { flush: "post" }
  );
  triggerRef(cnt1);
};

const button_shallowReactive_click = async () => {
  const cnt2 = shallowReactive({
    rootNum1: 0,
    nested: {
      num2: 1,
    },
  });
  watch(cnt2, (val) => {
    console.log("shallowReactive触发了变更", val);
  });
  console.log("cnt2.rootNum1++");
  cnt2.rootNum1++;
  await nextTick();
  console.log("cnt2.nested.num2++", "非顶级属性，不会触发变更");
  cnt2.nested.num2++;
};

const button_shallowReadonly_click1 = () => {
  const state = shallowReadonly({
    rootNum: 0,
    nested: {
      num2: 1,
    },
  });
  try {
    state.rootNum++;
  } catch (err) {
    console.error("state.rootNum只读，不能修改");
  }
  state.nested.num2++;
  console.log("state.nested.num2++ 可以修改");
};

const button_toRaw_click = () => {
  const val = reactive({
    count: 10,
  });
  let val2 = toRaw(val);
  console.log("toRaw(val2)=", val2);
};

const button_markRaw_click = () => {
  const num = markRaw({});
  console.log("isReactive(reactive({}))=", isReactive(reactive({})));
  console.log(
    "isReactive(reactive(markRaw({})))=",
    isReactive(reactive(num)),
    "从结果上看 markRaw()的结果仍然是原生对象"
  );
};

const button_effectScope_click = () => {
  const val = ref(0);
  const num = computed(() => val.value + 1);
  const scope = effectScope();
  scope.run(() => {
    watch(num, () => {
      console.log("num值变更：", num);
    });
    watchEffect(() => {
      console.log("值变更", val.value, num.value);
    });
  });
  val.value++;
};
</script>

<style></style>
