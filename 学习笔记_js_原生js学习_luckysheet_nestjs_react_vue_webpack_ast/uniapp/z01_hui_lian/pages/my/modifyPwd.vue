<template>
	<view>
		<uni-nav-bar title="密码修改"></uni-nav-bar>
		<view class="grace-padding">

			<view class="grace-form" style="background-color: #FFFFFF;">
				<form @submit="formSubmit" @reset="formReset">
 
					<view>
						<view class="grace-items">
							<view class="grace-label">旧密码</view>
							<input type="text" password="true" name="Ysmm00"></input>
						</view>
						<view class="grace-items">
							<view class="grace-label">新密码</view>
							<input type="text" name="Xmm000" password="true" ></input>
						</view>

						<view class="grace-items">
							<view class="grace-label">确认密码</view>
							<input type="text" name="Qrmm00" password="true"></input>
						</view>
					</view>
					<view class="btn-area">
						<button formType="submit" type="primary" plain="true" size="mini">提交</button>
						<button type="warn" formType="reset" plain="true" size="mini">重置</button>
					</view>
				</form>
			</view>

		</view>
	</view>
</template>
<script>
	import graceChecker from '../../graceUI/graceChecker.js';
	import utils from '../../common/utils.js';
	import uniNavBar from "@/components/uni-nav-bar.vue";
	
	export default {
		data() {
			return {	
				
				rule: [{ //表单检查规则
					"name": "Ysmm00",
					"checkType": "notnull",
					"checkRule": "",
					"errorMsg": "请填写旧密码"
				}, { //表单检查规则
					"name": "Xmm000",
					"checkType": "notnull",
					"checkRule": "",
					"errorMsg": "请填写新密码"
				}, { //表单检查规则
					"name": "Qrmm00",
					"checkType": "notnull",
					"checkRule": "",
					"errorMsg": "请填写确认密码"
				},{
					name: "Qrmm00",
					checkType: "pwd",
					checkRule: "Xmm000",
					errorMsg: "两次输入密码不一致"
				}],
			}
		},
		components: {
			uniNavBar
		},
		onLoad(e) {},
		onshow: function() {

		},
		methods: {
			formSubmit: function(e) {
				var formData = e.detail.value;				
				var checkRes = graceChecker.check(formData, this.rule);
				if (checkRes) {
					formData.userName = utils.getUserName();
					this.$http.doRequest(this.$http.apiUrl + '/System/UpdatePwd', e.detail.value).then((data) => {
							if(data.Result){
									utils.showToastBack('提交成功');
							
							}else{
								uni.showToast({
									title: data.Msg,
									icon: 'none'
								});
							}
						})
						.catch((data) => {
							console.log('发生异常:' + JSON.stringify(data));
						});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: 'none'
					});
				}
			},
			formReset: function(e) {

			}
		}
	}
</script>
<style scoped>
	.grace-form .grace-items {
		border-bottom: 1px solid #F1F1F1;
		padding: 10upx 0upx 10upx 0upx
	}
	
	.btn-area {
		width: 100%;
		margin: 30upx auto;
		display: flex;
	}

	.btn-area button {
		flex: 1;
	}

	/*基于graceui 自己做的局部调整*/


	.grace-form .grace-items input {
		font-size: 30upx;
		text-align: left;
	}

	.grace-form .grace-items .grace-label {
		margin-left: 20upx;
	}

	.grace-select-tips {
		border-bottom: 2px solid #F1F1F1;
		margin-left: 20upx;
	}

	.grace-padding {
		padding: 0;
		width: 100%;
	}

	.normal-view {
		width: auto;
		padding: 20upx;
	}

	.grace-add-file .garce-items .grace-close2 {
		font-family: "grace-iconfont" !important;
		width: 100%;
		position: absolute;
		z-index: 1;
		left: 0upx;
		top: 20upx;
		font-size: 25upx;
		color: #FFFFFF;
		background-color: #000000;
		opacity: 0.6;
	}

	.grace-boxes-img {
		justify-content: center;
		padding-bottom: 0upx;
	}

	.grace-boxes-text {
		color: #FFFFFF;

	}


	.form-header {
		background: linear-gradient(#1d96f0, #6ab9f4);
		justify-content: flex-end;
	}
</style>
