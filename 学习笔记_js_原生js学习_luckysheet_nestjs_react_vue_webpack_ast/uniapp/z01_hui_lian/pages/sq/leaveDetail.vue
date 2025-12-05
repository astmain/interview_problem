<template>
	<view>
		<uni-nav-bar title="请假申请"></uni-nav-bar>
		<view class="grace-padding">
			<view class="form-header">
				<view class="grace-boxes" @tap="viewFlowData()">
					<view class="grace-boxes-img">
						<text class='iconfont icon-set' style='color:#FFFFFF;font-size: 45upx;line-height: 1.8em;'></text>
					</view>
					<view class="grace-boxes-text">查看流程</view>
				</view>
			</view>

			<view class="grace-form" style="background-color: #FFFFFF;">
				<form >
					<fold-item title="基础信息" :show="baseInfoFlag">
						<view class="grace-items grace-noborder">
							<view class="form-label">
								<view class="grace-label">申请标题</view>
								<view class="required-red">*</view>
							</view>
							<textarea :maxlength="-1" :auto-height="true" placeholder="申请标题" v-model="modelObj.Sqbt00"></textarea>
							<input type="text" name="Id0000" v-model="modelObj.Id0000" v-show="1!=1" />
						</view>

						<view class="grace-items">
							<view class="form-label">
								<view class="grace-label">姓名</view>
								<view class="required-red">*</view>
							</view>
							<input type="text" name="Sqztmc" placeholder="姓名" v-model="modelObj.Sqztmc"></input>
						</view>

						<view class="grace-items">
							<view class="form-label">
								<view class="grace-label">假别</view>
								<view class="required-red">*</view>
							</view>
							<mp-code-selector code-type="请假类型" text-field="Codenote" value-type="value" value-field="Codevalue" v-model="modelObj.Sqglid" @input="leaveChoose"></mp-code-selector>
						</view>
 
						<view class="grace-items">
							<view class="grace-label">开始时间</view>
							<picker @change="startDateChange1" :value="modelObj.Kssj00" mode="date" start="1991-01-01" end="2029-01-01"
								style="width:100%;text-align:right;padding:0;margin:0;" >
								<view>{{ modelObj.Kssj00 ? modelObj.Kssj00 : '请选择'}}</view>
							</picker>
							<picker @change="startDateChange2" :range="af" style="width:75px;padding:0px 10px;">
								<view class="uni-input">{{ modelObj.Sqnr50 ? modelObj.Sqnr50 : '' }}</view>
							</picker>
						</view>
						
						<view class="grace-items">
							<view class="grace-label">结束时间</view>
							<picker @change="endDateChange1" :value="modelObj.Jssj00" mode="date" start="1991-01-01" end="2029-01-01"
								style="width:100%;text-align:right;padding:0;margin:0;" >
								<view>{{ modelObj.Jssj00 ? modelObj.Jssj00 : '请选择'}}</view>
							</picker>
							<picker @change="endDateChange2" :range="af" style="width:75px;padding:0px 10px;">
								<view class="uni-input">{{ modelObj.Sqnr60 ? modelObj.Sqnr60 : '' }}</view>
							</picker>
						</view>
						<view class="grace-items">
							<view class="grace-label">请假天数</view>
							<input type="text" name="Sqnr90" placeholder="请假共计天数" v-model="modelObj.Sqnr90"></input>
						</view>


						<view class="grace-items">
							<view class="grace-label">值电话班</view>
							<input type="text" name="Sqnr30" placeholder="值电话班日期" v-model="modelObj.Sqnr30"></input>
						</view>


						<view class="grace-items">
							<view class="grace-label">换班人</view>
							<input type="text" name="Sqnr40" placeholder="换班人" v-model="modelObj.Sqnr40"></input>
						</view>

						<view class="grace-items grace-noborder">
							<view class="form-label">
								<view class="grace-label">请假事由</view>
								<view class="required-red">*</view>
							</view>
							<textarea :maxlength="-1" :auto-height="true" placeholder="请假事由...." v-model="modelObj.Sqnr10" name="Sqnr10"></textarea>
						</view>
					</fold-item>

					<fold-item title="处理意见" :show="true">
						<view class="grace-items grace-noborder">
							<view class="grace-label">分管领导</view>
							<textarea :maxlength="-1" :auto-height="true" disabled v-model="clyjObj.Fgldyj" name="Fgldyj"></textarea>
						</view>
						<view class="grace-items grace-noborder">
							<view class="grace-label">主要领导</view>
							<textarea :maxlength="-1" :auto-height="true" disabled v-model="clyjObj.Zyldyj" name="Zyldyj"></textarea>
						</view>
					</fold-item>

					<fold-item title="附件信息" :show="true">
						<file-list :Zbid00="Zbid00" :Fjlx00="Fjlx00" :op-type="fileOpType">
						</file-list>
					</fold-item>

					<view class="grace-items grace-noborder" v-if="myOptionFlag">
						<textarea :maxlength="-1" placeholder="我的处理意见" class="full-row-textarea" name="Clyj00" v-model="modelObj.Clyj00"></textarea>
						<view class='iconfont icon-xiaoxi form-choose-btn' @tap="bannerShow=true"></view>
					</view>
					<view class="grace-items" v-if="myOptionFlag" style="display: none;">
						<view class="grace-label">处理期限</view>
						<datetime v-model="otherData.Xybclqx00"></datetime>
					</view>

					<view class="normal-view" style="display: flex;flex-direction: row;" v-for="(item,index) in btnList" :key="index"
					 v-if="myOptionFlag">
						<button @tap="v_comm_Dispose(item)" v-bind:data-optype="item.ButtonID" class="btn-primary" style="flex: 1;z-index: 999999;">{{item.ButtonName}}</button>
					</view>

				</form>
			</view>
		</view>
		<graceAlert :show="topMsg.show" :msg="topMsg.msg" :msgtype="topMsg.msgtype"></graceAlert>
		<qucikReply :bannerShow="bannerShow" @qrChoosed="qrChoosed" @closed="bannerShow=false"></qucikReply>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages"></HMmessages>
	</view>
