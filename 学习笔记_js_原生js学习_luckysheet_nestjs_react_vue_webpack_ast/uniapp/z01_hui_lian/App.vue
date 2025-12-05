<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//检查版本 开启监听
			//#ifdef APP-PLUS
			this.$http.doRequest(this.$http.apiUrl + '/update/UpdateCheck', {
				"Appid": plus.runtime.appid,
				"Version": plus.runtime.version,
				"Os": plus.os.name
			}).then((data) => {
				console.log(this.$http.apiUrl + '/update/UpdateCheck');
				console.log('当前版本信息:' + plus.runtime.version)
				if (data.Status == 1) //表示需要升级
				{
					let openUrl = plus.os.name === 'iOS' ? data.Iosurl : data.Androidurl;

					uni.showModal({ //提醒用户更新
						title: '更新提示',
						content: '是否选择更新',
						success: (res) => {
							if (res.confirm) {
								if (plus.os.name === 'iOS') { //苹果系统跳转到appstore更新
									plus.runtime.openURL(openUrl);
								} else { //android系统，直接解压升级

									uni.navigateTo({
										url: '../sys/updateVer?url=' + openUrl
									});
								}
							}
						}
					})
				}

			}, (data) => {
				console.log('请求失败:' + JSON.stringify(data));
			}).catch((data) => {
				console.log('发生了没有捕获的异常:' + data)
			});


			//开启推送监听
			uni.getProvider({
				service: "push",
				success: (e) => {
					console.log("success", e);
					this.provider = e.provider;
					this.openPush();
				},
				fail: (e) => {
					console.log("获取推送通道失败", e);
				}
			});
			//#endif
		},
		onShow: function() {
			console.log('App Show');
			this.EventBus.fire("refreshBadge");
		},
		onHide: function() {
			console.log('App Hide')
		},
		mounted() {
			/**官网有很多关于关于sdk 其他的监听方法（比如：有新的消息，用户资料更新等等）
			 * 详情可对照： https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html
			 * 监听的含义：服务端发生了数据变更---前端全局可以接收到变更通知--前端就可以自动触发某个事件来更新相应数据
			 * */
			// 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
			

			
			// this.tim.setLogLevel(4);

			
			// this.tim.on(this.$TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this);
			// // 收到新消息
			// this.tim.on(this.$TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage);
			// // 会话列表更新
			// this.tim.on(this.$TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
			// 	console.log('event.data:'+JSON.stringify(event.data));
			// 	this.$store.commit("updateConversationList", event.data);
			
			// });
			
			
		},
		methods: {
			
			onReadyStateUpdate({name}) {
				const isSDKReady = name === this.$TIM.EVENT.SDK_READY ? true : false;
				//自动监听并更新 sdk 的ready 状态 （未登录是 notReady  登录后是ready）
				this.$store.commit("toggleIsSDKReady", isSDKReady);
			    //sdk ready 后  肯定完成了登录操作    这里可以获取用户存储在im的基础信息/离线消息/黑名单列表
			},
			
			onReceiveMessage({data: messageList}) {
				// this.handleAt(messageList);
				this.$store.commit("pushCurrentMessageList", messageList);
				
				uni.showTabBarRedDot({index:1});
				
				uni.vibrateLong();
			},
			
			openPush() {
				uni.subscribePush({
					provider: this.provider[0],
					success: (e) => {
						console.log("已开启push接收", e);
					}
				})
			}
		}
	}
	
	if (!Promise.prototype.finally) {
		Promise.prototype.finally = function(callback) {
			const promise = this.constructor
			return this.then(
				value => promise.resolve(callback()).then(() => value),
				reason => promise.resolve(callback()).then(() => {
					throw reason
				})
			)
		}
	}
</script>

<style lang="scss">
			@import "uview-ui/index.scss";
</style>

