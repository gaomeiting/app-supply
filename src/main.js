import Vue from "vue"
import App from "./App.vue"
import router from "./router/router"
import store from "./store"
import axios from 'axios'
import message from 'ant-design-vue/lib/message'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
import '@/styles/index.scss' // global css
import 'normalize.css'

import './mock'  // simulation data
Vue.use(Antd)
Vue.config.productionTip = false;
Vue.prototype.$axios = axios
Vue.prototype.$message = message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
