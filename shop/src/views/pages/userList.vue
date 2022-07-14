<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 白色内容区域 -->
    <div class="page_content">
      <div class='flex'>
        <div class="input_box">
          <el-input
            v-model="searchParams.query"
            placeholder="搜索关键字"
            class="input-with-select"
          >   
            <template #append>
              <el-button @click="searchList"><el-icon><Search /></el-icon></el-button>
            </template>
            </el-input>
        </div>
        <el-button @click="addUser" type="primary" plain>新建用户</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="userList" style="width: 100%">
        <el-table-column prop="username" label="姓名" width="180" />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="mobile" label="电话" />
        <el-table-column prop="role_name" label="角色" />
        <el-table-column prop="mg_state" label="状态">
          <template #default="scope">
            <!-- scope.row相当于一条数据 -->
            <el-switch v-model="scope.row.mg_state" @change="swichChange(scope.row)"/>
          </template>
        </el-table-column> 
        <el-table-column  label="操作">
          <template #default="scope">
            <el-button type='primary' @click="editRow(scope.row)">编辑</el-button>
            <el-button type='danger' @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column> 
      </el-table>
      <!-- 分页 -->
        <el-pagination
           v-model:currentPage="searchParams.pagenum"
           v-model:page-size="searchParams.pagesize"
           :page-sizes="[2,5,10,20]"
           :small="small"  
           layout="total, sizes, prev, pager, next, jumper"
           :total="total"
           @size-change="searchList"
           @current-change="searchList"
        />
    </div>


    <!-- 新增弹窗 -->
    <el-dialog v-model="dialogFormVisible" title="新建用户">
        <!-- 表单 -->
        <!-- 注意这里不是v-model 是v-bind:model -->
        <el-form 
        :model="formData"
        ref="userForm"
        :rules="rules">
          <el-form-item label="用户名称" prop='username'>
            <el-input v-model="formData.username" placeholder="请输入用户名称" />
          </el-form-item>
          <el-form-item label="用户密码" prop='password'>
            <el-input type='password' v-model="formData.password" placeholder="请输入用户密码" />
          </el-form-item>
          <el-form-item label="用户邮箱" prop='email'>
            <el-input v-model="formData.email" placeholder="请输入用户邮箱" />
          </el-form-item>
          <el-form-item label="用户手机号" prop='mobile'>
            <el-input v-model="formData.mobile" placeholder="请输入用户手机号" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="flex">
            <el-button type='primary' @click="submitForm(userForm)">确定</el-button>
            <el-button @click="cancelForm(userForm)">取消</el-button>
          </div>
        </template>
    </el-dialog>


    <!-- 编辑弹窗 -->
    <el-dialog v-model="dialogFormEditVisible" title="编辑用户">
        <!-- 表单 -->
        <!-- 注意这里不是v-model 是v-bind:model -->
        <el-form 
        :model="formDataE"
        ref="userFormE"
        :rules="rulesE">
          <el-form-item label="用户邮箱" prop='email'>
            <el-input v-model="formDataE.email" placeholder="请输入用户邮箱" />
          </el-form-item>
          <el-form-item label="用户手机号" prop='mobile'>
            <el-input v-model="formDataE.mobile" placeholder="请输入用户手机号" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="flex">
            <el-button type='primary' @click="submitEditForm(userFormE)">确定</el-button>
            <el-button @click="cancelEditForm(userFormE)">取消</el-button>
          </div>
        </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { userListApi, userAddApi, userChangeStateApi, userChangeInfoApi, userDeleteApi } from '../../util/request.js'
