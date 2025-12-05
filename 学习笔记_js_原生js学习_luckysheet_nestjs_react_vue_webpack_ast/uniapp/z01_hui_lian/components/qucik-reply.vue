<template name="qucik-reply">
	<view style="margin-top: 0;">
		<view class="grace-banner" v-if="bannerShow" @touchmove.stop.prevent=";"
			style="background:#f9f9f9; z-index: 99999999;" >
			<view style="
			z-index: 99999998;
			top: 0;
			left: 0;
			width: 100%;
						
			display: flex;
			flex-direction: row; 
			align-items: center;
			font-size: 50upx;
			justify-content:center;
			background: #46A4DA;
			color:#FFFFFF ;">
				<view style="display: flex;flex: 9;justify-content:center;font-size: 40upx;">
					选择快捷回复
				</view>
				<view class='icons grace-icons icon-close' style="display: flex;flex: 1;color: #e66363;font-size: 50upx;" @tap="closeThis"></view>
			</view>
			<scroll-view scroll-y="true" style="height: 800upx;overflow: hidden;">
				
				<view class="tab-list" style="margin-top: 0upx; ">
					<checkbox-group @change="checkboxChange" name="CodeValues">
						<view class="grace-news-list">
							<view v-for="(item,key) in listData" :key="key" class="garace-hl-list" @click="chooseThis(item)">
								<view class="grace-news-list-items">
									<checkbox :value="item.Codenote" v-if="!isSingle" />
									<view class="grace-news-list-title">
										<view class="grace-news-list-title-main">{{item.Codenote}}</view>
									</view>
								</view>
							</view>
						</view>
					</checkbox-group>
				</view>
				<view v-if="!isSingle" style="width: 100%;justify-content: center;display: flex;align-items: center; ">
					<button formType="submit" class="btn-primary" style="width: 40%;height: 90upx;font-size: 35upx;">完成</button>
				</view>
			</scroll-view>
		</view>
		<view class="grace-mask" v-if="bannerShow" @touchmove.stop.prevent=";"></view>
	</view>
</template>
<script>
	import utils from '../common/utils.js'
	export default {
		name: "qucik-reply",
		data() {
			return {
				listData: []
			}
		},
		props: {
			bannerShow: {
				type: Boolean,
				default: false
			},
			codeSource: {
				type: String,
				default: 'qucikReply'
			},
			codeType: {
				type: String,
				default: '必须传值啊啊啊啊'
			},
			isSingle: {
				type: Boolean,
				default: true
			}
		},
		created() {
			this.$nextTick(function() {
				this.getListData();
			})
		},
		mounted: function() {
			//#ifdef H5
			this.$nextTick(function() {
				this.getListData();
			})
			//#endif
		},
		methods: {
			getListData: function() {
				if (this.codeSource == 'qucikReply') {
					this.getQuickReply();
				} else if (this.codeSource == 'Code') {
					utils.getCode(this.codeType)
						.then(data => {
							if (data && data.length > 0) {

								this.listData = data;
							} else {
								this.listData = [{
									'Codenote': '请先设置快捷回复'
								}];
							}
						});
				}
			},
			getQuickReply: function() {
				this.$http.doRequest(this.$http.apiUrl + '/System/GetReply', {
					UserID: utils.getUserId()
				}).then((data) => {
					if (data.Data && data.Data.length > 0) {
						this.listData = data.Data;
					} else {
						this.listData = [{
							'Codenote': '请先设置快捷回复'
						}];
					}
				}).catch((data) => {
					console.log('获取快速回复发生异常');
				});
			},
			chooseThis: function(item) {
				if (this.isSingle == true)
					this.$emit('qrChoosed', item.Codenote);
			},
			closeThis: function() {
				this.$emit('closed', '');
			},
			checkboxChange: function(e) {
				console.log('checkbox发生change事件，携带value值为：' + e.detail.value)
			},
			formSubmit: function(e) {
				console.log(e.detail.value);
				var value = '';
				if (e.detail.value.CodeValues && e.detail.value.CodeValues.length > 0) {
					e.detail.value.CodeValues.forEach(v => {
						console.log(v);
						value += v + '\n';
					});
					this.$emit('qrChoosed', value);
				}
			}
		}
	}
</script>
<style scoped>
	/* 弹出层形式的广告 */
	.grace-banner {
		width: 90%;
		position: fixed;
		left: 50%;
		top: 50%;
		background: #FFF;
		border-radius: 10upx;
		z-index: 99999997;
		transform: translate(-50%, -50%);
	}
	
	/* 遮罩层 */
	.grace-mask{background:rgba(0, 0, 0, 0.6); position:fixed; width:100%; height:100%; left:0; top:0; z-index:99999996;}

.grace-news-list {
     padding:0;
}

	
</style>
