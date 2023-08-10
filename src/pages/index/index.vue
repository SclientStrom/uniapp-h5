<template>
  <div class="content">
    <image class="logo absolute top-1/5" src="/static/logo.png" />
    <div class="w-4/7 absolute top-3/7">
      <input
        placeholder="手机号"
        v-model="data.param.account"
        class="border-solid border-1 border-gray-400 px-3 py-2 rounded-sm"
      />
      <div class="flex flex-row justify-between items-center mt-6">
        <input
          placeholder="验证码"
          v-model="data.param.captchaCode"
          class="border-solid basis-1/2 border-1 border-gray-400 px-3 py-2 rounded-sm"
        />
        <div class="basis-1/2 flex justify-end">
          <div
            class="w-5/6 btn"
            :class="data.send ? 'bg-gray-500' : 'bg-black'"
            @click="sendCaptcha(data)"
          >
            {{ data.text }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="btn w-4/7 absolute bottom-1/5"
      @click="login(data.param)"
      :class="
        data.param.account && data.param.captchaCode
          ? 'pointer-events-auto bg-black'
          : 'pointer-events-none bg-gray-500'
      "
    >
      登陆
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { login, sendCaptcha } from "@/http/api/Login";
import type { LoginPageData } from "@/common/type";
import { onShow, onLaunch } from "@dcloudio/uni-app";
import { useAppStore } from "@/stores/app";
import { navTo } from "@/router";
const data = reactive<LoginPageData>({
  text: "发送",
  send: false,
  seconds: 60,
  timeId: 0,
  param: {
    account: "",
    captchaCode: "",
    code: "",
  },
});

onShow(() => {
  const accessToken = useAppStore().accessToken;
  accessToken && navTo("order/index");
});
</script>

<style scoped>
.btn {
  @apply border-1 border-gray-400 rounded border-solid py-2 flex justify-center  text-white;
}
.content {
  @apply flex flex-col items-center justify-center;
}

.logo {
  @apply h-120px w-120px;
}
</style>
