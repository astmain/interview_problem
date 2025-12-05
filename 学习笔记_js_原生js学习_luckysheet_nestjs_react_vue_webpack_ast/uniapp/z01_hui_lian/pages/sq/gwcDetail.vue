<template>
	<view>
		<uni-nav-bar title="派车申请"></uni-nav-bar>
		<view class="grace-padding">
			<view class="form-header">
				<view class="grace-boxes" @tap="viewFlowData()">
					<view class="grace-boxes-img">
						<text class='iconfont icon-set form-op-btn'></text>
					</view>
					<view class="grace-boxes-text">流程查看</view>
				</view>
			</view>

			<view class="grace-form" style="background-color: #FFFFFF;">
				<form @submit="formSubmit">
					<fold-item title="基础信息" :show="baseInfoFlag">
						<view class="grace-items">
							<view class="form-label">
								<view class="grace-label">申请标题</view>
								<view class="required-red">*</view>
							</view>
							<textarea :maxlength="-1" :auto-height="true" placeholder="申请标题" v-model="modelObj.Sqbt00"></textarea>
							<input type="text" name="Id0000" v-model="modelObj.Id0000" v-show="1!=1" />
						</view>

						<view class="grace-items">
							<view class="form-label">
								<view class="grace-label">申请人</view>
								<view class="required-red">*</view>
							</view>
							<input type="text" name="Sqztmc" placeholder="申请人" v-model="modelObj.Sqztmc"></input>
						</view>

						<view class="grace-items">
							<view class="form-label">
								<view class="grace-label">申请部门</view>
								<view class="required-red">*</view>
							</view>
							<input type="text" name="Sqnr10" placeholder="申请部门" v-model="modelObj.Sqnr10"></input>
						</view>

						<view class="grace-items">
							<view class="form-label">
								<view class="grace-label">目的地</view>
								<view class="required-red">*</view>
							</view>
							<input type="text" name="Sqnr20" placeholder="目的地" v-model="modelObj.Sqnr20"></input>
						</view>

						<view class="grace-items grace-noborder">
							<view class="form-label">
								<view class="grace-label">用车事由</view>
								<view class="required-red">*</view>
							</view>
							<textarea :maxlength="-1" :auto-height="true" placeholder="用车事由...." name="Sqnr30" v-model="modelObj.Sqnr30"></textarea>
							<view class='iconfont icon-xiaoxi form-choose-btn' @tap="ycBannerShow=true"></view>
						</view>

						<view class="grace-items grace-noborder">
							<view class="form-label">
								<view class="grace-label">具体事宜</view>
								<view class="required-red">*</view>
							</view>
							<textarea :maxlength="-1" :auto-height="true" placeholder="具体事宜...." name="Sqnr40" v-model="modelObj.Sqnr40"></textarea>
						</view>

						<view class="grace-items">
							<view class="form-label">
								<view class="grace-label">出车时间</view>
								<view class="required-red">*</view>
							</view>
							<datetime v-model="modelObj.Kssj00"></datetime>
							</picker>
						</view>

						<view class="grace-items">
							<view class="form-label">
								<view class="grace-label">返回时间</view>
								<view class="required-red">*</view>
							</view>
							<datetime v-model="modelObj.Jssj00"></datetime>
						</view>

					</fold-item>

					<fold-item title="处理意见" :show="true">
						<view class="grace-items grace-noborder">
							<view class="grace-label">党政办</view>
							<textarea :maxlength="-1" :auto-height="true" disabled name="Dzbyj" :value="clyjObj.Dzbyj" readonly></textarea>
						</view>
						
						<view class="grace-items grace-noborder">
							<view class="grace-label">秘书</view>
							<textarea :maxlength="-1" :auto-height="true" disabled name="Nbyj" :value="clyjObj.Nbyj" readonly></textarea>
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
		<graceFullLoading :graceFullLoading="graceFullLoading"></graceFullLoading>
		<graceAlert :show="topMsg.show" :msg="topMsg.msg" :msgtype="topMsg.msgtype"></graceAlert>
		<!-- <qucikReply :bannerShow="bannerShow" @qrChoosed="(value)=>{ modelObj.Clyj00=value;this.bannerShow=false;}" @closed="()=>{this.bannerShow=false;}"></qucikReply> -->
		<qucikReply  :bannerShow="bannerShow" @qrChoosed="qrChoosed" @closed="bannerShow=false"></qucikReply>
		<qucikReply code-source="Code"  code-type="用车事由" :bannerShow="ycBannerShow" @qrChoosed="ycQrChoosed" @closed="ycBannerShow=false"></qucikReply>
	</view>
