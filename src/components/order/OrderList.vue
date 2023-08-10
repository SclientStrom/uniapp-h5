<template>
  <div
    v-for="(item, index) in data"
    :key="index"
    class="border-1 border-solid border-gray-300 rounded my-1"
  >
    <div class="flex justify-between items-center py-2 px-6">
      <div class="flex flex-col">
        <div>商品名称:{{ item.goodsName }}</div>
        <div class="mt-2">创建时间:{{ item.createTime }}</div>
      </div>
      <div>{{ getOrderStatusDesc(item.status) }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { OrderResult } from "@/common/type";
import { getOrderStatusDesc } from "@/http/api/Order";
withDefaults(defineProps<{ data: OrderResult[] }>(), {});
</script>
<style></style>
