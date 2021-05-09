import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index.vue'
import About from '../pages/about.vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    //ルーティングの設定
    {
      path: '/',
      component: Index,
    },
    {
      path: '/about',
      component: About,
    },
  ],
})
export default router
