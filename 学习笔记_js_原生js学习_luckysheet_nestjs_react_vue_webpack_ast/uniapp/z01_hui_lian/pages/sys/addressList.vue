<template>
	<view>
		<uni-nav-bar title="通讯录"></uni-nav-bar>
		<search-box v-on:remoteSearch="search">
			<text style="color:#FFFFFF;font-size: 35upx;margin-right: 15upx;" @tap="wrap">{{wrapName}}</text>
		</search-box>
		<checkbox-group style="width: 100%;">
			<view class="grace-accordion" style="padding-top: 110upx;">
				<view v-for="(dep,index) in list" :key="index">
					<view class="grace-accordion-items">
						<view :class="[dep.IsOpen ? 'grace-accordion-title grace-current' : 'grace-accordion-title']" :id="'grace-accordion-'+index"
						 @tap="switchTag(dep)">
							{{dep.DepartmentName}}
							<text class="grace-list-imgs-arrow grace-icons icon-arrow-up" style="margin-right: 2%;" v-if="dep.IsOpen"></text>
							<text class="grace-list-imgs-arrow grace-icons icon-arrow-down" style="margin-right: 2%;" v-else></text>
						</view>
						<view class="grace-accordion-body" v-show="dep.IsOpen">
							<!-- 	<view class="grace-list garace-hl-list" v-for="(user,index2) in dep.Users" :key="index2" @click="callService(user.Dhhm00)">
								<text class='iconfont icon-tel tel-icon'></text>
								<text class="grace-list-text" style="line-height:auto;">{{user.Zsmc00 + '    ' + (user.Dhhm00 || '')}}</text>
								<view class="grace-list-imgs-arrow grace-icons icon-arrow-right"></view>
							</view> -->
							<view class="grace-list">
								<view class="items"  v-for="(user,index2) in dep.Users" :key="index2" @click="callService(user.Dhhm00)">
									<view class="body">
										<view class="title">
											<text class='iconfont icon-tel tel-icon'></text>{{user.Zsmc00 + '    ' + (user.Dhhm00 || '')}}</view>
									</view>
									<!-- <text class='iconfont icon-xiaoxi xiaoxi' @tap.stop="timChat(user)">发消息</text> -->
									<view class="arrow-right"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</checkbox-group>
	</view>
</template>

<script>
	import searchBox from '../../components/search-box.vue';
	import cacheUtil from '../../common/cache-utils';
	import uniNavBar from "@/components/uni-nav-bar.vue";

	let user_cache_key = 'storage_key_user_cache';


	export default {
		data() {
			return {
				list: [],
				openAll: false,
				wrapName: '展开'
			};
		},
		mounted() {
			this.search();
		},
		components: {
			searchBox,
			uniNavBar
		},
		methods: {
			timChat:function(user){
				
				var curuser  = uni.getStorageSync("userinfo");
				
				let userId = user.Yhm000;
				console.log('想要聊天用户:'+userId);
				
				if(curuser.Yhm000==userId){
					uni.showToast({
						title:'不要和自己聊天啦'
					})
				}
				else{
					this.$store.commit('createConversationActive', userId)
					
					uni.navigateTo({
						url:'../timchat/onechat'
					})
				}
				
			
			},
			switchTag: function(dep) {
				dep.IsOpen = !dep.IsOpen;
			},
			search: function(key) {
				let match = [];
				uni.showLoading({
					title: '正在加载...'
				});
				cacheUtil.getDepartmentUsers()
					.then((res) => {
						let result = [];
						let data = res;
						if (!data || !data.length) {
							return;
						}
						if (!key) {
							setTimeout(() => {
								this.list = data;
							}, 0);
							return;
						}
						data.forEach((row, index, arr) => {
							if (!row.Users || !row.Users.length) {
								return;
							}
							row.Users = row.Users.filter(user => {
								return user.Zsmc00 && user.Zsmc00.indexOf(key) > -1;
							});
							if (row.Users.length > 0) {
								row.IsOpen = 1;
								result.push(row);
							}
						});
						this.list = result;
					})
					.catch((err) => {
						console.log('读取本地用户缓存失败');
					})
					.finally(() => {
						uni.hideLoading();
					});
			},
			callService: function(tel) {
				uni.makePhoneCall({
					phoneNumber: tel
				})
			},
			wrap: function() {
				if (this.wrapName == '展开') {
					this.wrapName = "收起";
					this.list.forEach(item => item.IsOpen = 1);
				} else {
					this.wrapName = "展开";
					this.list.forEach(item => item.IsOpen = 0);
				}
			}
		},
		computed: {

		}

	}
</script>
<style>


	.tel-icon {
		color: #1d96f0!important;
		font-size: 40upx!important;
		margin-left: 20upx;
		line-height: 1.5em;
		margin-right: 20rpx;
	}
	
	.xiaoxi {
		color: #1d96f0!important;
		font-size: 30upx!important;
		margin-left: 20upx;
		line-height: 1.5em;
		margin-right: 20rpx;
	}
	
	
	.grace-list > .items > .body > .title{
		justify-content: flex-start;
	}
	
</style>
