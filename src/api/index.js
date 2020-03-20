//封装 主页 获取用户信息 和 退出登录接口
//导入 axios
import axios from 'axios'

//创建一个新的 axios 实例对象
const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})

//获取用户信息
export function getUserInfo(token) {
    return instance({
        url: '/info',
        headers: {
            token
        }
    })
}

//退出登录
export function exitLogin(token) {
    return instance({
        url: '/logout',
        headers: {
            token
        }
    })
}