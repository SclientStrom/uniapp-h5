import { uniStorage } from "@/stores";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({ accessToken: "", refreshToken: "" }),
  actions: {
    updateToken(s: string) {
      this.accessToken = s;
    },
    clear() {
      this.accessToken = "";
      this.refreshToken = "";
    },
    setToken(s: string, r: string) {
      this.accessToken = s;
      this.refreshToken = r;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: uniStorage,
        paths: ["accessToken", "refreshToken"],
      },
    ],
  },
});
