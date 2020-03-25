//封装关于 企业 的所有api
import instance from '../utils/myhttp.js'

//企业列表
export function apiEnterList({name,page,limit,eid,username,status}){
    return instance({
        url:'/enterprise/list',
        params:{
            name:name,
            page:page,
            limit:limit,
            eid:eid,
            username:username,
            status:status
        }
    })
}

//企业添加
export function apiEnterAdd({eid,name,short_name,intro,remark}){
    return instance({
        url:'/enterprise/add',
        method:"post",
        data:{
            eid:eid,
            name:name,
            short_name:short_name,
            intro:intro,
            remark:remark
        }
    })
}

//企业状态设置
export function apiEnterStatus(id){
    return instance({
        url:'/enterprise/status',
        method:"post",
        data:{
            id:id
        }
    })
}

//企业删除
export function apiEnterDelate(id){
    return instance({
        url:'/enterprise/remove',
        method:"post",
        data:{
            id:id
        }
    })
}

//企业编辑接口
export function apiEnterEdit({id,name,tag,short_name,intro,remark,eid}){
    return instance({
        url:'/enterprise/edit',
        method:"post",
        data:{
            id:id,
            name:name,
            tag:tag,
            short_name:short_name,
            intro:intro,
            remark:remark,
            eid:eid
        }
    })
}