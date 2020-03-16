//导入vue
import Vue from 'vue'

//导入login组件
import login from '../views/login/index.vue'

//导入  vue-router
import VueRouter from 'vue-router'
//注册路由
Vue.use(VueRouter)
//路由对象实例化
const router = new VueRouter({
    routes: [{
            path: '/login',
            component: login
        },
        {
            //路由重定向
            path: '*',
            redirect: '/login'
        }
    ]
})

//导出 router
export default router