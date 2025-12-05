<template>
	<view>
		<uni-nav-bar title="发送邮件"></uni-nav-bar>
		<view class="grace-form">
			<form>
				<fold-item title="主题" :show="true">
					<view style="margin-top:15px;" class="grace-items grace-noborder">
						<textarea :maxlength="-1" :auto-height="true" placeholder="主题" class="full-row-textarea" v-model="model.title"></textarea>
					</view> 
				</fold-item>
				<fold-item title="收件人" :show="true"> 
					<view style="margin-top:15px;" class="grace-items grace-noborder" >
						<textarea :maxlength="-1" placeholder="接收人" class="full-row-textarea" :disabled="true"
							v-model="extend.jsrmcs"></textarea> 
						<view class='iconfont icon-tianjia form-choose-btn' style="font-size: 42upx;" @tap="chooseUser(0)"></view>
					</view> 
				</fold-item>
				<fold-item title="抄送" :show="true">
					<view style="margin-top:15px;" class="grace-items grace-noborder" >
						<textarea :maxlength="-1" placeholder="抄送" class="full-row-textarea" :disabled="true"
							v-model="extend.csrmcs"></textarea> 
						<view class='iconfont icon-tianjia form-choose-btn' style="font-size: 42upx;" @tap="chooseUser(1)"></view>
					</view> 
				</fold-item>
				<fold-item title="附件信息" :show="true">
					<file-list :Zbid00="id" :op-type="1" Fjlx00="YOUJIAN" ref="fileList"></file-list>
				</fold-item>
				<fold-item title="邮件内容" class="override-fold-item">
					<view style="margin-top:15px;" class="grace-items grace-noborder">
						<textarea :maxlength="-1" placeholder="邮件内容" class="full-row-textarea" v-model="model.content"></textarea>
					</view> 
				</fold-item>
				<view style="padding: 16upx 18upx;">
					<checkbox-group @change="checkboxChange">
					    <label style="margin-right: 16upx;">短信提醒</label>
						<checkbox name="sfdxtx" value="sfdxtx" :checked="SMS"  ></checkbox>
					</checkbox-group>
				</view>
				 
				<view class="normal-view" style="display: flex;flex-direction: row;">
					<button @tap="submit_data()" class="btn-primary" style="flex: 1;">发送</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	
	import utils from '../../common/utils.js';
	import uniNavBar from "@/components/uni-nav-bar.vue";
	import foldItem from '../../components/fold-item.vue';
	import fileList from '../../components/file-list.vue';
	import popMenu from '../../components/pop-menu.vue';
	
	
	export default {
		data() {
			return {
				id: '',
				from: '',
				SMS:false,
				selectUserIndex: 0,
				model: {
					title: '',
					content: '',
					sfdxtx: false
				},
				extend: {
					rid: '',	//回复人id，回复发起人时使用
					rids: '',   //所有回复人的id，回复全部时使用
					rname: '',		//回复人的名称，回复发起人时使用
					rnames: '',		//所有回复人的名称，回复全部时使用
					sendType: 0,	//发送类型
					replyId: '',	//回复的邮件id
					replyName: '',	//回复的邮件名称
					jsrids: '',		//接收人id
					jsrmcs: '',		//接收人名称
					csrids: '',		//抄送人id
					csrmcs: '',		//抄送人名称
				}
			}
		}, 
		components: { 
			uniNavBar,
			foldItem,
			fileList,
			popMenu
		},
		onLoad(e) {
			
			this.from = e.from;
			this.id = utils.newGuid();	//全部在前台new一个id
			this.SMS =utils.Ssms();
			if (this.from === "reply" || this.from === "replyAll") {
				//回复邮件
				this.extend.sendType = 1;
				this.extend.replyId = e.replyId;
				this.extend.replyName = e.replyTitle;
				this.extend.rid = e.rid;
				this.extend.rids = e.rids;
				this.extend.rname = e.rname;
				this.extend.rnames = e.rnames;
				
				//回复的标题
				this.model.title = "回复:" + this.extend.replyName;
				
				//暂不区分回复和回复全部
				this.extend.jsrids = this.extend.rid;
				this.extend.jsrmcs = this.extend.rname;
				
				//回复全部
				// this.extend.jsrids = this.extend.rids;
				// this.extend.jsrmcs = this.extend.rnames;
			}
			else if (this.from === "transfer") {
				//转发邮件
				this.extend.sendType = 1;
				this.extend.replyId = e.replyId;
				this.extend.replyName = e.replyTitle;
				this.extend.rid = e.rid;
				this.extend.rids = e.rids;
				this.extend.rname = e.rname;
				this.extend.rnames = e.rnames;
				//转发的标题
				this.model.title = "转发:" + this.extend.replyName;
				
				this.copyAttach();
			}
			else {
				//其他情况当成新建处理
				this.extend.sendType = 0;
				this.extend.replyId = "";
				this.extend.replyName = "";
			}
			
			//注册回调事件，并且主动提交
			this.EventBus.register("choose_youjian_add", (param) => {
				if(this.selectUserIndex === 0) {
					//接收人
					this.extend.jsrids = param.userIds;
					this.extend.jsrmcs = param.userNames;
				}
				else if(this.selectUserIndex === 1) {
					//抄送人
					this.extend.csrids = param.userIds;
					this.extend.csrmcs = param.userNames;
				}
			});
			
		},
		methods: {
			checkboxChange: function(e) {
				var values = e.detail.value;
				this.model.sfdxtx = 0;
				for (var i = 0; i < values.length; i++) {
					let value = values[i];
					if(value === "sfdxtx") { 
						this.model.sfdxtx = 1;
						break;
					}
				}
			},
			chooseUser: function(index) {
				this.selectUserIndex = index;
				let needSelectedUsers = "";
				if(index === 0) {
					needSelectedUsers = this.extend.jsrids;
				}
				else if(index === 1) {
					needSelectedUsers = this.extend.csrids;
				}
				uni.navigateTo({ 
					url: '../sys/userSelect?eventName=choose_youjian_add&needSelectedUsers=' + needSelectedUsers,
				});
			},
			submit_data: function() {
				this.$http.doRequest(this.$http.apiUrl + '/Youjian/Send', {
					userid: utils.getUserId(),
					userName: utils.getUserName(),
					send_type: this.extend.sendType,
					id: this.id,
					reply_id: this.extend.replyId,
					title: this.model.title,
					jsrids: this.extend.jsrids,
					csrids: this.extend.csrids,
					content: this.model.content,
					sfdxtx : this.model.sfdxtx
				}).then((data) => { 
					if (data.Result) {
						uni.showModal({
							title: '提示',
							content: data.Msg,
							showCancel: false
						})
						setTimeout(() => {
							uni.navigateTo({
								url: './youjian-list'
							});
						}, 100);
					}
				}).catch((data) => {
					console.log('获取公文发生异常');
				});
			},
			copyAttach: function() {
				let that = this;
				this.$http.doRequest(this.$http.apiUrl + '/Youjian/CopyFileForTransfer', {
					oid: this.extend.replyId,
					id: this.id
				}).then((data) => { 
					if (data.Result) {
						that.$refs.fileList.getImgList();
					}
				}).catch((data) => {
					console.log('获取公文发生异常');
				});
			}
		},
		computed: {
			
		}
	} 
</script>
<style>
	
	.font {
		font-size: 46upx;
	}
	
	.override-fold-item {
		margin-top: -20upx;
	}
	
	.item {
		display: inline-block;
	}
	
	.item-label {
		display: inline-block;
		width: 150upx;
		font-size: 30upx;
		font-weight: bold;
		padding-left: 24upx;
		vertical-align: top;
	}
	
	.item-value {
		display: inline-block;
		width: 520upx;
		font-size: 30upx;
	}
	
	.r-table {
		margin-left: 50upx;
		margin-top: 10upx;
		display:table;  
		border-collapse:collapse;  
	}
	
	.tr {
		padding: 0px !important;
		margin: 0px !important;
	}
	
	.td {
		display:table-cell;
		padding: 12upx;
		border: solid 1px #333;
	}
	
	.col-1 {
		width: 100upx;
	}
	
	.col-2 {
		width: 120upx;
	}
	
	.col-3 {
		width: 320upx;
	}
	
	.input-title {
		width:650upx;
		margin-right: 10upx;
		margin-left: 20upx !important;
		border: solid 1px #ddd !important;
	}
	
</style>
