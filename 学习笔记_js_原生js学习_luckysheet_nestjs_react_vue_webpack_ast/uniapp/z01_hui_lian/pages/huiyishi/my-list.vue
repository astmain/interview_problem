<template>
	<view class="page-body">
		<uni-nav-bar title="我的会议"></uni-nav-bar>
		<search-box v-on:remoteSearch="remoteSearch"></search-box>
		<!-- 待办 -->
		<view :class="['tab-list',currentTabIndex==0 ? '' : 'hide']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData" :key="key" class="garace-hl-list" @click="goView(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main" style="display: flex;">
									<text style="flex: 11;">{{item.Yt0000 || ''}}</text>
								</view>
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>议题:{{item.Ytbt00 || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>汇报人:{{item.Hbr000 || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>汇报类型	：{{item.Hylx00 || ''}}
								<text class="left-margin"></text>议题状态：{{item.Ytztmc || ''}}
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
				loadingType_3: 0,
				listData_3: [], //数据列表3
				listData_3_count: 0,
				pageInfo_3: {
					pageIndex: 1,
					pageSize: 10
				},

				loadingType_4: 0,
				listData_4: [], //数据列表3
				listData_4_count: 0,
				pageInfo_4: {
					pageIndex: 1,
					pageSize: 10
				}
			}
		},
		onLoad() {
			this.getList();
// 			this.getList2();
// 			this.getList3();
// 			this.getList4();
// 
			//重新加载数据
			// this.EventBus.register("reloadSwList", (param) => {
			// 	this.reloadAllList();
			// });
		},
		onPullDownRefresh() {
			this.reloadOneList();
		},
		onReachBottom() {
			this.getList();
			// if (this.currentTabIndex == 0)
			// 	this.getList();
			// else if (this.currentTabIndex == 1)
			// 	this.getList2();
			// else if (this.currentTabIndex == 2)
			// 	this.getList3();
			// else if (this.currentTabIndex == 3)
			// 	this.getList4();
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
			showCollectionItems: function(flag, item) {
				console.log(JSON.stringify(item));
				if (item.Sfsc00 === 1) {
					return;
				}
				let btns = flag ? ['取消收藏'] : ['收藏'];
				btns.push('取消');
				new Promise((resolve, reject) => {
					uni.showActionSheet({
						itemList: btns,
						success: function(res) {
							resolve(res.tapIndex);
						},
						fail() {
							resolve(-1);
						}
					});
				}).then((cancel) => {
					if (cancel !== 0) {
						return;
					}
					new Promise((resolve, reject) => {
						uni.showModal({
							title: '提示',
							content: '确定要' + btns[0] + "该公文吗?",
							success: function(res) {
								resolve(res.confirm ? 0 : 1);
							},
							fail() {
								resolve(1);
							}
						});
					}).then((cancel) => {
						if (cancel !== 0) {
							return;
						}
						uni.showLoading({
							title: '处理中...'
						});
						this.$http.doRequest(this.$http.apiUrl + '/Sw/' + (flag ? 'DelMyGwSc' : 'AddMyGwSc'), {
							Gwid00: (flag ? item.Gwid00 : item.Id0000),
							Gwlx00: 'Sw',
							UserId: utils.getUserId()
						}).then((data) => {
							uni.showModal({
								title: '提示',
								content: data.Msg,
								showCancel: false
							});
							if (data.Result) {
								this.getList2(true);
								this.getList3(true);
								this.getList4(true);
							}
						})
					}).finally(() => {
						uni.hideLoading();
					});
				});
			},
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
				
				// if (this.currentTabIndex == 0) {
				// 	this.pageInfo.pageIndex = 1;
				// 	this.loadingType = 0;
				// 	this.listData = [];
				// 	this.getList();
				// } else if (this.currentTabIndex == 1) {
				// 	this.pageInfo_2.pageIndex = 1;
				// 	this.loadingType_2 = 0;
				// 	this.listData_2 = [];
				// 	this.getList2();
				// } else if (this.currentTabIndex == 2) {
				// 	this.pageInfo_3.pageIndex = 1;
				// 	this.loadingType_3 = 0;
				// 	this.listData_3 = [];
				// 	this.getList3();
				// } else if (this.currentTabIndex == 3) {
				// 	this.pageInfo_4.pageIndex = 1;
				// 	this.loadingType_4 = 0;
				// 	this.listData_4 = [];
				// 	this.getList4();
				// }
			},
			reloadAllList: function() {

				this.pageInfo.pageIndex = 1;
				this.loadingType = 0;
				this.listData = [];
				this.getList();

// 				this.pageInfo_2.pageIndex = 1;
// 				this.loadingType_2 = 0;
// 				this.listData_2 = [];
// 				this.getList2();
// 
// 				this.pageInfo_3.pageIndex = 1;
// 				this.loadingType_3 = 0;
// 				this.listData_3 = [];
// 				this.getList3();
// 
// 				this.pageInfo_4.pageIndex = 1;
// 				this.loadingType_4 = 0;
// 				this.listData_4 = [];
// 				this.getList4();
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
					"userId": utils.getUserId()
				});

				uni.showLoading({
					title: '正在加载...'
				});
				this.$http.doRequest(this.$http.apiUrl + '/Huiyi/QueryMyMeeting', param).then((data) => {
						if (data.Result == false) {
							this.loadingType = 2;
							uni.stopPullDownRefresh();
						} else {
							data.Data = data.Data || [];
							data.Data.forEach(item => {
								if (item.Ytzt00 === 0) {
									item.Ytztmc = "执行中";
								}
								else if (item.Ytzt00 === 1) {
									item.Ytztmc = "已结束";
								}
								else {
									item.Ytztmc = "";
								}
								
								
								if (item.Hyzt00 === 0) {
									item.Hyztmc = "等待上报";
								}
								else if (item.Hyzt00 === 1) {
									item.Hyztmc = "等待安排";
								}
								else if (item.Hyzt00 === 2) {
									item.Hyztmc = "会议已安排";
								}
								else {
									item.Hyztmc = "";
								}
							});
							this.listData = this.listData.concat(data.Data);
							this.pageInfo.pageIndex++;
							uni.stopPullDownRefresh();
							this.loadingType = 0;
							this.listData_count = data.Count;
							
							uni.hideLoading();
						}
					})
					.catch((data) => {
						console.log('待办发生异常:' + data);
						
						uni.hideLoading();
					})
					;
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

				this.$http.doRequest(this.$http.apiUrl + '/Sw/SearchSwZaiban', param).then((data) => {
						if (data.Result == false) {
							this.loadingType_2 = 2;
							uni.stopPullDownRefresh();
						} else {
							data.Data = data.Data || [];
							data.Data.forEach(item => {
								item.Blqx00 = item.Blqx00 ? item.Blqx00.substr(0, 10) : 0;
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
			getList3: function() {
				//搜索中返回
				if (this.loadingType_3 == 1) {
					return;
				}
				this.loadingType_3 = 1;

				//拼接搜索条件
				let param = Object.assign(this.pageInfo_3, {
					"Wjbt00": this.searchKey,
					"userId": utils.getUserId(),
					"flag": 'GD'
				});

				this.$http.doRequest(this.$http.apiUrl + '/Sw/SearchSwZaiban', param).then((data) => {
						if (data.Result == false) {
							this.loadingType_3 = 2;
							uni.stopPullDownRefresh();
						} else {
							data.Data = data.Data || [];
							data.Data.forEach(item => {
								if (item.Ytzt00 === 0) {
									item.Ytztmc = "执行中";
								}
								else if (item.Ytzt00 === 1) {
									item.Ytztmc = "已结束";
								}
								else {
									item.Ytztmc = "";
								}
								
								
								if (item.Hyzt00 === 0) {
									item.Hyztmc = "等待上报";
								}
								else if (item.Hyzt00 === 1) {
									item.Hyztmc = "等待安排";
								}
								else if (item.Hyzt00 === 2) {
									item.Hyztmc = "会议已安排";
								}
								else {
									item.Hyztmc = "";
								}
							});
							this.listData_3 = this.listData_3.concat(data.Data);
							this.pageInfo_3.pageIndex++;
							uni.stopPullDownRefresh();
							this.loadingType_3 = 0;
							this.listData_3_count = data.Count;
						}
					})
					.catch((data) => {
						console.log('归档发生异常:' + JSON.stringify(data));
					});
			},
			getList4: function() {
				//搜索中返回
				if (this.loadingType_4 == 1) {
					return;
				}
				this.loadingType_4 = 1;

				//拼接搜索条件
				let param = Object.assign(this.pageInfo_4, {
					"Wjbt00": this.searchKey,
					"userId": utils.getUserId(),
					"flag": 'GD'
				});
				this.$http.doRequest(this.$http.apiUrl + '/Sw/SearchMyGwSc', param).then((data) => {
						if (data.Result == false) {
							this.loadingType_4 = 2;
							uni.stopPullDownRefresh();
						} else {
							data.Data = data.Data || [];
							data.Data.forEach(item => {
								
							});
							this.listData_4 = this.listData_4.concat(data.Data);
							this.pageInfo_4.pageIndex++;
							uni.stopPullDownRefresh();
							this.loadingType_4 = 0;
							this.listData_4_count = data.Count;
						}
					})
					.catch((data) => {
						console.log('归档发生异常:' + JSON.stringify(data));
					});
			},
			remoteSearch: function(searchKey) {
				this.searchKey = searchKey;
				this.reloadAllList();
			},
			goDaiban: function(e) {
				if (e.Sfqs00 != 1) {
					e.Sfqs00 = 1; //设置为1
					this.setQianshou(e);
				};
				uni.navigateTo({
					url: "./swDetail?Flag=dispose&Flowid=" + e.Id0000 + "&Zbid00=" + e.Zbid00
				})
			},
			goView: function(e) {
				return;
				uni.navigateTo({
					url: "./huiyiDetail?flag=fullView&id=" + e.Hyid00
				})
			},
			setQianshou: function(e) {
				return;
				this.$http.doRequest(this.$http.apiUrl + '/Sw/SetQianShou', {
					Flowid: e.Id0000
				}).then((data) => {});
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
