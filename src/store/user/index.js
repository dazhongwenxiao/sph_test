// 登录与注册的模块
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
import { setToken,getToken,removeToken} from "@/utils/token";

const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
        state.token = ''
        state.userInfo = ''
        removeToken()
    }
}
const actions = {
    // 获取验证码
    async getCode({commit},phone){
        // 获取验证码的这个接口：把验证码返回，但是正常情况，后台把验证码发到用户手机上
        let result = await reqGetCode(phone)
        if(result.code == 200){
            commit('GETCODE', result.data)
        }
    },
    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        if(result.code == 200){
            return 'ok'
        }
    },
    // 用户登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        // 服务器下发token，用户唯一标识符
        // 将来经常通过带token找服务器要用户信息进行展示
        if(result.code == 200){
            // 持久化存储
            setToken(result.data.token)
            commit('USERLOGIN',result.data.token)
            return 'ok'
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code == 200){
            console.log(result.data);
            commit('GETUSERINFO',result.data)
            return 'ok'
        }
    },
    // 退出登录
    async reqLogout({commit}){
        let result = await reqLogout()
        // action中不能操作state，提交commit
        if(result.code == 200){
            commit('CLEAR')
            return 'ok'
        }
    }
}
const getters = {}

export default{
    state,
    mutations,
    actions,
    getters
}