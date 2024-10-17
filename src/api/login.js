import request from '@/utils/request.js'

export function signin(query) {
    return request({
        url: "/user/signin",
        method: "POST",
        data: query
    })
}

export function login(query) {
    return request({
        url: "/login",
        method: "POST",
        data: query
    })
}

export function logout() {
    return request({
        url: "/logout",
        method: "GET"
    })
}