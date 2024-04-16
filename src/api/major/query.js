import request from '@/utils/request.js'

export function getSchoolInfoCount(query) {
    return request({
        url: "/getSchoolInfoCount",
        method: "POST",
        data: query
    })
}
export function getSchoolInfoByMajorName(query) {
    return request({
        url: "/getSchoolInfoByMajorName",
        method: "GET",
        params: query
    })
}