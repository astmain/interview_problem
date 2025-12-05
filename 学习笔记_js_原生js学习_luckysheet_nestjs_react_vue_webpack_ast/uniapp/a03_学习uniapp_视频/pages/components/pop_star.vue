<template>
	<view class="page">
		<div>
			<image style="height: 30upx;width: 30upx;" v-for="(item, index) in data_yellow" src="../../static/image/star-yellow.png"></image>
			<image style="height: 30upx;width: 30upx;" v-for="(item, index) in data_gray" src="../../static/image/star-gray.png"></image>
			<span style="margin-left: 10upx; font-size: 30upx;">{{ pop_star }}</span>
		</div>
	</view>
</template>

<script>
export default {
	props: {
		pop_star: {
			default: 0
		}
	},
	data() {
		return {
			data_yellow: 0,
			data_gray: 0
		};
	},
	onLoad() {},

	mounted() {

	},
	methods: {},
	created() {
		this.data_yellow =  parseInt( this.pop_star)
		this.data_gray = 5 -parseInt( this.pop_star)
	}
};
</script>

<style>
	span{
		color: rgb(140, 140, 143)
	}
</style>
