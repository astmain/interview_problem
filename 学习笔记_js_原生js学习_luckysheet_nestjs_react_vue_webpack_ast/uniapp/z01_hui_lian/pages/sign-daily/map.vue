<template>
	<view class="page-body">
		<uni-nav-bar :title="title">
			<view slot="right">
				<view @tap="hist">签到记录</view>
			</view>
		</uni-nav-bar>
		<view class="page-section page-section-gap">
			<map :latitude="post.Lat000" :longitude="post.Lon000" :markers="markers"></map>
		</view>
		<view class="position-container">
			<view class="title">当前位置</view>
			<view class="position">{{post.Dqmc00}}</view>
		</view>
		<view class="opts">
			<button @tap="sign" v-show="view.vSign" class="btn-blue" style="flex: 1;">签到</button>
			<button @tap="refresh" v-show="view.vRefresh" class="btn-green" style="flex: 1;">刷新位置</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar.vue";
	
	import amap from '../../common/amap-wx.js';  
	import utils from '../../common/utils.js'; 
	 
	export default {
		data() {
			return {
				title: '签到',
				amapPlugin: null,  
				key: '7012f689fe07b1cbfa2817e0096dee88',  
				markers: [],
				post: {
					Ryid00: '',
					Tjsj00: '',
					Gxsj00: '',
					Kqlx00: 1,
					Lon000: '118.6',
					Lat000: '24.9',
					Dqmc00: '',
					Imei00: ''
				},
				view: {
					vSign: false,
					vRefresh: false
				}
			}
		},
		onLoad(location) {
			this.init(location);
		},
		components: {
			uniNavBar
		},
		methods: {
			init(location) { 
				this.post.Ryid00 = utils.getUserId();
				if(!this.post.Ryid00) {
					uni.showModal({
						title: "提示", 
						content: "您当前未登录，请先登录",
						showCancel: false,
						confirmText: "确定"
					});
					uni.navigateBack({ delta: 1 });
					return;
				}
				this.amapPlugin = new amap.AMapWX({  
					key: this.key  
				});
				if(location.Lat000) {
					this.locate(location);
				}
				else {
					this.getLocation();
					this.signInfo();
					this.view.vRefresh = true;
				}
			},
			sign() {
				uni.showLoading({ title: '签到中...' });
				this.$http.doRequest(this.$http.apiUrl + '/Sign/SaveDailySign', this.post)
				.then((data) => {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: data.Msg
					});
					if(data.Result) {
						setTimeout(() => {
							uni.navigateBack({ delta: 1 });
						}, 800);
					}
				})
				.finally(() => {
					uni.hideLoading();
				});
				
			},
			signInfo() {
				this.$http.doRequest(this.$http.apiUrl + '/Sign/GetDailySign', {
					Ryid00 : this.post.Ryid00
				}).then((data) => {
					if(data.Result && data.Data != null) {
						uni.showToast({
							title: '已经签过到了',
							duration: 1500
						});
					}
					else {
						this.view.vSign = true;
					}
				})
				.finally(() => {
				});
				
			},
			hist() {
				uni.navigateTo({
					url: './list'
				})
			},
			refresh() {
				this.getLocation();
			},
			getLocation() {
				uni.showLoading({ title: '位置获取中...' });
				this.amapPlugin.getRegeo({
					success: (data) => { 
						uni.hideLoading();  
						if(!data || !data.length) {
							this.locationError();
							return;
						}
						let bestLocation = data[0];
						bestLocation.name += ("-" + bestLocation.desc);
						this.locate(bestLocation);
					}, 
					fail: (data) => {
						uni.hideLoading();  
						this.locationError();
					}
				});  
			},
			locate(bestLocation) {
				this.post.Dqmc00 = bestLocation.name;
				this.post.Lat000 = bestLocation.latitude;
				this.post.Lon000 = bestLocation.longitude;
				this.markers = [
					{
						id: 1,
						latitude: this.post.Lat000,
						longitude : this.post.Lon000,
						iconPath: 'data:image/jpg;base64',
						width: 135,
						height: 135,
						title: this.post.Lat000,
						callout: {
							display: 'ALWAYS',
							content: this.post.Dqmc00,
							color: 'red',
							fontSize: 10,
							bgColor: '#aaa',
						}
					}
				];
			},
			locationError() {
				uni.showModal({
					title: "提示", 
					content: "获取当前位置出错，请确认设备已开启定位功能",
					showCancel: false,
					confirmText: "确定"
				});
			}
			
		},
		destroyed: function() {
			uni.hideLoading();
		},
		
		
	}
</script>
<style>
	map {
		width: 100%;
		height: 800upx;
	}
	
	.position-container {
		margin-top: 20upx;
		padding: 12upx 16upx;
	}
	
	.title {
		font-size: 36upx;
		font-weight: bold;
	}
	
	.position {
		font-size: 30upx;
		
	}
	
	.opts {
		display: flex;
		margin-top: 30upx;
	}
	
	.btn-blue {
		background: #00BFFF;
		color: #fff;
	}
	
	.btn-green {
		background: #1AAD19;
		color: #fff;
	}
	
</style>
