// index.ts
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { useAppStore } from "@/stores/app";
import { boxAlert } from "@/common/message";
import { navTo } from "@/router";
import { refreshTokenUrl } from "@/http/api/Url";
const service: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 30000,
});
export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config);
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config);
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config);
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config);
  },
};

service.interceptors.request.use(
  (config) => {
    const token = useAppStore().accessToken;
    if (token) {
      const Authorization = "Bearer " + token;
      config.headers.Authorization = Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const toastWrap = (err: Error) => {
  console.log("err", err);
  let { message } = err;
  if (message == "Network Error") {
    message = "后端接口连接异常";
  } else if (message.includes("timeout")) {
    message = "系统接口请求超时";
  } else if (message.includes("Request failed with status code")) {
    message = "系统接口" + message.substring(message.length - 3) + "异常";
  }
  boxAlert(message);
  return Promise.reject(err);
};

const rejectData = [
  {
    code: "102004",
    msg: "不合法的用户",
    tips: "登陆异常,请重新登陆",
  },
  {
    code: "102003",
    msg: "登陆无效",
    tips: "登陆异常,请重新登陆",
  },
  {
    code: "102002",
    msg: "登陆过期",
    tips: "登陆过期,请重新登陆",
  },
];
service.interceptors.response.use(
  (res) => {
    const code = res.status || 200;
    if (code === 200 && res.data.success) return res.data;
    else {
      const rejectObject = rejectData.find((reject) => reject.code == res.data.code);
      if (code === 200 && rejectObject) {
        return retryByRefreshToken(res.config);
      } else {
        boxAlert(res.data.msg);
        return Promise.reject({ message: res.data.msg });
      }
    }
  },
  (error) => toastWrap(error)
);
const retryByRefreshToken = async (config: AxiosRequestConfig) => {
  const refreshToken = useAppStore().refreshToken;
  if (refreshToken) {
    const refreshData = await http
      .post(refreshTokenUrl, { refreshToken })
      .then((res) => {
        useAppStore().setToken(res?.data?.accessToken, res?.data?.refreshToken);
        return res;
      })
      .catch(() => useAppStore().clear());
    if (refreshData && refreshData.success) {
      return http.post(config.url as string, config.data, config).catch();
    } else {
      navTo("index/index");
      return refreshData;
    }
  }
};
