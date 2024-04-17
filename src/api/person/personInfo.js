import request from '@/utils/request.js'

export function getStudentInfo() {
    return request({
        url: "/getStudentInfo",
        method: "GET",
    })
}
export function updatePwd(query) {
    return request({
        url: "/updatePwd",
        method: "POST",
        data: query
    })
}
export function updateInfo(query) {
    return request({
        url: "/updateInfo",
        method: "POST",
        data: query
    })
}