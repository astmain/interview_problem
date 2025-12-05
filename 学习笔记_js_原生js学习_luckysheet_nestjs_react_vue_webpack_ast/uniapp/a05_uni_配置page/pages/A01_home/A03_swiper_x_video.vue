<template>
	<scroll-view class="w-100p" scroll-x="true" scroll-left="0">
		<view class="w-350 h-220 mr-20 mtbss-20" style="display:inline-block" v-for="(item, index) in d_arr_video" :key="index">
			<video class="w-350 h-220" :src="item.url_video"></video>
			<view class="mlr-20 f-hide">{{ item.name }}</view>
			<view class="mlr-20 flex-row between">
				<view class="fz-1 f-red-500">星级:{{ item.star }}</view>
				<view class="fz-1 f-blacks-500">评分:{{ item.score }}</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			d_arr_video: [1, 2, 3]
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
			this.d_arr_video = res[1].data.result.data;
			// debugger;
		}
	},
	async onLoad() {
		// this.test1()
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
