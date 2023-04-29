//Search模块的小仓库
import { reqGetSearchInfo } from "@/api";

const state = {
    //仓库初始状态：搜索模块返回的数据
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
const actions = {
    // 获取Search模块的数据
    async getSearchList({ commit }, searchParams) {
        //当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象。
        let result = await reqGetSearchInfo(searchParams)
        if (result.code === 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
};
//getters：仓库的计算属性
//在项目中：vuex的getters主要作用：简化仓库当中的数据。
//可以把我们将来在组件中需要用的数据简化一下[将来组件在获取数据时就方便了]
const getters = {
    //此处的形参state：是当前仓库中的state，并非大仓库中的那个state。
    goodsList(state) {
        //这样书写是有问题的
        //state.searchList.goodsList这条语句，如果服务器数据回来了，没问题，是一个数组
        //假如网络不给力，或者说根本没有网络，难么state.searchList.goodsList返回的就是undefined
        return state.searchList.goodsList
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },
    attrsList(state) {
        return state.searchList.attrsList
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}