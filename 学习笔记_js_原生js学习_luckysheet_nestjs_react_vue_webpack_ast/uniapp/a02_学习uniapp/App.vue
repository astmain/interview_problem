<script>
export default {
	//111应用生命周期              https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle
	onLaunch: function() {
		console.log('111应用生命周期', 'onLaunch', '当uni-app 初始化完成时触发（全局只触发一次）');
	},

	onShow: function() {
		console.log('111应用生命周期', 'onShow', '当 uni-app 启动，或从后台进入前台显示');
	},

	onHide: function() {
		console.log('111应用生命周期', 'onHide', '当 uni-app 从前台进入后台');
	},

	onError: function() {
		console.log('111应用生命周期', 'onError', '当 uni-app 报错时触发');
	},

	onUniNViewMessage: function() {
		console.log('111应用生命周期', 'onUniNViewMessage', '对 nvue 页面发送的数据进行监听，可参考 nvue 向 vue 通讯');
	},

	onUnhandledRejection: function() {
		console.log('111应用生命周期', 'onUnhandledRejection', '对未处理的 Promise 拒绝事件监听函数（2.8.1+）');
	},

	onUnhandledRejection: function() {
		console.log('111应用生命周期', 'onUnhandledRejection', '页面不存在监听函数');
	},

	onUnhandledRejection: function() {
		console.log('111应用生命周期', 'onUnhandledRejection', '监听系统主题变化');
	},

	//222页面生命周期          https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle
	onReady: function() {
		console.log('222页面生命周期', 'onReady', '面初次渲染完成');
	},
	onPullDownRefresh: function() {
		console.log('222页面生命周期', 'onPullDownRefresh', '户下拉动作');
	},
	onReachBottom: function() {
		console.log('222页面生命周期', 'onReachBottom ,不是scroll-view滚到底');
	},
	onShareAppMessage: function() {
		console.log('222页面生命周期', 'onShareAppMessage', '用户点击右上角分享 ', '微信小程序、QQ小程序、支付宝小程序、字节小程序、飞书小程序、快手小程序、京东小程序');
	},

	onNavigationBarButtonTap: function() {
		console.log('222页面生命周期', 'onNavigationBarButtonTap', '监听原生标题栏按钮点击事件，参数为Object', 'App、H5');
	},
	
	onBackPress: function() {
		console.log('222页面生命周期', 'onBackPress', '监听页面返回，返回 event = {from:backbutton、 navigateBack} ，backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack表示来源是 uni.navigateBack ；详细说明及使用：onBackPress 详解。支付宝小程序只有真机能触发，只能监听非navigateBack引起的返回，不可阻止默认行为。', 'app、H5、支付宝小程序');
	},
};
</script>

<style>
  /* @import url('./static/css.css'); */
	
	
	
/*每个页面公共css */
.class_page {
	width: 100%;
	height: 100%;
	background-color: #f7f7f7;
	position: absolute;
}

.page-block {
	/* background-color: #ffffff; */
	/* background-color: "red"; */
}
* {
	list-style: none;
	padding: 0;
	margin: 0;
	/* 规定段落中的文本不进行换行： */
	white-space: nowrap;
	

	
}
</style>
