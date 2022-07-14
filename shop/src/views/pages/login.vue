<template>
  <div class="login_wrap">
    <div class="form_wrap">
        <el-form
        ref="formRef"
        :model="loginData"
        label-width="120px"
        class="demo-dynamic"
  >     
        <el-form-item
          prop="username"
          label="用户名"
          :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="loginData.username" />
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          :rules="[
            {
              required: true,
              message: '此项为必填项',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="loginData.password" type="password"/>
        </el-form-item>
        </el-form>
        <el-row>
        <el-button type="primary" class="button_wrap" @click='handleLogin'>登录</el-button>
        <el-button type="primary" class="button_wrap">注册</el-button>
        </el-row>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {loginApi} from '../../util/request'
export default {
    name:'login',
    setup(){
        let store = useStore()
        let router = useRouter()
        let data = reactive({
            loginData:{
                username:'',
                password:''
            }
        })
        const handleLogin = ()=>{
          // 请求后台接口
          loginApi(data.loginData).then(res=>{
            if(res.data){
              // store.commit('setUserInfo',data.loginData);
              // localhost返回:{"username":"admin","password":"123456"}
              store.commit('setUserInfo',res.data);
              // localhost返回:{"id":500,"rid":0,"username":"admin","mobile":"12345678","email":"adsfad@qq.com","token":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2NTc0NTgzMTAsImV4cCI6MTY1NzU0NDcxMH0.S5B8uEUVYi1BMbV8-eOEdRa75MLWqJpaXl_heblxp78"}
              // 登陆成功
              localStorage.setItem('loginData',JSON.stringify(res.data))
              // 跳转
              router.push({
                path:'/'
          })
            }
          })
          
        }
        
        return {
            ...toRefs(data),
            handleLogin
        }
    }
}
</script>

<style scoped>
.login_wrap{
    width: 100%;
    height: 100vh;
    background: cornflowerblue;
    position: relative;
}
.form_wrap{
    position: fixed;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: azure;
    padding: 30px 50px;
    border-radius: 5px;
}
.button_wrap{
    display: block;
    margin: 2px auto;
}
</style>