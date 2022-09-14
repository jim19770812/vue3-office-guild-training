<template>
  <div class="grey">{{ message }}</div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from "vue";

defineProps({
  message: {
    require: true,
    type: String,
  },
});
onMounted(() => {
  console.log("组件1:onMounted");
});
</script>

<style lang="less">
.grey {
  color: grey;
}
</style>
