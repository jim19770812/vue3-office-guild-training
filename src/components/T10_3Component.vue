<template>
  <div class="red">{{ message }}</div>
</template>

<script setup lang="ts">
import { inject } from "vue";
const message = inject("t10_3_message");
</script>

<style lang="less"></style>
