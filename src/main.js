import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'components/common/toast' //自己创建的toast插件

Vue.use(Toast); //使用toast插件

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue() //创造$bus中央总线原型

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')