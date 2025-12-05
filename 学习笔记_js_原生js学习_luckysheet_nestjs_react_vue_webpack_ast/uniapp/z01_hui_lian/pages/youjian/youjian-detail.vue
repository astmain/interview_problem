<template>
	<view>
		<uni-nav-bar title="邮件信息">
			<view slot="right">
				<text class="iconfont icon-caidan search-box-btn" style="font-size: 50upx;" @tap="addTysq()"></text>
			</view>
		</uni-nav-bar>
		<view style="margin-bottom:20px;">
			<view>
				<fold-item title="基本信息" class="override-fold-item" :show="true">
					<view class="item">
						<view class="item-label">主题</view>
						<view class="item-value">{{model.Main.Bt0000}}</view>
					</view>
					<view class="item">
						<view class="item-label">发件人</view>
						<view class="item-value">{{model.Main.Fsrxm0}}</view>
					</view>
					<view class="item">
						<view class="item-label">收件人</view>
						<view class="item-value">{{extend.receivers}}</view>
					</view>
					<view class="item" v-if="view.sbox">
						<view class="item-label">抄送</view>
						<view class="item-value">{{extend.receiversCs}}</view>
					</view>
					<view class="item">
						<view class="item-label">时间</view>
						<view class="item-value">{{model.Main.Fssj00}}</view>
					</view>
				</fold-item>
				<fold-item title="接收情况" class="override-fold-item" :show="false">
					<view class="r-table">
						<view class="tr">
							<view class="td col-1">收件人</view>
							<view class="td col-2">接收状态</view>
							<view class="td col-3">时间</view>
						</view>
						<view class="tr" v-for="(item,key) in extend.mailState" :key="key">
							<view class="td col-1">{{item.name}}</view>
							<view class="td col-2">{{item.state}}</view>
							<view class="td col-3">{{item.time}}</view>
						</view>
					</view>
				</fold-item>
				<fold-item title="附件信息" :show="false">
					<!-- 有关联ID就不需要附件类型了 -->
					<file-list :Zbid00="id" :op-type="0" Fjlx00="YOUJIAN">
					</file-list>
				</fold-item>
			</view>
			<fold-item title="邮件内容" class="override-fold-item">
				<view style="padding:0 2%;">
					<wxParse :content="model.Content"/>
				</view>
			</fold-item>
		</view>
		
		<popMenu :menuShow="menuShow"  positionLeft="590" positionTop="320" arrowPosition="tipArrow-top" :menuList="menuList"
			@menuTap="menuTap" @menuClosed="menuClosed"></popMenu>
	</view>
