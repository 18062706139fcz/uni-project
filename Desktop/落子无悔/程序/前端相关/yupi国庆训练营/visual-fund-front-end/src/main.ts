/*
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-10-03 09:48:36
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-10-03 19:11:09
 * @FilePath: /visual-fund-front-end/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'

import * as VueRouter from "vue-router"
// 从路由模块导入 router
import routes from './router/router';
import './assets/css/normalize.css'

import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
// 挂载路由
const router = VueRouter.createRouter({
    // 有后端 我就直接选择了 history模式了
    history: VueRouter.createWebHistory('/'),
    routes, // `routes: routes` 的缩写
})
// 使用路由
app.use(router)
// 注册 element 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.mount('#app')
