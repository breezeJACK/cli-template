import axios from "axios";
import {
    Notification
} from "element-ui";

let service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
});

service.interceptors.response.use(
    response => {
        if (response.status == 200) {
            if (response.data.success) {
                return response.data.data;
            } else {
                Notification({
                    title: "提示",
                    type: "error",
                    message: response.data.message
                });
                return response.data;
            }
        } else {
            Notification({
                title: "提示",
                type: "error",
                message: response.message
            });
            return false;
        }
    },
    error => {
        return Promise.reject(error);
    }
);


service.interceptors.request.use(
    request => {
        console.log(request)
        return request
    },

);

// 对所有请求添加token

service.interceptors.request.use(request => {
    const usrType = sessionStorage.getItem("userType");
    if (usrType) {
        request.headers["auth_token"] = usrType
    }
    return request
});

export default service;
//  form格式传参
//  'Content-Type': ' application/x-www-form-urlencoded'
// export function cfgAxiosForm() {
//     service.interceptors.request.use(request => {

//     })

//     return service
// }