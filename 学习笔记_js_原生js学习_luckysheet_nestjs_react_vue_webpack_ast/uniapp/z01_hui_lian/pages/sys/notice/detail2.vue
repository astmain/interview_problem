<template>
	<view>
		<uni-nav-bar title="公告内容" >
			<view slot="right">
				<text  class="view-all"  @tap="allgg()"  >全部</text>
			</view>
		</uni-nav-bar>
		<jyf-parser :domain="domain" gesture-zoom lazy-load ref="article" selectable show-with-animation
		 use-anchor :html="html" @linkpress="linkpress">加载中...</jyf-parser>
	</view>
</template>
<script>
	import utils from '../../../common/utils.js';
	import uniNavBar from "@/components/uni-nav-bar.vue";
	import parser from '@/components/jyf-parser/jyf-parser';

	export default {
		data() {
			return {
				article: {},
				html: '',
				domain: '',
				finished: false
			}
		},
		components: {
			'uniNavBar': uniNavBar,
			'jyf-parser': parser
		},
		onLoad(e) {
			uni.showLoading({
				title: '正在加载...'
			});
			this.$http.doRequest(this.$http.apiUrl + '/System/GetGgData', {
					id: e.id
				})
				.then((data) => {
					if (data.Result && data.Data) {
						this.domain = data.Extend || '';
						this.article = data.Data;
						this.html = data.Data.Articlecontent
					} else {
						utils.showToastMsg(data.Msg);
					}
				})
				.catch((data) => {
					console.log(JSON.stringify(data));
				})
				.finally(() => {
					this.finished = true;
					uni.hideLoading();
				});

			setTimeout(() => {
				if (!this.finished) {
					uni.showLoading({
						title: '马上加载完成了'
					});
				}
				if (this.finished) {
					uni.hideLoading();
				}
			}, 3000);

		},
		onshow: function() {

		},
		methods: {
			linkpress(e) {
				console.log('linkpress', e);
				uni.downloadFile({
					url: this.domain + e.href,
					success: function(res) {
						uni.openDocument({
							filePath: res.tempFilePath,
							success: function(res) {}
						});
					}
				})
			},
			allgg: function() { //
			   uni.navigateTo({
			   	url: './list'
			   });
			},
		},
		computed: {

		}
	}
</script>
<style>
	img {
		width: 100px !important;
	}

	.view-all {
		color: #fff;	
		font-size: 30upx;
		margin-right: 12upx;
	}
</style>
