<template>
	<view class="container2">
		
		<view class="cpr-logo"></view>
		
		<view class="login-from" >

			<!--账号-->
			<view class="inputView">
				<text class='iconfont icon-user1' style='color:#7F8389;font-size: 40upx;margin-left: 30upx;display: flex;'></text>
				<input class="inputText" placeholder="请输入账号" v-model="userName" />
			</view>
		

			<!--密码-->
			<view class="inputView">
				<text class='iconfont icon-pwd2' style='color:#7F8389;font-size: 40upx;margin-left: 30upx;display: flex;'></text>
				<input class="inputText" password="true" placeholder="请输入密码" v-model="password" />
			</view>

			<!--确认密码-->
			<view class="inputView">
				<text class='iconfont icon-dagou' style='color:#7F8389;font-size: 40upx;margin-left: 30upx;display: flex;'></text>
				<input class="inputText" password="true" placeholder="请输入确认密码" v-model="confirmPwd" />
			</view>

			<!--账号登录-->
			<view class="loginBtnView">
				<button class="btn-primary loginBtn" style="background-color: #99CCCC;" bindtap="register" @tap="register()">注册</button>
			</view>
			
			<!--返回登陆-->
			<view style="text-align: right;margin-top: 10upx;">
				<navigator url="login">返回登录页</navigator>
			</view>

		</view>
	</view>
</template>

<script>
	import cacheUtil from '../../common/cache-utils';
	import utils from '../../common/utils';


	export default {
		data() {
			return {
				userName: '',
				password: '',
				confirmPwd: ''
			}
		},
		onLoad: function() {

		},
		methods: {

			register: function() {

				if (this.userName == '') {
					uni.showToast({
						title: '请输入用户名'
					})
					return;
				}

				if (this.password == '') {
					uni.showToast({
						title: '请输入密码'
					})
					return;
				}


				if (this.confirmPwd == '') {
					uni.showToast({
						title: '请输入确认密码'
					})
					return;
				}

				if (this.confirmPwd != this.password) {
					uni.showToast({
						title: '密码不一致'
					})
					return;
				}

				uni.showLoading({
					title: '正在注册..'
				});

				this.$http.doRequest(this.$http.apiUrl + '/system/reg', {
					Yhm000: this.userName,
					password: this.password
				}).then((data) => {
					if (data.Success) {
						if (data.Result) {
							console.log('注册成功');
							uni.hideLoading();
								
								uni.showToast({
									icon: "none",
									title: '注册成功',
								})
							
							setTimeout(function() {
								uni.redirectTo({
									url: 'login'
								});
							}, 1200);
					
						} else {
							uni.showToast({
								icon: "none",
								title: data.Msg,
							})
						}
					} else {
						uni.hideLoading();
						uni.showToast({
							title: data.Msg || '系统注册异常',
						})
					}
				}).catch((data) => {
					uni.hideLoading();
					console.log('注册发生异常' + JSON.stringify(data));
				})
			}
		}

	}
</script>
<style>
	.inputText {
		display: flex;
		flex: 20;
		/*flex-grow: 1;*/
		float: right;
		align-content: center;
		align-items: center;
		margin-left: 22upx;
		color: #666666;
		font-size: 35upx;
		height: 100%;
	}



	/*样式*/
	.container2 {
		height: 100%;
		background: url('http://qiniu.huiliantech.com/hl-login-bg-v3.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		/* background-size: cover; */
	}

	.login-from {
	position: fixed;
	width: 100%;
	bottom: 200rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

	}

	.loginBtnView {
		width: 92%;
		height: auto;
		align-items: center;
		display: flex;
		margin-top: 20upx;
		margin-bottom: 0upx;
		padding-bottom: 0upx;
	}

	.loginBtn {
		border-radius: 100upx;
		background-color: #5c9ee4;
		margin-top: 0upx;
	}

	.inputView {
		line-height: 90upx;
		margin-bottom: 30upx;
		align-items: center;
		display: flex;
		width: 90%;
		border-radius: 100upx;
		background-color: #fff;
		flex-direction: row;
	}
	
	.cpr-logo {
		background:url(http://qiniu.huiliantech.com/hl-logo-v3.png);width: 150px;
		position: absolute;
		height: 280upx;
		width: 280upx;
		top: 210upx;
		left: 235upx;
		background-size: 280upx 280upx;
		background-repeat: no-repeat;
	}
</style>
