// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

// 可以通过路由懒加载进行优化
// 路由配置信息
export default [
    {
        path: "/center",
        component: Center,
        meta: {
            show: true
        }
    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        meta: {
            show: true
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path == '/pay'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: "/pay",
        component: Pay,
        meta: {
            show: true
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: "/trade",
        component: Trade,
        meta: {
            show: true
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path == '/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: "/",
        meta: {
            show: true
        }
    },
    {
        path: "/home",
        component: Home,
        meta: {
            show: true
        }
    },
    {
        path: '/search/:keyword?',
        name: "search",
        component: Search,
        meta: {
            show: true
        }
    },
    {
        path: "/login",
        component: Login,
        meta: {
            show: false
        }
    },
    {
        path: "/register",
        component: Register,
        meta: {
            show: false
        }
    },
    {
        path: "/detail/:skuid?",
        component: Detail,
        meta: {
            show: true
        }
    },
    {
        path: "/addCartSuccess",
        component: AddCartSuccess,
        meta: {
            show: true
        }
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: {
            show: true
        }
    }
]