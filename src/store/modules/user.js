import {loginAPI} from '@/apis/user'
export default {
  namespaced: true,
  state: {
    token:'',
  },
  mutations: {
    setToken(state,token){
      state.token=token
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
