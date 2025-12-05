<template>
	<view class="page-body">
		<uni-nav-bar title="签到记录"></uni-nav-bar>
		<view :class="['tab-list']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData" :key="key" class="garace-hl-list" @click="detail(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main">{{item.Dqmc00}}</view>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>{{item.Tjsj00}}
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
	import loadMore from '../../components/load-more.vue'
	import utils from '../../common/utils.js'
	import uniNavBar from "@/components/uni-nav-bar.vue";

	export default { 
		
		data() {
			return { 
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				uid: utils.getUserId(),
				loadingType: 0,
				listData: [], 
				pageInfo: {
					pageIndex: 1,
					pageSize: 10
				}
			}
		},
		onLoad() {
			this.getList();
		},
		onPullDownRefresh() {
			this.getList(true);
		},
		components: {
			loadMore,
			uniNavBar
		},
		onReachBottom() {
			this.getList(false);
		},
		methods: {
			detail: function(item) {
				return;
// 				let params = "name=" + item.Dqmc00 + "&latitude=" + item.Lat000 + "&longitude=" + item.Lon000
// 				uni.navigateTo({
// 					url: './map?' + params
// 				}) 
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
					Ryid00: this.uid
				}); 
				
				uni.showLoading({
					title: '正在加载...'
				});
				this.$http.doRequest(this.$http.apiUrl + '/Sign/GetAllDailySignByUserId', param)
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
					uni.hideLoading();
				});
			}
			
		},
		computed:{
		}
	}
</script>
<style>

	/*tab 相关*/
	
	.tab-list {
		margin-top: 0rpx;
	}
</style>
