//该文件专门用于创建整个应用的路由器
import Vue from 'vue';
//1.导入路由VueRouter
import VueRouter from 'vue-router';
//2.使用路由
Vue.use(VueRouter);

import routes from './routes';

//引入store
import store from '@/store';


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

let router = new VueRouter({
    //配置路由
    //1：路径的前面要有/(不是二级路由)
    //2：路径中单词都是小写的
    //3：component右侧别加单引号[字符串，组件是对象(VueComponent类的实例)]
    mode: 'history', //history模式，是干净的路由地址，即在地址栏里面没有'#'
    //4.配置路由的path和组件
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        //返回y=0，代表滚动条在最上方。
        return { y: 0 }
    }
});
//全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    /**
     * to:获取到所要跳转到的路由的信息
     * from:可以获取到你是从哪个路由而来的信息
     * next:放行函数
     * console.log(next);
     * 多种写法：
     * next(); //直接放行
     * next(path); //放行到指定路由
     * next(false); //中断当前路由并返回到上一个路由
     **/
    //为了方便测试 统一放行。
    next();
    //获取仓库中的token(可以确定用户是否登陆了)
    //用户登录了才会有token(不登录一定没有token)
    let token = store.state.user.token;
    // console.log(token);
    //用户信息
    let name = store.state.user.userInfo.name;
    // console.log(userInfo);
    if (token) {
        //用户已经登陆了,就不应该允许用户通过跳转再返回到login页面。
        if (to.path == '/login') {
            next('/home') //让用户留在home首页
            console.log("用户已经登陆了,不应该继续跳转到login页面,要返回至Home首页！");
        } else {
            //用户已经登陆了,但是用户继续访问的不是login页面[可能是home|search|detail|shopcart|...]
            //如果用户信息存在,就放行。
            if (name) {
                next();
                console.log("用户名存在,放行！");
            } else {
                //用户已经登陆了,如果用户信息不存在
                //需要派发action,让仓库存储用户信息后再进行路由跳转。
                try {
                    //获取用户信息成功,放行
                    await store.dispatch("getUserInfo");
                    next();
                    console.log("用户信息重新获取成功,放行！")
                } catch (error) {
                    /**
                     * 语句走到这里需要同时满足的条件：
                     * 1、用户登陆了
                     * 2、跳转的是非login页面
                     * 3、没有用户信息,于是派发action让仓库存储用户信息后再跳转路由
                     * 4、获取用户信息失败了
                     * 以上情况说明token失效了,获取不到用户信息,需要重新登陆后再获取token
                     * */
                    //重新派发userLogout,清除token
                    await store.dispatch('userLogout');
                    //跳转至login页面,让用户重新登陆获取token。
                    next('/login');
                }
            }
        }
    } else {
        //用户未登录
        next();
        console.log("用户未登录！");
    }

})

export default router;