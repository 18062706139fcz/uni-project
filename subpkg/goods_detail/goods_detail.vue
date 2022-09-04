<template>
	<view>
		<view class="goods_detail_container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goods_info" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<view class="goods_info_box">
			<view class="price">
				¥ 100
			</view>
			<view class="goods_info_body">
				<view class="goods_name">
					fuck
				</view>
				<view class="favi">
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">
				快递：免运费 -- {{cart.length}}
			</view>
		</view>
		<view class="goods_nav">
			<!-- fill 控制右侧按钮的样式 -->
			<!-- options 左侧按钮的配置项 -->
			<!-- buttonGroup 右侧按钮的配置项 -->
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
		</view>
		<!-- <rich-text :nodes="goods_info.goods_introduce"></rich-text> -->
	</view>
	
	</view>
</template>

<script>
	
	// 从 vuex 中按需导出 mapState 辅助方法
	import { mapState } from 'vuex'
	import { mapMutations } from 'vuex'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				goods_info: [{
					pics_big: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6561e6b9fe6c4ae48e3393828713fe30~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.image',
				},{
					pics_big: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6561e6b9fe6c4ae48e3393828713fe30~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.image',
				},{
					pics_big: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6561e6b9fe6c4ae48e3393828713fe30~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.image',
				},
				// goods_name: 'fuck',
				// goods_price: 10
				],
				goods_id: 0,
				options: [{
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#ffffff'
				}, {
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#ffffff'
				}]
			};
		},
		onLoad(options) {
			// console.log(1)
			// // 获取 options上的 goods_id
			const goods_id = options.goods_id
			console.log(options.goods_id)
			// // 然后调用获取数据的方法
			// this.getGoodsDetail(goods_id)
		},
		methods: {
			// 记得传入参数
			async getGoodsDetail(goods_id) {
				// 这里的goods_id 是形式参数
				const {data: res} = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
				if(res.status !== 200) return uni.$showMsg()
				// 利用正则表达式来操作
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /, '<img style="display: block;"').replace(/webp/g, 'jpg')
				this.goods_info = res.message
				console.log(this.goods_info)
			},
			// 不是很清楚数据格式，但是用来预览的！
			// preview(i) {
			// 	uni.previewImage({
			// 		current: i,
			// 		urls: this.goods_info.pics.map(x => x.pics_big)
			// 	})
			// }
			onClick(e) {
				console.log(e)
			},
			buttonClick(e) {
				/**
				 * if(e.content.text === '加入购物车') {
					 const goods = {
						 goods_id = this.goods_info.goods_id,
						 goods_name = this.goods_info.goods_name,
						 goods_price = this.goods_info.goods_price,
						 goods_count: 1,
						 goods_small_logo: this.goods_info.goods_small_logo,
						 goods_state: true
					 }
					 this.addToCart(goods)
				 }
				 * */
			}
		},
		computed: {
			// 调用 mapState 方法，把 m_cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
			// ...mapState('要映射的数据名称', ['要映射的数据模块名称1', '要映射的数据模块名称2'])
			...mapState('m_cart', ['cart']),
			...mapMutations('m_cart', ['addToCart']),
			...mapGetters('m_cart', ['total'])
		},
		watch: {
			// 当total的值发生变化了的时候
			/********************  useful thing  ***********************/ 
			// 但是使用 watch 页面首次加载的时候并不会被调用，可以使用对象的形式来定义  ！！！
			// total(newVal) {
			// 	// 找到有购物车的这个玩意
			// 	const findResult = this.options.find((x) => x.text === '购物车')
			// 	if(findResult) {
			// 		findResult.info = newVal
			// 	}
			// }
			total: {
				handler(newVal) {
					const findResult = this.options.find((x) => x.text === '购物车')
					if(findResult) {
						findResult.info = newVal
					}
				}
				// immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
				// immediate: true
			}
		}
	}
</script>

<style lang="scss">
swiper {
	height: 750rpx;
	image {
		height: 750rpx;
		width: 100%;
	}
}
.goods_info_box {
	padding: 10px;
	padding-right: 0;
	.price {
		font-size: 18px;
		margin: 10px 0;
		color: #C00000;
	}
	.goods_info_body {
		display: flex;
		justify-content: space-between;
		.goods_name {
			font-size: 13px;
			padding-right: 10px;
		}
		.favi {
			width: 120px;
			font-style: 12px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-left: 1px solid #efefef;
			color: grey;
		}
	}
	.yf {
		margin: 10px 0;
		color: grey;
		font-size: 12px
	}
}.goods_detail_container {
	padding-bottom: 50px;
}
.goods_nav {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
</style>
