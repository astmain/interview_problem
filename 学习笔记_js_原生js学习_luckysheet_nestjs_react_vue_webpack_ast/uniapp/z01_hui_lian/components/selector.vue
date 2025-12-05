<template>
	<picker @change="selectChange" mode="selector" :value="selected" :range-key="textField" :range="datas">
		<view class="selector-right-align">{{ (selected > -1 && datas[selected]) ? datas[selected][textField] : '请选择' }}</view>
	</picker> 
</template>
  
<script>
	
	export default {
		data() {
			return{
				"title":"select"
			}
		}, 
		model: {
		},
		props: {
			datas: {
				type: Array,
				default: []
			},
			textField : {
				type: String,
				default: 'Codenote'
			},
			selected : {
				type: Number,
				default: 0
			}
		},
		methods: {
			selectChange: function(e) {
				this.$emit('selectorChanged', {
					index : e.detail.value,
					value : this.datas[e.detail.value]
				});
			}
			
		}
	}
</script>
<style>
	
</style>
