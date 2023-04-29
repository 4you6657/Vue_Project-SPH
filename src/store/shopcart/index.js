import { reqGetCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

const state = {
    shopCartInfo: [],
};
const mutations = {
    GETCARTLIST(state, payload) {
        state.shopCartInfo = payload;
    }
};
const actions = {
    //获取用户购物车列表数据
    async getCartList({ commit }) {
        let result = await reqGetCartList();
        //测试是否能够获取个人购物车数据
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId({ commit,state,dispatch }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'OK';
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    //删除购物车中选中的产品
    deleteAllCheckedCart({ commit,state,dispatch, getters }) {
        //context:小仓库，身上有commit[提交mutations修改state] getters[计算属性] dispatch[派发action] state[当前仓库的数据]
        //获取购物车中全部的产品（是一个数组）
        let PromiseAll = [];
        state.shopCartInfo[0].cartInfoList.forEach(item => {
            //商品的勾选状态为“勾选”，发请求一个一个删除。
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '';
            //将每一次返回的Promise添加到数组当中
            PromiseAll.push(promise);
        });
        //只要全部的p1|p2...都成功，返回结果即为成功。
        //如果有一个失败，返回即为失败结果。
        return Promise.all(PromiseAll);
    },
    //修改商品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return 'OK';
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    //修改全部产品的状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        //数组
        let promiseAll = [];
        state.shopCartInfo[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked });
            promiseAll.push(promise);
        });
        //最终返回的结果
        return Promise.all(promiseAll);
    }
};
const getters = {
    CartInfo(state) {
        return state.shopCartInfo[0] || {};
    },
    //计算出来的购物车数据
};

export default {
    state,
    mutations,
    actions,
    getters
}