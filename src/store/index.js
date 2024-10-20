// 导入 vue
import Vue from 'vue'
// 导入 vuex
import Vuex from 'vuex'
// vuex也是vue的插件 需要use一下, 进行插件的安装初始化
Vue.use(Vuex)

// 创建仓库 store
const store = new Vuex.Store({
    state: {
        id: "",
        pageIndex: 1,
        name: "zhangsan",
        schoolList: [],
        token: null
    },
    mutations: {
        changePageIndex(state, pageIndex){
            state.pageIndex = pageIndex
        },
        changeSchoolList(state, schoolList){
            state.schoolList = schoolList
        },
        setToken(state, token){
            if(token == null) {
                localStorage.setItem("token", token)
            } else {
                localStorage.removeItem("token")
            }
            state.token = token
        },
        setId(state, id) {
            if(id)
                state.id = id
        },
    }
})


// 导出仓库
export default store