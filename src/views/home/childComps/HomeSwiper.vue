<template>
  <swiper ref="swiper">
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoaded" />
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
  },
  data() {
    return {
      isLoaded: false //tabcontroll吸顶效果
    };
  },

  methods: {
    imageLoaded() {
      //tabcontroll吸顶效果
      if (!this.isLoaded) {
        //if判断,图片没加载完为false,加载完为true
        this.$emit("swiperLoaded");
        this.isLoaded = true;
      }
    }
  }
};
</script>

<style scoped></style>
