//当前模块：API接口进行统一管理
//引入二次封装的axios（带有请求、响应拦截器）
import requests from './request';
import mockRequests from './mockAjax';
import { mock } from 'mockjs';

/* 
三级联动接口
请求地址：/api/product/getBaseCategoryList 
请求方式：GET
请求参数：无参数
*/
//发请求：axios发请求返回结果是Promise对象
//对外暴露一个函数，只要外部调用这个函数，就向服务器发送ajax请求，获取三级菜单数据。
//当前这个函数只需要把服务器返回结果返回即可。
// export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList ', method: 'get' })
// export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')
export const reqGetCategoryList = () => requests.get('/product/getBaseCategoryList')
//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banners')
//获取floor数据
export const reqGetFloorList = () => mockRequests.get('/floors')