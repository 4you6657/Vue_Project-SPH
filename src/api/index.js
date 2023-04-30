//当前模块：统一管理项目前端API接口

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
export const reqGetCategoryList = () => {
    //箭头函数可以在程序任意地方使用，箭头函数返回的即为服务器的数据
    //下面箭头函数返回值：返回的是什么？---Promise，即返回服务器的数据
    //return 关键字，千万别忘记书写，如果忘记书写，在任意地方获取的都是undefined
    return requests({ url: '/product/getBaseCategoryList ', method: 'get' }) //函数方法
}
// export const reqCategoryList = () => requests.get('/product/getBaseCategoryList') //对象方法
// export const reqGetCategoryList = () => requests.get('/product/getBaseCategoryList')

//获取首页轮播图数据的接口
export const reqGetBannerList = () => mockRequests({ url: '/banners', method: 'get' });

//获取floor数据
export const reqGetFloorList = () => mockRequests.get('/floors')

//搜索模块的请求接口函数：
//将来根据不同的搜索条件，需要给服务器携带不同的参数
//请求体携带搜索的参数
//获取Search模块数据||接口请求地址：/api/list||请求方式：POST||参数：需要参数
//当前这个函数不需要接收外部传递参数
//当前这个接口，给服务器传递参数params[至少是一个空对象]。
export const reqGetSearchInfo = (data) => requests({ url: '/list ', method: 'post', data })

//获取详情模块商品数据的接口||URL:/api/item/${skuId}||请求方式:get
export const reqGetGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

//将产品添加到购物车中|更新某一个产品的个数
/* api/cart/addToCart/${skuId}/${skuNum} || post请求 */
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//获取用户购物车数据接口
/* URL:/api/cart/cartList method:get */
export const reqGetCartList = () => requests({ url: '/cart/cartList', method: 'get' })

//删除购物车商品的接口
/* URL：/api/cart/deleteCart/{skuId} 请求方式：DELETE */
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

//修改商品选中状态的接口
/* URL：/api/cart/checkCart/{skuId}/{isChecked} 请求方式：GET */
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

//获取验证码的接口
/* URL:/api/user/passport/sendCode/{phone} 请求方式：GET */
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });

//注册功能的接口
/* URL:/api/user/passport/register 请求方式：POST */
export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, method: 'post', data });

//登录的接口
/* URL：/api/user/passport/login method:POST [请求体携带参数 phone&&password */
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, method: 'post', data });

//获取用户登录成功以后返回用户信息的接口[需要带着用户的token向服务器要用户信息]
/* URL：/api/user/passport/auth/getUserInfo 请求方式：GET */
export const reqUserInfo = () => requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' });


//退出登录业务
/* URL:/api/user/passport/logout GET */
export const reqUserLogout = () => requests({ url: `/user/passport/logout`, method: 'get' });


//获取用户地址信息
/* URL:/api/user/userAddress/auth/findUserAddressList GET */
export const reqAddressInfo = () => requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' });


//获取商品清单数据的接口
/* URL:/api/order/auth/trade GET */
export const reqShopInfo = () => requests({ url: `/order/auth/trade`, method: 'get' });


//提交订单的接口(不使用Vuex)
/* URL:/api/order/auth/submitOrder?tradeNo=${tradeNo} POST */
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data });

//获取支付信息接口(不使用vuex)
/* URL:/api/payment/weixin/createNative/${orderId} GET */
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

//获取支付结果的接口
/* URL:/api/payment/weixin/queryPayStatus/${orderId} */
export const reqPayResult = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });

//获取我的订单的接口
/* URL:/api/order/auth/${page}/${limit} GET */
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });