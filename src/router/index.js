//导入vue
import Vue from 'vue'

//导入各组件
import son from '../components/son.vue'
import xxx from '../components/xxx.vue'

//导入  vue-router
import VueRouter from 'vue-router'
//注册路由
Vue.use(VueRouter)
//路由对象实例化
const router = new VueRouter({
    routes: [{
            path: '/',
            component: son
        },
        {
            path: '/xxx',
            component: xxx
        },
        {
            //路由重定向
            path: '*',
            redirect: '/'
        }
    ]
})

//导出 router
export default router