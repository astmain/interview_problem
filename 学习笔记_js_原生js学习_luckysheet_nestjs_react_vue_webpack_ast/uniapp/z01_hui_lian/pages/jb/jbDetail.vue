<template>
	<view>
		<uni-nav-bar title="审批处理"></uni-nav-bar>
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
				<form>
					<view class="grace-items"> 
						<view class="grace-label">标题</view>
						<view class="required-red">*</view>
						<input type="text" name="Jbbt00" placeholder="标题...." v-model="modelObj.Jbbt00"></input>
					</view>
					
					<view class="grace-items">
						<view class="grace-label">审批类别</view>
						<mp-code-selector code-type="本级类别" value-field="Codevalue" value-type="value" 
								v-model="modelObj.Jblx00"></mp-code-selector>
					</view> 
					<view class="grace-items grace-noborder">
						<view class="grace-label">承办单位</view>
						<input type="text" name="Cbdw00" placeholder="承办单位" v-model="modelObj.Cbdw00"></input>
					</view>
					<view class="grace-items grace-noborder">
						<view class="grace-label">经办人员</view>
						<input type="text" name="Jbry00" placeholder="经办人员" v-model="modelObj.Jbry00"></input>
					</view>
					
					<view class="grace-items grace-noborder">
						<view class="grace-label">事项内容</view>
						<textarea :maxlength="-1" :auto-height="true" placeholder="事项内容...." name="Jbnr00" v-model="modelObj.Jbnr00"></textarea>
					</view>
					
					<fold-item title="基础信息" :show="baseInfoFlag">
						<view class="grace-items grace-noborder" style="width: 98% !important;">
							<view class="grace-label">审批日期</view>
							<picker @change="dateChange3" :value="modelObj.Jbsj00" mode="date" start="1991-01-01"
								end="2029-01-01"
								style="width:100%;text-align:right;padding:0;margin:0;" >
								<view>{{ modelObj.Jbsj00 ? modelObj.Jbsj00 : '请选择'}}</view>
							</picker>
						</view>  
						<view class="grace-items">
							<view class="grace-label">是否急件</view>
							<mp-code-selector code-type="缓急程度" text-field="Codenote" value-type="text" 
									v-model="modelObj.Jjlx00"></mp-code-selector>
						</view>
						<view class="grace-items grace-noborder">
							<view class="grace-label">办理期限</view>
							<datetime v-model="modelObj.Blqx00"></datetime>
						</view>
						
					</fold-item>

					<fold-item title="处理意见" :show="true">
						<view class="grace-items grace-noborder">
							<view class="grace-label">科室单位</view>
							<textarea :maxlength="-1" :auto-height="true" disabled name="Fzryps" v-model="modelObj.Fzryps"></textarea>
						</view>

						<view class="grace-items grace-noborder">
							<view class="grace-label">分管领导</view>
							<textarea :maxlength="-1" :auto-height="true" disabled name="Fgldps" v-model="modelObj.Fgldps"></textarea>
						</view>

						<view class="grace-items grace-noborder">
							<view class="grace-label">主要领导</view>
							<textarea :maxlength="-1" :auto-height="true" disabled name="Zyldps" v-model="modelObj.Zyldps"></textarea>
						</view>
					</fold-item>
					<fold-item title="附件信息" :show="true">
							<file-list :Zbid00="Zbid00" Fjlx00="JB" :op-type="fileOpType" >
						</file-list>
					</fold-item>
					
					<!-- <view style="display: flex;flex-direction: row;" v-if="myOptionFlag">
						<view style="flex: 9;">
							<textarea :maxlength="-1" disabled placeholder="选择下一步处理人" name="Clrmcs" v-model="Clrmcs"></textarea>
						</view>
						<view style="flex: 1;">
							<text class='iconfont icon-dianhuaben-copy form-choose-btn' @tap="chooseUser()"></text>
						</view>
					</view> -->

					<!-- <view style="margin-top:15px;" class="grace-items grace-noborder" v-if="myOptionFlag">
						<textarea :maxlength="-1" placeholder="我的处理意见" name="Clyj00" class="full-row-textarea" v-model="otherData.Clyj00"></textarea>
						<view class='iconfont icon-xiaoxi form-choose-btn' @tap="bannerShow = true;"></view>
					</view> -->
					<view style="margin-top:15px;" class="grace-items grace-noborder" v-if="myOptionFlag">
						<textarea :maxlength="-1" placeholder="我的处理意见" name="Clyj00" class="full-row-textarea" v-model="otherData.Clyj00"></textarea>
						<view class='iconfont icon-xiaoxi form-choose-btn' @tap="bannerShow = true;"></view>
						<textarea :maxlength="-1" style="display: none;" name="Clrmcs" v-model="Clrmcs"></textarea>
					</view> 
					
					<!-- <view class="normal-view">
						<button @tap="formSubmit()" class="btn-primary" v-if="Flag=='add'">提交</button>
					</view>
					<view class="normal-view" style="display: flex;flex-direction: row;" v-if="Flag=='dispose'">
						<button @tap="formSubmit('huifu')"  data-optype="huifu" class="btn-primary" style="flex: 1;">回复</button>
						<button @tap="formSubmit('tijiao')" data-optype="tijiao" class="btn-primary" style="flex: 1;">提交</button>
						<button @tap="formSubmit('guidang')" data-optype="guidang" class="btn-primary" style="flex: 1;">结束</button>
					</view> -->
					<view class="normal-view" style="display: flex;flex-direction: row;" v-for="(item,index) in btnList" :key="index">
						<button @tap="v_comm_Dispose(item)" 
							v-bind:data-optype="item.ButtonID" class="btn-primary" style="flex: 1;z-index: 999999;">{{item.ButtonName}}</button>
					</view> 
				</form>
			</view> 
		</view>
		<graceFullLoading :graceFullLoading="graceFullLoading"></graceFullLoading>
		<graceAlert :show="topMsg.show" :msg="topMsg.msg" :msgtype="topMsg.msgtype"></graceAlert>
		<!-- <qucikReply :bannerShow="bannerShow" @qrChoosed="(value)=>{ otherData.Clyj00 = value;this.bannerShow=false;}" @closed="()=>{this.bannerShow=false;}"></qucikReply> -->
	
		<qucikReply :bannerShow="bannerShow" @qrChoosed="qrChoosed" @closed="bannerShow=false"></qucikReply>
	</view>
