<template>
	<view>
		<!-- <uni-nav-bar leftIcon="" title="办公OA">
			<view slot="right">
				按钮
			</view>
		</uni-nav-bar> -->
		<uni-nav-bar leftIcon="">
			<view slot="title" style="text-align:center;">
				<view style="text-align:center;">
					<!-- <image class="title-icon" src="/static/icon-6.png"></image> -->
					<text class="title-text" style="font-size:36upx;">{{ appName }}</text>
				</view>
			</view>
		</uni-nav-bar>
		<view class="container">
			<swiper :indicator-dots="indicatorDots" :autoplay="true" :interval="interval" :duration="duration" class="swiper" style="width: 100%;height:360upx">
				<swiper-item v-for="(img, key) in imgUrls" :key="key"><image :src="img" style="width:100%;" mode="widthFix"></image></swiper-item>
			</swiper>
			<view class="grace-swiper-msg">
				<!-- 				<view class="grace-swiper-msg-icon" style="margin-left: 40upx;">
					<image src="../../static/imgs/speaker.png" mode="widthFix"></image>
				</view> -->
				<text class="gonggao">公告:</text>
				<swiper vertical="true" autoplay="true" circular="true" interval="3000">
					<swiper-item @tap="noticeDetail" :data-notice-id="item.Id0000" v-for="(item, index) in notices || []" :key="index">
						<text>{{ item.Title }}</text>
					</swiper-item>
				</swiper>
				<!-- <view class="icon-size iconfont icon-jiqiren" style="color:#10AEFF;" @tap="navTo('../demo/assistant')"></view> -->
			</view>
			<view class="" style="justify-content: center; display: flex;"><text v-text="title" class="title"></text></view>
			<view style="margin-bottom: 60upx;">
				<view class="uni-grid-9">
					<view
						@click="navTo(item.url)"
						class="uni-grid-9-item"
						hover-class="uni-grid-9-item-hover"
						style="position: relative;"
						v-for="(item, index) in moduleData"
						:key="index"
					>
						<image class="uni-grid-9-image" :src="item.icon"></image>
						<!-- 图片模式 -->
						<text class="uni-grid-9-text">{{ item.moduleName }}</text>
						<text v-if="todoCount[item.todoType] != null" class="grace-badge grace-bg-red todo-num">
							{{ todoCount[item.todoType] == null ? 0 : todoCount[item.todoType] }}
						</text>
					</view>
				</view>
			</view>
			<view style="flex-shrink: 0;"></view>
		</view>
	</view>
</template>

<script>
import cacheUtil from '../../common/cache-utils';
import utils from '../../common/utils.js';
import uniNavBar from '@/components/uni-nav-bar.vue';

let ALL_MODULES = [
		{
			id: '1',
			icon: '/static/icon-9.png',
			moduleName: '会议',
			url: '../meeting/dayPlanManage',
			todoType:'todoYjCount'
		},
		{
			id: '2',
			icon: '/static/icon-7.png',
			moduleName: '公文',
			url: '../sw/swManage',
			todoType: 'todoSwCount'
		},
		// {
		// 	id: '3',
		// 	icon: '/static/icon-4.png',
		// 	moduleName: '发文',
		// 	url: '../fw/fwManage',
		// 	todoType: 'todoFwCount'
		// },
		{
			id: '3', 
			icon: '/static/icon-4.png',
			moduleName: '发文',
			url: '../zzgj/zzgjManage',
			todoType: 'todoZzgjCount'
		},
		{
			id: '4',
			icon: "/static/icon-6.png",
			moduleName: '申请流程',
			url: '../sq/sqManage',
			todoType: 'todoSqCount'
		},
		{
			id: '11',
			icon: "/static/icon-21.png",
			moduleName: '通用审批',
			url: '../jb/jbManage?sptype=SP',
			todoType: 'todoJbCount'
		},
		{
			id: '5',
			icon: '/static/icon-mail.png',
			moduleName: '邮件',
			url: '../youjian/youjian-list',
				todoType: 'todoYjCount'
		},
		{
			id: '6',
			icon: '/static/icon-10.png',
			moduleName: '值班信息',
			url: '../zhiban/index'
		},
		{
			id: '7',
			icon: '/static/icon-2.png',
			moduleName: '文件共享',
			url: '../sharedx/list'
		},
		{
			id: '6001',
			icon: '/static/icon-8.png',
			moduleName: '通讯录',
			url: '../sys/addressList'
		},
		{
			id: '9',
			icon: "/static/icon-6.png",
			moduleName: '发送短信',
			url: '../sms/sms-add'
		}
	];

