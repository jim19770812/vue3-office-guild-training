<template>
  <div class="red">{{ message }}</div>
</template>

<script lang="ts">
export default {
  setup(props, context) {
    console.log("T10_8Component:context.attrs", context.attrs);
    console.log("T10_8Component:context.slots", context.slots);
    console.log("T10_8Component:context.emit", context.emit);
    console.log("T10_8Component:context.expose", context.expose);
    const message = "来自T10_9的消息，在控制台会输出上下文的属性";
    return { message };
  },
};
</script>

<style></style>
