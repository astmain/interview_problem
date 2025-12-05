<template>
	<view>
		<uni-nav-bar title="文件共享"></uni-nav-bar>
		<view class="container">
			<view style="margin-bottom: 60upx;">
				<view class="uni-grid-9">
					<view @click="navTo(item.url);" class="uni-grid-9-item" hover-class="uni-grid-9-item-hover"
						style="position:relative;flex-direction: column;"
						v-for="(item,index) in categories" :key="index" >
						<view class="item-block item-block-icon">
							<text class="icon-item iconfont icon-size" :class="item.icon"></text>
						</view>
						<view class="item-block item-block-text">
							<text class="uni-grid-9-text item-name">{{item.name}}</text>
						</view>
						<view class="item-block item-block-text">
							<text class="uni-grid-9-text item-count">{{statistics[item.apiName] || 0}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view style="padding:0 36upx;">
				<view style="color:#666;">最近打开</view>
				<view v-for="(item,index) in listData" :key="index" class="garace-hl-list" 
					@tap="clickItem(item)" @longpress="longPressItem(item,index)">
					<view class="tab-item">
						<view class="icon-item">
							<view class="icon-size iconfont" 
								:class="{'icon-weibiaoti-_huabanfuben': item.NodeType === 1, 'icon-wenjian' : item.NodeType === 0 }"></view>
						</view>
						<view class="text-item">
							<view style="flex:1;"></view>
							<view style="flex:5;" class="text-item-nodename">{{item.NodeName}}</view>
							<view style="flex:5;"></view>
							<view style="flex:5;" class="text-item-createtime">{{item.CreateTime}}</view>
						</view> 
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cacheUtils from '../../common/cache-utils';
	import utils from '../../common/utils.js';
	import uniNavBar from "@/components/uni-nav-bar.vue";
 
	const MAX_LOG = 50;
 
	export default {
		data() {
			return {
				appName: '主页',
				userId: '', 
				notices: [{
					"Id0000": "0",
					"Title": "暂无公告"
				}],
				userinfo : {
					userId: utils.getUserId(),
					trueName: utils.getTrueName()
				},
				categories: [
					{
						icon: "icon-tupian",
						apiName: 'PICTURE',
						name: '图片',
						url: './list?mediaType=PICTURE'
					},
					{
						icon: "icon-shipin",
						apiName: 'VIDEO',
						name: '视频',
						url: './list?mediaType=VIDEO'
					},
					{
						icon: "icon-yinpin",
						apiName: 'AUDIO',
						name: '音频',
						url: './list?mediaType=AUDIO'
					},
					{
						icon: "icon-wendang",
						apiName: 'DOCUMENT',
						name: '文档',
						url: './list?mediaType=DOCUMENT'
					},
					{
						icon: "icon-yasuobao",
						apiName: 'ZIP',
						name: '压缩',
						url: './list?mediaType=ZIP'
					},
					{
						icon: "icon-app",
						apiName: 'APPLICATION',
						name: '应用',
						url: './list?mediaType=APPLICATION'
					}, 
					{
						icon: "icon-wenjian1",
						apiName: 'UNKNOWN',
						name: '其他',
						url: './list?mediaType=UNKNOWN'
					},
					{
						icon: "icon-weibiaoti-_huabanfuben",
						apiName: 'TOTAL',
						name: '全部文件',
						url: './list'
					}
				],
				statistics: {},
				listData: []
			}
		},
		components: {
			uniNavBar
		},
		onLoad: function() {
			this.listenEvents();
			this.queryStatistics();
			this.showRecentFiles();
		},
		methods: {
			clickItem: function(item) {
				this.open(item);
			},
			longPressItem: function(item,index) {
				let that = this;
				uni.showActionSheet({
					itemList: ['打开所在目录', '删除记录','清空记录'],
					success: function (res) {
						if(res.tapIndex === 0) {
							that.navTo("./list?pid=" + item.Pid);
						}
						else if(res.tapIndex === 1) {
							that.listData.splice(index,1);
							cacheUtils.storeRecentFile(that.userinfo.userId,that.listData);
						}
						else if(res.tapIndex === 2) {
							that.listData = [];
							cacheUtils.storeRecentFile(that.userinfo.userId,that.listData);
						}
					}
				});
			},
			open: function(item) {
				//保存历史记录
				let list = cacheUtils.fetchRecentFile(this.userinfo.userId) || [];
				list.splice(0, 0, item);
				cacheUtils.storeRecentFile(this.userinfo.userId, list);
				this.EventBus.fire("recentFileChanged");
				
				//打开文件 
				let url = this.$http.apiUrl + '/SharedFile/DownLoad?ids=' + item.Id;
				utils.openDocument({
					filePath: url,
					title: item.NodeName,
					cacheKeyResolve: (url, filename) => {
						if(!url) { return ""; }
						let arr = /\?(id|ids)\=(.+)$/.exec(url);
						if(arr == null) { return ""; } 
						let fileCacheKey = arr[2];
						return fileCacheKey;
					},
					success: function(res) {
					}
				});
			},
			queryStatistics: function() {
				this.$http.doRequest(this.$http.apiUrl + '/SharedFile/MediaTypeStatistic', {})
				.then((data) => {
					if (data.Result) {
						this.statistics = data.Data || {};
					}
				}) 
				.catch((data) => {})
			},
			showRecentFiles: function() {
				let list = cacheUtils.fetchRecentFile(this.userinfo.userId) || [];
				let dic = {};
				let result = [];
				for(let i = 0; i < list.length; i++) {
					let item = list[i];
					if(result.length > MAX_LOG) { break; }
					if(dic[item.Id]) { continue; }
					
					result.push(item);
					dic[item.Id] = 1;
				}
				this.listData = result.splice(0,MAX_LOG);
				cacheUtils.storeRecentFile(this.userinfo.userId,this.listData);
			},
			navTo: function(jumpUrl) {
				uni.navigateTo({
					url: jumpUrl 
				})
			},
			listenEvents: function() {
				let that = this;
				//刷新待办数量的事件
				this.EventBus.register("categoryCountChanged", () => {
					
				});
				
				//刷新待办数量的事件
				this.EventBus.register("recentFileChanged", () => {
					setTimeout(() => {
						this.showRecentFiles();
					},100);
				});
			}
		},
		computed: {},
		watch: {

		}
	}
</script>

<style scoped>
	.uni-grid-9 {
		background: #FFFFFF;
		width: 750upx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		border-top: 2upx solid #FFFFFF;
	}

	.uni-grid-9-item {
		width: 187.5upx;
		height: 200upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-bottom: 2upx solid;
		border-right: 2upx solid;
		border-color: #FFFFFF;
		box-sizing: border-box;
	}

	.uni-grid-9-item-hover {
		background: rgba(0, 0, 0, 0.1);
	}

	.title {
		font-size: 50upx;
		color: #727275;
		text-align: center;
	}
	
	.title-icon {
		height:28px;
		width:28px;
		display:inline-block;
		margin-top:8px;
		margin-right: 2px;
	}
	
	.title-text {
		vertical-align: top;
		display: inline-block;
	}
	
	.icon-item {
		color:#ffd758;
		font-size: 100upx;
	}
	
	.item-block-icon {
		height:106upx;
	}
	
	.icon-size {
		font-size: 80upx
	}
	
	.item-block-text {
		text-align: center;
		color:#333;
	}
	
	.item-count {
		font-size:24upx;
	}
	
	
	/* 历史 */
	.tab-list {
		margin-top: 60px;
	}
	
	.tab-item {
		line-height:1; 
		display:flex; 
		flex-direction:row;
	}
	
	
	/* 左侧图标区域 */
	.tab-item .icon-item {
		flex:15;
	}
	
	/* 左侧图标 */
	.icon-item .iconfont {
		color:#ffd758;
		font-size:63upx;
	}
	
	/* 右侧文本区域 */
	.tab-item .text-item {
		flex:85;
		display:flex;
		flex-direction: column; 
		overflow:hidden; 
		white-space:nowrap;
		text-overflow: ellipsis;
	}
	
	/* 文件名称 */
	.text-item-nodename {
		font-size:1em;
		font-weight:bold;
		color:#333;
	}
	
	/* 创建时间 */
	.text-item-createtime {
		font-size:21upx;
		color:#666;
	}
	
	.category {
		display:inline-block; 
		margin-left:10upx; 
		color:#fff;
	}
	
	.new-dir-op {
		font-size:20px;
		display:inline-block;
		vertical-align: top;
		padding:0px 15upx;
		margin-top: 9px;
	}
	
	.new-dir-input {
		width:460upx;
		display:inline-block;
		border: solid 1px #ddd;
		border-radius: 3px;
		padding: 8upx;
	}
	

	
</style>
