<template>
	<view style="width:100%">
		<view @click="show" class="label" >
			<text>{{label || text }}</text>
		</view>
		<hlvue-picker ref="mpSelector" :value="mpValue"
			@onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="datas"></hlvue-picker>
	</view>
</template>

<script>
	import hlvuePicker from './hlvuePicker.vue';
	let prefix = "@@@";
	export default {
		data() {
			return {
				label : '',
				mpValue : [],
				dic: {},
				inited : false
			};
		},
		mounted: function() {
		},
		onLoad() { 
			
		},
		components: {
			hlvuePicker
		},
		props: {
			datas:  {
				type: Array,
				default: []
			},
			value: {
				type: Number,
				default: -1
			},
			text: {
				type: String,
				default: '请选择'
			}
		},
		watch: {
			value(newVal, oldVal) {
				setTimeout(() => {
					let item = this.dic[prefix + newVal];
					if(item == null) { return; }
					this.mpValue = [item.index];
					this.value = newVal;
					this.label = item.label;
				}, 0)
			},
			datas(newVal, oldVal) {
				if(!this.inited) {
					this.init();
				}
			},
		},
		methods: {
			show : function() {
				this.$refs.mpSelector.show();
			},
			init : function() {
				let codes = this.datas;
				for (let i = 0; codes && i < codes.length; i++) {
					let item = codes[i];
					this.dic[prefix + item.value] = {
						index : i,
						label : item.label
					};
				}
				this.inited = true;
			},
			onCancel: function() {
				
			},
			onConfirm: function(e) {
				if(!e || !e.value) { return; }
				this.label = e.label;
				this.$emit('input', e.value[0]);
			},
		}
	}
</script>
<style scoped>
	
	.label {
		padding: 0 20upx 0 0;
		text-align: right;
		height: 34px;
		line-height: 34px;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 110%;
		float: right;
	}
	
</style>
