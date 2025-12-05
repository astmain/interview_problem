<template>
	<view class="container2" v-if="showLoginPage==true">
		<view class="cpr-logo"></view>

		<view class="login-from">

			<!--集团码-->
			<view class="inputView" v-if="needAuthCode">
				<text class='iconfont icon-banben'
					style='color:#7F8389;font-size: 40upx;margin-left: 30upx;display: flex;'></text>
				<input class="inputText" placeholder="请输入集团码" v-model="authCode" />
			</view>

			<!--账号-->
			<view class="inputView">
				<text class='iconfont icon-user1'
					style='color:#7F8389;font-size: 40upx;margin-left: 30upx;display: flex;'></text>
				<input class="inputText" placeholder="请输入账号" v-model="userName" />
			</view>

			<!--密码-->
			<view class="inputView">
				<text class='iconfont icon-pwd2'
					style='color:#7F8389;font-size: 40upx;margin-left: 30upx;display: flex;'></text>
				<input class="inputText" password="true" placeholder="请输入密码" v-model="password" />
			</view>

			<!--账号登录-->
			<view class="loginBtnView">
				<button class="btn-primary loginBtn" bindtap="login" @tap="login()">登录</button>
			</view>



			<!--去注册-->
			<view style="text-align: right;margin-top: 10upx;">
				<navigator url="reg">还没有账号?去注册</navigator>
			</view>

		</view>
	</view>
</template>

