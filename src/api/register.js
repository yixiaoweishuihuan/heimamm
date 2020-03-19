//封装 注册方法
//导入axios
import axios from 'axios'

//创建一个新的 axios 对象 并创建一个基地址
var instance = axios.create({
    baseURL:process.env.VUE_APP_URL
})

//获取短信验证码的方法 apiGetCode()
export function apiGetCode({
    code,
    phone
}) {
    return instance({
        url: "/sendsms",
        method: "post",
        data: {
            code,
            phone,
        },
        //跨域时携带cookie
        withCredentials: true
    })
}

//提交注册信息的方法 submit()
export function submit({
    username,
    phone,
    email,
    avatar,
    password,
    rcode
}) {
    return instance({
        url: "/register",
        method: 'post',
        data: {
            username,
            phone,
            email,
            avatar,
            password,
            rcode
        }
    })
}