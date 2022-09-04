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
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
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
		},
		updateGoodsState(state, goods) {
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			// 只有找到了才会，也才能变更状态
			if(findResult) {
				// 更新对应商品的勾选状态
				findResult.goods_state = goods.goods_state
				// 持久化存储到本地
				this.commit('m_cart/saveStorage')
			}
		},
		updateGoodsCount(state, goods) {
			// 找到这个东西
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			if(findResult) {
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveStorage')
			}
		},
		removeGoodsById(state, goods) {
			state.cart = state.cart.filter(x => x.goods_id != goods.goods_id)
			this.commit('m_cart/saveStorage')
		}, 
		updateAllGoodsState(state, newState) {
			// 这里forEach是原地操作
			state.cart.forEach(x => x.goods_state = newState)
			// 持久化存储到本地
			this.commit('m_cart/saveStorage')
		}
	},
	
	// 模块的getters方法
	getters: {
		// 获取所有值的方法
		total(state) {
			let all = 0;
			state.cart.forEach((item) => all += item.goods_count)
			return all
		},
		// 用来统计已勾选商品的总数量
		checkCount(state) {
			// 先用filter方法，从购物车中过滤已勾选商品
			// 再使用reduce方法，将已勾选的商品总数量进行累加
			// reduce() 的返回值就是已勾选的商品的总数量
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		// 已勾选的商品的总价格
		checkGoodsAmount(state) {
			return state.cart.filter(x => x.goods_state)
							 .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
							 .toFixed(2)
		}
	}
}