<template>
	<view class="page-body"> 
		<uni-nav-bar title="全部收文"></uni-nav-bar>
		<search-box v-on:remoteSearch="remoteSearch"></search-box>
		<!-- <view class="tabs">
			<view :class="['tab',currentTabIndex==0 ? 'tab-on' : '']" @tap="changeTabs(0)">公文办理</view>
			<view :class="['tab',currentTabIndex==1 ? 'tab-on' : '']" @tap="changeTabs(1)">信访件</view>
			<view :class="['tab',currentTabIndex==2 ? 'tab-on' : '']" @tap="changeTabs(2)">会议通知</view>
		</view> -->
		<view :class="['tab-list',currentTabIndex==0 ? '' : 'hide']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData" :key="key" class="garace-hl-list" @click="itemTap(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main" style="display: flex;">
									<text style="flex: 11;">{{item.Wjbt00 || ''}}</text>
								</view>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>收文号：{{item.Swh000 || ''}}
								<text class="left-margin">来文单位：{{item.Lwdw00 || ''}}</text>
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>收文日期：{{item.Swrq00 || ''}}
								<text class="left-margin">文件类别：{{item.Swlbmc || ''}}</text>
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="left-margin">公文状态：{{item.Swztmc || ''}}</text>
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<!-- <view :class="['tab-list',currentTabIndex==1 ? '' : 'hide']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData_2" :key="key" class="garace-hl-list" @click="itemTap(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main" style="display: flex;">
									<text style="flex: 11;">{{item.Wjbt00 || ''}}</text>
								</view>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>收文号：{{item.Swh000 || ''}}
								<text class="left-margin">来文单位：{{item.Lwdw00 || ''}}</text>
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>收文日期：{{item.Swrq00 || ''}}
								<text class="left-margin">文件类别：{{item.Swlbmc || ''}}</text>
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="left-margin">公文状态：{{item.Swztmc || ''}}</text>
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<view :class="['tab-list',currentTabIndex==2 ? '' : 'hide']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData_3" :key="key" class="garace-hl-list" @click="itemTap(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main" style="display: flex;">
									<text style="flex: 11;">{{item.Wjbt00 || ''}}</text>
								</view>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>收文号：{{item.Swh000 || ''}}
								<text class="left-margin">来文单位：{{item.Lwdw00 || ''}}</text>
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>收文日期：{{item.Swrq00 || ''}}
								<text class="left-margin">文件类别：{{item.Swlbmc || ''}}</text>
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="left-margin">公文状态：{{item.Swztmc || ''}}</text>
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</view> -->
		<!-- 加载更多1 -->
		<view :class="[currentTabIndex==0 ? '' : 'hide']">
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
		<!-- 加载更多2 -->
		<!-- <view :class="[currentTabIndex==1 ? '' : 'hide']">
			<load-more :loadingType="loadingType_2" :contentText="contentText"></load-more>
		</view> -->
		<!-- 加载更多3 -->
