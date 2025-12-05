<template>
	<view class="page-body">
		<uni-nav-bar title="会议议程"></uni-nav-bar>
		<!-- <search-box v-on:remoteSearch="remoteSearch"></search-box> -->
		<view class="head-block">
			<view class="pre row">
				<view class="inline title">上次会议</view>
				<view class="inline opt-date" @tap="toDate(model.pre.id)">{{model.pre.text || ''}}</view>
			</view>
			<view class="latest row">
				<view class="inline title">当前会议</view>
				<view class="inline opt-date" @tap="toDate(model.latest.id)">{{model.latest.text || ''}}</view>
				<view class="inline btn">
					<button @tap="changeDate()" class="select-date-btn" style="flex: 1;">选择</button>
				</view>
			</view>
		</view>
		
		<view :class="['tab-list']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData" :key="key" class="garace-hl-list" @click="detail(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main">{{item.Yt0000}}</view>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>汇报人：{{ item.Cjr000  || '' }}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>开始时间：{{ item.Hykssj  || '' }}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>结束时间：{{ item.Hyjssj || '' }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
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
				Hyid00:'',//会议id
				searchKey: '',
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				model: {
					latest: {
						id: '',
						text: ''
					},
					pre: {
						id: '',
						text: ''
					}
				},
				loadingType: 0,
				listData: [], 
				pageInfo: {
					pageIndex: 1,
					pageSize: 10
				}
			}
		},
		onLoad(e) {
			this.Hyid00 = e.Hyid00;
			this.model.latest.id = e.Hyid00;
			this.getMeetingList(true);
			
			this.EventBus.register("chooseMeeting", (param) => {
				this.Hyid00 = param.Hyid00;
				this.getMeetingList(true);
			});
		},
		onPullDownRefresh() {
			this.getList(true);
		},
		components: {
			searchBox,
			loadMore,
			uniNavBar
		},
		onReachBottom() {
			this.getList(false);
		},
		methods: {
			detail: function(item) {
				uni.navigateTo({ 
					url: './meetingFile?Flag=view&Zbid00=' + item.Id0000
				})
			},
			toDate: function(id) {
				if(!id) { return; }
				this.Hyid00 = id;
				this.getMeetingList(true);
			},
			changeDate: function() {
				uni.navigateTo({
					url: './meetingManage?eventName=chooseMeeting'
				}); 
			},
			getMeetingList: function(refresh) {
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
					Hyid00: this.Hyid00,
					Hyrq00: this.searchKey,
						userid:utils.getUserId()
				}); 
				
				// uni.showLoading({
				// 	title: '正在加载...'
				// });
				this.$http.doRequest(this.$http.apiUrl + '/Meeting/GetDayPlanListByMeeting', param)
				.then((data) => {
					uni.stopPullDownRefresh();
					if (data.Result) {
						data.Data = data.Data || [];
						data.Extend = data.Extend || [];
						
						this.listData = this.listData.concat(data.Data);
						this.pageInfo.pageIndex++;
						this.loadingType = 0;
						
						data.Extend.forEach(obj=>{
							obj.Hyrq00 = obj.Hyrq00.substring(0, 10);
						});
						if(data.Extend.length === 1) {
							this.model.latest.id = data.Extend[0].Id0000;
							this.model.latest.text = data.Extend[0].Hyrq00;
							this.model.pre.id = "";
							this.model.pre.text = "";
						}
						else if(data.Extend.length >= 2) {
							this.model.latest.id = data.Extend[0].Id0000;
							this.model.latest.text = data.Extend[0].Hyrq00;
							this.model.pre.id = data.Extend[1].Id0000;
							this.model.pre.text = data.Extend[1].Hyrq00;
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
					//uni.hideLoading();
				});
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
					Hyid00: this.Hyid00,
					Hyrq00: this.searchKey
				}); 
				
				// uni.showLoading({
				// 	title: '正在加载...'
				// });
				this.$http.doRequest(this.$http.apiUrl + '/Meeting/GetDayPlanList', param)
				.then((data) => {
					uni.stopPullDownRefresh();
					if (data.Result) {
						if(data.Data) {
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
					//uni.hideLoading();
				});
			},
			remoteSearch: function(searchKey) {
				this.searchKey = searchKey;
				this.getList(true);
			}
		},
		computed:{
		}
	}
</script>
<style scoped>
	.tab-list {
		margin-top: -10upx;
	}
	
	.inline {
		display: inline-block;
	}
	
	.title {
		margin-right: 20upx;
	}
	
	.opt-date {
		
	}
	
	.pre .title, .pre .opt-date {
		font-size: 15px;
	}
	
	.latest .title, .latest .opt-date {
		font-size: 15px;
		font-weight: bold;
	}
	
	.head-block {
		padding: 10upx 18upx 21upx 18upx;
		margin-bottom: 8upx;
		border-bottom: solid #eee 2px;
	}
	
	.head-block .row {
		margin-top: 8upx;
	}
	
	.select-date-btn {
		height: 28px;
	    line-height: 28px;
	    width: 44px;
	    font-size: 12px;
	    margin: -18px;
	    padding: 0px;
	    margin-left: 10px;
	    position: absolute;
	}
	
</style>
