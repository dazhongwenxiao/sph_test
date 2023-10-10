// 当前这个模块：API进行统一管理
import requests from "./request";
import mockAjax from "./mockAjax";

// 三级联动接口
// /api/product/getBaseCategoryList  get  无参数
// 发送请求：axios发请求返回结果Promise对象
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList', method:'get'})

// 获取广告轮播图接口
export const reqGetBannerList = ()=>mockAjax.get(`/banner`)
// 获取首页楼层列表
export const reqGetFloorList = ()=>mockAjax.get(`/floor`)

// 获取搜索模块数据
// 当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params)=>requests({url:'/list', method:'post', data:params})

// 获取产品详情信息的接口   URL: /api/item/{ skuId }    请求方式：get
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${ skuId }`, method: 'get'})

// 将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum)=>requests({
    url:`/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})