<style>
	@import "./common/iconfont.css";
	@import "./graceUI/graceIcons.css";
	@import "./graceUI/graceUI.css";
	
		/* 这是页面的公用css*/
		page {
			background-color: #FFFFFF;
			height: 100%;
			font-size: upx;
			line-height: 1.6;
		}
	
		form {
			width: 100%;
		}
	
		button {
			margin: 10upx;
		}
	
		textarea {
			padding-left: 20upx;
			padding-right: 20upx;
		}
	
		.container {
			display: flex;
			flex-direction: column;
			width: 100%;
			min-height: 100%;
			justify-content: space-between;
			font-size: 32upx;
			font-family: -apple-system-font, Helvetica Neue, Helvetica, sans-serif;
		}
	
		.page-body {
			width: 100%;
			min-height: 100%;
			overflow-x: hidden;
			justify-content: space-between;
			font-family: -apple-system-font, Helvetica Neue, Helvetica, sans-serif;
		}
	
		.btn-primary {
			background-color: #1d96f0;
			width: 100%;
			color: #FFFFFF;
		}
	
		.hide {
			display: none;
		}
	
		/*基于graceui 自己做的局部调整*/
		.grace-form .grace-items {
			border-bottom: 2px solid #F1F1F1;
			padding: 10upx 0upx 10upx 0upx
		}
	
		.grace-form .grace-items .grace-label {
			margin-left: 20upx;
		}
	
		.grace-select-tips {
			border-bottom: 2px solid #F1F1F1;
			margin-left: 20upx;
		}
	
		.grace-padding {
			padding: 0;
			width: 100%;
		}
	
		.grace-add-file .garce-items .grace-filename {
			font-family: "grace-iconfont" !important;
			width: 100%;
			position: absolute;
			z-index: 1;
			left: 0upx;
			top: 20upx;
			font-size: 25upx;
			color: #FFFFFF;
			background-color: #000000;
			opacity: 0.6;
		}
	
		.grace-boxes-img {
			justify-content: center;
			padding-bottom: 0upx;
		}
	
		.grace-boxes-text {
			color: #FFFFFF;
		}
	
		.grace-add-file .garce-items .grace-close {
			right: 20upx;
			bottom: 20upx;
		}
	
		/*tab 相关 和列表 */
		.tabs {
			display: flex;
			flex-direction: row;
			/* top: 107upx; */
			margin-top: 107upx;
			position: fixed;
			z-index: 8;
			width: 100%;
		}
	
		.tab {
			font-size: 30upx;
			height: 80upx;
			line-height: 80upx;
			flex: 1;
			justify-content: center;
			text-align: center;
			color: #777777;
			background-color: #FFFFFF;
		}
	
		.tab-on {
			color: #1d96f0;
			border-bottom: 5upx solid #1d96f0;
		}
	
		.tab-list {
			margin-top: 188upx;
			opacity: 1;
			left: 100upx;
			-webkit-transition: all .2s ease-in;
			-moz-transition: all .2s ease-in;
			transition: all .2s ease-in;
			visibility: visible;
		}
	
		.garace-hl-list {
			padding: 20upx;
			border-bottom: #c8c7cc solid 1upx;
		}
	
		.grace-hl-list-arrow {
			width: auto;
			padding: 0 15upx;
			border-radius: 5upx;
			overflow: hidden;
			position: relative;
			top: 60upx;
			right: 0;
			color: #c8c7cc;
			height: 36upx;
			line-height: 36upx;
			font-size: 32upx;
		}
	
		/*列表图标*/
		.icon-size {
			font-size: 40upx;
		}
	
		.notice-null {
			display: none !important;
			/* color: rgba(255, 255, 255, 0) !important; */
		}
	
		.notice-red {
			color: #EC5B48;
		}
	
		.notice-yellow {
			color: #f5c53a;
		}
	
		.notice-green {
			color: #4da06b;
		}
	
		/*表单页面*/
	
		.normal-view {
			width: auto;
			padding: 20upx;
			padding-bottom: 10upx;
			padding-top: 10upx;
		}
	
	
		.form-header {
			background: linear-gradient(#1d96f0, #6ab9f4);
			justify-content: flex-end;
			display: flex;
		}
	
		.form-label {
			display: flex;
			flex-direction: row;
		}
	
		checkbox .wx-checkbox-input.wx-checkbox-input-checked {
			background: #1d96f0;
		}
	
		checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
			width: 28rpx;
			height: 28rpx;
			line-height: 28rpx;
			text-align: center;
			font-size: 22rpx;
			color: #fff;
			background: transparent;
			transform: translate(-50%, -50%) scale(1);
			-webkit-transform: translate(-50%, -50%) scale(1);
		}
	
		/*搜索按钮*/
		.search-box-btn {
			color: #FFFFFF;
			font-size: 55upx;
			margin-right: 15upx;
		}
	
		.required-red {
			width: 15upx;
			color: red;
			line-height: 80rpx;
	
		}
	
		/*表单操作按钮*/
		.form-op-btn {
			color: #FFFFFF;
			font-size: 45upx;
			line-height: 1.8em;
		}
	
		/*线框按钮*/
		.form-line-btn {
			color: #1d96f0;
			font-size: 30upx;
			line-height: 1.8em;
		}
	
		/*收缩按钮*/
		.form-ss-btn {
			color: #1d96f0;
			font-size: 45upx;
			line-height: 1.8em;
			width: 10%;
		}
	
		/*收缩按钮*/
		.form-choose-btn {
			color: #6AB9F4;
			font-size: 60upx;
			line-height: 2.8em;
			width: 10%;
		}
	
		/* 下拉框内容右对齐 */
		.selector-right-align {
			display: inline;
			padding-right: 4%;
		}
	
		.full-row-textarea {
			border: solid 1px #ddd !important;
			margin: 0 6px !important;
			height: 140rpx !important;
			padding: 12upx !important;
		}
	
		.full-row-textarea-x {
			border: solid 1px #ddd !important;
			margin: 0 6px !important;
			width: 100%;
		}
		
		/*新补充,兼容旧的页面*/
		/* 多格图标 */
		.grace-boxes{width:23%; margin:0 1%; padding:10upx 0;}
		.grace-boxes-img{width:70%; margin:0 auto; text-align:center; padding-bottom:10upx; font-size:0;}
		.grace-boxes-img image{width:100%;}
		.grace-boxes-text{line-height:2em; text-align:center; font-size:22upx;}
		
		/* 新闻列表 */
		.grace-news-list{padding:12upx 0;}
		.grace-news-list > navigator{display:block; width:100%; padding:12upx 0; margin:12upx 0;}
		.grace-news-list-items{width:100%; display:flex; flex-wrap:nowrap; position:relative;}
		.grace-news-list-img{width:200upx; flex-shrink:0;}
		.grace-news-list-title{width:100%; overflow:hidden;}
		.grace-news-list-title-main{line-height:1.5em; font-size:32upx; width:100%;}
		.grace-news-list-title-desc{font-size:24upx; display:block; color:#666; margin-top:12upx; height:40upx; line-height:40upx;}
		.grace-news-tips{width:auto; padding:0 12upx; border-radius:5upx; overflow:hidden; background:#FF4343; position:absolute; top:0; color:#FFFFFF; height:36upx; line-height:36upx; font-size:20upx;}
		.grace-news-tips-l{left:0;}
		.grace-news-tips-r{right:0;}
		.grace-news-list-info{width:100%; margin-top:10upx; line-height:36upx; font-size:24upx; color:#666; justify-content:space-between;}
		.grace-news-list-info view{font-size:24upx; color:#666;}
		.grace-news-list-info text{font-size:24upx; color:#666; margin-right:10upx;}
		.grace-news-list-img-news{width:100%; flex-wrap:wrap;}
		.grace-news-list-imgs{justify-content:space-between; width:100%; padding:18upx 0;}
		.grace-news-list-imgs image{width:31.3%; margin:0 1%;}
		.grace-news-list-img-big{width:100%; padding:18upx 0;}
		.grace-news-list-img-big image{width:100%;}
		
		.grace-items input {
			font-size: 30upx !important;
		}
		
		.grace-items textarea {
			font-size: 30upx !important;
		}
		
		.grace-items span {
			font-size: 30upx !important;
		} 
		.grace-items input {
			font-size: 30upx !important;
		}
		
		.grace-items textarea {
			font-size: 30upx !important;
		}
		
		.grace-items span {
			font-size: 30upx !important;
		} 
		
		
	@keyframes play-voice
	{
	from {color: black;}
	to {color: #ffffff;}
	}
	
	
	.flow-list{
		display: flex;flex-direction: column;justify-content: flex-start;
	}
	.flow-user-time{
		color: #4c4c72;
	}
	
	.flow-content{
		flex: 1;display: flex;flex-direction: row;padding-left: 40rpx;
	}
	
	.flow-content-info{
		flex: 10;
	}
	
	.flow-content-voice{
		flex: 4;
		display: flex;flex-direction: row;
	}
	
	.recover{
		
	}
	.playvoice>.icon::before
	{
		animation: play-voice 1s linear infinite;
	}
		
		
		
	/* #ifdef MP-WEIXIN || APP-PLUS */
		::-webkit-scrollbar {
			display: none;
			width: 0 !important;
			height: 0 !important;
			-webkit-appearance: none;
			background: transparent;
			color: transparent;
		  }
	/* #endif */
	
	/* #ifdef H5 */
		uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
			/* 隐藏滚动条，但依旧具备可以滚动的功能 */
			display: none;
			width: 0 !important;
			height: 0 !important;
			-webkit-appearance: none;
			background: transparent;
			color: transparent;
		}
	/* #endif */
	
</style>
