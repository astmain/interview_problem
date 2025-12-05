<template>
	<view class="page-body">
		<uni-nav-bar :leftIcon="leftIcon" @clickLeftIcon="clickLeftIcon" title="公文"></uni-nav-bar>
		<search-box v-on:remoteSearch="remoteSearch">
			<text class='iconfont icon-quanbu search-box-btn' @tap="viewAll()" v-if="canViewAll" ></text>
			<text class='iconfont icon-tianjia search-box-btn' style="font-size: 42upx;" @tap="addGw()" ></text>
		</search-box>
		<view class="tabs">
			<view :class="['tab',currentTabIndex==0 ? 'tab-on' : '']" @tap="changeTabs(0)">待办({{listData_count}})</view>
			<view :class="['tab',currentTabIndex==1 ? 'tab-on' : '']" @tap="changeTabs(1)">已办({{listData_2_count}})</view>
			<view :class="['tab',currentTabIndex==2 ? 'tab-on' : '']" @tap="changeTabs(2)">归档({{listData_3_count}})</view>
			<view :class="['tab',currentTabIndex==3 ? 'tab-on' : '']" @tap="changeTabs(3)">收藏({{listData_4_count}})</view>
		</view>
		<!-- 待办 -->
		<view :class="['tab-list',currentTabIndex==0 ? '' : 'hide']">
			<view> 
				<view class="grace-news-list">
					<view v-for="(item,key) in listData" :key="key" class="garace-hl-list" @click="goDaiban(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main" style="display: flex;">
									<notice-text :level="item.Level" ></notice-text>
									<text>
											<text :class="{'un_qs': item.Sfqs00 != 1,'un_leader': item.Fsrsfld == 1 }">{{item.Wjbt00 || ''}}</text>
										<text v-if="item.Jjlx00 == '急件'" class="jijian">急</text>
									</text>
								</view>
							</view>  
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>收文日期：{{item.Swrq00 || ''}}
								<text class="left-margin"></text>处理期限：{{item.Clqx00 || ''}}
							</view>
						</view> 
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>文件类别:{{item.Swlbmc || ''}}
								<text class="left-margin"></text>上一步处理人:{{item.Sybclrmc0 || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>上一步处理意见：{{item.Sybclyj00 || ''}}
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
					<view v-for="(item,key) in listData_2" :key="key" class="garace-hl-list"
						@longtap="showCollectionItems(0, item)" @click="goView(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main" style="display: flex;">
									<notice-text :level="item.Level" ></notice-text>
									<text style="flex: 11;">
										<text>{{item.Wjbt00 || ''}}</text>
										<text v-if="item.Jjlx00 == '急件'" class="jijian">急</text>
									</text>
								</view>
							</view> 
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>创建时间：{{item.Cjsj00 || ''}}
								<text class="left-margin"></text>文件类别:{{item.Swlbmc || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>处理时间: {{item.Zhclsj || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>来文单位：{{item.Lwdw00 || ''}}
								<text class="left-margin"></text>办理期限：{{item.Blqx00 || ''}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 归档 -->
		<view :class="['tab-list',currentTabIndex==2 ? '' : 'hide']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData_3" :key="key" class="garace-hl-list" 
						@longtap="showCollectionItems(0, item)" @click="goView(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main" style="display: flex;">
									<text style="flex: 11;">
										<text>{{item.Wjbt00 || ''}}</text>
										<text v-if="item.Jjlx00 == '急件'" class="jijian">急</text>
									</text>
								</view>
							</view> 
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>创建时间：{{item.Cjsj00 || ''}}
								<text class="left-margin"></text>文件类别:{{item.Swlbmc || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>归档时间:{{item.Gdsj00 || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>来文单位：{{item.Lwdw00 || ''}}
								<text class="grace-icons left-margin"></text>办理期限：{{item.Blqx00 || '' }}
							</view>
						</view> 
					</view>
				</view>
			</view>
		</view>
		<!-- 收藏 -->
		<view :class="['tab-list',currentTabIndex==3 ? '' : 'hide']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData_4" :key="key" class="garace-hl-list" 
							@longtap="showCollectionItems(1, item)" @tap="goView(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main" style="display: flex;">
									<text style="flex: 11;">
										<text>{{item.Wjbt00 || ''}}</text>
										<text v-if="item.Jjlx00 == '急件'" class="jijian">急</text>
									</text>
								</view>
							</view> 
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>创建时间：{{item.Cjsj00}}
								<text class="left-margin"></text>文件类别: {{item.Swlbmc || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>处理时间: {{item.Zhclsj || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>来文单位：{{item.Lwdw00 || ''}}
								<text class="grace-icons left-margin"></text>办理期限：{{item.Blqx00 || '' }}
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
			
			return {
				leftIcon: 'icon-zuojiantou',
				canViewAll : false ,
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
		onLoad(e) {
			// console.log( new Promise(()=>{}).finally);	
			// var promise = new Promise(function(resolve, reject) {
			// 	resolve();
			// });
			
			// promise.then(function() {
			// 	console.log('完成调用');
			// }).catch((err) => {
			// 	console.log('出现错误:' + err);
			// }).finally(() => {
			// 	console.log('finish');
			// });
			if(e.home)
				this.leftIcon = "icon-shouye"
			
			let userInfo = uni.getStorageSync("userinfo");
			
			if(!userInfo)
			{
					uni.reLaunch({
									url:'../my/login'
								})
								return;
			}
			
			if(userInfo && userInfo.Jsid00) { 
				this.canViewAll = userInfo.Jsid00.indexOf(',13,') > -1; 
			} 
			
			this.getList();
			this.getList2();
			this.getList3();
			this.getList4();

			//重新加载数据
			this.EventBus.register("reloadSwList", (param) => {
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
			else if (this.currentTabIndex == 3)
				this.getList4();
		},
		components: {
			searchBox,
			loadMore,
			noticeText,
			uniNavBar
		},
		methods: {
			clickLeftIcon: function() {
				// uni.showToast({
				// 	title:'返回首页'
				// })
				uni.reLaunch({
					url: '../home/index'
				})
			},
			/**
			 * falg 0:收藏; 1:取消收藏
			 * item 项
			 */
			showCollectionItems: function(flag, item) {
				let that = this;
				if(item.Sfsc00 === 1) { return; }
				let btns = [];
				btns = flag ? ['取消收藏'] : ['收藏'];
				if(this.currentTabIndex === 1) {
					btns.push('补发流程');
					btns.push('撤回');
				}
				if(this.currentTabIndex === 2) {
					btns.push('启用');
				}
				//btns.push('取消');
				
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
					if(cancel < 0) { return; }
					if(btns[cancel] === "取消") { return; }
					
					//补发流程
					if(btns[cancel] === "补发流程") {
						uni.showModal({
							title: '提示',
							content: '确定要补发流程吗?',
							success: function (res) {
								if(res.confirm) {
									that.bflc(item);
								}
							}
						});
						return;
					}
					
					//启用
					if(btns[cancel] === "启用") {
						uni.showModal({
							title: '提示',
							content: '确定要启用流程吗?',
							success: function (res) {
								if(res.confirm) {
									that.activeAfterGd(item);
								}
							}
						});
						return;
					}
					
					if(btns[cancel] === "撤回") {
						uni.showModal({
							title: '提示',
							content: '确定要撤回吗?',
							success: function (res) {
								if(res.confirm) {
									that.chehui(item);
								}
							}
						});
						return;
					}
					
					//收藏/取消收藏
					new Promise((resolve, reject) => {
						uni.showModal({
							title: '提示',
							content: '确定要' + btns[0] + "该公文吗?",
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
								that.getList4(true);
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
				if (this.loadingType == 1) {
					return;
				}
				this.loadingType = 1;
				if(reload) {
					this.pageInfo.pageIndex = 1;
					this.listData = [];
				}

				//拼接搜索条件
				let param = Object.assign(this.pageInfo, {
					"SearchText": this.searchKey,
					"userId": utils.getUserId()
				});

				// uni.showLoading({
				// 	title: '正在加载...'
				// }); 
				this.$http.doRequest(this.$http.apiUrl + '/Sw/SearchSwDaiban', param).then((data) => {
						if (data.Result == false) {
							this.loadingType = 2;
							this.listData_count = data.Count;
							uni.stopPullDownRefresh();
						} else {
							data.Data = data.Data || [];
							data.Data.forEach(item => {
								item.Swrq00 = item.Swrq00 ? item.Swrq00 : "";
								item.Blqx00 = item.Blqx00 ? item.Blqx00 : "";
								item.Swrq00 = item.Swrq00.substr(0,10);
								item.Blqx00 = item.Blqx00.substr(0,10);
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
						//uni.hideLoading();
						console.log('wanc ');
					});
			},
			getList2: function(reload) {
				//搜索中返回
				if (this.loadingType_2 == 1) {
					return;
				}
				this.loadingType_2 = 1;
				if(reload) {
					this.pageInfo_2.pageIndex = 1;
					this.listData_2 = [];
				}


				//拼接搜索条件
				let param = Object.assign(this.pageInfo_2, {
					"SearchText": this.searchKey,
					"userId": utils.getUserId(),
					"flag": 'ZB'
				});

				this.$http.doRequest(this.$http.apiUrl + '/Sw/SearchSwZaiban', param).then((data) => {
						if (data.Result == false) {
							this.loadingType_2 = 2;
							this.listData_2_count = data.Count;
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
				//搜索中返回
				if (this.loadingType_3 == 1) {
					return;
				}
				this.loadingType_3 = 1;
				if(reload) {
					this.pageInfo_3.pageIndex = 1;
					this.listData_3 = [];
				}


				//拼接搜索条件
				let param = Object.assign(this.pageInfo_3, {
					"SearchText": this.searchKey,
					"userId": utils.getUserId(),
					"flag": 'GD'
				});

				this.$http.doRequest(this.$http.apiUrl + '/Sw/SearchSwZaiban', param).then((data) => {
						if (data.Result == false) {
							this.loadingType_3 = 2;
							this.listData_3_count = data.Count;
							uni.stopPullDownRefresh();
						} else {
							data.Data = data.Data || [];
							data.Data.forEach(item => {
								item.Blqx00 = item.Blqx00 ? item.Blqx00.substr(0, 10) : 0;
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
			getList4: function(reload) {
				//搜索中返回
				if (this.loadingType_4 == 1) {
					return;
				}
				this.loadingType_4 = 1;
				if(reload) {
					this.pageInfo_4.pageIndex = 1;
					this.listData_4 = [];
				}
			
				//拼接搜索条件
				let param = Object.assign(this.pageInfo_4, {
					"SearchText": this.searchKey, 
					"userId": utils.getUserId(),
					"flag": 'GD'
				});
				this.$http.doRequest(this.$http.apiUrl + '/Sw/SearchMyGwSc', param).then((data) => {
					if (data.Result == false) {
						this.loadingType_4 = 2;
						this.listData_4_count = data.Count;
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
			goView: function(e) {
				uni.navigateTo({
					url: "./swDetail?Flag=view&Zbid00=" + e.Id0000
				})
			},
			setQianshou: function(e) {
				this.$http.doRequest(this.$http.apiUrl + '/Sw/SetQianShou', {
					Flowid: e.Id0000
				}).then((data) => {});
			},
			addGw: function() {
				uni.navigateTo({
					url: "./swDetail?Flag=add"
				});
			},
			bflc: function(item) {
				let that = this;
				this.$http.doRequest(this.$http.apiUrl + '/Sw/AddFlow', {
					Zbid00: item.Id0000,
					UserId: utils.getUserId()
				}).then((data) => {
					uni.showModal({
						title: '提示',
						content: data.Msg,
						showCancel: false
					});
					if(data.Result) { 
						setTimeout(() => {
							that.getList(true);
						}, 10);
					}
				})
				.catch((data) => {
					console.log('待办发生异常:' + data); 
				});
			},
			activeAfterGd: function(item) {
				let that = this;
				this.$http.doRequest(this.$http.apiUrl + '/Sw/activeAfterGd', {
					Zbid00: item.Id0000,
					UserId: utils.getUserId()
				}).then((data) => {
					uni.showModal({
						title: '提示',
						content: data.Msg,
						showCancel: false
					});
					if(data.Result) { 
						setTimeout(() => {
							that.getList(true);
						}, 10);
					}
				})
				.catch((data) => {
					console.log('待办发生异常:' + data); 
				});
			},
			chehui: function(item) {
				let that = this;
				this.$http.doRequest(this.$http.apiUrl + '/Sw/CheHui', {
					Zbid00: item.Id0000,
					UserId: utils.getUserId()
				}).then((data) => {
					uni.showModal({
						title: '提示',
						content: data.Msg,
						showCancel: false
					});
					if(data.Result) { 
						setTimeout(() => {
							that.getList(true);
						}, 10);
					}
				})
				.catch((data) => {
					console.log('待办发生异常:' + data); 
				});
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
	
	.jijian {
		font-size: 9px;
		color: #FF0000;
		top: -8px;
		margin-left: 3px;
		position: relative;
	}
	
	.un_qs {
		color: #00BFFF;
	}
	.un_leader {
		color: #ff5500 !important;
	}
	
</style>
