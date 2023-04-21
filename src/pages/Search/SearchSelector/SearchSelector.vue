<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <!-- 展示品牌的地方 -->
        <ul class="logo-list">
          <li
            v-for="(trademark, index) in trademarkList"
            :key="trademark.tmId"
            @click="tradeMarkHandler(trademark)"
          >
            {{ trademark.tmName }}
          </li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <!-- 放置商品属性的地方 -->
    <div
      class="type-wrap"
      v-for="(attr, index) in attrsList"
      :key="attr.attrId"
    >
      <!-- 商品属性 -->
      <div class="fl key">{{ attr.attrName }}</div>
      <div class="fl value">
        <ul class="type-list">
          <!-- 商品的属性值 -->
          <li
            v-for="(attrValue, index) in attr.attrValueList"
            :key="index"
            @click="attrInfo(attr,attrValue)"
          >
            <a
              @click="
                $emit(
                  'getAttrAndAttrValue',
                  attr.attrId,
                  attr.attrName,
                  attrValue
                )
              "
              >{{ attrValue }}</a
            >
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SearchSelector",
  computed: {
    ...mapGetters(["trademarkList", "attrsList"]),
  },
  methods: {
    //品牌的事件处理函数（接收trademark对象）
    tradeMarkHandler(trademark) {
      //点击了品牌（如点击‘华为’关键字），还是需要整理参数，然后向服务器发送请求，进而获取相应的数据进行展示。
      //问题：此处点击事件触发之后，是父组件（Search）发请求还是子组件（SearchSelector）发请求呢？
      //回答：由子组件将参数发给父组件，由父组件将参数整理后向服务器发送请求，进而获取相应的数据。
      //原因：因为searchParams属性在父组件（Search）中，这是需要带给服务器的参数，而子组件（SearchSelector）则需要把所点击的品牌信息传给父组件。
      //解决父子通信：自定义事件
      this.$emit("trademarkInfo", trademark);
    },
    //商品属性值的点击事件
    attrInfo(attr,attrValue){
      //["属性ID、属性值、属性名称"]
      this.$emit("attrInfo", attr,attrValue);
    }
  },
};
</script>

<style lang="less" scoped>
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;

  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    .key {
      padding-bottom: 87px !important;
    }
  }

  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;

    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }

    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;

      .logo-list {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 0;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: #e1251b;
          font-style: italic;
          font-size: 14px;

          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }
      }

      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;

          a {
            text-decoration: none;
            color: #666;
          }
        }
      }
    }

    .ext {
      position: absolute;
      top: 10px;
      right: 10px;

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
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }

      a {
        color: #666;
      }
    }
  }
}
</style>