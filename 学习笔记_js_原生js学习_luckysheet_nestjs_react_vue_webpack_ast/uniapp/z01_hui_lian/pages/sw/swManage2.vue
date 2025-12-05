<template>
	<view class="page-body" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
		<uni-nav-bar title="公文2"></uni-nav-bar>
		<refresh ref="refresh" @isRefresh='isRefresh'></refresh>
		<search-box v-on:remoteSearch="remoteSearch">
			<text class='iconfont icon-quanbu search-box-btn' @tap="viewAll()" v-if="canViewAll"></text>
			<text class='iconfont icon-tianjia search-box-btn' style="font-size: 42upx;" @tap="addGw()"></text>
		</search-box>
		<view class="tabs" style="background-color: #FFFFFF;">
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view>

		<swiper style="min-height: 100vh;" :current="currentTabIndex" @change="swiperTab">
			<swiper-item v-for="(listItem,listIndex) in listDataAll" :key="listIndex">
				<scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="toLower" scroll-with-animation>
					<view class="tab-list">
						<view class="grace-news-list">
							<view v-if="listItem.length==0">
								<view style="padding:100rpx 0;">
									<graceEmpty text="暂无数据" :iconSize="100" :iconType="4" iconColor="#6ab9f4" textColor="#6ab9f4"></graceEmpty>
								</view>
							</view>
							<view v-else>
								<block v-if="listIndex==0">
									<view v-for="(item,key) in listItem" :key="key" class="garace-hl-list" @click="goDaiban(item)">
										<view class="grace-news-list-items">
											<view class="grace-news-list-title">
												<view class="grace-news-list-title-main" style="display: flex;">
													<notice-text :level="item.Level" ></notice-text>
													<text style="flex: 11;">
														<text :class="{'un_qs': item.Sfqs00 != 1 }">{{item.Wjbt00 || ''}}</text>
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
								</block>
								<block v-if="listIndex==1">
									<view v-for="(item,key) in listItem" :key="key" class="garace-hl-list" @longtap="showCollectionItems(0, item)"
									 @click="goView(item)">
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
								</block>
								<block v-if="listIndex==2">
									<view v-for="(item,key) in listItem" :key="key" class="garace-hl-list" @longtap="showCollectionItems(0, item)"
									 @click="goView(item)">
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
								</block>
								<block v-if="listIndex==3">
									<view v-for="(item,key) in listItem" :key="key" class="garace-hl-list" @longtap="showCollectionItems(1, item)"
									 @tap="goView(item)">
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
								</block>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	import searchBox from '../../components/search-box.vue'
	import noticeText from '../../components/notice-text.vue'
	import utils from '../../common/utils.js'
	import uniNavBar from "@/components/uni-nav-bar.vue";

	//新添加的模板
	import graceEmpty from "@/graceUI/components/graceEmpty.vue";
	import refresh from '@/components/swiperList/refresh.vue';
	import navTab from '@/components/swiperList/navTab.vue';

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
				pageInfoAll: [{
						pageIndex: 1,
						pageSize: 10
					},
					{
						pageIndex: 1,
						pageSize: 10
					},
					{
						pageIndex: 1,
						pageSize: 10
					},
					{
						pageIndex: 1,
						pageSize: 10
					}
				], //第几个swiper的第几页
				listDataAll: [
					[],
					[],
					[],
					[],
				],
				tabTitle: ['待办', '已办', '归档', '收藏']

			}
		},
		onLoad() {
			this.getList();
			this.getList2();
			this.getList3();
			this.getList4();

			//重新加载数据
			this.EventBus.register("reloadSwList", (param) => {
				this.reloadAllList();
			});
		},

		components: {
			searchBox,
			noticeText,
			uniNavBar,
			refresh,
			navTab,
			graceEmpty
		},
		methods: {
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
				switch (this.currentTabIndex) {
					case 0:
						this.pageInfoAll[0].pageIndex = 1;
						this.listDataAll[0] = [];
						this.getList();
					case 1:
						this.pageInfoAll[1].pageIndex = 1;
						this.listDataAll[1] = [];
						this.getList2();
					case 2:
						this.pageInfoAll[2].pageIndex = 1;
						this.listDataAll[2] = [];
						this.getList3();
					case 3:
						this.pageInfoAll[3].pageIndex = 1;
						this.listDataAll[3] = [];
						this.getList4();
					default:
						break;
				}
			},
			reloadAllList: function() {

				this.pageInfoAll[0].pageIndex = 1;
				this.listDataAll[0] = [];
				this.getList();

				this.pageInfoAll[1].pageIndex = 1;
				this.listDataAll[1] = [];
				this.getList2();

				this.pageInfoAll[2].pageIndex = 1;
				this.listDataAll[2] = [];
				this.getList3();

				this.pageInfoAll[3].pageIndex = 1;
				this.listDataAll[3] = [];
				this.getList4();
			},
			getList: function(reload) {

				//拼接搜索条件
				let param = Object.assign(this.pageInfoAll[0], {
					"Wjbt00": this.searchKey,
					"userId": utils.getUserId()
				});

				uni.showLoading({
					title: '正在加载...'
				});
				this.$http.doRequest(this.$http.apiUrl + '/Sw/SearchSwDaiban', param).then((data) => {
						if (data.Result == false) {} else {
							data.Data = data.Data || [];
							data.Data.forEach(item => {
								item.Swrq00 = item.Swrq00 ? item.Swrq00 : "";
								item.Blqx00 = item.Blqx00 ? item.Blqx00 : "";
								item.Swrq00 = item.Swrq00.substr(0, 10);
								item.Blqx00 = item.Blqx00.substr(0, 10);
							});
							this.listDataAll[0] = this.listDataAll[0].concat(data.Data);
							this.pageInfoAll[0].pageIndex++;

							this.tabTitle[0] = "待办(" + data.Count + ")";
							this.$refs.navTab.updateTabTitle(this.tabTitle);

							this.$forceUpdate() //二维数组，开启强制渲染
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

				//拼接搜索条件
				let param = Object.assign(this.pageInfoAll[1], {
					"Wjbt00": this.searchKey,
					"userId": utils.getUserId(),
					"flag": 'ZB'
				});

				this.$http.doRequest(this.$http.apiUrl + '/Sw/SearchSwZaiban', param).then((data) => {
						if (data.Result == false) {

						} else {
							data.Data = data.Data || [];
							data.Data.forEach(item => {
								item.Blqx00 = item.Blqx00 ? item.Blqx00.substr(0, 10) : 0;
							});
							this.listDataAll[1] = this.listDataAll[1].concat(data.Data);
							this.pageInfoAll[1].pageIndex++;

							this.tabTitle[1] = "已办(" + data.Count + ")";
							this.$refs.navTab.updateTabTitle(this.tabTitle);
						}
					})
					.catch((data) => {
						
					});
			},
			getList3: function(reload) {


				//拼接搜索条件
				let param = Object.assign(this.pageInfoAll[2], {
					"Wjbt00": this.searchKey,
					"userId": utils.getUserId(),
					"flag": 'GD'
				});

				this.$http.doRequest(this.$http.apiUrl + '/Sw/SearchSwZaiban', param).then((data) => {
						if (data.Result == false) {

						} else {
							data.Data = data.Data || [];
							data.Data.forEach(item => {
								item.Blqx00 = item.Blqx00 ? item.Blqx00.substr(0, 10) : 0;
							});
							this.listDataAll[2] = this.listDataAll[2].concat(data.Data);
							this.pageInfoAll[2].pageIndex++;

							this.tabTitle[2] = "归档(" + data.Count + ")";
							this.$refs.navTab.updateTabTitle(this.tabTitle);

						}
					})
					.catch((data) => {
						
					});
			},
			getList4: function(reload) {

				//拼接搜索条件
				let param = Object.assign(this.pageInfoAll[3], {
					"Wjbt00": this.searchKey,
					"userId": utils.getUserId(),
					"flag": 'GD'
				});
				this.$http.doRequest(this.$http.apiUrl + '/Sw/SearchMyGwSc', param).then((data) => {
						if (data.Result == false) {
							this.tabTitle[3] = "收藏(0)";
							this.$refs.navTab.updateTabTitle(this.tabTitle);
						} else {
							data.Data = data.Data || [];
							data.Data.forEach(item => {
								item.Blqx00 = item.Blqx00 ? item.Blqx00.substr(0, 10) : 0;
								item.Id0000 = item.Gwid00;
							});
							this.listDataAll[3] = this.listDataAll[3].concat(data.Data);
							this.pageInfoAll[3].pageIndex++;


							this.tabTitle[3] = "收藏(" + data.Count + ")";
							this.$refs.navTab.updateTabTitle(this.tabTitle);

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
			},
			//新添加的方法
			changeTab: function(index) { //tab切换
				console.log('切换了' + index);
				this.currentTabIndex = index
			},
			swiperTab: function(e) { //滑动切换
				var index = e.detail.current //获取索引
				if (this.tabTitle.length <= 5) {
					this.$refs.navTab.navClick(index)
				} else {
					this.$refs.navTab.longClick(index)
				}
			},
			// 刷新touch监听
			refreshStart(e) {
				this.$refs.refresh.refreshStart(e);
			},
			refreshMove(e) {
				this.$refs.refresh.refreshMove(e);
			},
			refreshEnd(e) {
				this.$refs.refresh.refreshEnd(e);
			},
			isRefresh() {

				this.reloadOneList();
				this.$refs.refresh.endAfter() //刷新结束调用，这里写的有点随意
			},
			toLower: function() {

				switch (this.currentTabIndex) {
					case 0:
						this.getList();
					case 1:
						this.getList2();
					case 2:
						this.getList3();
					case 3:
						this.getList4();
					default:
						break;
				}
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
</style>
