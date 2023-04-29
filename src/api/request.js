//对axios进行二次封装
import axios from 'axios'
//在当前模块中引入store仓库：存储数据
import store from '@/store'
//引入进度条
//start：进度条开始 done：进度条结束
import nProgress from 'nprogress';
//引入相关进度条的样式
//如果出现进度条没有显示，一定是忘记引入样式了
import "nprogress/nprogress.css"


//1 利用axios对象的方法create，去创建一个axios实例。
//2 request就是axios，只不过稍微配置一下。
const requests = axios.create({
    //配置对象
    baseURL:"/api",//基础路径，发请求的时候，路径当中会出现api
    timeout:5000,//代表请求超时的时间为5s
});

//请求拦截器：在发请求之前，请求拦截器可以监测到，可以在请求发出去之前做一些事情。
requests.interceptors.request.use((config)=>{
    //config：配置对象，对象里面有一个属性很重要：header请求头，用于给服务器携带请求的公共参数。    
    if(store.state.detail.uuid_token){
        //给请求头添加一个字段(userTempId)：和后台老师商量好了
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    //需要携带token[公共参数]给服务器
    //每一次发请求,请求头携带用户临时身份
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }
    //不管那个模块发请求,请求拦截器，都可以触发。请求拦截器可以通过请求头每一次协大公共参数给服务器[用户未登录的临时身份]
    //进度条开始动
    nProgress.start();
    return config;
})

//响应拦截器：请求数据返回会执行
requests.interceptors.response.use((res)=>{
    //res：实质就是发请求之后，服务器返回的数据。
    //进度条结束
    nProgress.done();
    return res.data;
},(err)=>{
    //温馨提示：请求失败后打印失败的信息
    alert(err.message);
    //终止Promise链
    return new Promise();
})

//最终需要对外暴露（不对外暴露外面模块没办法使用）
//这里的代码是暴露一个axios实例---即requests
export default requests;