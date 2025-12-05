<template>
	<view>
		
	<!-- 	<me-preview-word  :docUrl="docUrl"></me-preview-word> -->
		<web-view :src="docUrl"></web-view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar.vue";
	import utils from '../../common/utils.js'
	
	export default {
		data() {
			return {
				title: 'Hello',
				docUrl:'http://view.xdocin.com/doc/preview.docx'
			}
		},
		components:{
			uniNavBar,
		},
		onLoad(option) {
			var otherParam = '';
			if(option.share){
				otherParam = "&share=true";
			}
			this.docUrl = "http://114.215.141.225:9005/pages/Article/Preview.aspx?id=" + option.id + 
			"&sys="+this.$http.syscode+"&username=" + utils.getTrueName() + 
			otherParam;
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
