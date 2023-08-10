export const navTo = (url: string, prefix = "/pages/") => {
  uni.redirectTo({ url: prefix + url });
};