<script>
	import cacheUtil from '../../common/cache-utils';
	import utils from '../../common/utils';

	var errorCount = 0; //错误登陆次数
	var user; //记录本次登陆名
	export default {
		data() {
			return {
				authCode: '',
				userName: '',
				password: '',
				needAuthCode: false,
				showLoginPage: false,
				other: {
					appVersion: '1.0.0'
				},
				needWxInfo: false,
				wxInfo: {}
			}
		},

		onShow: function() {
			if (uni.getStorageSync('login-mode') == 'gesture') {
				uni.redirectTo({
					url: 'gestureLock?type=1'
				})
			} else {
				this.showLoginPage = true
			}
		},
		onLoad: function(e) {

			//显示手势处理
			if (uni.getStorageSync('login-mode') == 'gesture') {
				uni.redirectTo({
					url: 'gestureLock?type=1'
				})
				return;
			} else {
				this.showLoginPage = true
			}

			//默认自动登录
			let AutoLogin = true;

			let that = this;
			if (e.Zx) {
				this.Zx = e.Zx;
			}
			let userinfo = uni.getStorageSync("userinfo");
			if (userinfo.Yhm000) {
				this.userName = userinfo.Yhm000;
			}

			if (userinfo.Mm0000) {
				this.password = userinfo.Mm0000;
			}

			//自动填写状态码
			let authorization = uni.getStorageSync("authorization");
			if (authorization) {
				this.authCode = authorization;
			}


			//获取app信息
			//#ifdef APP-PLUS
			try {
				var that2 = this;
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {

					that2.other.appVersion = widgetInfo.version
				});
			} catch (e) {
				// error
			}
			//#endif

			//h5版本，登录自定绑定微信信息
			//#ifdef H5 
			const local = window.location.href;
			const appid = this.$http.weixinAppId;

			var openid = this.getUrlCode("openid");

			// if (!utils.isWeiXin()) {
			// 	if (!userinfo) {
			// 		userinfo = {}
			// 	}

			// 	userinfo.Openid = 'fake_openid'; //不是微信环境，不需要绑定，随意设定一个值，允许进入微信界面

			// }

			if (userinfo.Openid) {

			} else if (!openid) //需要跳转获取微信id
			{
				
				
				
				// //开始测试新的业务逻辑
				// var url = `http://wx.huiliantech.com/OpenOAuth2?appid=${appid}&utype=userinfo&url=${local};`
				// console.log('ss');
				// uni.$u.http.get(url, {}).then(res => {
				// 	console.log('111')
				// }).catch(err => {
				// console.log('222'+JSON.stringify(err))
				// })
				


				// // this.$http.doRequest(url, {}, {
				// // 	method: 'GET'
				// // }).then(data => {
				// // 	console.log(data)

				// // }).catch(data=>{
					
				// // }) 

				// return;

				// AutoLogin = false; //不自动登录了
				// this.needWxInfo = true; //需要微信信息

				
				// window.open(`http://wx.huiliantech.com/OpenOAuth2?appid=${appid}&utype=userinfo&url=${local}`)


				// window.location.href =
				// 	`http://wx.huiliantech.com/OpenOAuth2?appid=${appid}&utype=userinfo&url=${local};`
			} else {

				AutoLogin = false; //不自动登录了
				this.needWxInfo = true; //需要微信信息

				var nickname = this.getUrlCode("nickname");
				var headimgurl = this.getUrlCode("headimgurl");
				this.wxInfo.nickname = nickname;
				this.wxInfo.openid = openid;
				this.wxInfo.avatar = headimgurl;
			}


			// var code = this.getUrlCode("code");
			// if (!code) {
			// 	this.getCode();
			// } else {
			// 	alert(code);
			// 	//this.getToken();
			// 	alert(code)
			// 	this.$http.doRequest(this.$http.apiUrl + '/push/GetAccessToken', {
			// 		code: code
			// 	}).then(data => {

			// 	}).catch(res => {

			// 	});
			// }
			//#endif

			if (AutoLogin && !this.Zx) {
				setTimeout(() => {
					this.login();
				}, 500)
			}
		},
		methods: {
			share: function(shareConfig) {
				wx.config({
					debug: false,
					appId: shareConfig.appid,
					timestamp: shareConfig.timeStamp,
					nonceStr: shareConfig.noncestr,
					signature: shareConfig.signaTure,
					jsApiList: [
						'checkJsApi',
						'onMenuShareTimeline',
						'onMenuShareAppMessage'
					]
				});


				wx.ready(function() { //需在用户可能点击分享按钮前就先调用

					var shareData = {
						title: '慧云办公',
						desc: 'OA办公,高效轻松',
						link: 'http://jisao.educhar.com/index.html',
						imgUrl: 'http://jisao.educhar.com/banner.jpg',
						success: function() {
							//alert('分享了33');
						},
					};
					var shareData2 = {
						title: '慧云办公',
						desc: 'OA办公,高效轻松',
						link: 'http://jisao.educhar.com/index.html',
						imgUrl: 'http://jisao.educhar.com/banner.jpg',
						success: function() {
							// alert('分享了44');
						},
					};

					wx.onMenuShareAppMessage(shareData);
					wx.onMenuShareTimeline(shareData2);


				});



				wx.error(function(res) {
					alert(res.errMsg);
				});
			},
			getUrlCode(variable) {
				var query = window.location.search.substring(1);
				var vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
				return;
			},
			getCode() {
				// const local = window.location.href;
				// alert(local)

				//以前测试的
				return;
				const local = 'http://bb1w7x2z.dongtaiyuming.net/OA/#/';

				const appid = "wx7cf1b02474739aec";
				// window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
				// 		     local
				// 		   )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;


				window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
						   		     local
						   		   )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
			},

			timLogin: function() {
				//登录tim
				var curUserSig = this.genTestUserSig(this.userName);

				let promise = this.tim.login({
					userID: this.userName,
					userSig: curUserSig.userSig
				});
				promise.then((res) => {
					//登录成功后 更新登录状态
					console.log('成功登录tim:' + res.data);
				}).catch((err) => {
					console.warn('login error:', err); // 登录失败的相关信息
				});
			},
			login: function() {

				//需要认证码
				if (this.needAuthCode) {
					if (this.authCode == '') {
						uni.showToast({
							title: '请输入认证码'
						})
						return;
					} else {
						uni.setStorage({
							key: "authorization",
							data: this.authCode,
							success: () => {
								//修改认证的url地址
								this.$http.modifyAuthUrl();
							}
						});
					}
				}

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
				//判断用户名是否相等，不相等  次数重置为1
				if (user != this.userName) {
					user = this.userName;
					errorCount = 0;
				}

				var clientid = '';
				//#ifdef APP-PLUS
				var inf = plus.push.getClientInfo();
				clientid = inf.clientid;
				//#endif

				uni.showLoading({
					title: '正在登录..'
				})

				var postData = {
					cid: clientid,
					userName: this.userName,
					password: this.password,
					errorCount: errorCount,
					other: JSON.stringify(this.other)
				};

				if (this.needWxInfo) {
					postData = Object.assign({
						'wxinfo': '1'
					}, postData, this.wxInfo);
				}

				this.$http.doRequest(this.$http.apiUrl + '/system/auth', postData).then((data) => {
					if (data.Success) {
						if (data.Result) {
							uni.hideLoading();
							let userInfo = Object.assign(data.Data, {
								"Appname": data.Value,
								"AppModules": data.AppModules,
								"DelAccount":data.DelAccount,
								"CustomerService":data.CustomerService
							});
							errorCount = 0;
							uni.setStorage({
								key: "userinfo",
								data: userInfo,
								success: function() {
									cacheUtil.cachedDepartmentUser(); //加载用户缓存
									if (userInfo.MPwd === 1) {
										uni.switchTab({
											url: '../../pages/home/index'
										});
									} else {
										uni.showModal({
											title: '提示',
											content: '您的密码还是初始状态，请先修改后再使用',
											showCancel: false
										});
										uni.switchTab({
											url: '../../pages/home/index'
										});
										uni.navigateTo({
											url: '/pages/my/modifyPwd'
										});
									}
								}
							});

							//this.timLogin();

						} else {
							//判断是密码错误，开始计算 输入密码次数
							if (data.Msg.substring(0, 2) == "密码") {
								errorCount = ++errorCount;
							}
							uni.showToast({
								icon: "none",
								title: data.Msg,
							})
						}
					} else {
						uni.hideLoading();

						if (data.AuthMsg) {
							uni.showToast({
								icon: "none",
								title: data.AuthMsg,
							})
						} else {
							uni.showToast({
								icon: "none",
								title: '系统登录异常',
							})
						}
					}
				}).catch((data) => {
					uni.hideLoading();
					console.log('登录发生异常' + JSON.stringify(data));
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
		background: url(http://qiniu.huiliantech.com/hl-logo-v3.png);
		width: 150px;
		position: absolute;
		height: 280upx;
		width: 280upx;
		top: 210upx;
		left: 235upx;
		background-size: 280upx 280upx;
		background-repeat: no-repeat;
	}
</style>
