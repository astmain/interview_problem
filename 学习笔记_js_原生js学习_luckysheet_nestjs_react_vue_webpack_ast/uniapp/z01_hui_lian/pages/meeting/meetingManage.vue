<template>
	<view class="page-body">
		<uni-nav-bar title="选择会议"></uni-nav-bar>
		<search-box v-on:remoteSearch="remoteSearch"></search-box>
		<view :class="['tab-list']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData" :key="key" class="garace-hl-list" @click="detail(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main">{{item.Hyrq00}}</view>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow' style="top: 20upx;"></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>备注：{{item.Bz0000}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
	</view>
</template>
<script>
	import searchBox from '../../components/search-box.vue'
	import loadMore from '../../components/load-more.vue'
	import utils from '../../common/utils.js'
	import uniNavBar from "@/components/uni-nav-bar.vue";

	export default {
		data() {
			return {
				searchKey: '',
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType: 0,
				listData: [], 
				pageInfo: {
					pageIndex: 1,
					pageSize: 10
				},
				eventName: ''
			}
		},
		onLoad(e) {
			this.eventName = e.eventName;
			this.getList();
		},
		onPullDownRefresh() {
			this.getList(true);
		},
		components: {
			searchBox,
			loadMore,
			uniNavBar
		},
		onReachBottom() {
			this.getList(false);
		},
		methods: {
			detail: function(item) {
				this.EventBus.fire(this.eventName, {
					Hyid00: item.Id0000
				});
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 0);
				return;
				
				uni.navigateTo({ 
					url: './dayPlanManage?Hyid00=' + item.Id0000
				})
			},
			getList: function(refresh) {
				//搜索中返回
				if (this.loadingType === 1) { 
					return;
				}
				if(refresh) {
					this.pageInfo.pageIndex = 1;
					this.listData = [];
				}
				
				this.loadingType = 1;
				
				//拼接搜索条件
				let param = Object.assign(this.pageInfo, {
					Hyrq00: this.searchKey
				}); 
				
				uni.showLoading({
					title: '正在加载...'
				});
				this.$http.doRequest(this.$http.apiUrl + '/Meeting/GetMeetingList', param)
				.then((data) => {
					uni.stopPullDownRefresh();
					if (data.Result) {
						if(data.Data) {
							
							data.Data.forEach(obj=>{
								obj.Hyrq00 = obj.Hyrq00.substring(0,10)+' 会议';
							});
							
							this.listData = this.listData.concat(data.Data);
							this.pageInfo.pageIndex++;
							this.loadingType = 0;
						}
						if(!data.Result || !data.Data || data.Data.length < this.pageInfo.pageSize) {
							this.loadingType = 2;
						}
					}
					else {
						this.loadingType = 0;
					}
				}) 
				.catch((data) => {
					uni.stopPullDownRefresh();
				})
				.finally(() => {
					uni.hideLoading();
				});
			},
			remoteSearch: function(searchKey) {
				this.searchKey = searchKey;
				this.getList(true);
			}
		},
		computed:{
		}
	}
</script>
<style>

	/*tab 相关*/
	
	.tab-list {
		margin-top: 100rpx;
	}
</style>
