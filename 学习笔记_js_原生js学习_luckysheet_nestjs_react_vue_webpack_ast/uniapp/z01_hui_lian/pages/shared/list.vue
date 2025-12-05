<template>
	<view class="page-body">
		<uni-nav-bar title="文件共享"></uni-nav-bar>
		<search-box v-on:remoteSearch="remoteSearch"></search-box>
		<view class="tabs">
			<view :class="['tab',currentTabIndex==0 ? 'tab-on' : '']" @tap="changeTabs(0)">共享文件({{listData_count}})</view>
			<view :class="['tab',currentTabIndex==1 ? 'tab-on' : '']" @tap="changeTabs(1)">部门共享({{listData_1_count}})</view>
		</view>
		<!-- 共享文件 -->
		<view :class="['tab-list',currentTabIndex==0 ? '' : 'hide']">
			<view> 
				<view class="grace-news-list">
					<view v-for="(item,key) in listData_0" :key="key" class="garace-hl-list" @click="detail(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main">{{item.Fjysmc}}</view>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info"> 
							<view>
								<text class="icon-size iconfont icon-i-info"></text>共享类型：{{item.Gxlx00 || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>上传人员：{{item.Cjr000 || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>创建时间：{{item.Cjsj00 || ''}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 部门共享 -->
		<view :class="['tab-list',currentTabIndex==1 ? '' : 'hide']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData_1" :key="key" class="garace-hl-list" @click="detail(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main">{{item.Fjysmc}}</view>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info"> 
							<view>
								<text class="icon-size iconfont icon-i-info"></text>共享类型：{{item.Gxlx00 || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>上传人员：{{item.Cjr000 || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>创建时间：{{item.Cjsj00 || ''}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 加载更多1 -->
		<view :class="[currentTabIndex==0 ? '' : 'hide']">
			<load-more :loadingType="loadingType_0" :contentText="contentText"></load-more>
		</view>
		<!-- 加载更多2 -->
		<view :class="[currentTabIndex==1 ? '' : 'hide']">
			<load-more :loadingType="loadingType_1" :contentText="contentText"></load-more>
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
			let userinfo = uni.getStorageSync("userinfo");
			if(!userinfo) {
				// uni.showModal({
				// 	title: '提示',
				// 	content: '该模块需要登录后才能操作',
				// 	showCancel:false,
				// 	success: () => {
				// 		setTimeout(() => {
				// 			uni.navigateBack({ delta: 1 })
				// 		}, 500);
				// 	}
				// });
				userinfo = {};
			}
			return {
				IsAdmin : userinfo && userinfo.Jsid00 && userinfo.Jsid00.indexOf(',1,') > -1,
				Dwid00: userinfo && userinfo.Dwid00,
				currentTabIndex: 0,
				searchKey: '', //搜索字段，传递给组建,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType_0: 0,
				listData_0: [], //数据列表1
				listData_count:0,
				pageInfo_0: {
					pageIndex: 1,
					pageSize: 10
				},
				loadingType_1: 0,
				listData_1: [], //数据列表2
				listData_1_count:0,
				pageInfo_1: {
					pageIndex: 1,
					pageSize: 10
				}
			}
		},
		onLoad() {
			this.getList(0);
			this.getList(1);

			//重新加载数据
			this.EventBus.register("reloadJyList", (param) => {
				this.reloadAllList();
			});
		},
		onPullDownRefresh() {
			this.reloadOneList();
			
		},
		onReachBottom() {
			this.getList(this.currentTabIndex);
		},
		components: {
			searchBox,
			loadMore,
			uniNavBar
		},
		methods: {
			changeTabs: function(index) {
				this.currentTabIndex = index;
			},
			reloadOneList: function() {
				if (this.currentTabIndex == 0) {
					this.pageInfo_0.pageIndex = 1;
					this.loadingType_0 = 0;
					this.listData_0 = [];
				} else if (this.currentTabIndex == 1) {
					this.pageInfo_2.pageIndex = 1;
					this.loadingType_1 = 0;
					this.listData_1 = [];
				}
				this.getList(this.currentTabIndex);
			},
			reloadAllList: function() {
				this.pageInfo_0.pageIndex = 1;
				this.loadingType_0 = 0;
				this.listData_0 = [];
				this.getList(0);

				this.pageInfo_1.pageIndex = 1;
				this.loadingType_1 = 0;
				this.listData_1 = [];
				this.getList(1);

			},
			getList: function(index) {
				
				
				let rIndex = index;
				let Gxlx00 = '共享文件';
				if(rIndex === 0) {
					Gxlx00 = '共享文件';
				}
				else if(rIndex === 1) {
					Gxlx00 = '部门共享';
				}
				else {
					throw new Error("参数异常");
				}
				 
				//搜索中返回
				if (this.getLoadingType(rIndex) == 1) {
					return;
				}
				this.getLoadingType(1,rIndex);

				//拼接搜索条件
				let param = Object.assign(this.getPageInfo(rIndex), {
					Fjysmc: this.searchKey,
					Gxlx00: Gxlx00,
					IsAdmin: this.IsAdmin,
					Dwid00: this.Dwid00
				}); 

				this.$http.doRequest(this.$http.apiUrl + '/Shared/SharedFiles', param).then((data) => {
						if (data.Result == false) {
							this.setLoadingType(2,rIndex);
							uni.stopPullDownRefresh();
						} else {
							let list = this.getListData(rIndex);
							list = list || []; 
							data.Data = data.Data || [];
							this.setListData(list.concat(data.Data),data.Count,rIndex);
							let pageInfo = this.getPageInfo(rIndex);
							pageInfo.pageIndex++;
							uni.stopPullDownRefresh();
							this.setLoadingType(0,rIndex);
						}

					})
					.catch((data) => {
						console.log('待办发生异常:' + data);
					});
			},
			remoteSearch: function(searchKey) {
				this.searchKey = searchKey;
				this.reloadAllList();
			},
			process : function(e) {
				let that = this;
				
				if(that.currentTabIndex === 0) {
					uni.showActionSheet({
						itemList: ['查看详情', '审核通过', '审核拒绝'],
						success: function (res) {
							if(res.tapIndex === 0) {
								that.goView(e);
							}
							else if(res.tapIndex === 1) {
								that.setSpStatus(e,2);
							}
							else if(res.tapIndex === 2) {
								that.setSpStatus(e,0);
							}
							else {
								throw new Error("按钮事件未定义：" + res.tapIndex);
							}
						}
					});
				}
				else if(that.currentTabIndex === 1) {
					uni.showActionSheet({
						itemList: ['查看详情','审核拒绝'],
						success: function (res) {
							if(res.tapIndex === 0) {
								that.goView(e);
							}
							else if(res.tapIndex === 1) {
								that.setSpStatus(e,0);
							}
							else {
								throw new Error("按钮事件未定义：" + res.tapIndex);
							}
						}
					});
				}
			},
			getLoadingType: function(index) {
				if(index == 0) {
					return this.loadingType_0;
				}
				else if(index == 1) {
					return this.loadingType_1;
				}
				else {
					throw new Error('非法index：' + index);
				}
			},
			setLoadingType: function(val,index) {
				if(index == 0) {
					this.loadingType_0 =  val;
				}
				else if(index == 1) {
					this.loadingType_1 = val;
				}
				else {
					throw new Error('非法index：' + index);
				}
			},
			getListData: function(index) {
				if(index == 0) {
					return this.listData_0;
				}
				else if(index == 1) {
					return this.listData_1;
				}
				else { 
					throw new Error('非法index：' + index);
				}
			},
			setListData: function(val,count,index) {
				if(index == 0) {
					this.listData_0 =  val;
					this.listData_count = count;
				}
				else if(index == 1) {
					this.listData_1 = val;
					this.listData_1_count = count;
				}
				else {
					throw new Error('非法index：' + index);
				}
			},
			getPageInfo: function(index) {
				if(index == 0) {
					return this.pageInfo_0;
				}
				else if(index == 1) {
					return this.pageInfo_1;
				}
				else {
					throw new Error('非法index：' + index);
				}
			},
			detail: function(item) {
				uni.showLoading({
					title: '加载中...'
				}); 
				uni.downloadFile({
					url: this.$http.baseUrl + '/file/meeting/' + item.Fjlsmc,
					success: function(res) {
						uni.hideLoading();
						var filePath = res.tempFilePath;
						uni.saveFile({
							tempFilePath: filePath,
							success: function(res) {
								var savedFilePath = res.savedFilePath;
								uni.openDocument({
									filePath: savedFilePath,
									success: function(res) {
									}
								});
				
							}
						})
					},
					fail: function() {
						uni.hideLoading();
					}
				});
			},
		}
	}
</script>
<style>

	.grace-news-list-info .left-margin {
		margin-left: 30rpx;
	}
	
</style>
