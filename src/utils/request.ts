import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import qs from 'query-string';

const pending = new Map();
/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config: AxiosRequestConfig): void => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&');
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel);
      }
    });
};

/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config: AxiosRequestConfig): void => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&');
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url);
    cancel(url);
    pending.delete(url);
  }
};

/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = (): void => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [url, cancel] of pending) {
    cancel(url);
  }
  pending.clear();
};

const service = axios.create({
  // baseURL: import.meta.env.DEV ? '/FM' : '', // proxy 需要注释
  // withCredentials: true,
  timeout: 12000
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    removePending(config); // 在请求开始前，对之前的请求做检查取消操作
    addPending(config); // 将当前请求添加到 pending 中
    // config
    return config;
  },
  (error: AxiosError) => Promise.resolve(error || '服务器异常')
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log('oooo');
    removePending(response); // 如果存在就移除未的到响应的请求
    return response.data;
  },
  (error: AxiosError) => {
    const { response } = error;
    if (response?.status) {
      // const { status, statusText } = response;
      // const errorText = codeMessage[status] || statusText;
      const errorText = '接口请求出错';
      // notification.error({
      //   message: '请求错误',
      //   description: errorText,
      // });
    } else if (!response) {
      // notification.error({
      //   message: '请求错误',
      //   description: '您的网络发生异常，无法连接服务器',
      // });
    }
    return Promise.reject(error);
  }
);

export default service;
