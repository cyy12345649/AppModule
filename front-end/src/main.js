import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入axios
import axios from 'axios';

// 创建一个axios实例，默认设置headers等
const instance = axios.create({
  baseURL: 'http://localhost:3000', // Express服务器地址
});

Vue.prototype.$http = instance; // 将axios实例添加到Vue的原型链上，方便在组件中使用this.$http

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
