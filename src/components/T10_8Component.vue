<template>
  <div class="red">{{ message }}</div>
</template>

<script lang="ts">
export default {
  setup(props, { expose }) {
    /**
     * 让组件处于关闭状态，不向父组件暴露数据
     */
    // expose();
    const message = "T10_8Component内部的消息";
    expose({ message });
    return { message };
  },
};
</script>

<style lang="less"></style>
