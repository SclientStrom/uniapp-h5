<template>
  <div class="flex items-center h-6em mx-5vw">
    <div class="flex-1 flex justify-center" @click="updateType('order')">订单</div>
    <div class="flex-1 flex justify-center" @click="updateType('refund')">退款</div>
  </div>
</template>
<script lang="ts" setup>
const emits = defineEmits(["update:type"]);

const updateType = (type: string) => {
  emits("update:type", type);
};
</script>
<style></style>
