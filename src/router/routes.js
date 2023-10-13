// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

// 路由配置信息
export default [
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