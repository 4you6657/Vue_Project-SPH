//Vue插件对外暴露的一定是一个对象
let myPlugins = {};
//Vue插件对象内置一个install方法
myPlugins.install = function(Vue,options){
    //插件何时被调用？ 答：插件被调用时[Vue.use(myPlugins)]
    // console.log('我是自定义插件myPlugins,我被调用了！',options);
    //Vue.prototype.$bus:任何组件都可以使用
    //Vue.directive():全局指令
    //Vue.component:全局组件
    //Vue.Filter:全局过滤器
    //全局指令
    Vue.directive(options.name, (element,params)=>{
        element.innerHTML = params.value.toUpperCase();
        // console.log('我是params对象里的指令修饰符modifiers对象：',params.modifiers);
    })

}

export default myPlugins;