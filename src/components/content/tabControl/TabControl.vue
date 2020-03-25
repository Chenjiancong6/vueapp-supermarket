<!--
- 首页中部导航栏
-->
<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item,index) in titles"
      :class="{active:currentIndex===index}"
      @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0 //设点击‘流行’导航栏初始值为0，同时用index判断增加
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index; //点击时修改index的值

      this.$emit("tabClick", index); //点击切换页面，并传递出index的值
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  line-height: 40px;
  font-size: 15px;
  background-color: #ffff;
  z-index: 9;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}

.active {
  /* 选中时颜色改变 */
  color: var(--color-high-text);
  font-size: 17px;
  font-weight: bold;
}

.tab-control-item.active span {
  border-bottom: 2px solid var(--color-high-text);
  /* 文字下划线条 */
}
</style>