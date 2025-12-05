<template>
	<view>
		<view>
			<uni-nav-bar title="值班信息">
				<view slot="right">
					<!-- <text class='iconfont icon-tianjia' style="font-size: 42upx;" @tap="addGw()"></text> -->
				</view>
			</uni-nav-bar>
			<search-box  :searchKey="searchKey" v-on:remoteSearch="remoteSearch" ></search-box>
		</view>
		<view v-bind:class="{ cal: canViewAll , calnosearch: !canViewAll }">

			<calendar :selected="selected" :insert="true" :lunar="true" :disable-before="false" :start-date="'2019-3-2'"
				:end-date="'2219-5-20'" @change="change" @monthSwitch="monthSwitch" ref="calendar" />

		</view>


		<view class="duty">
			<view class="title">{{title}}</view>
			<view class="content">
				<text v-for="(item, index) in zb1">
					<text v-if="index === 0">
						【{{ item.Zblb00 }}】：
					</text>
					<div class='zbitem'>
						<text>{{item.Zbry00}}</text>
						<text v-if="item.Dhhm00 != null && item.Dhhm00 != ''" @click="callService(item.Dhhm00)">
							<text style="color:#00B3FF">(</text>
							<text style="color:#00B3FF">
								{{item.Dhhm00}}
							</text>
							<text class="iconfont icon-tel" style="color:#00B3FF">)</text>
						</text>
					</div>
					<!-- <text v-if="index < zb1.length - 1">，</text> -->
				
				</text>
			</view>
			<view class="content">
				<text v-for="(item, index) in zb2">
					<text v-if="index === 0">
						【{{ item.Zblb00 }}】：
					</text>
						<div class='zbitem'>
					<text>{{item.Zbry00}}</text>
					<text v-if="item.Dhhm00 != null && item.Dhhm00 != ''" @click="callService(item.Dhhm00)">
						<text style="color:#00B3FF">(</text>
						<text style="color:#00B3FF">
							{{item.Dhhm00}}
						</text>
						<text class="iconfont icon-tel" style="color:#00B3FF">)</text>
					</text>
					<!-- <text v-if="index < zb2.length - 1">，</text> -->
					</div>
				</text>
			</view>
			<view class="content">
				<text v-for="(item, index) in zb3">
					<text v-if="index === 0">
						【{{ item.Zblb00 }}】：
					</text>
					<div class='zbitem'>
					<text>{{item.Zbry00}}</text>
					<text v-if="item.Dhhm00 != null && item.Dhhm00 != ''" @click="callService(item.Dhhm00)">
						<text style="color:#00B3FF">(</text>
						<text style="color:#00B3FF">
							{{item.Dhhm00}}
						</text>
						<text class="iconfont icon-tel" style="color:#00B3FF">)</text>
					</text>
					<!-- <text v-if="index < zb3.length - 1">，</text> -->
					</div>
				</text>
			</view>
			<view class="content">
				<text v-for="(item, index) in zb4">
					<text v-if="index === 0">
						【{{ item.Zblb00 }}】：
					</text>
					<div class='zbitem'>
					<text>{{item.Zbry00}}</text>
					<text v-if="item.Dhhm00 != null && item.Dhhm00 != ''" @click="callService(item.Dhhm00)">
						<text style="color:#00B3FF">(</text>
						<text style="color:#00B3FF">
							{{item.Dhhm00}}
						</text>
						<text class="iconfont icon-tel" style="color:#00B3FF">)</text>
					</text>
					<!-- <text v-if="index < zb4.length - 1">，</text> -->
					</div>
				</text>
			</view>
			<view class="content">
				<text v-for="(item, index) in zb5">
					<text v-if="index === 0">
						【{{ item.Zblb00 }}】：
					</text>
					<div class='zbitem'>
					<text>{{item.Zbry00}}</text>
					<text v-if="item.Dhhm00 != null && item.Dhhm00 != ''" @click="callService(item.Dhhm00)">
						<text style="color:#00B3FF">(</text>
						<text style="color:#00B3FF">
							{{item.Dhhm00}}
						</text>
						<text class="iconfont icon-tel" style="color:#00B3FF">)</text>
					</text>
					<!-- <text v-if="index < zb5.length - 1">，</text> -->
					</div>
				</text>
			</view>
			<view class="content">
				<text v-for="(item, index) in zb6">
					<text v-if="index === 0">
						【{{ item.Zblb00 }}】：
					</text>
					<div class='zbitem'>
					<text>{{item.Zbry00}}</text>
					<text v-if="item.Dhhm00 != null && item.Dhhm00 != ''" @click="callService(item.Dhhm00)">
						<text style="color:#00B3FF">(</text>
						<text style="color:#00B3FF">
							{{item.Dhhm00}}
						</text>
						<text class="iconfont icon-tel" style="color:#00B3FF">)</text>
					</text>
					<!-- <text v-if="index < zb6.length - 1">，</text> -->
					</div>
				</text>
			</view>
			<view class="content">
				<text v-for="(item, index) in zb7">
					<text v-if="index === 0">
						【{{ item.Zblb00 }}】：
					</text>
					<div class='zbitem'>
					<text>{{item.Zbry00}}</text>
					<text v-if="item.Dhhm00 != null && item.Dhhm00 != ''" @click="callService(item.Dhhm00)">
						<text style="color:#00B3FF">(</text>
						<text style="color:#00B3FF">
							{{item.Dhhm00}}
						</text>
						<text class="iconfont icon-tel" style="color:#00B3FF">)</text>
					</text>
					<!-- <text v-if="index < zb7.length - 1">，</text> -->
					</div>
				</text>
			</view>
			<view class="content">
				<text v-for="(item, index) in zb8">
					<text v-if="index === 0">
						【{{ item.Zblb00 }}】：
					</text>
					<div class='zbitem'>
					<text>{{item.Zbry00}}</text>
					<text v-if="item.Dhhm00 != null && item.Dhhm00 != ''" @click="callService(item.Dhhm00)">
						<text style="color:#00B3FF">(</text>
						<text style="color:#00B3FF">
							{{item.Dhhm00}}
						</text>
						<text class="iconfont icon-tel" style="color:#00B3FF">)</text>
					</text>
					<!-- <text v-if="index < zb8.length - 1">，</text> -->
					</div>
				</text>
			</view>



		</view>

	</view>
