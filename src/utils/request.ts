import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosRequestHeaders } from 'axios';
import qs from 'query-string';
import { notification } from 'antd';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from '@/constants/emun';

const pending = new Map();

const TOKEN = Cookies.get(TOKEN_KEY);
if (!TOKEN) {
  location.href = '/#/login';
}
console.log('TOKEN', TOKEN);

const errorMessage: any = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
  401: '用户没有权限（令牌、用户名、密码错误）',
  403: '用户得到授权，但是访问是被禁止的',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  405: '请求方法不被允许',
  406: '请求的格式不可得',
  410: '请求的资源被永久删除，且不会再得到的',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
};
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
    console.log(TOKEN);
    removePending(config); // 在请求开始前，对之前的请求做检查取消操作
    addPending(config); // 将当前请求添加到 pending 中
    // config
    config.headers = {
      Authorization: `Bearer ${TOKEN}`
    };
    return config;
  },
  (error: AxiosError) => Promise.resolve(error || '服务器异常')
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    removePending(response); // 如果存在就移除未的到响应的请求
    return response.data;
  },
  (error: AxiosError) => {
    const { response } = error;
    if (response?.status) {
      const { status, statusText } = response;
      const errorText = errorMessage[status] || statusText;
      notification.error({
        message: '请求错误',
        description: errorText
      });
    } else if (!response) {
      notification.error({
        message: '请求错误',
        description: '您的网络发生异常，无法连接服务器'
      });
    }
    return Promise.reject(error);
  }
);

export default service;
