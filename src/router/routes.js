//引入相应路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由组件
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

/* 
***打包构建应用时,javaScript包 会变得非常大,影响页面加载
***如果我们能够把不同路由对应的组件分割成不同的代码块,
***然后当**路由被访问时**才加载对应组件(按需引入),这样就更加高效了
*/


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
        //路由懒加载(进阶)
        component: () => import('@/pages/Home'),
        /**
         * 路由元信息
         * 作用：给当前路由添加一些额外数据
         * 右侧是一个对象[可以包含多个key-value对]
         * 路由配置项：书写的时候不要胡写、乱写、瞎写[在vc实例对象上获取不到没有任何意义] 
         * */
        meta: { show: true }
    },
    {
        path: '/detail/:skuId?',
        component: Detail,
        meta: { show: true }
    },
    //Search路由组件配置项
    {
        path: '/search/:keyWord?',
        //路由懒加载
        component: () => import('@/pages/Search'),
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
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/center',
        name: 'center',
        component: Center,
        meta: { show: true },
        children: [
            {
                path: '/center',
                redirect: '/center/myorder'
            },
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            }
        ]
    },
    {
        path: '/paysuccess',
        name: 'paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/trade',
        name: 'trade',
        component: Trade,
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去交易页面：必须是从购物车来
            if (from.path == "/shopcart") {
                next();
            } else {
                //从其它路由组件来，停留在当前路由。
                next(false);
            }
        },
        meta: { show: true }
    },
    //Pay路由组件的配置项
    {
        path: '/pay',
        name: 'pay',
        component: Pay,
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next();
            } else {
                next(false);
            }
        },
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