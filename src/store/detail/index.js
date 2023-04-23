//detail模块的小仓库
import {reqGetGoodsInfo} from '@/api'
const state = {
    goodInfo:{}
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
    categoryView(state){
        //保证返回的categoryView的属性值至少是一个空对象
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}