<template>
	<!--组件swiper https://uniapp.dcloud.net.cn/component/swiper.html -->
	<!-- 轮播图_x -->

	<view class="">
		<scroll-view class="w-100p" scroll-x="true" @scroll="scroll" scroll-left="0">
			<view class="w-200 h-300 m-10" style="display:inline-block"   v-for="(item,index) in d_arr_img"   :key="index">
				<image class="w-200 h-270" :src="item.url_img"></image>
				<view class="fw-2 f-hide">{{item.name}}</view>
				<view class="flex-row between">
					<view class="fz-1 f-red-500">星级:{{item.star}}</view>
					<view class="fz-1 f-blacks-500">评分:{{item.score}}</view>
				</view>
			</view>
		</scroll-view>
		
		

<!-- 		<scroll-view class="flex-nowrap w-100p" scroll-x="true" @scroll="scroll" scroll-left="0">
			<view class="w-200 h-300 m-10" style="display:inline-block">
				<image class="w-200 h-270" src="https://img2.doubanio.com/view/photo/s_ratio_poster/public/p480747492.webp"></image>
				<view class="fw-2 f-hide">肖恩克的救赎1233455</view>
				<view class="flex-row between">
					<view class="fz-1 f-red-500">星级:5</view>
					<view class="fz-1 f-blacks-500">评分:9.7</view>
				</view>
			</view>
		</scroll-view> -->
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			d_arr_img:[1,2,3],
			
			
			scrollTop: 0,
			old: {
				scrollTop: 0
			}
		};
	},

	methods: {
		upper: function(e) {
			console.log(e);
		},
		lower: function(e) {
			console.log(e);
		},
		scroll: function(e) {
			console.log('111>scroll:', e);
			this.old.scrollTop = e.detail.scrollTop;
		},
		goTop: function(e) {
			// 解决view层不同步的问题
			this.scrollTop = this.old.scrollTop;
			this.$nextTick(function() {
				this.scrollTop = 0;
			});
			uni.showToast({
				icon: 'none',
				title: '纵向滚动 scrollTop 值已被修改为 0'
			});
		},
		async test1() {
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
		// this.test1()
	},
	async created() {
			// this.test1()
	},
	async mounted() {
		this.test1()
	}
};
</script>

<style></style>