</template>

<script>
	import calendar from "@/components/uni-calendar/uni-calendar"
	import uniNavBar from "@/components/uni-nav-bar.vue";
	import searchBox from '@/components/search-box.vue'

	export default {
		data() {
			return {
				year:'',
				month:'',
				fulldate:'',
				canViewAll: false,
				searchKey: '',
				userInfo: {},
				title: '值班人',
				content: '暂无',
				zb1: [],
				zb2: [],
				zb3: [],
				zb4: [],
				zb5: [],
				zb6: [],
				zb7: [],
				zb8: [],
				lock: false,
				selected: []
			};

		},
		components: {
			uniNavBar,
			calendar,
			searchBox
		},
		onLoad(e) {
			let userInfo = uni.getStorageSync("userinfo");
			this.userInfo = userInfo;
			let canViewAll = false;
			if (userInfo && userInfo.Jsid00) {
				let j = "," + userInfo.Jsid00 + ",";
				this.canViewAll = j.indexOf(',23,') > -1;
				//this.searchKey = userInfo.Zsmc00;
			}

			this.EventBus.register("reload_zhiban", (param) => {
				this.remoteSearch();
			});


			var that = this;
			setTimeout(() => {
				that.$refs.calendar.backtoday();
			}, 1000);

		},
		methods: {
			remoteSearch: function(searchKey) {
				this.searchKey = searchKey;
				this.doQuery(this.year,this.month,this.fulldate);
			},
			monthSwitch: function(e) {
				this.doQuery(e.year, e.month, 'none');
			},
			change: function(e) {
				if (this.lock) {
					return;
				}
				this.title = e.fulldate + ' 值班人';
				this.content = '';
				console.log('change');
				
				this.zb1 = [];
				this.zb2 = [];
				this.zb3 = [];
				this.zb4 = [];
				
				setTimeout(() => {
					this.doQuery(e.year, e.month, e.fulldate);
				}, 100)
			},
			toClick: function(e) {
				this.title = e.fulldate + ' 值班人';
				let data = e.clockinfo;
				if (data.have) {
					this.content = data.info;
				} else {
					this.content = '';
				}
			},
			doQuery: function(year, month, fulldate) {
				
				this.year = year;
				this.month = month;
				this.fulldate = fulldate;
				
				this.zb1 = '';
				this.zb2 ='';
				this.zb3 = '';
				this.zb4 = '';
				this.zb5 = '';
				this.zb6 = '';
				this.zb7 = '';
				this.zb8 = '';
				
				let that = this;
				that.lock = true;
				let now = new Date();
				this.$http.doRequest(this.$http.apiUrl + '/Duty/QueryCurrentMonth', {
					year: year || now.getFullYear(),
					month: month || now.getMonth() + 1,
					zbry00:this.searchKey
				}).then((data) => {
					if (!data.Result) {
						return;
					}
					let transformList = [];
					let list = data.Data || [];
					for (let i = 0; i < list.length; i++) {
						let item = list[i]; //每一天的数据
						if (item.DutyList == null || item.DutyList.length === 0) {
							continue;
						}

						//添加日历项
						transformList.push({
							date: item.Day,
							info: item.DutyList[0].Zbry00 + " 等"
						});


						//解析明细
						let zb1 = [];
						let zb2 = [];
						let zb3 = [];
						let zb4 = [];
						let zb5 = [];
						let zb6 = [];
						let zb7 = [];
						let zb8 = [];

						for (let ss = 0; ss < item.DutyList.length; ss++) {
							let userItem = item.DutyList[ss];
							let a = "【" + userItem.Zblb00 + "】";
							if (a == "【值班人员】") {
								zb1.push(userItem);
							}
							if (a == "【带班领导】") {
								zb2.push(userItem);
							}
							if (a == "【值班领导】") {
								zb3.push(userItem);
							}
							if (a == "【应急人员】") {
								zb4.push(userItem);
							}
							// if (a == "【应急人员】") {
							// 	zb5.push(userItem);
							// }
							// if (a == "【石化应急救援中心带班(夜)】") {
							// 	zb6.push(userItem);
							// }
							// if (a == "【石化应急救援中心值班(白)】") {
							// 	zb7.push(userItem);
							// }
							// if (a == "【石化应急救援中心值班(夜)】") {
							// 	zb8.push(userItem);
							// }
						}


						if (new Date(item.Day).toLocaleDateString() == new Date(fulldate)
						.toLocaleDateString()) {
							this.zb1 = zb1;
							this.zb2 = zb2;
							this.zb3 = zb3;
							this.zb4 = zb4;
							this.zb5 = zb5;
							this.zb6 = zb6;
							this.zb7 = zb7;
							this.zb8 = zb8;
						}
					}

					that.selected = transformList;
				}).finally(() => {
					that.lock = false;
				});
			},
			addGw: function() {
				uni.navigateTo({
					url: './zhiban-add?flag=add'
				});
			},
			modifys: function(item) {
				uni.navigateTo({
					url: './zhiban-add?flag=update&id=' + item.Id0000
				});
			},
			callService: function(dhhm) {
				uni.makePhoneCall({
					phoneNumber: dhhm
				})
			}
		}
	}
</script>

<style scoped>
	.duty {
		margin-top: 12upx;
		padding: 0px 16upx;
	}

	.title {
		display: block;
		text-align: left;
		font-size: 36upx;
		font-weight: bold;
	}

	.content {
		margin-top: 8upx;
		font-size: 30upx;
	}

	.calnosearch {
		margin-top: 130upx !important;
	}

	.cal {
		margin-top: 130upx !important;
	}

	.left-margin {
		margin-left: 20upx;
	}
	
	.zbitem{
		margin-left: 30upx;
	}
</style>