</template>
<script>
/* 	import graceChecker from '../../graceUI/graceChecker.js';
	import graceFullLoading from '../../graceUI/components/graceFullLoading.vue'
	import graceAlert from '../../graceUI/components/graceAlert.vue';
	import utils from '../../common/utils.js'
	import fileList from '../../components/file-list.vue';
	import qucikReply from '../../components/qucik-reply.vue';
	import foldItem from '../../components/fold-item.vue';
	import uniNavBar from "@/components/uni-nav-bar.vue";
	import datetime from '../../components/datetime.vue';
	import flow from '../../common/comm-flow.js'; */
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

	var alertTimer = null;
	export default {
		data() {
			return {
				FlowBh: 'tySp', //流程编号
				Lcbzbh: 'tySp1', //流程步骤编号	
				Flag: 'add', //处理类型 add dispose view
				Zbid00: '', //主表id
				Flowid: '', //流程id
				XybClrids: '', //下一步处理人
				Clrmcs: '', //下一步处理人名称
				Sshjid: '', //所属环节id
				Sybinfo: {}, //上一步信息
				btnList: [], //下一步骤按钮列表
				modelObj: { //表单信息
					Id0000: '',
					Jbbt00: '',
					Cbdw00: '',
					Jbry00: '',
					Blqx00: "请选择",
					Jbnr00: '',
					Jbsj00:'',
					Jjlx00: '普通件',
					Jblx00:'GZBS'
					
				},
				clyjObj: { //展示领导的处理意见
					Dzbyj: '',
					Zyldyj: '',
					Fgldyj: '',
					Nbyj: ''
				},
				otherData: {	//其他需要一起提交的数据写这里
					Xybclqx00: '',
					Clyj00: '',
				},
				fileOpType: 1,
				myOptionFlag: true, //显示操作按钮等
				baseInfoFlag: false,
				graceFullLoading: true,
				bannerShow: false, //快捷方式
				imgLists: [], //附件列表
				Fjlx00: 'JB', //附件类型
				btnImg: true, //是否显示添加附件按钮
				rule: [{ //表单检查规则
					"name": "Jbbt00",
					"checkType": "notnull", 
					"checkRule": "",
					"errorMsg": "请填写标题"
				}],
				topMsg: {
					show: false,
					msg: '消息',
					msgtype: 'error'
				}
			}
		},
		components: {
/* 			graceFullLoading,
			graceAlert,
			fileList,
			qucikReply,
			foldItem,
			uniNavBar,
			datetime */
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
			this.graceFullLoading = false;
			this.Flag = e.Flag;
			let promiseAll = []; //需要执行的所有请求集合

			if (this.Flag == 'add') {
				this.Zbid00 = utils.newGuid();
				this.baseInfoFlag = true;
			} else if (this.Flag == 'dispose') {
				this.Zbid00 = e.Zbid00;
				this.Flowid = e.Flowid;
				promiseAll.push(this.getGw(e.Zbid00));
				//promiseAll.push(this.getJbFlowData(e.Flowid));
			    promiseAll.push(flow.comm_GetFlowData(e.Flowid));
			} else if (this.Flag == 'view') {
				this.fileOpType = 0;
				this.myOptionFlag = false;
				this.Zbid00 = e.Zbid00;
				promiseAll.push(this.getGw(e.Zbid00));
			}
			uni.showLoading({
				title: '正在加载...'
			});
			Promise.all(promiseAll).then(() => {
					//隐藏全屏loading
					this.graceFullLoading = false;
					if (this.Flag !== 'view') {
						
						flow.comm_GetFlowStep();
					}
				}).catch((data) => {
					console.log('执行全部任务错误:' + data);
				})
				.finally(() => {
					uni.hideLoading();
				});

	/* 		//注册回调事件
			this.EventBus.register("chooseNextUser", (param) => {
				this.XybClrids = param.userIds;
				this.Clrmcs = param.userNames;
				flow.setNextuser(param.userIds);
				flow.comm_Dispose_SubmitData();
			}); */
			//注册回调事件，并且主动提交
			this.EventBus.register("chooseNextUserAutoSb", (param) => {
				console.log('aa:'+param.userIds);
				flow.setNextuser(param.userIds);
				flow.comm_Dispose_SubmitData();
			});
		},
		onshow: function() {

		},
		methods: {
			fireList: function() {
				this.EventBus.fire('reloadJbList', {}); //通知列表页刷新
				this.EventBus.fire('refreshTodoCount', {}); //通知待办列表刷新数量
			},
			dateChange3: function(e) {
				this.modelObj.Jbsj00 = e.target.value;
			},
			bindDateBlxqChange: function(e) { //办理期限
				this.modelObj.Blqx00 = e.detail.value;
			},
			getGw: function(Zbid00) { //获取公文
				return this.$http.doRequest(this.$http.apiUrl + '/Jb/GetJbData', {
					Zbid00: Zbid00
				}).then((data) => {
					if (data.Result) {
						this.modelObj = (data.Data || {});
						this.modelObj.Jbsj00 = this.modelObj.Jbsj00 ? this.modelObj.Jbsj00.substr(0,10) : '';
						//utils.clearSelfNull(this.modelObj);
					}
				}).catch((data) => {
					console.log('获取公文发生异常');
				})
			},
			getJbFlowData: function(Flowid) { //获取流程
				return this.$http.doRequest(this.$http.apiUrl + '/Jb/GetJbFlowData', {
					Flowid: Flowid
				}).then((data) => {
					if (data.Result) {
						this.Sybinfo.Sybclrid0 = data.Data.Sybclrid0;
						this.Sshjid = data.Data.Sshjid; //所属环节编号
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
			chooseUser: function() { //选择用户
				uni.navigateTo({
					url: '../sys/userSelect?eventName=chooseNextUser'
				}); 
			},
			qrChoosed: function(value) { //选择了快捷回复
				this.otherData.Clyj00 = value;
				this.bannerShow = false;
			},
			formSubmit: function(flag) {
				if (this.Flag == 'add') { //添加
					this.startFlow();
				} else if (this.Flag == 'dispose') { //处理
					switch (flag) {
						case "huifu": //处理回复按钮
							this.huifu();
							break;
						case "tijiao":
							this.nextFlow();
							break;
						case "guidang":
							this.guidang();
							break;
						default:
							break;
					}
				}
			},
			startFlow: function(e) //开始发起流程
			{
				let formData = this.modelObj;
				Object.assign(formData,this.otherData);
				
				let checkRes = graceChecker.check(formData, this.rule);
				if (!checkRes) { 
					utils.showTopMsg(this, graceChecker.error);
					return;
				}
				if (this.XybClrids == '') {
					utils.showTopMsg(this, '请选择处理人');
					return;
				}

				formData.userName = utils.getTrueName();
				formData.userId = utils.getUserId();
				formData.jsryid = this.XybClrids;
				formData.zbid00 = this.Zbid00;

				//提交的数据
				uni.showLoading({
					title: '处理中...'
				});
				this.$http.doRequest(this.$http.apiUrl + '/Jb/StartJb', formData).then((data) => {
						if(data.Result) {
							utils.showToastBack('提交成功');
							setTimeout(() => { this.fireList(); },800);
							this.EventBus.fire("refreshBadge");		//刷新待办数量
						}
						else {
							uni.showModal({
								title: "提示", 
								content: "提交失败：" + data.Msg,
								showCancel: false,
								confirmText: "确定"
							});
							return;
						}
					}, (data) => {
						console.log('发生异常:' + JSON.stringify(data));
					})
					.catch((data) => {
						console.log('发生异常:' + JSON.stringify(data));
					})
					.finally(() => {
						uni.hideLoading();
					});
				
			},
			huifu: function(e) //回复流程
			{
				let formData = this.modelObj;
				Object.assign(formData,this.otherData);
				let checkRes = graceChecker.check(formData, this.rule);
				if (!checkRes) {
					utils.showTopMsg(this, graceChecker.error);
					return;
				}
				formData.userName = utils.getTrueName();
				formData.userId = utils.getUserId();
				formData.Flowid = this.Flowid;

				//提交的数据
				uni.showLoading({ title: '处理中...' });
				this.$http.doRequest(this.$http.apiUrl + '/Jb/JbHuiFu', formData)
					.then((data) => {
						if(data.Result) {
							utils.showToastBack('回复成功');
							setTimeout(() => { this.fireList(); },800);
							this.EventBus.fire("refreshBadge");		//刷新待办数量
						}
						else {
							uni.showModal({
								title: "提示", 
								content: "提交失败：" + data.Msg,
								showCancel: false,
								confirmText: "确定"
							});
							return;
						}
					}, (data) => {
					})
					.catch((data) => {
						console.log('发生异常:' + JSON.stringify(data));
					})
					.finally(() => {
						uni.hideLoading();
					});
			
				
			},
			guidang: function(e) //归档
			{
				let formData = this.modelObj;
				Object.assign(formData,this.otherData);
				let checkRes = graceChecker.check(formData, this.rule);
				if (!checkRes) {
					utils.showTopMsg(this, graceChecker.error);
					return;
				}

				formData.userName = utils.getTrueName();
				formData.userId = utils.getUserId();
				formData.Flowid = this.Flowid;
				formData.jsryid = this.XybClrids; //下一步处理人

				//提交的数据
				uni.showLoading({
					title: '处理中...'
				});
				this.$http.doRequest(this.$http.apiUrl + '/Jb/JbGd', formData)
					.then((data) => {
						if(data.Result) {
							utils.showToastBack('归档成功');
							setTimeout(() => { this.fireList(); },800);
							this.EventBus.fire("refreshBadge");		//刷新待办数量
						}
						else {
							uni.showModal({
								title: "提示", 
								content: "提交失败：" + data.Msg,
								showCancel: false,
								confirmText: "确定"
							});
							return;
						}
					}, (data) => {
					})
					.catch((data) => {
						console.log('发生异常:' + JSON.stringify(data));
					})
					.finally(() => {
						uni.hideLoading();
					});

			},
			
			v_comm_Dispose: function(buttonObj) {
				if (buttonObj.IsCheckClyj === 1) {
					if (this.otherData.Clyj00 == null || this.otherData.Clyj00 === '') {
						uni.showModal({
							title: '提示',
							content: '请填写处理意见'
						});
						return;
					}
				}	 
				flow.comm_Dispose(buttonObj); //调用统一流程处理
			},
			
			chooseUserAutoSb: function(buttonObj) { //选择处理用户
				if (this.otherData.Clyj00 == null || this.otherData.Clyj00 === '') {
					uni.showModal({
						title: '提示',
						content: '请填写处理意见'
					});
					return;
				}
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
			nextFlow: function(e) //提交下一步
			{
				let formData = this.modelObj;
				Object.assign(formData,this.otherData);
				let checkRes = graceChecker.check(formData, this.rule);
				if (!checkRes) {
					utils.showTopMsg(this, graceChecker.error);
					return;
				}

				if (this.XybClrids == '') {
					uni.showModal({
						title: "提示", 
						content: "请选择下一步处理人",
						showCancel: false,
						confirmText: "确定"
					});
					return;
				}

				// formData.clyj00 = this.Clyj00;
				formData.userName = utils.getTrueName();
				formData.userId = utils.getUserId();
				formData.Flowid = this.Flowid;
				formData.jsryid = this.XybClrids; //下一步处理人
				formData.Sybclrid0 = this.Sybinfo.Sybclrid0;
				formData.Sshjid = this.Sshjid;

				//提交的数据
				uni.showLoading({
					title: '处理中...'
				});
				this.$http.doRequest(this.$http.apiUrl + '/Jb/JbDispose', formData)
					.then((data) => {
						utils.showToastBack('提交成功');
						this.fireList(); //刷新上个页面。
						this.EventBus.fire("refreshBadge");		//刷新待办数量

					}, (data) => {
						console.log('reject 函数')
					})
					.catch((data) => {
						console.log('发生异常:' + JSON.stringify(data));
					})
					.finally(() => {
						uni.hideLoading();
					});

				
			}

		},
		dateChange3: function(e) {
			this.modelObj.Jbsj00 = e.target.value;
		},
	
	}
</script>
<style>
	page {
		background-color: #F2F2F2;
	}
</style>
