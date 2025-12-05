<template>
	<view>
		<uni-nav-bar title="会议议题详情"></uni-nav-bar>
		<view class="grace-padding" v-if="!graceFullLoading">
			<view class="form-header">
				<view class="grace-boxes">
					<view class="grace-boxes-img">
						<text style='color:#FFFFFF;font-size:45upx;height: 1.8em;padding:2em;'></text>
					</view>
					<view class="grace-boxes-text"></view>
				</view>
			</view>
			<view class="grace-form" style="background-color: #FFFFFF;">
				<form @submit="formSubmit" style="padding-bottom: 100upx;">
					<view class="grace-items grace-noborder">
						<view class="grace-label">议题名称</view>
						<input type="text" v-model="modelObj.Ytbt00"></input>
					</view>
					<view class="grace-items grace-noborder">
						<view class="grace-label">单位科室</view>
						<input type="text" v-model="modelObj.Dwmc00"></input>
					</view>
					<view class="grace-items grace-noborder">
						<view class="grace-label">上报人</view>
						<input type="text" v-model="modelObj.Hbr000"></input>
					</view>
					<view class="grace-items grace-noborder">
						<view class="grace-label">上报状态</view>
						<input type="text" v-model="modelObj.Hyztmc"></input>
					</view>
					<fold-item title="参加人员" :show="true">
						<view style="margin-top:15px;" class="grace-items grace-noborder" >
							<textarea :maxlength="-1" placeholder="参加人员" class="full-row-textarea" :disabled="true"
								v-model="extendObj.Rynames"></textarea>
						</view> 
					</fold-item>
					<fold-item title="附件" :show="true">
						<!-- 有关联ID就不需要附件类型了 -->
						<file-list :Zbid00="hyid" :op-type="0" Fjlx00="" ></file-list>
					</fold-item>
					<fold-item title="备注" :show="true">
						<view style="margin-top:15px;" class="grace-items grace-noborder" >
							<textarea :maxlength="-1" placeholder="备注" class="full-row-textarea" :disabled="true"
								v-model="modelObj.Bz0000"></textarea>
						</view> 
					</fold-item>
				</form>
			</view>
		</view>
		
		<graceFullLoading :graceFullLoading="graceFullLoading"></graceFullLoading>
		<graceAlert :show="topMsg.show" :msg="topMsg.msg" :msgtype="topMsg.msgtype"></graceAlert>
		<qucikReply :bannerShow="bannerShow" @qrChoosed="qrChoosed" @closed="bannerShow=false"></qucikReply>
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
				hyid: '',
				ytid: '',
				flag: '', 
				canOptFile: false,
				Flowid: '', //流程id
				Sybinfo: {}, //上一步信息
				FlowBh: 'Gw', //流程编号
				Lcbzbh: '', //流程步骤编号	
				Ldps00: '', //领导处理意见
				Cbjg00: '', //承办结果
				Nbyj00: '', //拟办意见
				XybClrids: '', //下一步处理人
				Clrmcs: '', //下一步处理人名称
				btnList: [], //下一步骤按钮列表
				fileOpType: 0,
				modelObj: { //表单信息
				
				},
				extendObj: {
					Rynames: ''
				},
				view: {
					padding: false,
					update: false
				},
				myOptionFlag: false,
				graceFullLoading: true,
				bannerShow: false,
				rule: [{ //表单检查规则
					"name": "Wjbt00",
					"checkType": "notnull",
					"checkRule": "",
					"errorMsg": "请填写标题"
				}],
				topMsg: {
					show: false,
					msg: '消息',
					msgtype: 'error'
				},
				needChoose:true
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
			flow.comm_Init(this);//初始化了流程通用类，重要，一定要加
			let that = this;
			this.graceFullLoading = false;
			this.flag = e.flag;
			this.hyid = e.hyid;
			this.ytid = e.ytid;
			let promiseAll = []; //需要执行的所有请求集合
			this.getGw()
			
			this.fileOpType = 1;

		},
		onshow: function() {

		},
		methods: {
			getGw: function(id) { //获取公文表单的数据
				return this.$http.doRequest(this.$http.apiUrl + '/Yiti/MyHuiyiDetail', {
					id: this.hyid
				}).then((data) => { 
					if (data.Result) {
						let cid = this.modelObj.id;
						data.Data = data.Data || {};
						
						if (data.Data.Hyzt00 === 0) {
							data.Data.Hyztmc = "执行中";
						}
						else if(data.Data.Hyzt00 === 1) {
							data.Data.Hyztmc = "已上报";
						}
						else {
							data.Data.Hyztmc = "";
						}
						
						this.modelObj = data.Data;
						utils.processModelProperty(this.modelObj);
						
						let ytrys = data.Data.Yhrys || [];
						let rys = "";
						for(let item in ytrys) {
							rys += (ytrys[item] + ",");
						}
						this.extendObj.Rynames = rys.replace(/,$/gim, "");
						
					}
				}).catch((data) => {
					console.log('获取公文发生异常');
				})
			},
			chooseUser: function(buttonObj) { //选择处理用户
				uni.navigateTo({
					url: '../sys/userSelect?eventName=choose_user_yitiDetail'
				});
			},
			save: function() {
				let params = Object.assign(this.modelObj, {});
				this.$http.doRequest(this.$http.apiUrl + '/Yiti/Save', params).then((data) => { 
					uni.showModal({
						title:'提示',
						content:data.Msg,
						showCancel:false
					});
					if (data.Result) {
						this.fireReload();
						uni.navigateBack({
							delta: 1
						});
					}
				}).catch((data) => {
					console.log('获取公文发生异常');
				});
			},
			fireReload: function() {
				this.EventBus.fire("reload_yiti_list");
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
	
	.grace-form input {
		font-size: 28upx !important;
	}
</style>
