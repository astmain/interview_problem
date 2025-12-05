<template>
	<view>
		<!-- <view class="grace-padding" v-if="!graceFullLoading">

			<view class="grace-form" style="background-color: #FFFFFF;">
				<form @submit="formSubmit">
					<view class="grace-title grace-nowrap grace-space-between" style="margin-top:30upx;">
						<text class='iconfont icon-line' style='color:#1d96f0;font-size: 30upx;line-height: 1.8em;'></text>
						<view class="grace-h5 grace-blod">基础信息</view>
						<view v-bind:class="['form-ss-btn','iconfont',{'icon-shousuojiantou' : baseInfoFlag, 'icon-shousuoshangjiantou': !baseInfoFlag}]"
						 @click="baseInfoFlag = !baseInfoFlag"></view>
					</view>
					<view v-show="baseInfoFlag">
						<view class="grace-items">
							<view class="grace-label">文号</view>
							<input type="text" name="Fwh000" placeholder="文号" v-model="modelObj.Fwh000"></input>
						</view>
						<view class="grace-items">
							<view class="grace-label">标题</view>
							<input type="text" name="Fwbt00" placeholder="标题" v-model="modelObj.Fwbt00"></input>
						</view>
						<view class="grace-items">
							<view class="grace-label">类型</view>
							<view class="gracr-form-r">
								<code-selector code-type="文件类型" text-field="Codenote" value-type="text" :bind-value="modelObj.Lx0000"
								 @codeSelectorChanged="(e) => { modelObj.Lx0000 = e;}"></code-selector>
							</view>
						</view>
						<view class="grace-items">
							<view class="grace-label">分类</view>
							<view class="gracr-form-r">
								<code-selector code-type="文件分类" text-field="Codenote" value-type="text" :bind-value="modelObj.Fwlx00"
								 @codeSelectorChanged="(e) => { modelObj.Fwlx00 = e;}"></code-selector>
							</view>
						</view>
						<view class="grace-items">
							<view class="grace-label">拟稿人</view>
							<input type="text" name="Cjr000" placeholder="拟稿人" v-model="modelObj.Cjr000"></input>
						</view>
						<view class="grace-items grace-noborder">
							<view class="grace-label">印发日期</view>
							<view class="gracr-form-r">
								<picker @change="(e) => { if(modelObj) { modelObj.Fwrq00 = e.target.value; } }" v-model="modelObj.Fwrq00"
								 mode="date" name="Fwrq00" start="1988-01-01" end="2029-01-01">
									<text>{{ modelObj ? modelObj.Fwrq00 : ''}}</text>
								</picker>
							</view>
						</view>

					</view>
					<view class="grace-title grace-nowrap grace-space-between" style="margin-top:30upx;">
						<text class='iconfont icon-line' style='color:#1d96f0;font-size: 30upx;line-height: 1.8em;'></text>
						<view class="grace-h5 grace-blod">文件信息</view>
						<view v-bind:class="['form-ss-btn','iconfont',{'icon-shousuojiantou' : photoInfoFlag, 'icon-shousuoshangjiantou': !photoInfoFlag}]"  
							@click="photoInfoFlag = !photoInfoFlag"></view> 
					</view>
					<view v-show="photoInfoFlag">
						<file-list :Zbid00="Zbid00" :op-type="fileOpType">
						</file-list>
					</view>
				</form>
			</view>
		</view>
		<graceFullLoading :graceFullLoading="graceFullLoading"></graceFullLoading>
		<graceAlert :show="topMsg.show" :msg="topMsg.msg" :msgtype="topMsg.msgtype"></graceAlert> -->
	</view>
</template>
<script>
	import graceChecker from '../../graceUI/graceChecker.js';
	import graceFullLoading from '../../graceUI/components/graceFullLoading.vue'
	import graceAlert from '../../graceUI/components/graceAlert.vue';
	import utils from '../../common/utils.js'
	import codeSelector from '../../components/code-selector.vue';
	import fileList from '../../components/file-list.vue';

	var maxNum = 9;
	var alertTimer = null;
	export default {
		data() {
			return {
				Flag: 'add', //处理类型 add dispose view
				Zbid00: '', //主表id
				Flowid: '', //流程id
				Sybinfo: {}, //上一步信息
				FlowBh: 'Sw', //流程编号
				Lcbzbh: '', //流程步骤编号	
				Clyj00: '',
				Ldps00: '', //领导处理意见
				XybClrids: '', //下一步处理人
				Clrmcs: '', //下一步处理人名称
				btnList: [], //下一步骤按钮列表
				fileOpType: 0,
				modelObj: { //表单信息
					Fwh000: '',
					Fwbt00: '',
					Lx0000: '',
					Fwlx00: '',
					Cjr000: '',
					Fwrq00: '',
				},
				baseInfoFlag: true,
				moreInfoFlag: true,
				photoInfoFlag: true,
				graceFullLoading: true,
				rule: [],
				topMsg: {
					show: false,
					msg: '消息',
					msgtype: 'error'
				}
			}
		},
		components: {
			graceFullLoading,
			graceAlert,
			codeSelector,
			fileList
		},
		onLoad(e) {
			this.graceFullLoading = false;
			this.Flag = e.Flag;
			let promiseAll = []; //需要执行的所有请求集合

			uni.showLoading({ title: '正在加载...' }); 
			if (this.Flag == 'add') {
				this.fileOpType = 1;
				this.Zbid00 = utils.newGuid();
			} else if (this.Flag == 'dispose') {
				this.fileOpType = 1;
				this.Zbid00 = e.Zbid00;
				this.Flowid = e.Flowid;
				promiseAll.push(this.getGw(e.Zbid00));
			} else if (this.Flag == 'view') {
				this.Zbid00 = e.Zbid00;
				this.fileOpType = 0;
				promiseAll.push(this.getGw(e.Zbid00));
			}

			Promise.all(promiseAll).finally(() => {
				uni.hideLoading();
			});

		},
		onshow: function() {

		},
		methods: {
			getGw: function(Zbid00) { //获取公文表单的数据
				return this.$http.doRequest(this.$http.apiUrl + '/FileShare/GetFwData', {
					Zbid00: Zbid00
				}).then((data) => {
					if (data.Result) {
						this.modelObj = data.Data;
					}
				}).catch((data) => {
					console.log('获取公文发生异常');
				});
			},
			viewFlowData: function() { //查看流程
				uni.navigateTo({
					url: '../sys/flowData?Zbid00=' + this.Zbid00
				})
			},
			fireList: function() {
				this.EventBus.fire('reloadSwList', {})
			},


		}
	}
</script>
<style>
	page {
		background-color: #F2F2F2;
	}
</style>
