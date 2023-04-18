<template>
  <!-- 轮播图 -->
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//引入swiper
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      //   immediate: true, //立即监听：不管数据有没有变化，上来立刻监听一次。
      //为什么watch监听不到list：因为list对象中的数据从来没有发生变化（父组件Home传给子组件Floor）。
      deep: true,
      handler(newValue, oldValue) {
        //智能见听到数据已经有了，但是v-for动态渲染结构我们还是没有办法确定的，因此还是需要用到nextTick()
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //点击小球时也可以切换图片
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>