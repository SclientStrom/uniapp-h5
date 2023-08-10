<template>
  <div
    v-for="(item, index) in data"
    :key="index"
    class="border-1 border-solid border-gray-300 rounded my-1"
  >
    <div class="flex justify-between items-center py-2 px-4">
      <div class="flex flex-col">
        <div>备注:{{ item.reviewRemark }}</div>
        <div class="mt-2">申请时间:{{ item.createTime }}</div>
      </div>
      <div v-if="item.status == 0" @click="openAuditPageEvent(item)">审批</div>
      <div v-if="item.status != 0">{{ getRefundDesc(item.status) }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { RefundResult } from "@/common/type";
import { getRefundDesc } from "@/http/api/Order";
import { reactive } from "vue";
withDefaults(defineProps<{ data: RefundResult[] }>(), {});

const result = reactive<{ openItem?: RefundResult; openDialog: boolean }>({
  openDialog: false,
});
const openAuditPageEvent = (item: RefundResult) => {
  result.openDialog = !result.openDialog;
  result.openItem = item;
};
</script>
<style></style>
