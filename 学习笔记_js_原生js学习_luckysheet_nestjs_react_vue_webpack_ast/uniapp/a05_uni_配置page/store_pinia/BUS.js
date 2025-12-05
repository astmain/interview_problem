import { defineStore } from 'pinia'
// export const useloginStore = defineStore({
export default defineStore({

  id: 'login', // id必填，且需要唯一
  state: () => {
    return {
      // userName: uni.getStorageSync('userName') ? uni.getStorageSync('userName') : '未登录'
      // A03_me:{name:1111},
      A03_me:require("../pages/A03_me/BUS").default,
    }
  },
  // actions 用来修改 state
    actions: {
      // login(userName) {
      // 	uni.setStorageSync('userName', userName)
      // 	this.userName = userName
      // },
      // logout() {
      // 	uni.clearStorage()
      // 	this.userName = '已退出登录'
      // }
    }
})
