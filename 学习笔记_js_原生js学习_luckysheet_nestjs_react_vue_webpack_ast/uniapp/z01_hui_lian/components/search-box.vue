<template>
	<!-- 	<view class="search">
		<view class="search_arr">
			<icon size='20' type='search'></icon>
			<input placeholder="请输入关键字" @input="inputChange" />
		</view>
	</view> -->

	<view class="search-box">
		<view class="grace-search-in">
			<view class="icons grace-icons icon-search"></view>
			<input style="width: 100%;margin-top:-4px;" type="search" @input="inputChange" placeholder="请输入关键字" v-model="searchKey"></input>
			<view class="icons grace-icons icon-close" @tap.stop="clearKey" v-if="searchClose"></view>
		</view>
		<slot></slot> 
	</view>
</template>

<script>
	export default {
		data: function() {
			return {
				searchClose: false,
				searchKey:'',
			}
		},
		model: {
			// prop: 'searchKey',
			event: 'remoteSearch'
		},
		// props: {
		// 	searchKey: {
		// 		type: String,
		// 		default: ''
		// 	}
		// },
		methods: {
			inputChange: function(val) {
				var key = val.detail.value;
				if (key.length >= 1) {
					this.searchClose = true;
				} else {
					this.searchClose = false;
				}

				if (this.timer) {
					clearTimeout(this.timer);
				}
				if (val) {
					this.timer = setTimeout(() => {
						this.$emit('remoteSearch', val.detail.value);
					}, 800)
				} else {
				}
			},
			clearKey: function() {
				this.searchClose = false;
				this.searchKey = "";
				this.$forceUpdate();
				this.$emit('remoteSearch', '');
			}
		}
	}
</script>
<style>
	/*搜索*/
	.search-box {
		height: 70upx;
		width: 100%;
		padding-top: 20upx;
		padding-bottom: 20upx;
		background: linear-gradient(#1d96f0, #6ab9f4);
		position: fixed;
		z-index: 1000;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/*水平居中*/
	}

	.grace-search-in {
		flex: 1;
		margin: 0upx 25upx;

		/* padding: 0upx 20upx; */
	}
	
		.grace-gtbg-blue22{background: linear-gradient(#1d96f0, #6ab9f4);}
</style>
