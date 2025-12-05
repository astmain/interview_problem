<template>
	<view class="page-body">
		<uni-nav-bar title="申请流程"></uni-nav-bar>
		<search-box v-on:remoteSearch="remoteSearch">
			<text class='iconfont icon-quanbu search-box-btn' @tap="viewAll()" v-if="canViewAll" ></text>
			<text class='iconfont icon-tianjia search-box-btn' style="font-size: 42upx;" @tap="addTysq()"></text>
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
								<view class="grace-news-list-title-main">{{item.Sqbt00||''}}</view>
								<text class="grace-news-list-title-desc grace-text-overflow">发起人:{{item.Cjr000||''}}</text>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>发起时间：{{item.Sqsj00||''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>上一步处理时间：{{item.Sybclsj00||''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>处理期限：{{item.Clqx00 || ''}}
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
					<view v-for="(item,key) in listData_2" :key="key" class="garace-hl-list" @click="goView(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main">{{item.Sqbt00}}</view>
								<text class="grace-news-list-title-desc grace-text-overflow">发起人:{{item.Cjr000||''}}</text>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>发起时间：{{item.Sqsj00||''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>上一步处理时间：{{item.Cjsj00||''}}
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
								<view class="grace-news-list-title-main">{{item.Sqbt00}}</view>
								<text class="grace-news-list-title-desc grace-text-overflow">发起人:{{item.Cjr000||''}}</text>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>发起时间：{{item.Sqsj00||''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>归档时间:{{item.Gdsj00||''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>是否同意:{{item.Sftg00 || ''}}
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

		<popMenu :menuShow="menuShow"  positionLeft="580" positionTop="420" arrowPosition="tipArrow-top" :menuList="menuList"
		 @menuTap="menuTap" @menuClosed="menuClosed"></popMenu>
	</view>
</template>
<script>
	import searchBox from '../../components/search-box.vue'
	import loadMore from '../../components/load-more.vue'
	import utils from '../../common/utils.js'
	import uniNavBar from "@/components/uni-nav-bar.vue";
	import popMenu from '../../components/pop-menu.vue'

	export default {
		data() {
			let userInfo = uni.getStorageSync("userinfo");
			let canViewAll = false;
			if(userInfo && userInfo.Jsid00) { 
				canViewAll = userInfo.Jsid00.indexOf(',13,') > -1; 
			} 
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
				menuShow: false,
				menuList: [{
						menuName: '请假申请',
						menuIcon: 'icon-fangjiashenqingicon-'
					},
					{
						menuName: '会议申请',
						menuIcon: 'icon-huiyi'
					},
					{
						menuName: '公务报备',
						menuIcon: 'icon-huiyi'
					},
					{
						menuName: '派车申请',
						menuIcon: 'icon-car'
					}
				]
			}
		},
		onLoad() {
			this.getList();
			this.getList2();
			this.getList3();

			//重新加载数据
			this.EventBus.register("reloadSqList", (param) => {
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
		},
		components: {
			searchBox,
			loadMore,
			uniNavBar,
			popMenu
		},
		methods: {
			menuTap: function(value) {
				this.menuShow = false;
				switch (value) { //请假
					case 0:
						setTimeout(function() {
							uni.navigateTo({
								url: './leaveDetail?Flag=add'
							})
						}, 200);
						break;
					case 1: //会议
						setTimeout(function() {
							uni.navigateTo({
								url: './hysqDetail?Flag=add'
							})
						}, 200);
						break;
					case 2: //公务报备
						setTimeout(function() {
							uni.navigateTo({
								url: './gwbbDetail?Flag=add'
							})
						}, 200);
						break;
					case 3: //用车申请
						setTimeout(function() {
							uni.navigateTo({
								url: './gwcDetail?Flag=add'
							})
						}, 200);
						break;
					default:
						break;
				}
			},
			menuClosed: function() {
				this.menuShow = false;
			},
			changeTabs: function(index) {
				this.currentTabIndex = index;
			},
			addTysq: function() { //通用申请
				this.menuShow = true;
			},
			viewAll: function() {
				uni.navigateTo({
					url: './allSq'
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
			getList: function() { //待办
				//搜索中返回
				if (this.loadingType == 1) {
					return;
				}
				this.loadingType = 1;

				//拼接搜索条件
				let param = Object.assign(this.pageInfo, {
					"Sqbt00": this.searchKey,
					"userId": utils.getUserId()
				});

				// uni.showLoading({
				// 	title: '正在加载...'
				// });
				this.$http.doRequest(this.$http.apiUrl + '/Sq/SearchSqDaiban', param).then((data) => {
						if (data.Result == false) {
							this.loadingType = 2;
							uni.stopPullDownRefresh();
							this.listData_count = data.Count;
						} else {
							data.Data = data.Data || [];
							data.Data.forEach(item => {
								item.Sqbt00 = this.getLcxx(item) + item.Sqbt00;
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
					"Sqbt00": this.searchKey,
					"userId": utils.getUserId(),
					"flag": 'ZB'
				});

				// uni.showLoading({
				// 	title: '正在加载...'
				// });
				this.$http.doRequest(this.$http.apiUrl + '/Sq/SearchSqZaiban', param).then((data) => {
						if (data.Result == false) {
							this.loadingType_2 = 2;
							uni.stopPullDownRefresh();
							this.listData_2_count = data.Count;
						} else {
							data.Data = data.Data || [];
							data.Data.forEach(item => {
								item.Sqbt00 = this.getLcxx(item) + item.Sqbt00;
							});
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
						//uni.hideLoading();
					});
			},
			getList3: function() { //归档
				//搜索中返回
				if (this.loadingType_3 == 1) {
					return;
				}
				this.loadingType_3 = 1;

				//拼接搜索条件
				let param = Object.assign(this.pageInfo_3, {
					"Sqbt00": this.searchKey,
					"userId": utils.getUserId(),
					"flag": 'GD'
				});
				// uni.showLoading({
				// 	title: '正在加载...'
				// });
				this.$http.doRequest(this.$http.apiUrl + '/Sq/SearchSqZaiban', param).then((data) => {
						if (data.Result == false) {
							this.loadingType_3 = 2;
							uni.stopPullDownRefresh();
							this.listData_3_count = data.Count;
						} else {
							data.Data = data.Data || [];
							data.Data.forEach(item => {
								item.Sqbt00 = this.getLcxx(item) + item.Sqbt00;
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
					})
					.finally(() => {
						//uni.hideLoading();
					});
			},
			remoteSearch: function(searchKey) {
				this.searchKey = searchKey;
				this.reloadAllList();
			},
			goDaiban: function(e) { //待办处理
				//根据不同类型跳转不同url
				let dbUrl = '';
				if (e.Sqlx00 == '请假') {
					dbUrl = "./leaveDetail?Flag=dispose&Flowid=" + e.Id0000 + "&Zbid00=" + e.Zbid00;
				} 
				else if (e.Sqlx00 == '公务报备') {
					dbUrl = "./gwbbDetail?Flag=dispose&Flowid=" + e.Id0000 + "&Zbid00=" + e.Zbid00;
				}
				else if (e.Sqlx00 == '会议室') {
					dbUrl = "./hysqDetail?Flag=dispose&Flowid=" + e.Id0000 + "&Zbid00=" + e.Zbid00;
				}
				else if (e.Sqlx00 == '公务用车') {
					dbUrl = "./gwcDetail?Flag=dispose&Flowid=" + e.Id0000 + "&Zbid00=" + e.Zbid00;
				}
				
				if (e.Sfqs00 != 1) {
					e.Sfqs00 = 1; //设置为1
					this.setQianshou(e);
				}
				uni.navigateTo({
					url: dbUrl
				})
			},
			goView: function(e) { //查看详情
				let viewUrl = '';
				if (e.Sqlx00 == '请假')
					viewUrl = "./leaveDetail?Flag=view&Zbid00=" + e.Id0000;
				else if (e.Sqlx00 == '公务报备')
					viewUrl = "./gwbbDetail?Flag=view&Zbid00=" + e.Id0000;
				else if (e.Sqlx00 == '会议室')
					viewUrl = "./hysqDetail?Flag=view&Zbid00=" + e.Id0000;
				else if (e.Sqlx00 == '公务用车')
					viewUrl = "./gwcDetail?Flag=view&Zbid00=" + e.Id0000;
							
				uni.navigateTo({
					url: viewUrl 
				})
			},
			getLcxx: function(e){
				if (e.Sqlx00 == '请假') {//派车
					return "[请假申请]"; 
				}
				else if (e.Sqlx00 == '公务报备') {
					return "[公务报备]";
				}
				else if (e.Sqlx00 == '会议室') {
					return "[会议室]";
				}
				else if (e.Sqlx00 == '公务用车') {
					return "[公务用车]";
				}
			},
			setQianshou: function(e) { //签收
				this.$http.doRequest(this.$http.apiUrl + '/Sq/SetQianShou', {
					Flowid: e.Id0000
				}).then((data) => {});
			}
		}
	}
</script>
<style>

</style>
