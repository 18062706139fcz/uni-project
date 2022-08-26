<template>
	<view class="search-box">
		<!-- 使用了一个搜索的组件 -->
		<!-- <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar> -->
		<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @blur="blur" @focus="focus" @input="input"
			@cancel="cancel" @clear="clear">
		</uni-search-bar>
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item, i) in searchResults" :key="i">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="trash" size="17"></uni-icons>
				<!-- <uni-icons type="circle-filled" size="17"></uni-icons> -->
			</view>
		</view>
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<view class="trash">
					DELETE
				</view>
			</view>
			<view class="history-list">
				<uni-tag :text="item" v-for="(item, i) in historys" :key="i" type="default" @click="gotoGoodsList(item)"></uni-tag>
				<!-- <uni-tag text="标签" type="primary" /> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// input: ''
				searchValue: '',
				// 用来设置防抖的函数
				timer: null,
				// 用来放搜索结果的
				searchResults: [],
				// historyList 搜索历史的假数据
				historyList: ['a', 'ab', 'abc']
			};
		},
		onLoad() {
			// 获取本地历史记录
			this.historyList = JSON.parse(uni.getStorageSync('kw')||"[]")
		},
		computed: {
			historys() {
				return [...this.historyList].reverse()
			}
		},
		methods: {
			focus(e) {
				uni.showToast({
					title: 'focus事件，输出值为：' + e.value,
					icon: 'none'
				})
			},
			cancel(res) {
				uni.showToast({
					title: '点击取消，输入值为：' + res.value,
					icon: 'none'
				})
			},
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			// 可以设置防抖函数
			input(res) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.searchValue = res
					// console.log(this.searchValue)
					this.getSearchList()
				},500)
			},
			clear(res) {
				uni.showToast({
					title: 'clear事件，清除值为：' + res.value,
					icon: 'none'
				})
			},
			blur(res) {
				uni.showToast({
					title: 'blur事件，输入值为：' + res.value,
					icon: 'none'
				})
			},
			getHistoryList() {
				// this.historyList.push(this.searchValue)
				// 获取 set 列表， 主要是为了去重
				const set = new Set(this.historyList)
				// 删除其中的 searchValue
				set.delete(this.searchValue)
				// 添加
				set.add(this.searchValue)
				// 数组化
				this.historyList = Array.from(set)
				// 得存 JSON 数据格式的数据
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			clearHistory() {
				this.historyList = []
				uni.setStorageSync('kw', '')
			},
			async getSearchList() {
				if(this.searchValue === '') {
					this.searchResults = []
					return ;
				}
				const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch' , {query: this.searchValue})
				if(res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
				// console.log(this.searchResults)
				this.getHistoryList()
			},
			gotoGoodsList(kw) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query' + kw
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}
	.sugg-list {
		padding: 0 5px;
	}
	.sugg-item {
		font-size: 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #efefef;
	}
	.goods-name {
		// 不允许换行
		white-space: nowrap;
		overflow: hidden;
		// 用省略号代替
		text-overflow: ellipsis;
		margin-right: 3px;
	}
	.history-box {
		padding: 0 5px;
		.history-title {
			border-bottom: 1px solid #efefef;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 13px;
		}
		.history-list {
			display: flex;
			flex-wrap: wrap;
			uni-tag {
				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}
</style>
