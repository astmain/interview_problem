<script>
export default {
	onLaunch: function() {
		console.log('应用', '初始化');
	},
	onShow: function() {
		console.log('111', '后台');
	},
	onHide: function() {
		console.log('111', '后台');
	},
	// 微信
	onReady: function() {
		console.log('111', '面初次渲染完成');
	},
	onPullDownRefresh: function() {
		console.log('111', '户下拉动作');
	},
	onReachBottom: function() {
		console.log('111', '滚动到底部的事件 ,不是scroll-view滚到底');
	},
	onShareAppMessage: function() {
		console.log('111', '用户点击右上角分享');
	}
};
</script>

<style>
/*每个页面公共css */
.page {
	width: 100%;
	height: 100%;
	background-color: #f7f7f7;
	/* position: absolute; */
}

.page-block {
	background-color: #ffffff;
}
*{
	list-style:none;
	padding: 0;
	margin: 0;
}
</style>
