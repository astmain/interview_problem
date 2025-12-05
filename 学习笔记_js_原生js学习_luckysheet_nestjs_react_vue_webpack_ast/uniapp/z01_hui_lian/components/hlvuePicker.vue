<template>
    <view class="mpvue-picker">
        <view :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></view>
        <view class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
            <view class="mpvue-picker__hd" catchtouchmove="true">
                <view class="mpvue-picker__action" @click="pickerCancel">取消</view>
                <view class="mpvue-picker__action" :style="{color:themeColor}" @click="pickerConfirm">确定</view>
            </view>
            <picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerIndex" @change="pickerChange" 
				v-if="pickerValueSingleArray.length > 0">
                <block>
                    <picker-view-column>
                        <view class="picker-item" v-for="(item,index) in pickerValueSingleArray" :key="index">{{item.label}}</view>
                    </picker-view-column>
                </block>
            </picker-view>
        </view>
    </view>
</template>

<script>
	
	let blankObj = {
		label: '',
		value: ''
	};
	
    export default {
        data() {
            return {
				pickerIndex: [],
                pickerValueArrayChange: true,
                pickerValueSingleArray: [],
				showPicker: false,
            };
        },
        props: {
            pickerValueArray: { 
                type: Array,
                default() {
					return []
				}
            },
            /* 默认值 */
            value: {
                type: Array,
                default() {
                	return []
                }
            },
            /* 主题色 */
            themeColor: {
				type: String,
				default() {
					return '#007aff';
				}
			}
		
        },
        watch: {
            pickerValueArray(newVal,oldVal) {
                this.pickerValueArrayChange = true;
            },
			value(newVal,oldVal) {
				this.pickerValueArrayChange = true;
			},
        },
        methods: {
            initPicker(valueArray) {
				this.pickerIndex = this.value;
                this.pickerValueSingleArray = valueArray || [];
            },
            show() {
                setTimeout(() => {
                    if (this.pickerValueArrayChange) {
                        this.initPicker(this.pickerValueArray);
                        this.showPicker = true;
                        this.pickerValueArrayChange = false;
                    } else {
                        this.showPicker = true;
                    }
                }, 0);
            },
            maskClick() {
                this.pickerCancel();
            },
            pickerCancel() {
                this.showPicker = false;
				this.initPickerIndex();
                let pickObj = {
                    index: this.pickerIndex,
                    value: this._getPickerLabelAndValue(this.pickerIndex).value,
                    label: this._getPickerLabelAndValue(this.pickerIndex).label
                };
                this.$emit('onCancel', pickObj);
            },
            pickerConfirm(e) {
                this.showPicker = false;
				this.initPickerIndex();
                let pickObj = {
                    index: this.pickerIndex,
                    value: this._getPickerLabelAndValue(this.pickerIndex).value,
                    label: this._getPickerLabelAndValue(this.pickerIndex).label
                };
                this.$emit('onConfirm', pickObj);
            },
            showPickerView() {
                this.showPicker = true;
            },
            pickerChange(e) {
                this.pickerIndex = e.mp.detail.value;
                let pickObj = {
                    index: this.pickerIndex,
                    value: this._getPickerLabelAndValue(this.pickerIndex).value,
                    label: this._getPickerLabelAndValue(this.pickerIndex).label
                };
                this.$emit('onChange', pickObj);
            },
            _getPickerLabelAndValue(value) {
				if(this.pickerValueSingleArray.length === 0) { return blankObj; }
				
                let pickerLable = this.pickerValueSingleArray[value].label;
                let pickerGetValue = [];
                pickerGetValue.push(this.pickerValueSingleArray[value].value);
                return {
                    label: pickerLable,
                    value: pickerGetValue
                };
            },
			initPickerIndex() {
				if (this.pickerIndex.length === 0) {
					this.pickerIndex = [0];
				}
			}
        }
    };
</script>

<style>
    .pickerMask {
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
    }

    .mpvue-picker-content {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        transition: all 0.3s ease;
        transform: translateY(100%);
        z-index: 3000;
    }

    .mpvue-picker-view-show {
        transform: translateY(0);
    }

    .mpvue-picker__hd {
        display: flex;
        padding: 9px 15px;
        background-color: #fff;
        position: relative;
        text-align: center;
        font-size: 17px;
    }

    .mpvue-picker__hd:after {
        content: ' ';
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #e5e5e5;
        color: #e5e5e5;
        transform-origin: 0 100%;
        transform: scaleY(0.5);
    }

    .mpvue-picker__action {
        display: block;
        flex: 1;
        color: #1aad19;
		font-size:17px;
    }

    .mpvue-picker__action:first-child {
        text-align: left;
        color: #888;
    }

    .mpvue-picker__action:last-child {
        text-align: right;
    }

    .picker-item {
        text-align: center;
        line-height: 40px;
        font-size: 16px;
		color: #000;
    }

    .mpvue-picker-view {
        position: relative;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 238px;
        background-color: rgba(255, 255, 255, 1);
    }
</style>
