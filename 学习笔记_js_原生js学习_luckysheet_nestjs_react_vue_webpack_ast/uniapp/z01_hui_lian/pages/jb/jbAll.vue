<template>
	<view class="page-body">
		<uni-nav-bar title="所有通用审批"></uni-nav-bar>
		<search-box v-on:remoteSearch="remoteSearch"></search-box>
		<view :class="['tab-list']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData" :key="key" class="garace-hl-list" @click="itemTap(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main">{{item.Jbbt00}}</view>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>日期：{{item.Jbsj00}}
								<text class="grace-icons left-margin"></text>发起部门：{{item.Dwmc00}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>发起时间：{{item.Cjsj00}}
								<text class="grace-icons left-margin"></text>发起人员：{{item.Jbrmc0}}
							</view>
						</view>

						<view class="grace-news-list-info">
							<view>
								<text class="grace-icons" style="color:#DD524D;"></text>状态：{{ item.Jbzt00 }}
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
				searchKey: '',
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				Jyyj00: '',
				currentItemId: '',
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
			uniNavBar
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
				if (refresh) {
					this.pageInfo.pageIndex = 1;
					this.listData = [];
				}

				this.loadingType = 1;

				//拼接搜索条件
				let param = Object.assign(this.pageInfo, {
					Jbbt00: this.searchKey,
					UserID: utils.getUserId()
				});

				this.$http.doRequest(this.$http.apiUrl + '/Sq/SearchJbAll', param)
					.then((data) => {
						uni.stopPullDownRefresh();
						if (data.Result) {
							if (data.Data) {
								data.Data.forEach(item => {
									this.setStatus(item);
								});
								this.listData = this.listData.concat(data.Data);
								this.pageInfo.pageIndex++;
								this.loadingType = 0;
							}
							if (!data.Result || !data.Data || data.Data.length < this.pageInfo.pageSize) {
								this.loadingType = 2;
							}
						} else {
							this.loadingType = 0;
						}
					})
					.catch((data) => {
						uni.stopPullDownRefresh();
					});
			},
			remoteSearch: function(searchKey) {
				this.searchKey = searchKey;
				this.getList(true);
			},
			toView: function(item) {
				uni.navigateTo({
					url: "./jbDetail?Flag=view&Zbid00=" + item.Id0000
				})
			},
			setStatus: function(item) {
				var shztName = "";
				if (item.Jbzt00 == 0) {
					shztName = "其他";
				} else if (item.Jbzt00 == 1) {
					shztName = "流转中";
				} else if (item.Jbzt00 == 2) {
					shztName = "归档";
				}
				item.Jbzt00 = shztName;
			},
		},
		destroyed: function() {
			uni.hideLoading();
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
