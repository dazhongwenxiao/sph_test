import { reqGetSearchInfo } from "@/api"
// search模块化小仓库
// state:仓库存储数据的地方
const state = {
    // 仓库初始状态
    searchList: {}
}
// mutations:修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state, searchList){
        state.searchList = searchList
    }
}
// actions:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 获取search模块数据
    async getSearchList({commit},params){
        // params形参：是当用户派发action（dispatch）的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if(result.code === 200){
            commit("GETSEARCHLIST", result.data)
        }
    }
}
// getters:理解为计算属性，用于简化仓库数据，让组件仓库的数据更加方便
// 可以把我们将来在组件中需要用的数据简化一下[将来组件在获取数据的时候就方便了]
const getters = {
    // 当前形参state是当前仓库中的state，并非大仓库中那个state
    goodsList(state){
        // 假如网络不给力或没有网络，state.searchList.goodsList应该返回的是undefined
        // 计算新的属性的属性值至少给人家来一个数组
        return state.searchList.goodsList || {}
    },
    trademarkList(state){
        return state.searchList.trademarkList || {}
    },
    attrsList(state){
        return state.searchList.attrsList || {}
    },
}

// 暴露
export default {
    state,
    mutations,
    actions,
    getters
}