<!-- 		<view :class="[currentTabIndex==2 ? '' : 'hide']">
			<load-more :loadingType="loadingType_3" :contentText="contentText"></load-more>
		</view> -->
		
		<!-- 弹出层 -->
		<view class="grace-banner" style="background:#fff;" v-if="bannerShow">
            <view class="grace-items grace-noborder">
            	<view class="gracr-form-r">
            		<textarea :maxlength="-1" placeholder="请填写借阅意见" name="Jyyj00" v-model="Jyyj00"
						style="padding:6px;border:solid 1px #ccc;margin:4px;"></textarea>
            	</view>
            </view> 
            <view style="padding:8px;text-align: center;">
				<view style="display: inline-block;">
					<button type='primary' style="display:inline-block;background:#F6644D;" @tap="fqjy">确定</button>
					<button type='warn' style="display:inline-block;background:#F6644D;" @tap="()=>{ bannerShow=0; }">取消</button>
				</view>
            </view>
        </view>
        <view class="grace-mask" v-if="bannerShow"></view>
		<!-- 弹出层 -->
		
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
				searchKey: '',
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				currentTabIndex: 0,
				Jyyj00:'',
				currentItemId:'',
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
				bannerShow: false
			}
		},
		onLoad() {
			this.getList();
			this.getList2();
			this.getList3();
		},
		onPullDownRefresh() {
			this.reloadOneList();
		},
		components: { 
			searchBox,
			loadMore,
			uniNavBar,
			noticeText
		},
		onReachBottom() {
			this.getList(false);
		},
		methods: {
			itemTap: function(item) {
				
				if(1 == 1) {
					this.toView(item);
					return;
				}
				
				if(utils.getUserId() == item.Fqrid0) {
					//本人就是创建人
					this.toView(item);
				}
				else if (item.Shzt00 == 0) {
					//审核拒绝
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: '审核被拒绝，无法查阅'
					});
				} else if (item.Shzt00 == 1) {
					//审核中
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: '已经在审核了，待审核通过方可查阅'
					});
				} else if (item.Shzt00 == 2) {
					//审核通过
					this.toView(item);
				} else {
					//未借阅
					uni.showModal({
						title: '提示',
						showCancel: true,
						confirmText:'是',
						content: '是否要借阅该公文呢？',
						success: (e)=> {
							this.bannerShow = e.confirm;
							this.currentItemId = item.Id0000;
						}
					});
				}
			},
			getList: function(refresh) {
				
				//搜索中返回
				if (this.loadingType === 1) { 
					return;
				}
				if(refresh) {
					this.pageInfo.pageIndex = 1;
					this.listData = [];
				}
				
				this.loadingType = 1;
				
				//拼接搜索条件
				let param = Object.assign(this.pageInfo, {
					SearchText: this.searchKey,
					UserID: utils.getUserId()
				}); 
				
				uni.showLoading({ title: '正在加载...' }); 
				this.$http.doRequest(this.$http.apiUrl + '/Sw/SearchSwjyAll', param)
				.then((data) => {
					uni.stopPullDownRefresh(); 
					if (data.Result) {
						if(data.Data) {
							data.Data.forEach(item => { this.setStatus(item);});
							this.listData = this.listData.concat(data.Data);
							this.pageInfo.pageIndex++;
							this.loadingType = 0;
						}
						if(!data.Result || !data.Data || data.Data.length < this.pageInfo.pageSize) {
							this.loadingType = 2;
						}
					}
					else {
						this.loadingType = 0;
					}
				})  
				.catch((data) => {
					uni.stopPullDownRefresh();
				})
				.finally(() => {
					uni.hideLoading();
				});
			},
			getList2: function(refresh) {
				return;
				//搜索中返回
				if (this.loadingType_2 === 1) { 
					return;
				}
				if(refresh) {
					this.pageInfo_2.pageIndex = 1;
					this.listData_2 = [];
				}
				
				this.loadingType_2 = 1;
				
				//拼接搜索条件
				let param = Object.assign(this.pageInfo_2, {
					SearchText: this.searchKey,
					UserID: utils.getUserId()
				}); 
				
				uni.showLoading({ title: '正在加载...' }); 
				this.$http.doRequest(this.$http.apiUrl + '/Sw/SearchSwjyAll?Swlb00=XFJ', param)
				.then((data) => {
					uni.stopPullDownRefresh(); 
					if (data.Result) {
						if(data.Data) {
							data.Data.forEach(item => { this.setStatus(item);});
							this.listData_2 = this.listData_2.concat(data.Data);
							this.pageInfo_2.pageIndex++;
							this.loadingType_2 = 0;
						}
						if(!data.Result || !data.Data || data.Data.length < this.pageInfo_2.pageSize) {
							this.loadingType_2 = 2;
						}
					}
					else {
						this.loadingType_2 = 0;
					}
				})  
				.catch((data) => {
					uni.stopPullDownRefresh();
				})
				.finally(() => {
					uni.hideLoading();
				});
			},
			getList3: function(refresh) {
				return;
				//搜索中返回
				if (this.loadingType_3 === 1) { 
					return;
				}
				if(refresh) {
					this.pageInfo_3.pageIndex = 1;
					this.listData_3 = [];
				}
				
				this.loadingType_3 = 1;
				
				//拼接搜索条件
				let param = Object.assign(this.pageInfo_3, {
					SearchText: this.searchKey,
					UserID: utils.getUserId()
				}); 
				
				uni.showLoading({ title: '正在加载...' }); 
				this.$http.doRequest(this.$http.apiUrl + '/Sw/SearchSwjyAll?Swlb00=HYTZ', param)
				.then((data) => {
					uni.stopPullDownRefresh(); 
					if (data.Result) {
						if(data.Data) {
							data.Data.forEach(item => { this.setStatus(item);});
							this.listData_3 = this.listData_3.concat(data.Data);
							this.pageInfo_3.pageIndex++;
							this.loadingType_3 = 0;
						}
						if(!data.Result || !data.Data || data.Data.length < this.pageInfo_3.pageSize) {
							this.loadingType_3 = 2;
						}
					}
					else {
						this.loadingType_3 = 0;
					}
				})  
				.catch((data) => {
					uni.stopPullDownRefresh();
				})
				.finally(() => {
					uni.hideLoading();
				});
			},
			fqjy: function () {
				this.bannerShow = false;
				if(this.Jyyj00 == null) {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: '请填写借阅意见'
					});
					return;
				}
				var that = this;
				this.$http.doRequest(this.$http.apiUrl + '/Sw/SwjySq', {
					UserID : utils.getUserId(),
					UserName : utils.getUserName(),
					Jylx00 : 1,		//收文为1
					Sqly00 : this.Jyyj00,
					Swid00 : this.currentItemId
				})
				.then((data) => {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: data.Msg,
						success: () => {
							data.Result && that.getList(true);
						}
					});
					
				}) 
				.catch((data) => {
				});
			},
			remoteSearch: function(searchKey) {
				this.searchKey = searchKey;
				this.getList(true);
			},
			setStatus : function(item) {
				let shztName = "";
				if(utils.getUserId() == item.Fqrid0) {
					shztName = "无需借阅";
				} 
				else if (item.Shzt00 == 0) { 
					shztName = "审核拒绝";
				} else if (item.Shzt00 == 1) {
					shztName = "审核中";
				} else if (item.Shzt00 == 2) {
					shztName = "审核通过";
				} else {
					shztName = "未借阅";
				}
				item.Jyzt00 = shztName;
			},
			toView:function(item) {
				uni.navigateTo({
					url: './swDetail?Flag=view&Zbid00=' + item.Id0000
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
			changeTabs: function(index) {
				this.currentTabIndex = index;
			}
		},
		computed:{
		}
	}
</script>
<style>
	
	.tab-list {
		margin-top: 110upx;
	}
	
	.grace-news-list-info .left-margin {
		margin-top: 100rpx;
	}
</style>
