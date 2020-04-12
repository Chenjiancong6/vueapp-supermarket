<template>
  <transition class="fade">
    <div class="toast" v-show="isShow">{{message}}</div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow: false, //默认弹窗为隐藏
      message: ""
    };
  },

  methods: {
    //默认时间为2000毫秒
    show(message = "弹窗内容为空", duration = 2000) {
      this.message = message;
      this.isShow = true;

      //设置定时器销毁
      setTimeout(() => {
        this.message = "";
        this.isShow = false;
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  color: #fff;
  z-index: 99;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>