<template>
  <div class="goods-list">
    <goods-list-item class="item" v-for="item in goods" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  /* 让弹性盒元素在必要的时候拆行(换行)： */
  justify-content: space-around;
  /* 在弹性盒对象的 <div> 元素中的各项周围留有空白： */
  padding: 5px;
}
.goods-list .item {
  width: 48%;
}
</style>