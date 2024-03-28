<template>
  <div>
    <el-button @click="testAxios1">发送get请求</el-button>
    <el-button @click="testAxios2">发送get请求</el-button>
    <el-button @click="testAxios3">发送get请求</el-button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    methods: {
        testAxios1(){
			const service = axios.create({
				baseURL: '/api',
			})
			service.interceptors.request.use(config => {
				console.log("浅浅拦截一下。。。")
				console.log(config)
				null.toString();
			}, error => {
				console.log("出错啦！！！")
				console.log(error)
			})
            service("/getSchoolInfoBySchoolName").then(() => {
				console.log(1)
			})
        },
		testAxios2(){
			axios.create({
				baseURL: '/api'
			})
			axios("/getSchoolInfoBySchoolName").then(() => {
				console.log(2)
			})
		},
		testAxios3(){
			axios("/api/getSchoolInfoBySchoolName").then(() => {
				console.log(3)
			})
		}
    }
}
</script>

<style>

</style>