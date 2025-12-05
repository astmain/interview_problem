<template>
	<div>
		<uni-nav-bar title="更新"></uni-nav-bar>
		<view style="display: flex;flex-direction: column; justify-content: center; align-items: center; width: 100%;">
			<progress v-bind:percent="percent" show-info stroke-width="12" style="flex: 1;" activeColor="#63bcf7" />
			<view style="padding-left: 20upx;">正在下载更新，您可以等待完成，或者先返回。</view>
			<view style="padding-left: 20upx;">系统会在后台下载之后弹出安装提示框</view>
		</view>
	</div>
</template>
<script>
	import uniNavBar from "@/components/uni-nav-bar.vue";
	
	export default {
		data() {
			return {
				tip: '',
				percent: "0",
				url: '',
				test: 0
			}
		},
		onLoad(e) {
			this.url = e.url;
			//#ifdef APP-PLUS
			this.updateApp();
			//#endif
		},
		components: {
			uniNavBar
		},
		methods: {
			updateApp: function() {
				//this.url = "http://114.215.141.225:9031/file/lastApp.apk";
				var dtask = plus.downloader.createDownload(this.url, {}, function(d, status) {
					if (status == 200) { // 下载成功
						var path = d.filename;
						uni.hideLoading();
						plus.runtime.install(path);
					} else { //下载失败
						uni.hideLoading();
						alert("Download failed: " + status);
					}
				});
				dtask.addEventListener("statechanged", this.onStateChanged, false);
				dtask.start();
			},
			onStateChanged: function(download, status) {
				if (download.state == 3 && status == 200) {
					this.percent = Math.ceil(download.downloadedSize * 100 / download.totalSize);
				}
			}
		}
	}
</script>
<style>
	progress {
		width: 96%;
	}

	.progress-box {
		display: flex;
		height: 50upx;
		margin-bottom: 60upx;
	}

	.progress-cancel {
		margin-left: 40upx;
	}
</style>
