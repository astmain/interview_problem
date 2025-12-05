<template>
	<view class="page-body">
		<uni-nav-bar title="全部申请"></uni-nav-bar>
		<search-box v-on:remoteSearch="remoteSearch">
		</search-box>
		<view :class="['tab-list',currentTabIndex==0 ? '' : 'hide']" >
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData" :key="key" class="garace-hl-list" @click="goView(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main">{{item.Sqbt00||''}}</view>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="grace-text-overflow">申请人:{{item.Cjr000||''}}</text>
								<text class="left-margin">状态：{{item.Sqzt00 == 1 ? '流转中' : (item.Sqzt00 == 2 ? '归档' : '')}}</text>
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>申请时间：{{item.Sqsj00||''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>是否同意:{{item.Sftg00 | processSftg}}
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
						menuName: '出差申请',
						menuIcon: 'icon-huiyi'
					},
					{
						menuName: '其他申请',
						menuIcon: 'icon-wendang'
					},
					{
						menuName: '文件传输',
						menuIcon: 'icon-xinshenqing'
					},
					{
						menuName: '信息报送',
						menuIcon: 'icon-xiaoxi'
					}
				]
			}
		},
		onLoad() {
			this.getList();
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
		filters: {
			processSftg: function(sftg) {
				if(sftg == "" || sftg == null) { return "否"; }
				return sftg;
			},
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
					case 1: //出差
						setTimeout(function() {
							uni.navigateTo({
								url: './ccDetail?Flag=add'
							})
						}, 200);
						break;
					case 2: //其他
						setTimeout(function() {
							uni.navigateTo({
								url: './qtDetail?Flag=add'
							})
						}, 200);
						break; 
					case 3: //文件传输
						setTimeout(function() {
							uni.navigateTo({
								url: './fjcsDetail?Flag=add'
							})
						}, 200);
						break;
					case 4: //信息报送
						setTimeout(function() {
							uni.navigateTo({
								url: './bsDetail?Flag=add'
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
				uni.showToast({
					title: '查看全部'
				})
			},
			reloadOneList: function() {
				if (this.currentTabIndex == 0) {
					this.pageInfo.pageIndex = 1;
					this.loadingType = 0;
					this.listData = [];
					this.getList();
				}
			},
			reloadAllList: function() {
				this.pageInfo.pageIndex = 1;
				this.loadingType = 0;
				this.listData = [];
				this.getList();
			},
			getList: function() { //待办
				//搜索中返回
				if (this.loadingType == 1) {
					return;
				}
				this.loadingType = 1;

				//拼接搜索条件
				let param = Object.assign(this.pageInfo, {
					Sqbt00: this.searchKey
				});

				uni.showLoading({
					title: '正在加载...'
				});
				this.$http.doRequest(this.$http.apiUrl + '/Sq/SearchSqAll', param).then((data) => {
						if (data.Result == false) {
							this.loadingType = 2;
							uni.stopPullDownRefresh();
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
						uni.hideLoading();
					});
			},
			remoteSearch: function(searchKey) {
				this.searchKey = searchKey;
				this.reloadAllList();
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
			}
		}
	}
</script>
<style scoped>
	.tab-list {
		margin-top: 100upx;
	}
	
	.grace-news-list-info .left-margin {
		margin-left: 30rpx;
	}
</style>