//允许查看会议的角色
let HY_ROLES = [1,4,5,14];

export default {
	data() {
		return {
			appName: '主页',
			userId: '',
			notices: [
				{
					Id0000: '0',
					Title: '暂无公告'
				}
			],
			todoCount: {
				todoTzCount: 0, //通知的待办数量
				todoFwCount: 0, //发文待办数量
				todoSwCount: 0, //收文待办数量
				todoSqCount: 0, //申请待办数量
				todoJbCount: 0 //交办待办数量
			},
			title: '日常办公',
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			imgUrls: ['http://qiniu.huiliantech.com/bangong-banner1.jpg', 'http://qiniu.huiliantech.com/bangong-banner2.jpg'],
			moduleData: []
		};
	},
	components: {
		uniNavBar
	},
	onLoad: function() {
		
		//#ifdef APP-PLUS
		this.openTranPush(); //开启传透监听
		//#endif

		let user = uni.getStorageSync('userinfo');
		if (user.Appname) {
			this.appName = user.Appname;
		}
		
		//模块计算
		let configAppModules = user.AppModules || "";
		configAppModules = configAppModules == "all" ? configAppModules : "," + configAppModules + ",";
		for (let key in ALL_MODULES) {
			let module = ALL_MODULES[key];
			let moduleId = module.id;
			if(configAppModules === "all" || configAppModules.indexOf("," + moduleId + ",") > -1) {
				this.moduleData.push(module);
			}
		}
		

		this.userId = utils.getUserId();
		this.listenEvents(); //注册监听事件
		this.fetchNotice(); //拉取公告
		this.fetchTodoCount(); //拉取待办数量
		
		this.EventBus.fire("refreshBadge");
		setInterval(() => {
			this.EventBus.fire("refreshBadge");
		}, 2 * 60 * 1000);
		
		cacheUtil.getIsDefaultSend()
		
		
		//微信分享功能，需要安全域名，80端口，这里先不处理，可以考虑ng转发
		
		// //#ifdef H5
		// if(utils.isWeiXin())//微信环境
		// {
		// 	const appid = this.$http.weixinAppId;
		// 	var curUrl = window.location.href;
		// 	curUrl = curUrl.replace(/&/, "%26")
			
		// 	uni.request({
		// 		url: `http://wx.huiliantech.com/WxUser/ShareInfo?WeixinAppId=${appid}&curUrl=${curUrl}` ,
		// 		data: {
			
		// 		},
		// 		method: 'GET',
		// 		success: (res) => {
		// 			//alert(JSON.stringify(res.data));
		// 			this.share(res.data);
		// 		}
		// 	});
		// }
		// //#endif
		
		
	},
	methods: {
		queryTodoCountBadge: function() {
			this.$http.doRequest(this.$http.apiUrl + '/Base/QueryTodoCount', {
				UserID: utils.getUserId()
			}).then((data) => {
				try {
					utils.setBadge(data.Data);
				} catch (e) {}
			});
		},
		openTranPush: function() {
			uni.getProvider({
				service: 'push',
				success: e => {
					this.provider = e.provider;
					this.tranPush();
				},
				fail: e => {
					console.log('获取推送通道失败', e);
				}
			});
		},
		tranPush: function() {
			//开启穿透监听
			uni.onPush({
				provider: this.provider[0],
				success: function() {
				},
				callback: e => {
					// 						uni.showToast({
					// 							icon: "none",
					// 							title: "g:" + JSON.stringify(e.data)
					// 						})

					if (e.data == 'updateDeptUser') {
						cacheUtil.cachedDepartmentUser(); //加载用户缓存
					} else if (e.data == 'updateNotice') {
						this.fetchNotice();
					}
				}
			});
		},
		navTo: function(jumpUrl) {
			uni.navigateTo({
				url: jumpUrl
			});
		},
		fetchNotice: function() {
			this.$http
				.doRequest(this.$http.apiUrl + '/System/QueryNewestNotice', {})
				.then(data => {
					if (data.Result) {
						this.notices = data.Data;
					}
				})
				.catch(data => {
					console.log('拉取公告异常:' + JSON.stringify(data));
				});
		},
		fetchTodoCount: function() {
			this.$http
				.doRequest(this.$http.apiUrl + '/System/GetTodoCount', {
					UserID: this.userId
				})
				.then(data => {
					if (data.Result) {
						this.todoCount = data.Data;
					}
				})
				.catch(data => {
					console.log('拉取待办数量异常:' + JSON.stringify(data));
				});
		},
		noticeDetail: function(e) {
			uni.navigateTo({
				url: '../sys/notice/detail2?id=' + e.mp.currentTarget.dataset.noticeId
			});
		},
		listenEvents: function() {
			let that = this;
			//刷新待办数量的事件
			this.EventBus.register('refreshTodoCount', () => {
				that.fetchTodoCount();
				//刷新待办的时候，同时获取下最新的消息
				that.fetchNotice();
			});
			
			this.EventBus.register('refreshBadge', () => {
				that.fetchTodoCount(); //拉取待办数量
				that.queryTodoCountBadge();
			});
		}
	},
	computed: {},
	watch: {}
};
</script>

