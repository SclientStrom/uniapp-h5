<template>
  <Header v-model:type="type" />
  <Result :type="type" />
</template>
<script lang="ts" setup>
import Header from "@/components/order/Header.vue";
import { navTo } from "@/router";
import { useAppStore } from "@/stores/app";
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import Result from "@/components/order/Result.vue";
const type = ref<string>("");
onShow(() => {
  const accessToken = useAppStore().accessToken;
  !accessToken && navTo("index/index");
  type.value = "order";
});
</script>
<style></style>
