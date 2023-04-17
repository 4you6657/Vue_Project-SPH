//当前模块：API接口进行统一管理
import requests from './request'

/* 
三级联动接口
请求地址：/api/product/getBaseCategoryList 
请求方式：get
请求参数：无参数
*/
//发请求：axios发请求返回结果是Promise对象
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList ', method: 'get' })
