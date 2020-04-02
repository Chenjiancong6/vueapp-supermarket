<template>
  <div class="goods-list-item" @click="itemClick">
    <img :src="showImage" @load="imgageLoad" />
    <!-- @load="imageLoad":获取加载图片数量 -->
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage() {
      return (
        this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      );
    }
  },

  methods: {
    //使用中央时间总线，传递出加载图片给home.vue
    imgageLoad() {
      this.$bus.$emit("itemImageLoad");
    },

    //点击跳转到详情页
    itemClick() {
      //1. 获取对应图片的iid
      const iid = this.goodsItem.iid;

      //2. 点击跳转到详情页
      this.$router.push({
        path: "/detail",
        query: { iid }
      });
    }
  }
};
</script>

<style scoped>
.goods-list-item {
  padding-bottom: 40px;
  /*padding-bottom ：为下面文字绝对定位预留空间  */
  position: relative;
  /* 子绝父相 */
}
.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  /* 子绝父相 */
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
  /* 文字超出部分隐藏 */
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  /* 伪类元素，在文字前设置一个图片 */
  content: "";
  position: absolute;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  width: 14px;
  height: 14px;
  left: -15px;
  top: -1px;
}
</style>
