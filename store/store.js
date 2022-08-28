// 1. 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from './cart.js'
// 2. 将 Vuex 安装为 Vue 的插件
Vue.use(Vuex)

// 3. 创建 store 实例
const store = new Vuex.Store({
	// 挂载 store 模块
	modules: {
		m_cart: moduleCart
	},
})
// 4. 向外导出 store 的实例对象
export default store