<template>
  <p>
    <button @click="button_click1">T10_14组件内步触发父组件的event1事件</button>
  </p>
</template>
<script lang="ts">
import type { SetupContext } from "vue";
export default {
  setup(props: any, context: SetupContext) {
    const button_click1 = () => {
      context.emit("event1", 2);
    };
    return { button_click1 };
  },
};
</script>

<style></style>
