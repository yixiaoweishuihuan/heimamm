//封装操作用户的方法
//导入 自己的axios文件啊
import instance from '../utils/myhttp'

//获取用户信息列表
export function apiUserList({
    username,
    email,
    role_id,
    page,
    limit
}) {
    return instance({
        url: '/user/list',
        params: {
            username,
            email,
            role_id,
            page,
            limit
        }
    })
}

//创建用户
export function apiAddUser({
    username,
    email,
    phone,
    role_id,
    status,
    remark
}) {
    return instance({
        url: '/user/add',
        method: 'post',
        data: {
            username,
            email,
            phone,
            role_id,
            status,
            remark
        }
    })
}

//修改用户状态
export function apiChangeStatus(id) {
    return instance({
        url: '/user/status',
        method: 'post',
        data: {
            id
        }
    })
}

//编辑用户信息
export function apiEditUser({
    id,
    username,
    email,
    phone,
    avatior,
    password,
    role_id,
    status,
    remark
}) {
    return instance({
        url: '/user/edit',
        method: 'post',
        data: {
            id,
            username,
            email,
            phone,
            avatior,
            password,
            role_id,
            status,
            remark
        }
    })
}

//用户删除
export function apiDelUser(id) {
    return instance({
        url: '/user/remove',
        method: 'post',
        data: {
            id
        }
    })
}
