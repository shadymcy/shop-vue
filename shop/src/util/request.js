import {post,get,put,del} from './service'

export const loginApi = data =>{
    return post({
        url:'/login',
        data
    })
}
// 获取用户列表
export const userListApi = data =>{
    return get({
        url:'/users',
        data
    })
}

// 新增用户
export const userAddApi = data =>{
    return post({
        url:'/users',
        data
    })
}

// put请求
// 用户列表更改状态
export const userChangeStateApi = data =>{
    return put({
        url:`users/${data.id}/state/${data.mg_state}`,
        data
    })
}
// 更改用户信息
export const userChangeInfoApi = data =>{
    return put({
        url:`users/${data.id}`,
        data
    })
}

// 删除用户
export const userDeleteApi = data =>{
    return del({
        url:`users/${data.id}`
    })
}

// 获取角色
export const getRolesApi = data =>{
    return get({
        url:'/roles',
        data
    })
}

// 新建角色
export const addRolesApi = data =>{
    return post({
        url:'/roles',
        data
    })
}
// 编辑角色
export const editRolesApi = data =>{
    return put({
        url:`roles/${data.id}`,
        data
    })
}
// 删除角色
export const delRolesApi = data =>{
    return del({
        url:`roles/${data.id}`,
    })
}

// 获取商品
export const goodsListApi = data =>{
    return get({
        url:'/goods',
        data
    })
}