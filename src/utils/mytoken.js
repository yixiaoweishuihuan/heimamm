//封装 关于操作 token 的方法

//定义一个 token 的 键
const key = "heimamm";
//新增 token 的方法 setTaken
export function setTaken(value){
    window.localStorage.setItem(key,value);
}

//查询 token 的方法 getToken
export function getToken(){
    return window.localStorage.getItem(key);
}

//删除 token 的方法 removeToken
export function removeToken(){
    window.localStorage.removeItem(key);
}
