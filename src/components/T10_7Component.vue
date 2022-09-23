<template>
  <div class="red">{{ message }}</div>
</template>

<script lang="ts">
export default {
  setup(props) {
    console.log("setup()打印外部传入的参数:", props.message);
  },
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
