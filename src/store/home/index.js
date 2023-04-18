import { reqGetCategoryList, reqGetBannerList, reqGetFloorList } from '@/api/index'
//Home模块的仓库
const state = {
    /* 
    state中的数据：默认初始值不要瞎写！
    服务器返回对象，初始值就是对象；
    服务器返回数组，初始值就是数组。
    [根据接口返回值来对state进行初始化]
     */
    //home仓库中存储三级菜单的数据
    categoryList: [],
    //轮播图的数据
    bannerList: [],
    //floor的数据
    floorList: []
};
//mutations是唯一可以修改state的地方
const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        //模拟
        // console.log('将从服务器获取到的数据放入仓库！')
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};
//actions是用户处理、派发action的地方，可以在这里书写异步语句和程序员自己的逻辑。
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
    async getBannerList({ commit }) {
        //模拟
        // console.log('获取来自服务器的数据！')

        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    //获取floor数据
    async getFloorList({ commit }) {
        let result = await reqGetFloorList();
        if (result.code == 200) {
            //提交mutations
            commit('GETFLOORLIST', result.data)
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