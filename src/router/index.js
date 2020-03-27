//导入vue
import Vue from 'vue'

//导入login组件
import login from '../views/login/index.vue'
//导入 regidter 组件
import register from '../views/login/components/register.vue'
//导入 index 组件
import index from '../views/index/index.vue'

//导入 childrenRouter 子路由
import children from './childrenRouter'

//导入 NProgress 进度条
import NProgress from 'nprogress'
import "nprogress/nprogress.css"

//导入 token 操作方法
import {
    getToken
} from '../utils/mytoken'
//导入 getUserInfo（）
import {
    getUserInfo
} from '../api/index'

// 导入 element 的 message
import {
    Message
} from 'element-ui'

//导入  vue-router
import VueRouter from 'vue-router'
//注册路由
Vue.use(VueRouter)
//路由对象实例化
const router = new VueRouter({
    routes: [{
            //登录页面
            path: '/login',
            component: login,
            meta: {
                roles: ['超级管理员', '管理员', '学生', '老师'],
                fullPath: '/login'
            }
        },
        {
            //注册页面
            path: '/register',
            component: register,
            meta: {
                roles: ['超级管理员', '管理员', '学生', '老师'],
                fullPath: '/register'
            }
        },
        {
            //主页
            path: '/index',
            component: index,
            meta: {
                roles: ['超级管理员', '管理员', '学生', '老师'],
                fullPath: '/index'
            },
            children:children
        },
        {
            //路由重定向
            path: '*',
            redirect: '/login'
        }
    ]
})

//导入 store
import store from '../store/index'

//全局前置守卫
router.beforeEach((to, from, next) => {
    //得到 title 属性
    const title = to.meta.title;
    if (title) {
        document.title = title;
    }
    // 开启进度条
    NProgress.start();

    if (to.path !== "/login") {
        //判断token是否存在
        if (!getToken()) {
            //没有token 未登录
            Message.error("您还没有登录！");
            //关闭进度条
            NProgress.done();
            //跳转到登录页
            next("/login");
        } else {
            //有token
            getUserInfo().then(res => {
                if (res.data.data.status == 0) {
                    //关闭导航
                    NProgress.done();
                    Message.error("您的账号已被禁用，请联系管理员！");
                } else {
                    if (res.data.code == 200) {
                        //token为真
                        //调用 getInfo 方法 为用户信息赋值
                        store.commit("setUserInfo", res.data.data);
                        store.commit("setRoles", res.data.data.role);
                        if (to.meta.roles.includes(res.data.data.role)) {
                            //有权限
                            next();
                        } else {
                            //没有权限
                            Message.error("对不起，您没有权限访问!");
                            //关闭导航
                            NProgress.done();
                        }
                    } else if (res.data.code == 206) {
                        //假的token
                        Message.error("token错误！");
                        //关闭进度条
                        NProgress.done();
                        //跳转到登录页
                        next("/login");
                    }
                }
            })
        }

    } else {
        //执行后续代码
        next();
    }
})

//   全局后置钩子
router.afterEach(() => {
    // 关闭进度条
    NProgress.done();
})

//导出 router
export default router