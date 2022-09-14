<template>
  <div class="red">组件1:这是一个全局组件</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
onMounted(() => {
  console.log("组件1:onMounted");
});
</script>

<style lang="less">
.red {
  color: red;
}
</style>
