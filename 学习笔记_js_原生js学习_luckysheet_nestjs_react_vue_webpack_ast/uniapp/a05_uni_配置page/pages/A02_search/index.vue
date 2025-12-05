<template>
	<!--    uni组件      https://uniapp.dcloud.net.cn/component/uniui/uni-drawer.html -->
	<view>
		<uni-easyinput class="class_search bg-gray-100" suffixIcon="search" v-model="d_value" placeholder="请输入内容" @iconClick="my_iconClick"></uni-easyinput>
		<!-- <view class="h-500">1</view> -->
		<!-- <view style="flex-flow:row wrap;   display:flex ;flex-direction: row;   ;width:100%" class="" v-for="(item, index) in d_arr" :key="index"> -->
		<!-- <view class="flex-row  between pt-300 mt-120" style=" justify-content: flex-start;flex-flow:row wrap;padding-top: 100upx;"> -->
		<view class="flex-row  between pt-300 mt-120" style=" justify-content:flex-start;flex-wrap:wrap;padding-top: 100upx;">
			<view v-for="(item, index) in d_arr" :key="index">
				<view class="ml-20 mr-20 w-200 h-370">
					<image class="w-200 h-270" :src="item.url_img"></image>
					<view class="f-hide">名称:{{ item.name }}</view>
					<view class="f-hide" @click="my_go(item.id)">观看</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			d_value: '1',
			d_arr: []
		};
	},

	methods: {
		async my_get_data() {
			//网络请求组件 https://uniapp.dcloud.net.cn/api/request/request.html
			let sql = `select * from weixin where name like "%${this.d_value}%"`;
			let config = { url: this.api.db_server_baidu + 'sql=' + sql, method: 'get' };
			console.log('000>config:', config);
			let res = await uni.request(config);
			console.log('111>res:', res);
			this.d_arr = res[1].data.result.data;
			console.log('222>d_arr:', this.d_arr);
		},

		async my_iconClick(type) {
			console.log('111>222:', type);
			uni.showToast({ title: `哈哈哈`, icon: 'none' });
			await this.my_get_data();
		},

		async my_go(id) {
			uni.navigateTo({ url: `../B01_info/index?id=${id}` });
			console.log('111>222:', 111);
		}
	},

	async onLoad() {},
	async created() {},
	async mounted() {
		await this.my_iconClick();
	}
};
</script>

<style lang="scss">
.class_search {
	position: fixed;
	top: 100;
	z-index: 99;
}
</style>
