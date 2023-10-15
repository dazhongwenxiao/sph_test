import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入MockServer.js---mock数据
import '@/mock/mockServer'
// 引入swiper样式
import "swiper/css/swiper.css"
// 统一接口api文件里面全部请求函数
import * as API from '@/api'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'

// 引入element-ui
import { Button,MessageBox } from 'element-ui'

// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
import loadimage from './assets/images/yz.jpg'

// 引入校验插件
import '@/plugins/velidate'

// 第一个参数：全局组件的名字；第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)

Vue.component(Pagination.name, Pagination)

Vue.component(Button.name,Button)

Vue.config.productionTip = false

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.use(VueLazyload, {
  loading: loadimage
})

new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  },
  // 注册路由：底下的写法KV一直省略【router小写的】
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库：组件实例的身上会多出一个属性$store属性
  store
}).$mount('#app')
