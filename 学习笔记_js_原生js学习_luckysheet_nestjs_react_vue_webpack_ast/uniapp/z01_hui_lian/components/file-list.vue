<template>
	<view>
		<view class="grace-add-list" style="padding-left: 20rpx;">
			<view class="items" v-for="(item, index) in imgLists" :key="index">
				<image v-if="item.fjsfyl==2" :src="item.url" mode="widthFix" @tap="previewImage(item)" @longpress="showCollectionItems(item)"></image>
				<image v-else src="http://qiniu.huiliantech.com/word-2.png" mode="widthFix" @tap="previewImage(item)" @longpress="showCollectionItems(item)"></image>
				<view class="grace-filename" style="background-color:transparent;;color:#000;font-weight:bold;" v-if="item.fjsfyl!=2"
				 @tap="previewImage(item)" @longpress="showCollectionItems(item)">{{item.fname}}</view>
				<view v-show="opType && item.candel" class="remove" @tap="removeImg" :id="'grace-items-img-'+index" :data-id="item.id"></view>
			</view>
			<view class="items add-btn" @tap="addImg" v-if="btnImg && opType">
				<view class="add-btn-add">+</view>
				<view class="add-btn-text">添加附件</view>
			</view>
		</view> 
		<tki-file-manager ref="fileSelect" style="display: none;" @result="selectedCallback"></tki-file-manager>
		<l-file ref="lFile" @up-success="onFileUpSuccess"></l-file>
	</view>
