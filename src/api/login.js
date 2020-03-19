//login 登录页面 接口封装
//导入 axios
import axios from 'axios';

// 创建一个新的axios对象 并设置基地址
var instance = axios.create({
    baseURL:process.env.VUE_APP_URL
})

//登录的 login 方法
export function apiLogin(phone,password,code){
    return instance({
        url:"/login",
        method:"post",
        data:{
            phone,
            password,
            code
        }
    })
}