<template>
  <div class="red">{{ message }}</div>
</template>

<script lang="ts">
export default {
  setup() {
    const message = "基本使用的例子，来自组件T10_6组件";
    return { message };
  },
  mounted() {
    console.log("T10_6组件mounted");
  },
};
</script>

<style style="less"></style>
