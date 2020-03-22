<template>
  <div id="tab-bar-item" @click="itemClick">
    <div class="item-icon" v-show="!isActive">
      <slot name="icon"></slot>
    </div>

    <div class="item-active-icon" v-show="isActive">
      <slot name="active-icon"></slot>
    </div>

    <div class="text-icon" :style="activeStyle">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    //父子组件数据传输
    link: String,

    activeColor: {
      //动态设置导航栏文字颜色
      default: "red",
      type: String
    }
  },
  methods: {
    itemClick() {
      //点击跳转到对应页面
      this.$router.push(this.link);
    }
  },
  computed: {
    isActive() {
      //判断点击，显示对应颜色
      return this.$route.path.indexOf(this.link) !== -1;
    },
    activeStyle() {
      //导航栏点击时文字颜色
      return this.isActive ? { color: this.activeColor } : {};
    }
  }
};
</script>

<style scoped>
#tab-bar-item {
  flex: 1;
}

.item-icon img,
.item-active-icon img {
  height: 24px;
  width: 24px;
  vertical-align: middle;
  margin-top: 5px;
}

.text-icon {
  font-size: 12px;
  margin: 3px;
  color: #333;
}
</style>
