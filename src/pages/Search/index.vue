<template>
  <div>
    <!-- 全局组件商品分类三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread：面包屑，带有'x'的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 商品分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyWord">
              {{ searchParams.keyWord }}<i @click="removeKeyWord">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTradeMark">×</i>
            </li>
            <!-- 商品属性值展示的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector：Search组件的子组件-->
        <!-- 绑定自定义事件：实现儿子给父组件传递数据 -->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序相关的结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-xiangshangjiantoucuxiao': isAsc,
                        'icon-xiangxiajiantoucuxiao': isDesc,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{
                        'icon-xiangshangjiantoucuxiao': isAsc,
                        'icon-xiangxiajiantoucuxiao': isDesc,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 路由跳转的时候切记不要忘记带id -->
                    <router-link  :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link >
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <div class="fr page">
            <Pagination
              :currentPage="searchParams.currentPage"
              :pageSize="searchParams.pageSize"
              :total="total"
              :continues="5"
              @getCurrentPage="getCurrentPage"
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",

  //Search路由组件的子组件SearchSelector注册
  components: {
    SearchSelector,
  },
  data() {
    return {
      //带给服务器的参数：将来Search模块搜索的条件
      searchParams: {
        //一级分类的id
        category1Id: "",
        //二级分类的id
        category2Id: "",
        //三级分类的id
        category3Id: "",
        //分类名
        categoryName: "",
        //用户搜索的关键字
        keyWord: "",
        //排序：初始状态应该是综合|降序
        //默认：综合、降序
        order: "1:desc",
        //分页器相关：代表当前页数
        currentPage: 1,
        //代表每一页展示数据的个数
        pageSize: 3,
        //商品属性的搜索条件
        props: [],
        //品牌的搜索条件
        trademark: "",
      },
    };
  },
  //当组件挂载完毕之前执行一次函数体的内容[先于mounted之前]
  beforeMount() {
    //在发请求之前，把接口需要传递的参数，进行整理（在给服务器发请求之前把参数整理好，服务器就会返回查询的数据）
    //Object.assign：ES6新增的语法，用于合并对象。
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
    // console.log('发请求之前',this.searchParams)
  },
  //组件挂载完毕执行且仅执行一次
  mounted() {
    //在发请求之前带给服务器参数[searchParams参数发生变化有数值带给服务器]
    this.getData();
  },
  computed: {

    //mapGetters里面的写法：传递的是数组，因为getters计算是没有划分模块的[Home,Search]。
    ...mapGetters(["goodsList"]),
    //判断是不是1
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    //判断是不是2
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    //获取Search模块展示产品一共多少数据？
    ...mapState({
      total: state => state.search.searchList.total,
    }),
  },
  methods: {
    //向服务器发请求获取Search模块的数据[根据参数不同返回不同的数据进行展示]
    //把这次请求封装为一个函数，当需要调用的时候调用即可。
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    removeCategoryName() {
      //把带给服务器的参数置空，还需要重新向服务器请求数据。
      //带给服务器参数说明：可有可无，如果属性值为空的字符串，还是会把相应的字段带给服务器
      //但是把相应的字段变为undefined，那么当前的这些被置为undefined的字段就不会带给服务器。
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      //地址栏也需要改，手段是进行路由跳转（现在的路由跳转只是跳转到自己这里）
      //严谨：本意是删除query、如果路径当中出现params不应该删除，路由跳转的时候应该带着。
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    //删除关键字
    removeKeyWord() {
      //给服务器带的参数searchParams的keyWord置空
      this.searchParams.keyWord = undefined;
      //再次请求数据
      this.getData();
    },
    //自定义事件的回调
    trademarkInfo(trademark) {
      //整理品牌字段的参数 “ID：品牌名称”
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //再次发送请求，获取Search模块列表的数据进行展示
      this.getData();
    },
    //删除品牌面包屑的信息
    removeTradeMark() {
      //给服务器带的参数searchParams的trademark对象置空
      this.searchParams.trademark = undefined;
      //再次请求数据
      this.getData();
    },
    //收集商品属性的回调函数（自定义事件）
    attrInfo(attr, attrValue) {
      //["属性ID、属性值、属性名称"]
      //整理好参数的格式
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //数组去重
      //if语句里面只有一行代码时，大花括号可以省略。
      if (this.searchParams.props.indexOf(props) == -1) {
        //数组当中没有该属性时才push进数组
        this.searchParams.props.push(props);
      }
      //再次发请求
      this.getData();
      // console.log('attr:',attr,'@@@','attrValue:',attrValue)
    },
    //删除商品属性值
    removeAttr(index) {
      //再次整理参数
      this.searchParams.props.splice(index, 1);
      //再次发起数据请求
      this.getData;
    },
    changeOrder(flag) {
      //形参flag：它是一个标记，用于区分用户点击的是(综合'1')or(价格'2')（用户点击的时候传递进来的）

      //这里获取的是order的初始状态[我们需要通过初始状态去判断接下来做什么？]
      let originalOrder = this.searchParams.order;

      //这里获取的是flag的初始状态[用于区分初始状态是'综合'or'价格'？]
      let originalFlag = this.searchParams.order.split(":")[0];

      //这里获取的是sort的初始状态
      let originalSort = this.searchParams.order.split(":")[1];
      // console.log('初始的flag:'+originalFlag,'用户点击的flag:'+flag)

      //准备一个新的order的属性值
      let newOrder = "";
      if (flag == originalFlag) {
        //数据初始化默认为'综合'and'降序'
        //进入了if判断语句，说明用户点击的一定是‘综合’，但是排序方式也得由‘降序’变为‘升序’。
        newOrder = `${originalFlag}:${originalSort == "desc" ? "asc" : "desc"}`;
      } else {
        //进入了else，说明用户点击的一定是是‘价格’，且默认值为‘价格’and‘降序’
        newOrder = `${flag}:${"desc"}`;
      }
      //将新的order（newOrder）赋予searchParams
      this.searchParams.order = newOrder;
      //再次发送数据请求，模板重新解析。
      this.getData();
    },
    //这是自定义事件的回调函数：获取当前所在页数
    getCurrentPage(currentPage) {
      console.log('getCurrentPage方法执行了!')
      //整理参数发送给服务器
      this.searchParams.currentPage = currentPage;
      //再次发送数据请求，重新渲染到页面。
      this.getData();
      
    },
  },
  //数据监听：监听组件实例身上的属性的属性值的变化
  watch: {
    immediate: true,
    //监听路由的信息是否发生了变化，如果发生变化，再次发起请求。
    $route(newValue, oldValue) {
      //每一次请求完毕，应该把相应的1、2、3级分类分类的id置空，让它接收下一次的相应1、2、3级id。
      //分类名字与关键字不用清理，因为每一次路由发生变化时，都会给他赋予新的数据。
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      //再次发请求之前整理带给服务器的参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //再次发起Ajax请求
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }

    .page {
      width: 733px;
      height: 66px;
      overflow: hidden;
      float: right;

      .sui-pagination {
        margin: 18px 0;

        ul {
          margin-left: 0;
          margin-bottom: 0;
          vertical-align: middle;
          width: 490px;
          float: left;

          li {
            line-height: 18px;
            display: inline-block;

            a {
              position: relative;
              float: left;
              line-height: 18px;
              text-decoration: none;
              background-color: #fff;
              border: 1px solid #e0e9ee;
              margin-left: -1px;
              font-size: 14px;
              padding: 9px 18px;
              color: #333;
            }

            &.active {
              a {
                background-color: #fff;
                color: #e1251b;
                border-color: #fff;
                cursor: default;
              }
            }

            &.prev {
              a {
                background-color: #fafafa;
              }
            }

            &.disabled {
              a {
                color: #999;
                cursor: default;
              }
            }

            &.dotted {
              span {
                margin-left: -1px;
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                font-size: 14px;
                border: 0;
                padding: 9px 18px;
                color: #333;
              }
            }

            &.next {
              a {
                background-color: #fafafa;
              }
            }
          }
        }

        div {
          color: #333;
          font-size: 14px;
          float: right;
          width: 241px;
        }
      }
    }
  }
}
</style>