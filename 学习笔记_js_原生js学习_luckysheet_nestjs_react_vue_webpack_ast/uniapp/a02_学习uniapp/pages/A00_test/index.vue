<template>
	<view class="page">
		<div>A00_test</div>

		<input
			type="text"
			style="background: red; height: 100upx;"
			@input="change"
			@focus="focus"
			@blur="blur"
			@confirm="confirm"
			@tap="tap"
			@click="click"
			@longpress="longpress"
			@touchstart="touchstart"
			@touchend="touchend"
			@touchmove="touchmove"
			@touchcancel="touchcancel"
		/>

		<!-- 不推荐使用了 -->
		<!-- @longtap="longtap" -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '测试页面'
		};
	},
	onLoad() {},
	methods: {
		async test1() {
			console.log('111>222:', 111);
		},
		async change(e) {
			console.log('111>change:内容改变', e.detail.value);
		},
		async focus() {
			console.log('111>focus:焦点得到', 111);
		},
		async blur() {
			console.log('111>blur:焦点失去', 111);
		},
		async confirm() {
			console.log('111>confirm:回车键', 111);
		},

		async click() {
			console.log('111>click:点击', 111);
		},
		async tap() {
			console.log('222>tap:手机端tap组件被触摸', 111);
		},

		async longpress() {
			console.log('222>longpress:长时间按压', 111);
		},
		// async longtap() {
		// 	console.log('222>longtap:长时间触摸', 111);
		// }

		// 触摸-------------------
		async touchstart() {
			console.log('333>touchstart:触摸开始', 111);
		},
		async touchend() {
			console.log('333>touchend:触摸结束', 111);
		},
		async touchmove() {
			console.log('333>touchmove:触摸手指移动', 111);
		},

		async touchcancel() {
			console.log('333>touchcancel:触摸被打断', 111);
		},
	}
};
</script>

<style></style>
