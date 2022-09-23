<template>
  <div>{{ a }}</div>
</template>

<script lang="ts">
export default {
  data(): any {
    return { a: 1, b: this.$data.a * 2 }; //不灵，this.$data.a区不到值
  },
  created() {
    console.log("T10_12组件.data.a的值=", this.a); // 1
    console.log("T10_12组件.$data=", JSON.stringify(this.$data)); // { a: 1 }
  },
};
</script>

<style></style>
