<!--
--详情页轮播图
-->

<template>
  <swiper class="swiper-item">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper"; //轮播模块封装
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      //父子组件，从detail.vue中传入数据，进行轮播图片资源数据
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.swiper-item {
  height: 250px;
}
</style>