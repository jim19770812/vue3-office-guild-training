<template>
  <h1>错误处理</h1>
  错误处理是一个全局的事件，专门用于处理全局的错误，具体用法是通过
  <pre>
  app.config.errorHandler=(err)=>{
    //错误处理逻辑
  }
  </pre>
  <button @click="throwNewException1">主动触发一个未捕获的异常</button>
</template>

<script setup lang="ts">
const throwNewException1 = () => {
  //   const val1: number = 100;
  //   const val2: number = 0;
  //   let val3 = val1 / val2;
  throw new Error("故意抛出的异常");
};
</script>

<style lang="less"></style>
