import { reqGetCategoryList,reqGetBannerList } from '@/api/index'
//Home模块的小仓库
const state = {
    /* 
    state中的数据：默认初始值不要瞎写！
    服务器返回对象，初始值就是对象；
    服务器返回数组，初始值就是数组。
    [根据接口返回值来对state进行初始化]
     */
    categoryList:[],
    //轮播图的数据
    bannerList:[]
};
const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    }
};
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据。
    async getCategoryList({ commit }) {
        let result = await reqGetCategoryList();
        // console.log(result);
        if (result.code == 200) {
            commit("GETCATEGORYLIST", result.data);
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.code==200){
            commit('GETBANNERLIST',result.data)
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