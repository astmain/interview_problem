<template>
	<view class="container" style="min-height: 100%;background-color: #f5f5f6;justify-content: flex-start;">
		<!-- <uni-nav-bar title="我的个人主页" leftIcon=""></uni-nav-bar> -->
		<!-- <view class="my-header">
			<image :src="avatarUrl" style="height: 150upx;width: 150upx;border-radius: 50%;"></image>
			<view style="flex: 1;justify-content: center;align-items: center;margin-left: 90upx;">
				<view class="grace-h3" style="color: #FFFFFF;">{{userinfo.Zsmc00}}</view>
				<view style="color: #FFFFFF;">
					{{userinfo.Dhhm00 || ''}}
				</view>
			</view>
		</view> -->

		<view class="user-section" style="border-radius: 0 0 50% 50%;">
			<image class="bg" :src="userBg" style="background-color: #1d96f0;"></image>
			<!--用户信息-->
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="headImg"></image>
					<text class="username2" style="color: #FFFFFF;">
						{{userinfo.Zsmc00}}
						{{userinfo.Dhhm00 || ''}}
					</text>
				</view>
			</view>
			<!--vip信息-->
			<view class="vip-card-box " style="z-index: 2;">
				<view class="b-btn">
					{{ '慧云办公' }}
				</view>
				<view class="tit" style="color: #f7d680;">
					<text class='iconfont icon-banben '></text>
					{{ version }}
				</view>
			</view>
		</view>
		<image class="arc" :src="arc" style="z-index: 10;"></image>
		<view style="width: 750rpx;margin-top: 140rpx;">

			<view class="uni-list" style="z-index: 200;width: 94%;margin-left: 3%;">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<text class='iconfont icon-user1 op-item' style="color: #74d5f3;"></text>
					<view class="uni-list-cell-navigate uni-navigate-right" @click="viewUserInfo">账户信息</view>
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<text class='iconfont icon-pwd2 op-item' style="color: #f9c647;"></text>

					<view class="uni-list-cell-navigate uni-navigate-right" @click="modifyPwd">修改密码</view>
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<text class='iconfont icon-tel2 op-item' style="color: #82b2ef;"></text>
					<view class="uni-list-cell-navigate uni-navigate-right" @click="callService">客服电话</view>
				</view>
				<!-- 			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<text class='iconfont icon-banben op-item'  style="color: #91d979;"></text>
				<view class="uni-list-cell-navigate uni-navigate-right" @tap="showVersion">版本信息</view>
			</view> -->

				<!--#ifndef H5-->
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<text class='iconfont icon-qingchu op-item'></text>
					<view class="uni-list-cell-navigate uni-navigate-right" @tap="clearSaveFile">清理缓存</view>
				</view>






				<!-- <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-if="showWxFile">
				<text class='iconfont icon-wendang op-item'></text>
				<view class="uni-list-cell-navigate ">微信文件
					<switch @change="switch1Change" :checked="wxFileMode" />
				</view>
			</view> -->

				<!--#endif-->

				<!-- <view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="testPush">
				<text class='iconfont icon-banben' style='color:#1d96f0;font-size: 40upx;margin-left: 20upx;'></text>
				<view class="uni-list-cell-navigate uni-navigate-right"> 测试推送</view>
			</view> -->

				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<text class='iconfont icon-shoushimima op-item' style="color: #91d979;"></text>
					<view class="uni-list-cell-navigate ">手势登录
						<switch @change="switchChangeGesture" :checked="gestureMode" />
					</view>
				</view>

				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-if="gestureMode==true">
					<text class='iconfont icon-shoushi op-item'></text>
					<view class="uni-list-cell-navigate uni-navigate-right" @tap="reGesture">修改手势</view>
				</view>
			</view>
		</view>
		<view style="justify-content: center;display: flex;margin-top: 50rpx;">
			<button type="warn" @click="exit()"
				style="background-color: #DD524D; margin-left: 3%;margin-right: 3%; flex: 1;">注销</button>
		</view>
		<!-- <view style="flex-shrink: 0;"></view> -->

		<!--#ifdef H5-->
		<view v-if="isH5Wx">

			<view v-if="!userinfo.Openid" style="justify-content: center;display: flex;margin-top: 20rpx;">
				<button type="warn" @click="exit"
					style="background-color: #5673dd; margin-left: 3%;margin-right: 3%; flex: 1;">重新登录,并授权绑定</button>
			</view>
			<view v-else style="justify-content: center;display: flex;margin-top: 20rpx; align-items: center;">
				<view style="margin-left: 30rpx;">

				</view>
				<u-avatar :src="userinfo.Avatar"></u-avatar>
				<text style="flex: 1;margin-left: 20rpx;">{{userinfo.Nickname}}</text>
				<button type="warn" @click="unBandingWx()"
					style="background-color: #5673dd; margin-left: 3%;margin-right: 3%; width: 230rpx;">解除绑定</button>
			</view>
		</view>
		<!--#endif-->

		<!--#ifdef MP-WEIXIN -->
		<view v-if="!userinfo.Mpopenid" style="justify-content: center;display: flex;margin-top: 20rpx;">
			<button type="warn" @click="newWxLogin()"
				style="background-color: #5673dd; margin-left: 3%;margin-right: 3%; flex: 1;">绑定微信</button>
		</view>
		<view v-else style="justify-content: center;display: flex;margin-top: 20rpx; align-items: center;">
			<view style="margin-left: 30rpx;">

			</view>
			<u-avatar :src="userinfo.Avatar"></u-avatar>
			<text style="flex: 1;margin-left: 20rpx;">{{userinfo.Nickname}}</text>
			<button type="warn" @click="unBandingWx()"
				style="background-color: #5673dd; margin-left: 3%;margin-right: 3%; width: 230rpx;">解除绑定</button>
		</view>
		<!--#endif-->
	</view>
