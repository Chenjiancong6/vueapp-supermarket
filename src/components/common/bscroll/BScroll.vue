<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "BScroll",
  props: {
    probeType: {
      //监听滚动数字,当是3时滚动才起作用
      type: Number,
      default: 0
    },
    pullUpLoad: {
      //上加载更多
      type: Boolean,
      default: false
    }
  },
  data() {
    //保存数据
    return {
      scroll: null
    };
  },

  mounted() {
    //生命周期

    //this.scroll获取滚动
    this.scroll = new BScroll(this.$refs.wrapper, {
      //this.$refs.wrapper,获取唯一div元素

      click: true, //设置true才能被点击
      probeType: this.probeType, //设置为3才能被监听滚动
      pullUpLoad: this.pullUpLoad //特定页面数据加载更多
    });

    //监听滚动，完成上拉加载更多商品图片
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp"); //$emit把内部数据传输出去
    });

    //监听滚动位置，把backTop组件显示和隐藏
    this.scroll.on("scroll", position => {
      this.$emit("scroll", position);
    });
  },

  methods: {
    //获取自带加载更多的内置函数 finishedPullUp()
    finishedPullUp() {
      //在这里定义好函数方法，把函数传出home.vue 里
      this.scroll && this.scroll.finishPullUp();
    },

    //refresh()函数获取加载图片,防卡顿
    refresh() {
      //console.log("--防抖函数测试---");
      this.scroll && this.scroll.refresh();
    },

    //原生scrollTo()函数，点击回到顶部
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    //home离开时记录状态和位置
    getscrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}
</style>