</template>
<script>
	import utils from '../common/utils.js'
	import tkiFileManager from "@/components/tki-file-manager.vue";
	import lFile from '@/components/l-file/l-file.vue'

	var maxNum = 9;

	export default {
		data() {
			return {
				useFS: false, //使用文件系统选择器
				imgLists: [], //文件列表
				Gxlx00_: '', //组件内部的共享类型
				btnImg: true, //是否显示添加附件按钮
			}
		},
		components: {
			tkiFileManager
		},
		props: {
			Zbid00: {
				type: String,
				default: ''
			},
			Fjlx00: {
				type: String,
				default: 'Fj'
			},
			Gxlx00: { //共享类型
				type: String,
				default: ''
			},
			opType: { //1表示可以添加 0只能查看
				type: Number,
				default: 1
			},
			NeedChoose: { //是否需要选择问文件类型
				type: Boolean,
				default: false
			},
			ChooseList: { //选择的列表
				type: Array,
				defalut: [{
					"Name": "附件",
					"Value": ""
				}]
			},
			StartNewSelector: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			Gxlx00: {
				immediate: true,
				handler(val, oldVal) {
					this.Gxlx00_ = val;
				}
			}
		},
		mounted: function() {
			this.getImgList();
		},
		onLoad() {},
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
			getImgList: function() { //获取附件列表
				this.$http.doRequest(this.$http.apiUrl + '/Sfile/QueryFileList', {
					pageIndex: 1,
					glid: this.Zbid00,
					Gxlx00: this.Gxlx00_,
					Fjlx00: this.Fjlx00
				}).then((data) => {
					this.imgLists = [];
					if (data.Result) {
						data.Data.forEach((obj) => {
							// let furl = this.$http.baseUrl + '/file/gongwen/' + obj.Fjlsmc;
							// if (obj.Fjlx00 == 'hywj') //会议文件
							// 	furl = this.$http.baseUrl + '/file/Meeting/' + obj.Fjlsmc;
							
						let furl = this.$http.apiUrl + '/Sfile/DownLoad/?id=' + obj.Id0000;
							
							// if(obj.Fjsfyl==2)
							// {
							// 	furl = this.$http.imgUrl + '/file/gongwen/' + obj.Fjlsmc;
							// }
							
							this.imgLists.push({
								'url': furl,
								'id': obj.Id0000,
								'fjsfyl': obj.Fjsfyl,
								'fname': obj.Fjysmc,
								'cjr': obj.Cjr000,
								'cjsj': obj.Cjsj00,
								'scrid': obj.Scrid0,
								'candel': obj.Scrid0 === utils.getUserId(),
								'kzm000': obj.Kzm000
							});
						});
					}
				}).catch((data) => {
					console.log('获取图片发生异常:' + data);
				})
			},
			addImg: function() { //添加图片
				var num = maxNum - this.imgLists.length;
				if (num < 1) {
					return false;
				}

				if (this.NeedChoose) {
					let list = [];

					this.ChooseList.forEach(obj => {
						list.push(obj.Name);
					});

					uni.showActionSheet({
						itemList: list,
						success: res => {
							// this.Gxlx00 = this.ChooseList[res.tapIndex].Value;
							this.Gxlx00_ = this.ChooseList[res.tapIndex].Value;
							this.decideSelector();
						},
						fail: function(res) {
							console.log(res.errMsg);
						}
					});
				} else {
					this.decideSelector();
				}

			},
			decideSelector() {
				//this.chooseImg();
				//debugger;
				if (uni.getSystemInfoSync().platform === 'android') {
					//this.$refs.fileSelect._openFile();
					
					
					// #ifdef APP-PLUS
					this.openResourceFile();
					// #endif
					
					// #ifndef APP-PLUS
					this.chooseImg();//非app，使用传统打开
					// #endif
					
					//this.chooseImg();
				} else {
					this.chooseImg();
				}
			},
			onFileUpSuccess: function(res) {
				
				console.log('附件上传完成:' + JSON.stringify(res.data.resobj));
				
				var rdata = JSON.parse(res.data.resobj);
				
				if (!rdata.Result) {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: '上传失败，请重试'
					});
					return;
				}
				console.log('11');
				//上传成功
				this.$emit('uploaded', rdata.Data || {}); //推送上传成功的事件
				console.log('22');
				uni.hideLoading();
				console.log('33');
				this.getImgList();
			},
			openResourceFile: function() {
				this.$refs.lFile.upload({
					// #ifdef APP-PLUS
					currentWebview: this.$mp.page.$getAppWebview(), //非v3版本固定写法
					// #endif
					//非真实地址，记得更换
					url: this.$http.apiUrl + '/SFile/SaveFile',
					//默认file,上传文件的key，要和后台对应
					name: 'file',
					// header: {'Content-Type':'类型','Authorization':'token'},
					//...其他参数，这里不要写原始名称，后面自动拼接了
					formData: {
						Glid00: this.Zbid00,
						Scrid0: utils.getUserId(),
						UserName: utils.getTrueName(),
						Fjlx00: this.Fjlx00,
						Gxlx00: this.Gxlx00_
					}
				});
			},
			selectedCallback: function(file) {
				uni.hideLoading();
				if (!file) {
					return;
				}
				var flist = [];
				if (!file.startsWith("file://")) {
					file = "file://" + file;
				}
				flist.push(file);
				this.uploadFiles(flist);
			},
			chooseImg: function() {
				var num = maxNum - this.imgLists.length;
				uni.chooseImage({
					count: num,
					sizeType: ['compressed'],
					success: (res) => {
						if (this.imgLists.length >= maxNum) {
							this.btnImg = false;
						}
						this.uploadFiles(res.tempFilePaths);
					}
				});
			},
			uploadFiles(files) {
				if (!files || !files.length) {
					return;
				}
				files.forEach((obj) => {
					let ysmc = obj.substring(obj.lastIndexOf('/') + 1, obj.length);
					if (ysmc.length > 95) {
						ysmc = ysmc.substr(60, ysmc.length);
					}
					uni.showLoading({
						title: '上传中,请稍后'
					});
					uni.uploadFile({
						url: this.$http.apiUrl + '/SFile/SaveFile',
						filePath: obj,
						name: 'file',
						formData: {
							Zpysmc: ysmc,
							Glid00: this.Zbid00,
							Scrid0: utils.getUserId(),
							UserName: utils.getTrueName(),
							Fjlx00: this.Fjlx00,
							Gxlx00: this.Gxlx00_
						},
						success: (uploadFileRes) => {
							console.log(uploadFileRes);
							let rdata = JSON.parse(uploadFileRes.data);
							if (!rdata.Result) {
								uni.showModal({
									title: '提示',
									showCancel: false,
									content: '上传失败，请重试'
								});
								return;
							}

							//上传成功
							this.$emit('uploaded', rdata.Data || {}); //推送上传成功的事件
							uni.hideLoading();
							this.getImgList();
						},
						complete: () => {
							uni.hideLoading();
						}
					});

				});
			},
			removeImg: function(e) { //删除图片
				uni.showModal({
					title: '提示',
					content: '确定要删除吗',
					success: (res) => {
						if (res.confirm) {
							let that = this;
							let index = e.currentTarget.id.replace('grace-items-img-', '');

							//网络删除
							let id = e.currentTarget.dataset.id;
							this.$http.doRequest(this.$http.apiUrl + '/Sfile/DelFile', {
								Fjid00: id
							}).then((data) => {
								if (!data.Result) {
									uni.showModal({
										title: '提示',
										showCancel: false,
										content: '删除失败，请重试'
									});
									return;
								}
								//删除页面文件
								that.imgLists.splice(index, 1);
								if (that.imgLists.length < maxNum) {
									that.btnImg = true;
								}
							}).catch((data) => {
								console.log('发生异常:' + JSON.stringify(data));
							})

						} else if (res.cancel) {}
					}
				});
			},
			previewImage: function(item) { //预览图片
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
					// utils.openDocument({
					// 	filePath: item.url,
					// 	title: item.fname,
					// 	success: (res) => {}
					// });

					var supportFile = ".doc,.docx,.xls,.xlsx,.pdf,.ppt,.pptx,.txt,.zip,.csv,.wps";

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


		}
	}
