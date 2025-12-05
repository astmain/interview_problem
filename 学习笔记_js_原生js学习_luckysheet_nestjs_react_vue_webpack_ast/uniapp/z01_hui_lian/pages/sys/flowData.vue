<template>
	<view> 
		<uni-nav-bar title="流程查看"></uni-nav-bar>
		<view class="grace-timeline" style="margin-top:30upx;">
			<view class="rows" v-for="(item,index) in listData" :key="index">
				<view class="grace-timeline-time">
					<view>{{item.Cjrq00}}</view>
					<view @tap="processX" v-if="item.Sfcl00 != 1" :data-item="item" style="color:red;">{{item.Cjsj00}}</view>
					<view @tap="processX" v-else :data-item="item">{{item.Cjsj00}}</view>
				</view>
				<view class="grace-timeline-tips">
					<view class="grace-timeline-circular">
						<text class="grace-icons icon-time"></text>
					</view>
				</view>
				<view class="grace-timeline-content">
					<view class="grace-h5 grace-blod" @tap="callHim(item)">
						{{item.Clrmc0}}
						<text class='iconfont icon-tel' style='color:#fff;font-size: 28rpx;float: right;'></text>
					</view>
					<view class="grace-text">{{item.Clyj00}}</view>
					<view class="grace-text flow-content-voice" :class="record.playMsgid == item.Lcid00?'playvoice':''" v-if="item.Clyjyy"  @tap="playVoice(item)" >
						<view class="grace-text">【语音】</view>
						<view class="icon other-voice grace-text"  style="line-height:35rpx;height: 35rpx;font-size: 30rpx;color: white;"></view>
					</view>
					<view v-if="item.Sybid0 != null" 
						class="grace-text">{{'上一步：' + item.Fqr000 + '&nbsp;&nbsp;' + item.Fqsj00}}</view>
				</view>
				<view class="grace-timeline-line" v-if="index<listData.length-1"></view>
			</view>

		</view>
	</view>
</template>
<script>
	import cacheUtis from '../../common/cache-utils.js'
	import uniNavBar from "@/components/uni-nav-bar.vue";
	
	export default {
		data() {
			return {
				pageInfo: {
					pageIndex: 1,
					pageSize: 100
				},
				listData:[],
				record:{
					playMsgid:''
				},
				AUDIO: uni.createInnerAudioContext(), //语音播放器
			}
		},
		onLoad(e) {
			this.getFlowData(e.Zbid00);
			
			this.AUDIO.onEnded((res)=>{
				this.record.playMsgid='';
			});
		},
		onshow: function() {
			
		},
		components: {
			uniNavBar
		},
		methods: {
			playVoice(e) {
				console.log(e)
				this.record.playMsgid = e.Lcid00;
				this.AUDIO.src = this.$http.baseUrl + '/file/gongwen/'+e.Clyjyy;
				this.$nextTick(function() {
					this.AUDIO.play();
				});
			},
			getFlowData: function(Zbid00) {
				let param = Object.assign(this.pageInfo, {
					"Zbid00": Zbid00
				});
				uni.showLoading({
					title: '正在加载...'
				}); 
				this.$http.doRequest(this.$http.apiUrl + '/Sw/QueryFlowData', param).then((data) => {
					if(data.Result && data.Data){
						data.Data.forEach((e) => {
							let cjrq00 = '';
							let cjsj00 = '';
							if(e.Sfcl00 != 1) {
								if(e.Sfqs00 != 1) {
									//未处理未签收
									cjrq00 = '未签收';
									cjsj00 = '催办';
								}
								else {
									//未处理已签收
									cjrq00 = '已签收';
									cjsj00 = '催办';
								}
							}
							else {
								cjrq00 = e.Clsj00.substring(0,10);
								cjsj00 = e.Clsj00.substring(11,16);
							}
							 
							e.Clyj00 = e.Clyj00 == null ? '' : e.Clyj00;
							this.listData.push({
								Clrmc0: e.Clrmc0,
								Clyj00: e.Clyj00,
								Cjrq00: cjrq00,
								Cjsj00: cjsj00,
								Sfcl00: e.Sfcl00,
								Sfqs00: e.Sfqs00,
								Lcid00: e.Id0000,
								Fqr000: e.Cjr000,
								Fqsj00: e.Cjsj00,
								Clrid0: e.Clrid0,
								Sybid0: e.Sybid0,
								Clyjyy:e.Clyjyy
							});
						});
					}
				}).catch((data) => {
					console.log('获取流程数据发生异常')
				})
				.finally(() => {
					uni.hideLoading();
				});
			},
			processX : function(e) {
				var that = this;
				let item = e.mp.target.dataset.item;
				if(item.Sfcl00 == 1) { return; }
				//未处理，催办
				uni.showActionSheet({
					itemList: ['催办','取消'], 
					success: function (res) { 
						if(res.tapIndex === 0) {
							that.$http.doRequest(that.$http.apiUrl + '/Sw/CuiBan', {
								flowid : item.Lcid00
							}).then((data) => {
								if(data.Result){
									uni.showModal({  
										title: '提示', 
										showCancel: false,
										content: data.Msg
									});
								}
							}).catch((data) => {
								console.log('获取流程数据发生异常')
							})
							.finally(() => {
								uni.hideLoading();
							});
						}
						else if(res.tapIndex === 1) {
							 
						}
						else {
							throw new Error("按钮事件未定义：" + res.tapIndex);
						}
					}
				});
			},
			callHim: function(him) {
				let himId = him.Clrid0;
				if(himId == null) { return; }
				uni.showModal({
					title: '提示',
					content: '要拨打 ' + him.Clrmc0 + ' 的号码吗',
					success: function (res) {
						cacheUtis
							.getUserInfoById(himId)
							.then((user) => {
								if (!res.confirm || !user) { return; }
								console.log("拨打：" + user.Dhhm00);
								uni.makePhoneCall({
									phoneNumber: user.Dhhm00
								})
							});
					}
				});
			}
		}
	}
</script>
<style>
	/* 页面个性化样式 */
	.grace-h5 {
		line-height: 1.6em;
		color: #FFFFFF;
	}

	.grace-text {
		line-height: 1.5em;
		font-size: 22rpx;
		color: #FFFFFF;
	}
	.no-detail {
		color:red;
	}
	
.grace-timeline{width:100%;}
.grace-timeline .rows{padding:20upx; display:flex; flex-wrap:nowrap; justify-content:space-between; position:relative;}
.grace-timeline-time{width:130upx; flex-shrink:0; overflow:hidden;}
.grace-timeline-time view{font-size:22upx; color:#ccc; text-align:right; overflow:hidden; line-height:1.5em;}
.grace-timeline-time view:last-child{font-size:32upx; color:#46A4DA;}
.grace-timeline-tips{width:70upx; height:100%; margin:0 15upx; flex-shrink:0; position:relative;}
.grace-timeline-circular{width:50upx; height:50upx; border:10upx solid #AFDCF8; border-radius:100%; line-height:50upx; text-align:center; background:#46A4DA; color:#FFF; position:absolute; left:0; top:0; z-index:2}
.grace-timeline-circular image{border-radius:100%; font-size:0; width:100%;}
.grace-timeline-content{width:100%; background:#46A4DA; color:#FFF; padding:18upx; border-radius:12upx;}
.grace-timeline-line{width:8upx; height:100%; background:#AFDCF8; position:absolute; z-index:1; left:195upx; top:30upx;}

</style>

<style lang="scss">
	@import "@/static/tim.scss";
</style>
