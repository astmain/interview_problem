<template>

	<view class="content">
		<navigator url="../home/index"  open-type="navigateBack">
		    <button>test1</button>
		</navigator>
		
		
		<div class="class_header">
			<!-- <image style="width:50rpx;height:50rpx" src="/static/search.png"></image> -->
			<image  src="/static/search.png"></image>
			<div>{{title}}</div>
		</div>

		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view>
			1231
		</view>
		<view>
			33333
		</view>
		<view>
			44444
		</view>
		<view>
			555555
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				title: "搜索界面"
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>

</style>
