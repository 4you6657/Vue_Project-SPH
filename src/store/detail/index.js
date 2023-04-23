//detail模块的小仓库
import {reqGetGoodsInfo} from '@/api'
const state = {
    goodInfo:{},
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    }
}
const actions = {
    //获取产品信息的action
    async getGoodInfo({commit},skuid){
        let result = await reqGetGoodsInfo(skuid)
        console.log(result)
        if(result.code==200){
            commit('GETGOODINFO',result.data)
        }
    }
}
//简化数据
const getters = {
    //简化路径导航的数据
    categoryView(state){
        //保证返回的categoryView的属性值至少是一个空对象
        return state.goodInfo.categoryView || {};
    },
    //简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo || {};
    },
    //简化商品售卖属性的数据
    spuSaleAttrList(state){
        //保证返回的spuSaleAttrList的属性值至少是一个空数组
        return state.goodInfo.spuSaleAttrList || []
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}