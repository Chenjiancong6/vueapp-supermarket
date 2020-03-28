<template>
  <div id="home">
    <nav-bar class="nav-bar" ref="navBar">
      <div slot="center">大哈克商城</div>
    </nav-bar>
    <tab-control
      ref="contentTab2"
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      v-show="showTabControl"
    ></tab-control>
    <!---------- 分界线 ---------------->
    <b-scroll
      class="content"
      ref="bscroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
      @scroll="contentScroll"
    >
      <home-swiper :banners="banners" @swiperLoaded="swiperLoaded"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control ref="contentTab1" :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </b-scroll>
    <back-top @click.native="backTop" v-show="isShowScroll"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList"; //商品数据
import BScroll from "components/common/bscroll/BScroll"; //滚动框架
import BackTop from "components/content/backTop/BackTop"; //回到顶部

import { getHomeMultidata, getGoodsData } from "network/home"; //网络数据封装
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BScroll,
    BackTop
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
      currentType: "pop", //默认值
      isShowScroll: false, //判断是否隐藏回到顶部按钮
      tabOffsetTop: 0, //初值高度为0
      showTabControl: false, // 吸顶效果,v-show先隐藏
      saveY: 0 //home离开时记录状态和位置
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

  /*活跃的*
       home记录状态和位置*/
  activated() {
    this.$refs.bscroll.refresh(); //刷新
    this.$refs.bscroll.scrollTo(0, this.saveY, 0); //x,y,时间
  },
  /*不活跃的*
       home离开时保存记录Y轴状态和位置*/
  deactivated() {
    this.saveY = this.$refs.bscroll.getscrollY();
  },

  mounted() {
    //调用防抖函数
    const refresh = this.debounce(this.$refs.bscroll.refresh, 500);

    //接收GoodsListItem.vue,解决加载图片卡顿问题
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
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

        //完成加载更多商品图片，使用在BScroll定义好的finishedPullUp()
        this.$refs.bscroll.finishedPullUp();
      });
    },

    /**
     * 点击切换商品数据
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //吸顶效果，给两个组件都赋值
      this.$refs.contentTab1.currentIndex = index;
      this.$refs.contentTab2.currentIndex = index;
    },

    //// 完成加载更多数据,判断点击选中['流行', '新款', '精选']
    loadMore() {
      this.getGoodsData(this.currentType);
    },

    /**  当数据频繁调用的时候，收集多次请求，然后一次调用
    //防抖动函数:debounce()
    * */
    debounce(func, delay) {
      let timer = null; //清除时间
      return function(...args) {
        //...args： 可以返回多个数
        if (timer) clearInterval(timer); //如果在规定时间内有请求，则清除请求，把请求收集起来
        timer = setTimeout(() => {
          //异步请求
          func.apply(this, args);
        }, delay);
      };
    },

    //引用BScroll的滚动函数，点击回到顶部
    backTop() {
      this.$refs.bscroll.scrollTo(0, 0);
    },

    //回到顶部按钮的显示与隐藏
    contentScroll(position) {
      this.isShowScroll = -position.y > 500; // 大于500，返回true

      //吸顶效果
      //如果滚动高度大于contentTab1组件的告诉，显示contentTab2组件
      this.showTabControl = -position.y >= this.tabOffsetTop;
    },

    //tabcontroll吸顶效果,获取加载图片的高度
    swiperLoaded() {
      //contentTab1:先显示，后隐藏  ；contentTab2：先隐藏，显示
      //tabOffsetTop:初值为0，把contentTab1获取的高度赋值给它
      //$el：获取元素内部的样式
      this.tabOffsetTop = this.$refs.contentTab1.$el.offsetTop;
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
  /* top: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 9; */
}

.tab-control {
  /* position: sticky; 粘性布局定位，*/
  /* 结合了 position:relative 和 position:fixed 两种定位功能于一体的特殊定位  */
  /* top: 44px; */
  position: relative;
  z-index: 9;
}

/* better-scroll */
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
