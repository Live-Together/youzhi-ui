import request from '@/utils/request.js'

export function getStudentInfo(id) {
    return request({
        url: "/" + id,
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