</template>

<script>
	import utils from '../../common/utils.js';
	import uniNavBar from "@/components/uni-nav-bar.vue";

	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				title: '个人信息',
				avatarUrl: '../../static/imgs/logo-200.png',
				nickName: '未知',
				userinfo: {},
				showWxFile: false,
				wxFileMode: false,
				gestureMode: false,
				headImg: '../../static/logo.png',
				version: '1.0.0',
				userBg: '../../static/user-bg.png',
				arc: '../../static/arc.png',
				isH5Wx: false,
				showDel:false,
				CustomerService:''
			}
		},
		onShow() {

		},
		onLoad() {
			this.userinfo = uni.getStorageSync("userinfo");
			
			this.showDel = this.userinfo.DelAccount;
			
			this.CustomerService = this.userinfo.CustomerService;

			if (uni.getStorageSync('login-mode') == 'gesture') {
				this.gestureMode = true;
			}

			this.isH5Wx = utils.isWeiXin()


			//重新加载数据
			this.EventBus.register("gestureMode", (param) => {
				this.gestureMode = true;
			});

			var that = this;
			//#ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {

				that.version = widgetInfo.version;
			});
			//#endif
			
			//#ifndef APP-PLUS
			that.version = that.$http.versionName;
			//#endif

		},
		computed: {
			...mapState(['zsmc00']),
		},
		components: {
			uniNavBar
		},
		methods: {
			delAccount: function() {
				uni.showModal({
					title: '温馨提示',
					content: '您确定要删除您的账号吗?删除之后，您将无法继续使用该账号进行业务处理。',
					success: (res) => {
						if (res.confirm) {
			
							this.$http.doRequest(this.$http.apiUrl + '/system/DelTheAccount', {
								id: utils.getUserId()
							}).then((data) => {
								if (data.Result) {
									uni.showModal({
										title: '温馨提示',
										content: data.Msg,
										showCancel: false,
										success: (res) => {
											uni.reLaunch({
												url: './login'
											})
										}
									})
								} else {
									uni.showToast({
										icon: 'none',
										content: data.Msg
									})
								}
							}).catch((data) => {
								console.log('测试推送发生异常')
							});
			
						}
					}
				})
			},
			unBandingWx: function() {

				var tempMm = this.userinfo.Mm0000;

				uni.showModal({
					title: '提示',
					content: '确定要解除绑定吗?',
					success: (res) => {
						if (res.confirm) {
							this.$http.doRequest(this.$http.apiUrl + '/system/UnbindWxmp', {
								id: utils.getUserId()
							}).then((data) => {
								if (data.Result) {

									data.Data.Mm0000 = tempMm;

									uni.showToast({
										icon: 'none',
										title: '已解除绑定'
									})

									uni.setStorage({
										key: "userinfo",
										data: data.Data,
										success: () => {

											this.userinfo = uni.getStorageSync(
												"userinfo");
										}
									});

								} else {
									uni.showToast({
										icon: 'none',
										title: data.Msg
									})
								}
							}).catch((data) => {
								console.log('测试推送发生异常')
							});

						}
					}
				})
			},
			newWxLogin: function() {
				uni.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res2) => {
						console.log('新用户信息:')
						console.log(res2)


						uni.showToast({
							icon: 'none',
							title: '处理中...'
						})

						uni.login({
							success: (e2) => {
								/*这里要替换为服务器请求,不要在客户端直接请求*/
								console.log("请求code2:" + e2.code);
								this.$http.doRequest(this.$http.apiUrl + '/Wx/Auth?code=' + e2
									.code, {}).then(
									res => {
										console.log("请求openid 成功2");
										console.log(res);
										let authData = JSON.parse(res.Data);

										var user = {
											'id': utils.getUserId(),
											'unionid': authData.unionid,
											'mpopenid': authData.openid,
											'nickname': res2.userInfo.nickName,
											'avatarUrl': res2.userInfo.avatarUrl
										};


										var tempMm = this.userinfo.Mm0000;


										this.$http.doRequest(this.$http.apiUrl +
											'/system/BindWxmp', user).then((data) => {
											if (data.Result) {
												uni.showModal({
													title: '已绑定[' + res2
														.userInfo
														.nickName + ']'
												})

												data.Data.Mm0000 = tempMm;

												uni.setStorage({
													key: "userinfo",
													data: data.Data,
													success: () => {

														this.userinfo =
															uni
															.getStorageSync(
																"userinfo"
																);
													}
												});

											} else {
												uni.showToast({
													icon: 'none',
													title: data.Msg
												})
											}
										}).catch((data) => {
											console.log('测试推送发生异常')
										});

									});
							},
							fail: (e) => {

								uni.showModal({
									content: "登录失败,原因为: " + e.errMsg,
									showCancel: false
								})
								this.isLogin = false;
							}
						})
					}
				})
			},
			reGesture: function() {
				uni.navigateTo({
					url: 'gestureLock?type=2'
				})
			},
			switchChangeGesture: function(e) {
				this.gestureMode = e.detail.value;
				console.log('switch1 发生 change 事件，携带值为', e.target.value)

				if (e.target.value) {

					const hasGesturePwd = uni.getStorageSync('gesture-pwd');
					if (hasGesturePwd) {
						uni.setStorage({
							key: 'login-mode',
							data: 'gesture',
							success: () => {},
							fail: (res) => {

							}
						});
					} else {

						setTimeout(() => {
							this.gestureMode = false
						}, 500)

						uni.navigateTo({
							url: 'gestureLock?type=2'
						})
					}
				} else {
					uni.setStorage({
						key: 'login-mode',
						data: 'password',
						success: () => {},
						fail: (res) => {

						}
					});
				}
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)

				if (e.target.value) {
					uni.setStorage({
						key: 'wx-file',
						data: true,
						success: () => {},
						fail: (res) => {

						}
					});
				} else {
					uni.setStorage({
						key: 'wx-file',
						data: false,
						success: () => {},
						fail: (res) => {

						}
					});
				}
			},
			viewUserInfo: function() {
				this.goPage("../my/userinfo");
			},
			modifyPwd: function() {
				this.goPage("../my/modifyPwd");
			},
			goPage: function(url) {
				uni.navigateTo({
					url: url
				})
			},
			showUserName: function() {
				let trueName = utils.getTrueName();
				uni.showToast({
					title: trueName
				})
			},
			showVersion: function() { //显示版本

				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {

					uni.showModal({
						title: '版本',
						content: widgetInfo.version,
						showCancel: false
					});
				});

			},
			callService: function() { //客服电话
				uni.makePhoneCall({
					phoneNumber: this.CustomerService
				})
			},
			clearSaveFile: function() { //清理缓存
				uni.getSavedFileList({
					success: function(res) {
						if (res.fileList.length > 0) {

							for (let i = 0; i < res.fileList.length; i++) {
								uni.removeSavedFile({
									filePath: res.fileList[i].filePath,
									complete: function(res) {}
								});
							}

							uni.showToast({
								title: '清理完成'
							})

						} else {
							uni.showToast({
								title: '清理完成'
							})
						}
					}
				});
			},
			exit: function() { //注销

				uni.reLaunch({
					url: '../my/login?Zx=true'
				});
				return;
				let promise = this.tim.logout();
				promise.then(res => {
					this.$store.commit('reset')
					uni.reLaunch({
						url: '../my/login'
					});
				}).catch(err => {
					console.log('退出失败')
					uni.reLaunch({
						url: '../my/login'
					});
				});


			},
			testPush: function() {
				let userName = utils.getUserName();
				this.$http.doRequest(this.$http.apiUrl + '/push/PushTest', {
					userName: userName
				}).then((data) => {
					uni.showModal({
						content: 'ps:android发布后测试，ios发布后，需要退到后台'
					})
				}).catch((data) => {
					console.log('测试推送发生异常')
				});
			}
		}
	}
