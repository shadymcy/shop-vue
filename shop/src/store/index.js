import { createStore } from 'vuex'
import uInfo from './state/userInfo.js'
export default createStore({
  // 全局状态初始值
  state: {
  },
  // 计算state,获取对应的值
  getters: {
  },
  // 更新state
  mutations: {
  },
  // 可以进行异步操作
  actions: {
  },
  // 数据比较多时，分模块
  modules: {
    uInfo
  }
})
