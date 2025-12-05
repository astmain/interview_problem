<template>
	<view class="page-body">
		<uni-nav-bar title="全部发文"></uni-nav-bar>
		<search-box v-on:remoteSearch="remoteSearch"></search-box>
		<view :class="['tab-list']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData" :key="key" class="garace-hl-list" @click="itemTap(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main" style="display: flex;">
									<!-- <notice-text :level="item.Level" style="flex: 1;"></notice-text> -->
									<text style="flex: 11;">{{item.Fwbt00 || ''}}</text>
								</view>
							</view> 
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>拟稿日期：{{item.Ngrq00 || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>拟稿人:{{item.Ngr000 || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>主办单位：{{item.Zbdw00 || ''}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
		
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
					Wjbt00: this.searchKey,
					UserID: utils.getUserId()
				}); 
				
				uni.showLoading({ title: '正在加载...' }); 
				this.$http.doRequest(this.$http.apiUrl + '/Fw/SearchFwjyAll', param)
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
				if(this.Jyyj00 == null) {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: '请填写借阅意见'
					});
					return;
				}
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
					url: './fwDetail?Flag=view&Zbid00=' + item.Id0000
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
