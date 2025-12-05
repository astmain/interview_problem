<template>
	<view class="page-body">
		<uni-nav-bar title="全部稿件"></uni-nav-bar>
		<search-box v-on:remoteSearch="remoteSearch"></search-box>
		<view :class="['tab-list']">
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
								<text class="icon-size iconfont icon-time1"></text>印发日期：{{item.Yfrq00 || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>拟稿人:{{item.Ngr000 || ''}}
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
				Jyyj00:'',
				currentItemId:'',
				loadingType: 0,
				listData: [], 
				pageInfo: {
					pageIndex: 1,
					pageSize: 10
				},
				bannerShow: false
			}
		},
		onLoad() {
			this.getList();
		},
		onPullDownRefresh() {
			this.getList(true);
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
					this.toView(item);
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
					Wjbt00: this.searchKey,
					UserID: utils.getUserId(),
					"flag": 'ALL'
				}); 
				
				uni.showLoading({ title: '正在加载...' }); 
				this.$http.doRequest(this.$http.apiUrl + '/Fw/SearchZzgjZaiban', param)
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
			fqjy: function () {
				this.bannerShow = false;

				var that = this;
				this.$http.doRequest(this.$http.apiUrl + '/Fw/FwjySq', {
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
				item.Jyzt00 = shztName;
			},
			toView:function(item) {
				uni.navigateTo({
					url: './zzgjDetail?Flag=view&Zbid00=' + item.Id0000
				})
			}
		},
		computed:{
		}
	}
</script>
<style>
	.tab-list {
		margin-top: 100upx;
	}
	
	.grace-news-list-info .left-margin {
		margin-left: 30rpx;
	}
</style>
