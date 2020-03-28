import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue() //创造$bus中央总线原型

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')