const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //关闭eslint
  lintOnSave: false,
  transpileDependencies: true,
  productionSourceMap:false,
  //配置代理跨域
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn"
      }
    }
  }
})
