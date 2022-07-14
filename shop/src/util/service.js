import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import store from '../store/index.js'
let loading = null
// 使用create创建axios实例
const Service = axios.create({
    timeout:5000,
    baseURL:"http://127.0.0.1:8888/api/private/v1/",
    headers:{
        'Content-type':'application/json;charset=utf-8',
        'Authorization':store.state.uInfo.userInfo.token 
    }
})
// 请求拦截(对请求做统一处理)
Service.interceptors.request.use(config=>{
    loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    return config
})
// 响应拦截(对返回值做统一处理)
Service.interceptors.response.use(response=>{
    loading.close()
    const data = response.data

    if(data.meta.status!=200 && data.meta.status!=201){
        ElMessage({
            showClose: true,
            message: data.meta.msg||"服务器错误",
            type: 'error',
          })
        // 请求出错
        return data
    }
    return data
},err=>{
    loading.close()
    ElMessage({
        message:'服务器错误',
        type:'error',
        duration:2000
    })
})
// post请求
export const post = config=>{
    return Service({
        ...config,
        method:'post',
        data:config.data
    })
}
// get请求
export const get = config=>{
    return Service({
        ...config,
        method:'get',
        params:config.data
    })
}

// put请求
export const put=config=>{
    return Service({
        ...config,
        method:"put",
        data:config.data
    })
}

// delete请求
// delete为关键字 使用del
export const del=config=>{
    return Service({
        ...config,
        method:"delete"
    })
}