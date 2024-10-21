import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'


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
				// component: () => import('@/views/test.vue')
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
				path: '/ConsultOnilne',
				component: () => import('@/components/ConsultOnilne')
			}
		]
	},

]

const router = new Router({
	mode: 'history', // 去掉url中的#
	scrollBehavior: () => ({
		y: 0
	}),
	routes: routes
})

router.beforeEach((to, from, next) => {
	if (to.path == '/login' || to.path == '/') {
		next()
	} else {
		let token = localStorage.getItem("token")
		if(token == null || token == '') {
			token = Cookies.get("token")
			if(token == null || token == '' || token == undefined) {
				alert("无权限，请登录")
				next("/login")
			} else {
				localStorage.setItem("token", token)
			}
		}
		next()
	}
})

export default router