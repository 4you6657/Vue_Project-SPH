//当前模块：API接口进行统一管理
//引入二次封装的axios（带有请求、响应拦截器）
import requests from './request';
import mockRequests from './mockRequests';

/* 
三级联动接口
请求地址：/api/product/getBaseCategoryList 
请求方式：GET
请求参数：无参数
*/
//发请求：axios发请求返回结果是Promise对象
//对外暴露一个函数，只要外部调用这个函数，就向服务器发送ajax请求，获取三级菜单数据。
//当前这个函数只需要把服务器返回结果返回即可。
export const reqGetCategoryList = () => requests({ url: '/product/getBaseCategoryList ', method: 'get' }) //函数方法
// export const reqCategoryList = () => requests.get('/product/getBaseCategoryList') //对象方法
// export const reqGetCategoryList = () => requests.get('/product/getBaseCategoryList')

//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banners')

//获取floor数据
export const reqGetFloorList = () => mockRequests.get('/floors')

//获取Search模块数据||接口请求地址：/api/list||请求方式：POST||参数：需要参数
//当前这个函数不需要接收外部传递参数
//当前这个接口，给服务器传递参数params[至少是一个空对象]。
export const reqGetSearchInfo = (params) => requests({ url: '/list ', method: 'post', data: params })

//获取产品详细信息的接口||URL:/api/item/${skuId}||请求方式:get
export const reqGetGoodsInfo = (skuid) => requests({ url: `/item/${skuid}`, method: 'get' })

//将产品添加到购物车中(或者更新某一个产品的个数)
/* api/cart/addToCart/${skuId}/${skuNum} || post请求 */
export const reqAddOrUpdateShopCart = (skuid, skuNum) => requests({ url: `/cart/addToCart/${skuid}/${skuNum}`, method: 'post' })

//获取购物车列表数据接口
/* URL:/api/cart/cartList method:get */
export const reqGetCartList = () => requests({ url: '/cart/cartList', method: 'get' })