//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'

//引入路由相关文件
import router from '@/router';
//引入仓库进行注册
import store from './store'
//引入三级联动组件为全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination'
/**全局组件的注册、
 * 第一个参数：要注册的全局组件的名字 
 * 第二个参数：指定是哪一个组件？
 */ 
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//引入mockServe.js --- mock数据
import '@/mock/mockServe'; 
//在入口文件main.js中引入Swiper样式（只需要引用一次）
import 'swiper/css/swiper.css';

// import {reqGetSearchInfo} from './api';
// console.log(reqGetSearchInfo({}))
//关闭生产提示
Vue.config.productionTip = false

//统一接收api文件夹里面全部请求函数
// 统一引入（只需要引入一次）
import * as API from '@/api';
console.log(API);
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this; //注册全局事件总线
    Vue.prototype.$API = API; //API接收了所有请求函数并且将API挂载到Vue.prototype原型对象上
  },
  /*
  注册路由router
  当这里书写router的时候
  可以让全部的组件（路由|非路由组件）的身上都拥有$route|$router属性。 
  $route（路由）：可以获取到路由信息（path、query、params）
  $router：进行编程式路由导航、路由跳转push|replace
   */
  router:router,
  //在入口文件这里注册store仓库：在每一个组件实例的身上会多一个$store属性 
  store,
}).$mount('#app')
