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
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}