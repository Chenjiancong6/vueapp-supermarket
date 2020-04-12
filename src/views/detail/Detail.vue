<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
    <div class="name">
      <span class="myname">超级大哈克</span>
    </div>
    <b-scroll class="content" ref="bscroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </b-scroll>

    <back-top @click.native="backTop" v-show="isShowScroll"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"; //顶部导航条
import DetailBottomBar from "./childComps/DetailBottomBar"; //底部按钮
import DetailSwiper from "./childComps/DetailSwiper"; //轮播图模块
import DetailBaseInfo from "./childComps/DetailBaseInfo"; //商品信息
import DetailShopInfo from "./childComps/DetailShopInfo"; //店铺信息
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"; //商品详情图片
import DetailParamInfo from "./childComps/DetailParamInfo"; //商品参数
import DetailCommentInfo from "./childComps/DetailCommentInfo"; //评论数据

import BackTop from "components/content/backTop/BackTop"; //返回顶部

import GoodsList from "components/content/goods/GoodsList"; //商品推荐，共用组件

import BScroll from "components/common/bscroll/BScroll"; //滚动框架

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail"; //网络数据请求

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailBottomBar,
    DetailSwiper,
    BScroll,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    BackTop
  },
  //数据持久化
  data() {
    return {
      iid: null, //保存iid的值
      topImages: [], //轮播图片数据
      goods: {}, //商品信息
      shop: {}, //店铺信息
      detailInfo: {}, //商品图片
      paramInfo: {}, //商品参数
      commentInfo: {}, //商品评论信息
      recommends: [], //商品推荐
      isShowScroll: false, //回到顶部按钮的显示和隐藏
      themeTopYs: [], //点击跳转
      getThemeTops: null //调用防抖函数
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

      //2.bundleRenderer.renderToString获取商品信息数据；goods()对象
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //3.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      //4.获取商品详细图片信息
      this.detailInfo = data.detailInfo;

      //5.商品参数，例如衣服码数
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //6.评论数据
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });

    //商品推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  },

  mounted() {
    //防抖函数缓存,等图片加载完成后在执行
    this.getThemeTops = this.debounce(() => {
      //点击跳转到对应的模块
      this.themeTopYs = []; //点赋空值，清空再执行
      //把对应内容的高度push 存起来
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE); //获取最大值
    });
  },

  methods: {
    /**  当数据频繁调用的时候，防抖函数可以调用压力
    //防抖动函数:debounce()
    * */
    debounce(func, delay) {
      var timer = null;
      return function(...args) {
        if (timer) clearInterval(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },

    //商品详情的图片刷新refresh()
    imageLoad() {
      this.$refs.bscroll.refresh();

      ///防抖动函数 缓存图片
      this.getThemeTops();
    },

    ////点击跳转 ["商品", "参数", "评论", "推荐"]的主题
    titleClick(index) {
      //scroll(x,y,时间)
      this.$refs.bscroll.scrollTo(0, -this.themeTopYs[index], 300);
    },

    //点击回到顶部
    backTop() {
      this.$refs.bscroll.scrollTo(0, 0);
    },

    //监听滚动
    contentScroll(position) {
      //返回顶部按钮出现位置
      this.isShowScroll = -position.y > 1000; // 大于500，返回true

      //2.监听滚动到某个主题
      //获取y轴的值
      const positionY = -position.y;
      //循环
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          //大于当前的位置，小于后一个模块的位置
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i; // 为了不每次遍历都调用
          this.$refs.nav.currentindex = this.currentIndex;
        }
      }
    },

    //将点击加入购物车的商品信息添加到store中
    addToCart() {
      const product = {}; //创建一个空对象存储数据
      product.iid = this.iid; //取出商品id
      product.imgURL = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;

      //把数据发送到action 进行异步处理
      //product===payload(vuex中的变量参数)
      this.$store.dispatch("addCart", product);

      this.$toast.show("加入购物车成功！");
    }
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
.content {
  /* height: calc(100% - 44px); */
  position: absolute;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0;
}
.name {
  text-align: center;
  margin-top: 10px;
  z-index: -1;
}
.myname {
  background-color: aqua;
  border-radius: 10%;
  opacity: 0.5;
}
</style>
