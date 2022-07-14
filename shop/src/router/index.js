import { createRouter, createWebHashHistory } from 'vue-router'
import LayOut from '../views/LayOut/LayOut.vue'
import store from '../store'

const routes = [
  {
    path:'/login',
    name:'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/login.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: LayOut,
    redirect:'/index',
    children:[
      {
        path: '/index',
        name: 'index',
        component: () => import(/* webpackChunkName: "about" */ '../views/pages/index.vue')
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import(/* webpackChunkName: "about" */ '../views/pages/rolesList.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: "about" */ '../views/pages/userList.vue')
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import(/* webpackChunkName: "about" */ '../views/pages/goodsList.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 路由守卫
router.beforeEach((to,from,next)=>{
/*
* to:从哪个页面
* from:到哪个页面
* next:执行next页面跳转
*/
// 判断是否登录
// console.log('store',store.state.uInfo)
if(!store.state.uInfo.userInfo.username){
  // 未登录
  // if 防止死循环
  if(to.path==='/login'){
    next()
    return
  }
  next('/login')
}else{
  next()
}


})

export default router

