import { http } from "@/http/config/axios";
import { validPhone } from "@/common";
import type { LoginPageData, LoginReq } from "@/common/type";
import { boxAlert } from "@/common/message";
import { useAppStore } from "@/stores/app";
import { loginUrl, getCaptchaUrl } from "@/http/api/Url";
import { navTo } from "@/router";
export const login = (param: LoginReq) => {
  if (!validPhone(param.account)) {
    boxAlert("请输入正确的手机号码");
  } else if (param.captchaCode.length != 4) {
    boxAlert("验证码错误");
  } else {
    http.post(loginUrl, param).then((res) => {
      navTo("order/index");
      useAppStore().setToken(res.data.accessToken, res.data.refreshToken);
    });
  }
};

export const sendCaptcha = (data: LoginPageData) => {
  if (data.text.indexOf("发送") == -1) {
    return;
  }
  if (!validPhone(data.param.account)) {
    boxAlert("请输入正确的手机号码");
  } else {
    data.send = true;
    http
      .post(getCaptchaUrl, { phone: data.param.account })
      .then((res) => {
        data.param.code = res.data.code;
        data.text = data.seconds + "秒";
        const timeId = setInterval(() => {
          data.seconds = data.seconds - 1;
          if (data.seconds == 0) {
            data.seconds = 60;
            data.send = false;
            data.text = "重新发送";
            clearInterval(data.timeId);
          } else {
            data.text = data.seconds + "秒";
          }
        }, 1000);
        data.timeId = timeId;
      })
      .catch(() => (data.send = false));
  }
};
