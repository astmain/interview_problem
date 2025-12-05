<template>
	<view 	style="background-color:#999999;">
		<view class="class_warper" style="margin-top:12upx; padding:20upx; display:flex;flex-direction:row;">
			<!-- 图标 -->
			<image style="height: 30upx;width: 30upx;" :src="url_img_log"></image>
			<!-- 星星 -->
			<!-- <div v-for="(item, index) in num_img_ok"><image style="height: 30upx;width: 30upx;" :src="url_img_ok"></image></div> -->
			<!-- <div v-for="(item, index) in num_img_no"><image style="height: 30upx;width: 30upx;" :src="url_img_no"></image></div> -->

			<!-- <span>{{ num }}</span> -->
			<!-- 标题 -->
			<span style="font-size: 20px; margin-left: 20upx; font-weight: bold;">{{ text }}</span>
			<!-- <span>{{ url_img }}</span> -->
		</view>
	</view>
</template>

<script>
export default {
	props: {
		num: { default: 0 },
		text: { default: '默认标题' },
		url_img_log: { default: '../../static/components/log.png' },
		url_img_ok: { default: '../../static/components/star_ok.png' },
		url_img_no: { default: '../../static/components/star_no.png' },
		num_img_ok: { default: 0 },
		num_img_no: { default: 0 }
	},
	data() {
		return {};
	},
	onLoad() {},

	mounted() {},
	methods: {},
	created() {}
};
</script>

<style>
.class_warper {
	display: flex;
	flex-direction: row;
	/*垂直居中*/
	align-items: center;
	/*水平居中*/
	/* justify-content: center; */
}
</style>
