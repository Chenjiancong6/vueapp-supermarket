<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="center">我的中心</div>
    </nav-bar>

    <user-info></user-info>
    <account-info></account-info>
    <normal-list-view :list-data="orderList" />
    <normal-list-view :list-data="serverList" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"; //顶部导航栏
import UserInfo from "./childComps/UserInfo"; //基本信息
import AccountInfo from "./childComps/AccountInfo"; //账户信息
import NormalListView from "./childComps/NormalListView";
export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    AccountInfo,
    NormalListView
  },

  data() {
    return {
      orderList: [
        { icon: "message.svg", info: "我的消息" },
        { icon: "pointer.svg", info: "积分商场" },
        { icon: "vip.svg", info: "会员卡" }
      ],
      serverList: [
        { icon: "cart.svg", info: "我的购物车" },
        { icon: "shopping.svg", info: "下载购物APP" }
      ]
    };
  }
};
</script>

<style scoped>
#profile {
  background-color: #f2f2f2;
  /* 我的背景颜色 */
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
