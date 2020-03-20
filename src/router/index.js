//导入vue
import Vue from 'vue'

//导入login组件
import login from '../views/login/index.vue'
//导入 regidter 组件
import register from '../views/login/components/register.vue'
//导入 index 组件
import index from '../views/index/index.vue'

//导入 chart 组件
import chart from '../views/index/components/chart.vue'
//导入 user 组件
import user from '../views/index/components/user.vue'
//导入 question 组件
import question from '../views/index/components/question.vue'
//导入 enterprise 组件
import enterprise from '../views/index/components/enterprise.vue'
//导入 subject 组件
import subject from '../views/index/components/subject.vue'

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
            //主页
            path:'/index',
            component:index,
            children:[
                {path:"chart",component:chart},
                {path:"user",component:user},
                {path:"question",component:question},
                {path:"enterprise",component:enterprise},
                {path:"subject",component:subject},
            ]
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