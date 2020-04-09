<template>
  <div>
    <b-scroll class="cart-list" ref="bscroll">
      <cart-list-item v-for="item in $store.state.cartList" :key="item.iid" :item-info="item"></cart-list-item>
    </b-scroll>
  </div>
</template>

<script>
import BScroll from "components/common/bscroll/BScroll"; //滚动框架
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  components: {
    BScroll,
    CartListItem
  },
  destroyed() {
    this.$refs.bscroll.scroll.refresh(); //刷新
  }
};
</script>

<style scoped>
.cart-list {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 93px;
}
</style>