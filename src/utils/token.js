//对外暴露一个函数
export const setToken = (token) => {
    //本地“持久化”存储token
    localStorage.setItem("TOKEN", token);
}

export const getToken = () => {
    //获取token
    return localStorage.getItem("TOKEN");
}

//清除本地存储token
export const removeToken = () => {
    //移除token
    localStorage.removeItem("TOKEN");
}