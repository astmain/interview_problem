<template>
    <view :class="[
			'notice',
			'iconfont',className]">
	</view>
</template>

<script>
    export default {
		data() {
			return {
				className: ''
			}
		},
        props: {
            level: {
                type: Number,
                default: {}
            }
        },
		watch: {
			level: {
				immediate: true,
				handler(val, oldVal) {
					if(this.level === -1) {
						this.className = 'notice-null';
					}
					else if(this.level === 0) {
						this.className = 'notice-red icon-yuanxing';
					}
					else if(this.level === 1) {
						this.className = 'notice-yellow icon-yuanxing';
					}
					else {
						this.className = 'notice-green icon-yuanxing';
					}
				}
			}
		},
        methods: {
            close() {
                this.$emit('close')
            }
        }
    }
</script>

<style scoped="">
	
	.notice {
		display:inline-block;
		width:32upx;
	}
	
</style>
