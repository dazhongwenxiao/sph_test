import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api"

// home模块化小仓库
// state:仓库存储数据的地方
const state = {
    // 所有分类的数组
    categoryList: [],
    // 广告位轮播图数据的数组
    bannerList: [],
    // 所有楼层数据的数组
    floorList: []
}

// mutations:修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList){
        state.floorList = floorList
    },
}

// actions:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    // 异步获取首页所有分类
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code == 200){
            commit("CATEGORYLIST", result.data)
        }
    },
    // 异步获取广告轮播数据
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        if(result.code == 200){
            commit("GETBANNERLIST", result.data)
        }
    },
    // 异步获取楼层数据
    async getFloorList({commit}){
        let result = await reqGetFloorList()
        if(result.code == 200){
            commit("GETFLOORLIST", result.data)
        }
    }
}

// getters:理解为计算属性，用于简化仓库数据，让组件仓库的数据更加方便
const getters = {}

// 暴露
export default {
    state,
    mutations,
    actions,
    getters
}