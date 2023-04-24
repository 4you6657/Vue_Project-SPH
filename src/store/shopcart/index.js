import { reqGetCartList } from "@/api";

const state = {};
const mutations = {};
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqGetCartList();
        //测试是否能够获取个人购物车数据
        if(result.code==200){

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