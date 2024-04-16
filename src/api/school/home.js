import request from '@/utils/request.js'

export function getSchoolBySchoolVariety(query) {
    return request({
        url: "/getSchoolBySchoolVariety",
        method: "GET",
        params: query
    })
}
export function getAllSchoolShow() {
    return request({
        url: "/getAllSchoolShow",
        method: "GET",
    })
}