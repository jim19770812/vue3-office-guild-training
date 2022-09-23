<template>
  <div>{{ a }}</div>
</template>

<script lang="ts">
export default {
  /**
   * 箭头函数无法使用 this.$data,文档上说可以通过data(vm)入参vm来访问，但经过验证，不灵
   * @param vm 参数来访问
   */
  data: (vm) => ({ a: 2, b: vm.a * 2 }), //不灵，vm.a区不到值
  created() {
    console.log("T10_12组件.data.a的值=", this.$data.a);
    console.log("T10_12组件.$data=", JSON.stringify(this.$data));
  },
};
</script>

<style></style>
