<!--
   //账户信息
-->
<template>
  <div class="account">
    <div class="account-item" v-for="(item,index) in myAccount" :key="index">
      <div class="nunber">
        <span class="balance">{{item.number}}</span>
      </div>
      <div class="account-info">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountInfo",
  props: {
    myAccount: {
      type: Array,
      default() {
        return [
          { number: "52.0元", title: "我的余额" },
          { number: "1个", title: "我的优惠" },
          { number: "30分", title: "我的积分" }
        ];
      }
    }
  }
};
</script>

<style scoped>
.account {
  display: flex;
  /* 弹性布局 */
}
.account-item {
  flex: 1;
  width: 100%;
  background-color: #fff;
  margin-right: 2px;
  text-align: center;
  font-size: 13px;
  color: #666;
  padding: 12px;
}
.account-item .balance {
  color: #ff5f3e;
  font-weight: 700;
  font-size: 24px;
}
.account-info {
  margin-top: 6px;
}
</style>