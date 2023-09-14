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
