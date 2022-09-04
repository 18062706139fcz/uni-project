<template>
	<view>
		<!-- 选择收获地址的盒子 -->
		<view class="address_choose_box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="bitnChooseAddress" @click="chooseAddress">请选择收获地址+</button>
		</view>
		<!-- 渲染收货信息的盒子 -->
		<view class="address_info_box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1_left">
					<view class="username">
						收货人：<text>{{address.userName}}</text>
					</view>
					<view class="row1_right">
						<view class="phone">
							电话<text>{{address.telNumber}}</text>
						</view>
						<uni-icons type="arrowright" size="16"></uni-icons>
					</view>
				</view>
			</view>
			<view class="row2">
				<view class="row2_left">
					收货地址：
				</view>
				<view class="row2_right">
					{{addstr}}
				</view>
			</view>
		</view>
		<!-- 底部的边框线 -->
		<image src="../../static/find_off.png" mode="" class="addressBorder"></image>
	</view>
</template>

<script>
	import { mapState, mapMutations, mapGetters } from 'vuex'
	export default {
		name:"myAddress",
		data() {
			return {
				// 实现收货地址的按需展示
				// address: {}
			};
		},
		methods: {
			// 选择收货地址
			async chooseAddress() {
				// 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
				// 返回值是一个数组：第一项为错误对象，第二项为成功之后的收货地址对象
				const [err, succ] = await uni.chooseAddress().catch(err => err)
				// 用户成功的选择了收货地址
				if(err === null && succ.errMsg === 'chooseAddress:ok') {
					this.updateAddress(succ)
				}
				
				// 如果真的出现了问题该怎么办，该怎么选择
				if(err && err.Msg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response') {
					this.reAuth() // 调用 this.reAuth() 方法，向用户重新发起授权申请
				}
			},
			...mapMutations('m_user', ['updateAddress']),
			// 调用此方法，重新发起收货地址的授权
			async reAuth() {
				const [err2, confrimResult] = await uni.showModal({
					content: '检测到您没打开地址权限，是否去重新打开？',
					confirmText: '确认',
					cancelText: '取消'
				})
				
				// 如果弹框异常，则直接退出
				if (err2) return 
				if(confrimResult.cancel) return uni.$showMsg('您取消了地址授权')
				if(confrimResult.confirm) return uni.openSetting({
					success: (settingResult) => {
						if(settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
						if(!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了授权')
						
					}
				})
			}
		},
		// 计算收货详细地址的计算属性
		computed: {
			...mapState('m_user', ['address']),
			...mapGetters('m_user', ['addstr'])
		}
	}
</script>

<style lang="scss">
// 边框线的样式
.addressBorder {
	display: block;
	width: 100%;
	height: 5px;
}

.address_choose_box {
	display: flex;
	height: 90px;
	justify-content: center;
	align-items: center;
}

.address_info_box {
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 5px;// 一般都是设置左右无padding，上下有padding的
	
	// 第一行
	.row1 {
		display: flex;
		justify-content: space-between;
		
		.row1_right {
			display: flex;
			align-items: center;
			
			.phone {
				margin-right: 5px;
			}
		}
	}
	
	.row2 {
		display: flex;
		align-items: center;
		margin-top: 10px;
		
		.row2_left {
			white-space: nowrap;
		}
	}
}
</style>