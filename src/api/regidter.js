//封装一个 获取短信验证码的方法 apiGetCode()
//导入axios
import axios from 'axios'
//获取短信验证码的方法 apiGetCode()
function apiGetCode({
    code,
    phone
}) {
    return axios({
        url: process.env.VUE_APP_ONLINEURL + "/sendsms",
        method: "post",
        data: {
            code: code,
            phone: phone
        },
        //跨域时携带cookie
        withCredentials: true
    })
}

//将 apiGetCode() 方法暴露出去
export default apiGetCode