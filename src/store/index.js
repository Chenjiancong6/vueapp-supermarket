import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cartList: [], // 创建一个数组保存加入购物车的商品数据
  },

  //异步操作
  actions: {
    //payload：为新点击添加的商品
    //actions 的函数必须要有context 传值
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        /**1.用for循环进行判断，
         *当前点击添加到购物车的商品是否之前已经点击过，
         **/
        let oldProduct = null;
        for (let item of context.state.cartList) {
          //如果数组中已经有的该商品，就不创造新的商品
          if (item.iid === payload.iid) {
            oldProduct = item;
          }
        }

        //如果商品已经加入过购物车，数量+1
        if (oldProduct) {
          //把经过异步处理的数据发送到mutations，进行记录改变状态
          context.commit("addCounter", oldProduct);
          resolve("商品数量加1");
        } else {
          context.commit("addToCard", payload); //并把新添加的商品push()加入保存
          resolve("添加新的商品");
        }
      });
    },
  },

  //记录改变状态
  mutations: {
    addCounter(state, payload) {
      //payload===oldProduct
      payload.count++; //商品已经加入过购物车，数量+1
    },
    addToCard(state, payload) {
      payload.count = 1; //payload 新添加的商品
      state.cartList.push(payload); //并把新添加的商品push()加入保存
    },
  },
});

//导出
export default store;
