<template>
	<selector :text-field='textField' :datas="datas" :selected="selected" @selectorChanged="selectorChanged"></selector>
</template>

<script>
	import selector from './selector.vue';
	import utils from '../common/utils.js';


	export default {
		data() {
			return {
				dic: {}, //存放字典
				datas: [],
				selected: -1,
				valueOrText: -1 //1使用value,0使用text,-1表示都没设置
			};
		},
		mounted: function() {
			//#ifdef H5
			if (this.codeSource == 'Code') { //默认字典来源
				if (this.codeType) {
					utils.getCode(this.codeType)
						.then(codes => {
							this.datas = codes; 
							
							for (var i = 0; this.datas && i < this.datas.length; i++) {
								var item = this.datas[i];
								var key = item[this.currentField()];
								this.dic[key] = i;
							}
							
							this.reSelect();
							
						});
				}
			} else if (this.codeSource == 'Car') {
				utils.getCarCode()
					.then(codes => {
						this.datas = codes;
						for (var i = 0; this.datas && i < this.datas.length; i++) {
							var item = this.datas[i];
							var key = item[this.currentField()];
							this.dic[key] = i;
						}
						this.reSelect();
					});

			}
			//#endif
		},
		onLoad() { 
			if (this.codeSource == 'Code') { //默认字典来源
				if (this.codeType) {
					utils.getCode(this.codeType)
						.then(codes => {
							this.datas = codes; 
							for (var i = 0; this.datas && i < this.datas.length; i++) {
								var item = this.datas[i];
								var key = item[this.currentField()];
								this.dic[key] = i;
							}
							
							this.reSelect();
						});
				}
			} else if (this.codeSource == 'Car') {
				utils.getCarCode()
					.then(codes => {
						this.datas = codes;
						for (var i = 0; this.datas && i < this.datas.length; i++) {
							var item = this.datas[i];
							var key = item[this.currentField()];
							this.dic[key] = i;
						}
						this.reSelect();
					});

			}
		},
		components: {
			selector
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
			bindValue: {
				type: String,
				default: ''
			},
			valueType: {
				type: String,
				default: "0"
			}
		},
		watch: {
			bindValue: {
				immediate: true,
				handler(val, oldVal) {
					this.bindValue = val;
					this.reSelect();
				}
			}
		},
		methods: {
			selectorChanged: function(e) {
				this.selected = e.index;
				this.$emit('codeSelectorChanged', e.value[this.currentField()]);
			},
			reSelect: function() {
				let s = this.dic[this.bindValue];
				this.selected = s == null ? -1 : s;
			},
			currentField: function() {
				return this.valueType === "value" ? this.valueField : this.textField;
			}

		}
	}
</script>
<style>

</style>
