<template>
	<view class="class_warper" style="background-color:#999999;margin-top:12upx; padding:20upx;">
		<!-- 图标 -->
		<image style="height: 30upx;width: 30upx;" :src="img"></image>
		<!-- 标题 -->
		<span style="font-size: 20px; margin-left: 20upx; font-weight: bold;">{{ text }}</span>
	</view>
</template>

<script>
export default {
	props: {
		num: { default: 0 },
		text: { default: '默认标题' },
		img: { default: '../../static/components/log.png' },
	
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
