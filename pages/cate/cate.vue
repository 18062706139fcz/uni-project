<template>
	<view>
		<mySearch @click="gotoSearch"></mySearch>
		<view class="scroll-view-container">
			<!-- :style="{height: wh + 'px'}"是干嘛的？？？ -->
			<scroll-view scroll-y :style="{height: wh + 'px'}" class="left-scroll-view">
				<block v-for="(item, i) in cateList" :key="i">
					<!-- 动态绑定值 -->
					<view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChanged(i)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<scroll-view scroll-y class="right-scroll-view" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view v-for="(item2, i2) in cateList2" :key="i2">
					<!-- 渲染二级分类的列表 -->
					<view class="cate-lv2-title">/{{ item2.cat_name }}/</view>
					<!-- 三级分类的列表 -->
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
							<!--  -->
							<!-- <image :src="item3.cat_icon" alt=""></image> -->
							<image src="../../static/find_off.png" mode=""></image>
							<text>{{ item3.cat_name }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// 应该主要是路径问题
	import mySearch from '@/components/mySearch/mySearch.vue'
	export default {
		// 需要注册组件的嗷
		components: {mySearch},
		data() {
			return {
				// 窗口可用高度 = 视图高度 - tabBar高度 - navigator高度
				wh: 0,
				// 获取商品列表
				cateList: [],
				// 判断是否“选中” 即是否为 active
				active: 0,
				// 二级分类列表
				cateList2: [],
				// 滚动条距离顶部的距离
				scrollTop: 0
			};
		},
		onLoad() {
			// get system info
			const sysInfo = uni.getSystemInfoSync()
			// give wh value dynamically
			this.wh = sysInfo.windowHeight - 50
			// 获取左侧categories信息
			this.getCateList()
		},
		methods: {
			async getCateList() {
				const { data: res } = await uni.$http.get('/api/public/v1/categories')
				// 这里需要返回
				if(res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				// console.log(this.cateList)
				// 为二级分类赋值
				this.cateList2 = res.message[0].children
			},
			// 改变对应的 active 值
			activeChanged(i) {
				this.active = i;
				// 为二级分类重新赋值
				this.cateList2 = this.cateList[i].children
				// 切换的时候改变一下滚动条距离顶部的距离
				this.scrollTop = this.scrollTop === 0 ? 1 : 0;
			},
			gotoGoodsList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			},
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-view-container {
	display: flex;
	.left-scroll-view {
		width: 120px;
		.left-scroll-view-item {
			// 撑起了高度，也把文字居中了
			line-height: 60px;
			background-color: #f7f7f7;
			text-align: center;
			font-size: 12px;
			// & 相当与回溯一层 即 “.left-scroll-view-item .active” 一起
			&.active {
				background-color: #ffffff;
				position: relative;
				
				&::before {
					content: ' ';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #c00000;
					position: absolute;
					left: 0;
					// 这里top为啥要设置为 50%
					// ans: 相对于这个盒子来说，就是 50%，也就是一半
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
}
.cate-lv2-title {
	// display: ;
	font-size: 12px;
	text-align: center;
	font-weight: bold;
	padding: 15px 0;
}
.cate-lv3-list {
	display: flex;
	flex-wrap: wrap;
	.cate-lv3-item {
		width: 33.33%;
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
		align-items: center;
		image {
			height: 60px;
			width: 60px;
		}
		text {
			font-size: 12px;
		}
	}
}
</style>
