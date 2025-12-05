<template>
	<view>
		<uni-nav-bar title="会议信息"></uni-nav-bar>
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
				<form @submit="formSubmit">
					<view class="grace-items"> 
						<view class="grace-label">议题</view>
						<input type="text" name="Wjbt00" v-model="modelObj.Yt0000"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">会议类型</view>
						<mp-code-selector code-type="会议类型" text-field="Codenote" value-type="text" 
								v-model="modelObj.Hylx00"></mp-code-selector>
					</view>
					<view class="grace-items">
						<view class="grace-label">汇报人</view>
						<input type="text" name="Hbr000" v-model="modelObj.Hbr000"></input>
					</view>
					<view class="grace-items grace-noborder" v-if="view.arrange">
						<view class="grace-label">会议时间</view>
						<datetime v-model="modelObj.Hysj00"></datetime>
					</view>
					<fold-item title="与会人员" :show="true">
						<view style="margin-top:15px;" class="grace-items grace-noborder" >
							<textarea :maxlength="-1" placeholder="接收人" class="full-row-textarea" :disabled="true"
								v-model="extendObj.Rynames"></textarea> 
							<view class='iconfont icon-xiaoxi form-choose-btn' @tap="chooseUser"></view>
						</view> 
					</fold-item>
					
					<fold-item title="会议材料" :show="true">
						<!-- 有关联ID就不需要附件类型了 -->
						<file-list :Zbid00="id" :opType="fileOpType" Gxlx00="cailiao" Fjlx00="YTHY"></file-list>
					</fold-item>
					<fold-item title="议题表" :show="true">
						<!-- 有关联ID就不需要附件类型了 -->
						<file-list :Zbid00="id" :opType="fileOpType" Gxlx00="yitibiao" Fjlx00="YTHY"></file-list>
					</fold-item>
					
					
					<view class="normal-view" v-if="view.post" 
							style="display: flex;flex-direction: row;">
						<button @tap="submit_data()" class="btn-primary" style="flex: 1;">上报</button>
					</view>
					<view class="normal-view" v-if="view.arrangeOpt"
							style="display: flex;flex-direction: row;">
						<button @tap="arrangeTime0()" class="btn-primary" style="flex: 1;">保存时间</button>
					</view>
					<view class="normal-view" v-if="view.arrangeOpt"
							style="display: flex;flex-direction: row;">
						<button @tap="arrangeTime1()" class="btn-primary" style="flex: 1;">保存时间并通知</button>
					</view>
					
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
				flag: '', 
				id: '', //主表id
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
					Yt0000: '',
					Hylx00: '',
					Hbr000: '',
					Hysj00: ''
				},
				extendObj: {
					Rynames: '',
					Ryids: ''
				},
				view: {
					post: false,
					arrangeOpt: false,
					arrange: false,
					arrangeOpt: false,
					file: false
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
			this.id = e.id;
			let promiseAll = []; //需要执行的所有请求集合

			if (this.flag === "post") {
				//上报视图
				this.view.post = true;
				this.view.arrangeOpt = false;
				this.fileOpType = 1;
			}
			else if (this.flag === "postView") {
				//上报后未安排的视图
				this.view.post = false;
				this.view.arrangeOpt = false;
				this.fileOpType = 0;
			}
			else if (this.flag === "arrangeView") {
				//负责人未上报的管理视图
				this.view.post = false;
				this.fileOpType = 1;
				this.view.arrangeOpt = false;
			}
			else if (this.flag === "arrange") {
				//负责人上报后的管理视图
				this.view.post = false;
				this.fileOpType = 1;
				this.view.arrange = true;
				this.view.arrangeOpt = true; 
			}
			else if (this.flag === "fullView") {
				//安排后的视图
				this.view.post = false;
				this.view.arrangeOpt = false;
				this.view.arrange = true;
				this.view.arrangeOpt = false;
			}
			this.getGw(e.id)

			//注册回调事件，并且主动提交
			this.EventBus.register("choose_user_huiyiDetail", (param) => {
				this.extendObj.Ryids = param.userIds;
				this.extendObj.Rynames = param.userNames;
			});

		},
		onshow: function() {

		},
		methods: {
			getGw: function(id) { //获取公文表单的数据
				return this.$http.doRequest(this.$http.apiUrl + '/Huiyi/Details', {
					id: id
				}).then((data) => { 
					if (data.Result) {
						data.Data = data.Data || {};
						this.modelObj = data.Data;
						var yhrys = data.Data.Yhrys;
						if (!yhrys) { return; }
						var ids = '';
						var rys = '';
						for (var id in yhrys) {
							ids += (id + ',');
							rys += (yhrys[id] + ',');
						}
						this.extendObj.Ryids = ids.substr(0, ids.length - 1);
						this.extendObj.Rynames = rys.substr(0, ids.length - 1);
						utils.processModelProperty(this.modelObj);
					}
				}).catch((data) => {
					console.log('获取公文发生异常');
				})
			},
			chooseUser: function(buttonObj) { //选择处理用户
				uni.navigateTo({
					url: '../sys/userSelect?eventName=choose_user_huiyiDetail'
				});
			},
			submit_data:function() {
				//上报
				let params = Object.assign(this.modelObj, {
					id: this.id,
					ryids: this.extendObj.Ryids
				});
				this.$http.doRequest(this.$http.apiUrl + '/Huiyi/Post', params).then((data) => { 
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
			arrangeTime0: function() {
				//保存时间
				this.arrange(0);
			},
			arrangeTime1: function() {
				//保存时间并通知
				this.arrange(1);
			},
			arrange:function(send) {
				let params = {
					id: this.id,
					send: send,
					time: this.modelObj.Hysj00
				}
				this.$http.doRequest(this.$http.apiUrl + '/Huiyi/ArrangeTime', params).then((data) => { 
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
				this.EventBus.fire("reload_huiyi_list");
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
