//封装关于 题目的所有接口
//导入自己定义的axios文件
import instance from '../utils/myhttp'

//新增题目
export function apiAddQue({
    title,
    subject,
    step,
    enterprise,
    city,
    type,
    difficulty,
    single_select_answer,
    multiple_select_answer,
    short_answer,
    video,
    answer_analyze,
    remark,
    select_options
}) {
    return instance({
        url: "/question/add",
        method: "post",
        data: {
            title,
            subject,
            step,
            enterprise,
            city,
            type,
            difficulty,
            single_select_answer,
            multiple_select_answer,
            short_answer,
            video,
            answer_analyze,
            remark,
            select_options
        }
    })
}

//获取题目信息
export function apiGetQuseInfo(id) {
    return instance({
        url: "/question/one",
        method: "post",
        data: {
            id
        }
    })
}
//设置题目状态
export function apiSetStatus(id) {
    return instance({
        url: "/question/status",
        method: "post",
        data: {
            id
        }
    })
}
//删除题目
export function apiDelQues(id) {
    return instance({
        url: "/question/remove",
        method: "post",
        data: {
            id
        }
    })
}
//编辑题目
export function apiEditQues({
    id,
    title,
    subject,
    step,
    enterprise,
    city,
    type,
    difficulty,
    single_select_answer,
    multiple_select_answer,
    short_answer,
    video,
    answer_analyze,
    remark,
    select_options
}) {
    return instance({
        url: "/question/edit",
        method: "post",
        data: {
            id,
            title,
            subject,
            step,
            enterprise,
            city,
            type,
            difficulty,
            single_select_answer,
            multiple_select_answer,
            short_answer,
            video,
            answer_analyze,
            remark,
            select_options
        }
    })
}
//题目列表
export function apiGetQuseList({
    title,
    subject,
    enterprise,
    type,
    step,
    username,
    status,
    difficulty,
    create_date,
    page,
    limit
}) {
    return instance({
        url: "/question/list",
        params: {
            title,
            subject,
            enterprise,
            type,
            step,
            username,
            status,
            difficulty,
            create_date,
            page,
            limit
        }
    })
}
//上传文件
export function apiUpload(file) {
    return instance({
        url:"/question/upload",
        method:"post",
        data:{
            file
        }
    })
}