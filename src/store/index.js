//使用 vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    //管理状态
    state: {
        userName: "", //用户详细信息
        userIcon: "", //用户头像
    },
    //修改state
    mutations: {
        //改变用户信息
        setUserInfo(state, useInfo) {
            state.userName = useInfo.username;
            state.userIcon = process.env.VUE_APP_URL + "/" + useInfo.avatar;
        }
    },
})

//暴露对象
export default store