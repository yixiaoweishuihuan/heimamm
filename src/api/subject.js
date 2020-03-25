//封装 关于学科列表 的所有接口
import instance from '../utils/myhttp'
//发送请求 获取学科列表
export function getSubject({name,page,limit,rid,username,status}){
    return instance({
        url:'/subject/list',
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

//添加学科
export function addSubject({rid,name,short_name,intro,remark}){
    return instance({
        url:"/subject/add",
        method:"post",
        data:{
            rid,name,short_name,intro,remark
        }
    })
}

//修改学科
export function editSubject({id,rid,name,short_name,intro,remark}){
    return instance({
        url:"/subject/edit",
        method:"post",
        data:{id,rid,name,short_name,intro,remark}
    })
}

//删除学科
export function delateSubject(id){
    return instance({
        url:"/subject/remove",
        method:"post",
        data:{id:id}
    })
}