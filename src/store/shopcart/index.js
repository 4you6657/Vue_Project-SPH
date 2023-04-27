import { reqGetCartList } from "@/api";

const state = {
    cartList:[],
};
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList;
    }
};
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqGetCartList();
        //测试是否能够获取个人购物车数据
        if(result.code==200){
            commit("GETCARTLIST",result.data)
        }
    }
};
const getters = {
    cartList(state){
        return state.cartList[0] || {};
    },
    //计算出来的购物车数据

};

export default {
    state,
    mutations,
    actions,
    getters
}