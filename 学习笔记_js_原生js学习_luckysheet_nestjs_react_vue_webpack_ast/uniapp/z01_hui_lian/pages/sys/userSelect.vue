<template>
	<view>
		<uni-nav-bar title="选择人员"></uni-nav-bar>
		<search-box v-on:remoteSearch="remoteSearch">
			<text style="color:#FFFFFF;font-size: 32upx;" @tap="selectGroup()">分组</text>
			<text style="color:#FFFFFF;font-size: 30upx;margin: 0 2upx;">|</text>
			<text style="color:#FFFFFF;font-size: 32upx;" @tap="all()">{{ selectAll ? '展开' : '折叠' }}</text>
			<text style="color:#FFFFFF;font-size: 30upx;margin: 0 2upx;">|</text>
			<view style="display: inline-block;">
				<button @tap="completeChoose" 
					style="width:140upx;height: 72upx;font-size: 28upx;padding: 0;">{{btnName}}</button>
			</view>
		</search-box>
		<checkbox-group style="width: 100%;">
			<view class="grace-accordion" style="padding-top: 110upx;padding-bottom: 300upx;">
				<view v-if="list.length">
					<block v-for="(dep, index) in list" :key="index">
						<view class="grace-accordion-items">
							<view
								:class="[dep.IsOpen ? 'grace-accordion-title grace-current' : 'grace-accordion-title']"
								:id="'grace-accordion-' + index"
								@tap ="switchTag(dep)"
								@longpress="selectDept(dep.DepartmentId)"
							>
								<view>
									<checkbox @click.stop="selectDept(dep.DepartmentId)"></checkbox>
									{{ dep.DepartmentName }}
								</view>
							
								<text class="grace-list-imgs-arrow grace-icons icon-arrow-up" v-if="dep.IsOpen"></text>
								<text class="grace-list-imgs-arrow grace-icons icon-arrow-down" v-else></text>
							</view>
							<view class="grace-accordion-body" v-show="dep.IsOpen">
								<view class="grace-list">
									<view class="items"  @tap="itemCheck(user)" v-for="(user,index2) in dep.Users" :key="user.Id0000">
										<view class="body" style="margin-left: 80rpx;">
											<checkbox :id="user.Id0000" :checked="user.checked" :value="JSON.stringify(user)">{{ user.Zsmc00 }}</checkbox>
										</view>
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
				<view v-else>
					<view style="text-align: center;margin-top:8upx;"><text style="color:#bbb;font-size:30upx">没有数据</text></view>
				</view>
			</view>
		</checkbox-group>
		<view style="position: fixed;bottom: 0upx;z-index: 9999;background-color: #fff;">
			<fold-item title="已选择用户" style="background: #fbfbfb;box-shadow: 10px 10px 5px #888888;">
				<view class="grace-select-tips grace-select-tags">
					<checkbox-group>
						<block v-for="(user, index) in selectUsers" :key="index">
							<label @tap="itemCheck(user)" :class="[user.checked ? 'grace-checked' : '']">
								{{ user.Zsmc00 }}
								<text class="iconfont icon-close30" style="font-size: 25upx;color: #EEEEEE;"></text>
							</label>
						</block>
					</checkbox-group>
				</view>
			</fold-item>
		</view>
	</view>
</template>

<script>
import utils from '../../common/utils';
import cacheUtil from '../../common/cache-utils';
import searchBox from '../../components/search-box.vue';
import uniNavBar from '@/components/uni-nav-bar.vue';
import foldItem from '../../components/fold-item.vue';

