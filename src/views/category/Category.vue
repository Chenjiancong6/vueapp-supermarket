<!--
 //categories:总的分类页数据（左边的数据综合）
 //subcategories: 分类页右上部数据（从categories继承）
 //categoryDetail:分类页右下部数据（从categories继承）
-->
<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>

    <tab-control
      ref="contentTab2"
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      v-show="showTabControl"
    ></tab-control>
    <!---------- 分界线 ---------------->

    <div class="content">
      <tab-left-menu :categories="categories" @selectItem="selectItem"></tab-left-menu>
      <b-scroll
        id="tab-content"
        ref="bscroll"
        :probe-type="3"
        @scroll="contentScroll"
        :pull-up-load="true"
        :data="[categoryData]"
      >
        <div>
          <tab-right-category @swiperLoaded="swiperLoaded" :subcategories="showSubcategory"></tab-right-category>
          <tab-control ref="contentTab1" :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
          <tab-right-detail :category-detail="showCategoryDetail"></tab-right-detail>
        </div>
      </b-scroll>
    </div>
    <back-top @click.native="backTop" v-show="isShowScroll"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabLeftMenu from "./childComps/TabLeftMenu";
import TabRightCategory from "./childComps/TabRightCategory"; //右边上部
import TabRightDetail from "./childComps/TabRightDetail"; //右边下部
import BScroll from "components/common/bscroll/BScroll"; //滚动框架
import TabControl from "components/content/tabControl/TabControl";
import BackTop from "components/content/backTop/BackTop"; //回到顶部

import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/category"; //后台数据

export default {
  name: "Category",
  components: {
    NavBar,
    TabLeftMenu,
    TabRightCategory,
    TabRightDetail,
    BScroll,
    TabControl,
    BackTop
  },
  data() {
    return {
      categories: [], //建立一个空数组保存网络数据
      categoryData: {}, //保存数据
      currentIndex: -1,
      currentType: "pop", //默认值
      showTabControl: false, // 吸顶效果,v-show先隐藏
      tabOffsetTop: 0, //吸顶效果
      isShowScroll: false //回到顶部
    };
  },

  created() {
    // 1.请求分类数据
    this._getCategory();
  },
  methods: {
    /**
     * 1.网络请求,请求分类的数据
     */
    _getCategory() {
      getCategory().then(res => {
        //获取分类的总数据：categories
        this.categories = res.data.category.list;

        //初始化每个类别的子数据，
        //并分别存放在subcategories和 categoryDetail中
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {}, //右上部数据图片

            //详情页右下部数据
            categoryDetail: {
              pop: [],
              new: [],
              sell: []
            }
          };
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0);
      });
    },

    /**
     * 2.上部右边数据
     */
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey; //获取对应id

      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData }; //扩展运算符

        //传入['流行', '新款', '精选']的数据
        this._getCategoryDetail("pop");
        this._getCategoryDetail("new");
        this._getCategoryDetail("sell");
      });
    },

    /**
     * 3.下部右边详情页数据
     */
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;

      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },

    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this._getSubcategories(index);
    },

    /**
     * 点击事件监听
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
      //吸顶效果，判断是否隐藏
      this.$refs.contentTab1.currentIndex = index;
      this.$refs.contentTab2.currentIndex = index;
    },

    // tabcontroll吸顶效果
    swiperLoaded() {
      //$el:用于获取组件中的元素
      //获取轮播图中图片到contentTab1的高度，高度到达后显示contentTab2的内容
      this.tabOffsetTop = this.$refs.contentTab1.$el.offsetTop;
      //-this.$refs.navBar.$el.offsetHeight || 0;
    },

    contentScroll(position) {
      //吸顶效果，返回true
      this.showTabControl = position.y <= -this.tabOffsetTop;

      //返回顶部按钮出现位置
      this.isShowScroll = -position.y > 900; // 大于900，返回true
    },

    //点击回到顶部
    backTop() {
      this.$refs.bscroll.scrollTo(0, 0);
    }
  },

  computed: {
    //右上部数据
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },

    //详情数据
    showCategoryDetail() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    }
  }
};
</script>

<style scoped>
#category {
  height: 100vh;
}
/* 设置滚动高度，使滚动框架可以滚动 */
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  /* 导航栏的高度 */
  bottom: 49px;
  /*底部菜单栏的高度 */
  display: flex;
}
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
#tab-content {
  /* 右边滚动框架 */
  flex: 1;
  height: 100%;
}
.tab-control {
  /*position: sticky;  粘性布局定位，*/
  /* 结合了 position:relative 和 position:fixed 两种定位功能于一体的特殊定位  */
  /* top: 44px; */
  position: relative;
  z-index: 999;
}
</style>
