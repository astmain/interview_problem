<template>
	<view class="page-body">
		<uni-nav-bar title="会议文件"></uni-nav-bar>
		<search-box v-on:remoteSearch="remoteSearch"></search-box>
		<view :class="['tab-list']">
			<view>
				<view class="grace-news-list">
					<view v-for="(item,key) in listData" :key="key" class="garace-hl-list" @tap="previewImage(item)" @longpress="showCollectionItems(item)">
						<view class="grace-news-list-info" style="margin-top:6upx;">
							<view>
								<text class="icon-size iconfont icon-i-info"></text>文件名: {{item.fname || ''}}
							</view>
						</view>
						<view class="grace-news-list-info">
							<view>
								<text class="icon-size iconfont icon-time1"></text>上传时间: {{item.cjsj || ''}}
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
				glid: '',
				loadingType: 0,
				listData: [], 
				pageInfo: {
					pageIndex: 1,
					pageSize: 10
				}
			}
		},
		onLoad(e) {
			this.glid = e.Zbid00;
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
			showCollectionItems: function(item) {
				let that = this;
				let btns = [];
				btns.push('预览');
				btns.push('下载');
				//btns.push('取消');
				new Promise((resolve, reject) => {
					uni.showActionSheet({
						itemList: btns,
						success: function(res) {
							resolve(res.tapIndex);
						},
						fail() {
							resolve(-1);
						}
					});
				}).then((cancel) => {
					if (cancel < 0) {
						return;
					}
					if (btns[cancel] === "取消") {
						return;
					}
			
					if (btns[cancel] === "预览") {
						this.previewImage(item);
					}
					if (btns[cancel] === "下载") {
			
						this.previewImage2(item);
					}
				});
			},
			detail: function(item) {
				uni.navigateTo({ 
					url: './detail?id=' + item.Id0000
				})
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
					glid: this.glid,
					Fjysmc: this.searchKey
				}); 
				
				uni.showLoading({
					title: '正在加载...'
				});
				this.$http.doRequest(this.$http.apiUrl + '/Sfile/QueryFileList', param)
				.then((data) => {
					uni.stopPullDownRefresh();
					if (data.Result) {
						 data.Data.forEach((obj) => {
						 	let furl = this.$http.baseUrl + '/file/gongwen/' + obj.Fjlsmc;
						 	this.listData.push({
						 		'url': furl, 
						 		'id': obj.Id0000,
						 		'fjsfyl': obj.Fjsfyl,
						 		'fname': obj.Fjysmc,
						 		'cjr': obj.Cjr000,
						 		'cjsj': obj.Cjsj00,
						 		'scrid': obj.Scrid0,
						 		'candel': obj.Scrid0 === utils.getUserId(),
						 		'kzm000':obj.Kzm000
						 	}); 
						 }); 
						 
						 this.pageInfo.pageIndex++;
						 this.loadingType = 0;
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
			previewImage: function(item) { //预览图片
				/* let that = this;
				if (item.fjsfyl == 2) //如果是文件的话 
				{
					let tempList = [];
					this.imgLists.forEach((obj) => {
						if (obj.fjsfyl == 2)
							tempList.push(obj.url);
					})
					
					uni.previewImage({
						urls: tempList,
						current: item.url
					});
					
				} else {
					utils.openDocument({
						filePath: item.url,
						title: item.fname,
						success: (res) => {}
					});
				} */
				let that = this;
				if (item.fjsfyl == 2) //如果是文件的话 
				{
					let tempList = [];
					this.listData.forEach((obj) => {
						if (obj.fjsfyl == 2)
							tempList.push(obj.url);
					})
				
					uni.previewImage({
						urls: tempList,
						current: item.url
					});
				
				} else {
					// utils.openDocument({
					// 	filePath: item.url,
					// 	title: item.fname,
					// 	success: (res) => {}
					// });
				
					var supportFile = ".doc,.docx,.xls,.xlsx,.pdf,.ppt,.pptx,.txt,.zip,.csv";
				
					if (supportFile.indexOf(item.kzm000) == -1) {
						utils.openDocument({
							filePath: item.url,
							title: item.fname,
							success: (res) => {}
						});
					} else {
						uni.navigateTo({
							url: '../../pages/my/preview?id=' + item.id
						})
					}
				
				}
			},
			previewImage2: function(item) { //预览图片
				let that = this;
				if (item.fjsfyl == 2) //如果是文件的话 
				{
					let tempList = [];
					this.imgLists.forEach((obj) => {
						if (obj.fjsfyl == 2)
							tempList.push(obj.url);
					})
			
					uni.previewImage({
						urls: tempList,
						current: item.url
					});
			
				} else {
					utils.openDocument({
						filePath: item.url,
						title: item.fname,
						success: (res) => {}
					});
				}
			}
			
		},
		computed:{
		}
	}
</script>
<style>

	/*tab 相关*/
	
	.tab-list {
		margin-top: 90upx;
	}
</style>
