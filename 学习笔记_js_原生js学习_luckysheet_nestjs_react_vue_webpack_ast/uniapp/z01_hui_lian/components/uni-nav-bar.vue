<template>
	<view class="nav-global-style" :style="globalStyle">
		
		<view class="uni-navbar" v-if="custom" 
			:class="{'uni-navbar-fixed':isFixed,'uni-navbar-shadow':hasShadow}" 
			:style="{'background-color':backgroundColor}">
			
			<view class="uni-status-bar" :style="statusBarStyle"></view>
			
			<view class="uni-navbar-header" :style="{color:color}">
				
				<!-- 导航栏左侧 -->
				<view class="uni-navbar-header-btns left-block" style="width:30%">
					<view v-if="leftIcon.length">
						<view class="iconfont left-icon-style" :class="[leftIcon]" @tap="onLeftIconClick"
								:style="{color:color}"></view>
					</view>
					<slot name="left"></slot> 
				</view> 
				
				<!-- 导航栏标题,也可放其他的东东 -->
				<view class="uni-navbar-container" style="width:40%;">
					<view v-if="title.length" class="uni-navbar-container-title" style="font-size:36upx">{{title}}</view>
					<slot name="title"></slot>
				</view>
				
				<!-- 导航栏右侧 -->
				<view class="uni-navbar-header-btns" style="position: absolute;right: 0;width: 200px;">
		            
					<!-- #ifdef MP-WEIXIN -->
					<view style="position: absolute;right: 102px;">
						<slot name="right"></slot>
					</view>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
						<view class="right-block" style="width: 100%;">
							<slot name="right"></slot>
						</view>
					<!-- #endif -->
		        </view>
				
			</view>
			
		</view>
		
	</view>
</template>

<script>
	
	/**
	 * 默认的左侧按钮样式
	 */
	let defaultLeftIcon = 'icon-zuojiantou';
	
	/**
	 * 默认左侧按钮的点击事件
	 */
	let defaultLeftFunction = () => {
		uni.navigateBack({ delta: 1 });
	};

    export default {
		data() {
			return {
				custom : true  	//全局开关
			};
		},
        components: {
            
        },
        props: {
            /**
             * 标题文字
             */
            title: {
                type: String,
                default: ''
            },
            /**
             * 左侧按钮图标
             */
            leftIcon: {
                type: String,
                default: defaultLeftIcon
            },
//             rightIcon: {
//                 type: String,
//                 default: ''
//             },
            /**
             * 是否固定在顶部
             */
            fixed: {
                type: [Boolean, String],
                default: true
            },
			
            /**
             * 按钮图标和文字颜色
             */
            color: {
                type: String,
                default: '#FFF'
            },
			
			/**
			 * 图标大小
			 */
// 			iconSize: {
// 			    type: String,
// 			    default: '36upx'
// 			},
            /**
             * 导航背景颜色
             */
            backgroundColor: {
                type: String,
                default: '#1d96f0'
            },
            /**
             * 是否使用阴影，默认根据背景色判断
             */
            shadow: {
                type: String,
                default: 'false'
            }
        },
        computed: {
            isFixed() {
                return String(this.fixed) === 'true'
            },
            insertStatusBar() {
                switch (String(this.statusBar)) {
                    case 'true':
                        return true
                    case 'false':
                        return false
                    default: 
                        return this.isFixed
                }
            },
            hasShadow() {
                var backgroundColor = this.backgroundColor
                switch (String(this.shadow)) {
                    case 'true':
                        return true
                    case 'false':
                        return false
                    default:
                        return backgroundColor !== 'transparent' && backgroundColor.indexOf('rgba') < 0
                }
            },
			statusBarStyle() {
				let systemInfo;
				
				//#ifdef MP-WEIXIN
				systemInfo = uni.getSystemInfoSync();
				return `height:${systemInfo.statusBarHeight}px`
				//#endif
				
				//#ifdef APP-PLUS
				systemInfo = uni.getSystemInfoSync();
				return `height:${systemInfo.statusBarHeight}px`
				//#endif
				
				//#ifdef H5
				return ''
				//#endif
			},
			globalStyle() {
				let systemInfo;
				
				//#ifdef MP-WEIXIN
				systemInfo = uni.getSystemInfoSync();
				return `height:${systemInfo.statusBarHeight + 44}px`;
				//#endif
				
				//#ifdef APP-PLUS
				systemInfo = uni.getSystemInfoSync();
				return `height:${systemInfo.statusBarHeight + 44}px`;
				//#endif 
				
				//#ifdef H5
				return ''
				//#endif
			},
        },
        methods: {
            onLeftIconClick() {
				if(defaultLeftIcon === this.leftIcon) {
					defaultLeftFunction();
				}
				else {
					this.$emit('clickLeftIcon')
				}
            }
        }
    }
</script>

<style>
    .uni-navbar {
        display: block;
        position: relative;
        width: 100%;
        background-color: #FFFFFF;
        overflow: hidden;
    }
	
	.uni-navbar view{
		line-height:44px;
	}

    .uni-navbar-shadow {
        box-shadow: 0 1px 6px #ccc;
    }

    .uni-navbar.uni-navbar-fixed {
        position: fixed;
        z-index: 998;
    }

    .uni-navbar-header {
        display: flex;
        flex-direction: row;
        width: 100%;
        height:44px;
        line-height:44px;
        font-size: 16px;
    }
	
	.uni-navbar-header .uni-navbar-header-btns{
		display:inline-flex;
		flex-wrap:nowrap;
		flex-shrink:0;
		width: 120upx;
		padding:0 12upx;
	}
	
	.uni-navbar-header .uni-navbar-header-btns:first-child{
		padding-left:0;
	}
	.uni-navbar-header .uni-navbar-header-btns:last-child{
		width: 60upx;
	}
	.uni-navbar-container{
		width:100%;
		margin:0 10upx;
	}
	.uni-navbar-container-title{
		font-size:30upx;
		text-align:center;
		color: #FFFFFF;
	}
	.left-block {
		display: inline-block !important;
		text-align: left !important;
		margin-left: 4px;
		padding: 0 !important;
	}
	.right-block {
		display: inline-block !important;
		text-align: right !important;
		margin-right: 4px !important;
		padding: 0 !important;
	}
	.uni-status-bar {
	    display: block;
	    width: 100%;
	    height: 20px;
	    height: var(--status-bar-height);
	}
	
	.nav-global-style {
		position: relative;
		height: 44px;
	}
	
	.left-icon-style {
		font-size:36upx;
		margin-left:3px;
		width:35px;
		height: 36px;
	}

</style>
