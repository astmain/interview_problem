<template>
	<view class="page-body">
		<uni-nav-bar :title="title" @clickLeftIcon="back(0)" left-icon="icon-zuojiantou a"></uni-nav-bar>
		<search-box v-model="searchInfo.nodeName" v-on:remoteSearch="remoteSearch">
			<!-- <view slot="left">
				<text @tap="category()" class="category">分类</text>
			</view> -->
			<view slot="right">
				<text class="iconfont icon-tianjia search-box-btn" style="font-size: 42upx;" @tap="showMenu()"></text>
			</view>
		</search-box>
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
										class="iconfont icon-dagou new-dir-op"></text>
									<text @tap="cancelNewDir();" style="color:red;" 
										class="iconfont icon-dacha new-dir-op"></text>
								</view>
								<view style="flex:2;"></view>
							</view> 
						</view>
					</view>
					
					<checkbox-group @change="checkboxChange">
						<view v-for="(item,index) in listData" :key="index" class="garace-hl-list">
							<view class="tab-item" @tap="clickItem(item)" @longpress="longClickItem(item,index)">
								<view class="icon-item">
									<view class="icon-size iconfont" 
										:class="{'icon-weibiaoti-_huabanfuben': item.NodeType === 1, 'icon-wenjian' : item.NodeType === 0 }"></view>
								</view>
								<view class="text-item">
									<view style="flex:2;"></view>
									<view style="flex:7;">
										<text class="text-item-nodename">{{item.NodeName}}</text>
										<checkbox class="text-item-chk" :value="item.Id" :checked="item.Checked" v-show="multiCheckMode" />
									</view>
									<view style="flex:1;"></view>
									<view style="flex:4;" class="text-item-createtime">{{item.CreateTime}}</view>
									<view style="flex:1;"></view>
								</view>
							</view>
						</view>
					</checkbox-group>
					
				</view>
			</view>
		</view>
		<view>
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
		
		<popMenu :menuShow="menuShow" positionLeft="600" positionTop="300" arrowPosition="tipArrow-top" :menuList="menuList"
			@menuTap="menuTap" @menuClosed="menuClosed" @hidePopup="hideMenu();"></popMenu>
			
		<view v-if="multiCheckMode" class="bottomMenu">
			<view class="bottom-menu-item" @tap="clickBottomMenu('delete');">
				<view>
					<text class="icon-size iconfont icon-shanchu3"></text>
				</view>
				<view>
					<text>删除</text>
				</view>
			</view>
			<view class="bottom-menu-item" @tap="clickBottomMenu('copy');">
				<view>
					<text class="icon-size iconfont icon-fuzhi"></text>
				</view>
				<view>
					<text>复制到</text>
				</view>
			</view>
			<view class="bottom-menu-item" @tap="clickBottomMenu('move');">
				<view>
					<text class="icon-size iconfont icon-yidong"></text>
				</view>
				<view>
					<text>移动到</text>
				</view>
			</view>
			<view class="bottom-menu-item" @tap="clickBottomMenu('rename');" v-show="checkedItems.length === 1">
				<view>
					<text class="icon-size iconfont icon-zhongmingming"></text>
				</view>
				<view>
					<text>重命名</text>
				</view>
			</view>
			<view class="bottom-menu-item" @tap="clickBottomMenu('locate');" v-show="checkedItems.length === 1">
				<view>
					<text class="icon-size iconfont icon-dakaimuluwenjianjia"></text>
				</view>
				<view>
					<text>所在目录</text>
				</view>
			</view>
		</view>
		<view class="rename-outter" v-show="reName.reNameMode">
			<view class="rename-block" >
				<view class="rename-row">
					<text class="rename-title">请填写新名称</text>
				</view>
				<view class="rename-row">
					<input class="rename-input" :focus="reName.renameInputFocus" type="text" v-model="reName.newName" />
				</view>
				<view class="rename-row" style="text-align: center;margin-top:30upx;">
					<button class="rename-btn" @tap="doRename()" >确定</button>
					<button class="rename-btn" @tap="renameCancel()" >取消</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import searchBox from '../../components/search-box2.vue';
	import loadMore from '../../components/load-more.vue';
	import utils from '../../common/utils.js';
	import cacheUtils from '../../common/cache-utils.js';
	import uniNavBar from "@/components/uni-nav-bar.vue";
	import popMenu from '../../components/pop-menu.vue';
	
	let ROOT_ITEM = { 
		Id: '0',
		NodeName: '全部文件'
	};
	
	let EVENT_NAME_COPY_SELECT_DIR = "sharedx.copy.selectdir";
	let EVENT_NAME_MOVE_SELECT_DIR = "sharedx.move.selectdir";

	let SUPPORT_FILE_EXTENSIONS = ",.doc,.docx,.xls,.xlsx,.pdf,.ppt,.pptx,.txt,.zip,.csv,";

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
					nodeType: '',
					mediaType: '',
					nodeName: '',
				},
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
				multiCheckMode: false,
				checkedItems: [],
				itemMap: {},
				menuShow: false,
				newDir : {
					createDirMode: false,
					dirName: '',
				},
				reName : {
					reNameMode: false,
					newName: '',
					renameInputFocus : false
				},
				menuList: [
					{
						menuName: '上传',
						menuIcon: 'icon-shangchuan'
					},
					{
						menuName: '新建目录',
						menuIcon: 'icon-xinjianmulu'
					},
					{
						menuName: '退出',
						menuIcon: 'icon-hl-exit'
					}
				]
			}
		},
		computed: {
			
		},
		onLoad(params) {
			
			//初始化页面查询参数
			this.searchInfo = params;
			this.searchInfo.pid = this.searchInfo.pid || '',
			this.searchInfo.nodeType = this.searchInfo.nodeType || '',
			this.searchInfo.mediaType = this.searchInfo.mediaType || '',
			this.searchInfo.nodeName = this.searchInfo.nodeName || '',
			
			this.EventBus.register(EVENT_NAME_COPY_SELECT_DIR,(data) => {
				let that = this;
				setTimeout(() => {
					that.doCopy(data.Id);
				},100)
			});
			
			this.EventBus.register(EVENT_NAME_MOVE_SELECT_DIR,(data) => {
				let that = this;
				setTimeout(() => {
					that.doMove(data.Id);
				},100)
			});
			
			
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
			searchBox,
			loadMore,
			uniNavBar,
			popMenu
		},
		onReachBottom() {
			this.getList(false);
		},
		onBackPress: function(event) {
			if(event && event.from !== "navigateBack") { 
				console.log(event);
				this.back();
				return true;
			}
		},
		methods: {
			clickBottomMenu: function(menu) {
				let that = this;
				that.endMultiCheckMode();
				if(menu === "delete") {
					uni.showModal({
						title: '提示',
						content: '确定要删除吗?',
						success: function (res) {
							if (res.confirm) {
								that.doDelete();
							}
						}
					});
				}
				else if(menu === "copy") {
					uni.navigateTo({ url: './dirSelectList?eventName=' + EVENT_NAME_COPY_SELECT_DIR });
				}
				else if(menu === "move") {
					uni.navigateTo({ url: './dirSelectList?eventName=' + EVENT_NAME_MOVE_SELECT_DIR });
				}
				else if(menu === "rename") {
					let id = this.checkedItems[0];
					let item = this.itemMap[id];
					if(!item) { return; }
					this.rename(item);
				}
				else if(menu === "locate") {
					let id = this.checkedItems[0];
					let item = this.itemMap[id];
					if(!item) { return; }
					this.searchInfo.pid = item.Pid;
					this.getList(true);
				}
			},
			doCopy: function(targetDir) {
				uni.showLoading({ title: '复制中，请稍后...' }); 
				this.$http.doRequest(this.$http.apiUrl + '/SharedFile/CopyNode', {
					sources: this.checkedItems.join(","),
					target: targetDir
				})
				.then((data) => {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: data.Msg
					});
					data.Result && this.getList(true);
				})
				.finally(() => {
					uni.hideLoading();
				});
			},
			doMove: function(targetDir) {
				uni.showLoading({ title: '移动中，请稍后...' }); 
				this.$http.doRequest(this.$http.apiUrl + '/SharedFile/MoveNode', {
					sources: this.checkedItems.join(","),
					target: targetDir
				})
				.then((data) => {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: data.Msg
					});
					data.Result && this.getList(true);
				})
				.finally(() => {
					uni.hideLoading();
				});
			},
			doDelete: function() {
				uni.showLoading({ title: '删除中，请稍后...' }); 
				this.$http.doRequest(this.$http.apiUrl + '/SharedFile/DeleteNode', {
					sources: this.checkedItems.join(",")
				})
				.then((data) => {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: data.Msg
					});
					
					if(data.Result) {
						this.checkedItems.forEach(id => {
							for(let i = this.listData.length - 1; i >= 0; i--) {
								let item = this.listData[i];
								if(item.Id === id) {
									this.listData.splice(i,1);
								}
							}
						});
					}
				})
				.finally(() => {
					uni.hideLoading();
				});
			},
			clickItem: function(item) {
				let that = this;
				if(item.NodeType === 1) {
					//点击的是目录
					this.searchInfo.pid = item.Id;
					this.getList(true);
					return;
				}
				
				//下面处理文件
				if(!that.supportPreview(item)) {
					//如果附件不支持预览直接下载
					that.open(item);
					return;
				}
				
				//附件支持预览
				uni.showActionSheet({
					itemList: ['下载', '预览'], 
					success: function (res) {
						if(that.multiCheckMode) { return; }
						if(res.tapIndex === 0) {
							//下载
							that.open(item);
						}
						else if(res.tapIndex === 1) {
							//预览
							that.preview(item);
						}
					}
				});
			},
			supportPreview: function(item) {
				if(!item.ExtendName) { return false; }
				return SUPPORT_FILE_EXTENSIONS.indexOf(',.' + item.ExtendName + ',') > -1 ||
				SUPPORT_FILE_EXTENSIONS.indexOf(',' + item.ExtendName + ',') > -1;
			},
			longClickItem: function(item,index) {
				this.startMultiCheckMode();
				item.Checked = true;
				this.checkedItems = [item.Id];
			},
			checkboxChange: function(res) {
				this.checkedItems = res.mp.detail.value;
			},
			rename: function() {
				this.reName.newName = "";
				this.reName.reNameMode = true;
				this.reName.renameInputFocus = false;
				setTimeout(() => {
					//下轮渲染时触发focus
					this.reName.renameInputFocus = true;
				},0)
			},
			renameCancel: function() {
				this.reName.reNameMode = false;
				this.reName.newName = "";
			},
			doRename: function() {
				let newName = this.reName.newName;
				this.renameCancel();
				let nid = this.checkedItems[0];
				if(!nid) {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: '请选择文件或目录'
					});
				}
				uni.showLoading({ title: '重命名中，请稍后...' }); 
				this.$http.doRequest(this.$http.apiUrl + '/SharedFile/RenameNode', {
					nid: nid,
					newName: newName
				})
				.then((data) => {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: data.Msg
					});
					if(data.Result) {
						this.listData.forEach(item => {
							if(item.Id === nid) { item.NodeName = newName; }
						});
					}
				})
				.finally(() => {
					uni.hideLoading();
				});
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
							data.Data.forEach(item => {
								item.Checked = false;
								this.itemMap[item.Id] = item;
							});
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
			remoteSearch: function(searchKey) {
				this.searchInfo.nodeName = searchKey;
				this.getList(true);
			},
			open: function(item) {
				//保存历史记录
				let list = cacheUtils.fetchRecentFile(this.userinfo.userId) || [];
				list.splice(0, 0, item);
				cacheUtils.storeRecentFile(this.userinfo.userId, list);
				this.EventBus.fire("recentFileChanged");
				
				// //打开预览
				// uni.navigateTo({
				// 	url:'../../pages/my/preview?id='+item.Id+"&share=true"
				// })
				// return;
				
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
			preview: function(item) {
				uni.navigateTo({
					url:'../../pages/my/preview?id=' + item.Id
				});
			},
			back: function() {
				if(this.menuShow || this.multiCheckMode || this.newDir.createDirMode) {
					this.menuShow = false; 
					this.endMultiCheckMode();
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
			},
			preview: function(item) {
				uni.navigateTo({
					url:'../../pages/my/preview?share=1&id=' + item.Id
				});
			},
			startMultiCheckMode: function() {
				this.listData.forEach(item => {
					item.Checked = false;
				});
				this.multiCheckMode = true;
			},
			endMultiCheckMode: function() {
				this.listData.forEach(item => {
					item.Checked = false;
				});
				this.multiCheckMode = false; 
			},
			showMenu: function() {
				this.menuShow = true;
			},
			hideMenu:function() {
				this.menuShow = false;
			},
			menuTap: function(value) {
				this.menuShow = false;
				if(value === 0) {
					//上传
					this.upload();
				}
				else if(value === 1) {
					this.createDir();
				}
				else if(value === 2) {
					uni.navigateBack({ delta: 1 });
				}
			},
			menuClosed: function() {
				this.menuShow = false;
			},
			upload: function() {
				uni.chooseImage({
					count: 9,
					sizeType: ['compressed'],
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						tempFilePaths.forEach((obj) => {
							uni.uploadFile({
								url: this.$http.apiUrl + '/SharedFile/AddFile',
								filePath: obj,
								name: 'file',
								formData: {
									pid: this.curDirInfo.Id,
									UserID: this.userinfo.userId,
									TrueName: this.userinfo.trueName
								},
								success: (uploadFileRes) => {
									let rdata = JSON.parse(uploadFileRes.data);
									console.log("rdata: " + JSON.stringify(rdata));
									if (rdata.result) {
										this.getList(true);
									}
									else {
										uni.showModal({
											title: '提示',
											showCancel: false,
											content: '上传失败，请重试'
										});
										return;
									}
								}
							});
				
						});
					}
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
			}
			
			
			
		}
		
	}
</script>
<style scoped="">

	.tab-list {
		margin-top: 100rpx;
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
	
	.icon-wenjian {
		color: #50c4ff !important;
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
		right: 20upx;
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
	
	.rename-outter {
		position: absolute;
		top: 0;
		left: 0;
		width: 760upx;
		height: 100%;
		z-index: 9999;
		background: rgba(0,0,0,0.5);
	}
	
	.rename-block {
		position: fixed;
		width: 604upx;
		height: 300upx;
		left: 50upx;
		top: 50%;
		margin-top: -150upx;
		background-color: rgb(255, 255, 255);
		box-shadow: 2px 1px 12px 5px #555;
		padding: 20upx;
	}
	
	.rename-row {
		margin-bottom:24upx;
		padding: 6upx;
	}
	
	.rename-title {
		font-weight: bold;
		font-size: 34upx;
	}
	
	.rename-input {
		border: solid 1px #ccc;
		padding: 8upx;
	}
	
	.rename-btn {
		line-height:2em;
		display: inline-block;
		margin: 15upx 42upx;
	}
 
</style>
