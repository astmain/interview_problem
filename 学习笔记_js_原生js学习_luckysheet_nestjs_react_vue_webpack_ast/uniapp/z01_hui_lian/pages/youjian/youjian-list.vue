<template>
	<view class="page-body">
		<uni-nav-bar title="邮件"></uni-nav-bar>
		<search-box v-on:remoteSearch="remoteSearch">
			<text class='iconfont icon-tianjia search-box-btn' style="font-size: 42upx;" @tap="addYoujian()" v-if="canViewAll" ></text>
		</search-box>
		<view class="tabs">
			<view :class="['tab',currentTabIndex==0 ? 'tab-on' : '']" @tap="changeTabs(0)">收件箱({{listData_count}})</view>
			<view :class="['tab',currentTabIndex==1 ? 'tab-on' : '']" @tap="changeTabs(1)">发件箱({{listData_2_count}})</view>
			<view :class="['tab',currentTabIndex==2 ? 'tab-on' : '']" @tap="changeTabs(2)">收藏({{listData_3_count}})</view>
			<!-- <view :class="['tab',currentTabIndex==3 ? 'tab-on' : '']" @tap="changeTabs(3)">收藏({{listData_4_count}})</view> -->
		</view>
		<!-- 收件箱 -->
		<view :class="['tab-list',currentTabIndex==0 ? '' : 'hide']">
			<view> 
				<view class="grace-news-list">
					<view v-for="(item,key) in listData" :key="key" class="garace-hl-list" 
						@longtap="showItemMenu(item,0)" @tap="goView(item,0)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main" style="display: flex;">
									<text style="flex: 11;" :class="{'unread': item.Yzt000 < 2}">{{item.Bt0000 || ''}}</text>
								</view>
							</view>  
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>发送人:{{item.Fsrxm0 || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>发送时间:{{item.Fssj00 || ''}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 发件箱 -->
		<view :class="['tab-list',currentTabIndex==1 ? '' : 'hide']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData_2" :key="key" class="garace-hl-list"
						@longtap="showItemMenu(item,1)" @tap="goView(item,1)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main" style="display: flex;">
									<text style="flex: 11;">{{item.Bt0000 || ''}}</text>
								</view>
							</view>  
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width:700upx;">
								<text class="icon-size iconfont icon-i-info"></text>接收人:{{item.Jsrxms || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>发送时间:{{item.Fssj00 || ''}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 收藏 -->
		<view :class="['tab-list',currentTabIndex==2 ? '' : 'hide']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData_3" :key="key" class="garace-hl-list" 
						@longtap="showCollectionItems(0, item)" @click="goView(item, 0)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main" style="display: flex;">
									<text style="flex: 11;">{{item.Bt0000 || ''}}</text>
								</view>
							</view>  
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>发送人:{{item.Fsrxm0 || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>发送时间:{{item.Fssj00 || ''}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--  -->
		<view :class="['tab-list',currentTabIndex==3 ? '' : 'hide']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData_4" :key="key" class="garace-hl-list" 
							@longtap="showCollectionItems(1, item)" @tap="goView(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main" style="display: flex;">
									<text style="flex: 11;">{{item.Bt0000 || ''}}</text>
								</view>
							</view>  
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>发送人:{{item.Fsrxm0 || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>发送时间:{{item.Fssj00 || ''}}
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
		<!-- 加载更多3 -->
		<view :class="[currentTabIndex==2 ? '' : 'hide']">
			<load-more :loadingType="loadingType_3" :contentText="contentText"></load-more>
		</view>
		<!-- 加载更多4 -->
		<view :class="[currentTabIndex==3 ? '' : 'hide']">
			<load-more :loadingType="loadingType_4" :contentText="contentText"></load-more>
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
			if(userInfo && userInfo.Jsid00) { 
				canViewAll = userInfo.Jsid00.indexOf(',13,') > -1; 
			} 
			canViewAll = true;
			return {
				canViewAll : canViewAll ,
				currentTabIndex: 0,
				searchKey: '', //搜索字段，传递给组建,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType: 0,
				listData: [], //数据列表1
				listData_count:0,
				pageInfo: {
					pageIndex: 1,
					pageSize: 10
				},
				loadingType_2: 0,
				listData_2: [], //数据列表2
				listData_2_count:0,
				pageInfo_2: {
					pageIndex: 1,
					pageSize: 10
				},
				loadingType_3: 0,
				listData_3: [], //数据列表3
				listData_3_count:0,
				pageInfo_3: {
					pageIndex: 1,
					pageSize: 10
				},
				
				loadingType_4: 0,
				listData_4: [], //数据列表3
				listData_4_count:0,
				pageInfo_4: {
					pageIndex: 1,
					pageSize: 10
				}
			}
		},
		onLoad() {
			this.getList();
			this.getList2();
			this.getList3();
// 			this.getList4();
// 
			//重新加载数据
			this.EventBus.register("reloadYoujianList", (param) => {
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
			else if (this.currentTabIndex == 2)
				this.getList3();
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
			showItemMenu: function(item,index) {
				let that = this;
				uni.showActionSheet({
					itemList: ['删除', '收藏'],
					success: function (res) {
						if(res.tapIndex === 0) {
							that.deleteMail(item, index);
						}
						else if(res.tapIndex === 1) {
							that.addSc(item, index);
						}
					}
				});
			},
			deleteMail: function(item, index) {
				console.log(JSON.stringify(item));
				let that = this;
				this.$http.doRequest(this.$http.apiUrl + '/Youjian/Delete', {
					"userid": utils.getUserId(),
					"from": index === 0 ? 'rb' : 'sb',
					"ids": index === 0 ? item.MainId : item.Id0000
				}).then((data) => {
					uni.showModal({
						title: '提示', 
						content: data.Msg,
						showCancel: false,
						success: res => {
							that.reloadAllList();
						}
					});
					
				}).finally(() => {
				});
			},
			addSc: function(item, index) {
				this.$http.doRequest(this.$http.apiUrl + '/Sw/AddMyGwSc', {
					Gwid00: index === 0 ? item.MainId : item.Id0000,
					Gwlx00: 'Youjian',
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
						this.getList(true);
					}
				})
			},
			addYoujian: function() {
				setTimeout(function() {
					uni.navigateTo({
						url: './youjian-add'
					})
				}, 200);
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
				} else if (this.currentTabIndex == 2) {
					this.pageInfo_3.pageIndex = 1;
					this.loadingType_3 = 0;
					this.listData_3 = [];
					this.getList3();
				} else if (this.currentTabIndex == 3) {
					this.pageInfo_4.pageIndex = 1;
					this.loadingType_4 = 0;
					this.listData_4 = [];
					this.getList4();
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

				this.pageInfo_3.pageIndex = 1;
				this.loadingType_3 = 0;
				this.listData_3 = [];
				this.getList3();
				
				this.pageInfo_4.pageIndex = 1;
				this.loadingType_4 = 0;
				this.listData_4 = [];
				this.getList4();
			},
			getList: function(reload) {
				//搜索中返回
				if(reload) {
					this.listData = [];
					this.pageInfo.pageIndex = 1;
				}
				if (this.loadingType == 1) {
					return;
				}
				this.loadingType = 1;

				//拼接搜索条件
				let param = Object.assign(this.pageInfo, {
					"Bt0000": this.searchKey,
					"userId": utils.getUserId()
				});

				// uni.showLoading({
				// 	title: '正在加载...'
				// }); 
				this.$http.doRequest(this.$http.apiUrl + '/Youjian/QueryReceivedMail', param).then((data) => {
						if (data.Result == false) {
							this.loadingType = 2;
							uni.stopPullDownRefresh();
						} else {
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
						uni.hideLoading();
					});
			},
			getList2: function(reload) {
				if(reload) {
					this.listData_2 = [];
					this.pageInfo_2.pageIndex = 1;
				}
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

				this.$http.doRequest(this.$http.apiUrl + '/Youjian/QuerySentMail', param).then((data) => {
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
			getList3: function(reload) {
				if(reload) {
					this.listData_3 = [];
					this.pageInfo_3.pageIndex = 1;
				}
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

				this.$http.doRequest(this.$http.apiUrl + '/Youjian/QueryReceivedMailSc', param).then((data) => {
						if (data.Result == false) {
							this.loadingType_3 = 2;
							uni.stopPullDownRefresh();
						} else {
							data.Data = data.Data || [];
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
							item.Blqx00 = item.Blqx00 ? item.Blqx00.substr(0, 10) : 0;
							item.Id0000 = item.Gwid00; 
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
					e.Sfqs00  = 1;//设置为1
					this.setQianshou(e);
				}; 
				uni.navigateTo({
					url: "./swDetail?Flag=dispose&Flowid=" + e.Id0000 + "&Zbid00=" + e.Zbid00
				})
			},
			goView: function(e,index) {
				let id = "";
				let from = "";
				if(index === 0) {
					id = e.MainId;
					from = "rb";
				}
				else if(index === 1) {
					id = e.Id0000;
					from = "sb";
				}
				uni.navigateTo({
					url: "./youjian-detail?id=" + id + "&from=" + from
				})
			},
			setQianshou: function(e) {
				this.$http.doRequest(this.$http.apiUrl + '/Sw/SetQianShou', {
					Flowid: e.Id0000
				}).then((data) => {});
			},
			showCollectionItems: function(flag, item) {
				let btns = ['取消收藏'];
				btns.push('取消');
				new Promise((resolve, reject) => {
					uni.showActionSheet({
						itemList: btns,
						success: function (res) {
							resolve(res.tapIndex);
						},
						fail() {
							resolve(-1);
						}
					});	
				}).then((cancel) => {
					if(cancel !== 0) { return; }
					new Promise((resolve, reject) => {
						uni.showModal({
							title: '提示',
							content: '确定要' + btns[0] + "该邮件吗?",
							success: function (res) {
								resolve(res.confirm ? 0 : 1);
							},
							fail() {
								resolve(1);
							}
						});
					}).then((cancel) => {
						if(cancel !== 0) { return; }
						uni.showLoading({ title: '处理中...' });
						this.$http.doRequest(this.$http.apiUrl + '/Sw/DelMyGwSc', {
							Gwid00: (flag ? item.Gwid00 : item.MainId), 
							Gwlx00: 'Youjian',
							UserId: utils.getUserId()
						}).then((data) => {
							uni.showModal({
								title: '提示',
								content: data.Msg,
								showCancel: false
							});
							if (data.Result) {
								this.getList(true);
								this.getList2(true);
								this.getList3(true);
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
			}
		}
	}
</script>
<style>
	
	.grace-iconfont {
		padding-left:10rpx;
	}

	.grace-news-list-info .left-margin {
		margin-left: 30rpx;
	}
	
	.unread {
		font-weight: bold;
		color: #50C4FF;
	}
	
	
</style>
