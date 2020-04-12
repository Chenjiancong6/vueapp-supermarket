<!-- 
   //右边上部二维图片菜单
-->
<template>
  <div class="tab-right-category">
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
      <div class="item" v-for="(item,index) in subcategories.list" :key="index">
        <img class="item-img" :src="item.image" @load="imageLoaded" alt />
        <div class="item-title">{{item.title}}</div>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from "components/common/gridView/GridView";
export default {
  name: "TabRightCategory",
  components: { GridView },
  props: {
    subcategories: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoaded: false //tabcontroll吸顶效果
    };
  },

  methods: {
    imageLoaded() {
      //tabcontroll吸顶效果
      if (!this.isLoaded) {
        //if判断只执行一次,图片没加载完为false,加载完为true
        this.$emit("swiperLoaded");
        this.isLoaded = true;
      }
    }
  }
};
</script>

<style scoped>
.item {
  text-align: center;
  font-size: 12px;
}

.item-img {
  width: 80%;
}

.item-text {
  margin-top: 15px;
}
</style>