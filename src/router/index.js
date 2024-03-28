import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 路由
export const routes = [
	{
		path: '/',
		component: () => import('@/views/login')
	},
	{
		path: '/login',
		component: () => import('@/views/login')
	},
	{
		path: '/index',
		component: () => import('@/views/index'),
		children: [
			{
				path: '/SchoolQuery',
				component: () => import('@/components/SchoolQuery')
			},
			{
				path: '/Home',
				component: () => import('@/components/Home')
			},
			{
				path: '/MajorQuery',
				component: () => import('@/components/MajorQuery')
			},
			{
				path: '/PersonInfo',
				component: () => import('@/components/PersonInfo'),
				children: [
					{
						path: '/',
						component: () => import('@/components/PersonModify')
					},
					{
						path: '/PersonPassword',
						component: () => import('@/components/PersonPassword')
					},
				]
			},
			{
				path: '/SchoolPush',
				component: () => import('@/components/SchoolPush')
			},
			{
				path: '/SchoolApply',
				component: () => import('@/components/SchoolApply')
			},
			{
				path: '/testAxios',
				component: () => import('@/views/testUpload')
			}
		]
	},
	
]

export default new Router({
	mode: 'history', // 去掉url中的#
	scrollBehavior: () => ({
		y: 0
	}),
	routes: routes
})