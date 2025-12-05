<template>
	<view class="page-body">
		<uni-nav-bar title="发文稿件"></uni-nav-bar>
		<search-box v-on:remoteSearch="remoteSearch">
			<text class='iconfont icon-quanbu search-box-btn' @tap="viewAll()" v-if="canViewAll"></text>
		</search-box>
		<view class="tabs">
			<view :class="['tab',currentTabIndex==0 ? 'tab-on' : '']" @tap="changeTabs(0)">待签({{listData_count}})</view>
			<view :class="['tab',currentTabIndex==1 ? 'tab-on' : '']" @tap="changeTabs(1)">已签({{listData_2_count}})</view>
		</view>
		<!-- 待办 -->
		<view :class="['tab-list',currentTabIndex==0 ? '' : 'hide']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData" :key="key" class="garace-hl-list" @click="goDaiban(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main" style="display: flex;">
									<!-- <notice-text :level="item.Level" style="flex: 1;"></notice-text> -->
									<text style="flex: 11;">{{item.Wjbt00 || ''}}</text>
								</view>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>印发日期：{{item.Yfrq00 || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>拟稿人:{{item.Ngr000 || ''}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 已办 -->
		<view :class="['tab-list',currentTabIndex==1 ? '' : 'hide']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData_2" :key="key" class="garace-hl-list" @longtap="showCollectionItems(0, item)"
					 @click="goView(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main" style="display: flex;">
									<!-- <notice-text :level="item.Level" style="flex: 1;"></notice-text> -->
									<text style="flex: 11;">{{item.Wjbt00 || ''}}</text>
								</view>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>印发日期：{{item.Yfrq00 || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>拟稿人:{{item.Ngr000 || ''}}
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
		<!-- 加载更多2 -->
		<view :class="[currentTabIndex==1 ? '' : 'hide']">
			<load-more :loadingType="loadingType_2" :contentText="contentText"></load-more>
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
			let canViewAll = false;
			if (userInfo && userInfo.Jsid00) {
				canViewAll = userInfo.Jsid00.indexOf(',13,') > -1;
			}
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
				},
				loadingType_2: 0,
				listData_2: [], //数据列表2
				listData_2_count: 0,
				pageInfo_2: {
					pageIndex: 1,
					pageSize: 10
				},
			}
		},
		onLoad() {
			this.getList();
			this.getList2();

			//重新加载数据
			this.EventBus.register("reloadFwList", (param) => {
				this.reloadAllList();
			});
		},
		onPullDownRefresh() {
			this.reloadOneList();
		},
		onReachBottom() {
			if (this.currentTabIndex == 0)
				this.getList();
			else if (this.currentTabIndex == 1)
				this.getList2();
		},
		components: {
			searchBox,
			loadMore,
			noticeText,
			uniNavBar
		},
		methods: {
			/**
			 * falg 0:收藏; 1:取消收藏
			 * item 项
			 */
			showCollectionItems: function(flag, item) {},
			changeTabs: function(index) {
				this.currentTabIndex = index;
			},
		
			viewAll: function() {
				uni.navigateTo({
					url: './allzzgj'
				})
			},
			reloadOneList: function() {
				if (this.currentTabIndex == 0) {
					this.pageInfo.pageIndex = 1;
					this.loadingType = 0;
					this.listData = [];
					this.getList();
				} else if (this.currentTabIndex == 1) {
					this.pageInfo_2.pageIndex = 1;
					this.loadingType_2 = 0;
					this.listData_2 = [];
					this.getList2();
				}
			},
			reloadAllList: function() {

				this.pageInfo.pageIndex = 1;
				this.loadingType = 0;
				this.listData = [];
				this.getList();

				this.pageInfo_2.pageIndex = 1;
				this.loadingType_2 = 0;
				this.listData_2 = [];
				this.getList2();

			},
			getList: function() {
				//搜索中返回
				if (this.loadingType == 1) {
					return;
				}
				this.loadingType = 1;

				//拼接搜索条件
				let param = Object.assign(this.pageInfo, {
					"Fwbt00": this.searchKey,
					"userId": utils.getUserId()
				});

				this.$http.doRequest(this.$http.apiUrl + '/Fw/SearchZzgjDaiban', param).then((data) => {
					
						if (data.Result == false) {
							this.loadingType = 2;
							uni.stopPullDownRefresh();
						} else {
							
							this.listData = this.listData.concat(data.Data);
							data.Data = data.Data || [];
							data.Data.forEach(item => {
								item.Yfrq00 = item.Yfrq00 ? item.Yfrq00.substr(0, 10) : 0;
							});
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
						uni.hideLoading();
					});
			},
			getList2: function() {
				//搜索中返回
				if (this.loadingType_2 == 1) {
					return;
				}
				this.loadingType_2 = 1;

				//拼接搜索条件
				let param = Object.assign(this.pageInfo_2, {
					"Wjbt00": this.searchKey,
					"userId": utils.getUserId(),
					"flag": 'ZB'
				});

				this.$http.doRequest(this.$http.apiUrl + '/Fw/SearchZzgjZaiban', param).then((data) => {
						if (data.Result == false) {
							this.loadingType_2 = 2;
							uni.stopPullDownRefresh();
						} else {
							data.Data = data.Data || [];
							data.Data.forEach(item => {
								item.Yfrq00 = item.Yfrq00 ? item.Yfrq00.substr(0, 10) : 0;
							});
							this.listData_2 = this.listData_2.concat(data.Data);
							this.pageInfo_2.pageIndex++;
							uni.stopPullDownRefresh();
							this.loadingType_2 = 0;
							this.listData_2_count = data.Count;
						}
					})
					.catch((data) => {

					});
			},
			remoteSearch: function(searchKey) {
				this.searchKey = searchKey;
				this.reloadAllList();
			},
			goDaiban: function(e) {
				/* if (e.Sfqs00 != 1) {
					e.Sfqs00 = 1; //设置为1
					this.setQianshou(e);
				}; */
				uni.navigateTo({
					url: "./zzgjDetail?Flag=dispose&Flowid=" + e.Id0000 + "&Zbid00=" + e.Zbid00
				})
			},
			goView: function(e) {
				uni.navigateTo({
					url: "./zzgjDetail?Flag=view&Zbid00=" + e.Id0000
				})
			},
			setQianshou: function(e) {
				this.$http.doRequest(this.$http.apiUrl + '/Fw/zzgjQianShou', {
					userid: utils.getUserId(),
					Flowid: e.Id0000
				}).then((data) => {
					
					
				});
			}
		}
	}
</script>
<style>
	.grace-iconfont {
		padding-left: 10rpx;
	}

	.grace-news-list-info .left-margin {
		margin-left: 30rpx;
	}
</style>
