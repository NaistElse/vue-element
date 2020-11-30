import Vue from 'vue' //入口文件

import VueRouter from 'vue-router' // 导入路由
Vue.use(VueRouter)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import './element-variables.scss'
//import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

import Axios from 'axios'
import VueAxios from 'vue-axios'
Axios.defaults.baseURL = '/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json'

import app from './App.vue'

import router from './router.js'

Vue.use(VueAxios, Axios)

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router
})
