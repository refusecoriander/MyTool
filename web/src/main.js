import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './registerServiceWorker'
import '@/assets/css/theme/index.css'
import allmenu from "./global/index.js"
Vue.use(allmenu)
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import './assets/css/global.css'

import axios from 'axios'


Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api',
  // baseURL: 'http://192.168.96.159:3000/web/api'
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
