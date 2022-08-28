<template>
	<view>
		<!-- search -->
		<view class="searchBox">
			<mySearch @click="gotoSearch"></mySearch>
		</view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<!-- 因为是动态绑定，src下要加":" -->
					 <image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航栏区域 -->
		<view class="nav-list">
			<!-- 注意加都好分隔 -->
			<!-- 绑定点击切换事件 -->
			<view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		<!-- 楼层 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" mode="widthFix" :style="{width: item.product_list[0].image_width + 'rpx'}"></image>
					</navigator>
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mySearch from '@/components/mySearch/mySearch.vue'
	import badgeMix from '@/mixins/tabberBadge.js'
	export default {
		// mixins: [badgeMix],
		data() {
			return {
				// 实现轮播图区域
				swiperList: [],
				// 实现分页导航区域
				navList: [],
				// 获取楼层信息
				floorList: []
			};
		},
		onLoad() {
			// 获取轮播图信息
			this.getSwiperList()
			// 获取导航栏信息
			this.getNavList()
			// 获取楼层信息
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message
			},
			async getNavList() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
				// console.log(this.navList)
			},
			async getFloorList() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status !== 200) return uni.$showMsg()
				// 修改url
				res.message.forEach((floor) => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
						// console.log(prod.url)
					})
				})
				
				this.floorList = res.message
				// console.log(this.floorList)
			},
			navClickHandler(item) {
				if(item.name === '分类')
					uni.switchTab({
						url: '/pages/cate/cate'
				})
			},
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		},
		mixins: [badgeMix],
	}
</script>

<style lang="scss">
.searchBox {
	position: sticky;
	top: 0;
	z-index: 999;
	// height: 50px;
}
swiper {
	height: 330rpx;
	.swiper-item 
	image {
		width: 100%;
		// 这里设置 100% 出现了问题 
		height: 330rpx;
	}
}

.nav-list {
	display: flex;
	justify-content: space-around;
	margin: 15px 0;
	// nav-item就得不到想要的效果，得精确到图片上
	.nav-img {
		height: 140rpx;
		width: 128rpx;
	}
}

.floor-title {
	display: flex;
	height: 60rpx;
	width: 100%;
}

.floor-img-box {
	display: flex;
	padding-left: 10rpx;
}
.right-img-box {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	// margin-left: ;
}
</style>