<style>
/* 九宫格 */
.uni-grid-9 {
	background: #ffffff;
	width: 750upx;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	border-top: 2upx solid #ffffff;
}

.uni-grid-9-item {
	width: 187.5upx;
	height: 200upx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-bottom: 2upx solid;
	border-right: 2upx solid;
	border-color: #ffffff;
	box-sizing: border-box;
}

.no-border-right {
	border-right: none;
}

.uni-grid-9-image {
	width: 100upx;
	height: 100upx;
}

.uni-grid-9-text {
	width: 187.5upx;
	/* line-height: 4upx; */
	height: 40upx;
	text-align: center;
	font-size: 30upx;
	margin-top: 15upx;
}

.uni-grid-9-item-hover {
	background: rgba(0, 0, 0, 0.1);
}

.title {
	font-size: 50upx;
	color: #727275;
	text-align: center;
}

.todo-num {
	position: absolute;
	top: 10upx;
	right: 10upx;
}

/*滚动消息*/
.grace-swiper-msg {
	width: 100%;
	padding: 10upx 0;
	display: flex;
	flex-wrap: nowrap;
}

.grace-swiper-msg-icon {
	width: 50upx;
	margin: 20upx 20upx 20upx 10upx;
	flex-shrink: 0;
}

.grace-swiper-msg-icon image {
	width: 50upx;
	height: 50upx;
}

.grace-swiper-msg swiper {
	width: 100%;
	height: 90upx;
}

.grace-swiper-msg swiper-item {
	line-height: 90upx;
}

.grace-swiper-msg navigator {
	line-height: 90upx;
}

.title-icon {
	height: 28px;
	width: 28px;
	display: inline-block;
	margin-top: 8px;
	margin-right: 2px;
}

.title-text {
	vertical-align: top;
	display: inline-block;
	color: #FFFFFF;
}

.gonggao {
	width: 100upx;
	height: 90upx;
	line-height: 90upx;
	margin-left: 12upx;
	color: #ec5b48;
	font-weight: bold;
	font-size: 30upx;
}
</style>
