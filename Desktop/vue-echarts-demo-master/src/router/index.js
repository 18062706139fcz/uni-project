/*
 * @Descripttion: 
 * @Author: Wang Dejiang(aei)
 * @Date: 2022-07-22 23:32:12
 * @LastEditors: Wang Dejiang(aei)
 * @LastEditTime: 2022-07-23 00:23:49
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/test1',
    name: 'Test1',
    component: () => import( '../views/Test1.vue')
  },
  {
    path: '/test2',
    name: 'Test2',
    component: () => import( '../views/Test2.vue')
  },
  {
    path: '/test3',
    name: 'Test3',
    component: () => import( '../views/Test3.vue')
  },
  {
    path: '/test4',
    name: 'Test4',
    component: () => import( '../views/Test4.vue')
  },
  {
    path: '/test5',
    name: 'Test5',
    component: () => import( '../views/Test5.vue')
  },
  {
    path: '/test6',
    name: 'Test6',
    component: () => import( '../views/Test6.vue')
  },
  {
    path: '/test7',
    name: 'Test7',
    component: () => import( '../views/Test7.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
