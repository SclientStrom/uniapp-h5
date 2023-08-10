<template>
  <div class="mx-5vw">
    <OrderList v-if="type == 'order'" :data="order.list" />
    <RefundList v-if="type == 'refund'" :data="refund.list" />
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import type { OrderPageType, RefundPageType } from "@/common/type";
import { initList } from "@/http/api/Order";
import OrderList from "@/components/order/OrderList.vue";
import RefundList from "@/components/order/refund/RefundList.vue";
import { onShow } from "@dcloudio/uni-app";
const props = withDefaults(defineProps<{ type: string }>(), {
  type: "",
});
const order: OrderPageType = reactive({
  list: [],
  initData: false,
  page: {
    pageNum: 1,
    pageSize: 20,
  },
});
const refund: RefundPageType = reactive({
  list: [],
  initData: false,
  page: {
    pageNum: 1,
    pageSize: 20,
  },
});

const type = computed(() => props.type);
watch(type, (newType) => {
  initList(newType, refund, order);
});
onShow(() => {
  initList(props.type, refund, order);
});
</script>
<style></style>
