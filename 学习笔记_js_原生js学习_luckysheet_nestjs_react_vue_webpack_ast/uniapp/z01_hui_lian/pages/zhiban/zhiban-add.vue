<template>
	<view>
		<uni-nav-bar title="行程信息"></uni-nav-bar>
		<view class="grace-form">
			<form>
				<view class="grace-items grace-noborder">
					<view class="grace-label">时间</view>
					<datetime v-model="model.Dutydate"></datetime>
				</view> 
				<fold-item title="人员" :show="true" v-if="ishow"> 
					<view style="margin-top:15px;" class="grace-items grace-noborder" >
						<textarea :maxlength="-1" placeholder="人员" class="full-row-textarea" :disabled="true"
							v-model="view.rymc"></textarea> 
						<view class='iconfont icon-tianjia form-choose-btn' style="font-size: 42upx;" @tap="chooseUser(0)"></view>
					</view> 
				</fold-item>
				<fold-item title="行程内容" class="override-fold-item">
					<view style="margin-top:15px;" class="grace-items grace-noborder">
						<textarea :maxlength="-1" placeholder="行程内容" class="full-row-textarea" v-model="model.Zbnr00"></textarea>
					</view> 
				</fold-item>
				<view class="grace-items grace-noborder">
					<view class="grace-label">提示时间</view>
					<datetime v-model="model.Fstxsj"></datetime>
				</view> 
				<view class="normal-view" style="display: flex;flex-direction: row;">
					<button @tap="submit_data()" class="btn-primary" style="flex: 1;">保存</button>
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
	import datetime from '../../components/datetime.vue';
	
	export default {
		data() {
			return {
				ishow: false,
				flag: 'add',
				model: {
					Id0000: '',
					Dutydate: '',
					Zbnr00: '',
					Zbryid: '',
					Fstxsj: ''
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
			popMenu,
			datetime
		},
		onLoad(e) {
			this.flag = e.flag;
			if(this.flag === "update") {
				this.model.Id0000 = e.id;
				this.getdata();
			}
			let userInfo = uni.getStorageSync("userinfo");
			this.userInfo = userInfo;
			if(userInfo && userInfo.Jsid00) { 
				let j = "," + userInfo.Jsid00 + ",";
				this.ishow = j.indexOf(',23,') > -1; 
			} 
			//注册回调事件，并且主动提交
			this.EventBus.register("choose_zhiban_add", (param) => {
				this.model.Zbryid = param.userIds;
				this.view.rymc = param.userNames;
			});
			
		},
		methods: {
			chooseUser: function(index) {
				this.selectUserIndex = index;
				uni.navigateTo({
					url: '../sys/userSelect?eventName=choose_zhiban_add&needSelectedUsers=' + this.model.ryid
				});
			},
			submit_data: function() {
				let that = this;
				if(!this.model.Dutydate) {
					uni.showModal({
						title: '提示',
						content: '请填写时间',
						showCancel: false
					});
					return;
				}
				if(!this.model.Zbnr00) {
					uni.showModal({
						title: '提示',
						content: '请填写内容',
						showCancel: false
					});
					return;
				}
				this.$http.doRequest(this.$http.apiUrl + '/Duty/Save', Object.assign({
					uid: utils.getUserId(),
					uname: utils.getUserName(),
					isUpdate: this.flag === "update" ? 1 : 0
				}, this.model)).then((data) => { 
					uni.showModal({
						title: '提示',
						content: data.Msg,
						showCancel: false
					});
					if (data.Result) {
						that.EventBus.fire("reload_zhiban");
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 800);
					}
				}).catch((data) => {
					console.log('获取公文发生异常');
				});
			},
			getdata: function() {
				this.$http.doRequest(this.$http.apiUrl + '/Duty/GetData', Object.assign({
					id: this.model.Id0000
				}, this.model)).then((data) => { 
					if(data.Result) {
						this.model = data.Data || {};
					}
				}).catch((data) => {
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
