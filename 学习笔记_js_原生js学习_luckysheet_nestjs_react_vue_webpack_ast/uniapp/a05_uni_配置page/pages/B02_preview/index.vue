<template>
	<view>
		<!-- <video class="w-350 h-220" :src="d_url_video" :poster="d_url_img" autoplay=false muted="true"    ></video> -->
		<video class="w-100p h-100p" :src="d_url_video" :poster="d_url_img"></video>
		<view class="fw-2 fz-20">名称:{{ d_name }}</view>
		<image class="m-20 w-200 h-270" :src="d_url_img" @click="my_preview(d_url_img)" aspectFit ></image>
		<image class="m-20 w-200 h-270" :src="d_url_img" aspectFit></image>
		<image class="m-20 w-200 h-270" :src="d_url_img" aspectFit></image>
		<image class="m-20 w-200 h-270" :src="d_url_img" aspectFit></image>
		<image class="m-20 w-200 h-270" :src="d_url_img" aspectFit></image>
		<image class="m-20 w-200 h-270" :src="d_url_img" aspectFit></image>
		<image class="m-20 w-200 h-270" :src="d_url_img" aspectFit></image>
		<image class="m-20 w-200 h-270" :src="d_url_img" aspectFit></image>
		<image class="m-20 w-200 h-270" :src="d_url_img" aspectFit></image>

	</view>
</template>

<script>
export default {
	data() {
		return {
			d_name: '',
			d_url_video: '',
			d_url_img: ''
		};
	},

	methods: {
		async my_get_data(id) {
			let sql = `select * from weixin where id=${id}`;
			let config = { url: this.api.db_server_baidu + 'sql=' + sql, method: 'get' };
			console.log('000>config:', config);
			let res = await uni.request(config);
			console.log('111>res:', res);
			let my_arr = res[1].data.result.data;
			console.log('222>d_arr:', this.d_arr);
			this.d_name = my_arr[0].name;
			this.d_url_video = my_arr[0].url_video;
			this.d_url_img = my_arr[0].url_img;
			// console.log('111>222:',this.d_url_img)
			// debugger
		},
		async my_set_nav_bar() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#000000'
			});
		}
	},

	async onLoad({ id }) {
		this.my_set_nav_bar();

		console.error('111>params:', id);
		this.my_get_data(id);
	},
	async created() {},
	async mounted() {}
};
</script>

<style lang="scss">
.class_search {
	position: fixed;
	top: 100;
	z-index: 99;
}
</style>
