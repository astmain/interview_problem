<template>
	<view>
		<!-- <video class="w-350 h-220" :src="d_url_video" :poster="d_url_img" autoplay=false muted="true"    ></video> -->
		<video class="w-100p h-100p" :src="d_url_video" :poster="d_url_img"></video>
		<view class="fw-2 fz-20">名称:{{ d_name }}</view>
		<view class="flex-row between start">
			<view class="mr-40" @click="my_share()">分享</view>
			<view class="mr-40" @click="my_share()">分享</view>
			<view class="mr-40" @click="my_share()">分享</view>
			<u-button @click="my_share" open-type="my_share">
			<!-- <u-button :custom-style="customStyle" @click="share"> -->
			        <!-- <u-icon name="glyphs" color="#ffffff" size="35"></u-icon> 分享222 -->
			        <u-icon color="#ffffff" size="35"></u-icon> 分享222
			</u-button>


			
		</view>

		<image class="m-20 w-200 h-270" :src="d_url_img" @click="my_preview(d_url_img)" @longpress="my_longpress(d_url_img)" aspectFit></image>
		<image class="m-20 w-200 h-270" :src="d_url_img" aspectFit></image>
		<image class="m-20 w-200 h-270" :src="d_url_img" aspectFit></image>
		<image class="m-20 w-200 h-270" :src="d_url_img" aspectFit></image>
		<image class="m-20 w-200 h-270" :src="d_url_img" aspectFit></image>
		<image class="m-20 w-200 h-270" :src="d_url_img" aspectFit></image>
		<image class="m-20 w-200 h-270" :src="d_url_img" aspectFit></image>
		<image class="m-20 w-200 h-270" :src="d_url_img" aspectFit></image>
		<image class="m-20 w-200 h-270" :src="d_url_img" aspectFit></image>
	</view>
</template>

<script>
export default {
	data() {
		return {
			d_name: '',
			d_url_video: '',
			d_url_img: ''
		};
	},

	methods: {
		async my_get_data(id) {
			let sql = `select * from weixin where id=${id}`;
			let config = { url: this.api.db_server_baidu + 'sql=' + sql, method: 'get' };
			console.log('000>config:', config);
			let res = await uni.request(config);
			console.log('111>res:', res);
			let my_arr = res[1].data.result.data;
			console.log('222>d_arr:', this.d_arr);
			this.d_name = my_arr[0].name;
			this.d_url_video = my_arr[0].url_video;
			this.d_url_img = my_arr[0].url_img;
			// console.log('111>222:',this.d_url_img)
			// debugger
		},
		async my_set_nav_bar() {
			uni.setNavigationBarColor({ frontColor: '#ffffff', backgroundColor: '#000000' });
		},
		async my_preview(img) {
			wx.previewImage({
				current: img, // 当前显示图片的http链接
				urls: [img] // 需要预览的图片http链接列表
			});
		},

		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内分享按钮
				console.log(res.target);
			}
			return {
				title: '自定义分享标题123',
				// path: '../B01_info/index?id=${id}',
				path: 'pages/B01_info/index?id=1'
			};
		},
		
		
	async	my_share(){
		//分析  https://uniapp.dcloud.net.cn/tutorial/app-share.html#
		console.log('111>uni:',uni)
		console.log('222>uni.share:',uni.share)
			uni.share({
				provider: "weixin",
				scene: "WXSceneSession",
				type: 0,
				href: "http://uniapp.dcloud.io/",
				title: "uni-app分享",
				summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				imageUrl: "https://web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png",
				success: function (res) {
					console.log("success:" + JSON.stringify(res));
				},
				fail: function (err) {
					console.log("fail:" + JSON.stringify(err));
				}
			});
		},

		async my_longpress(img) {
			uni.showActionSheet({
				itemList: ['下载', '放大', '放大'],
				success(res) {
					if (res.tapIndex == 0) {
						uni.showLoading({ title: '图片下载中' });
						uni.downloadFile({
							url: img,
							success(result) {
								console.log('文件路径111', result);
								console.log('文件路径222', result.tempFilePath);
								uni.saveImageToPhotosAlbum({
									filePath: result.tempFilePath,
									success() {
										uni.showToast({ title: '保存成功', duration: 2000 });
									}
								});
							}
						});
					}
					if (res.tapIndex == 1) {
						console.log('1>放大:', 111);
						wx.previewImage({ current: img, urls: [img] });
					}
					uni.hideLoading();
					// debugger
				}
			});
		}
	},

	async onLoad({ id }) {
		this.my_set_nav_bar();

		console.error('111>params:', id);
		this.my_get_data(id);
	},
	async created() {},
	async mounted() {}
};
</script>

<style lang="scss">
.class_search {
	position: fixed;
	top: 100;
	z-index: 99;
}
</style>
