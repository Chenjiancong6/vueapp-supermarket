<!--
 回到顶部按钮
-->
<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt />
  </div>
</template>

<script>
export default {
  name: "BackTop"
};
</script>

<style scoped>
.back-top {
  position: fixed;
  z-index: 9;
  bottom: 55px;
  right: 5px;
  width: 45px;
  height: 45px;
  filter: opacity(0.6);
}
.back-top img {
  width: 100%;
}
</style>