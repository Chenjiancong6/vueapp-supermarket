<template>
  <swiper ref="swiper">
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      //父子组件，传回给子组件数据
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped></style>
