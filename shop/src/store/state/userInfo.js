export default{
    state:{
        // 我们可以使用 JSON.parse() 方法将数据转换为 JavaScript 对象。
        // localStorage.getItem('loginData'):{"username":"12","password":"12"}
        userInfo:(localStorage.getItem('loginData')&&JSON.parse(localStorage.getItem('loginData')))||{}
    },
    mutations:{
        setUserInfo(state,uInfo){
            state.userInfo = uInfo
        }
    }
}