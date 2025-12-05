<template name="pop-menu">
	<view style="margin-top: 0;">
		<view class="menu-content" :style="menuPosition" v-if="menuShow">
			<view :class="arrowPosition"></view>
			<view class="menu-item" @tap="chooseItem(key)" v-for="(item,key) in menuList" :key="key">
				<view :class="['iconfont','menu-item-icon',item.menuIcon]"></view>
				<view class="menu-item-text">
					{{item.menuName}}
				</view>
			</view>
		</view>
		<view class="menu-mask" v-if="menuShow" @tap="menuClosed"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			menuShow: {
				type: Boolean,
				default: false
			},
			menuList: {
				type: Array
			},
			positionTop: {
				type: String,
				default: '250'
			},
			positionLeft: {
				type: String,
				default: '350'
			},
			arrowPosition: {
				type: String,
				default: 'tipArrow-top'
			},
		},
		methods: {
			chooseItem: function(index) {
				this.$emit('menuTap', index);
			},
			menuClosed: function() {
				this.$emit('menuClosed', 'closed');
			}
		},
		computed: {
			menuPosition: function() {
				//return `${this.positionDiy}`;
				let top= uni.upx2px(this.positionTop);
				let left= uni.upx2px(this.positionLeft);
				return  `top:${top}px;left:${left}px`
			}
		}
	}
</script>

<style scoped>
	:root {
		--text-color: #2499f0;
	}

	.menu-mask {
		background: rgba(0, 0, 0, 0.7);
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 9998;
	}

	.menu-content {
		background: #f9f9f9;
		width: 40%;
		position: fixed;
		left: 10%;
		top: 10%;
		background: #FFF;
		border-radius: 10upx;
		z-index: 9999;
		transform: translate(-50%, -50%);
	}

	.menu-item {
		display: flex;
		flex-direction: row;
		text-decoration: none;
		justify-content: center;
		align-items: center;
		padding: 10upx 20upx;
		color: #777;
		text-align: left;
		height: 90upx;
		position: relative;
		border-bottom: 1upx solid #EEE;
		font-size: 25upx;
		border-left: 4px solid var(--text-color);
	}
	
	.menu-item:last-child {
		border-bottom: 0upx solid #EEE;
	}
	

	.menu-item:before {
		content: "";
		position: absolute;
		top: 42%;
		left: 0;
		border-left: 5px solid var(--text-color);
		border-top: 5px solid transparent;
		border-bottom: 5px solid transparent;
	}

	.menu-item-icon {
		flex: 2;
		color: var(--text-color);
		font-size: 50upx;

		-webkit-animation: moveFromLeft 400ms ease-in-out;
		-moz-animation: moveFromLeft 400ms ease-in-out;
		-ms-animation: moveFromLeft 400ms ease-in-out;
		-o-animation: moveFromLeft 400ms ease-in-out;
		animation: moveFromLeft 400ms ease-in-out;
	}

	.menu-item-text {
		flex: 5;
		font-size: 40upx;

		-webkit-animation: moveFromRight 400ms ease-in-out;
		-moz-animation: moveFromRight 400ms ease-in-out;
		-ms-animation: moveFromRight 400ms ease-in-out;
		-o-animation: moveFromRight 400ms ease-in-out;
		animation: moveFromRight 400ms ease-in-out;
	}

	.tipArrow-top {
		position: absolute;
		margin-top: -22%;
		color: #FFFFFF;
		font-size: 90upx;
		left: 68%;
		z-index: 1999999;
	}

	.tipArrow-top:before {
		content: "";
		position: absolute;
		border-bottom: 38upx solid #FFFFFF;
		border-left: 38upx solid transparent;
		border-right: 38upx solid transparent;
		border-top: 38upx solid transparent;
	}

	.tipArrow-right {
		position: absolute;
		top: 10%;
		color: #FFFFFF;
		font-size: 90upx;
		left: 98%;
	}

	.tipArrow-right:before {
		content: "";
		position: absolute;
		border-bottom: 38upx solid transparent;
		border-left: 38upx solid #FFFFFF;
		border-right: 38upx solid transparent;
		border-top: 38upx solid transparent;
	}

	.tipArrow-left {
		position: absolute;
		top: 10%;
		color: #FFFFFF;
		font-size: 90upx;
		left: -23%;
	}

	.tipArrow-left:before {
		content: "";
		position: absolute;
		border-bottom: 38upx solid transparent;
		border-left: 38upx solid transparent;
		border-right: 38upx solid #FFFFFF;
		border-top: 38upx solid transparent;
	}
	
	.tipArrow-bottom {
		position: absolute;
		top: 98%;
		color: #FFFFFF;
		font-size: 90upx;
		left: 13%;
	}
	
	.tipArrow-bottom:before {
		content: "";
		position: absolute;
		border-bottom: 38upx solid transparent;
		border-left: 38upx solid transparent;
		border-right: 38upx solid transparent;
		border-top: 38upx solid #FFFFFF;
	}



	@-webkit-keyframes moveFromLeft {
		from {
			opacity: 0;
			-webkit-transform: translateX(200%);
			-moz-transform: translateX(200%);
			-ms-transform: translateX(200%);
			-o-transform: translateX(200%);
			transform: translateX(200%);
		}

		to {
			opacity: 1;
			-webkit-transform: translateX(0%);
			-moz-transform: translateX(0%);
			-ms-transform: translateX(0%);
			-o-transform: translateX(0%);
			transform: translateX(0%);
		}
	}

	@-webkit-keyframes moveFromRight {
		from {
			opacity: 0;
			-webkit-transform: translateX(-200%);
			-moz-transform: translateX(-200%);
			-ms-transform: translateX(-200%);
			-o-transform: translateX(-200%);
			transform: translateX(-200%);
		}

		to {
			opacity: 1;
			-webkit-transform: translateX(0%);
			-moz-transform: translateX(0%);
			-ms-transform: translateX(0%);
			-o-transform: translateX(0%);
			transform: translateX(0%);
		}
	}
</style>
