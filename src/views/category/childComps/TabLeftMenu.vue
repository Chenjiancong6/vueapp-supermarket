<template>
  <b-scroll id="scroll-menu">
    <div class="tab-left-menu">
      <div
        class="menu-item"
        v-for="(item,index) in categories"
        :key="index"
        :class="{active:index===currentIndex}"
        @click="itemClick(index)"
      >{{item.title}}</div>
    </div>
  </b-scroll>
</template>

<script>
import BScroll from "components/common/bscroll/BScroll"; //滚动框架
export default {
  name: "TabLeftMenu",
  components: { BScroll },
  props: {
    categories: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },

  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("selectItem", index); //把内部事件传递出去
    }
  }
};
</script>

<style scoped>
#scroll-menu {
  height: 100%;
  width: 100px;
  box-sizing: border-box;
  background-color: #f6f6f6;
}

.menu-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}

.menu-item.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>