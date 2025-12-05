<template>
	<!--组件swiper          https://uniapp.dcloud.net.cn/component/swiper.html      -->
	<!-- 轮播图 -->
	<view class=".class_page">
		<button type="default" @click="my_test1()">my_test1</button>
		<swiper class="class_img" :indicator-dots="true" :autoplay="true" :interval="1000">
			<swiper-item class="" v-for="(item, index) in d_arr_img" :key="index"><image class="class_img" :src="item.url_img" mode=""></image></swiper-item>
		</swiper>
	</view>
</template>

<script>


export default {
	components: {

	},
	data() {
		return {
			d_arr_img: [1, 2, 3, 4, 5]
		};
	},

	methods: {
		async my_test1() {
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
			this.d_arr_img = res[1].data.result.data;
		}
	},
	async onLoad() {
		await this.my_test1();
	},
	async created() {
		await this.my_test1();
	},
	async mounted() {
		await this.my_test1();
	}
};
</script>

<style>
.class_img {
	width: 100%;
	height: 440upx;
	/* display:flex; */
	/*水平居中*/
	/* justify-content: center; */
	/*垂直居中*/
	/* align-items: center; */
}
</style>
