<template>
	<view :class="bclass">
		<view class="c-sytle" :style="cstyle" v-show="!switchFlag" @tap="etap">{{showText}}</view>
		<textarea :maxlength="-1" class="c-sytle" :style="xstyle" :focus="focusFlag" v-show="switchFlag" 
			:value="ivalue" 
			:disabled="disabled"
			 @input="einput" 
			 @blur="eblur"
		 ></textarea>
	</view>
</template>

<script>
	export default {
		data: function() {
			return {
				switchFlag: false,
				focusFlag: false,
				ivalue : ''
			}
		},
		props: {
			value: {
				default: ''
			},
			xstyle: {
				default:'',
				type: String
			},
			placeholder: {
				default: '',
				type: String
			},
			disabled: {
				default: false,
				type: Boolean
			},
			bclass:{
				default:'',
				type: String
			}
		},
		computed: {
			cstyle() {
				if(this.ivalue != null && this.ivalue !== '') {
					return this.xstyle;
				}
				return this.xstyle + ";color:grey !important;";
			},
			showText() {
				if(this.ivalue != null && this.ivalue !== '') {
					return this.ivalue;
				}
				return this.placeholder;
			}
		},
		watch: {
			value(newVal, oldVal) {
				this.ivalue = newVal;
			}
		},
		methods: {
			einput : function(e) {
				if(this.disabled) { return; }
				let v = e.mp.detail.value;
				this.ivalue = v;
				this.$emit('input', v);
			},
			etap: function(e) {
				if(this.disabled) { return; }
				this.switchFlag = true;
				setTimeout(() => {
					this.focusFlag = true;
				},0);
			},
			eblur: function(e) {
				if(this.disabled) { return; }
				this.focusFlag = false;
				this.switchFlag = false;
				//bug 在组件中， einput  不会被触发，所以离开的时候赋值。
				let v = e.mp.detail.value;
				this.ivalue = v;
				this.$emit('input', v);
			}
		}
	}
</script>
<style>
	
	.c-sytle {
		height: 100rpx;
		width:98%;
		outline: none;
		border: none;
		padding: 0;
		resize: none;
		background-color: rgba(0,0,0,0);
		opacity: inherit;
		box-sizing: border-box;
		word-break: break-all;
		word-spacing: normal;
		white-space: pre-wrap;
		text-rendering: auto;
		text-transform: none;
		text-shadow: none;
		display: inline-block;
		text-align: start;
		flex-direction: column;
		overflow-wrap: break-word;
		line-height:2em;
		background:none;
		border:0;
		padding:8rpx 2%;
		font-size:28rpx;
		position: relative;
	}
	
</style>
