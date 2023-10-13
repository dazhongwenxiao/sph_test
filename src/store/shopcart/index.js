import { reqCartList,reqDeleteCartById,reqUpdateCheckedByid } from "@/api"

const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }){
        let result = await reqCartList()
        if(result.code == 200){
            commit('GETCARTLIST', result.data)
        }
    },
    // 删除购物车某个物品
    async deleteCartById({commit},skuId){
       let result = await reqDeleteCartById(skuId)
       if(result.code == 200){
        return 'ok'
       }
    },
    // 修改购物车某一个产品的选中状态
    async updateCheckedById({commit},{ skuId, isChecked }){
        let result = await reqUpdateCheckedByid(skuId,isChecked)
        if(result.code == 200){
            return 'ok'
        }
    },
    // 删除所有选中产品
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll = []
        // 获取购物车当中全部的产品
        getters.cartList.cartInfoList.forEach(element => {
            let promise = element.isChecked==1 ? dispatch('deleteCartById',element.skuId):''
            // 将每一次返回的promise添加到数组中
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    },
    // 修改全部产品的状态
    updateAllCartChecked({dispatch,state},isChecked){
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(element=>{
            let promise = dispatch('updateCheckedById',{skuId:element.skuId,isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const getters = {

    cartList(state){
        return state.cartList[0] || {}
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}
