<template>
	<view>
		<uni-nav-bar title="发送短信"></uni-nav-bar>
		<view class="grace-form">
			<form>
				<view class="grace-items grace-noborder" style="display:none;"> 
					<view class="grace-label" style="width:55upx;">主题</view>
					<input type="text" name="Bt0000" v-model="model.title" placeholder="请填写主题"
						style="width:660upx;margin-left:-10upx;border:solid 1px #eee;margin: 0 14upx;padding-right: 14upx;"></input>
				</view>
				<fold-item title="收件人" :show="true"> 
					<view style="margin-top:15px;" class="grace-items grace-noborder" >
						<textarea :maxlength="-1" placeholder="接收人" class="full-row-textarea" :disabled="true"
							v-model="view.rymc"></textarea> 
						<view class='iconfont icon-tianjia form-choose-btn' style="font-size: 42upx;" @tap="chooseUser(0)"></view>
					</view> 
				</fold-item>
				<fold-item title="短信内容" class="override-fold-item">
					<view style="margin-top:15px;" class="grace-items grace-noborder">
						<textarea :maxlength="-1" placeholder="短信内容" class="full-row-textarea" v-model="model.content"></textarea>
					</view> 
				</fold-item>
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
				model: {
					title: '',
					content: '',
					ryid: ''
				},
				view: {
					rymc: ''
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
			//注册回调事件，并且主动提交
			this.EventBus.register("choose_sms_add", (param) => {
				this.model.ryid = param.userIds;
				this.view.rymc = param.userNames;
			});
			
			let date = new Date();
			this.model.title = utils.getUserName() + date.getFullYear() + (date.getMonth() + 1) + date.getDay();
		},
		methods: {
			chooseUser: function(index) {
				this.selectUserIndex = index;
				uni.navigateTo({
					url: '../sys/userSelect?eventName=choose_sms_add&needSelectedUsers=' + this.model.ryid
				});
			},
			submit_data: function() {
				if(!this.model.content) {
					uni.showModal({
						title: '提示',
						content: '请填写短信内容',
						showCancel: false
					});
					return;
				}
				if(!this.model.ryid) {
					uni.showModal({
						title: '提示',
						content: '请选择接收人员',
						showCancel: false
					});
					return;
				}
				
				this.$http.doRequest(this.$http.apiUrl + '/System/SendSms', {
					userid: utils.getUserId(),
					username: utils.getUserName(),
					ryid: this.model.ryid,
					Sendbt: this.model.title,
					Sendnr: this.model.content
				}).then((data) => { 
					uni.showModal({
						title: '提示',
						content: data.Msg,
						showCancel: false
					});
					if (data.Result) {
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 800);
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
	
</style>
