//封装 关于学科列表 的所有接口
import axios from 'axios'
import { getToken } from '../utils/mytoken'

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

//发送请求 获取学科列表
export function getSubject({name,page,limit,rid,username,status}){
    return instance({
        url:'/subject/list',
        // headers:{
        //     token:getToken()
        // },
        params:{
            name,
            page,
            limit,
            rid,
            username,
            status
        }
    })
}

//发送请求 修改状态
export function changeStatus(id){
    return instance({
        url:'/subject/status',
        method:"post",
        data:{
            id:id
        }
    })
}