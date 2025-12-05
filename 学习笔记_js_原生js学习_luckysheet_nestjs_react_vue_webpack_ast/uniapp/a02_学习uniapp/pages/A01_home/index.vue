<template>
	<view class="page">
		<!-- 轮播图1 -->
		<A01_swiper></A01_swiper>
		<com_header_log text="标题_热门英雄" img="../../static/components/log.png" />
		<A02_swiper_x></A02_swiper_x>
		<com_header_log text="标题_热门视频" img="../../static/components/log.png" />
		<A03_swiper_x_video></A03_swiper_x_video>
		<com_header_log text="标题_猜你喜欢" img="../../static/components/log.png" />
		<A04_guess_you_like ref="A04_guess_you_like"></A04_guess_you_like>
	</view>
</template>

<script>
import com from '../../com/com.js';
export default {
	components: {
		A00_test: () => import('./A00_test'),
		A01_swiper: () => import('./A01_swiper'),
		A02_swiper_x: () => import('./A02_swiper_x'),
		A03_swiper_x_video: () => import('./A03_swiper_x_video'),
		A04_guess_you_like: () => import('./A04_guess_you_like')
	},
	data() {
		return {
			title: 'index',
			data_img_arr: [1, 2, 3, 4, 5],
			data_api_video: [1, 2, 3, 4, 5],
			d_day: '空时间'
		};
	},
	onLoad() {
		//#ifdef H5
		console.log('只在h5编译');
		//#endif
		//#ifdef APP-PLUS
		console.log('只在ios和android编译');
		//#endif
		//#ifdef MP
		console.log('只在小程序(微信、支付宝、百度)编译');
		//#endif
	},

	methods: {
		async test1() {
			// let config={}
			uni.request({
				url: 'http://127.0.0.1:9001/db_server_baidu?sql=select  *  from weixin',
				method: 'get',
				success: res => {
					console.log('test1', res);
				}
			});
		},
		async test2() {
			let res = await uni.request({ url: com.db_server_baidu + 'sql=select * from weixin', method: 'get' });
			// let res = await uni.request({ url:"http://8t983w.natappfree.cc/db_server_baidu?" + 'sql=select * from weixin', method: 'get' });

			console.log('test2', res);
			console.log('data', res[1].data.result.data);
			let result = res[1].data.result;
			this.d_day = result.day;
		},

		api_img() {
			let sql = '  Select  *  from 表图片';
			let that = this;
			console.log('666', sql);
			uni.request({
				url: com.shuju + 'api',
				data: { sql: sql, table: '表图片', arr: [], no: 5, shuju: [] },
				method: 'POST',
				success: res => {
					console.log('999', res);
					that.data_img_arr = res.data.arr;
				}
			});
		},
		api_video() {
			let that = this;
			let sql = '  Select  *  from 表视频';
			console.log('666', sql);
			uni.request({
				url: com.shuju + 'api',
				data: { sql: sql, table: '表视频', arr: [], no: 5, shuju: [] },
				method: 'POST',
				success: res => {
					console.log('999', res);
					that.data_api_video = res.data.arr;
				}
			});
		}
	},
	async onPullDownRefresh() {
		console.log('111>onPullDownRefresh:下拉刷新', 111);
		await this.$refs['A04_guess_you_like'].my_get_data()
		uni.stopPullDownRefresh();
	},
	mounted() {
		// this.按钮();
		let that = this;
		that.api_img();
		that.api_video();
	}
};
</script>

<style></style>
