<template>
	<view>
		<view style="background: navajowhite">
			<view class="f-xy">我的标题</view>
			<!-- 用户信息 -->
			<view v-if="d_isok_login" class="m-20 flex-row between">
				<image class="w-100 h-100" src="../../static/logo.png" mode="" aspectFit />
				<view class="flex-col w-300">
					<view>用户名:</view>
					<view>ID:</view>
					<view>1</view>
				</view>
				<view class="w-100 h-100">设置</view>
			</view>

			<view v-else class="m-20 flex-row between">
				<image class="w-100 h-100" src="../../static/logo.png" mode="" aspectFit />
				<view class="flex-col w-300">
					<view @click="my_run_d_show_login">登陆/注册</view>
					<view>.</view>
					<view>2</view>
				</view>
				<view class="w-100 h-100">设置</view>
			</view>
		</view>

		<!-- 注册 -->
		<view v-if="d_show_login" class="m-100">
			<uni-forms ref="form" :modelValue="d_formData">
				<uni-forms-item name="user_name" label="账号"><uni-easyinput v-model="d_formData.user_name" type="text" placeholder="账号/手机" /></uni-forms-item>
				<uni-forms-item name="pass_word" label="密码"><uni-easyinput v-model="d_formData.pass_word" type="text" placeholder="密码" /></uni-forms-item>
				<!-- <uni-forms-item name="pass_word" label="密码"><uni-easyinput v-model="d_formData.pass_word" type="password" placeholder="密码" /></uni-forms-item> -->
				<view class="flex-row ">
					<button class="w-200  bg-green-800 f-gray-100" @click="my_login()">登陆</button>
					<button class="w-200 bg-blue-100" @click="my_register()">注册</button>
				</view>
			</uni-forms>
		</view>
	</view>
</template>

<script>


// const BUS = (require('../../store_pinia/BUS.js').default)()
export default {
	data() {
		return {
			d_isok_login: false,
			d_show_login: false,
			d_formData: {
				user_name: '15160315110',
				pass_word: 'uuuuuu123456U.'
			}
		};
	},

	methods: {
		async my_login() {
			console.log('111>d_formData:', this.d_formData);

		},
		async my_run_d_show_login() {
			this.d_show_login = !this.d_show_login;
			// console.log('111>BUS:',BUS.A03_me)
			console.log('222>BUS:',this.BUS.A03_me)
		},
		async my_register() {
			console.log('111>d_formData:', this.d_formData);
		}
	},

	async onLoad() {},
	async created() {},
	async mounted() {}
};
</script>

<style lang="scss">
.class_header {
	// background: url("https://img2.doubanio.com/view/photo/s_ratio_poster/public/p480747492.webp") repeat;
	background: navajowhite;
	// display: flex;
	// flex-direction: row;
	// justify-content: flex-start;

	// 		//#ifdef H5
	// 		console.log('只在h5编译');
	// 		//#endif
	// 		//#ifdef APP-PLUS
	// 		console.log('只在ios和android编译');
	// 		//#endif
	// 		//#ifdef MP
	// 		console.log('只在小程序(微信、支付宝、百度)编译');
	// 		//#endif
}
</style>
