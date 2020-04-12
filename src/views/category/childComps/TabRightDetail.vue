<!--分类页面右边下部模块-->
<template>
  <grid-view>
    <goods-list-item v-for="(item,index) in categoryDetail" :goods-item="item" :key="index"></goods-list-item>
  </grid-view>
</template>

<script>
import GridView from "components/common/gridView/GridView";
import GoodsListItem from "components/content/goods/GoodsListItem";
export default {
  name: "TabRightDetail",
  components: {
    GridView,
    GoodsListItem
  },
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
</style>