import VueRouter from 'vue-router'

// 导入路由组件

//import home from './pages/home.vue'
const home = r => require.ensure([], () => r(require('./pages/home.vue')), 'home')
const readerList = r => require.ensure([], () => r(require('./pages/readerList.vue')), 'readerList')
const bookList = r => require.ensure([], () => r(require('./pages/bookList.vue')), 'bookList')
const orderList = r => require.ensure([], () => r(require('./pages/orderList.vue')), 'orderList')
const addReader = r => require.ensure([], () => r(require('./pages/addReader.vue')), 'addReader')
const addBook = r => require.ensure([], () => r(require('./pages/addBook.vue')), 'addBook')

//  创建路由对象
var router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home,
      name: '',
      children: [
        {
          path: '/readerList',
          component: readerList,
          meta: ['数据管理', '读者列表']
        },
        {
          path: '/bookList',
          component: bookList,
          meta: ['数据管理', '图书列表']
        },
        {
          path: '/orderList',
          component: orderList,
          meta: ['数据管理', '借书列表']
        },
        {
          path: '/addReader',
          component: addReader,
          meta: ['添加数据', '添加读者']
        },
        {
          path: '/addBook',
          component: addBook,
          meta: ['添加数据', '添加图书']
        }

    ]},


  ],
})

export default router
