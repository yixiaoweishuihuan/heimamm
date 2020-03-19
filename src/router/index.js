//导入vue
import Vue from 'vue'

//导入login组件
import login from '../views/login/index.vue'
//导入 regidter 组件
import register from '../views/login/components/register.vue'

//导入  vue-router
import VueRouter from 'vue-router'
//注册路由
Vue.use(VueRouter)
//路由对象实例化
const router = new VueRouter({
    routes: [{
            //登录页面
            path: '/login',
            component: login
        },
        {
            //注册页面
            path: '/register',
            component: register
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