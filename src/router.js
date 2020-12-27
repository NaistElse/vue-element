import VueRouter from 'vue-router'

// 导入路由组件

//import home from './pages/home.vue'
const home = r => require.ensure([], () => r(require('./pages/home.vue')), 'home')
const manage = r => require.ensure([], () => r(require('./pages/manage.vue')), 'manage')
const login = r => require.ensure([], () => r(require('./pages/login.vue')), 'login')
const reg = r => require.ensure([], () => r(require('./pages/register.vue')), 'reg')
const readerList = r => require.ensure([], () => r(require('./pages/readerList.vue')), 'readerList')
const bookList = r => require.ensure([], () => r(require('./pages/bookList.vue')), 'bookList')
const orderList = r => require.ensure([], () => r(require('./pages/orderList.vue')), 'orderList')
const addReader = r => require.ensure([], () => r(require('./pages/addReader.vue')), 'addReader')
const addAuthor = r => require.ensure([], () => r(require('./pages/addAuthor.vue')), 'addAuthor')
const addBook = r => require.ensure([], () => r(require('./pages/addBook.vue')), 'addBook')
const addBookInfo = r => require.ensure([], () => r(require('./pages/addBookInfo.vue')), 'addBookInfo')
const boreBook = r => require.ensure([], () => r(require('./pages/boreBook.vue')), 'boreBook')
const readerMap = r => require.ensure([], () => r(require('./pages/readerMap.vue')), 'readerMap')
const bookMap = r => require.ensure([], () => r(require('./pages/bookMap.vue')), 'bookMap')
const orderMap = r => require.ensure([], () => r(require('./pages/orderMap.vue')), 'orderMap')
const textEdit = r => require.ensure([], () => r(require('./pages/textEdit.vue')), 'textEdit')

//  创建路由对象
var router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/reg',
      component: reg
    },
    {
      path: '/home',
      component: home,
      name: '',
      children: [
        {
          path: '/manage',
          component: manage
        },
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
          path: '/addAuthor',
          component: addAuthor,
          meta: ['添加数据', '添加作者']
        },
        {
          path: '/addBook',
          component: addBook,
          meta: ['添加数据', '添加图书']
        },
        {
          path: '/addBookInfo',
          component: addBookInfo,
          meta: ['添加数据', '添加图书信息']
        },
        {
          path: '/boreBook',
          component: boreBook,
          meta: ['添加数据', '借书还书']
        },
        {
          path: '/readerMap',
          component: readerMap,
          meta: ['图表', '读者分布']
        },
        {
          path: '/bookMap',
          component: bookMap,
          meta: ['图表', '图书数据']
        },
        {
          path: '/orderMap',
          component: orderMap,
          meta: ['图表', '订单详情']
        },
        {
          path: '/textEdit',
          component: textEdit,
          meta: ['编辑', '文本编辑']
        }


    ]},


  ],
})


// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    if (!token) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router
