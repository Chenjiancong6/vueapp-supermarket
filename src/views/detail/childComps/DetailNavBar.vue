<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt />
    </div>
    <div slot="center" class="title">
      <div
        v-for="(item,index) in titles"
        @click="titleClick(index)"
        :class="{active:index===currentindex}"
        :key="index"
        class="titles-item"
      >{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"; //引入导航栏
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  props: {
    titles: {
      type: Array,
      default: () => {
        return ["商品", "参数", "评论", "推荐"];
      }
    }
  },
  data() {
    return {
      currentindex: 0
    };
  },

  methods: {
    //返回上一层
    backClick() {
      this.$router.back();
    },

    //点击跳转到对应["商品", "参数", "评论", "推荐"]
    titleClick(index) {
      this.currentindex = index;
      this.$emit("titleClick", index);
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
}
.titles-item {
  flex: 1;
}
.titles-item.active {
  color: var(--color-high-text);
  font-size: 17px;
  font-weight: bold;
}
.back img {
  margin-top: 12px;
}
</style>