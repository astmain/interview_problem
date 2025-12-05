<template>
	<view class="page class_style">
		<div>a00_test</div>

		<!-- <view class="class_red" style="width: 375px;height: 375px;">222</view> -->
		<view class="class_red" style="width: 750upx;height: 750upx;">222</view>
			<navigator url="../search/index" open-type="switchTab">
		<!-- <navigator url="../search/index" open-type="navigate"> -->
		<!-- <navigator url="../search/index" open-type="redirect"> -->
		<!-- <navigator url="../search/index" open-type="switchTab"> -->
		<!-- <navigator open-type="navigateBack"> -->
			<view>i am navigator</view>
		</navigator>

		<!-- #ifdef H5 -->
		<div>只在h5编译</div>
		<button type="default" @click="my_test1()">my_test1</button>
		<button type="default" @click="my_test2">my_test2</button>
		<div>时间:{{ d_day }}</div>
		<!-- #endif  -->
		<!-- #ifdef APP-PLUS -->
		<div>只在ios和android编译</div>
		<button type="default" @click="my_test1()">my_test1</button>
		<button type="default" @click="my_test2()">my_test2</button>
		<div>时间:{{ d_day }}</div>
		<!-- #endif  -->
		<!-- #ifdef MP -->
		<div>只在小程序(微信、支付宝、百度)编译</div>
		<button type="default" @click="my_test1()">my_test1</button>
		<button type="default" @click="my_test2()">my_test2</button>
		<div>时间:{{ d_day }}</div>
		<!-- #endif  -->
	</view>
</template>

<script>

export default {
	components: {},
	data() {
		return {
			d_title: '标题',
			d_day: '空时间',
			d_url: 'sss'
		};
	},

	methods: {
		async my_test1() {
			// let config={}
			uni.request({
				url: 'http://127.0.0.1:9001/db_server_baidu?sql=select  *  from weixin',
				method: 'get',
				success: res => {
					console.log('test1', res);
				}
			});
		},
		async my_test2() {
			let config = { url: com.db_server_baidu + 'sql=select * from weixin', method: 'get' };
			console.log('000>config:', config);
			let res = await uni.request(config);
			// let res = await uni.request({ url:"http://8t983w.natappfree.cc/db_server_baidu?" + 'sql=select * from weixin', method: 'get' });
			console.log('test2', res);
			console.log('data', res[1].data.result.data);
			let result = res[1].data.result;
			this.d_day = result.day;
			console.log('111>222:', result.day);
			console.log('111>222:', this.d_day);
		}
	},
	onLoad() {},
	created() {},
	mounted() {}
};
</script>

<style>
.class_style {
	border: 1upx red solid;
}

.class_red {
	background: red;
}
</style>
