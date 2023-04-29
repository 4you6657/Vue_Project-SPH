//对axios进行二次封装
import axios from 'axios'

//引入进度条
//start：进度条开始 done：进度条结束
import nProgress from 'nprogress';

//引入相关进度条的样式
import "nprogress/nprogress.css";

//1 利用axios对象的方法create，去创建一个axios实例。
//2 request就是axios，只不过稍微配置一下。
const requests = axios.create({
    //配置对象
    baseURL:"/mock",//基础路径，发请求的时候，路径当中会出现api
    timeout:5000,//代表请求超时的时间为5s
});

//请求拦截器：将来项目中如果有n个请求，只要发请求，就会触发请求拦截器。
requests.interceptors.request.use((config)=>{
    //config：配置对象，对象里面有一个属性很重要：header请求头。
    //请求拦截器：请求头[header]，请求头能否给服务器携带参数？
    //请求拦截器：在项目中还有一个重要作用：给服务器携带所有请求的公共参数
    
    //进度条开始动
    nProgress.start();
    return config;
})

//响应拦截器：请求数据返回会执行
requests.interceptors.response.use((res)=>{
    //响应成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到。
    //res：实质就是项目中发请求后，服务器返回的数据。
    //进度条结束
    nProgress.done();
    return res.data;
},(err)=>{
    //温馨提示：请求失败后，将失败的信息打印出来。
    alert(err.message);
    //终止Promise链
    return new Promise();
})

//最终需要对外暴露（不对外暴露外面模块没办法使用）
//暴露一个添加了新的功能的axios实例---即requests
export default requests;