</script>

<style>
	@import "../../common/uni.css";


	.uni-list-cell-navigate.uni-navigate-right:after {
		font-family: "grace-iconfont";
		content: '\e601';
		position: absolute;
		right: 24upx;
		top: 50%;
		color: #bbb;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	.uni-list-cell {}

	.my-header {
		background-color: #1d96f0;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 50upx;
		flex-direction: row;
		border-radius: 0 0 50% 50%;
	}

	.op-item {
		color: #1d96f0;
		font-size: 40upx;
		margin-left: 20upx;
	}

	.title {
		font-size: 50upx;
		color: #8f8f94;
		text-align: center;
	}
</style>

<style lang="scss" scoped>
	.arc {
		position: absolute;
		left: 0;
		top: 395upx;
		width: 100%;
		height: 36upx;
	}

	.user-section {
		height: 210upx;
		padding: 100upx 30upx 0;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100vw;
			height: 55vw;
			opacity: 0.84;
		}

		.user-info-box {
			height: 180upx;
			display: flex;
			align-items: center;
			position: relative;
			z-index: 1;
			justify-content: space-between;

			.portrait-box {
				display: flex;
				align-items: center;

				.portrait {
					width: 130upx;
					height: 130upx;
					border: 5upx solid #fff;
					border-radius: 50%;
				}

				.username2 {
					font-size: 36upx;
					color: '#fff' !important;
					margin-left: 20upx;
				}

				button {
					background-color: transparent;
					font-size: 26upx;
					color: '#000000';
					border: none;
				}

				button::after {
					border: none;
				}
			}
		}

		.vip-card-box {
			display: flex;
			flex-direction: column;
			color: #f7d680;
			height: 40upx;
			background: url('../../static/vip-card.png');
			background-size: 100% 100%;
			border-radius: 16upx 16upx 0 0;
			overflow: hidden;
			position: relative;
			padding: 20upx 24upx;
			margin-top: 60rpx;

			.b-btn {
				position: absolute;
				right: 24upx;
				top: 24upx;
				width: 160upx;
				height: 40upx;
				text-align: center;
				line-height: 40upx;
				font-size: 22upx;
				color: #36343c;
				border-radius: 20px;
				background: linear-gradient(to left, #f9e6af, #ffd465);
				z-index: 1;
			}

		}
	}
</style>
