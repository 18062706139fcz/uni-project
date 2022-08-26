<template>
	<view class="my-search-container" :style="{'background-color': bgcolor}" @click="searchBoxHandler">
		<!-- 别忘了加px -->
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}">
			<uni-icons type="circle-filled" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"mySearch",
		data() {
			return {
				
			};
		},
		props: {
			bgcolor: {
				type: String,
				default: '#C00000'
			}, 
			radius: {
				type: Number,
				default: 18
			}
		},
		methods: {
			searchBoxHandler() {
				// 触发外界通过click绑定的click处理函数
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.my-search-container {
	height: 50px;
	// background-color: #C00000;
	padding: 0 10px;
	display: flex;
	align-items: center;
}
.my-search-box {
	background-color: #fff;
	width: 100%;
	// border-radius: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	.placeholder {
		font-size: 15px;
		margin-left: 5px;
		font-weight: bold;
	}
}
</style>