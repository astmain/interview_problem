<template>
	<view>
		<uni-nav-bar title="稿件查看"></uni-nav-bar>
		<view class="grace-padding" v-if="!graceFullLoading">
			<view class="form-header">
				<view class="grace-boxes" @tap="viewFlowData()">
					<view class="grace-boxes-img">
						<text class='iconfont icon-set' style='color:#FFFFFF;font-size: 45upx;line-height: 1.8em;'></text>
					</view>
					<view class="grace-boxes-text">查看流程</view>
				</view>
			</view>
			<view class="grace-form" style="background-color: #FFFFFF;">
				<form @submit="formSubmit">
					<view class="grace-items grace-noborder"> 
						<view class="grace-label">标题</view>
						<input type="text" :value="modelObj.Wjbt00"></input>
					</view>
					<view class="grace-items grace-noborder">
						<view class="grace-label">文号</view>
						<input type="text" :value="modelObj.Wh0000"></input>
					</view>
					<view class="grace-items grace-noborder">
						<view class="grace-label">类别</view>
						<input type="text" :value="modelObj.Lb0000"></input>
					</view>
					<view class="grace-items grace-noborder">
						<view class="grace-label">拟稿人</view>
						<input type="text" :value="modelObj.Ngr000"></input>
					</view>
					<view class="grace-items grace-noborder">
						<view class="grace-label">印发日期</view>
						<datetime v-model="modelObj.Yfrq00" :withTime="false"></datetime>
					</view>
					
					<fold-item title="文件信息" :show="true">
						<!-- 有关联ID就不需要附件类型了 -->
						<file-list :Zbid00="Zbid00" :op-type="fileOpType" @uploaded="fileUploaded" Fjlx00="Zzgj" ></file-list>
					</fold-item>
				</form>
			</view>
		</view>
		<graceFullLoading :graceFullLoading="graceFullLoading"></graceFullLoading>
		<graceAlert :show="topMsg.show" :msg="topMsg.msg" :msgtype="topMsg.msgtype"></graceAlert>
		<view class="normal-view" style="display: flex;flex-direction: row;">
			<button v-if="Flag == 'dispose'" @tap="setQianshou()" class="btn-primary" style="flex: 1;">签收</button>
		</view>
	</view>
</template>
<script>
	import graceChecker from '../../graceUI/graceChecker.js';
	import graceFullLoading from '../../graceUI/components/graceFullLoading.vue'
	import graceAlert from '../../graceUI/components/graceAlert.vue';
	import uniNavBar from "@/components/uni-nav-bar.vue";
	import utils from '../../common/utils.js'
	import mpCodeSelector from '../../components/mp-code-selector.vue';
	import staticSelector from '../../components/static-selector.vue';
	import qucikReply from '../../components/qucik-reply.vue';
	import fileList from '../../components/file-list.vue';
	import datetime from '../../components/datetime.vue';
	import foldItem from '../../components/fold-item.vue';
	import flow from '../../common/comm-flow.js';
	
	var maxNum = 9;
	var alertTimer = null;
	export default {
		data() {
			return {
				Flag: '', //处理类型 add dispose view
				Zbid00: '', //主表id
				Flowid: '', //流程id
				Sybinfo: {}, //上一步信息
				FlowBh: 'Zzgj', //流程编号
				Lcbzbh: '', //流程步骤编号	
				Ldps00: '', //领导处理意见
				Cbjg00: '', //承办结果
				Nbyj00: '', //拟办意见
				XybClrids: '', //下一步处理人
				Clrmcs: '', //下一步处理人名称
				btnList: [], //下一步骤按钮列表
				fileOpType: 0,
				modelObj: { //表单信息
					Wjbt00: '',
					Wh0000: '',
					Ngr000: '',
					Yfrq00: '',
					Lb0000: '',
				},
				otherData: {	//其他需要一起提交的数据写这里
					Xybclqx00: '',
					Clyj00: '',
				},
				myOptionFlag: false,
				graceFullLoading: true,
				bannerShow: false,
				rule: [],
				topMsg: {
					show: false,
					msg: '消息',
					msgtype: 'error'
				},
				SfdbArray:['否','是']
			}
		},
		components: {
			graceFullLoading,
			graceAlert,
			mpCodeSelector,
			fileList,
			qucikReply,
			datetime,
			foldItem,
			staticSelector,
			uniNavBar
		},
		onLoad(e) {
			
			let userInfo = uni.getStorageSync("userinfo");
			let canViewAll = false;
			if(userInfo && userInfo.Jsid00) { 
				canViewAll = userInfo.Jsid00.indexOf(',13,') > -1; 
			} 
			
			let that = this;
		
			this.graceFullLoading = false;
			this.Flag = e.Flag;
			let promiseAll = []; //需要执行的所有请求集合

			if (this.Flag == 'add') {
				this.fileOpType = 1;
				this.myOptionFlag = true;
				this.Zbid00 = utils.newGuid();
			} else if (this.Flag == 'dispose') {
				this.Zbid00 = e.Zbid00;
				this.fileOpType = 0;
				this.Flowid = e.Flowid;
				this.myOptionFlag = false;
				promiseAll.push(this.getFw(e.Zbid00));
			} else if (this.Flag == 'view') {
				this.fileOpType = 0;
				this.Zbid00 = e.Zbid00;
				this.myOptionFlag = false;
				promiseAll.push(this.getFw(e.Zbid00));
			}

			if (this.Flag !== "add" && this.Flag !== "dispose") {
				return;
			}

		},
		onshow: function() {

		},
		methods: {
			fileUploaded: function(data) {
				if(this.Flag == 'add' && !this.modelObj.Wjbt00) {
					let fileName = data.Fjysmc;
					let dotIndex = fileName.lastIndexOf(".");
					fileName = dotIndex > 0 ? fileName.substr(0, dotIndex) : fileName;
					this.modelObj.Wjbt00 = fileName;
				}
			},
			getFw: function(Zbid00) { //获取公文表单的数据
				return this.$http.doRequest(this.$http.apiUrl + '/Fw/GetZzgjData', {
					Zbid00: Zbid00
				}).then((data) => { 
					if (data.Result) {
						data.Data = data.Data || {};
						this.modelObj = data.Data;
						utils.processModelProperty(this.modelObj, {});
					}
				}).catch((data) => {
					console.log('获取公文发生异常');
				})
			},
			viewFlowData: function() { //查看流程
				uni.navigateTo({
					url: '../sys/flowData?Zbid00=' + this.Zbid00
				})
			},
			sfdbChange:function(e) {
				this.modelObj.Sfdb00 = e.target.value;
			},
			setQianshou: function() {
				this.$http.doRequest(this.$http.apiUrl + '/Fw/zzgjQianShou', {
					userid: utils.getUserId(),
					Flowid: this.Flowid
				}).then((data) => {
					uni.showModal({
						title: '提示',
						content: data.Msg,
						showCancel: false,
						success: () => {
							if(data.Result) {
								this.EventBus.fire('reloadFwList', {}); //通知刷新列表页面
								this.EventBus.fire("refreshBadge"); //刷新待办数量
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									});
								}, 200);
							}
						}
					});
				});
			}
			
		}
	}
</script>
<style>
	page {
		background-color: #F2F2F2;
	}

	.ldps {
		margin-top: -26rpx;
	}
</style>
