<template>
	<view>
		<view class="cart_container">
		<view class="cart_title">
			<text>left</text>
			<text class="cart_title_text">购物车</text>
		</view>
	<!-- 	<uni-swipe-action>
			<block v-for="(item, i) in cart" :key="i">
				<uni-swipe-action-item :options="options" @click="swipeActionClickHandler(item)">
					<view class="goods-item"> -->
					  <!-- 商品左侧图片区域 -->
					  <!-- <view class="goods-item-left"> -->
						  <!-- 使用方法不对 -->
						  <!-- <radio checked color="#C00000"></radio> -->
						  <!-- 在组件化的过程中，它使用了一个props属性以及v-if来决定radio的显示与隐藏 -->
						  <!-- <label class="radio"><radio value="r1" checked="true" color="#C00000" @radio_change="radioChangeHandler" @click="radioClickHandler" />选中</label> -->
						<!-- <image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image>
					  </view> -->
					  <!-- 商品右侧信息区域 -->
					  <!-- <view class="goods-item-right"> -->
						<!-- 商品标题 -->
						<!-- <view class="goods-name">{{item.goods_name}}</view>
						<view class="goods-info-box"> -->
						  <!-- 商品价格 -->
						  <!-- <view class="goods-price">￥{{item.goods_price}}</view>
						  <uni-number-box :min="1" :value="goods.goods_count"></uni-number-box>
						</view>
					  </view>
					</view>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action> -->
		
		<!-- 上面是有东西的时候 -->
		<!-- 下面就是写没东西的时候 -->
		<view class="empty_cart">
			<image src="../../static/find_off.png" class="empty_img"></image>
			<text class="tip_text">空空如也</text>
		</view>
		
				
		<view class="bottom">
			<!-- 全选区域 -->
			<label class="radio">
				<radio color="#C00000" :checked="true" /><text>全选</text>
			</label>
			<!-- 合计区域 -->
			<view class="amount_box">
				合计:<text>¥1234.00</text>
				<!-- 合计：<text>{{checkGoodsAmount}}</text> -->
			</view>
			<!-- 结算按钮 -->
			<view class="btn_settle">
				结算(0)
			</view>
			<!-- 这里是响应式的，但是由于之前有一个数据无法请求到，所以现在我并没有用可变数据 -->
			<!-- <view class="btn_settle">
				结算{{checkedCount}}
			</view> -->
		</view>
		</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabberBadge.js'
	// 单独设置无效？
	import mySettle from '@/components/mySettle/mySettle.vue'
	import { mapState, mapMutations, mapGetters } from 'vuex'
	export default {
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
				options: [{
					text: '删除', // 显示的文本内容
					style: {
						backgroundColor: '#C00000' // 按钮的背景颜色
					}
				}]
			}
		},
		methods: {
			// 如果按照封装来说的话，这个是父类的方法 「radio_change」
			radioChangeHandler(e) {
				this.updateGoodsState(e)
			},
			// 在子组件中，就把这个事件传递过去
			// 而自定义事件主要就是为了将商品的id和商品的状态传递上去
			radioClickHandler() {
				this.$emit('radio_change', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			// 在父组件中，直接设置numberChangeHander(e) {}
			// numChangeHandler(e) {
			// 	this.updateGoodsCount(e)
			// }
			// 在子组件中，通过change事件来设置改变
			// numChangeHandlerChild() {
			// 	this.$emit('num_change', {
			// 		goods_id: this.goods.goods_id,
			// 		goods_count: +val
			// 	})
			// }
			// 这个倒是值得一提，是在方法中解析的
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById', 'updateAllGoodsState']),
			// 为label绑定 changeAllState 事件
			changeAllState() {
				// 修改购物车中所有商品的选中状态
				// !this.isFullCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态。
				this.updateAllGoodsState(!this.isFullCheck) // 熟练的使用计算属性
			},
			swipeActionClickHandler(item) {
				console.log(item)
			},
			swipeActionClickHandler(item) {
				this.removeGoodsById(item.goods_id)
			}
		},
		computed: {
			...mapState('m_cart', ['cart']),
			...mapGetters('m_cart', ['total', 'checkCount', 'checkGoodsAmount']),
			ifFullCheck() {
				return this.total === this.checkCount
				// 然后给radio组件动态绑定checked属性的值。
			}
		},
		mixins: [badgeMix],
		props: {
		  // 商品的信息对象
		  goods: {
		    type: Object,
		    defaul: {},
		  },
		  // 是否显示图片的左侧radio
		  showRadio: {
			  type: Boolean,
			  default: false
		  },
		  // 是否显示numberBox
		  showNum: {
			  type: Boolean,
			  default: false
		  }
		},
	}
</script>

<style lang="scss">
.cart_title {
	height: 40px;
	display: flex;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
}
.cart_title_text {
	margin-left: 10px;
}
  .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
	width: 750rpx;
	box-sizing: border-box;
	
    .goods-item-left {
      margin-right: 5px;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
	  flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
	  .goods-info-box {
		  display: flex;
		  align-items: center;
		  justify-content: space-between;
	  }
    }
  }
  .bottom {
	  position: fixed;
	  bottom: 0;
	  left: 0;
	  background-color: white;
	  height: 50px;
	  width: 100%;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  padding-left: 5px;
	  font-size: 14px;
	  .radio {
		  display: flex;
		  align-items: center;
	  }
	  .btn_settle {
		  height: 50px;
		  min-width: 100px;
		  background-color: #c00000;
		  color: white;
		  line-height: 50px;
		  text-align: center;
		  padding: 0 10px;
	  }
  }
  .cart_container {
	  padding-bottom: 50px;
  }
  .empty_cart {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding-top: 150px;
	  .empty_img {
		  width: 90px;
		  height: 90px;
	  }
	  .tip-text {
		  font-size: 12px;
		  color: gray;
		  margin-top: 15px;
	  }
  }
</style>
