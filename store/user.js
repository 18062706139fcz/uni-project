export default {
	// 开启命名空间
	namespaced: true,
	
	// state 数据
	state: () => ({
		// 收货地址
		address: JSON.parse(uni.getStorageSync('address')||'{}'),
	}),
	
	// 方法
	mutations: {
		updateAddress(state, address) {
			state.address = address
			
			this.commit('m_user/saveAddressToStorage')
		},
		// 因为是公用的存储方法，所以最好不要直接写在updateAddress里面
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		}
	},
	
	// 数据包装器
	getters: {}
}