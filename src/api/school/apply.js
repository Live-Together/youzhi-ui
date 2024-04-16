import request from '@/utils/request.js'

export function getMajorNameBySchoolName(query) {
    return request({
        url: "/getMajorNameBySchoolName",
        method: "GET",
        params: query
    })
}

export function schoolSubmit(id, query) {
    return request({
        url: "/" + id + "/schoolSubmit",
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

export function getSchoolSubmitById(id) {
    return request({
        url: "/" + id + "/getSchoolSubmitById",
        method: "GET",
    })
}