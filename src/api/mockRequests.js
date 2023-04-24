//对axios进行二次封装
import axios from 'axios'
//引入进度条
import nProgress from 'nprogress';
//start：进度条开始 done：进度条结束

//1 利用axios对象的方法create，去创建一个axios实例。
//2 request就是axios，只不过稍微配置一下。
const requests = axios.create({
    //配置对象
    baseURL:"/mock",//基础路径，发请求的时候，路径当中会出现api
    timeout:5000,//代表请求超时的时间为5s
});
//请求拦截器：在发请求之前，请求拦截器可以监测到，可以在请求发出去之前做一些事情。
requests.interceptors.request.use((config)=>{
    //config：配置对象，对象里面有一个属性很重要：header请求头。

    //进度条开始动
    nProgress.start();
    return config;
})
//响应拦截器：当服务器手动请求之后，做出响应。
requests.interceptors.response.use((response)=>{
    //响应成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情。
    //进度条结束
    nProgress.done();
    return response.data;
},(error)=>{
    //响应失败的回调函数：
    return Promise.reject(new Error('failed'));
})

//最终需要对外暴露（不对外暴露外面模块没办法使用）
//这里的代码是暴露一个axios实例
export default requests;