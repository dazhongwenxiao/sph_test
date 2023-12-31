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

// 获取购物车列表数据接口
export const reqCartList = ()=>requests({
    url: '/cart/cartList',
    method: 'get'
})

// 删除购物车产品的接口
export const reqDeleteCartById = (skuId)=>requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

// 修改商品选中的状态
export const reqUpdateCheckedByid = (skuId,isChecked)=>requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})

// 获取验证码接口
// /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone)=>requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

// 用户注册
// /api/user/passport/register
export const reqUserRegister = (data)=>requests({
    url: `/user/passport/register`,
    data,
    method: 'post'
})

// 用户登录
// /api/user/passport/login  post
export const reqUserLogin = (data)=>requests({
    url: '/user/passport/login'
    ,data
    ,method: 'post'
})

// 获取用户登录信息（需要带着token）
// /api/user/passport/auth/getUserInfo   get
export const reqUserInfo = ()=>requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
})

// 退出登录
// /api/user/passport/logout    get
export const reqLogout = ()=>requests({
    url: '/user/passport/logout'
    ,method: 'get'
})

// 获取用户地址信息
export const reqAddressInfo = ()=>mockAjax.get(`/address`)

// 获取商品清单
export const reqOrderInfo = ()=>requests({
    url: '/order/auth/trade',
    method: 'get'
})

// 提交订单的接口
export const reqSubmitOrder = (tradeNo,data)=>requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post'
})

// 获取支付信息 /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId)=>requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
})

// 获取支付状态
export const reqPayStatus = (orderId)=>requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
})