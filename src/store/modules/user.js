import {loginAPI} from '@/apis/user'
import {setToken,getToken, removeToken} from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token:getToken() || '',
  },
  mutations: {
    setToken(state,token){
      //vuex存token
      state.token=token
      //本地存token
      setToken(token)
    },
    removeToken(state){
      state.token=''
      removeToken()
    }
  },
  actions: {
    async login(ctx,{username,password}){
      //1.调用接口
      const res=await loginAPI({username,password})
      //提交mutations
      ctx.commit('setToken',res.data.token)
      console.log(res);
    }
  }
}
