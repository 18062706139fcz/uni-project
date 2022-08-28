import App from './App'
// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'

import store from '@/store/store.js'

uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://api-ugo-web.itheima.net'

$http.beforeRequest = function (options) {
	uni.showLoading({
		title: '数据加载中...',
	})
}

$http.afterRequest = function () {
	uni.hideLoading()
}

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif


// 封装请求失败的方法
uni.$showMsg = function (title = '数据加载失败', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none',
	})
}