<template>
  <h1>&lt;script setup&gt;语法糖</h1>
  <ul>
    <li>专有名词是组合式API</li>
    <li>
      setup语法糖可以避免setup()函数里export大量状态和方法，可以极大的简化代码
    </li>
    <li>导出状态：const定义的常量都可以导出</li>
    <li>导出函数：定义的function都可以导出</li>
    <li>
      在vu2里需要专门的定义data字段，组合式api可以直接声明const常量来搞定，也不要求一定是叫state了。
    </li>
  </ul>
</template>

<script setup lang="ts"></script>

<style lang="less"></style>