</script>
<style scoped>
	.image-size {
		margin-top: -2upx;
		height: 156upx;
		padding: 5upx 0px;
	}

	.grace-add-btn-override {
		padding: 5upx 0;
		width: 160upx;
		height: 150upx;
	}

	@font-face {
		font-family: "gFont";
		src: url('https://at.alicdn.com/t/font_1350431_mx2yuzh35rh.ttf') format('truetype');
	}

	.grace-add-list {
		display: flex;
		flex-wrap: wrap;
	}

	.grace-add-list .add-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.grace-add-list .add-btn-text {
		font-size: 26rpx;
		line-height: 36rpx;
		text-align: center;
		color: #999999;
		width: 100%;
	}

	.grace-add-list .add-btn-add {
		font-size: 100rpx !important;
		height: 80rpx;
		line-height: 80rpx;
		margin-bottom: 20rpx;
		color: #999999;
	}

	.grace-add-list>.items {
		width: 220rpx;
		height: 220rpx;
		overflow: hidden;
		margin: 5px 0;
		background: #fafafa;
		font-size: 0;
		position: relative;
		border-radius: 10rpx;
		margin-right: 13rpx;
	}

	.grace-add-list>.items image {
		width: 220rpx;
	}

	.grace-add-list>.items .remove {
		font-family: "gFont";
		width: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 40rpx;
		position: absolute;
		z-index: 1;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		color: #FFFFFF;
	}

	.grace-add-list>.items .remove:after {
		content: "\e600";
	}


	.grace-add-list .items .grace-filename {
		font-family: "grace-iconfont" !important;
		width: 100%;
		position: absolute;
		z-index: 1;
		left: 0upx;
		top: 20upx;
		font-size: 25upx;
		color: #FFFFFF;
		background-color: #000000;
		opacity: 0.6;
	}


	.grace-shade-body {
		overflow: scroll;
		height: 100%;
		width: 100%;
		border-radius: 5rpx;
		background: #FFFFFF;
		position: absolute;
		top: calc(var(--status-bar-height) + 55%);
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 99;
		margin-bottom: 150upx;
	}

	.grace-shade-bottomMenu {
		position: fixed;
		bottom: 0;
		background: #1d96f0;
		width: 100%;
		height: 110rpx;
		display: flex;
		flex-direction: row;
		padding: 0;
		z-index: 99;
	}

	.grace-shade-bottomMenu-item {
		flex: 1;
		text-align: center;
		color: #fff;
	}

	.icon-size {
		color: #fff;
	}
</style>
