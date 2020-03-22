<template>
  <tab-bar>
    <tab-bar-item link="/home" activeColor="yellow">
      <img src="~assets/img/tabbar/home.svg" slot="icon" />
      <img src="~assets/img/tabbar/home_active.svg" slot="active-icon" />
      <div slot="text">首页</div>
    </tab-bar-item>

    <tab-bar-item link="/category">
      <img src="~assets/img/tabbar/category.svg" slot="icon" />
      <img src="~assets/img/tabbar/category_active.svg" slot="active-icon" />
      <div slot="text">分类</div>
    </tab-bar-item>

    <tab-bar-item link="/shopcart">
      <img src="~assets/img/tabbar/shopcart.svg" slot="icon" />
      <img src="~assets/img/tabbar/shopcart_active.svg" slot="active-icon" />
      <div slot="text">购物车</div>
    </tab-bar-item>

    <tab-bar-item link="/profile">
      <img src="~assets/img/tabbar/profile.svg" slot="icon" />
      <img src="~assets/img/tabbar/profile_active.svg" slot="active-icon" />
      <div slot="text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar.vue";
import TabBarItem from "components/common/tabbar/TabBarItem.vue";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>
