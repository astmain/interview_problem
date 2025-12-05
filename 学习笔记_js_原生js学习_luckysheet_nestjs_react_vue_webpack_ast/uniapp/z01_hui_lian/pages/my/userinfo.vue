<template>
	<view>
		<uni-nav-bar title="账户信息"></uni-nav-bar>
		<view class="grace-padding">
			<view class="grace-form" style="background-color: #FFFFFF;">
				<form>
					<view class="grace-title grace-nowrap grace-space-between" style="margin-top:30upx;">
						<view class="form-label">
							<text class='iconfont icon-line form-line-btn'></text>
							<view class="grace-h5 grace-blod">基础信息</view>
						</view>
					</view>
					<view>
						<view class="grace-items">
							<view class="grace-label">姓名</view>
							<input type="text" name="Zsmc00" disabled="true" :value="userinfo.Zsmc00"></input>
						</view>
						<view class="grace-items">
							<view class="grace-label">帐号</view>
							<input type="text" name="Yhm000" disabled="true" :value="userinfo.Yhm000"></input>
						</view>
						<view class="grace-items">
							<view class="grace-label">角色</view>
							<input name="Jsmc00" :value="userinfo.Jsmc00" disabled="true"></input>
						</view>
						<view class="grace-items">
							<view class="grace-label">手机号</view>
							<input type="text" name="Dhhm00" disabled="true" :value="userinfo.Dhhm00"></input>
						</view>
						<view class="grace-items">
							<view class="grace-label">单位</view>
							<input type="text" name="Dwmc00" disabled="true" :value="userinfo.Dwmc00"></input>
						</view>
					</view>
				</form>
			</view>

		</view>
	</view>
</template>
<script>
	import uniNavBar from "@/components/uni-nav-bar.vue";
	
	export default {
		data() {
			return {
				userinfo: {}
			}
		},
		onLoad(e) {
			this.userinfo = uni.getStorageSync("userinfo");
			//this.userinfo.Jsmc00 = "系统管理员,收文人员,发文人员,通讯员,中央委员";
		},
		onshow: function() {

		},
		components: {
			uniNavBar
		},
		methods: {}
	}
</script>
<style scoped>


</style>
