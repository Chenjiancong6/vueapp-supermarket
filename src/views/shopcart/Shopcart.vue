<template>
  <div id="shopcart">
    <nav-bar class="navbar">
      <div slot="center">大哈克的购物车({{$store.state.cartList.length}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-button-bar></cart-button-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList"; //商品信息
import CartButtonBar from "./childComps/CartButtonBar";
export default {
  name: "ShopCart",
  components: {
    NavBar,
    CartList,
    CartButtonBar
  }
};
</script>

<style scoped>
.navbar {
  background-color: var(--color-tint);
  color: #ffff;
  font-weight: 700;
}
</style>
