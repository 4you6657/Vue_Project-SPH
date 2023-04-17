import { reqCategoryList } from '@/api/index'
//Home模块的小仓库
const state = {
    /* 
    state中的数据：默认初始值不要瞎写！
    服务器返回对象，初始值就是对象；
    服务器返回数组，初始值就是数组。
    [根据接口返回值来对state进行初始化]
     */
    categoryList:[],
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    }
};
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据。
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        // console.log(result);
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data);
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