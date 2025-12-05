<template>
	<view>
		<uni-nav-bar title="值班公告"></uni-nav-bar>
		<view class="grace-padding">
			<view class="grace-form" style="background-color: #FFFFFF;" v-show="dutyToday">
				<view class="grace-title grace-nowrap grace-space-between" style="margin-top:30upx;display: flex;flex-direction: row;">
					<view class="form-label">
						<text class='iconfont icon-line form-line-btn'></text>
						<view class="grace-h5 grace-blod">值班领导</view>
					</view>
					<view style="padding-right: 50upx;">{{Zbld}}</view>
				</view>
				<view class="grace-title grace-nowrap grace-space-between" style="margin-top:30upx;display: flex;flex-direction: row;">
					<view class="form-label">
						<text class='iconfont icon-line form-line-btn'></text>
						<view class="grace-h5 grace-blod">值班人员</view>
					</view>
					<view  style="padding-right: 50upx;">
						{{Zbry}}
					</view>
				</view>
				<view class="grace-title grace-nowrap " style="margin-top:300upx;display: flex;flex-direction: row;justify-content: center;">
					<text class='iconfont icon-zhibanguanli' style="font-size: 200upx;color: #F0F0F0;"></text>
				</view>
			</view>
			<view v-show="!dutyToday">
				<view  style="margin-top: 80upx; font-size: 40upx;display: flex;align-content: center;justify-content: center;color: #10AEFF;">
					^v^今日无值班
				</view>
				<view class="grace-title grace-nowrap " style="margin-top:300upx;display: flex;flex-direction: row;justify-content: center;">
					<text class='iconfont icon-wushuju' style="font-size: 200upx;color: #F0F0F0;"></text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import uniNavBar from "@/components/uni-nav-bar.vue";
	
	export default {
		data() {
			return {
				dutyToday: true,
				Zbld: '', //值班领导
				Zbry: '' //值班人员
			}
		},
		onLoad: function() {
			this.getDutyToday();
		},
		components: {
			uniNavBar
		},
		methods: {
			getDutyToday: function() { //获取当日值班信息
				this.$http.doRequest(this.$http.apiUrl + '/System/GetNoticeToday', {}).then(data => {
					if (data.Result) {
						this.Zbld = data.Data.Zbld;
						this.Zbry = data.Data.Zbry
					} else {
						this.dutyToday=false;
					}
				}).catch(data => {
					console.log('获取值班信息发生异常')
				})
			}
		}
	}
</script>
