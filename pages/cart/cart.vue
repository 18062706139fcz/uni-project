<template>
	<view>
		
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import badgeMix from '@/mixins/tabberBadge.js'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			setBadge() {
				uni.setTabBarBadge({
					index: 2,
					text: this.total + ''
				})
			}
		},
		computed: {
			// 将 m_cart 里的total映射为cart页面的计算属性
			...mapGetters('m_cart', ['total'])
		},
		onShow() {
			// uni.setTabBarBadge
			this.setBadge()
		},
		mixins: [badgeMix]
	}
</script>

<style>

</style>
