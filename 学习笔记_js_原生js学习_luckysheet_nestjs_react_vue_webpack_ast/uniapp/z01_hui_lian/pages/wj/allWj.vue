<template>
	<view class="page-body">
		<search-box v-on:remoteSearch="remoteSearch"></search-box>
		<view :class="['tab-list']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData" :key="key" class="garace-hl-list" @click="itemTap(item)">
						<view class="grace-news-list-items">
							<view class="grace-news-list-title">
								<view class="grace-news-list-title-main">{{item.Fwbt00}}</view>
							</view>
							<text class='grace-icons icon-arrow-right grace-hl-list-arrow'></text>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>文号：{{item.Fwh000 || ''}}
								<text class="left-margin"></text>文件类型：{{item.Lx0000 || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>文件分类：{{item.Fwlx00 || ''}}
								<text class="left-margin"></text>类别：{{item.Swlbxh || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>发文时间：{{item.Fwrq00 || ''}}
								<text class="left-margin"></text>拟稿人：{{item.Cjr000 || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="" style="color:#DD524D;">借阅状态：{{ item.Jyzt00 || ''}}</text>
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
	import utils from '../../common/utils.js'

	
	import {
		mapState
	} from 'vuex'

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
			loadMore
		},
		onReachBottom() {
			this.getList(false);
		},
		methods: {
			itemTap: function(item) {
				if(utils.getUserId() == item.Ngrid0) {
					//本人就是创建人
					this.toView(item);
				}
				else if (item.Shztjy == 0) {
					//审核拒绝
					uni.showModal({
						title: '提示', 
						showCancel: false,
						content: '审核被拒绝，无法查阅'
					});
				} 
				else if (item.Shztjy == 1) {
					//审核中
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: '已经在审核了，待审核通过方可查阅'
					});
				} 
				else if (item.Shztjy == 2) {
					//已经审核通过的
					this.toView(item);
				} 
				else {
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
					Fwbt00: this.searchKey,
					UserID: utils.getUserId()
				}); 
				
				uni.showLoading({ title: '正在加载...' }); 
				this.$http.doRequest(this.$http.apiUrl + '/FileShare/SearchFwxgjlAll', param)
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
			remoteSearch: function(searchKey) {
				this.searchKey = searchKey;
				this.getList(true);
			},
			fqjy: function () {
				this.bannerShow = false;
				if(this.Jyyj00 == null || this.Jyyj00 === '') {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: '请填写借阅意见'
					});
					return;
				}
				
				var that = this;
				this.$http.doRequest(this.$http.apiUrl + '/FileShare/SwjySq', {
					UserID : utils.getUserId(),
					UserName : utils.getUserName(),
					Jylx00 : 2,		//文件为1
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
			setStatus : function(item) {
				let curUserId = utils.getUserId();
				let jyztName = '';
				if(curUserId == item.Ngrid0) {
					jyztName = "无需借阅";
				} 
				else if (item.Shztjy == 0) {
					jyztName = "审核拒绝";
				} 
				else if (item.Shztjy == 1) {
					jyztName = "审核中";
				} 
				else if (item.Shztjy == 2) {
					jyztName = "审核通过";
				} 
				else {
					jyztName = "未借阅";
				}
				item.Jyzt00 = jyztName;
			},
			toView:function(item) {
				uni.navigateTo({
					url: './wjDetail?Flag=view&Zbid00=' + item.Id0000
				})
			}
		},
		computed:{
			...mapState(['id0000']),
		}
	}
</script>
<style>
	@import "../../common/iconfont.css";

	/*tab 相关*/
	.tabs {
		display: flex;
		flex-direction: row;
		top: 194upx;
		position: fixed;
		z-index: 8;
	}

	.tab {
		font-size: 30upx;
		height: 80upx;
		line-height: 80upx;
		flex: 1;
		justify-content: center;
		text-align: center;
		color: #777777;
		background-color: #FFFFFF;
	}

	.tab-on {
		color: #1d96f0;
		border-bottom: 5upx solid #1d96f0;
	}

	.tab-list {
		margin-top: 100rpx;
		opacity: 1;
		left: 100upx;
		-webkit-transition: all .2s ease-in;
		-moz-transition: all .2s ease-in;
		transition: all .2s ease-in;
		visibility: visible;
	}
	
	.grace-news-list-info .left-margin {
		margin-left: 30rpx;
	}
</style>
