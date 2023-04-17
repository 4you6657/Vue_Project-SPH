//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'

//引入仓库
import store from './store'

//引入三级联动组件为全局组件
import TypeNav from '@/components/TypeNav';
//第一个参数：全局组件的名字 第二个参数：哪一个组件？
Vue.component(TypeNav.name,TypeNav)

//引入Router
import VueRouter from 'vue-router';
//引入路由器
import router from '@/router';


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注册路由：底下的写法KV一致省略V[router小写]
  router:router, //注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性。
  store,//注册仓库：组件实例的身上会多一个$store属性
}).$mount('#app')
