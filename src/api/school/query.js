import request from '@/utils/request.js'

export function deleteSchoolInfo(id) {
    return request({
        url: '/' + id,
        method: 'DELETE'
    })
}

export function addSchoolInfo(query) {
    return request({
        url: "/",
        method: "PUT",
        data: query
    })
}

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