<template>
	<view class="page-body">
		<uni-nav-bar title="选择目标位置" @clickLeftIcon="back()" left-icon="icon-zuojiantou a"></uni-nav-bar>
		<view class="path">
			<scroll-view class="index-view" scroll-x="true">
				<view :key="index" v-for="(item,index) in nodeRoutes" @tap="clickItem(item)" class="index-view-c">
					<view v-if="index === 0 && nodeRoutes.length === 1" class="index-item-first-last" >
						<text class="index-item-nodename">{{item.NodeName}}</text>
					</view>
					<view v-if="index === 0 && nodeRoutes.length > 1" class="index-item-first" >
						<text class="index-item-nodename">{{item.NodeName}}</text>
					</view>
					<view v-if="index > 0 && index < nodeRoutes.length - 1" class="index-item-middle">
						<text class="index-item-nodename">{{item.NodeName}}</text>
					</view>
					<view v-if="index > 0 && index === nodeRoutes.length - 1" class="index-item-last">
						<text class="index-item-nodename">{{item.NodeName}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view :class="['tab-list']">
			<view>
				<view class="grace-news-list">
					
					<view class="garace-hl-list" v-show="newDir.createDirMode">
						<view class="tab-item">
							<view class="icon-item">
								<view class="icon-size iconfont icon-weibiaoti-_huabanfuben"></view>
							</view>
							<view class="text-item">
								<view style="flex:5;"></view>
								<view style="flex:8;" class="text-item-nodename">
									<input type="text" v-model="newDir.dirName" :focus="newDir.createDirMode" class="new-dir-input"/>
									<text @tap="doCreateDir()" style="color:#00B26A;" 
										class="iconfont iconfont icon-dagou new-dir-op"></text>
									<text @tap="cancelNewDir();" style="color:red;" 
										class="iconfont icon-dacha new-dir-op"></text>
								</view>
								<view style="flex:2;"></view>
							</view> 
						</view>
					</view>
					
					<view v-for="(item,index) in listData" :key="index" class="garace-hl-list">
						<view class="tab-item" @tap="clickItem(item)">
							<view class="icon-item">
								<view class="icon-size iconfont" 
									:class="{'icon-weibiaoti-_huabanfuben': item.NodeType === 1, 'icon-wenjian' : item.NodeType === 0 }"></view>
							</view>
							<view class="text-item">
								<view style="flex:2;"></view>
								<view style="flex:7;">
									<text class="text-item-nodename">{{item.NodeName}}</text>
								</view>
								<view style="flex:1;"></view>
								<view style="flex:4;" class="text-item-createtime">{{item.CreateTime}}</view>
								<view style="flex:1;"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
		<view class="bottomMenu">
			<view class="bottom-menu-item" @tap="createDir();">
				<view>
					<text class="icon-size iconfont icon-xinjianmulu"></text>
				</view>
				<view>
					<text>新建目录</text>
				</view>
			</view>
			<view class="bottom-menu-item" @tap="selectThis();">
				<view>
					<text class="icon-size iconfont icon-hl-sel-dir"></text>
				</view>
				<view>
					<text>选择此目录</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import loadMore from '../../components/load-more.vue';
	import utils from '../../common/utils.js';
	import uniNavBar from "@/components/uni-nav-bar.vue";
	
	let ROOT_ITEM = { 
		Id: '0',
		NodeName: '全部文件'
	};

	export default {
		data() {
			return {
				title: '全部文件',
				curDirInfo: ROOT_ITEM,
				nodeRoutes: [
					ROOT_ITEM
				],
				searchInfo: {
					pid: '',
					nodeType: 1,
					mediaType: '',
					nodeName: '',
				},
				eventName: '',
				listData: [], 
				userinfo : {
					userId: utils.getUserId(),
					trueName: utils.getTrueName()
				},
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				pageInfo: {
					pageIndex: 1,
					pageSize: 50
				},
				newDir : {
					createDirMode: false,
					dirName: '',
				},
			}
		},
		computed: {
			
		},
		onLoad(params) {
			//初始化页面查询参数
			this.eventName = params.eventName;
			if(!this.eventName) { throw new Error('请传入回调事件名称:eventName'); }
			
			this.getList();
		},
		destroyed() {
			try{
				uni.hideLoading();
			}catch(e){
			}
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
			clickItem: function(item) {
				this.searchInfo.pid = item.Id;
				this.getList(true);
			},
			selectThis: function() {
				this.EventBus.fire(this.eventName,this.curDirInfo);
				uni.navigateBack({ delta: 1 });
			},
			getList: function(refresh) {
				//搜索中返回
				if (this.loadingType === 1) { return; }
				if(refresh) {
					this.pageInfo.pageIndex = 1;
					this.listData = [];
				}
				
				this.loadingType = 1;
				let param = Object.assign(this.pageInfo, this.searchInfo,this.userinfo,{}); 
				
				this.$http.doRequest(this.$http.apiUrl + '/SharedFile/QueryCurrentNode', param)
				.then((data) => {
					uni.stopPullDownRefresh();
					if (data.Result) {
						if(data.Data) {
							this.listData = this.listData.concat(data.Data);
							this.pageInfo.pageIndex++;
							this.loadingType = 0;
							this.curDirInfo = data.DirInfo;
							this.searchInfo.pid = this.curDirInfo.Id || "0";
							this.title = this.curDirInfo.NodeName
							this.nodeRoutes = data.Routes;
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
			createDir: function() {
				this.newDir.createDirMode = true;
				this.newDir.dirName = "";
			},
			cancelNewDir: function() {
				this.newDir.createDirMode = false;
				this.newDir.dirName = "";
			},
			doCreateDir: function() {
				if(!this.newDir.dirName) {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: '目录不能为空'
					});
					return;
				}
				
				let param = Object.assign(this.pageInfo, this.searchInfo, this.userinfo, {
					name: this.newDir.dirName
				}); 
				this.$http.doRequest(this.$http.apiUrl + '/SharedFile/CreateDir', param)
				    .then((data) => {
					if (data.result) {
						this.cancelNewDir();
						this.getList(true);
					}
					else {
						uni.showModal({
							title: '提示',
							showCancel: false,
							content: data.message
						});
					}
				}) 
				.finally(() => {
					uni.hideLoading();
				});
			},
			back: function() {
				if(this.newDir.createDirMode) {
					this.cancelNewDir(); 
					return;
				}
				let length = this.nodeRoutes.length;
				if(length === 1 && this.nodeRoutes[0].Id === "0") {
					uni.navigateBack({ delta: 1 });
				} 
				else {
					this.searchInfo.pid = this.curDirInfo.Pid;
					this.getList(true);
				}
			}
			
		}
	}
</script>
<style scoped="">

	.index-view {
		white-space: nowrap;
		width: 100%;
		background-color: #ddd;
		padding: 0upx;
	}
	
	.index-view-c {
		display: inline-block;
	}
	
	.index-item-first {
		display: inline-block;
		padding: 8upx 0;
		background-color: #fff;
		margin-right: 72upx;
		position: relative;
	} 
	
	.index-item-first:after {
		position: absolute;
		content: "";
		width: 0;
		height: 0;
		border: transparent 32upx solid;
		border-left-color: #fff;
		top: 0upx;
		right: -60upx;
	}

	.index-item-middle {
		display: inline-block;
		padding: 8upx 0;
		background-color: #fff;
		margin-right: 72upx;
		position: relative;
	} 
	
	.index-item-middle:before {
		position: absolute;
		content: "";
		width: 0;
		height: 0;
		border: #fff 32upx solid;
		border-left-color: transparent;
		top: 0upx;
		left: -60upx;
	}
	
	.index-item-middle:after {
		position: absolute;
		content: "";
		width: 0;
		height: 0;
		border: transparent 32upx solid;
		border-left-color: #fff;
		top: 0upx;
		right: -60upx;
	}
	
	.index-item-last {
		display: inline-block;
		padding: 8upx 0;
		position: relative;
		margin-left: -30upx;
	}
	
	.index-item-first-last {
		display: inline-block;
		padding: 8upx 0;
		position: relative;
	}
	
	.index-item-nodename {
		font-size:30upx;
		padding-left: 12upx;
		padding-right: 12upx;
	}
	

	.tab-list {
		margin-top: 6upx;
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
		font-size:80upx;
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
	
	.text-item-chk {
		position: absolute;
		right: 0;
	}
	
	/* 创建时间 */
	.text-item-createtime {
		font-size:21upx;
		color:#666;
	}
	
	.new-dir-op {
		font-size:20px;
		display:inline-block;
		vertical-align: top;
		padding:0px 24upx;
		margin-top: 9px;
	}
	
	.new-dir-input {
		width:400upx;
		display:inline-block;
		border: solid 1px #ddd;
		border-radius: 3px;
		padding: 8upx;
	}
	
	.bottomMenu {
		position: fixed; 
		bottom: 0; 
		background: #1d96f0;
		width: 100%;
		height: 100upx;
		display: flex;
		flex-direction: row;
		padding: 12upx 0;
	}
	
	.bottom-menu-item {
		flex: 1;
		text-align: center;
		color: #fff;
	}

</style>
