import Vue from 'vue' //入口文件

import VueRouter from 'vue-router' // 导入路由
Vue.use(VueRouter)

import Vuex from 'vuex' // 导入vuex
Vue.use(Vuex)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import './element-variables.scss'
//import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

import Axios from 'axios'
import VueAxios from 'vue-axios'
Axios.defaults.baseURL = 'http://127.0.0.1:8000/'
Axios.defaults.headers.post['Content-Type'] = 'application/json'
//Axios.defaults.headers.post['Content-Type'] = 'application/form-data'

import app from './App.vue'

import router from './router.js'

Vue.use(VueAxios, Axios)

import moment from 'moment'
Vue.prototype.$moment = moment

import echarts from 'echarts'
Vue.prototype.$echarts = echarts



const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '' // 存储token
  },
  mutations: {
   // 修改token，并将token存入localStorage
   changeLogin (state, user) {
     state.token = user.token
     localStorage.setItem('token', user.token)
   }
 }
})


// 添加请求拦截器，在请求头中加token
Axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = localStorage.getItem('token')
    }

    return config
  },
  error => {
    return Promise.reject(error)
  })




var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store
})