export default {
    name:'user',
    setup() {
      const data = reactive({
        searchParams:{
          query:'',
          pagesize:10,
          pagenum:1
        },
        total:0,
        userList:[],
        dialogFormVisible:false,
        dialogFormEditVisible:false,
        formData:{
          username:'',
          password:'',
          email:'',
          mobile:''
        },
        formDataE:{
          id:'',
          email:'',
          mobile:''
        },
        rules:{
          username:[
            {required:true,message:'此项为必填项',trigger:'blur'}
          ],
          password:[
            {required:true,message:'此项为必填项',trigger:'blur'}
          ],
          email:[
            {required:false,
            // 正则项
            pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message:'请填写正确的邮箱地址',trigger:'blur'}
          ],
          mobile:[
            {required:false,
            pattern:/^[1][3,4,5,7,8][0-9]{9}$/,
            message:'请填写正确的手机号码',trigger:'blur'}
          ],
        },
        rulesE:{
          email:[
            {required:false,
            // 正则项
            pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message:'请填写正确的邮箱地址',trigger:'blur'}
          ],
          mobile:[
            {required:false,
            pattern:/^[1][3,4,5,7,8][0-9]{9}$/,
            message:'请填写正确的手机号码',trigger:'blur'}
          ],
        }
        
        
      })
      const searchList=()=>{
        userListApi(data.searchParams).then(res=>{
          if(res.data){
            data.userList = res.data.users
            data.total=res.data.total
          }
        })
      }
      const addUser=()=>{
        data.dialogFormVisible = true
      }
      // 新增提交
      const submitForm=(formEl)=>{
        // console.log('formEl是啥?',formEl)
        // Proxy {validate: ƒ, validateField: ƒ, resetFields: ƒ, clearValidate: ƒ, scrollToField: ƒ, …}
        // [[Handler]]: Object
        // [[Target]]: Proxy
        // [[IsRevoked]]: false

        // 个人理解formEl相当于vue2  this.$refs[formEl]
        // validate校验
        formEl.validate(res=>{
          // console.log('submitForm',res)  ==> submitForm true[正确输入时]
          // 如果res是false直接return【也可以进行提示错误】
          if(!res){
            return
          }
          // 验证通过
          userAddApi(data.formData).then(res=>{
            if(res.data){
              // 隐藏弹窗
              data.dialogFormVisible = false
              // alert('通过')
              // 清空form
              data.formData = {
                  username:'',
                  password:'',
                  email:'',
                  mobile:''
              }
              // 更新list
              searchList()     
            }
          })
          
        })
      }
      // 修改提交
      const submitEditForm =(formEl)=>{
        formEl.validate(res=>{
          if(!res){
            return
          }
          // 提交修改
          userChangeInfoApi(data.formDataE).then(res=>{
            if(res.data){
              data.dialogFormEditVisible = false
              searchList()
            }
          })
      })
      }

      // 状态更改
      const swichChange=(row)=>{
        userChangeStateApi(row).then(res=>{
          if(res.data){
            searchList()
          }
        })
      }
      // 数据编辑
      const editRow = (row)=>{
        // 展示编辑表单
        data.dialogFormEditVisible = true
        data.formDataE.id = row.id 
        data.formDataE.email = row.email 
        data.formDataE.mobile = row.mobile 
      }
      // 数据删除
      const deleteRow = (row)=>{
        userDeleteApi(row).then(res=>{
            searchList()
        })
      }

      // 新增取消
      const cancelForm =(formEl)=>{
        formEl.clearValidate()
        data.dialogFormVisible=false
        data.formData = {
                  username:'',
                  password:'',
                  email:'',
                  mobile:''
              }
      }
      // 编辑取消
      const cancelEditForm=(row)=>{
        row.clearValidate()
        data.dialogFormEditVisible = false
        data.formDataE.id = row.id 
        data.formDataE.email = row.email 
        data.formDataE.mobile = row.mobile 
        
      }



      // 方法初始化
      searchList()
      let userForm = ref()
      let userFormE = ref()
      return {
        ...toRefs(data),
        searchList,
        addUser,
        submitForm,
        userForm,
        userFormE,
        swichChange,
        editRow,
        deleteRow,
        submitEditForm,
        cancelForm,
        cancelEditForm
      }
    }
}
</script>

<style scoped> 
.input_box{
  width: 200px;
  margin-right: 20px;
}
</style>>

