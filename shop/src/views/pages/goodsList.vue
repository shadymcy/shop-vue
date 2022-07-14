<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
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
      </div>
      <!-- 表格 -->
      <el-table :data="goodsList" style="width: 100%">
        <el-table-column prop="goods_name" label="商品名" width="400" />
        <el-table-column prop="goods_price" label="价格(￥)" width="180" />
        <el-table-column prop="goods_weight" label="重量(kg)" />
        <el-table-column prop="goods_state" label="商品状态">
          <template #default="scope">
            <!-- scope.row相当于一条数据 -->
            <p>{{switchState(scope.row.goods_state)}}</p>
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
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { goodsListApi } from '../../util/request.js'
export default {
    name:'goods',
    setup() {
      const data = reactive({
        searchParams:{
          query:'',
          pagesize:10,
          pagenum:1
        },
        total:0,
        goodsList:[]
      })

      const searchList=()=>{
        goodsListApi(data.searchParams).then(res=>{
          if(res.data){
            data.goodsList = res.data.goods
            data.total=res.data.total
          }
        })
      }
      const switchState = num=>{
        switch (num) {
          case 0:
            return '未通过'
            break;
          case 1:
            return '审核中'
            break;
          case 2:
            return '已审核'
            break;
        
        }
      }
  

      // 方法初始化
      searchList()
      return {
        ...toRefs(data),
        searchList,
        switchState
      }
    }
}
</script>

<style>

</style>