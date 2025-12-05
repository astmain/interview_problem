<template>
	<view>
		<view class="m-10" v-for="(item, index) in d_arr" :key="index">
			<view class="flex-row between">
				<!-- <image class="w-100p" :src="item.url_img"/> -->
				<view class="w-200 "><image class="w-200 h-270" :src="item.url_img" /></view>
				<view class="w-200 flex-col between">
					<view class="fw-2 fz-20">名称:{{ item.name }}</view>
					<view>等级:{{ item.star }}</view>
					<view>评分:{{ item.score }}</view>
					<view>上映时间:{{ item.time_create }}</view>
					<view>片长:{{ item.time_video }}</view>
				</view>
				<view class="w-420 flex-col x y ">
					<view class="fw-2 fz-20">点赞</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			d_arr: [1, 2, 3]
		};
	},

	methods: {
		async my_get_data() {
			//网络请求组件 https://uniapp.dcloud.net.cn/api/request/request.html
			let config = { url: this.api.db_server_baidu + 'sql=select * from weixin', method: 'get' };
			console.log('000>config:', config);
			let res = await uni.request(config);
			// let res = await uni.request({ url:"http://8t983w.natappfree.cc/db_server_baidu?" + 'sql=select * from weixin', method: 'get' });
			console.log('test2', res);
			console.log('data', res[1].data.result.data);
			let result = res[1].data.result;
			this.d_day = result.day;
			console.log('111>222:', result.day);
			console.log('111>222:', this.d_day);
			this.d_arr = res[1].data.result.data;
			// debugger;
		}
	},
	async onLoad() {
		// this.test1()
	},
	async onPullDownRefresh() {
		this.my_get_data();
	},
	async created() {
		// this.test1()
	},
	async mounted() {
		this.my_get_data();
	}
};
</script>

<style></style>
