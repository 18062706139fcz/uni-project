<template>
	<view>
		<view class="goods-list">
			<view v-for="(item, i) in goodsList" :key="i" @click="gotoDetail(item)">
				<view class="goods-item">
					<!-- 商品左侧的信息 -->
					<view class="goods-item-left">
						<image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image>
					</view>
					<!-- 商品右侧的信息 -->
					<view class="goods-item-right">
						<view class="goods-name">
							{{ item.goods_name }}
						</view>
						<view class="goods-info-box">
							<view class="goods-price">
								¥{{item.goods_price | toFixed}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 使用组件蛮容易出问题， 未解决 不用了。
	// import myGoods from '@/components/myGoods/myGoods'
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
					// 查询关键字
					query: '',
					// 商品分类Id
					cid: '',
					// 页码值
					pagenum: 1,
					// 每页显示多少条数据
					pageSize: 10
				},
				// 商品列表的数据
				goodsList: [],
				// 总数量，用来实现分页
				total: 0,
				isLoading: false,
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		onLoad(options) {
			// 将页面参数转存到 this.queryObj 对象中
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
			// console.log(this.goodsList)
		},
		methods: {
			async getGoodsList(cb) {
				this.isLoading = true
				const {data: res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				if(res.meta.status !== 200) return uni.$showMsg()
				this.isLoading = false
				cb && cb() // cb是有代码可以调用执行的
				// 为数据赋值
				this.goodsList = res.message.goods
				// 迭代
				// this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
				// console.log(this.goodsList)
				// console.log(this.goodsList)
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},
		onReachBottom() {
			// 判断是否触底
			if(this.queryObj.pagenum * this.queryObj.pageSize >= this.total) return uni.showMsg('数据加载完毕')
			
			if(this.isLoading) return
			// 让页码自增 1
			this.queryObj.pagenum += 1
			// 重新获取列表数据
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.total = 0
			this.isLoading = false
			this.goodsList = []
			this.getGoodsList(() => uni.stopPullDownRefresh())
		},
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods-item {
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
	.goods-item-left {
		margin-right: 5px;
		.goods-pic {
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.goods-item-right {
		display: flex;
		flex-direction: column;
		// 两边拉满了
		justify-content: space-between;
		
		.goods-name {
			font-size: 13px;
		}
		
		.goods-price {
			font-size: 16px;
			color: #c00000;
		}
	}
}
</style>
