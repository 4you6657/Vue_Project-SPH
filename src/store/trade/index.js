import { reqAddressInfo,reqShopInfo } from "@/api";
const state = {
    address: [],
    shopInfo:{},
};
const mutations = {
    //获取用户地址信息
    GETUSERADDRESS(state, address) {
        state.address = address;
    },
    //获取商品清单的数据
    GETSHOPINFO(state,shopInfo){
        state.shopInfo = shopInfo;
    }
};
const actions = {
    //获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        console.log(result);
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data);
            return "OK";
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    //获取商品清单的数据
    async getShopInfo({commit}){
        let result = await reqShopInfo();
        console.log(result);
        if (result.code == 200) {
            commit('GETSHOPINFO', result.data);
            return "OK";
        } else {
            return Promise.reject(new Error('failed'));
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}