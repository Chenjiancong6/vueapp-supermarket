<template>
  <div class="button-menu">
    <check-button class="select-all" :is-checked="isSelect" @click.native="checkBtnClick"></check-button>
    <span>全选</span>
    <span class="total-price">合计:{{totalPrice}}</span>
    <span class="buy-product">去计算:({{calculation}})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
  name: "CartButtonBar",
  components: {
    CheckButton
  },

  computed: {
    //底部全选按钮状态显示
    isSelect() {
      //1.初始化状态，默认底部按钮没选中
      if (this.$store.state.cartList.length === 0) return false;

      //2.只要有一个商品没选中，底部按钮不选中
      for (let item of this.$store.state.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    },

    //计算商品价格
    totalPrice() {
      //使用过滤器的方法计算选中和价格:filter()
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked; //过滤的条件
          })
          .reduce((preValue, item) => {
            /*reduce()汇总函数的使用,所有值汇总
          (preValue是上一个值，item是当前值,0是默认第一次为0)*/
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2) //取两位小数
      );
    },

    //计算多少件商品
    calculation() {
      return this.$store.state.cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
    }
  },

  methods: {
    //底部按钮点击效果：全选或全不选
    checkBtnClick() {
      if (this.isSelect) {
        //底部按钮处于选中时，点击一次，让所有商品不选中
        this.$store.state.cartList.forEach(item => {
          item.checked = false;
        });
      } else {
        this.$store.state.cartList.forEach(item => {
          item.checked = true;
        });
      }
    }
  }
};
</script>

<style scoped>
.button-menu {
  width: 100%;
  height: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  position: fixed;
  background-color: #eee;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}
.button-menu .select-all {
  position: absolute;
  left: 12px;
  top: 13px;
  line-height: 0;
}
.button-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}
.button-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>