<template>
	<view style="width:750upx;padding-top:10upx;">
		
		<view v-if="title" class="grace-title grace-nowrap grace-space-between" style="margin-top:30upx;background-color: #ebf7f9;" @tap="switchTag">
			<view class="form-label">
				<text class='iconfont icon-line form-line-btn'></text>
				<view class="grace-h5 grace-blod fold-bold">{{title}}</view>
			</view>
			<view :class="['iconfont','form-ss-btn',{'icon-xla' : isShow, 'icon-ssuo': !isShow }]" style="font-size: 30upx;"></view>
		</view>
		<view v-show="isShow">
			<slot></slot>
		</view>
	</view>
</template>
  
<script>
	
	export default {
		data() {
			return {
				isShow : true,
			};
		},
		props: {
			show: {
				default(){
					return true;
				}
			},
			title: {
				type: String,
				default(){
					return '';
				}
			},
		},
		watch: {
			show: { 
				immediate: true,
				handler(val, oldVal) {
					this.isShow = val;
				} 
			}
		},
		methods: {
			switchTag: function() {
				this.isShow = !this.isShow;
			}
		}
	}
</script>
<style>
	.fold-bold {
		font-weight: bold;
	}
</style>
