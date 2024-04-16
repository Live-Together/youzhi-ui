import request from '@/utils/request.js'

export function login(query) {
    return request({
        url: "/login",
        method: "POST",
        data: query
    })
}