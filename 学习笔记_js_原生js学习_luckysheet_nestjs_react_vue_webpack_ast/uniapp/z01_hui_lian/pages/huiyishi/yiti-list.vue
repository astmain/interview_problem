<template>
	<view class="page-body">
		<uni-nav-bar title="我的会议"></uni-nav-bar>
		<search-box v-on:remoteSearch="remoteSearch"></search-box>
		<!-- 待办 -->
		<view :class="['tab-list',currentTabIndex==0 ? '' : 'hide']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData" :key="key" class="garace-hl-list"  @tap="goView(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main" style="display: flex;">
									<text style="flex: 11;">{{item.Yt0000 || ''}}</text>
								</view>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>会议类型:{{item.Ytlx00}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>会议上报截止:{{item.Ytsj00}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>会议状态:{{item.Ztmc00}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 加载更多1 -->
		<view :class="[currentTabIndex==0 ? '' : 'hide']">
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
	</view>
</template>
<script>
	import searchBox from '../../components/search-box.vue'
	import noticeText from '../../components/notice-text.vue'
	import loadMore from '../../components/load-more.vue'
	import utils from '../../common/utils.js'
	import uniNavBar from "@/components/uni-nav-bar.vue";

	export default {
		data() {
			let userInfo = uni.getStorageSync("userinfo");
			let canViewAll = true;
			return {
				canViewAll: canViewAll,
				currentTabIndex: 0,
				searchKey: '', //搜索字段，传递给组建,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType: 0,
				listData: [], //数据列表1
				listData_count: 0,
				pageInfo: {
					pageIndex: 1,
					pageSize: 10
				}
			}
		},
		onLoad() {
			this.getList();
			this.EventBus.register("reload_yiti_list", (param) => {
				this.reloadAllList();
			});
		},
		onPullDownRefresh() {
			this.reloadOneList();
		},
		onReachBottom() {
			this.getList();
		},
		components: {
			searchBox,
			loadMore,
			noticeText,
			uniNavBar
		},
		methods: {
			changeTabs: function(index) {
				this.currentTabIndex = index;
			},
			addData: function() {
				setTimeout(function() {
					uni.navigateTo({
						url: './swDetail?Flag=add'
					})
				}, 200);
			},
			viewAll: function() {
				uni.navigateTo({
					url: './allSw'
				})
			},
			reloadOneList: function() {
				this.pageInfo.pageIndex = 1;
				this.loadingType = 0;
				this.listData = [];
				this.getList();
			},
			reloadAllList: function() {

				this.pageInfo.pageIndex = 1;
				this.loadingType = 0;
				this.listData = [];
				this.getList();
			},
			getList: function() {
				//搜索中返回
				if (this.loadingType == 1) {
					return;
				}
				this.loadingType = 1;

				//拼接搜索条件
				let param = Object.assign(this.pageInfo, {
					"Yt0000": this.searchKey,
					"Ryid00": utils.getUserId()
				});

				uni.showLoading({
					title: '正在加载...'
				});
				this.$http.doRequest(this.$http.apiUrl + '/Yiti/MyHuiyi', param).then((data) => {
						if (data.Result == false) {
							this.loadingType = 2;
							uni.stopPullDownRefresh();
						} else {
							data.Data = data.Data || [];
							data.Data.forEach(item => {
								if (item.Zt0000 === 0) {
									item.Ztmc00 = "执行中";
								}
								else if (item.Zt0000 === 1) {
									item.Ztmc00 = "已结束";
								}
								else {
									item.Ztmc00 = "";
								}
							});
							this.listData = this.listData.concat(data.Data);
							this.pageInfo.pageIndex++;
							uni.stopPullDownRefresh();
							this.loadingType = 0;
							this.listData_count = data.Count;
						}
					})
					.catch((data) => {
						console.log('待办发生异常:' + data);
					})
					.finally(() => {
						this.loadingType = 0;
						uni.hideLoading();
					});
			},
			remoteSearch: function(searchKey) {
				this.searchKey = searchKey;
				this.reloadAllList();
			},
			goView: function(e) {
				uni.navigateTo({
					url: "./huiyi-list?ytid=" + e.Id0000
				}); 
			}
			
		}
	}
</script>
<style>
	
	.tab-list {
		margin-top:100upx;
	}
	
	.grace-iconfont {
		padding-left: 10rpx;
	}

	.grace-news-list-info .left-margin {
		margin-left: 30rpx;
	}
</style>
