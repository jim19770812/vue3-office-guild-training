<template>
  <p>
    <button @click="button_click1">T10_14_setup组件内步触发父组件的event1事件</button>
  </p>
</template>
<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

/**
 * 定义类型推导参数
 */
defineProps({
  name: {
    type: String,
    required: true,
    default: "",
  },
  age: {
    type: Number,
    required: true,
    default: 20,
  },
});
/**
 * 定义类型推导事件
 */
const emit = defineEmits<{
  (e: "event1", val: number): void;
}>();
const button_click1 = () => {
  emit("event1", 100);
};
</script>

<style></style>
