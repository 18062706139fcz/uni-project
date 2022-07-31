import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Blog from '@/views/Blog'
import Chat from '@/views/Chat'
import Form from '@/views/Form'
import Goods from '@/views/Goods'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/blog',
    name: 'blog',
    component: Blog
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat
  },
  {
    path: '/form',
    name: 'form',
    component: Form
  },
  {
    path: '/goods',
    name: 'goods',
    component: Goods
  }
]

const router = new VueRouter({
  routes
})

export default router
