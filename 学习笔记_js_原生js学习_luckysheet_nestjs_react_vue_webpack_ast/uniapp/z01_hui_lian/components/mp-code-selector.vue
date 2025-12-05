<template>
	<view style="width:100%">
		<view @click="show" class="label" >
			<text>{{label || '请选择'}}</text>
		</view>
		<hlvue-picker ref="mpSelector" :value="mpValue"
			@onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="datas"></hlvue-picker>
	</view>
</template>

<script>
	import hlvuePicker from './hlvuePicker.vue';
	import utils from '../common/utils.js';
 
	export default {
		data() {
			return {
				label : '',
				mpValue : [],
				datas: [],
				dic: []
			};
		},
		mounted: function() {
			//#ifdef H5
			this.loadData();
			//#endif
		},
		created() { 
			 this.loadData();
		},
		components: {
			hlvuePicker
		},
		model: {},
		props: {
			codeSource: {
				type: String,
				default: 'Code'
			},
			codeType: {
				type: String,
				default: '必须传值啊啊啊啊'
			},
			textField: {
				type: String,
				default: 'Codenote'
			},
			valueField: {
				type: String,
				default: 'Codeid'
			},
			value: {
				type: String,
				default: ''
			},
			valueType: {
				type: String,
				default: "0"
			}
		},
		watch: {
			value(newVal, oldVal) {
				if(!this.dic[newVal]) { return; }
				this.mpValue = [this.dic[newVal].index];
				this.value = newVal;
				this.initSelector();
			},
		},
		methods: {
			loadData : function() {
				if (this.codeSource == 'Code') { //默认字典来源
					if (this.codeType) {
						utils.getCode(this.codeType)
							.then(codes => {
								for (let i = 0; codes && i < codes.length; i++) {
									let item = codes[i];
									let v = item[this.currentField()];
									let l = item[this.textField];
									this.datas.push({
										label : l,
										value : v
									});
									this.dic[v] = {
										index : i,
										label : l
									};
									
								}
								this.initSelector();
							});
							
					}
				} 
				else if (this.codeSource == 'Car') {
					utils.getCarCode()
						.then(codes => {
							for (let i = 0; codes && i < codes.length; i++) {
								let item = codes[i];
								let v = item[this.currentField()];
								let l = item[this.textField];
								this.datas.push({
									label : l,
									value : v
								});
								this.dic[v] = {
									index : i,
									label : l
								};
								
							}
							this.initSelector();
						});
				}
				else if (this.codeSource == 'Meeting') {
					utils.getMeetingRoomCode()
						.then(codes => {
							for (let i = 0; codes && i < codes.length; i++) {
								let item = codes[i];
								let v = item[this.currentField()];
								let l = item[this.textField];
								this.datas.push({
									label : l,
									value : v
								});
								this.dic[v] = {
									index : i,
									label : l
								};
								
							}
							this.initSelector();
						});
				}
			},
			show : function() {
				this.$refs.mpSelector.show();
			},
			onConfirm: function(e) {
				if(!e || !e.value) { return; }
				this.label = e.label;
				this.$emit('input', e.value[0]);
			},
			onCancel: function() {
				
			},
			currentField: function() {
				return this.valueType === "value" ? this.valueField : this.textField;
			},
			initSelector: function() {
				if(!this.dic || !this.dic[this.value]) { return; }
				this.label = this.dic[this.value].label;
			}
		}
	}
</script>
<style scoped>
	
	.label {
		padding: 0 20upx 0 0;
		text-align: right;
		height: 34px;
		line-height: 34px;
		color: #000;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 110%;
		float: right;
	}
	
</style>
