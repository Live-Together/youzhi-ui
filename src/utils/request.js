import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const service = axios.create({
    baseURL: "/api"
})

//请求拦截器
service.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    if(token){
        config.headers["token"] = token
    }
    return config
})
export default service;