</template>
<script>
	import graceChecker from '../../graceUI/graceChecker.js';
	import graceAlert from '../../graceUI/components/graceAlert.vue';
	import utils from '../../common/utils.js'
	import fileList from '../../components/file-list.vue';
	import qucikReply from '../../components/qucik-reply.vue';
	import mpCodeSelector from '../../components/mp-code-selector.vue';
	import datetime from '../../components/datetime.vue';
	import foldItem from '../../components/fold-item.vue';
	import flow from '../../common/comm-flow.js'
	import uniNavBar from "@/components/uni-nav-bar.vue";
	import HMmessages from "@/components/HM-messages.vue"

	export default {
		data() {
			return {
				Flag: 'add', //处理类型 add/dispose/view
				Zbid00: '', //主表id
				Flowid: '', //流程id
				FlowBh: 'Qj', //流程编号，请假申请
				Lcbzbh: 'Qj1', //流程步骤编号	
				btnList: [], //下一步骤按钮列表
				modelObj: { //表单信息
					Id0000: '',
					Sqbt00: utils.getDate() + " " + utils.getTrueName() + "请假申请",
					Sqztmc: utils.getTrueName(),
					Sqnr: '',
					Blqx00: "请选择",
					Kssj00: utils.getDate(),
					Jssj00: utils.getDate(),
					Sqnr50: '全天',
					Sqnr60: '全天'
				},
				af: [
					'全天',
					'上午',
					'下午'
				],
				otherData: { //其他需要一起提交的数据写这里
					Sqlx00: '请假',
					Xybclqx00: '', //处理期限
				},
				clyjObj: { //展示领导的处理意见
					Dzbyj: '',
					Zyldyj: '',
					Fgldyj: '',
					Nbyj: ''
				},
				fileOpType: 1, //是否允许操作附件
				myOptionFlag: true, //显示流程操作按钮等
				baseInfoFlag: true, //基础信息展示
				bannerShow: false, //快速回复
				Fjlx00: 'SQ', //附件类型
				rule: [{ //表单检查规则
						"name": "Sqbt00",
						"checkType": "notnull",
						"checkRule": "",
						"errorMsg": "请填写标题"
					},
					{ //姓名
						"name": "Sqztmc",
						"checkType": "notnull",
						"checkRule": "",
						"errorMsg": "请填姓名"
					},
					{ //假别
						"name": "Sqglid",
						"checkType": "notnull",
						"checkRule": "",
						"errorMsg": "请选择假别"
					},
					{ //申请内容
						"name": "Sqnr10",
						"checkType": "notnull",
						"checkRule": "",
						"errorMsg": "请填写请假事由"
					},
					{ //开始时间
						"name": "Kssj00",
						"checkType": "notnull",
						"checkRule": "",
						"errorMsg": "请填写请假时间"
					},
					{ //结束时间
						"name": "Jssj00",
						"checkType": "notnull",
						"checkRule": "",
						"errorMsg": "请填写结束时间"
					},
					{
						"name": "Sqnr90",
						"checkType": "notnull",
						"checkRule": "",
						"errorMsg": "请填写天数"
					},
					{
						"name": "Sqnr90",
						"checkType": "reg",
						"checkRule": "^\\d+(\\.\\d+)?$",
						"errorMsg": "天数只能是数值"
					},
				],
				topMsg: {
					show: false,
					msg: '消息',
					msgtype: 'error'
				}
			}
		},
		components: {
			graceAlert,
			fileList,
			qucikReply,
			mpCodeSelector,
			datetime,
			foldItem,
			uniNavBar,
			HMmessages
		},
		onLoad(e) {

			flow.comm_Init(this); //初始化了流程通用类，重要，一定要加

			this.Flag = e.Flag;
			let promiseAll = []; //需要执行的所有请求集合

			if (this.Flag == 'add') {
				this.Zbid00 = utils.newGuid();
				this.baseInfoFlag = true;
			} else if (this.Flag == 'dispose') {
				this.Zbid00 = e.Zbid00;
				this.Flowid = e.Flowid;
				promiseAll.push(flow.comm_GetFlowData());
				promiseAll.push(this.getSq(e.Zbid00));
				promiseAll.push(this.getSqClyj());
			} else if (this.Flag == 'view') {
				this.fileOpType = 0; //不允许文件上传
				this.myOptionFlag = false; //不显示流程操作按钮
				this.Zbid00 = e.Zbid00;
				promiseAll.push(this.getSq(e.Zbid00));
				promiseAll.push(this.getSqClyj());
			}
			uni.showLoading({
				title: '正在加载...'
			});
			Promise.all(promiseAll).then(() => {

				if (this.Flag != 'view')
					//加载步骤按钮
					flow.comm_GetFlowStep();

			}).catch((data) => {
				console.log('执行全部任务错误:' + data);
			})
			.finally(() => {
				uni.hideLoading();
			});

			//注册回调事件，并且主动提交
			this.EventBus.register("chooseNextUserAutoSb", (param) => {
				console.log('回调参数是：' + JSON.stringify(param));
				flow.setNextuser(param.userIds);
				flow.comm_Dispose_SubmitData();
			});

		},
		onshow: function() {

		},
		methods: {
			startDateChange1: function(e) {
				this.modelObj.Kssj00 = e.target.value;
			},
			endDateChange1: function(e) {
				this.modelObj.Jssj00 =  e.target.value;
			},
			startDateChange2: function(e) {
				this.modelObj.Sqnr50 =  this.af[e.target.value];
			},
			endDateChange2: function(e) {
				this.modelObj.Sqnr60 = this.af[e.target.value];
			},
			getLeaveSum:function(utype){
				return this.$http.doRequest(this.$http.apiUrl + '/Sq/QueryLeaveSum', {
					UserID: utils.getUserId(),
					leaveType:utype
				}).then((data) => {
					if (data.Result) {
						//this.modelObj = data.Data;
						let tipMsg = data.Value;
						this.modelObj.Sqnr20 = data.Value;
						this.HMmessages.show(tipMsg,{closeButton:true,closeButtonColor:"#3388ff",duration:0,icon:"help"})
					}
				}).catch((data) => {
					console.log('获取请假天数发生异常发生异常'+data);
				})
			},
			leaveChoose:function(value)
			{
				this.modelObj.Sqglid = value;
				this.getLeaveSum(value);
			},
			qrChoosed: function(value) { //选择了快捷回复
				this.modelObj.Clyj00 = value;
				this.bannerShow = false;
			},
			fireList: function() {
				this.EventBus.fire('reloadSqList', {}); //通知列表页刷新
				this.EventBus.fire('refreshTodoCount', {}); //通知待办列表刷新数量
			},
			v_comm_Dispose: function(buttonObj) {
				flow.comm_Dispose(buttonObj); //调用统一流程处理
			},
			getSq: function(Zbid00) { //获取公文详情
				return this.$http.doRequest(this.$http.apiUrl + '/Sq/SqData', {
					Zbid00: Zbid00
				}).then((data) => {
					if (data.Result) {
						this.modelObj = data.Data || {};
						this.modelObj.Kssj00 = this.modelObj.Kssj00.substr(0,10);
						this.modelObj.Jssj00 = this.modelObj.Jssj00.substr(0,10);
						this.HMmessages.show(this.modelObj.Sqnr20,{closeButton:true,closeButtonColor:"#3388ff",duration:0,icon:"help"})
					}
				}).catch((data) => {
					console.log('获取申请发生异常');
				})
			},
			getSqClyj: function() { //获取处理意见
				return this.$http.doRequest(this.$http.apiUrl + '/Sq/SqClyj', {
					Zbid00: this.Zbid00
				}).then((data) => {
					if (data.Result && data.Data) {
						this.clyjObj.Fgldyj = data.Data.Fgldyj == null ? '' : data.Data.Fgldyj;
						this.clyjObj.Zyldyj = data.Data.Zyldyj == null ? '' : data.Data.Zyldyj;
						this.clyjObj.Nbyj = data.Data.Nbyj == null ? '' : data.Data.Nbyj;
						this.clyjObj.Dzbyj = data.Data.Dzbyj == null ? '' : data.Data.Dzbyj;
					}
				}).catch((data) => {
					console.log('获取申请意见发生异常');
				})
			},
			chooseUserAutoSb: function(buttonObj) { //选择处理用户，并自动提交
				let search = '';
				if (buttonObj.OpUser) {
					search += ("&departmentIds=" + (buttonObj.OpUser.DepartmentIDs ? buttonObj.OpUser.DepartmentIDs : ''));
					search += ("&roleIds=" + (buttonObj.OpUser.Roles ? buttonObj.OpUser.Roles : ''));
					search += ("&userIds=" + (buttonObj.OpUser.UserIDs ? buttonObj.OpUser.UserIDs : ''));
				}
				uni.navigateTo({
					url: '../sys/userSelect?eventName=chooseNextUserAutoSb' + search
				});
			},
			viewFlowData: function() { //查看流程
				uni.navigateTo({
					url: '../sys/flowData?Zbid00=' + this.Zbid00
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #F2F2F2;
	}
</style>