</template>
<script>
	
	import utils from '../../common/utils.js';
	import marked from '../../components/marked'
	import wxParse from '../../components/mpvue-wxparse/src/wxParse.vue'
	import uniNavBar from "@/components/uni-nav-bar.vue";
	import foldItem from '../../components/fold-item.vue';
	import fileList from '../../components/file-list.vue';
	import popMenu from '../../components/pop-menu.vue';
	
	
	export default {
		data() {
			return {
				id: '',
				from: '',
				finished : false,
				model: {
					Main: {},
					Content: '',
					ReceivedUsers: []
				},
				extend: {
					mailState: [],
					receivers: "",
					receiversCs: ""
				},
				view: {
					sbox: false,
					rbox: false
				},
				menuShow: false,
				menuList: [
					{
						menuName: '新建',
						menuIcon: 'icon-zhongmingming'
					},
					{
						menuName: '回复',
						menuIcon: 'icon-chakantiezihuifu'
					},
					{
						menuName: '转发',
						menuIcon: 'icon-zhuanfa' 
					}
				]
			}
		},
		components: {
			wxParse,
			uniNavBar,
			foldItem,
			fileList,
			popMenu
		},
		onLoad(e) {
			this.id = e.id;
			this.from = e.from;
			if(this.from === 'sb') { 
				this.view.sbox = true;
			}
			else if(this.from === 'rb') {
				this.view.rbox = true;
			}
			
			this.$http.doRequest(this.$http.apiUrl + '/Youjian/QueryMailDetail', { 
				id:this.id,
				userId: utils.getUserId()
			}).then((data) => {
				if (!data.Result) { utils.showToastMsg(data.Msg); }
				
				this.EventBus.fire("reloadYoujianList");	//通知刷新列表
				
				data.Data = data.Data || {};
				data.Data.Main = data.Data.Main || {};
				data.Data.Content = data.Data.Content || '';
				data.Data.ReceivedUsers = data.Data.ReceivedUsers || [];
				this.model = data.Data;
				this.model.Content = unescape(this.model.Content);
				
				let receivers = this.model.ReceivedUsers;
                if (receivers.length === 0) { return; }
				let rs = "";
				let rscs = "";
                for (var item in receivers) {
					this.extend.mailState.push({
						rid: receivers[item].ReceivedId,
						name: receivers[item].ReceivedName,
						state: this.decideSate(receivers[item]),
						time: receivers[item].Xgsj00
					});
					
                    if (receivers[item].Type === "发送") {
                        rs += (receivers[item].ReceivedName + ',');
                    }
					else if (receivers[item].Type === "抄送") {
                        rscs += (receivers[item].ReceivedName + ',');
                    }
                }
				this.extend.receivers = rs;
				this.extend.receiversCs = rscs;
			}).catch((data) => {
				console.log(data);  
			});
		},
		methods: {
			decideSate:function(item) {
				if (item.State === 1) {
					return "未接收";
				}
				else if (item.State === 2) {
					return "已接收";
				}
				else {
					return "";
				}
			},
			addTysq: function() { //通用申请
				this.menuShow = true;
			},
			menuTap: function(value) {
				let that = this;
				that.menuShow = false;
				let rs = this.extend.mailState;
				let rids = '';
				let rnames = '';
				
				for(let i = 0; i < rs.length; i++) {
					rids += (rs[i].rid + ',');
					rnames += (rs[i].name + ',');
				}
				rids = rids.substr(0, rids.length - 1);
				rnames = rnames.substr(0, rnames.length - 1);
				switch (value) {
					case 0: 
						setTimeout(function() {
							uni.navigateTo({
								url: './youjian-add'
							})
						}, 200);
						break;
					case 1:
						setTimeout(function() {
							uni.navigateTo({
								url: './youjian-add?from=reply&replyId=' + that.id
									+ "&replyTitle=" + that.model.Main.Bt0000
									+ "&rid=" + that.model.Main.Fsrid0
									+ "&rids=" + rids
									+ "&rname=" + that.model.Main.Fsrxm0
									+ "&rnames=" + rnames
							})
						}, 0);
						break;
					case 2:
						setTimeout(function() {
							uni.navigateTo({
								url: './youjian-add?from=transfer&replyId=' + that.id
									+ "&replyTitle=" + that.model.Main.Bt0000
									+ "&rid=" + that.model.Main.Fsrid0
									+ "&rids=" + rids
									+ "&rname=" + that.model.Main.Fsrxm0
									+ "&rnames=" + rnames
							})
						}, 0);
						break;
					default:
						break;
				}
			},
			menuClosed: function() {
				this.menuShow = false;
			}
		},
		computed: {
			
		}
	} 
</script>
<style>
	
	.font {
		font-size: 46upx;
	}
	
	.override-fold-item {
		margin-top: -20upx;
	}
	
	.item {
		display: inline-block;
	}
	
	.item-label {
		display: inline-block;
		width: 150upx;
		font-size: 30upx;
		font-weight: bold;
		padding-left: 24upx;
		vertical-align: top;
	}
	
	.item-value {
		display: inline-block;
		width: 520upx;
		font-size: 30upx;
	}
	
	.r-table {
		margin-left: 40upx;
		margin-top: 10upx;
		display:table;  
		border-collapse:collapse;  
	}
	
	.tr {
		padding: 0px !important;
		margin: 0px !important;
	}
	
	.td {
		display:table-cell;
		padding: 12upx;
		border: solid 1px #333;
	}
	
	.col-1 {
		width: 140upx;
	}
	
	.col-2 {
		width: 120upx;
	}
	
	.col-3 {
		width: 320upx;
	}
	
</style>
