import request from '@/utils/request.js'

export function getSchoolByScore(query) {
    return request({
        url: "/getSchoolByScore",
        method: "GET",
        params: query
    })
}