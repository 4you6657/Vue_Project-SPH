<template>
  <div>
    <!-- 三级联动全局组件 三级联动已经注册为全局组件，所以不需要再引入。 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- v-for也可以在自定义标签（组件标签）当中使用 -->
    <!-- Floor组件自己在组件内部是没有发出数据请求的，数据是父组件Home给的。 -->
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
//引入其余组件
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import {mapState} from 'vuex'
export default {
  name: "",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    //派发action，获取Floor组件的数据
    this.$store.dispatch("getFloorList")
  },
  computed:{
    ...mapState({
      floorList:state=>state.home.floorList
    })
  }
};
</script>

<style>
</style>