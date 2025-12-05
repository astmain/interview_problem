<template>
	<view class="page-body">
		<uni-nav-bar title="借阅"></uni-nav-bar>
		<search-box v-on:remoteSearch="remoteSearch">
		</search-box>

		<view class="tabs">
			<view :class="['tab',currentTabIndex==0 ? 'tab-on' : '']" @tap="changeTabs(0)">待审核({{listData_count}})</view>
			<view :class="['tab',currentTabIndex==1 ? 'tab-on' : '']" @tap="changeTabs(1)">审核通过({{listData_1_count}})</view>
			<view :class="['tab',currentTabIndex==2 ? 'tab-on' : '']" @tap="changeTabs(2)">审核拒绝({{listData_2_count}})</view>
		</view>
		<!-- 待审核 -->
		<view :class="['tab-list',currentTabIndex==0 ? '' : 'hide']">
			<view> 
				<view class="grace-news-list">
					<view v-for="(item,key) in listData_0" :key="key" class="garace-hl-list" @click="process(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main">{{item.Swbt00}}</view>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>申请人：{{item.Sqrxm0}}
								<text class="left-margin"></text>借阅类型：{{item.Jylxmc}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>申请时间：{{ item.Sqsj00 }}
								<text class="left-margin" style="color:#DD524D;">审核状态：{{ item.Shztmc }}</text>
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>申请理由：{{ item.Sqly00 }}
							</view>
						</view>
						<view class="grace-news-list-info" v-show="1===0">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>审核人：{{ item.Sqrxm0?item.Sqrxm0:'' }}
							</view>
						</view>
						<view class="grace-news-list-info" v-show="1===0">
							<view>
								<text class="icon-size iconfont icon-time1"></text>审核时间：{{ item.Spsj00 ? item.Spsj00 : '' }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 审核通过 -->
		<view :class="['tab-list',currentTabIndex==1 ? '' : 'hide']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData_1" :key="key" class="garace-hl-list" @click="process(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main">{{item.Swbt00}}</view>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>申请人：{{item.Sqrxm0}}
								<text class="left-margin"></text>借阅类型：{{item.Jylxmc}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>申请时间：{{ item.Sqsj00 }}
								<text class="left-margin" style="color:#DD524D;">审核状态：{{ item.Shztmc }}</text>
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>申请理由：{{ item.Sqly00 }}
							</view>
						</view>
						<view class="grace-news-list-info" v-show="1===1">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>审核人：{{ item.Sqrxm0?item.Sqrxm0:'' }}
							</view>
						</view>
						<view class="grace-news-list-info" v-show="1===1">
							<view>
								<text class="icon-size iconfont icon-time1"></text>审核时间：{{ item.Spsj00 ? item.Spsj00 : '' }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 审核拒绝 -->
		<view :class="['tab-list',currentTabIndex==2 ? '' : 'hide']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData_2" :key="key" class="garace-hl-list" @click="process(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main">{{item.Swbt00}}</view>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>申请人：{{item.Sqrxm0}}
								<text class="left-margin"></text>借阅类型：{{item.Jylxmc}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>申请时间：{{ item.Sqsj00 }}
								<text class="left-margin" style="color:#DD524D;">审核状态：{{ item.Shztmc }}</text>
							</view>
						</view>
						<view class="grace-news-list-info">
							<view> 
								<text class="icon-size iconfont icon-i-info"></text>申请理由：{{ item.Sqly00 }}
							</view>
						</view>
						<view class="grace-news-list-info" v-show="1===1">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>审核人：{{ item.Sqrxm0?item.Sqrxm0:'' }}
							</view>
						</view>
						<view class="grace-news-list-info" v-show="1===1">
							<view>
								<text class="icon-size iconfont icon-time1"></text>审核时间：{{ item.Spsj00 ? item.Spsj00 : '' }}
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
		<!-- 加载更多3 -->
		<view :class="[currentTabIndex==2 ? '' : 'hide']">
			<load-more :loadingType="loadingType_2" :contentText="contentText"></load-more>
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
				},
				loadingType_2: 0,
				listData_2 : [], //数据列表3
				listData_2_count:0,
				pageInfo_2: {
					pageIndex: 1,
					pageSize: 10
				} 
			}
		},
		onLoad() {
			this.getList(0);
			this.getList(1);
			this.getList(2);

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
			addData: function() {
				setTimeout(function() {
					uni.navigateTo({
						url: './swDetail?Flag=add'
					})
				}, 200);
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
				} else if (this.currentTabIndex == 2) {
					this.pageInfo_2.pageIndex = 1;
					this.loadingType_2 = 0;
					this.listData_2 = [];
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

				this.pageInfo_2.pageIndex = 1;
				this.loadingType_2 = 0;
				this.listData_2 = [];
				this.getList(2);
			},
			getList: function(index) {
				
				
				let rIndex = index;
				let shzt = 1;
				if(rIndex === 0) {
					shzt = 1;
				}
				else if(rIndex === 1) {
					shzt = 2;
				}
				else if(rIndex === 2) {
					shzt = 0;
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
					Swbt00 : this.searchKey,
					userId : utils.getUserId(), 
					Shzt00 : shzt  
				});

				this.$http.doRequest(this.$http.apiUrl + '/Jy/SearchAllSwjy', param).then((data) => {
						if (data.Result == false) {
							this.setLoadingType(2,rIndex);
							uni.stopPullDownRefresh();
						} else {
							let list = this.getListData(rIndex);
							list = list || []; 
							data.Data = data.Data || [];
							data.Data.forEach(item => {
								//审核状态
								item.Shztmc = (item.Shzt00 === 0 ? '审核拒绝' : ( item.Shzt00 === 1 ? '审核中' : ( item.Shzt00 === 2 ? '审核通过' : '未定义' ) ) )
								//借阅类型
								item.Jylxmc = (item.Jylx00 === 1 ? '收文' : ( item.Jylx00 === 2 ? '文件' : '未定义'  ) )
								 
							});
							
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
				else if(that.currentTabIndex === 2) {
					uni.showActionSheet({
						itemList: ['查看详情','审核通过'],
						success: function (res) {
							if(res.tapIndex === 0) {
								that.goView(e);
							}
							else if(res.tapIndex === 1) {
								that.setSpStatus(e,2);
							}
							else {
								throw new Error("按钮事件未定义：" + res.tapIndex);
							}
						}
					});
				}
			},
			goView: function(e) {
				let action = e.Jylx00 === 1 ? '../sw/swDetail' : '../wj/wjDetail';
				uni.navigateTo({
					url: action + '?Flag=view&Zbid00=' + e.Swid00
				})
			},
			setSpStatus: function(e,status) {
				let that = this;
				this.$http.doRequest(this.$http.apiUrl + '/Jy/SwjySp', {
					shzt: status,
					ids: e.Id0000
				}).then((data) => {
					uni.showModal({  
						title: '提示', 
						showCancel: true,
						content: data.Msg,
						success: () => {
							data.Result && that.reloadAllList();
						}
					});
					
				}).catch((data) => {
					console.log('审批发生异常')
				});
			},
			getLoadingType: function(index) {
				if(index == 0) {
					return this.loadingType_0;
				}
				else if(index == 1) {
					return this.loadingType_1;
				}
				else if(index == 2) {
					return this.loadingType_2;
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
				else if(index == 2) {
					this.loadingType_2 = val;
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
				else if(index == 2) {
					return this.listData_2;
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
				else if(index == 2) {
					this.listData_2 = val;
					this.listData_2_count = count;
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
				else if(index == 2) {
					return this.pageInfo_2;
				}
				else {
					throw new Error('非法index：' + index);
				}
			}
		}
	}
</script>
<style>

	.grace-news-list-info .left-margin {
		margin-left: 30rpx;
	}
	
</style>
