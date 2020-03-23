<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center">大哈克商城</div>
    </nav-bar>

    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";

import { getHomeMultidata } from "network/home"; //网络数据封装
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  //  轮播图数据,持久化保存在data()中banners ，recommends
  data() {
    return {
      banners: [],
      recommends: []
    };
  },
  created() {
    // 1.请求轮播等数据
    this.getHomeMultidata();
  },
  methods: {
    /**
     * 网络请求,请求轮播等数据
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.recommends = res.data.recommend.list;
        this.banners = res.data.banner.list;
      });
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
