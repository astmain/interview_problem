<template>
	<view>
		<uni-nav-bar title="发文处理"></uni-nav-bar>
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
						<view class="grace-label">公文标题</view>
						<input type="text" :value="modelObj.Fwbt00"></input>
					</view>
					<view class="grace-items grace-noborder">
						<view class="grace-label">主办单位</view>
						<input type="text" :value="modelObj.Zbdw00"></input>
					</view>
					<view class="grace-items grace-noborder">
						<view class="grace-label">拟稿人</view>
						<input type="text" :value="modelObj.Ngr000"></input>
					</view>
					<view class="grace-items grace-noborder">
						<view class="grace-label">拟稿日期</view>
						<datetime v-model="modelObj.Ngrq00" :withTime="false"></datetime>
					</view>
					<view class="grace-items grace-noborder">
						<view class="grace-label">联系电话</view>
						<input type="text" :value="modelObj.Lxdh00"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">缓急程度</view>
						<mp-code-selector code-type="缓急程度" text-field="Codenote" value-type="text" 
								v-model="modelObj.Hjcd00"></mp-code-selector>
					</view>
					
					<fold-item title="基础信息" :show="false">
						<view class="grace-items">
							<view class="grace-label">密级</view>
							<mp-code-selector code-type="密级" text-field="Codenote" value-type="text" 
									v-model="modelObj.Mj0000"></mp-code-selector>
						</view>
						<view class="grace-items grace-noborder">
							<view class="grace-label">保密期限</view>
							<datetime v-model="modelObj.Bmqx00" :withTime="false"></datetime>
						</view> 
						<view class="grace-items">
							<view class="grace-label">保密依据</view>
							<input type="text" :value="modelObj.Bmyj00"></input>
						</view>
						
						<view class="grace-items">
							<view class="grace-label">公开属性</view>
							<static-selector v-model="modelObj.Gksx00" :datas="gksxs"></static-selector>
						</view>
						
						<view class="grace-items" v-if="modelObj.Gksx00 !== '不公开'">
							<view class="grace-label">公开时间</view>
							<datetime :value="modelObj.Gksj00" :withTime="false"></datetime>
						</view> 
						<view class="grace-items" v-if="modelObj.Gksx00 === '不公开'">
							<view class="grace-label">理由</view>
							<textarea :maxlength="-1" :auto-height="true" :value="modelObj.Bgkly0" disabled="true" ></textarea>
						</view>
					</fold-item>

					<fold-item title="主送" :show="false">
						<view class="grace-items grace-noborder">
							<textarea :maxlength="-1" :auto-height="true" :value="modelObj.Zsrmcs" disabled="true" style="height: 42px;"></textarea>
						</view>
					</fold-item>
					<fold-item title="抄送" :show="false">
						<view class="grace-items grace-noborder">
							<textarea :maxlength="-1" :auto-height="true" :value="modelObj.Csrmcs" disabled="true" style="height: 42px;"></textarea>
						</view>
					</fold-item>
						<fold-item title="内抄" :show="false">
						<view class="grace-items grace-noborder">
							<textarea :maxlength="-1" :auto-height="true" :value="modelObj.Ncrmcs" disabled="true" style="height: 42px;"></textarea>
						</view>
					</fold-item>
					<fold-item title="主题词" :show="false">
						<view class="grace-items grace-noborder">
							<textarea :maxlength="-1" :auto-height="true" :value="modelObj.Ztc000" disabled="true" style="height: 42px;"></textarea>
						</view>
					</fold-item>
						<fold-item title="复核" :show="false">
						<view class="grace-items grace-noborder">
							<textarea :maxlength="-1" :auto-height="true" :value="modelObj.Fh0000" disabled="true" style="height: 42px;"></textarea>
						</view>
					</fold-item>

					<fold-item title="其他信息" :show="false">
						<view class="grace-items">
							<view class="grace-label">发文字号</view>
							<input type="text" v-model="modelObj.Fwzh00"></input>
						</view>
						<view class="grace-items">
							<view class="grace-label">附件</view>
							<input type="text" :value="modelObj.Fjfs00"></input>
							<view class="grace-label" style="width:50rpx;">份</view>
						</view>
						<view class="grace-items">
							<view class="grace-label">份数</view>
							<input type="text" :value="modelObj.Fs0000"></input>
							<view class="grace-label" style="width:50rpx;">份</view>
						</view>
					</fold-item>



					<fold-item title="文件信息" :show="true">
						<!-- 有关联ID就不需要附件类型了 -->
						<file-list :Zbid00="Zbid00" :op-type="fileOpType" Fjlx00="Fw" Gxlx00="1"></file-list>
					</fold-item>
					<fold-item title="我的处理" :show="true">
						<view style="margin-top:15px;" class="grace-items grace-noborder" v-if="myOptionFlag">
							<textarea :maxlength="-1" placeholder="处理意见" name="Clyj00" class="full-row-textarea" 
								v-model="otherData.Clyj00"></textarea>
							<view class='iconfont icon-xiaoxi form-choose-btn' @tap="bannerShow = true;"></view>
							<textarea :maxlength="-1" :auto-height="true" style="display: none;" name="Clrmcs" v-model="Clrmcs"></textarea>
						</view> 
						<view class="grace-items" v-if="myOptionFlag">
							<view class="grace-label">处理期限</view> 
							<datetime v-model="otherData.Xybclqx00"></datetime>
						</view>
					</fold-item>
					
					<view class="normal-view" style="display: flex;flex-direction: row;" v-for="(item,index) in btnList" :key="index">
						<button @tap="v_comm_Dispose(item)" 
							v-bind:data-optype="item.ButtonID" class="btn-primary" style="flex: 1;z-index: 999999;">{{item.ButtonName}}</button>
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
				Flag: 'add', //处理类型 add dispose view
				Zbid00: '', //主表id
				Flowid: '', //流程id
				Sybinfo: {}, //上一步信息
				FlowBh: 'Fw', //流程编号
				Lcbzbh: '', //流程步骤编号	
				Ldps00: '', //领导处理意见
				Cbjg00: '', //承办结果
				Nbyj00: '', //拟办意见
				XybClrids: '', //下一步处理人
				Clrmcs: '', //下一步处理人名称
				btnList: [], //下一步骤按钮列表
				fileOpType: 0,
				modelObj: { //表单信息
					Fwbt00: '',
					Zbdw00: '',
					Ngr000: '',
					Ngrq00: '',
					Lxdh00: '',
					Mj0000: '',
					Bmqx00: '',
					Bmyj00: '',
					Gksx00: '',
					Gksj00: '',
					Bgkly0: '',
					Zsrmcs: '',
					Csrmcs: '',
					Ncrmcs: '',
					Ztc000: '',
					Fh0000: '',
					Fwzh00: '',
					Hjcd00: '',
					Fjfj00: 0,
					Fs0000: 0
				},
				otherData: {	//其他需要一起提交的数据写这里
					Xybclqx00: '',
					Clyj00: '',
				},
				myOptionFlag: false,
				graceFullLoading: true,
				bannerShow: false,
				rule: [],
				gksxs: [
					{ label: "主动公开", value: "主动公开"},
					{ label: "依申请公开", value: "依申请公开"},
					{ label: "不公开", value: "不公开"}
				], 
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

			flow.comm_Init(this);//初始化了流程通用类，重要，一定要加

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
				this.fileOpType = 1;
				this.Flowid = e.Flowid;
				this.myOptionFlag = true;
				promiseAll.push(this.getFw(e.Zbid00));
				promiseAll.push(flow.comm_GetFlowData(e.Flowid));
				promiseAll.push(this.getLdclyj());
			} else if (this.Flag == 'view') {
				this.fileOpType = 0;
				this.Zbid00 = e.Zbid00;
				this.myOptionFlag = false;
				promiseAll.push(this.getFw(e.Zbid00));
				promiseAll.push(this.getLdclyj());
			}

			if (this.Flag !== "add" && this.Flag !== "dispose") {
				return;
			}

			uni.showLoading({
				title: '正在加载...'
			});
			Promise.all(promiseAll).then(() => {
				if (this.Flag !== 'view') {
					flow.comm_GetFlowStep();
				}
			})
			.catch((data) => {
				console.log('执行全部任务错误:' + data);
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
			qrChoosed: function(value) { //选择了快捷回复
				this.otherData.Clyj00 = value;
				this.bannerShow = false;
			},
			getFw: function(Zbid00) { //获取公文表单的数据
				return this.$http.doRequest(this.$http.apiUrl + '/Fw/GetFwData', {
					Zbid00: Zbid00
				}).then((data) => { 
					if (data.Result) {
						data.Data = data.Data || {};
						data.Data.Wh0000 = data.Data.Wh0000 || '';
						this.modelObj = data.Data;
						utils.processModelProperty(this.modelObj, {});
					}
				}).catch((data) => {
					console.log('获取公文发生异常');
				})
			},
			getLdclyj: function(Flowid) { //获取流程
				return this.$http.doRequest(this.$http.apiUrl + '/Fw/QueryFwOpinion', {
					Zbid00: this.Zbid00
				}).then((data) => {
					if (data && data.Result && data.Data) {
						this.Ldps00 = data.Data.Ldps00 == null ? '' : data.Data.Ldps00;
						this.Cbjg00 = data.Data.Cljg00 == null ? '' : data.Data.Cljg00;
						this.Nbyj00 = data.Data.Nbyj00 == null ? '' : data.Data.Nbyj00;
					} 
				}).catch((data) => {
					console.log('获取公文发生异常');
				})
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
			viewFlowData: function() { //查看流程
				uni.navigateTo({
					url: '../sys/flowData?Zbid00=' + this.Zbid00
				})
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
			fireList: function() {
				this.EventBus.fire('reloadFwList', {}); //通知刷新列表页面
				this.EventBus.fire('refreshTodoCount', {}); //通知待办列表刷新数量
			},
			sfdbChange:function(e) {
				this.modelObj.Sfdb00 = e.target.value;
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
