import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqUserLogout } from "@/api";
import { setToken, getToken, removeToken } from '@/utils/token'
//这是登陆与注册的模块
const state = {
    code: '',
    token: getToken(),
    userInfo: {},
};
const mutations = {
    //获取验证码
    GETCODE(state, code) {
        state.code = code;
    },
    //
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    //清除本地数据
    CLEARUSERINFO(state) {
        //把仓库中相关用户信息清空
        state.token = '';
        state.userInfo = {};
        //本地存储localStorage清空
        removeToken();

    }
};
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        //获取验证码的这个接口：把验证码返回，但是正常情况是后台把验证码发到用户手机上[省钱]
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'OK';
        } else {
            return Promise.reject(new Error('failed'));
        }
    },

    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        console.log(result);
        if (result.code == 200) {
            return 'OK';
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    //登陆业务 token
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        console.log(result);
        //服务器下发的token:用户的唯一标识符
        //将来经常通过带token找服务器要用户信息进行展示
        if (result.code == 200) {
            //用户已经登陆成功，且获取到token。
            commit("USERLOGIN", result.data.token);
            //持久化存储token
            console.log(result.data)
            setToken(result.data.token);
            return 'OK';
        } else {
            return Promise.reject(new Error("failed"));
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        console.log(result);
        if (result.code == 200) {
            //提交用户信息
            commit("GETUSERINFO", result.data);
            return "OK";
        } else {
            return Promise.reject(new Error("failed"));
        }
    },
    //退出登陆业务
    async userLogout({ commit }) {
        let result = await reqUserLogout();
        //action里面不能操作state，应该提交mutations去修改state
        if (result.code == 200) {
            commit("CLEARUSERINFO")
            return "OK";
        } else {
            return Promise.reject(new Error("failed"));
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