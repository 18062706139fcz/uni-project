export default {
	// 为当前模块开启命名空间
	namespaced: true,
	
	// 模块的 state 数据
	state: () => ({
	// 购物车的数组，用来存储购物车中每个商品的信息对象
	// 每个商品的信息对象，都包含如下 6 个属性：
	// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
	// 获取 或者 啥都没有
		cart: JSON.parse(uni.getStorageSync('cart')||'[]')
	}),
	
	// 模块的mutations方法
	mutations: {
		addToCart(state, goods) {
			// 根据提交的商品的Id，查询购物车中是否存在这件商品
			// 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
			const findResult = state.cart.find((x) => x.goods_name === goods.goods_name)
			if(!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count ++
			}
			// 使用 commit 调用m_cart命名空间下的 saveStorage
			this.commit('m_cart/saveStorage')
		},
		saveStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		}
	},
	
	// 模块的getters方法
	getters: {
		// 获取所有值的方法
		total(state) {
			let all = 0;
			state.cart.forEach((item) => all += item.goods_count)
			return all
		}
	}
}