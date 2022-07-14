<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 白色内容区域 -->
    <div class="page_content">
      <el-button type='primary' @click="dialogFormVisible=true"> 
        新建角色
      </el-button>
      <el-table :data="rolesList" style="width: 100%">
        <el-table-column prop="roleName" label="角色名"  />
        <el-table-column prop="roleDesc" label="角色描述"  />
        <el-table-column  label="操作">
          <template #default="scope">
            <el-button type='primary' @click="editRow(scope.row)">编辑</el-button>
            <el-button type='danger' @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column> 
      </el-table>
    
    </div>

    <!-- 新建/编辑弹窗表单 -->
    <!-- @close关闭事件 -->
    <el-dialog @close='clearForm' v-model="dialogFormVisible" :title="formData.id?'编辑角色':'新建角色'">
        <!-- 表单 -->
        <!-- 注意这里不是v-model 是v-bind:model -->
        <el-form 
        :model="formData"
        ref="userForm"
        :rules="rules">
          <el-form-item label="角色名" prop='roleName'>
            <el-input v-model="formData.roleName" placeholder="请输入角色名" />
          </el-form-item>
          <el-form-item label="角色描述" prop='roleDesc'>
            <el-input v-model="formData.roleDesc" placeholder="请输入角色描述" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="flex">
            <el-button type='primary' @click="submitForm(userForm)">确定</el-button>
            <el-button @click="cancelForm(userForm)">取消</el-button>
          </div>
        </template>
    </el-dialog>

  </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import {getRolesApi, addRolesApi, editRolesApi, delRolesApi} from '../../util/request.js'
export default {
    name:'roles',
    setup() {
      let data = reactive({
        rolesList:[],
        dialogFormVisible:false,
        formData:{
          roleName:'',
          roleDesc:''
        },
        rules:{
          roleName:{
            required:true,message:'此项为必填项',trigger:'blur'
          }
        },
        
      })

      const getList=()=>{
        getRolesApi().then(res=>{
          data.rolesList = res.data
        })
      }

      const editRow=(row)=>{
        data.dialogFormVisible=true
        data.formData.id = row.id
        data.formData.roleName = row.roleName
        data.formData.roleDesc = row.roleDesc
      }

      const deleteRow=(row)=>{
        delRolesApi(row).then(res=>{
          getList()
        })
      }
      const submitForm=(formEl)=>{
        formEl.validate(res=>{
          if(!res){
            return
          }
          // 提交表单
          if(data.formData.id){
            // 执行编辑
            editRolesApi(data.formData).then(res=>{
            if(res.data){
              data.dialogFormVisible=false
              getList()
               }
                })
          }else{
            // 新增
            addRolesApi(data.formData).then(res=>{
            if(res.data){
              data.dialogFormVisible=false
              getList()
              
          }
                })

                }
            })
        }
        const cancelForm=(row)=>{
          row.clearValidate()
          data.dialogFormVisible = false
          if(row.id){
            data.formData.id = row.id
          }
          
          data.formData.roleName = row.roleName
          data.formData.roleDesc = row.roleDesc
        }

      // 清除表单
      const clearForm=()=>{
        data.formData={
          roleName:'',
          roleDesc:''
        }
      }

      getList()
      const userForm = ref()
      return{
        ...toRefs(data),
        userForm,
        editRow,
        deleteRow,
        submitForm,
        clearForm,
        cancelForm
      }
      
    }
    
}
</script>

<style>

</style>