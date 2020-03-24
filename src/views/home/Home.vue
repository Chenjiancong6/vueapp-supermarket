<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center">大哈克商城</div>
    </nav-bar>

    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']"></tab-control>
    <goods-list :goods="goods['pop'].list"></goods-list>

    <div>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList"; //商品数据

import { getHomeMultidata, getGoodsData } from "network/home"; //网络数据封装
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList
  },
  //  轮播图数据,持久化保存在data()中banners ，recommends
  data() {
    return {
      banners: [],
      recommends: [],

      //首页的商品数据,持久化保存
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
      currentType: "pop" //默认值
    };
  },
  created() {
    // 1.请求轮播等数据
    this.getHomeMultidata();

    //2. 请求商品数据
    this.getGoodsData("pop");
    this.getGoodsData("new");
    this.getGoodsData("sell");
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
    },

    /**
     * 网络请求,商品数据
     */
    // 获取页码
    // 把所有操作包含在getGoodsData(type){}函数中，然后在created()中获取

    getGoodsData(type) {
      //type参数是pop ,news等
      const page = this.goods[type].page; //获取当前页数
      getGoodsData(type, page).then(res => {
        const newList = res.data.list; //获取数据list
        this.goods[type].list.push(...newList); //把获取的数据push存放进去
        this.goods[type].page += 1; //数据页面加1
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
