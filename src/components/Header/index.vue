<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 没有用户名，就显示p标签里的内容（未登录状态） -->
          <p v-if="!userName">
            <span>请</span>
            <!-- 声明式导航，务必要有to属性 -->
            <router-link to="/login">登陆</router-link>
            <router-link class="register" to="/register">免费注册</router-link>>
          </p>
          <!-- 有用户名，表示登陆成功 -->
          <p v-else>
            <a>{{ userName }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyWord"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      keyWord: "",
    };
  },
  methods: {
    //搜索按钮的回调函数：需要向Search路由进行跳转
    goSearch() {
      /**
       * 路由传递参数
       * 第一种：字符串形式
       */
      /* this.$router.push(
        "/search/" + this.keyWord + "?k=" + this.keyWord.toUpperCase()
      ); */

      /**
       * 路由传递参数
       * 第二种：模板字符串形式
       */
      //  this.$router.push(`/search/${this.keyWord}?k=${this.keyWord.toUpperCase()}`)

      /**
       * 路由传递参数
       * 第三种：对象写法
       */
      // this.$router.push({name:"search",params:{keyWord:this.keyWord},query:{k:this.keyWord.toUpperCase()}})

      /* ------------------------------------------------------------- */
      //面试题1 路由传递参数（对象写法）path是否可以结合params参数一起使用？
      //答：路由跳转传参的时候，对象的写法可以是name命名路由或者是path的形式，但是需要注意的是，path这种写法不可以结合params参数一起使用。
      // this.$router.push({path:'/search',params:{keyWord:this.keyWord},query:{k:this.keyWord.toUpperCase()}})
      /* ------------------------------------------------------------- */
      //面试题2 如何指定params参数可传可不传？
      //如果路由要求传递params参数，但是我就不传递params参数，会发现一件事情：URL会有问题。
      //如何指定params参数可以传递、或者不传递，在配置路由的时候，在占位的后面加上一个问号'?'[代表params参数可以传递也可以不传递]

      // this.$router.push({name:'search',query:{k:this.keyWord.toUpperCase()}})
      /* ------------------------------------------------------------- */
      //面试题3 params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
      //答：使用undefined解决：params参数可以传递或者不传递（空字符串）
      // this.$router.push({name:'search',params:{keyWord:''|| undefined},query:{k:this.keyWord.toUpperCase()}})
      /* ------------------------------------------------------------- */
      //面试题4 路由组件能不能传递props数据？
      //答：可以，有三种写法（布尔值、对象、函数）
      //下面这种写法可以解决当前这个抛出异常错误的问题，但是将来我们还是会用push|replace方法进行路由跳转，还是会出现此类问题。
      //因此我们需要从“根”解决这个问题，就是咱们自己重写push||replace方法，push||replace方法是由VueRouter.prototype原型对象提供的。

      //如果有query参数，也捎带一并传递过去。
      if (this.$route.query) {
        let location = {
          name: "search",
          params: { keyWord: this.keyWord || undefined },
          // query: { k: this.keyWord.toUpperCase() || undefined },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
      /* ------------------------------------------------------------- */
    },
    //退出登录
    async logout() {
      //退出登录需要做的事情
      //1 发请求，通知服务器退出登录[清除token]
      //2 清楚项目中的数据[userInfo,token]
      try {
        //如果退出成功
        await this.$store.dispatch("userLogout");
        //回到首页
        this.$router.push("/home");
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    //用户名信息
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>