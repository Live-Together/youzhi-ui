import request from '@/utils/request.js'

export function getSchoolInfoCount(query) {
    return request({
        url: "/getSchoolInfoCount",
        method: "POST",
        data: query
    })
}

export function getSchoolInfoBySchoolName(query) {
    return request({
        url: "/getSchoolInfoBySchoolName",
        method: "GET",
        params: query
    })
}

export function getSchoolInfo(query) {
    return request({
        url: "/getSchoolInfo",
        method: "GET",
        params: query
    })
}