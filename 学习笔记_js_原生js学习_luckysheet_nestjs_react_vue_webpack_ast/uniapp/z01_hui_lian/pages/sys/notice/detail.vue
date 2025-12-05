<template>
	<view>
		<uni-nav-bar title="公告内容">
			<view slot="right">
				<text @tap="showall" class="view-all">全部</text>
			</view>
		</uni-nav-bar>
<!-- 		<view style="padding:25rpx 12rpx;width:auto;" name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0 , maximum-scale=1.0, user-scalable=0">
			
			<view>
				<view>
					<text style="margin:0 auto;font-size:20px;font-weight:800;">{{article.Title}}</text>
				</view>
				
				<view>
					<view style="width:auto;margin:0 auto;">
						发布时间：<text>{{article.Addtime}}</text>
					</view>
				</view>
			</view>
			<view class="uni-padding-wrap">
				<wxParse :content="article.Articlecontent" />
			</view>
		</view> -->
		<web-view :src="url"></web-view>
	</view>
</template>
<script>
	
	import utils from '../../../common/utils.js';
	import marked from '../../../components/marked'
	import wxParse from '../../../components/mpvue-wxparse/src/wxParse.vue'
	import uniNavBar from "@/components/uni-nav-bar.vue";
	
	export default {
		data() {
			return {
				finished : false,
				article : {},
				url: '',
			}
		},
		components: {
			wxParse,
			uniNavBar
		},
		onLoad(e) {
			uni.showLoading({
				title: '正在加载...'
			});
			this.$http.doRequest(this.$http.apiUrl + '/System/GetGgDataV2', { id:e.id })
				.then((data) => {
					if (data.Result && data.Data) {
						this.url = data.Data;
						console.log(this.url);
						//let article = data.Data;
						//this.article = article;
					}
					else {
						utils.showToastMsg(data.Msg);
					}
				})  
				.catch((data) => {
					console.log(JSON.stringify(data));  
				})
				.finally(() => {
					this.finished = true;
					uni.hideLoading();
				});
			
			setTimeout(() => { 
				if(!this.finished) {
					uni.showLoading({
						title: '马上加载完成了'
					}); 
				}
				if(this.finished) {
					uni.hideLoading();
				}
			},3000);
			
		},
		onshow: function() {
			
		},
		methods: {
			adaptStandardHTML : function(oldHtml) {
				var stds = "a|abbr|b|blockquote|br|code|col|colgroup|dd|del|div|dl|dt|em|fieldset|h1|h2|h3|h4|h5|h6|hr|i|img|ins|label|legend|li|ol|p|q|span|strong|sub|sup|table|tbody|td|tfoot|th|thead|tr|ul";
				var regex = new RegExp("<(?!((" + stds + ")(\\s|>)))\\w+?(\\s|(?=>))","gi");
				var html = oldHtml.replace(regex,"<div ");
				
				//1. 需要api目录下有虚拟目录ueditor链接到web项目下的百度编辑器附件目录ueditor
				//2. 这里只替换img标签src属性值以"/"开头的路径
				regex = new RegExp("img src=\"/ueditor","gi");
				html = html.replace(regex,"img src=\"" + this.$http.baseUrl + "/ueditor");
				
				regex = new RegExp("</(?!((" + stds + ")(\\s|>)))\\w+?(\\s|(?=>))","gi");
				var stdHTML = html.replace(regex,"</div");
				return stdHTML;
			},
			showall: function() {
				uni.navigateTo({
					url: './list'
				});
			}
		},
		computed: {
			
		}
	} 
</script>
<style>
	
	img {
		width: 100px !important;
	}
	
	.view-all {
		color: #fff;	
		font-size: 30upx;
		margin-right: 12upx; 
	}
	
</style>
