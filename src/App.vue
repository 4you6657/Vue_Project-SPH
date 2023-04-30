<template>
  <div id="app">
    <Header></Header>
    <!-- 书写路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home/Search显示，在Login/Register隐藏 -->
    <!-- 利用路由元信息解决当前问题的好处：一行代码就可以解决问题 -->
    <Footer v-show="$route.meta.show"></Footer>

    <div>
      <h1 v-upper.myModifier="msg"></h1>
    </div>
  </div>
</template>

<script>
//引入Header与Footer非路由组件
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  //测试数据
  data(){
    return {
      msg:'ABC'
    }
  },
  //注册Header、Footer组件
  components: {
    Header,
    Footer,
  },
  mounted() {
    //通知vuex派发一个action请求，获取商品分类三级列表的数据，存储于仓库中。（只执行一次）
    this.$store.dispatch("getCategoryList");
    //获取用户信息在首页展示
    //this.$store.dispatch("getUserInfo");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
