import request from '@/utils/request.js'

export function getMajorNameBySchoolName(query) {
    return request({
        url: "/getMajorNameBySchoolName",
        method: "GET",
        params: query
    })
}

export function schoolSubmit( query) {
    return request({
        url: "/schoolSubmit",
        method: "POST",
        data: query
    })
}

export function deleteSchoolSubmit(query) {
    return request({
        url: "/deleteSchoolSubmit",
        method: "POST",
        data: query
    })
}

export function getSchoolSubmitById() {
    return request({
        url: "/getSchoolSubmitById",
        method: "GET",
    })
}