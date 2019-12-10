import request from '@/utils/request'

export function fetchUserInfo(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}