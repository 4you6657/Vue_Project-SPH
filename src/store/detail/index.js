//detail模块的小仓库
import { reqAddOrUpdateShopCart, reqGetGoodsInfo } from '@/api'
//封装游客临时身份的模块uuid--->生成一个随机的字符串
import { getUUID } from '@/utils/uuid_token'

const state = {
    //商品详情的数据
    goodInfo: {},
    //游客的临时身份
    uuid_token: getUUID()
};

const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};

const actions = {
    //获取产品信息的action
    async getGoodInfo({  commit }, skuid) {
        //商品详情要求，需要携带商品id
        let result = await reqGetGoodsInfo(skuid)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    //将产品添加到购物车中||修改某一个产品的个数
    async addOrUpdateShopCart({ commit }, { skuid, skuNum }) {
        /**
         * 加入购物车（发请求）以后，前台将参数带给服务器[数据存储至服务器].
         * 服务器写入数据成功了，并没有返回其他数据，只是返回code=200，代表这次数据存储是成功的。
         * 正因为服务器没有返回其余数据，因此咱们不需要“三连环”操作（在仓库存储数据）。
         * 参数顺序不能瞎写
         * */
        let result = await reqAddOrUpdateShopCart(skuid, skuNum)
        if (result.code == 200) {
            //如果加入购物车成功，返回Promise即为成功
            return "OK";
        } else {
            //如果“加入购物车失败”，返回失败的Promise
            return Promise.reject(new Error('failed'));
        }

    }
};

//简化数据
const getters = {
    //面包屑的数据
    categoryView(state) {
       /*  研究这个问题:
        起始状态:state.detailInfo起始状态空对象,空对象.categoryView->undefined
        当服务器数据回来之后state.detailInfo,并非空对象,获取的即为服务器返回的数据{7个K}
        当前属性值:服务器的数据有值，用服务器的。服务器数据没有回来至少有一个空对象兜底[不能让undefined兜底]
        保证返回的categoryView的属性值至少是一个空对象 */
        return state.goodInfo.categoryView || {};
    },
    //产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    //商品销售属性列表的数据
    spuSaleAttrList(state) {
        //保证返回的spuSaleAttrList的属性值至少是一个空数组
        return state.goodInfo.spuSaleAttrList || []
    }

};
export default {
    state,
    mutations,
    actions,
    getters
}