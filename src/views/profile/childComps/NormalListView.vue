<template>
  <div class="normal-list">
    <div class="item" v-for="(item,index) in listData" :key="index">
      <span class="icon">
        <img :src="itemURL(item)" alt />
      </span>
      <div class="info" @click="shop">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NormalListView",
  props: {
    listData: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  methods: {
    itemURL(item) {
      //   图片地址，用父子组件传递进来
      return require("assets/img/profile/" + item.icon);
    },
    shop() {
      this.$router.push({
        path: "/shopcart"
      });
    }
  }
};
</script>

<style scoped>
.normal-list {
  background-color: #fff;
  font-size: 15px;
  color: #333;
  margin-top: 11px;
}
.icon img {
  /* 设置图片大小 */
  width: 20px;
  height: 20px;
}
.normal-list .item {
  height: 44px;
  position: relative;
  line-height: 44px;
}
.item .icon {
  margin-top: 10px;
  position: absolute;
  left: 16px;
  top: -7px;
}
.item .info {
  margin-left: 40px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding-left: 5px;
}

.item:last-of-type .info {
  border-bottom: none;
  /* :last-of-type，伪类元素，最后一个没有下划线 */
}
</style>