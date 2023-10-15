// 配置路由的地方

import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

import store from '@/store'

// 使用插件
Vue.use(VueRouter)

// 先把VueRouter原型对象的push先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push与replace
// 第一个参数：告诉原来push方法往哪里跳转（传递那些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
// call与apply区别
// 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
// 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.replace = function(location, resolve, reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.push = function(location, resolve, reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}

// 配置路由
let router = new VueRouter({
    
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savePosition){
        // 返回y=0表示滚动条在最上方
        return {x: 0, y: 0}
    }
})

// 全局守卫：前置守卫
router.beforeEach(async (to, from, next)=>{
    // to：可以获取到你要跳转到那个路由信息
    // from：可以获取到你从哪个路由而来的信息
    // next：放行函数

    // 用户登录了才会有token
    let token = store.state.user.token

    // 用户信息
    let name = store.state.user.userInfo.name
    if(token){
        // 用户已经登录了还想去login
        if(to.path == '/login'){
            next('/home')
        }else{
            // 登录了，去的不是login
            // 如果用户名已经有了
            if(name){
                next()
            }else{
                // 没有用户信息
                try {
                    // 派发action，让仓库存储用户信息再跳转
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效获取不到用户信息
                    // 清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else{
        // 未登录
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            next('/login?redirect=' + toPath)
        }
        next()
    }
})

export default router