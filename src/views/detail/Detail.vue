<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav"></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"; //顶部导航条
import DetailBottomBar from "./childComps/DetailBottomBar"; //底部按钮
import DetailSwiper from "./childComps/DetailSwiper"; //轮播图模块

import { getDetail } from "network/detail"; //网络数据请求

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailBottomBar,
    DetailSwiper
  },
  //数据持久化
  data() {
    return {
      iid: null, //保存iid的值
      topImages: [] //轮播图片数据
    };
  },

  ////生命周期
  created() {
    //取出iid
    this.iid = this.$route.query.iid;

    //详情页网络资源数据
    getDetail(this.iid).then(res => {
      const data = res.result;

      //1. 获取轮播图资源
      this.topImages = data.itemInfo.topImages;
    });
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  /* 覆盖掉底部导航栏 */
  background-color: #fff;
  height: 100vh;
}
</style>