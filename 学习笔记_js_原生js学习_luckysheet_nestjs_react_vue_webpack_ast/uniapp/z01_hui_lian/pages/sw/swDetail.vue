<template>
	<view>
		<uni-nav-bar title="公文处理"></uni-nav-bar>
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
						<view class="grace-label">级别</view>
						<mp-code-selector code-type="收文编号类型" value-field="Codevalue" value-type="value" :value="modelObj.Bhlb00" @input="levelChange"></mp-code-selector>
					</view>
					<view class="grace-items">
						<view class="grace-label">收文号</view>
						<input type="text" name="Swh000" placeholder="收文号" v-model="modelObj.Swh000"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">收文标题</view>
						<textarea :maxlength="-1" placeholder="收文标题" :auto-height="true" style="padding: 3upx;" v-model="modelObj.Wjbt00"></textarea>
					</view>
					<view class="grace-items">
						<view class="grace-label">来文单位</view>
						<input type="text" name="Lwdw00" placeholder="来文单位" v-model="modelObj.Lwdw00"></input>
					</view>
					<view class="grace-items grace-noborder">
						<view class="grace-label">摘略</view>
						<textarea :maxlength="-1" placeholder="摘略" style="text-align:right;" name="Bz0000" v-model="modelObj.Bz0000"></textarea>
					</view>
					<fold-item title="基础信息" :show="view.baseinfo">
						<view class="grace-items grace-noborder" style="width: 98% !important;">
							<view class="grace-label">收文日期</view>
							<picker @change="dateChange3" :value="modelObj.Swrq00" mode="date" start="1991-01-01" end="2029-01-01" style="width:100%;text-align:right;padding:0;margin:0;">
								<view>{{ modelObj.Swrq00 ? modelObj.Swrq00 : '请选择'}}</view>
							</picker>
						</view>
						<view class="grace-items">
							<view class="grace-label">是否急件</view>
							<mp-code-selector code-type="缓急程度" text-field="Codenote" value-type="text" v-model="modelObj.Jjlx00"></mp-code-selector>
						</view>
						<view class="grace-items">
							<view class="grace-label">是否督办</view>
							<static-selector :datas="[{label:'是',value: 2},{label:'否',value: 1}]" v-model="modelObj.Sfdb00"></static-selector>
						</view>
						<view class="grace-items">
							<view class="grace-label">文件类别</view>
							<mp-code-selector code-type="收文类型" value-field="Codevalue" value-type="value" v-model="modelObj.Swlb00"></mp-code-selector>
						</view>
						<view class="grace-items">
							<view class="grace-label">文号</view>
							<input type="text" name="Wh0000" placeholder="文号" v-model="modelObj.Wh0000"></input>
						</view>
						<view class="grace-items">
							<view class="grace-label">密级</view>
							<mp-code-selector code-type="密级" value-type="text" v-model="modelObj.Mj0000"></mp-code-selector>
						</view>
						<view class="grace-items grace-noborder">
							<view class="grace-label">办理期限</view>
							<datetime v-model="modelObj.Blqx00"></datetime>
						</view>
					</fold-item>
					
					<fold-item title="来文附件" :show="true">
							<!-- <file-list :Zbid00="Zbid00" :op-type="fileOpType" @uploaded="fileUploaded"  Fjlx00="SW" Gxlx00="1"></file-list> -->
						<file-list-table :Zbid00="Zbid00" :op-type="fileOpType" 
						@uploaded="fileUploaded"  Fjlx00="SW" Gxlx00="1"></file-list-table>
					</fold-item>

					<fold-item title="拟办意见" :show="view.nbyj">
						<view class="grace-items grace-noborder flow-list">
							
							<view v-for="(item,index) in Nbyj00" :key="index" style="width: 90%;">
								<view v-if="item.Clyj00||item.Clyjyy">
									<view class="flow-user-time">
										·{{item.Clrmc0}}({{item.Clsj00}}):
									</view>
									<view class="flow-content">
										<view v-if="item.Clyj00" class="flow-content-info"> {{item.Clyj00}}</view>
										<view v-if="item.Clyjyy" :class="record.playMsgid == item.Flowid?'playvoice':''" @tap="playVoice(item)"  class="flow-content-voice">
											<view class="length">【语音】</view>
											<view class="icon other-voice "  style="line-height:45rpx;height: 45rpx;"></view>
										</view>
									</view>
								</view>
							</view>
							
							<!-- <textarea :maxlength="-1" :auto-height="true" name="Nbyj00" :value="Nbyj00" disabled="true" style="height: 60px;"></textarea> -->


						</view>
					</fold-item>
					<!-- <fold-item title="领导批示" :show="view.ldps">
						<view class="grace-items grace-noborder flow-list" >

							<view v-for="(item,index) in Ldps00" :key="index" style="width: 90%;">
								<view v-if="item.Clyj00||item.Clyjyy">
									<view class="flow-user-time">
										·{{item.Clrmc0}}({{item.Clsj00}}):
									</view>
									<view class="flow-content">
										<view v-if="item.Clyj00" class="flow-content-info"> {{item.Clyj00}}</view>
										<view v-if="item.Clyjyy" :class="record.playMsgid == item.Flowid?'playvoice':''" @tap="playVoice(item)"  class="flow-content-voice">
											<view class="length">【语音】</view>
											<view class="icon other-voice "  style="line-height:45rpx;height: 45rpx;"></view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</fold-item> -->
					
					<fold-item title="主要领导批示" :show="view.zyldyj">
						<view class="grace-items grace-noborder flow-list" >
					
							<view v-for="(item,index) in Zyldyj" :key="index" style="width: 90%;">
								<view v-if="item.Clyj00||item.Clyjyy">
									<view class="flow-user-time">
										·{{item.Clrmc0}}({{item.Clsj00}}):
									</view>
									<view class="flow-content">
										<view v-if="item.Clyj00" class="flow-content-info"> {{item.Clyj00}}</view>
										<view v-if="item.Clyjyy" :class="record.playMsgid == item.Flowid?'playvoice':''" @tap="playVoice(item)"  class="flow-content-voice">
											<view class="length">【语音】</view>
											<view class="icon other-voice "  style="line-height:45rpx;height: 45rpx;"></view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</fold-item>
					
					<fold-item title="分管领导批示" :show="view.fdldyj">
						<view class="grace-items grace-noborder flow-list" >
					
							<view v-for="(item,index) in Fgldyj" :key="index" style="width: 90%;">
								<view v-if="item.Clyj00||item.Clyjyy">
									<view class="flow-user-time">
										·{{item.Clrmc0}}({{item.Clsj00}}):
									</view>
									<view class="flow-content">
										<view v-if="item.Clyj00" class="flow-content-info"> {{item.Clyj00}}</view>
										<view v-if="item.Clyjyy" :class="record.playMsgid == item.Flowid?'playvoice':''" @tap="playVoice(item)"  class="flow-content-voice">
											<view class="length">【语音】</view>
											<view class="icon other-voice "  style="line-height:45rpx;height: 45rpx;"></view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</fold-item>
					
					<fold-item title="承办结果" :show="view.cbjg">
						<view class="grace-items grace-noborder flow-list">
							<view v-for="(item,index) in Cbjg00" :key="index" style="width: 90%;">
								<view v-if="item.Clyj00||item.Clyjyy">
									<view class="flow-user-time">
										·{{item.Clrmc0}}({{item.Clsj00}}):
									</view>
									<view class="flow-content">
										<view v-if="item.Clyj00" class="flow-content-info"> {{item.Clyj00}}</view>
										<view v-if="item.Clyjyy" :class="record.playMsgid == item.Flowid?'playvoice':''" @tap="playVoice(item)"  class="flow-content-voice">
											<view class="length">【语音】</view>
											<view class="icon other-voice"  style="line-height:45rpx;height: 45rpx;"></view>
										</view>
									</view>
								</view>
							</view>
							<!-- <textarea :maxlength="-1" :auto-height="true" name="Cbjg00" :value="Cbjg00" disabled="true" style="height: 120px;"></textarea> -->
						</view>
					</fold-item>

				<!-- 	<fold-item title="来文附件" :show="true">
						<file-list :Zbid00="Zbid00" :op-type="fileOpType" @uploaded="fileUploaded" Fjlx00="SW" Gxlx00="1"></file-list>
					</fold-item>
					<fold-item title="办理过程附件" :show="false">
						<file-list :Zbid00="Zbid00" :op-type="fileOpType" @uploaded="fileUploaded" Fjlx00="SW" Gxlx00="2"></file-list>
					</fold-item>
					<fold-item title="办理结果附件" :show="false">
						<file-list :Zbid00="Zbid00" :op-type="fileOpType" @uploaded="fileUploaded" Fjlx00="SW" Gxlx00="3"></file-list>
					</fold-item>
					<fold-item title="领导意见附件" :show="false">
						<file-list :Zbid00="Zbid00" :op-type="fileOpType" @uploaded="fileUploaded" Fjlx00="SW" Gxlx00="4"></file-list>
					</fold-item> -->
					<view style="margin-top:15px;" class="grace-items grace-noborder" v-if="myOptionFlag">
						<textarea :maxlength="-1" placeholder="我的处理意见" name="Clyj00" class="full-row-textarea" v-model="otherData.Clyj00"></textarea>
						<view class='iconfont icon-xiaoxi form-choose-btn' @tap="bannerShow = true;"></view>
						<textarea :maxlength="-1" style="display: none;" name="Clrmcs" v-model="Clrmcs"></textarea>

					</view>
					<view>

					<view style="display: flex;flex-direction: row;align-items: center;display: none;">
						<button v-if="otherData.Clyjyy!=''" type="default" @tap="playVoice2()" >重听语音</button>
						<button style="flex: 1;" @touchstart="voiceBegin"
							 @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel" >{{this.record.voiceTis}}</button>
						<button v-if="otherData.Clyjyy!=''"  type="warn" @tap="delVoice2()">删除语音</button>
					</view>
					
						
						<!-- <view class="voice-mode" :class="[record.recording?'recording':'']" @touchstart="voiceBegin"
						 @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel">/view> -->

						<!-- 录音UI效果 -->
						<view class="record" :class="record.recording?'':'hidden'">
							<view class="ing">
								<view class="icon luyin2"></view>
							</view>
						</view>
					</view>
					<view class="grace-items" v-if="myOptionFlag" style="display: none;">
						<view class="grace-label">处理期限</view>
						<datetime v-model="otherData.Xybclqx00"></datetime>
					</view>
					<view style="padding: 16upx 18upx;" v-if="Flag == 'add' || Flag == 'dispose'">
						<checkbox-group @change="checkboxChange">
							<label style="margin-right: 16upx;">短信提醒</label>
							<checkbox name="sfdxtx" value="sfdxtx" :checked="otherData.IsSendSms" style="z-index: 999999;" ></checkbox>
						</checkbox-group>
					</view>
					<view class="normal-view" style="display: flex;flex-direction: row;" v-for="(item,index) in btnList" :key="index">
						<button @tap="v_comm_Dispose(item)" v-bind:data-optype="item.ButtonID" class="btn-primary" style="flex: 1;z-index: 999998;">{{item.ButtonName}}</button>
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
	// import fileListTable from '../../components/file-list-table.vue';
	import fileListTable from '../../components/file-list.vue';

	var maxNum = 9;
	var alertTimer = null;
	export default {
		data() {
			return {
				AUDIO: uni.createInnerAudioContext(), //语音播放器
				RECORDER: uni.getRecorderManager(),
				record: {
					initPoint: {
						identifier: 0,
						Y: 0
					},
					voiceTis: '处理意见(非必须,按住说话)',
					recordTis: '手指上滑 取消发送',
					recording: false,
					recordTimer: 0,
					recordLength: 0,
					playMsgid: '',
					tempVoice:''
				},
				SMS:false,
				Flag: 'add', //处理类型 add dispose view
				Zbid00: '', //主表id
				Flowid: '', //流程id
				Sybinfo: {}, //上一步信息
				FlowBh: 'Gw', //流程编号
				Lcbzbh: 'Gw1', //流程步骤编号	
				Ldps00: '', //领导处理意见
				Zyldyj: '', //领导处理意见
				Fgldyj: '', //领导处理意见
				Cbjg00: '', //承办结果
				Nbyj00: '', //拟办意见
				XybClrids: '', //下一步处理人
				Clrmcs: '', //下一步处理人名称
				btnList: [], //下一步骤按钮列表
				fileOpType: 0,
				modelObj: { //表单信息
					Swrq00: '',
					Lwdw00: '',
					Wjbt00: '',
					Bhlb00: '',
					Jjlx00: '普通件',
					Sfdb00: 0,
					Swlb00: 'GWBL',
					Swlbxh: '',
					Wh0000: '',
					Swh000: '',
					Mj0000: '非密',
					Blqx00: '',
					Bz0000: ''
				},
				view: {
					baseinfo: false,
					nbyj: true,
					ldps: true,
					zyldyj: true,
					fgldyj: true,
					cbjg: false
				},
				otherData: { //其他需要一起提交的数据写这里
					Xybclqx00: '',
					Clyj00: '',
					IsSendSms: 0,
					// Clyjyy: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
					Clyjyy: '',
				},
				myOptionFlag: false,
				graceFullLoading: true,
				bannerShow: false,
				rule: [{ //表单检查规则
						"name": "Wjbt00",
						"checkType": "notnull",
						"checkRule": "",
						"errorMsg": "请填写标题"
					},
					{
						"name": "Swh000",
						"checkType": "notnull",
						"checkRule": "",
						"errorMsg": "收文号不能为空"
					},
				],
				topMsg: {
					show: false,
					msg: '消息',
					msgtype: 'error'
				},
				needChoose: true,
				ChooseList: [{
					"Name": "来文附件",
					"Value": "1"
				}, {
					"Name": "办理过程附件",
					"Value": "2"
				}, {
					"Name": "办理结果附件",
					"Value": "3"
				}, {
					"Name": "领导意见",
					"Value": "4"
				}],
				SfdbArray: ['否', '是']
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
			uniNavBar,
			fileListTable
		},
		onLoad(e) {
			flow.comm_Init(this); //初始化了流程通用类，重要，一定要加
			let that = this;	
			
		    //this.SMS =utils.Ssms();
			 this.otherData.IsSendSms =utils.Ssms()?1:0;
			this.graceFullLoading = false;
			this.Flag = e.Flag;
			let promiseAll = []; //需要执行的所有请求集合
			if (this.Flag == 'add') {
				setTimeout(() => {
					that.modelObj.Sfdb00 = 1;
				}, 0);
				this.setAddView();
				this.fileOpType = 1;
				this.myOptionFlag = true;
				this.Zbid00 = utils.newGuid();
			} else if (this.Flag == 'dispose') {
				this.setDefalutView();
				this.Zbid00 = e.Zbid00;
				this.fileOpType = 1;
				this.Flowid = e.Flowid;
				this.myOptionFlag = true;
				promiseAll.push(this.getGw(e.Zbid00));
				promiseAll.push(flow.comm_GetFlowData(e.Flowid));
				promiseAll.push(this.getLdclyj());
			} else if (this.Flag == 'view') {
				this.setDefalutView();
				this.fileOpType = 0;
				this.Zbid00 = e.Zbid00;
				this.myOptionFlag = false;
				promiseAll.push(this.getGw(e.Zbid00));
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
					this.graceFullLoading = false;
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
				console.log('aa:' + param.userIds);
				flow.setNextuser(param.userIds);
				flow.comm_Dispose_SubmitData();
			});


			// #ifndef H5
			//录音开始事件
			this.RECORDER.onStart((e) => {
				this.recordBegin(e);
			})
			//录音结束事件
			this.RECORDER.onStop((e) => {
				this.recordEnd(e);
				this.record.tempVoice = e.tempFilePath;
				utils.uploadUserFile(e.tempFilePath,this.Zbid00,'Voice',(res)=>{
					console.log(res);
					if(res.Result)
						this.otherData.Clyjyy = res.Data.Fjlsmc;
				});

				//this.playVoice(e.tempFilePath);
			})
			// #endif
			
			this.AUDIO.onEnded((res)=>{
				this.record.playMsgid='';
			});

		},
		onshow: function() {

		},
		methods: {
			delVoice2(){
				this.otherData.Clyjyy='';
				this.record.tempVoice='';
				this.record.voiceTis = '处理意见(非必须,按住说话)'
			},
			voiceBegin(e) {
				if (e.touches.length > 1) {
					return;
				}
				this.record.initPoint.Y = e.touches[0].clientY;
				this.record.initPoint.identifier = e.touches[0].identifier;
				this.RECORDER.start({
					format: "mp3"
				}); //录音开始,
			},
			recordBegin(e) {
				this.record.recording = true;
				this.record.voiceTis = '松开 结束';
				this.record.recordLength = 0;
				this.recordTimer = setInterval(() => {
					this.record.recordLength++;
				}, 1000)
			},
			recordEnd(e) {
				console.log('e:' + e);
			},
			voiceEnd(e) {
				if (!this.record.recording) {
					return;
				}
				this.record.recording = false;
				this.record.voiceTis = '按住说话';
				this.record.recordTis = '松开完成'
				this.RECORDER.stop(); //录音结束
			},
			voiceCancel() {
				console.log('取消');
			},
			// 录音中(判断是否触发上滑取消发送)
			voiceIng(e) {
				console.log('中断');
			},
			playVoice(e) {

				console.log('播放语音:');
				console.log(e.Clyjyy);

				this.record.playMsgid = e.Flowid;
				this.AUDIO.src = this.$http.baseUrl + '/file/gongwen/'+e.Clyjyy;
				this.$nextTick(function() {
					this.AUDIO.play();
				});
			},
			playVoice2() {
				this.AUDIO.src = this.record.tempVoice;
				this.$nextTick(function() {
					this.AUDIO.play();
				});
			},
			fileUploaded: function(data) {
				if (this.Flag == 'add' && !this.modelObj.Wjbt00) {
					let fileName = data.Fjysmc;
					let dotIndex = fileName.lastIndexOf(".");
					fileName = dotIndex > 0 ? fileName.substr(0, dotIndex) : fileName;
					this.modelObj.Wjbt00 = fileName;
				}
			},
			checkboxChange: function(e) {
				var values = e.detail.value;
				this.otherData.IsSendSms = 0;
				for (var i = 0; i < values.length; i++) {
					let value = values[i];
					if (value === "sfdxtx") {
						this.otherData.IsSendSms = 1;
						break;
					}
				}
			},
			qrChoosed: function(value) { //选择了快捷回复
				this.otherData.Clyj00 = value;
				this.bannerShow = false;
			},
			getGw: function(Zbid00) { //获取公文表单的数据
				return this.$http.doRequest(this.$http.apiUrl + '/Sw/GetSwData', {
					Zbid00: Zbid00
				}).then((data) => {
					if (data.Result) {
						data.Data = data.Data || {};
						data.Data.Wh0000 = data.Data.Wh0000 || '';
						this.modelObj = data.Data;
						this.modelObj.Bz0000 = this.modelObj.Bz0000 || '';
						this.modelObj.Swrq00 = this.modelObj.Swrq00 ? this.modelObj.Swrq00.substr(0, 10) : '';
						this.modelObj.Sfdb00 = this.modelObj.Sfdb00 === 1 ? 2 : 1;
					}
				}).catch((data) => {
					console.log('获取公文发生异常');
				})
			},
			getLdclyj: function(Flowid) { //获取流程
				return this.$http.doRequest(this.$http.apiUrl + '/Sw/Comm_GetFlowClyj_V2', {
					Zbid00: this.Zbid00
				}).then((data) => {
					if (data && data.Result && data.Data) {
						this.Ldps00 = data.Data.Ldps00 == null ? '' : data.Data.Ldps00;
						this.Zyldyj = data.Data.Zyldyj == null ? '' : data.Data.Zyldyj;
						this.Fgldyj = data.Data.Fgldyj == null ? '' : data.Data.Fgldyj;
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
				this.EventBus.fire('reloadSwList', {}); //通知刷新列表页面
				this.EventBus.fire('refreshTodoCount', {}); //通知待办列表刷新数量
			},
			sfdbChange: function(e) {
				this.modelObj.Sfdb00 = e.target.value;
			},
			levelChange: function(e) {
				let reget = this.modelObj.Bhlb00 !== e;
				if (reget) {
					this.modelObj.Bhlb00 = e;
					this.getGwh(e);
				}
			},
			getGwh: function(Bhlb00) { //获取公文表单的数据
				return this.$http.doRequest(this.$http.apiUrl + '/Sys/GetSwh', {
					Bhlb00: Bhlb00
				}).then((data) => {
					if (data.Result) {
						this.modelObj.Swh000 = data.Value;
					}
				})
			},
			setAddView: function() {
				this.view.nbyj = false;
				this.view.cbjg = false,
					this.view.ldps = false;
				this.view.baseinfo = true;
			},
			setDefalutView: function() {
				this.view.nbyj = true;
				this.view.cbjg = true,
					this.view.ldps = true;
				this.view.baseinfo = false;
			},
			postProcessBeforeCommit: function(button) {
				this.modelObj.Sfdb00 = this.modelObj.Sfdb00 == 2 ? 1 : 0;
			},
			dateChange3: function(e) {
				this.modelObj.Swrq00 = e.target.value;
			}
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.ldps {
		margin-top: -26rpx;
	}


@keyframes play-voice
{
from {color: black;}
to {color: #ffffff;}
}


	.playvoice>.icon::before
		{
			animation: play-voice 1s linear infinite;
		}
		
.grace-form .grace-items .grace-label {
		margin-left: 20upx;
		font-size: 32rpx !important;
	}

	.grace-items span {
		font-size: 32upx !important;
	}

	.grace-items input {
		font-size: 32upx !important;
	}

	.grace-items textarea {
		font-size: 32upx !important;
	}

	.grace-items span {
		font-size: 32upx !important;
	}

	.flow-user-time {
		color: #4c4c72;
		font-size: 16px;
	}

	.flow-content {
		flex: 1;
		display: flex;
		flex-direction: row;
		padding-left: 40rpx;
	}

	.flow-content-info {
		flex: 10;
		font-size: 16px;
	}
</style>

<style lang="scss">
	@import "@/static/tim.scss";
</style>
