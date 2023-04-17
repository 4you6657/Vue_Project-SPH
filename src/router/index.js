//该文件专门用于创建整个应用的路由器
import Vue from 'vue';
//1.导入路由VueRouter
import VueRouter from 'vue-router';
//2.使用路由
Vue.use(VueRouter);

//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

//先把VueRouter原型对象的push方法保存一份（备份）
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push|replace方法
//location：告诉原来的push方法，往哪里跳转？传递哪些参数？
//resolve：成功后的回调 reject：失败后的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        /**
         * call||apply区别？
         * 相同点：都可以调用函数一次，都可以篡改函数的上下文一次。
         * 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组。
         */
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

//3.配置并暴露一个路由器
export default new VueRouter({
    mode: 'history', //history模式，是干净的路由地址，即在地址栏里面没有'#'
    //4.配置路由的path和组件
    routes: [
        {
            path: '*',
            //路由重定向
            redirect: '/home'
        },
        //一级路由
        {
            path: '/home',
            component: Home,
            meta: { show: true }
        },
        {
            path: '/search/:keyWord?',
            component: Search,
            meta: { show: true },
            name: 'search',
            // 路由组件能不能传递props数据？
            // 答：可以，有三种写法。
            // 1、布尔值写法:params
            // props:true,
            // 2、对象写法:额外给路由组件传递一些props
            // props:{a:1,b:2},
            // 3、函数写法:可以把params参数、query参数，通过props传给路由组件
            /* props:($route)=>{
                return {keyWord:$route.params.keyWord,k:$route.query.k}
            } */
            // 函数写法的简写形式
            props: ($route) => ({ keyWord: $route.params.keyWord, k: $route.query.k })
        },
        {
            path: '/login',
            component: Login,
            meta: { show: false }
        },
        {
            path: '/register',
            component: Register,
            meta: { show: false }
        }

    ]
})