</template>
<script>
	import graceChecker from '../../graceUI/graceChecker.js';
	import graceFullLoading from '../../graceUI/components/graceFullLoading.vue'
	import graceAlert from '../../graceUI/components/graceAlert.vue';
	import utils from '../../common/utils.js'
	import mpCodeSelector from '../../components/mp-code-selector.vue';
	import fileList from '../../components/file-list.vue';
	import qucikReply from '../../components/qucik-reply.vue';
	import datetime from '../../components/datetime.vue';
	import foldItem from '../../components/fold-item.vue';
	import uniNavBar from "@/components/uni-nav-bar.vue";
	import flow from '../../common/comm-flow.js'

	var that;
	export default {
		data() {
			return {
				Flag: 'add', //处理类型 add、dispose、view
				Zbid00: '', //主表id
				Flowid: '', //流程id
				XybClrids: '', //下一步处理人
				Clrmcs: '', //下一步处理人名称
				Sshjid: '', //所属环节id
				Sybinfo: {}, //上一步信息
				FlowBh: 'Pc', //流程编号
				Lcbzbh: 'Pc1', //流程步骤编号	
				btnList: [], //下一步骤按钮列表
				modelObj: { //表单信息
					Id0000: '',
					Sqbt00: utils.getDate() + " " + utils.getTrueName() + "派车申请",
					Sqztmc: utils.getTrueName(),
					Sqsj00: "请选择",
					Kssj00: "请选择",
					Jssj00: "请选择"
				},
				otherData: { //其他需要一起提交的数据写这里
					Sqlx00: '公务用车',
					Xybclqx00: '', //处理期限
				},
				clyjObj: { //展示领导的处理意见
					Dzbyj: '',
					Zyldyj: '',
					Fgldyj: '',
					Nbyj: ''
				},
				fileOpType: 1, //是否允许操作附件
				myOptionFlag: true, //操作按钮
				baseInfoFlag: true,
				graceFullLoading: true,
				ycBannerShow: false,
				bannerShow: false,
				Fjlx00: 'SQ', //附件类型
				rule: [{ //表单检查规则
						"name": "Sqbt00",
						"checkType": "notnull",
						"checkRule": "",
						"errorMsg": "请填写申请标题"
					},
					{
						"name": "Sqztmc",
						"checkType": "notnull",
						"checkRule": "",
						"errorMsg": "请填写申请人员"
					},
					{
						"name": "Sqztmc",
						"checkType": "notnull",
						"checkRule": "",
						"errorMsg": "请填写乘车人员"
					},
					{
						"name": "Sqnr30",
						"checkType": "notnull",
						"checkRule": "",
						"errorMsg": "请填写用车事由"
					},
					{
						"name": "Kssj00",
						"checkType": "notnull",
						"checkRule": "请选择",
						"errorMsg": "请填写出车时间"
					},
					{
						"name": "Jssj00",
						"checkType": "notnull",
						"checkRule": "请选择",
						"errorMsg": "请填写返回时间"
					},
					{
						"name": "Sqnr40",
						"checkType": "notnull",
						"checkRule": "",
						"errorMsg": "请填写具体使用"
					}
				],
				topMsg: {
					show: false,
					msg: '消息',
					msgtype: 'error'
				},
				isSingle:false
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
			uniNavBar
		},
		onLoad(e) {

			flow.comm_Init(this); //初始化了流程通用类，重要，一定要加

			that = this;
			this.graceFullLoading = false;
			this.Flag = e.Flag;
			let promiseAll = []; //需要执行的所有请求集合

			uni.showLoading({
				title: '正在加载...'
			});
			if (this.Flag == 'add') {
				this.Zbid00 = utils.newGuid();;
				this.modelObj.Sqbt00 = this.getNowFormatDate() + "派车申请";
			} else if (this.Flag == 'dispose') {
				this.Zbid00 = e.Zbid00;
				this.Flowid = e.Flowid;
				promiseAll.push(flow.comm_GetFlowData());
				promiseAll.push(this.getSq(e.Zbid00));
				promiseAll.push(this.getSqClyj());
			} else if (this.Flag == 'view') {
				this.Zbid00 = e.Zbid00;
				this.myOptionFlag = false;
				promiseAll.push(this.getSq(e.Zbid00));
				promiseAll.push(this.getSqClyj());
				that.showPcFlag = true;
			}

			Promise.all(promiseAll).then(() => {
				this.graceFullLoading = false;
				if (this.Flag != 'view')
					//加载步骤按钮
					flow.comm_GetFlowStep();

				}).catch((data) => {
					this.graceFullLoading = false;
				})
				.finally(() => {
					this.graceFullLoading = false;
					uni.hideLoading();
				});

			//注册回调事件，并且主动提交
			this.EventBus.register("chooseNextUserAutoSb", (param) => {
				flow.setNextuser(param.userIds);
				flow.comm_Dispose_SubmitData();
			});
		},
		onshow: function() {

		},
		methods: {
			ycQrChoosed: function(value) { //选择用车理由。
				this.modelObj.Sqnr30 = value;
				this.ycBannerShow = false;
			},
			qrChoosed: function(value) { //选择了快捷回复
				this.modelObj.Clyj00 = value;
				this.bannerShow = false;
			},
			fireList: function() { //刷新上个页面
				this.EventBus.fire('reloadSqList', {});
				this.EventBus.fire('refreshTodoCount', {}); //通知待办列表刷新数量
			},
			v_comm_Dispose: function(buttonObj) {
				flow.comm_Dispose(buttonObj); //调用统一流程处理
			},
			Pc4PreFun: function() { //第二步预处理函数
				//that.showPcFlag = true; //注意，这里动态加载函数 this不能用。
			},
			Pc4Fun: function(buttonObj) { //第二步提交前的函数
				//处理数据
				return true;
			},
			getSq: function(Zbid00) { //获取公文详情
				return this.$http.doRequest(this.$http.apiUrl + '/Sq/SqData', {
					Zbid00: Zbid00 
				}).then((data) => {
					if (data.Result) {
						this.modelObj = data.Data;
					}
				}).catch((data) => {
					console.log('获取公文发生异常');
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
			chooseUserAutoSb: function(buttonObj) { //选择处理用户，并自动提交
				let search = '';
				if (buttonObj.OpUser) {
					search += ("&departmentIds=" + (buttonObj.OpUser.DepartmentIDs ? buttonObj.OpUser.DepartmentIDs : ''));
					search += ("&roleIds=" + (buttonObj.OpUser.Roles ? buttonObj.OpUser.Roles : ''));
					search += ("&userIds=" + (buttonObj.OpUser.UserIDs ? buttonObj.OpUser.UserIDs : ''));
				}
				uni.navigateTo({
					url: '../sys/userSelect?eventName=chooseNextUserAutoSb&roleIds=14'
				});
			},
			getNowFormatDate: function() {
				var date = new Date();
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = year + seperator1 + month + seperator1 + strDate;
				return currentdate;
			}
		}
	}
</script>
<style>
	page {
		background-color: #F2F2F2;
	}
</style>
