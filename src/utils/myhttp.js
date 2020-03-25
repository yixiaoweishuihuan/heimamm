//封装 axios 请求
import axios from 'axios'
import { getToken } from './mytoken'

//创建一个新的 axios 实例对象
const instance = axios.create({
    baseURL:process.env.VUE_APP_URL,
    withCredentials:true
})

//axios 拦截器
// 在 axios 发送请求之前
instance.interceptors.request.use(function(config){
    config.headers.token = getToken();
    return config;
},function(error){
    return Promise.reject(error);
})
// 在 axios 接收到响应之后
instance.interceptors.response.use(function(response){
    return response;
},function(error){
    return Promise.reject(error);
})

export default instance
