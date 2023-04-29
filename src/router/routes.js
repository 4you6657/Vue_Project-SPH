//引入相应路由组件
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
//路由配置信息
export default [
    {
        path: '/',
        //路由重定向到首页
        redirect: '/home'
    },
    //一级路由
    {
        path: '/home',
        component: Home,
        /**
         * 路由元信息
         * 作用：给当前路由添加一些额外数据
         * 右侧是一个对象[可以包含多个key-value对]
         * 路由配置项：书写的时候不要胡写、乱写、瞎写[在vc实例对象上获取不到没有任何意义] */ 
        meta: { show: true }
    },
    {
        path: '/detail/:skuId?',
        component: Detail,
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
        path: '/addcartsuccess',
        name:'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/center',
        name:'center',
        component: Center,
        meta: { show: true }
    },
    {
        path: '/paysuccess',
        name:'paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/shopcart',
        name:'shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/trade',
        name:'trade',
        component: Trade,
        meta: { show: true }
    },
    {
        path: '/pay',
        name:'pay',
        component: Pay,
        meta: { show: true }
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
    },

]