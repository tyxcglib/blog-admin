import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
import '../mock' // simulation data

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

// 引入 maven-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

// 引入axios
import  axios from  'axios'
Vue.prototype.$axios = axios
// 配置全局路径
axios.defaults.baseURL = 'http://localhost:8888'

// 引入qs
import  qs from  'qs'

// 格式化时间
import moment from 'moment'
//全局过滤器
Vue.filter('dateFmt',(input,formatString="YYYY-MM-DD")=>{

  return moment(input).format(formatString)
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