var user_cache_key = 'storage_key_user_cache';
export default {
	data() {
		return {
			list: [],
			listMapping: {},
			openAll: false,
			wrapName: '展开',
			btnName: '完成(0)',
			eventName: '',
			searchKey: '',
			params: {
				departmentIds: '',
				roleIds: '',
				userIds: '',
				needSelectedUsers: {},
				seqJsryid:''
			},
			userinfo: {
				userId: utils.getUserId(),
				trueName: utils.getTrueName()
			},
			useGroup: false,
			includeDeptUserIds: [],		//用于分组选择
			groups: [],
			gropusMap: [],
			selectUsers: {},
			selectCount: 0,
			selectAll: false,
			seqJsryid:''
		};
	},
	mounted() {
		this.getGroup();
		this.doSearch();
	},
	onLoad(params) {
		this.useGroup = params.useGroup;
		this.eventName = params.eventName;
		this.params.departmentIds = params.departmentIds;
		this.params.roleIds = params.roleIds;
		this.params.userIds = params.userIds;
		this.params.userIds = params.userIds;
		this.params.seqJsryid = params.seqJsryid;
		

		let needSelectedUsers = params.needSelectedUsers || '';
		let needSelectedUsersArr = needSelectedUsers.trim(',').split(',');
		if(needSelectedUsersArr.length == 1 && needSelectedUsersArr[0] === "") { needSelectedUsersArr = []; }
		needSelectedUsersArr.forEach(item => {
			if (item && !this.params.needSelectedUsers[item]) {
				this.params.needSelectedUsers[item] = 1;
			}
		});

		if (!this.eventName) {
			throw new Error('传到人员选择页面的参数：eventName 不能为空');
		}
	},
	components: {
		searchBox,
		uniNavBar,
		foldItem
	},
	methods: {
		selectGroup: function() {
			uni.showActionSheet({
				itemList: this.groups.map(item => item.GroupName),
				success: res => {
					
					//todo
					this.list = [];
					this.listMapping = {};
					this.selectUsers={}
					//todo end
					
					let group = this.groups[res.tapIndex];
					if (!group.Id) {
						this.includeDeptUserIds = [];
						this.doSearch(); //清空分组
						return;
					}
					this.$http
						.doRequest(this.$http.apiUrl + '/Base/QueryGroupUsers', { id: group.Id })
						.then(data => {
							if (data.Result) {
								let uids = [];
								
								this.params.needSelectedUsers={}
								
								data.Data.forEach(item => {
									uids.push(item.Dwid00 + '--' + item.UserId);
									
										this.params.needSelectedUsers[item.UserId] = 1;//todo
								});
								if (uids.length === 0) {
									uids = ['@_@'];
								}
								this.includeDeptUserIds = uids;
								this.doSearch();
							}
						})
						.finally(() => {
							uni.hideLoading();
						});
				}
			});
		},
		getGroup: function() {
			this.$http
				.doRequest(this.$http.apiUrl + '/Base/QueryGroup', { UserID: this.userinfo.userId })
				.then(data => {
					if (data.Result) {
						this.groups = data.Data || [];
						this.groups.push({ Id: '', GroupName: '取消分组' });
					}
				})
				.finally(() => {
					uni.hideLoading();
				});
		},
		changeAccordion: function(e) {
			var accordionIndex = e.currentTarget.id;
			if (this.accordionActive == accordionIndex) {
				accordionIndex = '';
			}
			this.accordionActive = accordionIndex;
		},
		remoteSearch: function(sk) {
			this.searchKey = sk;
			this.doSearch();
		},
		doSearch: function() {
			let that = this;
			var match = [];
			// uni.showLoading({
			// 	title: '正在加载...'
			// });
			cacheUtil
				.getDepartmentUserByCondition(this.params.departmentIds, this.params.roleIds, this.params.userIds)
				.then(res => {
					var data = res;
					if (!data) {
						this.list = [];
						this.listMapping = {};
						return;
					}
					this.searchFilter(this.searchKey, data, this.includeDeptUserIds);
				})
				.catch(err => {
					console.log('读取本地用户缓存失败');
				})
				.finally(() => {
					uni.hideLoading();
				});
		},
		searchFilter: function(key, data, includeDeptUserIds) {
			var result = [];
			if (!key && (!includeDeptUserIds || includeDeptUserIds.length === 0)) {
				result = data;
				result.forEach((row, index, arr) => {
					if (!row.Users || !row.Users.length) {
						return;
					}
					if (row.Users.length > 0) {
						row.IsOpen = 1;
					}
				});
			} else {
				data.forEach((row, index, arr) => {
					if (!row.Users || !row.Users.length) {
						return;
					}
					row.Users = row.Users.filter(user => {
						user.checked = false;
						return (
							user.Zsmc00 &&
							row.DepartmentName &&
							(!key || user.Zsmc00.indexOf(key) > -1 || row.DepartmentName.indexOf(key) > -1) &&
							(!includeDeptUserIds || !includeDeptUserIds.length || includeDeptUserIds.indexOf(user.Dwid00 + '--' + user.Id0000) > -1)
						);
					});
					if (row.Users.length > 0) {
						row.IsOpen = 1;
						result.push(row);
					}
				});
			}
			this.list = result;
			this.reBuildMapping();	//重构mapping
			this.reChecked();		//重新选择
		},
		wrap: function() {
			this.list.forEach(item => (item.IsOpen = 1));
		},
		itemCheck: function(user) {
			let checked = !user.checked;
			let key = this.buildKey(user.Dwid00, user.Id0000);
			let u = this.listMapping[key];
			if(!u) { return; }
			u.checked = checked;
			if(checked) {
				this.selectUsers[key] = u;
				this.selectCount++;
			}
			else {
				delete this.selectUsers[key];
				this.selectCount--;
			}
			this.btnName = '完成(' + this.selectCount + ')';
		},
		selectDept: function(deptid) {
			let dept = null;
			for(let i = 0; i < this.list.length; i++) {
				if(this.list[i].DepartmentId === deptid) { dept = this.list[i]; }
			}
			if(dept == null || dept.Users == null || dept.Users.length === 0) { return; }
			let users = dept.Users;
			let checked = !users[0].checked;
			
			for(let i = 0; i < users.length; i++) {
				let user = users[i];
				user.checked = checked;
				let key = this.buildKey(user.Dwid00, user.Id0000);
				if(checked) {
					this.selectUsers[key] = user;
					this.selectCount++;
				}
				else {
					delete this.selectUsers[key];
					this.selectCount--;
				}
			}
			this.btnName = '完成(' + this.selectCount + ')';
		},
		completeChoose: function() {
			let mapping = {}; //去除重复
			let userNames = '';
			let userIds = '';
			Object.keys(this.selectUsers).forEach(key => {
				let user = this.selectUsers[key];
				if (user && !mapping[user.Id0000]) {
					userIds = userIds + ',' + user.Id0000;
					userNames = userNames + ',' + user.Zsmc00;
					mapping[user.Id0000] = 1;
				}
			});
			if (!userIds&&!this.params.seqJsryid) {
				uni.showModal({
					title: '提示',
					content: '请选择用户',
					showCancel: false
				});
				return;
			}
			this.EventBus.fire(this.eventName, {
				userNames: userNames.replace(/(^,+|,+$)/, ''),
				userIds: userIds.replace(/(^,+|,+$)/, '')
			});
			uni.navigateBack({
				delta: 1
			});
		},
		all: function() {
			this.list = this.list || [];
			this.list.forEach(dept => {
				dept.IsOpen = this.selectAll;
			});
			this.selectAll = !this.selectAll; 
		},
		reBuildMapping: function() {
			let that = this;
			if(!that.list) { 
				that.list = [];
				that.listMapping = {};
				return;
			}
			let map = that.listMapping;
			for(let i = 0; i < that.list.length; i++) {
				let dept = that.list[i];
				let users = dept.Users;
				if(!users) { continue; }
				for(let j = 0; j < users.length; j++) {
					let u = users[j];
					map[that.buildKey(u.Dwid00, u.Id0000)] = u;
				}
			}
		},
		reChecked: function() {
			for(let i = 0; i < this.list.length; i++) {
				let dept = this.list[i];
				let users = dept.Users;
				if(!users) { continue; }
				for(let j = 0; j < users.length; j++) {
					let u = users[j];
					let key = this.buildKey(u.Dwid00,u.Id0000);
					
					//用户选择后返回再次进到该页面需要再选择
					if(	this.params.needSelectedUsers[u.Id0000] 
						// || (this.includeDeptUserIds && this.includeDeptUserIds.indexOf(key) > -1)
						) { 
						this.selectUsers[key] = u;
						this.selectCount++;
					}
					
					if(this.selectUsers[key]) {
						u.checked = true;
					}
					else {
						u.checked = false;
					}
				}
			}
			this.btnName = '完成(' + this.selectCount + ')';
			this.params.needSelectedUsers = {};	//已经转化给this.selectUsers，这里清空掉
		},
		buildKey: function(did, uid) {
			return did + "--" + uid;
		},
		switchTag:function(dep){
			dep.IsOpen=!dep.IsOpen;
		}
	},
	computed: {}
};
</script>
<style>
@import '../../common/uni.css';

.grace-select-tips {
	border-bottom: 0upx;
	max-height: 400upx !important;
	overflow-y: scroll;
}



</style>
