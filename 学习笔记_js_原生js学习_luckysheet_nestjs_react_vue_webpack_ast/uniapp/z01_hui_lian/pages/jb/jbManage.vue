<template>
	<view class="page-body">
		<uni-nav-bar title="通用审批"></uni-nav-bar>
		<search-box v-on:remoteSearch="remoteSearch">
			<text class="grace-icons icon-safe search-box-btn" @tap="addData()"></text>
			<text class='iconfont icon-quanbu search-box-btn' @tap="viewAll()"></text>
		</search-box>

		<view class="tabs">
			<view :class="['tab',currentTabIndex==0 ? 'tab-on' : '']" @tap="changeTabs(0)">待办({{listData_count}})</view>
			<view :class="['tab',currentTabIndex==1 ? 'tab-on' : '']" @tap="changeTabs(1)">已办({{listData_2_count}})</view>
			<view :class="['tab',currentTabIndex==2 ? 'tab-on' : '']" @tap="changeTabs(2)">归档({{listData_3_count}})</view>
		</view>
		<!-- 待办 -->
		<view :class="['tab-list',currentTabIndex==0 ? '' : 'hide']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData" :key="key" class="garace-hl-list" @click="goDaiban(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main">
									<notice-text :level="item.Level"></notice-text>
									<text>{{item.Jbbt00}}</text>
								</view>
								<text class="grace-news-list-title-desc grace-text-overflow">发起人员：{{item.Jbrmc0||''}}</text>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>
								发起时间：{{item.Jbsj00||''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>
								</text>上一步处理时间：{{item.Cjsj00}}
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
					<view v-for="(item,key) in listData_2" :key="key" class="garace-hl-list" @longtap="showCollectionItems(0, item)"  @click="goView(item)">
							
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main">
									<notice-text :level="item.Level"></notice-text>
									<text>{{item.Jbbt00.substr(0,10)||''}}</text>
								</view>
								<text class="grace-news-list-title-desc grace-text-overflow">承办：{{item.Cbdw00||''}}</text>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text></text>发起人员：{{item.Jbrmc0}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text></text>创建时间：{{item.Cjsj00}}
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
					<view v-for="(item,key) in listData_3" :key="key" class="garace-hl-list" @click="goView(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main">
									<notice-text :level="item.Level"></notice-text>
									<text>{{item.Jbbt00.substr(0,10)||''}}</text>
								</view>
								<text class="grace-news-list-title-desc grace-text-overflow">发起人员：{{item.Jbrmc0}}</text>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>创建时间：{{item.Cjsj00}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>归档时间：{{item.Gdsj00}}
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
	</view>
</template>
<script>
	import searchBox from '../../components/search-box.vue'
	import loadMore from '../../components/load-more.vue'
	import noticeText from '../../components/notice-text.vue'
	import utils from '../../common/utils.js'
	import uniNavBar from "@/components/uni-nav-bar.vue";

	export default {
		data() {
			return {
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
				}
			}
		},
		onLoad() {
			this.getList();
			this.getList2();
			this.getList3();

			//重新加载数据
			this.EventBus.register("reloadJbList", (param) => {
				this.reloadAllList();
				setTimeout(() => {

				}, 5200);

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
		},
		components: {
			searchBox,
			loadMore,
			noticeText,
			uniNavBar
		},
		methods: {
			showCollectionItems: function(flag, item) {
				let that = this;
				let btns = [];
				
				if(this.currentTabIndex === 1) {
					btns.push('补发流程');
					btns.push('撤回');
				}
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
					});
			},
			changeTabs: function(index) {
				this.currentTabIndex = index;
			},
			addData: function() {
				setTimeout(function() {
					uni.navigateTo({
						url: '../jb/jbDetail?Flag=add'
					})
				}, 200);
			},
			viewAll: function() {
				uni.navigateTo({
					url: './jbAll'
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
			},
			getList: function() {
				//搜索中返回
				if (this.loadingType == 1) {
					return;
				}
				this.loadingType = 1;

				//拼接搜索条件
				let param = Object.assign(this.pageInfo, {
					"Jbbt00": this.searchKey,
					"userId": utils.getUserId()
				});
				// uni.showLoading({
				// 	title: '正在加载...'
				// });
				this.$http.doRequest(this.$http.apiUrl + '/Jb/SearchJbDaiban', param).then((data) => {
						if (data.Result == false) {
							this.loadingType = 2;
							uni.stopPullDownRefresh();
							this.listData_count = data.Count;
						} else {
							this.listData = this.listData.concat(data.Data);
							this.pageInfo.pageIndex++;
							data.Data = data.Data || [];
							data.Data.forEach(item => {
								item.Jbsj00 = item.Jbsj00 ? item.Jbsj00 : "";
								item.Jbsj00 = item.Jbsj00.substr(0,10);
							});
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
					"Jbbt00": this.searchKey,
					"userId": utils.getUserId(),
					"flag": 'ZB'
				});
				// uni.showLoading({
				// 	title: '正在加载...'
				// });
				this.$http.doRequest(this.$http.apiUrl + '/Jb/SearchJbZaiban', param).then((data) => {
						if (data.Result == false) {
							this.loadingType_2 = 2;
							this.listData_2_count = data.Count;
							uni.stopPullDownRefresh();
						} else {
							this.listData_2 = this.listData_2.concat(data.Data);
							this.pageInfo_2.pageIndex++;
							uni.stopPullDownRefresh();
							this.loadingType_2 = 0;
							this.listData_2_count = data.Count;
						}
					})
					.catch((data) => {
						
					})
					.finally(() => {
						uni.hideLoading();
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
					"Jbbt00": this.searchKey,
					"userId": utils.getUserId(),
					"flag": 'GD'
				});
				// uni.showLoading({
				// 	title: '正在加载...'
				// });
				this.$http.doRequest(this.$http.apiUrl + '/Jb/SearchJbZaiban', param).then((data) => {
						if (data.Result == false) {
							this.loadingType_3 = 2;
							uni.stopPullDownRefresh();
							this.listData_3_count = data.Count;
						} else {
							this.listData_3 = this.listData_3.concat(data.Data);
							this.pageInfo_3.pageIndex++;
							uni.stopPullDownRefresh();
							this.loadingType_3 = 0;
							this.listData_3_count = data.Count;
						}
					})
					.catch((data) => {
						console.log('归档发生异常:' + JSON.stringify(data));
					})
					.finally(() => {
						uni.hideLoading();
					});
			},
			remoteSearch: function(searchKey) {
				this.searchKey = searchKey;
				this.reloadAllList();
			},
			
			goDaiban: function(e) {
				if (e.Sfqs00 != 1) {
					this.setQianshou(e);
					
// 					uni.showModal({
// 						title: '提示',
// 						content: '必须签收之后才能处理',
// 						success: (res) => {
// 							if (res.confirm) {
// 								this.setQianshou(e);
// 							} else if (res.cancel) {
// 								return;
// 							}
// 						}
// 					});

				} else {
					uni.navigateTo({
						url: "../jb/jbDetail?Flag=dispose&Flowid=" + e.Id0000 + "&Zbid00=" + e.Zbid00
					})
				}
			},
			goView: function(e) {
				uni.navigateTo({
					url: "../jb/jbDetail?Flag=view&Zbid00=" + e.Id0000
				})
			},
			setQianshou: function(e) {
				this.$http.doRequest(this.$http.apiUrl + '/Jb/SetQianShou', {
					Flowid: e.Id0000
				}).then((data) => {
					e.Sfqs00  = 1;//设置为1
					uni.navigateTo({
						url: "../jb/jbDetail?Flag=dispose&Flowid=" + e.Id0000 + "&Zbid00=" + e.Zbid00
					})
				}).catch((data) => {
					console.log('签收发生异常')
				});
			},
			bflc: function(item) {
				let that = this;
				this.$http.doRequest(this.$http.apiUrl + '/Jb/AddFlow', {
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
		},
		destroyed: function() {
			uni.hideLoading();
		}
		
		
		
	}
</script>
<style>



</style>
