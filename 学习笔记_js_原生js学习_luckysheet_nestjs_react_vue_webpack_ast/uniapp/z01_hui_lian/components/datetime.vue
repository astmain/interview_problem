<template>
	<view style="width: 100%;">
		<view style="">
			<view style="text-align:right;"></view>
			<picker @change="timeChange" :value="time" mode="time" start="00:00" end="23:59" v-if="withTime" class="pk-item pk-item-time">
				<text class="pk-item-text">{{ selected && time ? time : '时间'}}</text>
			</picker>
			<picker @change="dateChange" :value="date" mode="date" start="1991-01-01" end="2029-01-01" style="" class="pk-item pk-item-date">
				<text class="pk-item-text">{{ selected && date ? date : '日期'}}</text>
			</picker>
		</view>
	</view>
</template>

<script>
	export default {
		data() {

			let now = new Date();
			let year = now.getFullYear();
			let month = this.twoCharNumber(now.getMonth() + 1);
			let day = this.twoCharNumber(now.getDate());
			let hour = this.twoCharNumber(now.getHours());
			let minute = this.twoCharNumber(now.getMinutes());
			let defaultDate = '';
			let defaultTime = '';

			if (this.defaultNow) {
				defaultDate = year + '-' + month + '-' + day;
				defaultTime = hour + ":" + minute;
			}

			let _date = defaultDate;
			let _time = defaultTime;


			//#ifdef H5
			if (_date == "") {
				_date = null;
			}
			if (_time == "") {
				_time = null;
			}
			//#endif

			return {
				defaultDate: defaultDate,
				defaultTime: defaultTime,
				date: _date, //日期存放的都是yyyy-MM-dd格式
				time: _time, //时间存放的是hh:mm格式，注意没有秒
				selected: false
			}
		},
		onLoad() {
			this.fireDatetimeUpdate(this.getDateTime());
		},
		props: {
			value: {
				type: String,
				default: ''
			},
			defaultNow: {
				type: Boolean,
				default: false
			},
			withTime: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			value: {
				immediate: true,
				handler(val, oldVal) {
					if (!val) {
						return;
					}

					this.selected = true;

					let dateRegex = /(\d{4}\-\d{2}\-\d{2})/;
					if (dateRegex.test(val)) {
						this.date = dateRegex.exec(val)[0];
					} else {
						this.date = this.defaultDate;
					}

					let timeRegex = /(\d{2}\:\d{2})(\:\d{2})?/;
					if (timeRegex.test(val)) {
						this.time = timeRegex.exec(val)[1];
					} else {
						this.time = this.defaultTime;
					}
				}
			}
		},
		methods: {
			dateChange: function(e) {
				let val = e.target.value;
				if (/(\d{4}\-\d{2}\-\d{2})/.test(val)) {
					this.date = val; //选择完整日期
				} else if (/(\d{4})/.test(val)) {
					this.date = val + '-01-01'; //只选择年份
				} else if (/(\d{4}\-\d{2})/.test(val)) {
					this.date = val + '-01'; //选择年份和月份
				} else if (!val) {
					this.date = this.defaultDate;
				} else {
					throw new Error('意料之外的日期格式：' + val);
				}

				if (!this.time) {
					this.time = this.defaultTime;
				}
				this.fireDatetimeUpdate(this.getDateTime());
			},
			timeChange: function(e) {
				let val = e.target.value;
				if (/(\d{2}\:\d{2})/.test(val)) {
					this.time = val; //完整时间格式
				} else if (/\d{2}/.test(val)) {
					this.time = val + ':00'; //只有小时
				} else if (!val) {
					this.time = this.defaultTime;
				} else {
					throw new Error('意料之外的时间格式：' + val);
				}

				if (!this.date) {
					this.date = this.defaultDate;
				}
				this.fireDatetimeUpdate(this.getDateTime());
			},
			fireDatetimeUpdate: function(value) {
				this.$emit('input', value);
			},
			formatTime: function(val) {
				if (!val) {
					return "";
				}
				return val.length >= 8 ? val : (val + ':00');
			},
			getDateTime: function() {
				return (this.date + ' ' + this.formatTime(this.time)).trim(' ');
			},
			twoCharNumber: function(num) {
				return ("00" + num).slice(-2);
			}
		}
	}
</script>
<style scoped>
	.pk-item {
		text-align: right;
		padding: 0;
		margin: 0;
		display: inline-block;
		float: right;
	}

	.pk-item-date {
		width: auto;
	}

	.pk-item-time {
		width: auto;
	}

	.pk-item-text {
		padding: 0px 10upx;
	}
</style>
